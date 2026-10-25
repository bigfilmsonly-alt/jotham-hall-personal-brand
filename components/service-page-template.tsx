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

  The unprefixed classes are the phone design, approved as it is. From md
  (768px) up the same blocks fill the window: the bar's row and the content sit
  in centered containers (max-w-6xl for the bar, max-w-3xl for the hero,
  max-w-5xl for card grids, max-w-2xl for reading text), lists of cards become
  grids, and type and spacing step up. Desktop styling only ever adds md: and
  lg: variants, so nothing on a phone moves.

  Order, top to bottom: the outcome, who it is for, what you get, how it works,
  proof, questions, the other services, then the call to book. Every booking
  button opens the Calendly modal; nothing leaves the site.
*/

const primaryButton =
  "w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:cursor-pointer";
const secondaryButton =
  "w-full py-3.5 border border-[#3D3A35] text-[#B8B0A8] text-sm font-medium tracking-wide hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:cursor-pointer";
// A button standing alone on a desktop: its own width, at least 280px, centered, never the full row.
const desktopButton = "md:w-fit md:min-w-[280px] md:px-10 md:mx-auto";

// Section containers from md up: card grids and wide sections, or reading width.
const SECTION_WIDTH = { wide: "max-w-5xl", read: "max-w-2xl" } as const;

const directContacts = [
  { href: "tel:+15106809100", label: "Call (510) 680-9100", icon: Phone },
  { href: "sms:+15106934083", label: "Text (510) 693-4083", icon: MessageSquare },
  { href: "mailto:bigfilmsonly@gmail.com", label: "bigfilmsonly@gmail.com", icon: Mail },
];

export function ServiceNav({ children }: { children: ReactNode }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 h-14 md:h-16 flex items-center justify-between">
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
    <header className="px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-20 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:mb-6">{label}</p>
        <h1 className="font-display text-[1.75rem] md:text-5xl lg:text-6xl leading-[1.25] md:leading-[1.15] tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          {headline}
        </h1>
        <p className="mt-5 md:mt-7 text-base md:text-lg lg:text-xl leading-relaxed text-[#B8B0A8] text-balance md:mx-auto md:max-w-2xl">
          {intro}
        </p>
        <button type="button" onClick={onBook} className={`mt-8 md:mt-10 ${primaryButton} ${desktopButton}`}>
          Book a Strategy Call
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-3 text-[13px] md:text-sm text-[#8A837B]">Free 30 minute call with me</p>

        {/* The same verified numbers as the home screen, linked to the full list. */}
        {showCredentials && (
          <Link
            href="/credits"
            className="grid grid-cols-3 mt-10 pt-6 border-t border-[#3D3A35]/60 hover:opacity-80 transition-opacity md:mt-14 md:pt-8 md:mx-auto md:max-w-xl"
          >
            <span className="sr-only">See my TV credits:</span>
            {credentials.map((item) => (
              <span key={item.label} className="block">
                <span className="block font-display text-lg md:text-2xl tracking-[0.12em] text-[#FAF8F5]">{item.value}</span>
                <span className="block mt-1 md:mt-2 text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                  {item.label}
                </span>
              </span>
            ))}
          </Link>
        )}
      </div>
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-3 md:gap-4 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">
      <span aria-hidden="true" className="w-6 md:w-10 h-px bg-[#D4A853]/40" />
      {children}
      <span aria-hidden="true" className="w-6 md:w-10 h-px bg-[#D4A853]/40" />
    </p>
  );
}

