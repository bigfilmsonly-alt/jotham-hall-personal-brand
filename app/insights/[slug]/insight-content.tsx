"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";
import type { InlineSegment, InsightBlock, InsightSummary } from "@/lib/insights-data";
import { ClosingCTA, Headshot, InsightRow, InsightsNav, SectionLabel } from "../insights-shared";

/*
  One reading column at every screen size (see insights-shared.tsx): centered
  header, left aligned body at 17px with 1.7 line height, two related
  articles, then the call to action right above the site footer (see
  ClosingCTA for why it sits there). The body arrives parsed from the server.
*/

interface Props {
  title: string;
  category: string;
  readTime: string;
  publishedAt: string;
  dateLabel: string;
  blocks: InsightBlock[];
  related: InsightSummary[];
  showIndexLink: boolean;
}

const bodyText = "text-[1.0625rem] leading-[1.7] text-[#FAF8F5]/80";

function Segments({ segments }: { segments: InlineSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        segment.href ? (
          <Link
            key={i}
            href={segment.href}
            className="text-[#E8C97A] underline decoration-[#D4A853]/40 underline-offset-[5px] hover:decoration-[#E8C97A] transition-colors"
          >
            {segment.text}
          </Link>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        )
      )}
    </>
  );
}

function quoteLength(segments: InlineSegment[]) {
  return segments.reduce((total, segment) => total + segment.text.length, 0);
}

function blockSpacing(block: InsightBlock, previous: InsightBlock | undefined) {
  if (!previous) return "";
  if (block.type === "heading") return "mt-14";
  if (block.type === "quote" || previous.type === "quote") return "mt-10";
  // More air after a list than between its items, so the text that follows
  // reads as a new thought rather than one more item.
  if (previous.type === "list") return "mt-9";
  if (previous.type === "heading") return "mt-7";
  return "mt-6";
}

function Block({ block, isLede }: { block: InsightBlock; isLede: boolean }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-display text-[1.2rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          <span aria-hidden className="block w-8 h-px bg-[#D4A853] mb-5" />
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <p
          className={`border-l-2 border-[#D4A853] pl-5 font-light leading-[1.5] text-[#FAF8F5] ${
            quoteLength(block.segments) > 90 ? "text-[1.1875rem]" : "text-[1.3125rem]"
          }`}
        >
          <Segments segments={block.segments} />
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      const hasLeads = block.items.some((item) => item.lead);
      return (
        <List className={hasLeads ? "space-y-7" : "space-y-4"}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              {block.ordered ? (
                <span aria-hidden className="w-6 shrink-0 font-mono text-[13px] leading-[29px] text-[#D4A853]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : (
                <span aria-hidden className="mt-[12px] mx-[3px] w-[5px] h-[5px] shrink-0 rotate-45 bg-[#D4A853]" />
              )}
              <div className="min-w-0">
                {item.lead && (
                  <h3 className="text-[1.0625rem] font-semibold leading-[1.7] text-[#FAF8F5]">{item.lead}</h3>
                )}
                <p className={`${item.lead ? "mt-1" : ""} ${bodyText}`}>
                  <Segments segments={item.segments} />
                </p>
              </div>
            </li>
          ))}
        </List>
      );
    }
    default:
      return (
        <p className={isLede ? "text-[1.1875rem] leading-[1.65] text-[#FAF8F5]" : bodyText}>
          <Segments segments={block.segments} />
        </p>
      );
  }
}

export function InsightContent({ title, category, readTime, publishedAt, dateLabel, blocks, related, showIndexLink }: Props) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      <main className="min-h-screen bg-[#0D0D0D]">
        <InsightsNav onBook={openCalendly} />

        <article>
          <header className="px-6 pt-28 pb-10 text-center">
            <p className="text-[13px] tracking-[0.15em] uppercase text-[#D4A853]">{category}</p>
            <h1 className="mt-5 font-display text-[1.5rem] leading-[1.3] tracking-[0.1em] uppercase text-balance text-[#FAF8F5]">
              {title}
            </h1>
            <div className="mt-8 inline-flex items-center gap-3 text-left">
              <Headshot size={44} />
              <div>
                <p className="text-[15px] font-medium text-[#FAF8F5]">Jotham Hall</p>
                <p className="text-[13px] text-[#8A837B]">
                  <time dateTime={publishedAt}>{dateLabel}</time>
                  <span aria-hidden className="mx-1.5 text-[#5C5750]">&middot;</span>
                  {readTime}
                </p>
              </div>
            </div>
          </header>

          <div className="mx-6 border-t border-[#3D3A35]/60" />

          <div className="px-6 pt-10">
            {blocks.map((block, i) => (
              <div key={i} className={blockSpacing(block, blocks[i - 1])}>
                <Block block={block} isLede={i === 0 && block.type === "paragraph"} />
              </div>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <section className="px-6 pt-16 pb-14">
            <SectionLabel>Keep Reading</SectionLabel>
            <ul className="mt-2">
              {related.map((insight) => (
                <InsightRow key={insight.slug} insight={insight} />
              ))}
            </ul>
            {showIndexLink && (
              <Link
                href="/insights"
                className="group mt-8 flex items-center justify-center gap-2 py-2 text-[13px] tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
              >
                All Insights
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </section>
        )}

        <ClosingCTA onBook={openCalendly} />
        <FooterSection />
      </main>

      {/* Mounted only while open: every mounted CalendlyModal listens for
          bookings, and the floating button already keeps one mounted. */}
      {isCalendlyOpen && <CalendlyModal isOpen onClose={() => setIsCalendlyOpen(false)} />}
    </>
  );
}
