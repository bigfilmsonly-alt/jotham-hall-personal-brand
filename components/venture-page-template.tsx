"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { FooterSection } from "@/components/landing/footer-section";
import { SiteHeader } from "@/components/site-header";
import type { Venture } from "@/lib/ventures";

/*
  The phone design is the base: every unprefixed class is the approved layout.
  On a desktop the page fills the window (Jo, 2026-10-14), so md: (768 up) and
  lg: (1024 up) variants only add size: the top bar's row centered at
  max-w-6xl, a larger hero with the Visit button at desktop width, and from lg
  the venture's phone screenshot beside the hero copy. About and What It Does
  sit at reading width inside full width borders.

  From lg, with the phone beside the hero, About, What It Does and the closing
  card all start on the hero copy's left edge: the top bar's max-w-6xl row
  (72rem) less its px-10 padding is 67rem, centered inside each section's own
  px-10, with the text at reading width (max-w-2xl) from its left edge.
*/

export function VenturePageTemplate({ venture }: { venture: Venture }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const extraLinks = venture.links ?? [];
  // Every venture has a screenshot; without one the hero simply stays centered,
  // and so does everything below it.
  const hasPhone = Boolean(venture.preview);
  const column = `md:mx-auto md:max-w-2xl ${hasPhone ? "lg:max-w-[67rem]" : ""}`;
  const reading = hasPhone ? "lg:max-w-2xl" : "";

  return (
    <>
      <SiteHeader back={{ href: "/ventures", label: "Ventures" }} />

      <main className="min-h-screen bg-background pb-16 md:pb-20">
        {/*
          From lg, two columns on the top bar's own max-w-6xl row, so the copy
          starts under the back link and the phone ends under Book a Call.
        */}
        <header
          className={`px-6 pt-28 pb-12 text-center md:px-10 md:pt-32 md:pb-20 ${hasPhone ? "lg:mx-auto lg:max-w-6xl" : ""}`}
        >
          <div
            className={`md:mx-auto md:max-w-3xl ${
              hasPhone ? "lg:max-w-none lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:text-left" : ""
            }`}
          >
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4 md:text-xs md:mb-6">{venture.category}</p>
              <h1 className="font-display text-[1.75rem] leading-tight tracking-[0.12em] uppercase text-balance mb-4 md:text-5xl md:mb-6 lg:text-6xl">
                {venture.name}
              </h1>
              <p
                className={`text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto md:max-w-xl md:text-lg lg:text-xl ${
                  hasPhone ? "lg:mx-0" : ""
                }`}
              >
                {venture.tagline}
              </p>
              <div className={`flex flex-wrap justify-center gap-2 mt-6 md:mt-8 ${hasPhone ? "lg:justify-start" : ""}`}>
                <span className="px-3 py-1 whitespace-nowrap text-xs tracking-[0.12em] uppercase border border-[#D4A853]/40 text-[#D4A853] md:text-[13px] md:px-4 md:py-1.5">
                  {venture.status}
                </span>
                {venture.year && (
                  <span className="px-3 py-1 whitespace-nowrap text-xs tracking-[0.12em] uppercase border border-[#3D3A35] text-[#8A837B] md:text-[13px] md:px-4 md:py-1.5">
                    Since {venture.year}
                  </span>
                )}
              </div>
              {/*
                The site opens inside jothamhall.com; only unframeable links (App
                Store) leave. From md: a lone Visit button is at least 280 wide and
                as wide as its label, and a pair stays two equal buttons.
              */}
              <div
                className={`grid gap-2.5 mt-8 md:mt-10 ${
                  extraLinks.length === 1
                    ? `grid-cols-2 md:mx-auto md:max-w-xl ${hasPhone ? "lg:mx-0" : ""}`
                    : `grid-cols-1 md:grid-cols-[minmax(280px,max-content)] md:justify-center ${hasPhone ? "lg:justify-start" : ""}`
                }`}
              >
                <Link
                  href={`/ventures/${venture.slug}/site`}
                  className="py-3.5 px-3 text-sm font-medium tracking-wide flex items-center justify-center gap-2 bg-[#D4A853] text-[#0D0D0D] hover:bg-[#E8C97A] transition-colors pointer-coarse:active:scale-[0.97] md:px-10"
                >
                  {venture.visitLabel}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                </Link>
                {extraLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-3 text-sm font-medium tracking-wide flex items-center justify-center gap-2 border border-[#3D3A35] text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors pointer-coarse:active:scale-[0.97] md:px-10"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/*
              Desktop only: the live site's phone screenshot, a picture and not a
              link (the buttons beside it open the site). Up to 260 wide; on
              shorter windows it scales down (to no less than 200) so it clears
              the tab bar on the first screen. Hidden and lazy, so phones never
              download it.
            */}
            {venture.preview && (
              <div className="hidden lg:block relative w-[min(260px,max(200px,calc((100vh_-_14rem)*0.4621)))] aspect-[390/844] overflow-hidden rounded-[28px] border border-[#3D3A35] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                {/* The -2x file: this phone shows up to 260px wide on desktop screens, so it needs twice the pixels to stay sharp on Retina. */}
                <Image
                  src={venture.preview.replace(/\.jpg$/, "-2x.jpg")}
                  alt={`${venture.name} home screen on a phone`}
                  fill
                  sizes="260px"
                  className="object-cover object-top"
                />
              </div>
            )}
          </div>
        </header>

        <section className="px-6 py-12 border-t border-[#3D3A35]/60 md:px-10 md:py-20">
          <div className={column}>
            <div className={reading}>
              <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-5 md:text-xs md:mb-6">About</h2>
              <p className="text-[1.0625rem] leading-relaxed text-pretty text-[#FAF8F5]/85 md:text-xl">{venture.description}</p>
              {venture.role && (
                <p className="mt-6 text-[15px] text-pretty text-[#8A837B] md:mt-8 md:text-base">
                  <span className="text-[#FAF8F5]">My role:</span> {venture.role}
                </p>
              )}
            </div>
          </div>
        </section>

        {venture.features.length > 0 && (
          <section className="px-6 py-12 border-t border-[#3D3A35]/60 md:px-10 md:py-20">
            <div className={column}>
              <div className={reading}>
                <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-6 md:text-xs md:mb-8">What It Does</h2>
                <ol className="space-y-5 md:space-y-6">
                  {venture.features.map((feature, i) => (
                    <li key={feature} className="flex gap-4 md:gap-5">
                      <span aria-hidden="true" className="font-mono text-xs text-[#D4A853]/70 pt-1 md:text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[#B8B0A8] leading-relaxed text-pretty md:text-lg">{feature}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* The phone's inset card; from md the same column and width as the text above, its button at desktop width. */}
        <div className="md:px-10">
          <div className={column}>
            <section
              className={`mx-6 mt-4 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center md:mx-0 md:mt-0 md:px-16 md:py-16 ${reading}`}
            >
              <h2 className="font-display text-lg tracking-[0.12em] uppercase text-balance mb-3 md:text-3xl md:mb-5">Build With Me</h2>
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
        </div>
      </main>

      <FooterSection />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
