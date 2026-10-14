"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { InsightSummary } from "@/lib/insights-data";

/*
  Shared by /insights and /insights/[slug]. Everything is laid out for the
  430px column that globals.css holds the site in from 768px up, so nothing
  here uses viewport breakpoints (sm:, md:, lg:): on a desktop those fire
  while the page is still phone width.
*/

export function InsightsNav({ onBook }: { onBook: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/85 backdrop-blur-md border-b border-[#3D3A35]/60">
      <div className="px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase text-[#FAF8F5]">
          Jotham Hall
        </Link>
        <button
          onClick={onBook}
          className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-[13px] font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
        >
          Book a Call
        </button>
      </div>
    </nav>
  );
}

export function Headshot({ size }: { size: number }) {
  return (
    <Image
      src="/jotham-hall-headshot.jpg"
      alt="Jotham Hall"
      width={size * 2}
      height={size * 2}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover border border-[#D4A853]/40"
    />
  );
}

/** Section label with a hairline, as on the ventures pages. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[13px] tracking-[0.15em] uppercase text-[#8A837B]">
      {children}
      <span aria-hidden className="flex-1 h-px bg-[#3D3A35]/60" />
    </h2>
  );
}

/**
  Category on the left, read time on the right. Each part stays whole: if a
  long category ever leaves no room at 360px, the read time drops to its own
  line instead of splitting "2 min / read".
*/
export function InsightMeta({ category, readTime }: { category: string; readTime: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <p className="whitespace-nowrap text-[13px] tracking-[0.12em] uppercase text-[#D4A853]">{category}</p>
      <p className="whitespace-nowrap text-[13px] text-[#8A837B]">{readTime}</p>
    </div>
  );
}

/** One article in a list: category and read time, title, one line of excerpt. */
export function InsightRow({ insight }: { insight: InsightSummary }) {
  return (
    <li className="border-b border-[#3D3A35]/60">
      <Link href={`/insights/${insight.slug}`} className="group block py-5 active:opacity-80">
        <InsightMeta category={insight.category} readTime={insight.readTime} />
        <h3 className="mt-2 text-[1.0625rem] font-medium leading-snug text-balance text-[#FAF8F5] group-hover:text-[#E8C97A] transition-colors">
          {insight.title}
        </h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#B8B0A8] line-clamp-1">{insight.excerpt}</p>
      </Link>
    </li>
  );
}

/**
  The closing block on both pages. It sits directly above FooterSection: the
  site's floating Book a Call treats the element right before the footer as the
  closing block and steps aside when it shows, so two booking buttons never
  stack. One action only, as on the other pages; call, text and email are
  listed in the footer right below.
*/
export function ClosingCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="px-6 pb-16">
      <div className="px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
        <div className="flex justify-center mb-5">
          <Headshot size={64} />
        </div>
        <p className="text-[13px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Work With Me</p>
        <h2 className="font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4">
          Put These Ideas to Work
        </h2>
        <p className="text-[15px] leading-relaxed text-[#B8B0A8] mb-7 max-w-[300px] mx-auto">
          I build AI systems and apps for business owners, after 15 years producing TV. Book a free strategy call and
          I will show you the first system worth building.
        </p>
        <button
          onClick={onBook}
          className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
        >
          Book a Strategy Call
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
