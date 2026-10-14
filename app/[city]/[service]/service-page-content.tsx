"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import type { Faq, ProofVenture, Step } from "@/lib/city-data";
import { ClosingCta, FaqSection, Hero, ProofSection, StepsSection, TopNav } from "../city-sections";

export interface ServicePageCopy {
  name: string;
  headline: string;
  intro: string;
  steps: Step[];
  faqs: Faq[];
  closingTitle: string;
  closingBody: string;
}

export function ServicePageContent({
  city,
  copy,
  ventures,
}: {
  city: { slug: string; name: string };
  copy: ServicePageCopy;
  ventures: ProofVenture[];
}) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  const related = [
    { href: `/${city.slug}`, label: `AI Automation in ${city.name}` },
    { href: "/services", label: "All Services" },
  ];

  return (
    <>
      <main className="min-h-screen bg-background text-foreground pb-36">
        <TopNav onBook={openCalendly} />

        <Hero
          eyebrow={
            <nav aria-label="Breadcrumb">
              <Link href={`/${city.slug}`} className="hover:text-[#E8C97A] transition-colors">
                {city.name}
              </Link>
              <span className="mx-2 text-[#5C5750]">/</span>
              {copy.name}
            </nav>
          }
          headline={copy.headline}
          intro={copy.intro}
          onBook={openCalendly}
        />

        <ProofSection ventures={ventures} />

        <StepsSection title="From Idea to Working App" steps={copy.steps} />

        <FaqSection faqs={copy.faqs} />

        <ClosingCta title={copy.closingTitle} body={copy.closingBody} onBook={openCalendly} />

        {/* This block ends the page in place of the site footer. data-site-footer
            tells the floating Book a Call (components/floating-cta.tsx) to step
            aside once the closing card above reaches the screen. */}
        <nav data-site-footer aria-label={`More in ${city.name}`} className="px-6 pt-14">
          <h2 className="flex items-center gap-3 mb-4 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
            More Ways I Help
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
          </h2>
          <div className="space-y-2.5">
            {related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between px-5 py-4 border border-[#3D3A35] text-[15px] text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.99]"
              >
                {link.label}
                <ArrowRight className="w-4 h-4 text-[#D4A853] transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </nav>
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
