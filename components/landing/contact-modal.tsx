"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  "AI Automation",
  "Revenue Systems",
  "Brand Strategy",
  "Fractional COO",
  "VibeCoding",
  "Video Production",
  "Not sure yet",
];

const bottlenecks = [
  "No systems in place",
  "Too many manual tasks",
  "Can't scale past current revenue",
  "No leads or pipeline",
  "Team is overwhelmed",
  "Brand isn't converting",
  "Tech stack is a mess",
  "I'm the bottleneck",
];

const revenueRanges = [
  "Pre-revenue",
  "$0 - $50K",
  "$50K - $250K",
  "$250K - $1M",
  "$1M - $5M",
  "$5M+",
];

const budgets = [
  "Under $1K",
  "$1K - $5K",
  "$5K - $15K",
  "$15K - $50K",
  "$50K+",
  "Not sure yet",
];

const sources = [
  "Google",
  "Social Media",
  "Referral",
  "TV",
  "Podcast",
  "Other",
];

function ChipSelect({
  label,
  options,
  value,
  onChange,
  multi,
}: {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (opt: string) =>
    multi ? (value as string[]).includes(opt) : value === opt;

  const handleTap = (opt: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]);
    } else {
      onChange(opt);
    }
  };

  return (
    <div>
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleTap(opt)}
            className={`px-3 py-2 text-xs font-medium border transition-all duration-150 active:scale-95 ${
              isSelected(opt)
                ? "bg-foreground text-background border-foreground"
                : "bg-foreground/5 text-foreground/70 border-foreground/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    bottlenecks: [] as string[],
    revenue_range: "",
    budget: "",
    how_found: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      website: null,
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
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", company: "", service: "", bottlenecks: [], revenue_range: "", budget: "", how_found: "" });
    setStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-3 bg-foreground/5 border border-foreground/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors text-sm";
  const labelClass = "text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block";

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {status === "success" ? (
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 border border-foreground/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display text-2xl tracking-tight mb-3">Application received.</h3>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              I review every submission personally. Expect a response within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="mt-8 px-8 py-3 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 h-full flex flex-col"
        >
          {/* Fixed header */}
          <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-foreground/10 bg-background">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Apply to Work Together</p>
              <h3 className="font-display text-base tracking-tight">Tell me about your business</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable fields */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-5 py-5 space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name *</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>Company</label>
                  <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your brand" className={inputClass} />
                </div>
              </div>

              <ChipSelect
                label="What do you need?"
                options={services}
                value={form.service}
                onChange={(val) => setForm((prev) => ({ ...prev, service: val as string }))}
              />

              <ChipSelect
                label="Biggest bottleneck (tap all that apply)"
                options={bottlenecks}
                value={form.bottlenecks}
                onChange={(val) => setForm((prev) => ({ ...prev, bottlenecks: val as string[] }))}
                multi
              />

              <ChipSelect
                label="Annual Revenue"
                options={revenueRanges}
                value={form.revenue_range}
                onChange={(val) => setForm((prev) => ({ ...prev, revenue_range: val as string }))}
              />

              <ChipSelect
                label="What's your budget?"
                options={budgets}
                value={form.budget}
                onChange={(val) => setForm((prev) => ({ ...prev, budget: val as string }))}
              />

              <ChipSelect
                label="How did you find me?"
                options={sources}
                value={form.how_found}
                onChange={(val) => setForm((prev) => ({ ...prev, how_found: val as string }))}
              />

              {status === "error" && (
                <p className="text-xs text-red-400 font-mono">Something went wrong. Try again.</p>
              )}
            </div>
          </div>

          {/* Fixed submit button */}
          <div className="shrink-0 px-5 pt-3 pb-5 border-t border-foreground/10 bg-background" style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-sm flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
              {status !== "loading" && <ArrowRight className="w-4 h-4" />}
            </button>
            <p className="text-center text-[10px] text-muted-foreground font-mono mt-2">
              Free consultation. No obligation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
