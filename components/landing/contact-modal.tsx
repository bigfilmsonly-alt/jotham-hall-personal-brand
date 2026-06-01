"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowRight, ArrowLeft, Check, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  { id: "intro", type: "intro" },
  { id: "name", type: "text", label: "What's your name?", placeholder: "Full name", field: "name", required: true },
  { id: "email", type: "text", label: "What's the best email to reach you?", placeholder: "you@company.com", field: "email", inputType: "email", required: true },
  { id: "phone", type: "text", label: "Phone number?", subtitle: "Optional, but helpful for quick follow up", placeholder: "(555) 000-0000", field: "phone", inputType: "tel" },
  { id: "company", type: "text", label: "What's your company or brand?", placeholder: "Company name", field: "company" },
  { id: "website", type: "text", label: "What's your website?", subtitle: "So I can take a look before our call", placeholder: "successupgrade.ai", field: "website" },
  { id: "social", type: "text", label: "Drop your main social handle", subtitle: "Instagram, X, LinkedIn, or TikTok", placeholder: "@yourbrand", field: "social" },
  {
    id: "service", type: "select", label: "What do you need?", field: "service",
    options: ["AI Automation", "Revenue Systems", "Brand Strategy", "Fractional COO", "VibeCoding", "Video Production", "Full Business Overhaul", "Not sure yet"],
  },
  {
    id: "bottleneck", type: "multi", label: "What's your biggest bottleneck?", subtitle: "Tap all that apply", field: "bottlenecks",
    options: ["No systems in place", "Too many manual tasks", "Can't scale past current revenue", "No leads or pipeline", "Team is overwhelmed", "Brand isn't converting", "Tech stack is a mess", "I'm the bottleneck"],
  },
  {
    id: "revenue", type: "select", label: "What's your annual revenue?", field: "revenue_range",
    options: ["Pre-revenue", "$0 - $50K", "$50K - $250K", "$250K - $1M", "$1M - $5M", "$5M+"],
  },
  {
    id: "budget", type: "select", label: "What's your budget for this?", field: "budget",
    options: ["Under $1K", "$1K - $5K", "$5K - $15K", "$15K - $50K", "$50K+", "Let's discuss"],
  },
  {
    id: "source", type: "select", label: "How did you find me?", field: "how_found",
    options: ["Google", "Social Media", "Referral", "TV / Entertainment", "Podcast", "Other"],
  },
  { id: "submit", type: "submit" },
] as const;

