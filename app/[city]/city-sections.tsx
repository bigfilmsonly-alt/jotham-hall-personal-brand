"use client";

/*
  Sections shared by the city page (/miami) and the city service page
  (/miami/vibe-coding). Laid out for the 430px column that globals.css holds
  the whole site in from 768px up, so nothing here uses a viewport breakpoint:
  an sm: or lg: class fires on a desktop screen while the page is still phone
  width, which is what crushed the old grids and pushed text to the left.
*/

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import type { Faq, Offer, ProofVenture, Step } from "@/lib/city-data";

const networks = ["Hallmark", "Food Network", "VH1", "MTV", "USA Network", "NBC", "BET"];

const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];

export function TopNav({ onBook }: { onBook: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
      <div className="px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
          Jotham Hall
        </Link>
        <button
          onClick={onBook}
          className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-xs font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
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
      className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
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

/* The secondary action: opens the three direct lines in place. */
export function DirectContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1.5">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full py-3.5 border border-[#3D3A35] text-sm font-medium tracking-wide text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
      >
        <Phone className="w-3.5 h-3.5" />
        Call, Text, or Email
      </button>
      {open &&
        contactLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center justify-center gap-3 py-3 border border-[#3D3A35]/60 bg-[#1A1A1A] text-[15px] text-[#FAF8F5] hover:border-[#D4A853]/40 transition-colors active:scale-[0.98]"
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
    <header className="px-6 pt-24 pb-14 text-center">
      <Image
        src="/jotham-hall.jpg"
        alt="Jotham Hall"
        width={160}
        height={160}
        priority
        className="w-20 h-20 rounded-full object-cover border border-[#D4A853]/40 shadow-[0_0_30px_rgba(212,168,83,0.12)] mx-auto mb-5"
      />
      <div className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4">{eyebrow}</div>
      <h1 className="font-display text-[1.75rem] leading-[1.2] tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-5">
        {headline}
      </h1>
      <p className="text-base text-[#B8B0A8] leading-relaxed text-balance max-w-[340px] mx-auto">{intro}</p>
      <div className="mt-8 space-y-2.5">
        <BookButton onBook={onBook} />
        <DirectContact />
      </div>
      <p className="mt-4 text-[13px] text-[#8A837B]">Free call, one on one with me.</p>
    </header>
  );
}

export function SectionHeading({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="text-center mb-8">
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">{label}</p>
      <h2 className="font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        {title}
      </h2>
      {intro && (
        <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[340px] mx-auto mt-3">{intro}</p>
      )}
    </div>
  );
}

export function ProofSection({ ventures }: { ventures: ProofVenture[] }) {
  return (
    <section className="px-6 py-14 border-t border-[#3D3A35]/60">
      <SectionHeading
        label="Track Record"
        title="Proven on Network TV and the App Store"
        intro="Talent producer on Finding Mr. Christmas, Ciao House, and Temptation Island. Now I build apps and the systems behind them."
      />

      <div className="grid grid-cols-3 border-y border-[#3D3A35]/60 py-5">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`text-center ${i > 0 ? "border-l border-[#3D3A35]/60" : ""}`}>
            <p className="font-display text-2xl text-[#FAF8F5] tracking-wide">{stat.value}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#8A837B] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">
        {networks.map((network) => (
          <li key={network} className="whitespace-nowrap">
            {network}
          </li>
        ))}
      </ul>

      <h3 className="mt-12 mb-4 flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">
        <span className="flex-1 h-px bg-[#3D3A35]/60" />
        Built and Shipped
        <span className="flex-1 h-px bg-[#3D3A35]/60" />
      </h3>
      <ul className="space-y-2.5">
        {ventures.map((venture) => (
          <li key={venture.slug}>
            <Link
              href={`/ventures/${venture.slug}`}
              className="block px-5 py-4 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.99]"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="min-w-0 font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                  {venture.name}
                </span>
                <span className="shrink-0 px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
                  {venture.status}
                </span>
              </span>
              <span className="block mt-1.5 text-sm text-[#B8B0A8] leading-relaxed">{venture.note}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        {[
          { href: "/credits", label: "TV Credits" },
          { href: "/ventures", label: "All Ventures" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group min-h-[44px] flex items-center justify-center gap-1.5 border border-[#3D3A35] text-[11px] font-medium tracking-[0.15em] uppercase text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors"
          >
            {link.label}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function OffersSection({ title, offers }: { title: string; offers: Offer[] }) {
  return (
    <section className="px-6 py-14 border-t border-[#3D3A35]/60">
      <SectionHeading label="Services" title={title} />
      <ul className="space-y-2.5">
        {offers.map((offer) => (
          <li key={offer.href}>
            <Link
              href={offer.href}
              className="group flex items-center gap-4 px-5 py-4 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.99]"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                  {offer.name}
                </span>
                <span className="block mt-1.5 text-sm text-[#B8B0A8] leading-relaxed">{offer.outcome}</span>
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#D4A853] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StepsSection({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="px-6 py-14 border-t border-[#3D3A35]/60">
      <SectionHeading label="How It Works" title={title} />
      <ol className="space-y-8">
        {steps.map((step, i) => (
          <li key={step.title} className="text-center">
            <span className="block font-display text-sm tracking-[0.15em] text-[#D4A853]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-base font-medium text-[#FAF8F5]">{step.title}</h3>
            <p className="mt-1.5 text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
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
    <section className="px-6 py-14 border-t border-[#3D3A35]/60">
      <SectionHeading label="Questions" title="Before You Book" />
      <dl className="border-t border-[#3D3A35]/60">
        {faqs.map((faq) => (
          <div key={faq.q} className="py-5 border-b border-[#3D3A35]/60">
            <dt className="text-base font-medium text-[#FAF8F5] leading-snug text-balance">{faq.q}</dt>
            <dd className="mt-2 text-[15px] text-[#B8B0A8] leading-relaxed">
              <FaqAnswer faq={faq} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ClosingCta({ title, body, onBook }: { title: string; body: string; onBook: () => void }) {
  return (
    <section className="mx-6 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Next Step</p>
      <h2 className="font-display text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3">
        {title}
      </h2>
      <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[300px] mx-auto mb-7">{body}</p>
      <div className="space-y-2.5">
        <BookButton onBook={onBook} />
        <DirectContact />
      </div>
    </section>
  );
}
