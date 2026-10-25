"use client";

/*
  Sections shared by the city page (/miami) and the city service page
  (/miami/vibe-coding).

  The unprefixed classes are the phone design, approved as it is. From md
  (768px) up the same sections fill the window: the bar's row sits in a
  centered max-w-6xl container, the hero in max-w-3xl, the card lists and the
  steps in max-w-5xl, the questions at reading width (max-w-2xl), and the
  closing card is centered. Paired buttons stand side by side at equal width.
  Desktop styling only adds md: and lg: variants and wrappers that do nothing
  on a phone, so nothing on a phone moves.
*/

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import type { Faq, Offer, ProofVenture, Step } from "@/lib/city-data";

// Card lists from md: two across, three from lg, a short last row centered.
const cardList = "space-y-2.5 md:space-y-0 md:flex md:flex-wrap md:justify-center md:gap-3 lg:gap-4";
const cardItem = "md:w-[calc((100%_-_0.75rem)/2)] lg:w-[calc((100%_-_2rem)/3)]";

// A pair of buttons: stacked on a phone, side by side at equal width from md.
// DirectContact's lines open below the pair, across both columns.
const buttonPair = "space-y-2.5 md:space-y-0 md:mx-auto md:max-w-xl md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-1.5";

const networks = ["Hallmark", "Food Network", "VH1", "MTV", "USA Network", "NBC", "BET"];

const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];

export function TopNav({ onBook }: { onBook: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10 h-14 md:h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
          Jotham Hall
        </Link>
        <button
          onClick={onBook}
          className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-xs font-medium tracking-wide hover:bg-[#E8C97A] transition-colors pointer-coarse:active:scale-[0.97]"
        >
          Book a Call
        </button>
      </div>
    </nav>
  );
}

export function BookButton({ onBook }: { onBook: () => void }) {
  return (
    <button
      onClick={onBook}
      className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97]"
    >
      Book a Strategy Call
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

const contactLinks = [
  { href: "tel:+15106809100", label: "Call (510) 680-9100", icon: Phone },
  { href: "sms:+15106934083", label: "Text (510) 693-4083", icon: MessageSquare },
  { href: "mailto:bigfilmsonly@gmail.com", label: "bigfilmsonly@gmail.com", icon: Mail },
];

/*
  The secondary action: opens the three direct lines in place. From md it sits
  in a buttonPair grid: this wrapper steps out of the layout (md:contents), so
  its button takes the second column and each line spans the pair below.
*/
export function DirectContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5 md:contents md:space-y-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full py-3.5 border border-[#3D3A35] text-sm font-medium tracking-wide text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97]"
      >
        <Phone className="w-3.5 h-3.5" />
        Call, Text, or Email
      </button>
      {open &&
        contactLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center justify-center gap-3 py-3 border border-[#3D3A35]/60 bg-[#1A1A1A] text-[15px] text-[#FAF8F5] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.98] md:col-span-2"
          >
            <Icon className="w-4 h-4 text-[#D4A853] shrink-0" />
            {label}
          </a>
        ))}
    </div>
  );
}

