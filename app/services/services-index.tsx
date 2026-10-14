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

// Phone width at every screen size (see globals.css), so no sm:, md: or lg: layouts here.
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
            className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-xs font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
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

        <ServiceSection label="Four Services" title="Where are you stuck?">
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-4 p-5 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.99]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] tracking-[0.15em] uppercase text-[#D4A853]/80">
                      {service.problem}
                    </span>
                    <span className="block mt-2 font-display text-[1.05rem] leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
                      {service.name}
                    </span>
                    <span className="block mt-1.5 text-[15px] leading-relaxed text-[#B8B0A8]">{service.summary}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#D4A853] transition-transform group-hover:translate-x-0.5" />
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
