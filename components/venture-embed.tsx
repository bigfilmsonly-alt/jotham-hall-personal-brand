"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";

/*
  A venture's own site, full screen inside jothamhall.com, so a visitor who taps
  through never leaves. Built like successupgrade.ai's Hydrate tab.

  The guest keeps its own navigation. lib/full-bleed.ts makes the root layout's
  tab bar stand down on this route, because two stacked tab bars is not one
  page; the back link in the strip is the way out, and it names where it goes.

  Every guest allowlists jothamhall.com with frame-ancestors on its enforcing
  CSP, and nothing else. On localhost that means Chrome's broken frame
  placeholder even when this code is right: check it on a deployed URL.
*/
const CHROME_TOP = "calc(44px + env(safe-area-inset-top, 0px))";
const CHROME_BOTTOM = "env(safe-area-inset-bottom, 0px)";

// Where a link into the viewer can ask the strip to return (?from=/ventures),
// so a visitor who came from the Ventures list goes back to the list.
const RETURNS: Record<string, string> = {
  "/": "Home",
  "/ventures": "Ventures",
  "/services": "Services",
  "/about": "About",
};

export function VentureEmbed({
  name,
  site,
  backHref,
  backLabel,
  framable = true,
}: {
  name: string;
  site: string;
  // The default way back: the venture's page, or the Services page for the Path.
  backHref: string;
  backLabel: string;
  // False when the guest's own headers refuse to be framed here (lib/frame-check.ts):
  // the viewer then offers the site in its own tab instead of showing a blank frame.
  framable?: boolean;
}) {
  const [src, setSrc] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const [back, setBack] = useState({ href: backHref, label: backLabel });
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  /*
    The frame's address is set only once this page is running. A guest that
    finished loading before the page's script had started fired its load event
    to nobody, and the frame stayed hidden behind "Loading" for good. As a
    second guard the frame shows after four seconds whatever happens, so a slow
    guest shows its own loading state rather than an empty screen.
  */
  useEffect(() => {
    if (!framable) return;
    setSrc(site);
    const reveal = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(reveal);
  }, [site, framable]);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from && from in RETURNS) setBack({ href: from, label: RETURNS[from] });
  }, []);

  /*
    The overlay covers the page, but the document behind it could still scroll,
    which on a phone shows up as the whole view rubber banding. Lock it while
    this route is mounted, and restore it so no other route inherits the lock.
  */
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-[#0D0D0D]">
      <h1 className="sr-only">{name}</h1>
      {/*
        A returning strip, not a title bar. The guest's own full width header
        sits directly underneath, so anything with weight here reads as two
        headers stacked: one quiet way back, one way into a call. The strip
        spans the window; from md its two links sit on the same centered
        max-w-6xl row as the site's top bars, their text on the row's edges.
      */}
      <div
        className="absolute top-0 inset-x-0 z-10 flex items-center justify-between pl-2 pr-1 bg-black/85 backdrop-blur-xl border-b border-white/[0.04] md:px-0"
        style={{ height: CHROME_TOP, paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex w-full items-center justify-between md:mx-auto md:max-w-6xl md:px-10">
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap md:-ml-2"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4 shrink-0" />
            {back.label}
          </Link>
          <button
            type="button"
            onClick={() => setIsCalendlyOpen(true)}
            className="inline-flex items-center min-h-[44px] px-2.5 text-[13px] font-semibold whitespace-nowrap text-[#D4A853] hover:text-[#E8C97A] transition-colors md:-mr-2.5"
          >
            Book a Call
          </button>
        </div>
      </div>

      {!framable && (
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-center px-6"
          style={{ top: CHROME_TOP }}
        >
          <div className="w-full max-w-md border border-[#3D3A35] bg-[#1A1A1A] px-6 py-10 text-center md:px-10 md:py-12">
            <p className="text-xs tracking-[0.15em] uppercase text-[#D4A853]">Opens in its own tab</p>
            <h2 className="mt-4 font-display text-2xl tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:text-3xl">{name}</h2>
            <p className="mx-auto mt-4 max-w-xs text-[15px] leading-relaxed text-[#B8B0A8] text-pretty">
              {name} opens in a new tab. This page stays open, so you can come right back.
            </p>
            <a
              href={site}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 bg-[#D4A853] py-3.5 text-sm font-medium tracking-wide text-[#0D0D0D] transition-colors hover:bg-[#E8C97A] pointer-coarse:active:scale-[0.97]"
            >
              Open {name}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {framable && !loaded && (
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none"
          style={{ top: CHROME_TOP, bottom: 0 }}
        >
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase animate-pulse motion-reduce:animate-none">Loading {name}</p>
        </div>
      )}

      {framable && (
        <iframe
          src={src}
          title={name}
          onLoad={() => {
            if (src) setLoaded(true);
          }}
          /*
            An explicit height, not top + bottom. An iframe is a replaced element,
            so with height left auto it falls back to its intrinsic 150px instead
            of stretching. calc keeps it tied to the strip above.
          */
          className={`absolute inset-x-0 w-full border-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: CHROME_TOP, height: `calc(100% - ${CHROME_TOP} - ${CHROME_BOTTOM})` }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; payment"
          // allow-same-origin means the guest's own origin: without it the guest's
          // routing, storage and scripts break. It still cannot reach this page.
          // allow-storage-access-by-user-activation lets the Path keep a visitor's progress in Safari.
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation"
        />
      )}

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </div>
  );
}
