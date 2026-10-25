"use client";

import { useState } from "react";
import { CalendlyModal } from "@/components/calendly-modal";
import { SiteHeader } from "@/components/site-header";
import { FooterSection } from "@/components/landing/footer-section";
import type { Faq, Offer, ProofVenture, Step } from "@/lib/city-data";
import { ClosingCta, FaqSection, Hero, OffersSection, ProofSection, StepsSection } from "./city-sections";

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
}

/*
  The city page ends like every other page: the closing card, then the site
  footer, whose email signup and its own space for the tab bar close the
  page (the page's own "Not Ready for a Call?" signup repeated the footer's).
*/
export function CityPageContent({ copy, ventures }: { copy: CityPageCopy; ventures: ProofVenture[] }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background text-foreground">
        <Hero eyebrow={copy.eyebrow} headline={copy.headline} intro={copy.intro} onBook={openCalendly} />

        <ProofSection ventures={ventures} />

        <OffersSection title={copy.offersTitle} offers={copy.offers} />

        <StepsSection title="From First Call to Working System" steps={copy.steps} />

        <FaqSection faqs={copy.faqs} />

        <ClosingCta title={copy.closingTitle} body={copy.closingBody} onBook={openCalendly} />

        <FooterSection />
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
