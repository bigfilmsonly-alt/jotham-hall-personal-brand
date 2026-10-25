"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";
import { FooterSection } from "@/components/landing/footer-section";
import { SiteHeader } from "@/components/site-header";
import type { InlineSegment, InsightBlock, InsightSummary } from "@/lib/insights-data";
import { ClosingCTA, Headshot, InsightRow, SectionLabel } from "../insights-shared";

/*
  One reading column: centered header, left aligned body at 17px with 1.7 line
  height, two related articles, then the call to action right above the site
  footer. The body arrives parsed from the server.

  The unprefixed classes are the phone design, approved as it is. From md
  (768px) up the page reads as a classic long form article: the header in
  max-w-4xl with a larger title (two lines for most titles), the body in a
  max-w-2xl column at 19px (under 80 characters a line), and Keep Reading
  and the closing card in that same column, so every left edge lines up.
  Desktop styling only adds md: and lg: variants and wrappers that do nothing
  on a phone, so nothing on a phone moves.
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

const bodyText = "text-[1.0625rem] md:text-[1.1875rem] leading-[1.7] text-pretty text-[#FAF8F5]/80";

function Segments({ segments }: { segments: InlineSegment[] }) {
  return (
    <>
      {segments.map((segment, i) =>
        segment.href ? (
          <Link
            key={i}
            href={segment.href}
            // Taller tap area on touch screens; the negative margin keeps the line where it was.
            className="text-[#E8C97A] underline decoration-[#D4A853]/40 underline-offset-[5px] hover:decoration-[#E8C97A] transition-colors pointer-coarse:inline-block pointer-coarse:-my-3.5 pointer-coarse:py-3.5"
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
        <h2 className="font-display text-[1.2rem] md:text-2xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          <span aria-hidden className="block w-8 md:w-10 h-px bg-[#D4A853] mb-5 md:mb-6" />
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <p
          className={`border-l-2 border-[#D4A853] pl-5 md:pl-7 font-light leading-[1.5] text-pretty text-[#FAF8F5] ${
            quoteLength(block.segments) > 90 ? "text-[1.1875rem] md:text-[1.375rem]" : "text-[1.3125rem] md:text-[1.625rem]"
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
              {/* Number and diamond sit on the first line: its height is the
                  text size times 1.7 (17px on a phone, 19px from md). */}
              {block.ordered ? (
                <span aria-hidden className="w-6 shrink-0 font-mono text-[13px] leading-[29px] md:leading-[32.3px] text-[#D4A853]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : (
                <span aria-hidden className="mt-[12px] md:mt-[13.5px] mx-[3px] w-[5px] h-[5px] shrink-0 rotate-45 bg-[#D4A853]" />
              )}
              <div className="min-w-0">
                {item.lead && (
                  <h3 className="text-[1.0625rem] md:text-[1.1875rem] font-semibold leading-[1.7] text-pretty text-[#FAF8F5]">{item.lead}</h3>
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
        <p className={isLede ? "text-[1.1875rem] md:text-[1.375rem] leading-[1.65] text-pretty text-[#FAF8F5]" : bodyText}>
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
      <SiteHeader />

      <main className="min-h-screen bg-[#0D0D0D]">
        <article>
          <header className="px-6 pt-28 pb-10 md:px-10 md:pt-32 md:pb-14 text-center">
            <div className="mx-auto max-w-3xl md:max-w-4xl lg:max-w-5xl">
              <p className="text-[13px] md:text-sm tracking-[0.15em] uppercase text-[#D4A853]">{category}</p>
              {/* A sentence long title, so one step below the page title size
                  (md:text-5xl lg:text-6xl) to stay at three or four lines. */}
              <h1 className="mt-5 md:mt-6 font-display text-[1.5rem] md:text-4xl lg:text-5xl leading-[1.3] md:leading-[1.2] tracking-[0.1em] uppercase text-balance text-[#FAF8F5]">
                {title}
              </h1>
              <div className="mt-8 md:mt-10 inline-flex items-center gap-3 md:gap-4 text-left">
                <Headshot size={44} />
                <div>
                  <p className="text-[15px] md:text-base font-medium text-[#FAF8F5]">Jotham Hall</p>
                  <p className="text-[13px] md:text-sm text-[#8A837B]">
                    <time dateTime={publishedAt}>{dateLabel}</time>
                    <span aria-hidden className="mx-1.5 text-[#5C5750]">&middot;</span>
                    {readTime}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* The rule and the body share the reading column from md. */}
          <div className="mx-6 border-t border-[#3D3A35]/60 md:mx-auto md:max-w-2xl" />

          <div className="px-6 pt-10 md:px-10 md:pt-14">
            <div className="mx-auto max-w-2xl">
              {blocks.map((block, i) => (
                <div key={i} className={blockSpacing(block, blocks[i - 1])}>
                  <Block block={block} isLede={i === 0 && block.type === "paragraph"} />
                </div>
              ))}
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="px-6 pt-16 pb-14 md:px-10 md:pt-24 md:pb-20">
            {/* From md: the reading column's width, the two articles side by side as cards. */}
            <div className="mx-auto max-w-2xl">
              <SectionLabel>Keep Reading</SectionLabel>
              <ul className="mt-2 md:mt-6 md:grid md:grid-cols-2 md:gap-4">
                {related.map((insight) => (
                  <InsightRow key={insight.slug} insight={insight} card />
                ))}
              </ul>
              {showIndexLink && (
                <Link
                  href="/insights"
                  className="mt-8 flex min-h-[44px] items-center justify-center gap-2 text-[13px] tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
                >
                  All Insights
                  <ArrowRight aria-hidden className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </section>
        )}

        <ClosingCTA onBook={openCalendly} />
        <FooterSection />
      </main>

      {/* For the closing card's button; the top bar keeps its own. Mounted only while open. */}
      {isCalendlyOpen && <CalendlyModal isOpen onClose={() => setIsCalendlyOpen(false)} />}
    </>
  );
}
