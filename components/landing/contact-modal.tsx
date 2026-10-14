"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, ArrowLeft, Check, Send, Phone, MessageSquare, Mail } from "lucide-react";
import { saveRecord } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

/*
  The contact application, in two places, one set of questions:
    ContactModal  full screen, opened by buttons across the site
    ContactForm   the same questions inline on /contact (where /apply lands)

  WHAT IT SENDS IS FIXED. Field names, option values, the rules for moving on
  (name required, email must match the pattern, every choice question needs an
  answer, at least one bottleneck) and the submit path (saveRecord into
  contact_submissions, trackEvent.formSubmit, /api/notify type "contact") are
  exactly what the live site has always sent, so Jo's reports and the auto
  reply keep working. Only the order, wording and layout of the questions are
  free to change. Where a saved value reads badly ("$0 - $50K"), `label`
  changes what the visitor sees and the value is saved untouched.

  The unprefixed classes are the phone design: the modal covers the screen.
  From md: up it is a centered dialog over the dimmed page, holding the same
  height from step to step (its steps scroll inside it), and the type steps
  up a size. The inline form takes the same md: sizes inside the column its
  page gives it.
*/

function sanitize(str: string | null): string | null {
  if (!str) return null;
  return str.replace(/[<>]/g, "").trim().slice(0, 500);
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  social: "",
  service: "",
  bottlenecks: [] as string[],
  revenue_range: "",
  budget: "",
  how_found: "",
};

type TextField = "name" | "email" | "phone" | "company" | "website" | "social";
type ChoiceField = "service" | "revenue_range" | "budget" | "how_found";
type Option = { value: string; label?: string };

type FieldSpec = {
  field: TextField;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  required?: boolean;
  hint?: string;
  inputMode?: "text" | "email" | "tel" | "url";
  autoCapitalize?: "none" | "words";
};

type Step =
  | { id: "intro"; kind: "intro" }
  | { id: string; kind: "choice"; field: ChoiceField; title: string; hint: string; options: Option[] }
  | { id: string; kind: "multi"; field: "bottlenecks"; title: string; hint: string; options: Option[] }
  | { id: string; kind: "fields"; title: string; hint: string; fields: FieldSpec[] }
  | { id: "review"; kind: "review" };

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

const choices = (...values: string[]): Option[] => values.map((value) => ({ value }));

