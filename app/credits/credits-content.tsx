"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";

/*
  Phone first. The unprefixed classes are the approved phone layout: one
  centered column from 360px to 430px. The site no longer sits in a 430px
  column on desktop, so md: (768px up) and lg: (1024px up) give the page its
  desktop size: the nav row and sections held to centered widths, larger type,
  the selected credits in two columns, the buttons at their own width. Only
  add md: and lg: variants here; never change the phone classes.

  Every fact on this page comes from the lists below. Years read "2023 to
  2025", never with a dash.
*/

const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];

// Two fixed lines of near equal width, so the row never leaves one name alone.
// From lg up the two lines join into one even line.
const networkRows = [
  ["Hallmark", "Food Network", "NBC"],
  ["USA Network", "VH1", "MTV", "BET"],
];

// Newest first.
const featuredCredits = [
  {
    show: "Finding Mr. Christmas",
    network: "Hallmark Channel",
    role: "Talent Producer",
    years: "2023 to 2025",
    seasons: "Seasons 1 & 2",
    description:
      "Competition series where aspiring actors compete for a leading role in a Hallmark Christmas movie.",
  },
  {
    show: "Ciao House",
    network: "Food Network",
    role: "Talent Producer",
    years: "2023 to 2024",
    seasons: "Seasons 1 & 2",
    description:
      "Culinary competition series hosted by Alex Guarnaschelli, filmed on location in Italy.",
  },
  {
    show: "Snake in the Grass",
    network: "NBC",
    role: "Talent Producer",
    years: "2022",
    description:
      "Outdoor competition series where contestants identify the saboteur among them.",
  },
  {
    show: "Temptation Island",
    network: "USA Network",
    role: "Talent Producer",
    years: "2019 to 2023",
    description:
      "Reality dating series testing committed couples. One of the longest running dating formats in television.",
  },
  {
    show: "After Happily Ever After",
    network: "BET",
    role: "Talent Producer",
    years: "2015",
    description:
      "Relationship reality series following couples navigating marriage challenges.",
  },
];

// 51 Minds Entertainment, 2008 to 2014. Talent Producer on each.
const fiftyMindsCredits = [
  { show: "Flavor of Love", network: "VH1" },
  { show: "Rock of Love", network: "VH1" },
  { show: "I Love Money", network: "VH1" },
  { show: "For the Love of Ray J", network: "VH1" },
  { show: "Real Chance of Love", network: "VH1" },
  { show: "From G’s to Gents", network: "MTV" },
];

// Full width on the phone; its own width, centered, from md up.
const primaryButton =
  "w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:w-auto md:min-w-[280px] md:px-10 md:mx-auto";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:mb-4">{eyebrow}</p>
      <h2 className="font-display text-[1.375rem] md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        {title}
      </h2>
    </div>
  );
}