export function Hero({
  eyebrow,
  headline,
  intro,
  onBook,
}: {
  eyebrow: ReactNode;
  headline: string;
  intro: string;
  onBook: () => void;
}) {
  return (
    <header className="px-6 pt-24 pb-14 md:px-10 md:pt-32 md:pb-20 text-center">
      <div className="mx-auto max-w-3xl">
        <Image
          src="/jotham-hall-headshot-480.jpg"
          alt="Jotham Hall"
          width={160}
          height={160}
          priority
          className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border border-[#D4A853]/40 shadow-[0_0_30px_rgba(212,168,83,0.12)] mx-auto mb-5 md:mb-7"
        />
        <div className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:mb-6">{eyebrow}</div>
        <h1 className="font-display text-[1.75rem] md:text-5xl leading-[1.2] md:leading-[1.15] tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-5 md:mb-7">
          {headline}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-[#B8B0A8] leading-relaxed text-balance max-w-[340px] md:max-w-2xl mx-auto">
          {intro}
        </p>
        <div className={`mt-8 md:mt-10 ${buttonPair}`}>
          <BookButton onBook={onBook} />
          <DirectContact />
        </div>
        <p className="mt-4 md:mt-5 text-[13px] md:text-sm text-[#8A837B]">Free call, one on one with me.</p>
      </div>
    </header>
  );
}

export function SectionHeading({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:mb-4">{label}</p>
      <h2 className="font-display text-[1.375rem] md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        {title}
      </h2>
      {intro && (
        <p className="text-[15px] md:text-[17px] text-[#B8B0A8] leading-relaxed text-balance max-w-[340px] md:max-w-xl mx-auto mt-3 md:mt-4">
          {intro}
        </p>
      )}
    </div>
  );
}

export function ProofSection({ ventures }: { ventures: ProofVenture[] }) {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label="Track Record"
          title="Proven on Network TV and the App Store"
          intro="Talent producer on Finding Mr. Christmas, Ciao House, and Temptation Island. Now I build apps and the systems behind them."
        />

        <div className="grid grid-cols-3 border-y border-[#3D3A35]/60 py-5 md:py-8 md:mx-auto md:max-w-3xl">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`text-center ${i > 0 ? "border-l border-[#3D3A35]/60" : ""}`}>
              <p className="font-display text-2xl md:text-4xl text-[#FAF8F5] tracking-wide">{stat.value}</p>
              <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] mt-1 md:mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-5 md:mt-7 flex flex-wrap justify-center gap-x-5 md:gap-x-8 gap-y-2 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
          {networks.map((network) => (
            <li key={network} className="whitespace-nowrap">
              {network}
            </li>
          ))}
        </ul>

        <h3 className="mt-12 md:mt-20 mb-4 md:mb-6 flex items-center gap-3 md:gap-4 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
          <span className="flex-1 h-px bg-[#3D3A35]/60" />
          Built and Shipped
          <span className="flex-1 h-px bg-[#3D3A35]/60" />
        </h3>
        <ul className={cardList}>
          {ventures.map((venture) => (
            <li key={venture.slug} className={cardItem}>
              <Link
                href={`/ventures/${venture.slug}`}
                className="block md:h-full px-5 py-4 md:px-6 md:py-5 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.99]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="min-w-0 font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                    {venture.name}
                  </span>
                  <span className="shrink-0 px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
                    {venture.status}
                  </span>
                </span>
                <span className="block mt-1.5 md:mt-2 text-sm md:text-[15px] text-[#B8B0A8] leading-relaxed">{venture.note}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-2.5 mt-4 md:mt-8 md:gap-3 md:mx-auto md:max-w-xl">
          {[
            { href: "/credits", label: "TV Credits" },
            { href: "/ventures", label: "All Ventures" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group min-h-[44px] md:min-h-12 flex items-center justify-center gap-1.5 border border-[#3D3A35] text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors"
            >
              {link.label}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OffersSection({ title, offers }: { title: string; offers: Offer[] }) {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="Services" title={title} />
        <ul className={cardList}>
          {offers.map((offer) => (
            <li key={offer.href} className={cardItem}>
              <Link
                href={offer.href}
                className="group flex md:h-full items-center gap-4 px-5 py-4 md:px-6 md:py-6 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.99]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                    {offer.name}
                  </span>
                  <span className="block mt-1.5 md:mt-2 text-sm md:text-[15px] text-[#B8B0A8] leading-relaxed">{offer.outcome}</span>
                </span>
                <ArrowRight className="w-4 h-4 shrink-0 text-[#D4A853] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StepsSection({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label="How It Works" title={title} />
        {/* Three across from md, each step under its own hairline. */}
        <ol className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <li key={step.title} className="text-center md:pt-8 md:border-t md:border-[#3D3A35]/60">
              <span className="block font-display text-sm md:text-base tracking-[0.15em] text-[#D4A853]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 md:mt-3 text-base md:text-lg font-medium text-[#FAF8F5]">{step.title}</h3>
              <p className="mt-1.5 md:mt-2 text-[15px] md:text-[17px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqAnswer({ faq }: { faq: Faq }) {
  const at = faq.link ? faq.a.indexOf(faq.link.label) : -1;
  if (!faq.link || at < 0) return <>{faq.a}</>;
  return (
    <>
      {faq.a.slice(0, at)}
      <Link
        href={faq.link.href}
        className="whitespace-nowrap text-[#D4A853] underline underline-offset-4 decoration-[#D4A853]/40 hover:text-[#E8C97A]"
      >
        {faq.link.label}
      </Link>
      {faq.a.slice(at + faq.link.label.length)}
    </>
  );
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
      <div className="mx-auto max-w-2xl">
        <SectionHeading label="Questions" title="Before You Book" />
        <dl className="border-t border-[#3D3A35]/60">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5 md:py-7 border-b border-[#3D3A35]/60">
              <dt className="text-base md:text-lg font-medium text-[#FAF8F5] leading-snug text-balance">{faq.q}</dt>
              {/* max-w-xl keeps an answer line under 80 characters at 17px. */}
              <dd className="mt-2 md:mt-3 text-[15px] md:text-[17px] text-[#B8B0A8] leading-relaxed md:max-w-xl">
                <FaqAnswer faq={faq} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ClosingCta({ title, body, onBook }: { title: string; body: string; onBook: () => void }) {
  return (
    <section className="mx-6 px-6 py-10 md:mx-10 md:px-12 md:py-16 lg:mx-auto lg:max-w-3xl bg-[#1A1A1A] border border-[#3D3A35] text-center">
      <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:mb-4">Next Step</p>
      <h2 className="font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3 md:mb-4">
        {title}
      </h2>
      <p className="text-[15px] md:text-[17px] text-[#B8B0A8] leading-relaxed text-balance max-w-[300px] md:max-w-md mx-auto mb-7 md:mb-10">
        {body}
      </p>
      <div className={buttonPair}>
        <BookButton onBook={onBook} />
        <DirectContact />
      </div>
    </section>
  );
}