/*
  Easy taps first, contact details once the visitor has said what they need.
  Nothing is saved until the last step, so the order changes how the form
  feels, not what arrives.
*/
const QUESTIONS: Step[] = [
  {
    id: "service",
    kind: "choice",
    field: "service",
    title: "What can I help with?",
    hint: "Pick the closest fit.",
    // "Speaking or Podcast" is new (the Speaking page opens this form). service is
    // free text everywhere it goes: a text column with no check (successupgrade.ai
    // writes its own values into it), the notify email, and never GoHighLevel.
    options: choices("AI Automation", "Revenue Systems", "Brand Strategy", "Fractional COO", "VibeCoding", "Video Production", "Full Business Overhaul", "Speaking or Podcast", "Not sure yet"),
  },
  {
    id: "bottleneck",
    kind: "multi",
    field: "bottlenecks",
    title: "What's slowing you down?",
    hint: "Tap all that apply.",
    options: choices("No systems in place", "Too many manual tasks", "Can't scale past current revenue", "No leads or pipeline", "Team is overwhelmed", "Brand isn't converting", "Tech stack is a mess", "I'm the bottleneck"),
  },
  {
    id: "revenue",
    kind: "choice",
    field: "revenue_range",
    title: "Where is revenue today?",
    hint: "Per year, roughly. It helps me suggest the right first step.",
    options: [
      { value: "Pre-revenue", label: "No revenue yet" },
      { value: "$0 - $50K", label: "Up to $50K" },
      { value: "$50K - $250K", label: "$50K to $250K" },
      { value: "$250K - $1M", label: "$250K to $1M" },
      { value: "$1M - $5M", label: "$1M to $5M" },
      { value: "$5M+", label: "$5M or more" },
    ],
  },
  {
    id: "budget",
    kind: "choice",
    field: "budget",
    title: "What budget do you have in mind?",
    hint: "A rough range is fine.",
    options: [
      { value: "Under $1K" },
      { value: "$1K - $5K", label: "$1K to $5K" },
      { value: "$5K - $15K", label: "$5K to $15K" },
      { value: "$15K - $50K", label: "$15K to $50K" },
      { value: "$50K+", label: "$50K or more" },
      { value: "Let's discuss", label: "Not sure yet, let's discuss" },
    ],
  },
  {
    id: "contact",
    kind: "fields",
    title: "Where should I reply?",
    hint: "Name and email are all I need.",
    fields: [
      { field: "name", label: "Name", placeholder: "Full name", type: "text", autoComplete: "name", required: true, autoCapitalize: "words" },
      { field: "email", label: "Email", placeholder: "you@company.com", type: "email", autoComplete: "email", required: true, inputMode: "email", autoCapitalize: "none" },
      { field: "phone", label: "Phone", placeholder: "(555) 000-0000", type: "tel", autoComplete: "tel", inputMode: "tel", hint: "Helpful for a quick follow up." },
    ],
  },
  {
    id: "business",
    kind: "fields",
    title: "Where can I take a look?",
    hint: "All optional. It lets me look before we talk.",
    fields: [
      { field: "company", label: "Company or brand", placeholder: "Company name", type: "text", autoComplete: "organization" },
      { field: "website", label: "Website", placeholder: "yourcompany.com", type: "text", autoComplete: "url", inputMode: "url", autoCapitalize: "none" },
      { field: "social", label: "Main social handle", placeholder: "@yourbrand", type: "text", autoComplete: "off", autoCapitalize: "none", hint: "Instagram, X, LinkedIn, or TikTok." },
    ],
  },
  {
    id: "source",
    kind: "choice",
    field: "how_found",
    title: "How did you find me?",
    hint: "Last question.",
    options: choices("Google", "Social Media", "Referral", "TV / Entertainment", "Podcast", "Other"),
  },
];

const REVIEW: Step = { id: "review", kind: "review" };
const MODAL_STEPS: Step[] = [{ id: "intro", kind: "intro" }, ...QUESTIONS, REVIEW];
const INLINE_STEPS: Step[] = [...QUESTIONS, REVIEW];

function labelFor(field: ChoiceField, value: string): string {
  for (const step of QUESTIONS) {
    if (step.kind === "choice" && step.field === field) {
      return step.options.find((option) => option.value === value)?.label ?? value;
    }
  }
  return value;
}

const PRIMARY =
  "w-full py-3.5 px-4 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none";

const DIRECT = [
  { icon: Phone, label: "Call", value: "(510) 680-9100", href: "tel:+15106809100" },
  { icon: MessageSquare, label: "Text", value: "(510) 693-4083", href: "sms:+15106934083" },
  { icon: Mail, label: "Email", value: "bigfilmsonly@gmail.com", href: "mailto:bigfilmsonly@gmail.com" },
];

/**
 * Call, text and email as three even rows, with the number on show for desktop visitors.
 * `columns` sets the three side by side from lg: up, for a page wide enough to hold them
 * (the /contact page); the modal keeps its rows at every size.
 */
