"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check, Mail, MessageSquare, Phone, Tv } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";
import { getVenture } from "@/lib/ventures";
import {
  credentials,
  services,
  tvProof,
  type ProofItem,
  type Service,
  type ServiceDeliverable,
  type ServiceFaq,
  type ServiceSlug,
  type ServiceStep,
} from "@/app/services/services-data";

/*
  One template for the four service pages, plus the blocks /services reuses.
  Laid out for the 430px column that globals.css holds the whole site in from
  768px up. Nothing here keys off viewport breakpoints (no sm:, md:, lg:): those
  fire on a desktop screen while the page is still phone width, which is what
  crushed the old two and three column grids into one word per line.

  Order, top to bottom: the outcome, who it is for, what you get, how it works,
  proof, questions, the other services, then the call to book. Every booking
  button opens the Calendly modal; nothing leaves the site.
*/

const primaryButton =
  "w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]";
const secondaryButton =
  "w-full py-3.5 border border-[#3D3A35] text-[#B8B0A8] text-sm font-medium tracking-wide hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]";

const directContacts = [
  { href: "tel:+15106809100", label: "Call (510) 680-9100", icon: Phone },
  { href: "sms:+15106934083", label: "Text (510) 693-4083", icon: MessageSquare },
  { href: "mailto:bigfilmsonly@gmail.com", label: "bigfilmsonly@gmail.com", icon: Mail },
];

export function ServiceNav({ children }: { children: ReactNode }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
      <div className="px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase text-[#FAF8F5]">
          Jotham Hall
        </Link>
        {children}
      </div>
    </nav>
  );
}