type StepType = (typeof STEPS)[number];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
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
  });

  const current = STEPS[step];
  const totalSteps = STEPS.length;
  const progress = ((step) / (totalSteps - 1)) * 100;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStep(0);
      setStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (current.type === "text" && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step, current.type]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    setForm({ name: "", email: "", phone: "", company: "", website: "", social: "", service: "", bottlenecks: [], revenue_range: "", budget: "", how_found: "" });
    setStep(0);
    setStatus("idle");
    onClose();
  };

  const goNext = () => {
    if (step < totalSteps - 1) {
      setDirection("forward");
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection("back");
      setStep((s) => s - 1);
    }
  };

  const canAdvance = () => {
    if (current.type === "text" && "required" in current && current.required) {
      const val = form[current.field as keyof typeof form] as string;
      if (!val.trim()) return false;
      if (current.inputType === "email" && !/\S+@\S+\.\S+/.test(val)) return false;
    }
    return true;
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canAdvance()) goNext();
  };

  const handleSelect = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => goNext(), 250);
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

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      website: form.website || null,
      social_media: form.social || null,
      service: form.service || null,
      revenue_range: form.revenue_range || null,
      challenge: form.bottlenecks.length > 0 ? form.bottlenecks.join(", ") : null,
      budget: form.budget || null,
      how_found: form.how_found || null,
    });

    if (error) {
      setStatus("error");
    } else {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] bg-background flex flex-col">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {step > 0 && status !== "success" && (
            <button
              type="button"
              onClick={goBack}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <span className="font-display text-sm tracking-tight text-foreground/40">
            {step > 0 && status !== "success"
              ? `${step} of ${totalSteps - 2}`
              : "Jotham Hall"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      {status !== "success" && (
        <div className="shrink-0 px-6">
          <div className="h-0.5 bg-foreground/10 w-full">
            <div
              className="h-full bg-foreground transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div
          key={step}
          className={`w-full max-w-md ${
            direction === "forward" ? "animate-in fade-in slide-in-from-right-4" : "animate-in fade-in slide-in-from-left-4"
          } duration-300`}
        >
          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-foreground flex items-center justify-center">
                <Check className="w-9 h-9 text-foreground" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4">
                You&apos;re in.
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                I review every application personally. Expect a response within 24 hours with next steps.
              </p>
              <button
                onClick={handleClose}
                className="mt-10 px-8 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* INTRO STEP */}
          {status !== "success" && current.id === "intro" && (
            <div className="text-center">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-6">
                Apply to Work Together
              </p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4 leading-[1.1]">
                Tell me about
                <br />
                your business.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-10">
                This takes about 60 seconds. The more you share, the better I can diagnose exactly what you need.
              </p>
              <button
                type="button"
                onClick={goNext}
                className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2 mx-auto active:scale-[0.97]"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-muted-foreground/50 font-mono mt-6">
                Free consultation. No obligation.
              </p>
            </div>
          )}

          {/* TEXT INPUT STEPS */}
          {status !== "success" && current.type === "text" && (
            <form onSubmit={handleTextSubmit}>
              <label className="block">
                <span className="font-display text-2xl sm:text-3xl tracking-tight block mb-2">
                  {current.label}
                </span>
                {"subtitle" in current && current.subtitle && (
                  <span className="text-sm text-muted-foreground block mb-8">
                    {current.subtitle}
                  </span>
                )}
                {!("subtitle" in current) && <span className="block mb-8" />}
                <input
                  ref={inputRef}
                  name={current.field}
                  type={"inputType" in current ? current.inputType : "text"}
                  required={"required" in current && current.required}
                  value={form[current.field as keyof typeof form] as string}
                  onChange={(e) => setForm((prev) => ({ ...prev, [current.field]: e.target.value }))}
                  placeholder={current.placeholder}
                  className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground text-xl sm:text-2xl py-3 outline-none transition-colors placeholder-foreground/20 font-display"
                  autoComplete={
                    current.field === "name" ? "name"
                    : current.field === "email" ? "email"
                    : current.field === "phone" ? "tel"
                    : "off"
                  }
                />
              </label>
              <button
                type="submit"
                disabled={!canAdvance()}
                className="mt-10 px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2 disabled:opacity-20 disabled:pointer-events-none active:scale-[0.97]"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
              {!("required" in current && current.required) && (
                <button
                  type="button"
                  onClick={goNext}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                >
                  Skip this step
                </button>
              )}
            </form>
          )}

          {/* SINGLE SELECT STEPS */}
          {status !== "success" && current.type === "select" && (
            <div>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-8">
                {current.label}
              </h2>
              <div className="space-y-2">
                {current.options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(current.field, opt)}
                    className={`w-full text-left px-5 py-4 border transition-all duration-150 flex items-center justify-between group active:scale-[0.98] ${
                      form[current.field as keyof typeof form] === opt
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-foreground/10 hover:border-foreground/30"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt}</span>
                    <span className={`text-xs font-mono ${
                      form[current.field as keyof typeof form] === opt
                        ? "text-background/50"
                        : "text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MULTI SELECT STEPS */}
          {status !== "success" && current.type === "multi" && (
            <div>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-2">
                {current.label}
              </h2>
              {"subtitle" in current && current.subtitle && (
                <p className="text-sm text-muted-foreground mb-6">{current.subtitle}</p>
              )}
              <div className="space-y-2 mb-8">
                {current.options.map((opt) => {
                  const selected = (form[current.field as keyof typeof form] as string[]).includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleMulti(current.field, opt)}
                      className={`w-full text-left px-5 py-4 border transition-all duration-150 flex items-center gap-3 active:scale-[0.98] ${
                        selected
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground border-foreground/10 hover:border-foreground/30"
                      }`}
                    >
                      <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors ${
                        selected ? "border-background bg-background" : "border-foreground/30"
                      }`}>
                        {selected && <Check className="w-3 h-3 text-foreground" strokeWidth={3} />}
                      </div>
                      <span className="text-sm font-medium">{opt}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={goNext}
                disabled={(form[current.field as keyof typeof form] as string[]).length === 0}
                className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2 disabled:opacity-20 disabled:pointer-events-none active:scale-[0.97]"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* SUBMIT STEP */}
          {status !== "success" && current.id === "submit" && (
            <div className="text-center">
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-6">
                Almost Done
              </p>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4 leading-[1.1]">
                Ready to submit?
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-3">
                Here&apos;s what I got:
              </p>

              {/* Summary */}
              <div className="text-left border border-foreground/10 divide-y divide-foreground/10 mb-8 text-sm max-w-sm mx-auto">
                <div className="px-4 py-3 flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="px-4 py-3 flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium truncate ml-4">{form.email}</span>
                </div>
                {form.website && (
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Website</span>
                    <span className="font-medium truncate ml-4">{form.website}</span>
                  </div>
                )}
                {form.service && (
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{form.service}</span>
                  </div>
                )}
                {form.budget && (
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{form.budget}</span>
                  </div>
                )}
                {form.revenue_range && (
                  <div className="px-4 py-3 flex justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium">{form.revenue_range}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="px-10 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2 mx-auto active:scale-[0.97] disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Submit Application"}
                {status !== "loading" && <Send className="w-4 h-4" />}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-400 font-mono mt-4">Something went wrong. Try again.</p>
              )}

              <p className="text-[10px] text-muted-foreground/50 font-mono mt-6">
                Free consultation. No obligation. Response within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