export function DirectContactList({ columns = false }: { columns?: boolean }) {
  return (
    <ul
      className={`bg-[#1A1A1A] border border-[#3D3A35] divide-y divide-[#3D3A35]/60 text-left${
        columns ? " lg:grid lg:grid-cols-3 lg:divide-y-0 lg:divide-x" : ""
      }`}
    >
      {DIRECT.map(({ icon: Icon, label, value, href }) => (
        <li key={label}>
          <a
            href={href}
            className={`group flex items-center gap-4 min-h-[64px] px-5 py-3 hover:bg-[#D4A853]/[0.06] active:bg-[#D4A853]/10 transition-colors md:min-h-[72px]${
              columns ? " lg:h-full lg:min-h-[88px] lg:px-6" : ""
            }`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0 text-[#D4A853]" strokeWidth={1.5} aria-hidden />
            <span className="flex-1 min-w-0">
              <span className="block text-[10px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">{label}</span>
              <span className="block truncate text-[15px] text-[#FAF8F5] md:text-base">{value}</span>
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 text-[#5C5750] group-hover:text-[#D4A853] transition-colors" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs md:gap-4">
      <span className="flex-1 h-px bg-[#3D3A35]/60" />
      {label}
      <span className="flex-1 h-px bg-[#3D3A35]/60" />
    </p>
  );
}

function OptionButton({ label, selected, multi, onClick }: { label: string; selected: boolean; multi?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full min-h-[52px] px-4 py-3 flex items-center gap-3 text-left border transition-colors active:scale-[0.99] ${
        selected ? "border-[#D4A853] bg-[#D4A853]/10" : "border-[#3D3A35] bg-[#1A1A1A] hover:border-[#D4A853]/40"
      }`}
    >
      <span className="flex-1 text-[15px] leading-snug text-[#FAF8F5] md:text-base">{label}</span>
      <span
        aria-hidden
        className={`w-5 h-5 shrink-0 flex items-center justify-center border transition-colors ${multi ? "" : "rounded-full"} ${
          selected ? "bg-[#D4A853] border-[#D4A853]" : "border-[#5C5750]"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-[#0D0D0D]" strokeWidth={3} />}
      </span>
    </button>
  );
}

function ContactFlow({ variant, onClose, onBook }: { variant: "modal" | "inline"; onClose?: () => void; onBook?: () => void }) {
  const isModal = variant === "modal";
  const steps = isModal ? MODAL_STEPS : INLINE_STEPS;
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [form, setForm] = useState(EMPTY_FORM);
  const [emailTouched, setEmailTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLFormElement>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moved = useRef(false);

  const current = steps[step];
  const questionNumber = QUESTIONS.indexOf(current) + 1;
  const done = status === "success";
  const Heading = isModal ? "h2" : "h3";

  // A new step, or the thank you, starts at its top. Nothing moves on first
  // render, so the inline form never pulls the page down on load, and an error
  // after Send stays in view under the button.
  useEffect(() => {
    if (!moved.current) return;
    if (isModal) {
      scrollRef.current?.scrollTo({ top: 0 });
    } else if (rootRef.current && rootRef.current.getBoundingClientRect().top < 0) {
      rootRef.current.scrollIntoView({ block: "start" });
    }
  }, [step, done, isModal]);

  // A step with fields focuses its first empty box.
  const hasFields = current.kind === "fields";
  useEffect(() => {
    if (!moved.current || !hasFields) return;
    const timer = setTimeout(() => {
      const inputs = Array.from(fieldsRef.current?.querySelectorAll("input") ?? []);
      (inputs.find((input) => !input.value) ?? inputs[0])?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, [step, hasFields]);

  useEffect(() => {
    if (!isModal || !onClose) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModal, onClose]);

  useEffect(
    () => () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    },
    []
  );

  const goNext = () => {
    if (step < steps.length - 1) {
      moved.current = true;
      setDirection("forward");
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const goBack = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (step > 0) {
      moved.current = true;
      setDirection("back");
      setStep((s) => Math.max(s - 1, 0));
    }
  };

  const canAdvance = () => {
    if (current.kind === "fields") {
      return current.fields.every(({ field, type, required }) => {
        if (!required) return true;
        const val = form[field];
        if (!val.trim()) return false;
        if (type === "email" && !EMAIL_PATTERN.test(val)) return false;
        return true;
      });
    }
    if (current.kind === "multi") return form[current.field].length > 0;
    return true;
  };

  const handleFieldsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAdvance()) goNext();
  };

  // One advance per question: a second quick tap changes the answer, it never skips the next question.
  const handleSelect = (field: ChoiceField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (advanceTimer.current) return;
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      goNext();
    }, 250);
  };

  const handleMulti = (field: string, value: string) => {
    setForm((prev) => {
      const arr = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async () => {
    if (status === "loading") return;
    setStatus("loading");

    const saved = await saveRecord("contact_submissions", {
      name: sanitize(form.name) || "",
      email: form.email,
      phone: sanitize(form.phone),
      company: sanitize(form.company),
      website: sanitize(form.website),
      social_media: sanitize(form.social),
      service: sanitize(form.service),
      revenue_range: form.revenue_range || null,
      challenge: sanitize(form.bottlenecks.length > 0 ? form.bottlenecks.join(", ") : null),
      budget: sanitize(form.budget),
      how_found: sanitize(form.how_found),
    });

    if (!saved.ok) {
      setStatus("error");
    } else {
      moved.current = true;
      setStatus("success");
      trackEvent.formSubmit("Contact Application");
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          data: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            website: form.website,
            social_media: form.social,
            service: form.service,
            challenge: form.bottlenecks.join(", "),
            revenue_range: form.revenue_range,
            budget: form.budget,
            how_found: form.how_found,
          },
        }),
      }).catch(() => {});
    }
  };

  const showProgress = !done && current.kind !== "intro";
  const progress = current.kind === "review" ? 100 : (questionNumber / QUESTIONS.length) * 100;
  const counter = done ? "" : current.kind === "intro" ? "Jotham Hall" : current.kind === "review" ? "Review" : `${questionNumber} of ${QUESTIONS.length}`;
  const firstName = form.name.trim().split(/\s+/)[0] ?? "";

  const topBar = (
    <>
      <div className="grid grid-cols-[44px_1fr_44px] items-center">
        <div>
          {!done && step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="w-11 h-11 -ml-3 flex items-center justify-center text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className={`text-center text-[11px] tracking-[0.15em] uppercase md:text-xs ${current.kind === "intro" ? "font-display text-[#8A837B]" : "text-[#B8B0A8]"}`}>
          {counter}
        </p>
        <div className="flex justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 -mr-3 flex items-center justify-center text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      {showProgress && (
        <div className="mt-1 h-[2px] bg-[#3D3A35]/60" aria-hidden>
          <div className="h-full bg-[#D4A853] transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      )}
    </>
  );

  let body: React.ReactNode = null;

  if (done) {
    body = (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-[#D4A853] flex items-center justify-center">
          <Check className="w-7 h-7 text-[#D4A853]" strokeWidth={1.5} />
        </div>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:text-xs">Sent</p>
        <Heading className="font-display text-[1.625rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4 md:text-3xl">
          {firstName ? `Thank you, ${firstName}` : "Thank you"}
        </Heading>
        <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto md:text-[17px] md:max-w-md">
          I read every answer myself and reply within 24 hours on business days. If I am not the right person to help, I will tell you that too.
        </p>
        {onBook && (
          <div className="mt-8">
            <p className="text-[13px] text-[#8A837B] mb-3 md:text-sm">Want to talk sooner?</p>
            <button type="button" onClick={onBook} className={PRIMARY}>
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        {isModal && (
          <>
            <div className="mt-10 mb-4">
              <Divider label="Want to talk sooner?" />
            </div>
            <DirectContactList />
            <button type="button" onClick={onClose} className={`${PRIMARY} mt-6`}>
              Done
            </button>
          </>
        )}
      </div>
    );
  } else if (current.kind === "intro") {
    body = (
      <div className="text-center">
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:text-xs">Work With Me</p>
        <Heading className="font-display text-[1.625rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4 md:text-3xl">
          Tell me about your business
        </Heading>
        <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto mb-8 md:text-[17px] md:max-w-md">
          Seven quick questions, about a minute. I read every answer myself and reply within 24 hours.
        </p>
        <button type="button" onClick={goNext} className={PRIMARY}>
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-3 text-[13px] text-[#8A837B] md:text-sm">Free consultation. No obligation.</p>
        <div className="mt-10 mb-4">
          <Divider label="Or reach me directly" />
        </div>
        <DirectContactList />
      </div>
    );
  } else if (current.kind === "choice" || current.kind === "multi") {
    const isMulti = current.kind === "multi";
    const picked = form[current.field];
    body = (
      <div>
        <div className="text-center mb-7">
          <Heading className="font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:text-2xl">
            {current.title}
          </Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-balance text-[#B8B0A8] md:text-[17px]">{current.hint}</p>
        </div>
        <div className="space-y-2">
          {current.options.map((option) => (
            <OptionButton
              key={option.value}
              label={option.label ?? option.value}
              multi={isMulti}
              selected={Array.isArray(picked) ? picked.includes(option.value) : picked === option.value}
              onClick={() =>
                current.kind === "multi" ? handleMulti(current.field, option.value) : handleSelect(current.field, option.value)
              }
            />
          ))}
        </div>
        {isMulti && (
          <button type="button" onClick={goNext} disabled={!canAdvance()} className={`${PRIMARY} mt-6`}>
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  } else if (current.kind === "fields") {
    const optionalOnly = current.fields.every((f) => !f.required);
    const anyFilled = current.fields.some((f) => form[f.field].trim() !== "");
    const emailInvalid =
      emailTouched &&
      current.fields.some((f) => f.type === "email") &&
      form.email.trim() !== "" &&
      !EMAIL_PATTERN.test(form.email);
    body = (
      <form ref={fieldsRef} onSubmit={handleFieldsSubmit}>
        <div className="text-center mb-7">
          <Heading className="font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:text-2xl">
            {current.title}
          </Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-balance text-[#B8B0A8] md:text-[17px]">{current.hint}</p>
        </div>
        <div className="space-y-5">
          {current.fields.map((f, i) => {
            const isLast = i === current.fields.length - 1;
            return (
              <label key={f.field} className="block">
                <span className="flex items-baseline justify-between mb-2">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-[#B8B0A8] md:text-xs">{f.label}</span>
                  {!f.required && <span className="text-[11px] tracking-[0.15em] uppercase text-[#5C5750] md:text-xs">Optional</span>}
                </span>
                <input
                  name={f.field}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoCapitalize={f.autoCapitalize}
                  autoCorrect="off"
                  spellCheck={false}
                  required={f.required}
                  value={form[f.field]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.field]: e.target.value }))}
                  onBlur={f.type === "email" ? () => setEmailTouched(true) : undefined}
                  onKeyDown={(e) => {
                    // Enter moves to the next box; only the last one sends the step on.
                    if (e.key === "Enter" && !isLast) {
                      e.preventDefault();
                      const inputs = Array.from(fieldsRef.current?.querySelectorAll("input") ?? []);
                      inputs[i + 1]?.focus();
                    }
                  }}
                  enterKeyHint={isLast ? "go" : "next"}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  className="w-full h-[52px] px-4 bg-[#1A1A1A] border border-[#3D3A35] rounded-none text-[17px] text-[#FAF8F5] placeholder:text-[#5C5750] outline-none focus:border-[#D4A853] transition-colors"
                />
                {f.hint && <span className="block mt-2 text-[13px] text-[#8A837B] md:text-sm">{f.hint}</span>}
              </label>
            );
          })}
        </div>
        {emailInvalid && (
          <p role="alert" className="mt-4 text-[13px] text-[#E8C97A] md:text-sm">
            Check the email address. It should look like name@company.com.
          </p>
        )}
        <button type="submit" disabled={!canAdvance()} className={`${PRIMARY} mt-8`}>
          {optionalOnly && !anyFilled ? "Skip" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    );
  } else if (current.kind === "review") {
    const rows: [string, string][] = [
      ["Name", form.name],
      ["Email", form.email],
      ["Phone", form.phone],
      ["Help with", form.service],
      ["Revenue", form.revenue_range && labelFor("revenue_range", form.revenue_range)],
      ["Budget", form.budget && labelFor("budget", form.budget)],
      ["Website", form.website],
    ];
    body = (
      <div>
        <div className="text-center mb-7">
          <Heading className="font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:text-2xl">
            Ready to send?
          </Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-balance text-[#B8B0A8] md:text-[17px]">Here is what I will read. Go back to change anything.</p>
        </div>
        <dl className="border border-[#3D3A35] divide-y divide-[#3D3A35]/60 mb-7">
          {rows
            .filter(([, value]) => value.trim() !== "")
            .map(([label, value]) => (
              <div key={label} className="px-4 py-3">
                <dt className="text-[10px] tracking-[0.15em] uppercase text-[#8A837B] mb-1 md:text-xs">{label}</dt>
                <dd className="text-[15px] text-[#FAF8F5] break-words md:text-base">{value}</dd>
              </div>
            ))}
        </dl>
        <button type="button" onClick={handleSubmit} disabled={status === "loading"} className={PRIMARY}>
          {status === "loading" ? "Sending..." : "Send My Answers"}
          {status !== "loading" && <Send className="w-4 h-4" />}
        </button>
        {status === "error" && (
          <p role="alert" className="mt-4 text-[14px] leading-relaxed text-[#E8C97A] text-center md:text-[15px]">
            That did not go through. Please try again, or email me at{" "}
            <a href="mailto:bigfilmsonly@gmail.com" className="underline underline-offset-2">
              bigfilmsonly@gmail.com
            </a>
            .
          </p>
        )}
        <p className="mt-4 text-[13px] text-[#8A837B] text-center md:text-sm">Free consultation. No obligation.</p>
      </div>
    );
  }

  const animated = `w-full animate-in fade-in duration-300 motion-reduce:animate-none ${
    direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
  }`;

  if (isModal) {
    // A click on the dimmed page closes the desktop dialog only while nothing
    // would be lost (the first screen, or after sending). Mid application it
    // does nothing, so a stray click never throws answers away.
    const dismissible = done || current.kind === "intro";
    return (
      <>
        {/* The dimmed page behind the desktop dialog. Phones never draw it: there the dialog fills the screen. */}
        <div
          aria-hidden
          onClick={dismissible ? onClose : undefined}
          className="hidden md:block fixed inset-0 z-[1001] bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 motion-reduce:animate-none"
        />
        {/* Full screen on a phone. From md: up a centered dialog of one steady height, so Back and Close never move between steps. */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contact Jotham Hall"
          className="fixed inset-0 z-[1001] bg-[#0D0D0D] flex flex-col md:m-auto md:w-full md:max-w-[560px] md:h-[820px] md:max-h-[90vh] md:overflow-hidden md:rounded-xl md:border md:border-[#3D3A35] md:shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:animate-in md:fade-in md:zoom-in-95 md:duration-200 md:motion-reduce:animate-none"
        >
          <div className="shrink-0 px-6 pt-2 pb-1 md:px-10 md:pt-4 md:pb-2">{topBar}</div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
            <div className="min-h-full flex flex-col px-6 pt-8 pb-10 md:px-10">
              {/* The intro and the thank you sit centered; questions keep one top line so the eye never hunts. */}
              <div key={done ? "done" : step} className={`${done || current.kind === "intro" ? "my-auto" : "pt-2"} ${animated}`}>
                {body}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div ref={rootRef} className="scroll-mt-6">
      {!done && <div className="mb-8">{topBar}</div>}
      <div key={done ? "done" : step} className={animated}>
        {body}
      </div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  // While open, hold the page still. The document scrolls on <html> (globals.css
  // sets its overflow), so <html> is locked along with <body>, as the booking
  // modal does; with <body> alone, a wheel over the desktop dialog scrolled the
  // dimmed page behind it.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
    };
  }, [isOpen]);

  // The flow mounts fresh on every open, so each visit starts at the first screen with empty answers.
  if (!isOpen) return null;

  return <ContactFlow variant="modal" onClose={onClose} />;
}

/** The same application, inline. `onBook` lets the host page offer its own booking modal after sending. */
export function ContactForm({ onBook }: { onBook?: () => void }) {
  return <ContactFlow variant="inline" onBook={onBook} />;
}