export function ServiceHero({
  label,
  headline,
  intro,
  onBook,
  showCredentials = true,
}: {
  label: string;
  headline: string;
  intro: string;
  onBook: () => void;
  // /services turns this off so its four cards start above the fold.
  showCredentials?: boolean;
}) {
  return (
    <header className="px-6 pt-28 pb-12 text-center">
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4">{label}</p>
      <h1 className="font-display text-[1.75rem] leading-[1.25] tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        {headline}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-[#B8B0A8] text-balance">{intro}</p>
      <button type="button" onClick={onBook} className={`mt-8 ${primaryButton}`}>
        Book a Strategy Call
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="mt-3 text-[13px] text-[#8A837B]">Free 30 minute call with me</p>

      {/* The same verified numbers as the home screen, linked to the full list. */}
      {showCredentials && (
        <Link
          href="/credits"
          className="grid grid-cols-3 mt-10 pt-6 border-t border-[#3D3A35]/60 hover:opacity-80 transition-opacity"
        >
          <span className="sr-only">See my TV credits:</span>
          {credentials.map((item) => (
            <span key={item.label} className="block">
              <span className="block font-display text-lg tracking-[0.12em] text-[#FAF8F5]">{item.value}</span>
              <span className="block mt-1 text-[10px] tracking-[0.15em] uppercase text-[#8A837B]">{item.label}</span>
            </span>
          ))}
        </Link>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#D4A853]">
      <span aria-hidden="true" className="w-6 h-px bg-[#D4A853]/40" />
      {children}
      <span aria-hidden="true" className="w-6 h-px bg-[#D4A853]/40" />
    </p>
  );
}

export function ServiceSection({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="px-6 py-12 border-t border-[#3D3A35]/60">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-4 mb-8 text-center font-display text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ForWhoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5 px-5 py-4 bg-[#1A1A1A] border border-[#3D3A35]">
          <Check aria-hidden="true" className="w-4 h-4 mt-[5px] shrink-0 text-[#D4A853]" />
          <span className="text-[15px] leading-relaxed text-[#FAF8F5]/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DeliverableList({ items }: { items: ServiceDeliverable[] }) {
  return (
    <ol className="border-t border-[#3D3A35]/60">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-4 py-5 border-b border-[#3D3A35]/60">
          <span className="font-mono text-xs text-[#D4A853]/80 pt-[5px]">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 className="text-base font-medium leading-snug text-[#FAF8F5]">{item.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#B8B0A8]">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ServiceSteps({ steps }: { steps: ServiceStep[] }) {
  return (
    <ol>
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="flex gap-5">
            <div className="flex flex-col items-center">
              <span className="w-9 h-9 shrink-0 flex items-center justify-center border border-[#D4A853]/50 font-display text-sm text-[#D4A853]">
                {index + 1}
              </span>
              {!last && <span aria-hidden="true" className="flex-1 w-px my-2 bg-[#3D3A35]" />}
            </div>
            <div className={`min-w-0 pt-1.5 ${last ? "" : "pb-8"}`}>
              <h3 className="font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#B8B0A8]">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// A phone screenshot when the venture has one; otherwise a gold mark in the same frame.
function ProofCard({
  href,
  label,
  name,
  note,
  preview,
  mark,
}: {
  href: string;
  label: string;
  name: string;
  note: string;
  preview?: string;
  mark?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.99]"
    >
      <span
        className={`relative shrink-0 w-12 h-[76px] overflow-hidden rounded-[10px] border flex items-center justify-center ${
          preview ? "border-[#3D3A35] bg-black" : "border-[#D4A853]/30 bg-[linear-gradient(160deg,#2B2722,#0D0D0D_75%)]"
        }`}
      >
        {preview ? <Image src={preview} alt="" fill sizes="48px" className="object-cover object-top" /> : mark}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] tracking-[0.15em] uppercase text-[#D4A853]/80">{label}</span>
        <span className="block mt-1.5 font-display text-[0.95rem] leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
          {name}
        </span>
        <span className="block mt-1.5 text-[15px] leading-relaxed text-[#B8B0A8]">{note}</span>
      </span>
    </Link>
  );
}

// Real builds from lib/ventures.ts, each opening its venture page, then the TV record.
export function ServiceProof({ items }: { items: ProofItem[] }) {
  return (
    <ServiceSection label="Proof" title="Work you can check">
      <ul className="space-y-2.5">
        {items.map((item) => {
          const venture = getVenture(item.slug);
          if (!venture) return null;
          return (
            <li key={item.slug}>
              <ProofCard
                href={`/ventures/${venture.slug}`}
                label={venture.status}
                name={venture.name}
                note={item.note}
                preview={venture.preview}
                mark={
                  <span aria-hidden="true" className="font-display text-2xl leading-none text-[#D4A853]">
                    {venture.name.replace(/^The /, "").charAt(0)}
                  </span>
                }
              />
            </li>
          );
        })}
        <li>
          <ProofCard
            href="/credits"
            label={tvProof.label}
            name={tvProof.name}
            note={tvProof.note}
            mark={<Tv aria-hidden="true" className="w-5 h-5 text-[#D4A853]" />}
          />
        </li>
      </ul>
      <div className="grid grid-cols-2 gap-2.5 mt-5">
        <Link href="/ventures" className={secondaryButton}>
          All Ventures
        </Link>
        <Link href="/credits" className={secondaryButton}>
          TV Credits
        </Link>
      </div>
    </ServiceSection>
  );
}

export function ServiceFaqs({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <ServiceSection label="Questions" title="Before you book">
      <dl className="border-t border-[#3D3A35]/60">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-5 border-b border-[#3D3A35]/60">
            <dt className="text-base font-medium leading-snug text-[#FAF8F5]">{faq.question}</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-[#B8B0A8]">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </ServiceSection>
  );
}

// The last word on every page: book, or reach me directly.
export function ServiceClosing({ headline, line, onBook }: { headline: string; line: string; onBook: () => void }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="px-6 pb-12">
      <div className="px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
        <h2 className="font-display text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          {headline}
        </h2>
        <p className="mt-3 mb-7 text-[15px] leading-relaxed text-[#B8B0A8] text-balance">{line}</p>
        <button type="button" onClick={onBook} className={primaryButton}>
          Book a Strategy Call
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setShowContact((open) => !open)}
          aria-expanded={showContact}
          className={`mt-2.5 ${secondaryButton}`}
        >
          <Phone className="w-3.5 h-3.5" />
          Call, Text, or Email
        </button>
        {showContact && (
          <div className="mt-2.5 space-y-1.5 text-left">
            {directContacts.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className="flex items-center gap-3 px-4 py-3 border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.98]"
              >
                <contact.icon className="w-4 h-4 shrink-0 text-[#D4A853]" />
                <span className="min-w-0 text-sm text-[#B8B0A8]">{contact.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function OtherServices({ current }: { current: ServiceSlug }) {
  return (
    <nav aria-label="Other services" className="px-6 py-12 border-t border-[#3D3A35]/60">
      <SectionLabel>Other Services</SectionLabel>
      <ul className="mt-6 space-y-2.5">
        {services
          .filter((service) => service.slug !== current)
          .map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.98]"
              >
                <span className="min-w-0">
                  <span className="block font-display text-[0.9rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                    {service.name}
                  </span>
                  <span className="block mt-1 text-[13px] text-[#8A837B]">{service.problem}</span>
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 text-[#5C5750] transition-colors group-hover:text-[#D4A853]" />
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export function ServicePageTemplate({ service }: { service: Service }) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const book = () => setIsCalendlyOpen(true);

  return (
    <>
      <main className="min-h-screen bg-background">
        <ServiceNav>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 min-h-[44px] text-[11px] tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Services
          </Link>
        </ServiceNav>

        <ServiceHero label={service.name} headline={service.headline} intro={service.intro} onBook={book} />

        <ServiceSection label="Who It's For" title="Sound familiar?">
          <ForWhoList items={service.forWho} />
        </ServiceSection>

        <ServiceSection label="What You Get" title={service.deliverablesTitle}>
          <DeliverableList items={service.deliverables} />
        </ServiceSection>

        <ServiceSection label="How It Works" title="Three steps, start to finish">
          <ServiceSteps steps={service.steps} />
        </ServiceSection>

        <ServiceProof items={service.proof} />

        <ServiceFaqs faqs={service.faqs} />

        <OtherServices current={service.slug} />

        {/* Keep this the last block before the footer: the floating "Book a Call"
            steps aside when the page's final block reaches the screen. */}
        <ServiceClosing headline={service.closing.headline} line={service.closing.line} onBook={book} />
      </main>

      <FooterSection />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