export function CreditsContent() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      {/* Same bar as the venture pages. The hero holds the one gold button on
          the first screen; the site's floating Book a Call covers the middle. */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10 h-14 md:h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
            Jotham Hall
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 min-h-[44px] text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            About
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-background text-foreground">
        {/* Hero: the role, the range, one action. */}
        <header className="px-6 pt-28 pb-10 md:px-10 md:pt-32 md:pb-16 text-center animate-in fade-in duration-700 motion-reduce:animate-none">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:mb-6">TV Credits</p>
            <h1 className="font-display text-[2.125rem] md:text-5xl lg:text-6xl leading-[1.15] tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-5 md:mb-7">
              Television Producer
            </h1>
            <p className="text-[1.0625rem] md:text-lg lg:text-xl leading-relaxed text-balance text-[#B8B0A8] max-w-[330px] md:max-w-xl mx-auto mb-8 md:mb-10">
              Talent Producer on reality and competition series, from{" "}
              <span className="whitespace-nowrap">Flavor of Love</span> to{" "}
              <span className="whitespace-nowrap">Finding Mr. Christmas</span>.
            </p>
            <button onClick={openCalendly} className={primaryButton}>
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Proof at a glance: the numbers, then the networks behind them. */}
        <section aria-label="Career at a glance" className="px-6 pb-14 md:px-10 md:pb-20">
          <div className="mx-auto max-w-5xl">
            <dl className="grid grid-cols-3 border-y border-[#3D3A35]/60 divide-x divide-[#3D3A35]/60">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse items-center py-5 md:py-9 text-center">
                  <dt className="mt-2.5 md:mt-4 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-[1.75rem] md:text-4xl lg:text-5xl leading-none tracking-[0.04em] text-[#FAF8F5]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 md:mt-12 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] text-center">
              Produced For
            </p>
            {/* Read aloud as one list ("Hallmark, Food Network, ..."); shown as two
                even lines, joined into one from lg up by a dot that only shows there. */}
            <p className="mt-3 md:mt-4 space-y-2 lg:space-y-0 text-center text-[13px] md:text-sm tracking-[0.15em] uppercase text-[#FAF8F5]/90">
              {networkRows.map((row, r) => (
                <span key={row.join()} className="block lg:inline">
                  {row.map((network, i) => (
                    <span key={network}>
                      {(i > 0 || r > 0) && <span className="sr-only">, </span>}
                      {(i > 0 || r > 0) && (
                        <span
                          aria-hidden="true"
                          className={`mx-2.5 md:mx-3.5 text-[#D4A853]/70${i === 0 ? " hidden lg:inline" : ""}`}
                        >
                          &middot;
                        </span>
                      )}
                      <span className="whitespace-nowrap">{network}</span>
                    </span>
                  ))}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Recent network credits: one card each, newest first. From md up they
            sit two to a row, read row by row; four tracks with each card on two
            of them let an odd last card sit centered under the pair above. */}
        <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="2015 to 2025" title="Selected Credits" />
            <ul className="mt-8 md:mt-12 space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-5">
              {featuredCredits.map((credit) => (
                <li
                  key={credit.show}
                  className="bg-[#1A1A1A] border border-[#3D3A35] p-5 md:p-6 lg:p-8 md:col-span-2 md:odd:last:col-start-2"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">{credit.network}</p>
                    <p className="shrink-0 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B] tabular-nums">
                      {credit.years}
                    </p>
                  </div>
                  <h3 className="mt-3 md:mt-4 font-display text-[1.125rem] lg:text-[1.375rem] leading-snug tracking-[0.1em] uppercase text-balance text-[#FAF8F5]">
                    {credit.show}
                  </h3>
                  <p className="mt-1.5 md:mt-2 text-[13px] md:text-sm text-[#B8B0A8]">
                    {credit.role}
                    {credit.seasons && (
                      <>
                        <span aria-hidden="true" className="mx-2 text-[#5C5750]">
                          &middot;
                        </span>
                        {credit.seasons}
                      </>
                    )}
                  </p>
                  <p className="mt-3 pt-3 md:mt-5 md:pt-5 border-t border-[#3D3A35]/60 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8]">
                    {credit.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Where it started: a compact, scannable list. From lg up it reads in
            two columns, row by row, each column with its own rules. */}
        <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <SectionHeading eyebrow="2008 to 2014" title="The 51 Minds Years" />
            <p className="mt-5 md:mt-6 text-[15px] md:text-[17px] leading-relaxed text-balance text-[#B8B0A8] text-center max-w-[340px] md:max-w-xl mx-auto">
              Six years at 51 Minds Entertainment, on the production team for more than 50 reality shows. I rose
              from production assistant to Talent Producer on some of the most iconic dating and competition
              franchises of the era.
            </p>
            <ul className="mt-8 md:mt-12 border-y border-[#3D3A35]/60 divide-y divide-[#3D3A35]/60 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:border-y-0">
              {fiftyMindsCredits.map((credit) => (
                <li
                  key={credit.show}
                  className="flex items-center justify-between gap-4 py-4 md:py-5 lg:border-b lg:border-[#3D3A35]/60 lg:[&:nth-child(-n+2)]:border-t"
                >
                  <span className="font-display text-[0.95rem] md:text-lg leading-snug tracking-[0.1em] uppercase text-[#FAF8F5]">
                    {credit.show}
                  </span>
                  <span className="shrink-0 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">
                    {credit.network}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 md:mt-8 text-[15px] md:text-[17px] leading-relaxed text-balance text-[#B8B0A8] text-center">
              Talent Producer on all six, plus more than 45 other productions in those years.
            </p>
          </div>
        </section>

        {/* The bridge to the business, in the words the old page already used. */}
        <section className="px-6 py-14 md:px-10 md:py-20 border-t border-[#3D3A35]/60">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="What TV Taught Me" title="From the Control Room to the Command Line" />
            <div className="mt-6 md:mt-8 space-y-4 md:space-y-5 text-[1.0625rem] md:text-lg lg:text-xl leading-relaxed text-balance text-[#B8B0A8] text-center max-w-[340px] md:max-w-2xl mx-auto">
              <p>
                Producing reality TV at scale is one skill: building systems that perform without you in every seat.
                Now I apply it to business, building AI systems that run companies.
              </p>
              <p>
                I founded Big Films Only, an independent television and content production company, and Success
                Upgrade, where I build AI business systems and custom software for founders.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/*
        Final ask. It sits outside <main>, right before the footer, on purpose:
        the site's floating Book a Call treats the element just before
        [data-site-footer] as the closing block and steps aside when it shows,
        so the two booking buttons never stack.
      */}
      <section aria-labelledby="credits-final-cta" className="px-6 pt-2 pb-16 md:px-10 md:pb-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 py-10 md:px-16 md:py-16 bg-[#1A1A1A] border border-[#3D3A35] text-center">
          <h2
            id="credits-final-cta"
            className="font-display text-[1.25rem] md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4 md:mb-5"
          >
            Work With a Producer Who Builds Systems
          </h2>
          <p className="text-[15px] md:text-[17px] leading-relaxed text-balance text-[#B8B0A8] mb-7 md:mb-9 max-w-[290px] md:max-w-md mx-auto">
            A 30 minute call about your business: what still runs through you, and what a system could run
            instead.
          </p>
          {/* One action. Call, text and email sit right below in the footer. */}
          <button onClick={openCalendly} className={primaryButton}>
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <FooterSection />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
