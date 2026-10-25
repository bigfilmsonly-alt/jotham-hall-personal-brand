"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { SiteHeader } from "@/components/site-header";
import { FooterSection } from "@/components/landing/footer-section";
import {
  ServiceClosing,
  ServiceFaqs,
  ServiceHero,
  ServiceProof,
  ServiceSection,
  ServiceSteps,
} from "@/components/service-page-template";
import { services, servicesIndex } from "./services-data";
import { BrainAndPath } from "@/components/path/brain-and-path";

// The phone layout is the base; md: and lg: variants give the desktop its size (see
// components/service-page-template.tsx). The four services stack at reading width on
// a tablet and form a 2x2 grid from lg.
// The job of this page: a visitor finds their problem in one glance and taps it, or books.

export function ServicesIndex() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const book = () => setIsCalendlyOpen(true);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <ServiceHero label="Services" headline={servicesIndex.headline} intro={servicesIndex.intro} onBook={book} />

        {/* Right under the hero: the system behind every service, and the free training that builds it. */}
        <BrainAndPath />

        <ServiceSection label="Four Services" title="Where are you stuck?">
          <ul className="space-y-2.5 md:mx-auto md:max-w-2xl md:space-y-3 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-4 p-5 md:h-full md:items-start md:gap-6 md:p-8 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.99]"
                >
                  {/* Text from the top on a desktop, so the labels in a row line up however the summaries wrap. */}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] md:text-sm tracking-[0.1em] uppercase text-[#D4A853]/80">
                      {service.problem}
                    </span>
                    <span className="block mt-2 md:mt-3 font-display text-[1.05rem] md:text-xl leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
                      {service.name}
                    </span>
                    <span className="block mt-1.5 md:mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] text-pretty md:text-balance">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="w-4 h-4 md:w-5 md:h-5 shrink-0 md:self-center text-[#D4A853]" />
                </Link>
              </li>
            ))}
          </ul>
        </ServiceSection>

        <ServiceProof items={servicesIndex.proof} />

        <ServiceSection label="How It Works" title="Three steps, start to finish">
          <ServiceSteps steps={servicesIndex.steps} />
        </ServiceSection>

        <ServiceFaqs faqs={servicesIndex.faqs} />

        <ServiceClosing
          headline={servicesIndex.closing.headline}
          line={servicesIndex.closing.line}
          onBook={book}
        />
      </main>

      <FooterSection />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
