"use client";

import { useState } from "react";
import { CalendlyModal } from "@/components/calendly-modal";
import { saveRecord } from "@/lib/supabase";
import type { Faq, Offer, ProofVenture, Step } from "@/lib/city-data";
import { ClosingCta, FaqSection, Hero, OffersSection, ProofSection, StepsSection, TopNav } from "./city-sections";

export interface CityPageCopy {
  slug: string;
  eyebrow: string;
  headline: string;
  intro: string;
  offersTitle: string;
  offers: Offer[];
  steps: Step[];
  faqs: Faq[];
  closingTitle: string;
  closingBody: string;
  notesTitle: string;
}

export function CityPageContent({ copy, ventures }: { copy: CityPageCopy; ventures: ProofVenture[] }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "loading" | "done">("idle");
  const openCalendly = () => setIsCalendlyOpen(true);

  // Unchanged from the earlier page: saves to email_captures with source
  // city_<slug> and sends the notify email.
  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureEmail || captureStatus === "loading") return;
    setCaptureStatus("loading");
    const saved = await saveRecord("email_captures", { email: captureEmail, source: `city_${copy.slug}` });
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email_capture", data: { email: captureEmail, source: `city_${copy.slug}` } }),
    }).catch(() => {});
    setCaptureEmail("");
    setCaptureStatus("done");
  };

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pb-36">
        <TopNav onBook={openCalendly} />

        <Hero eyebrow={copy.eyebrow} headline={copy.headline} intro={copy.intro} onBook={openCalendly} />

        <ProofSection ventures={ventures} />

        <OffersSection title={copy.offersTitle} offers={copy.offers} />

        <StepsSection title="From First Call to Working System" steps={copy.steps} />

        <FaqSection faqs={copy.faqs} />

        <ClosingCta title={copy.closingTitle} body={copy.closingBody} onBook={openCalendly} />

        {/* This block ends the page in place of the site footer. data-site-footer
            tells the floating Book a Call (components/floating-cta.tsx) to step
            aside once the closing card above reaches the screen. */}
        <section data-site-footer className="px-6 pt-14 md:px-10 md:pt-24 text-center">
          {/* From md: centered at max-w-xl, the email field and its button on one row. */}
          <div className="mx-auto max-w-xl">
            <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] mb-3 md:mb-4">Not Ready for a Call?</p>
            <h2 className="font-display text-lg md:text-2xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3 md:mb-4">
              {copy.notesTitle}
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] md:max-w-md mx-auto mb-6 md:mb-8">
              Short notes on automation, follow up, and building practical tools with AI.
            </p>
            {captureStatus === "done" ? (
              <p className="py-3.5 border border-[#D4A853]/40 text-sm text-[#D4A853] font-medium">You&apos;re in. Welcome.</p>
            ) : (
              <form onSubmit={handleCapture} className="space-y-2.5 md:space-y-0 md:flex md:gap-2.5">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  aria-label="Email address"
                  value={captureEmail}
                  onChange={(e) => setCaptureEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-4 py-3.5 bg-[#1A1A1A] border border-[#3D3A35] text-base text-[#FAF8F5] placeholder-[#5C5750] text-center focus:outline-none focus:border-[#D4A853]/50 transition-colors md:flex-1 md:min-w-0 md:text-left"
                />
                <button
                  type="submit"
                  disabled={captureStatus === "loading"}
                  className="w-full py-3.5 border border-[#D4A853]/50 text-sm font-medium tracking-wide text-[#D4A853] hover:bg-[#D4A853]/10 transition-colors disabled:opacity-50 pointer-coarse:active:scale-[0.97] md:w-auto md:shrink-0 md:px-8"
                >
                  {captureStatus === "loading" ? "Sending..." : "Send Me the Notes"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