export function ServiceSection({
  label,
  title,
  width = "wide",
  children,
}: {
  label: string;
  title: string;
  width?: keyof typeof SECTION_WIDTH;
  children: ReactNode;
}) {
  return (
    <section className="px-6 py-12 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className={`mx-auto ${SECTION_WIDTH[width]}`}>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-4 mb-8 md:mt-5 md:mb-12 text-center font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// Stacked at reading width on a tablet; three across from lg, one card per line.
function ForWhoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 md:mx-auto md:max-w-2xl lg:max-w-none lg:grid lg:grid-cols-3 lg:gap-5 lg:space-y-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5 px-5 py-4 md:px-6 md:py-5 lg:p-7 bg-[#1A1A1A] border border-[#3D3A35]">
          <Check aria-hidden="true" className="w-4 h-4 mt-[5px] md:mt-[6px] shrink-0 text-[#D4A853]" />
          <span className="text-[15px] md:text-[17px] leading-relaxed text-[#FAF8F5]/90">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// Two by two from md, each item under its own rule, like an index.
function DeliverableList({ items }: { items: ServiceDeliverable[] }) {
  return (
    <ol className="border-t border-[#3D3A35]/60 md:border-t-0 md:grid md:grid-cols-2 md:gap-x-12">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-4 md:gap-5 py-5 md:py-7 border-b border-[#3D3A35]/60 md:border-b-0 md:border-t">
          <span className="font-mono text-xs md:text-sm text-[#D4A853]/80 pt-[5px] md:pt-1">{String(index + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-medium leading-snug text-[#FAF8F5]">{item.title}</h3>
            <p className="mt-1.5 md:mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8]">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/*
  A vertical timeline on a phone. From md the three steps stand in one row:
  each number sits on a rule that runs on to the next number, through the
  column gap (the negative right margin is the gap less the rule's 16px inset).
*/
export function ServiceSteps({ steps }: { steps: ServiceStep[] }) {
  return (
    <ol className="md:grid md:grid-cols-3 md:gap-8 lg:gap-10">
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li key={step.title} className="flex gap-5 md:flex-col md:gap-6">
            <div className="flex flex-col items-center md:flex-row">
              <span className="w-9 h-9 md:w-11 md:h-11 shrink-0 flex items-center justify-center border border-[#D4A853]/50 font-display text-sm md:text-base text-[#D4A853]">
                {index + 1}
              </span>
              {!last && (
                <span
                  aria-hidden="true"
                  className="flex-1 w-px my-2 bg-[#3D3A35] md:w-auto md:h-px md:my-0 md:ml-4 md:-mr-4 lg:-mr-6"
                />
              )}
            </div>
            <div className={`min-w-0 pt-1.5 md:pt-0 ${last ? "" : "pb-8 md:pb-0"}`}>
              <h3 className="font-display text-[0.95rem] md:text-lg tracking-[0.12em] uppercase text-[#FAF8F5]">{step.title}</h3>
              <p className="mt-2 md:mt-3 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8]">{step.detail}</p>
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
      className="flex items-center gap-4 p-4 md:h-full md:items-start md:gap-6 md:p-6 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.99]"
    >
      <span
        className={`relative shrink-0 w-12 h-[76px] md:w-[72px] md:h-[114px] overflow-hidden rounded-[10px] md:rounded-[15px] border flex items-center justify-center ${
          preview ? "border-[#3D3A35] bg-black" : "border-[#D4A853]/30 bg-[linear-gradient(160deg,#2B2722,#0D0D0D_75%)]"
        }`}
      >
        {preview ? (
          <Image src={preview} alt="" fill sizes="(min-width: 768px) 72px, 48px" className="object-cover object-top" />
        ) : (
          mark
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]/80">{label}</span>
        <span className="block mt-1.5 md:mt-2 font-display text-[0.95rem] md:text-lg leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
          {name}
        </span>
        <span className="block mt-1.5 md:mt-2 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] md:max-w-2xl">{note}</span>
      </span>
    </Link>
  );
}

/*
  Real builds from lib/ventures.ts, each opening its venture page, then the TV
  record. From md the builds pair up two by two with larger screenshots, and
  the TV record, a different kind of proof, closes the grid across both columns.
*/
export function ServiceProof({ items }: { items: ProofItem[] }) {
  return (
    <ServiceSection label="Proof" title="Work you can check">
      <ul className="space-y-2.5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
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
                  <span aria-hidden="true" className="font-display text-2xl md:text-4xl leading-none text-[#D4A853]">
                    {venture.name.replace(/^The /, "").charAt(0)}
                  </span>
                }
              />
            </li>
          );
        })}
        <li className="md:col-span-2">
          <ProofCard
            href="/credits"
            label={tvProof.label}
            name={tvProof.name}
            note={tvProof.note}
            mark={<Tv aria-hidden="true" className="w-5 h-5 md:w-7 md:h-7 text-[#D4A853]" />}
          />
        </li>
      </ul>
      <div className="grid grid-cols-2 gap-2.5 mt-5 md:gap-3 md:mt-10 md:mx-auto md:max-w-xl">
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
    <ServiceSection label="Questions" title="Before you book" width="read">
      <dl className="border-t border-[#3D3A35]/60">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-5 md:py-7 border-b border-[#3D3A35]/60">
            <dt className="text-base md:text-lg font-medium leading-snug text-[#FAF8F5]">{faq.question}</dt>
            {/* The rules run the reading width; the answer stops a little short, under 80 characters a line. */}
            <dd className="mt-2 md:mt-3 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] md:max-w-xl">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </ServiceSection>
  );
}

// The last word on every page: book, or reach me directly. A centered card on a desktop, its two buttons side by side.
export function ServiceClosing({ headline, line, onBook }: { headline: string; line: string; onBook: () => void }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="px-6 pb-12 md:px-10 md:pb-20">
      <div className="px-6 py-10 md:px-12 md:py-16 bg-[#1A1A1A] border border-[#3D3A35] text-center md:mx-auto md:max-w-3xl">
        <h2 className="font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          {headline}
        </h2>
        <p className="mt-3 mb-7 md:mt-4 md:mb-10 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] text-balance md:mx-auto md:max-w-xl">
          {line}
        </p>
        <div className="md:grid md:grid-cols-2 md:gap-3 md:mx-auto md:max-w-xl">
          <button type="button" onClick={onBook} className={primaryButton}>
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowContact((open) => !open)}
            aria-expanded={showContact}
            className={`mt-2.5 md:mt-0 ${secondaryButton}`}
          >
            <Phone className="w-3.5 h-3.5" />
            Call, Text, or Email
          </button>
        </div>
        {showContact && (
          <div className="mt-2.5 md:mt-3 space-y-1.5 text-left md:mx-auto md:max-w-xl">
            {directContacts.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                className="flex items-center gap-3 px-4 py-3 border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.98]"
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

// Stacked at reading width on a tablet; three across from lg.
function OtherServices({ current }: { current: ServiceSlug }) {
  return (
    <nav aria-label="Other services" className="px-6 py-12 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Other Services</SectionLabel>
        <ul className="mt-6 md:mt-10 space-y-2.5 md:mx-auto md:max-w-2xl lg:max-w-none lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
          {services
            .filter((service) => service.slug !== current)
            .map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 lg:h-full lg:p-6 border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.98]"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[0.9rem] md:text-base tracking-[0.12em] uppercase text-[#FAF8F5]">
                      {service.name}
                    </span>
                    <span className="block mt-1 md:mt-1.5 text-[13px] md:text-sm text-[#8A837B]">{service.problem}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#5C5750] transition-colors group-hover:text-[#D4A853]" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
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
            className="inline-flex items-center gap-1.5 min-h-[44px] text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
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
