"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { FooterSection } from "@/components/landing/footer-section";
import { SiteHeader } from "@/components/site-header";
import { ventures, type Venture } from "@/lib/ventures";

/*
  The phone design is the base: every unprefixed class is the approved layout.
  On a desktop the page fills the window (Jo, 2026-10-14), so md: (768 up) and
  xl: (1280 up) variants only add size. The top bar's row, the sections and the
  card grid share one centered max-w-6xl row, so the cards line up under the
  bar. Cards go two across from md and three across from xl, row by row in
  Jo's order: at lg a third column would make each card narrower than the
  phone's, and the longer names would break onto three lines.
*/

const featured = ventures.filter((venture) => venture.featured);
const more = ventures.filter((venture) => !venture.featured);

// LinkedIn and Instagram refuse to be framed by anyone, so they open in a new
// tab. Success Upgrade is not repeated here: it has its own card above.
const elsewhere = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jotham-hall-b6b9491b2" },
  { name: "Instagram", href: "https://www.instagram.com/successupgrade_" },
];

// The phone's section padding, then the shared desktop row and rhythm.
const row = "px-6 pb-10 md:mx-auto md:max-w-6xl md:px-10 md:pb-20";
const sectionLabel =
  "flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] mb-4 md:text-xs md:mb-6";

/*
  One card for every venture, so the whole tab reads as a gallery. The top of
  the card, copy and phone screenshot together, is one link to the venture's
  page; below it About opens the same page and Visit opens the live site inside
  jothamhall.com, with the viewer's back link returning here. Hover only
  changes color (card border, name, screenshot border): nothing moves.

  In a grid row every card takes the row's height, so the status chips and the
  About and Visit row line up across it. Where the text column is narrow (two
  across at md, three across from xl) the screenshot is smaller and every name
  holds two lines, so the taglines start on one line too.
*/
function VentureCard({ venture }: { venture: Venture }) {
  return (
    <li className="bg-[#1A1A1A] border border-[#3D3A35] transition-colors hover:border-[#D4A853]/40 md:flex md:flex-col">
      <Link
        href={`/ventures/${venture.slug}`}
        className="group flex gap-4 p-5 pointer-coarse:active:opacity-80 md:flex-1"
      >
        <div className="min-w-0 flex-1 flex flex-col">
          <p className="text-xs tracking-[0.12em] uppercase text-[#D4A853]/80 mb-2">{venture.category}</p>
          <h3 className="font-display text-[1.05rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] transition-colors group-hover:text-[#D4A853] md:min-h-[2lh] md:text-lg lg:min-h-0 xl:min-h-[2lh]">
            {venture.name}
          </h3>
          <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance mt-2">{venture.tagline}</p>
          <div className="mt-auto pt-4">
            <span className="inline-block px-2 py-0.5 text-xs tracking-[0.12em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
              {venture.status}
            </span>
          </div>
        </div>
        {venture.preview && (
          <div className="relative shrink-0 w-[104px] aspect-[390/844] overflow-hidden rounded-[16px] border border-[#3D3A35] bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors group-hover:border-[#D4A853]/40 md:w-[88px] lg:w-[104px] xl:w-[88px]">
            <Image
              src={venture.preview}
              alt=""
              fill
              sizes="(min-width: 1280px) 88px, (min-width: 1024px) 104px, (min-width: 768px) 88px, 104px"
              className="object-cover object-top"
            />
          </div>
        )}
      </Link>
      <div className="grid grid-cols-2 border-t border-[#3D3A35]/60">
        <Link
          href={`/ventures/${venture.slug}`}
          aria-label={`About ${venture.name}`}
          className="min-h-[44px] flex items-center justify-center border-r border-[#3D3A35]/60 text-[13px] tracking-[0.12em] uppercase text-[#8A837B] transition-colors hover:text-[#FAF8F5] md:min-h-[48px]"
        >
          About
        </Link>
        <Link
          href={`/ventures/${venture.slug}/site?from=/ventures`}
          aria-label={`Visit ${venture.name}`}
          className="min-h-[44px] flex items-center justify-center gap-1.5 text-[13px] font-medium tracking-[0.12em] uppercase text-[#D4A853] transition-colors hover:text-[#E8C97A] md:min-h-[48px]"
        >
          Visit
          <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </li>
  );
}

function VentureSection({ title, members }: { title: string; members: Venture[] }) {
  return (
    <section className={row}>
      <h2 className={sectionLabel}>
        {title}
        <span className="flex-1 h-px bg-[#3D3A35]/60" />
      </h2>
      <ul className="space-y-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 xl:grid-cols-3">
        {members.map((venture) => (
          <VentureCard key={venture.slug} venture={venture} />
        ))}
      </ul>
    </section>
  );
}

export function VenturesIndex() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-background pb-16 md:pb-20">
        {/*
          The approved spacing (pt-28, and pt-32 pb-20 from md) holds on screens
          as tall as 390x844 or 1440x900. On shorter ones (375x667, 1280x720,
          1366x657) the padding gives way, so the first venture card shows in
          full above the tab bar on first load.
        */}
        <header className="px-6 pt-[clamp(5rem,calc(100svh_-_36.5rem),7rem)] pb-12 text-center md:px-10 md:pt-[clamp(6rem,calc(100svh_-_39rem),8rem)] md:pb-[clamp(2rem,calc(100svh_-_41.75rem),5rem)]">
          <div className="md:mx-auto md:max-w-3xl">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:text-xs md:mb-6">The Portfolio</p>
            <h1 className="font-display text-4xl tracking-[0.12em] uppercase text-balance mb-5 md:text-5xl md:mb-7 lg:text-6xl">Ventures</h1>
            <p className="text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto md:max-w-2xl md:text-lg lg:text-xl">
              Companies I founded and products I built with partners.
            </p>
          </div>
        </header>

        {/* Ordered to convert, not by ownership: lib/ventures.ts lists the strongest proof first. */}
        <VentureSection title="Featured" members={featured} />
        <VentureSection title="More Ventures" members={more} />

        {/* From md up the two links sit in one row, on the same columns as the cards. */}
        <section className={row}>
          <h2 className={sectionLabel}>
            Elsewhere
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
          </h2>
          <div className="space-y-2 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {elsewhere.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-3.5 border border-[#3D3A35] text-sm text-[#B8B0A8] transition-colors hover:border-[#D4A853]/40 hover:text-[#FAF8F5] pointer-coarse:active:scale-[0.98] md:py-4 md:text-[15px]"
              >
                {link.name}
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </a>
            ))}
          </div>
        </section>

        {/* The phone's inset card; from md a centered card, its button at desktop width. */}
        <div className="md:px-10">
          <section className="mx-6 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center md:mx-auto md:max-w-3xl md:px-16 md:py-16">
            <h2 className="font-display text-lg tracking-[0.12em] uppercase text-balance mb-3 md:text-3xl md:mb-5">Interested in&nbsp;Partnering?</h2>
            <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance mb-7 max-w-[280px] mx-auto md:text-[17px] md:max-w-md md:mb-10">
              I am always open to partnerships, investment, and collaboration.
            </p>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:mx-auto md:w-auto md:min-w-[280px] md:px-10"
            >
              Get in Touch
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </button>
          </section>
        </div>
      </main>

      <FooterSection />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
