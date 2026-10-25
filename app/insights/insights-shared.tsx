"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { InsightSummary } from "@/lib/insights-data";

/*
  Shared by /insights and /insights/[slug]. The unprefixed classes are the
  phone design, approved as it is. From md (768px) up the same blocks take a
  desktop size through md: and lg: variants only, so nothing on a phone moves:
  list rows can stand side by side (the article page's Keep Reading), and the
  closing card shares the article body's max-w-2xl column. The top bar is the
  site's shared SiteHeader.
*/

export function Headshot({ size }: { size: number }) {
  return (
    <Image
      src="/jotham-hall-headshot-480.jpg"
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

/**
  One article in a list: category and read time, title, one line of excerpt.
  `card` (Keep Reading, where two stand side by side from md) makes each one a
  bordered card from md up, so two neighboring links read as two separate
  things; on a phone it stays a row under a hairline.
*/
export function InsightRow({ insight, card = false }: { insight: InsightSummary; card?: boolean }) {
  return (
    <li className={`border-b border-[#3D3A35]/60${card ? " md:border-b-0" : ""}`}>
      <Link
        href={`/insights/${insight.slug}`}
        className={`group block py-5 md:py-7 active:opacity-80${
          card ? " md:h-full md:px-5 md:bg-[#1A1A1A] md:border md:border-[#3D3A35] md:hover:border-[#D4A853]/40 md:transition-colors" : ""
        }`}
      >
        <InsightMeta category={insight.category} readTime={insight.readTime} />
        <h3 className="mt-2 md:mt-3 text-[1.0625rem] md:text-xl font-medium leading-snug text-balance text-[#FAF8F5] group-hover:text-[#E8C97A] transition-colors">
          {insight.title}
        </h3>
        <p className="mt-1.5 md:mt-2.5 text-[15px] md:text-base leading-relaxed text-pretty text-[#B8B0A8] line-clamp-1 md:line-clamp-2">
          {insight.excerpt}
        </p>
      </Link>
    </li>
  );
}

/**
  The closing block on both pages, directly above FooterSection. One action
  only, as on the other pages; call, text and email are listed in the footer
  right below.
*/
export function ClosingCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="px-6 pb-16 md:px-10 md:pb-24">
      <div className="px-6 py-10 md:px-16 md:py-16 md:mx-auto md:max-w-2xl bg-[#1A1A1A] border border-[#3D3A35] text-center">
        <div className="flex justify-center mb-5 md:mb-6">
          <Headshot size={64} />
        </div>
        <p className="text-[13px] tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:mb-4">Work With Me</p>
        <h2 className="font-display text-[1.375rem] md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4 md:mb-5">
          Put These Ideas to Work
        </h2>
        <p className="text-[15px] md:text-[17px] leading-relaxed text-pretty text-[#B8B0A8] mb-7 md:mb-9 max-w-[300px] md:max-w-md mx-auto">
          I build AI systems and apps for business owners, after 15 years producing TV. Book a free strategy call and
          I will show you the first system worth building.
        </p>
        <button
          type="button"
          onClick={onBook}
          className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:w-fit md:min-w-[280px] md:px-10 md:mx-auto"
        >
          Book a Strategy Call
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
