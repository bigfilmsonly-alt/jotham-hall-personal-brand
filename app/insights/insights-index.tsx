"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";
import type { InsightSummary } from "@/lib/insights-data";
import { ClosingCTA, Headshot, InsightMeta, InsightRow, InsightsNav, SectionLabel } from "./insights-shared";

/*
  One centered column at every screen size (see insights-shared.tsx): who
  writes, one featured article, every other article as a single list, then
  the call to action and the site footer (which carries the tab bar clearance).
*/

interface Props {
  featured: InsightSummary | null;
  articles: InsightSummary[];
}

export function InsightsIndex({ featured, articles }: Props) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      <main className="min-h-screen bg-[#0D0D0D]">
        <InsightsNav onBook={openCalendly} />

        <header className="px-6 pt-28 pb-12 text-center">
          <h1 className="font-display text-[2.25rem] leading-none tracking-[0.12em] uppercase text-[#FAF8F5]">
            Insights
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#B8B0A8] max-w-[320px] mx-auto">
            Practical thinking for business owners on AI, systems, and building a business that scales without
            burning out.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 text-left">
            <Headshot size={44} />
            <div>
              <p className="text-[15px] font-medium text-[#FAF8F5]">By Jotham Hall</p>
              <p className="text-[13px] text-[#8A837B]">AI systems architect &middot; 15 years in TV</p>
            </div>
          </div>
        </header>

        {featured && (
          <section className="px-6 pb-12">
            <SectionLabel>Featured</SectionLabel>
            <Link
              href={`/insights/${featured.slug}`}
              className="group mt-4 block p-6 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:opacity-90"
            >
              <InsightMeta category={featured.category} readTime={featured.readTime} />
              <h3 className="mt-3 font-display text-[1.25rem] leading-snug tracking-[0.1em] uppercase text-balance text-[#FAF8F5]">
                {featured.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#B8B0A8] line-clamp-3">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.15em] uppercase text-[#D4A853] group-hover:text-[#E8C97A] transition-colors">
                Read the Article
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </section>
        )}

        <section className="px-6 pb-16">
          <SectionLabel>All Articles</SectionLabel>
          <ul className="mt-2">
            {articles.map((insight) => (
              <InsightRow key={insight.slug} insight={insight} />
            ))}
          </ul>
        </section>

        <ClosingCTA onBook={openCalendly} />
        <FooterSection />
      </main>

      {/* Mounted only while open: every mounted CalendlyModal listens for
          bookings, and the floating button already keeps one mounted. */}
      {isCalendlyOpen && <CalendlyModal isOpen onClose={() => setIsCalendlyOpen(false)} />}
    </>
  );
}
