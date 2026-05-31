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
  "VibeCoding / Say It Build It",
  "Video Production",
  "Not sure yet",
];

const revenueRanges = [
  "Pre-revenue",
  "$0 - $50K/year",
  "$50K - $250K/year",
  "$250K - $1M/year",
  "$1M - $5M/year",
  "$5M+/year",
];

const sources = [
  "Google Search",
  "Social Media",
  "Referral",
  "TV / Entertainment",
  "Podcast",
  "Other",
];

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    service: "",
    revenue_range: "",
    challenge: "",
    how_found: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      website: form.website || null,
      service: form.service,
      revenue_range: form.revenue_range,
      challenge: form.challenge,
      how_found: form.how_found || null,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", company: "", website: "", service: "", revenue_range: "", challenge: "", how_found: "" });
    setStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-3 bg-foreground/5 border border-foreground/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors text-sm";
  const labelClass = "block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-background border border-foreground/20 p-6 sm:p-8">
          <button
            onClick={status === "success" ? resetForm : onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-foreground/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="font-display text-2xl tracking-tight mb-3">Application received.</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                I review every submission personally. Expect a response within 24 hours.
              </p>
              <button
                onClick={resetForm}
                className="mt-8 px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                  Apply to Work Together
                </span>
                <h3 className="font-display text-xl sm:text-2xl tracking-tight">
                  Tell me about your business
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  The more detail you share, the better I can diagnose what you need.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jotham Hall" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClass}>Company / Brand</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your company name" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className={labelClass}>Website</label>
                  <input id="website" name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://yoursite.com" className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className={labelClass}>What do you need? *</label>
                    <select id="service" name="service" required value={form.service} onChange={handleChange} className={selectClass}>
                      <option value="" disabled>Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="revenue_range" className={labelClass}>Annual Revenue *</label>
                    <select id="revenue_range" name="revenue_range" required value={form.revenue_range} onChange={handleChange} className={selectClass}>
                      <option value="" disabled>Select range</option>
                      {revenueRanges.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="challenge" className={labelClass}>What&apos;s your biggest challenge right now? *</label>
                  <textarea
                    id="challenge"
                    name="challenge"
                    required
                    value={form.challenge}
                    onChange={handleChange}
                    placeholder="Be specific. What's broken, what's slowing you down, and what does success look like for you?"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label htmlFor="how_found" className={labelClass}>How did you find me?</label>
                  <select id="how_found" name="how_found" value={form.how_found} onChange={handleChange} className={selectClass}>
                    <option value="">Select one</option>
                    {sources.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400 font-mono">Something went wrong. Try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-sm flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>

                <p className="text-center text-xs text-muted-foreground font-mono">
                  Free consultation. No obligation. Response within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
