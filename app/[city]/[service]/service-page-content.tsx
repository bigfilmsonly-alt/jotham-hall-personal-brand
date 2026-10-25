"use client";

import { useState } from "react";
import { CalendlyModal } from "@/components/calendly-modal";
import { SiteHeader } from "@/components/site-header";
import { FooterSection } from "@/components/landing/footer-section";
import type { Faq, ProofVenture, Step } from "@/lib/city-data";
import { ClosingCta, FaqSection, Hero, ProofSection, StepsSection } from "../city-sections";

export interface ServicePageCopy {
  name: string;
  headline: string;
  intro: string;
  steps: Step[];
  faqs: Faq[];
  closingTitle: string;
  closingBody: string;
}

/*
  A page inside the city page: the top bar's left side is the way back to it
  (the headline already names the service and the city, so the hero's line
  above it says where Jo is based). It ends like every other page, with the
  closing card and then the site footer, which carries the site's links.
*/
export function ServicePageContent({
  city,
  copy,
  ventures,
}: {
  city: { slug: string; name: string; eyebrow: string };
  copy: ServicePageCopy;
  ventures: ProofVenture[];
}) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      <SiteHeader back={{ href: `/${city.slug}`, label: city.name }} />

      <main className="min-h-screen bg-background text-foreground">
        <Hero eyebrow={city.eyebrow} headline={copy.headline} intro={copy.intro} onBook={openCalendly} />

        <ProofSection ventures={ventures} />

        <StepsSection title="From Idea to Working App" steps={copy.steps} />

        <FaqSection faqs={copy.faqs} />

        <ClosingCta title={copy.closingTitle} body={copy.closingBody} onBook={openCalendly} />

        <FooterSection />
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
