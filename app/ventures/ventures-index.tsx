"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
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

// Success Upgrade opens inside this site like every venture. LinkedIn and
// Instagram refuse to be framed by anyone, so those two open in a new tab.
const elsewhere = [
  { name: "Success Upgrade", href: "/ventures/success-upgrade/site" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jotham-hall-b6b9491b2" },
  { name: "Instagram", href: "https://www.instagram.com/successupgrade_" },
];

// The phone's section padding, then the shared desktop row and rhythm.
const row = "px-6 pb-10 md:mx-auto md:max-w-6xl md:px-10 md:pb-20";
const sectionLabel =
  "flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] mb-4 md:text-xs md:mb-6";

/*
  One card for every venture, so the whole tab reads as a gallery: the copy on
  the left opens the venture's page, the phone screenshot and Visit open the
  live site inside jothamhall.com, About and Visit are equal width. In a grid
  row every card takes the row's height, so About and Visit line up across it.
*/
function VentureCard({ venture }: { venture: Venture }) {
  return (
    <li
      className="bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors md:flex md:flex-col"
    >
      <div className="flex gap-4 p-5 md:flex-1">
        <Link href={`/ventures/${venture.slug}`} className="min-w-0 flex-1 flex flex-col active:opacity-80">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853]/80 mb-2 md:text-[11px]">{venture.category}</p>
          <h3 className="font-display text-[1.05rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:text-lg">
            {venture.name}
          </h3>
          <p className="text-sm text-[#B8B0A8] leading-relaxed mt-2 md:text-[15px]">{venture.tagline}</p>
          <span className="mt-auto pt-4">
            <span className="inline-block px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853] md:text-[11px]">
              {venture.status}
            </span>
          </span>
        </Link>
        {venture.preview && (
          <Link
            href={`/ventures/${venture.slug}/site`}
            aria-label={`Open ${venture.name}`}
            className="relative shrink-0 w-[104px] aspect-[390/844] overflow-hidden rounded-[16px] border border-[#3D3A35] bg-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform"
          >
            <Image src={venture.preview} alt="" fill sizes="104px" className="object-cover object-top" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 border-t border-[#3D3A35]/60">
        <Link
          href={`/ventures/${venture.slug}`}
          className="min-h-[44px] flex items-center justify-center border-r border-[#3D3A35]/60 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors md:min-h-[48px] md:text-xs"
        >
          About
        </Link>
        <Link
          href={`/ventures/${venture.slug}/site`}
          className="group min-h-[44px] flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-[#D4A853] hover:text-[#E8C97A] transition-colors md:min-h-[48px] md:text-xs"
        >
          Visit
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
      <main className="min-h-screen bg-background pb-36">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-10 h-14 md:h-16 flex items-center justify-between">
            <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
              Jotham Hall
            </Link>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-xs font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
            >
              Book a Call
            </button>
          </div>
        </nav>

        <header className="px-6 pt-28 pb-12 text-center md:px-10 md:pt-32 md:pb-20">
          <div className="md:mx-auto md:max-w-3xl">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:text-xs md:mb-6">The Portfolio</p>
            <h1 className="font-display text-4xl tracking-[0.12em] uppercase mb-5 md:text-5xl md:mb-7 lg:text-6xl">Ventures</h1>
            <p className="text-[#B8B0A8] leading-relaxed max-w-[320px] mx-auto md:max-w-2xl md:text-lg lg:text-xl">
              Companies I founded, and products I built with partners.
            </p>
          </div>
        </header>

        {/* Ordered to convert, not by ownership: lib/ventures.ts lists the strongest proof first. */}
        <VentureSection title="Featured" members={featured} />
        <VentureSection title="More Ventures" members={more} />

        {/* From md up the three links sit in one row, on the same columns as the cards. */}
        <section className={row}>
          <h2 className={sectionLabel}>
            Elsewhere
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
          </h2>
          <div className="space-y-2 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {elsewhere.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-5 py-3.5 border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.98] md:py-4 md:text-[15px]"
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.98] md:py-4 md:text-[15px]"
                >
                  {link.name}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </section>

        {/* The phone's inset card; from md a centered card, its button at desktop width. */}
        <div className="md:px-10">
          <section className="mx-6 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center md:mx-auto md:max-w-3xl md:px-16 md:py-16">
            <h2 className="font-display text-lg tracking-[0.12em] uppercase mb-3 md:text-3xl md:mb-5">Interested in Partnering?</h2>
            <p className="text-sm text-[#B8B0A8] leading-relaxed mb-7 max-w-[280px] mx-auto md:text-[17px] md:max-w-md md:mb-10 md:text-balance">
              Always open to strategic partnerships, investment, and collaboration.
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:mx-auto md:w-auto md:min-w-[280px] md:px-10"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </button>
          </section>
        </div>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
