"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";
import {
  ServiceClosing,
  ServiceFaqs,
  ServiceHero,
  ServiceNav,
  ServiceProof,
  ServiceSection,
  ServiceSteps,
} from "@/components/service-page-template";
import { services, servicesIndex } from "./services-data";
import { BrainAndPath } from "@/components/path/brain-and-path";

// The phone layout is the base; md: and lg: variants give the desktop its size (see
// components/service-page-template.tsx). The four services are a 2x2 grid from md.
// The job of this page: a visitor finds their problem in one glance and taps it, or books.

export function ServicesIndex() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const book = () => setIsCalendlyOpen(true);

  return (
    <>
      <main className="min-h-screen bg-background">
        <ServiceNav>
          <button
            type="button"
            onClick={book}
            className="px-4 py-2 md:px-5 md:py-2.5 bg-[#D4A853] text-[#0D0D0D] text-xs md:text-[13px] font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97] md:cursor-pointer"
          >
            Book a Call
          </button>
        </ServiceNav>

        <ServiceHero
          label="Services"
          headline={servicesIndex.headline}
          intro={servicesIndex.intro}
          onBook={book}
          showCredentials={false}
        />

        {/* Right under the hero: the system behind every service, and the free training that builds it. */}
        <BrainAndPath />

        <ServiceSection label="Four Services" title="Where are you stuck?">
          <ul className="space-y-2.5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-4 p-5 md:h-full md:items-start md:gap-6 md:p-8 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.99]"
                >
                  {/* Text from the top on a desktop, so the labels in a row line up however the summaries wrap. */}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]/80">
                      {service.problem}
                    </span>
                    <span className="block mt-2 md:mt-3 font-display text-[1.05rem] md:text-xl leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
                      {service.name}
                    </span>
                    <span className="block mt-1.5 md:mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] md:text-balance">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 shrink-0 md:self-center text-[#D4A853] transition-transform group-hover:translate-x-0.5" />
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
