"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";

/*
  A venture's own site, full screen inside jothamhall.com, so a visitor who taps
  through never leaves. Built like successupgrade.ai's Hydrate tab.

  The guest keeps its own navigation. lib/full-bleed.ts makes the root layout's
  tab bar and floating CTA stand down on this route, because two stacked tab
  bars is not one page; the back link in the strip is the way out.

  Every guest allowlists jothamhall.com with frame-ancestors on its enforcing
  CSP, and nothing else. On localhost that means Chrome's broken frame
  placeholder even when this code is right: check it on a deployed URL.
*/
const CHROME_TOP = "calc(44px + env(safe-area-inset-top, 0px))";
const CHROME_BOTTOM = "env(safe-area-inset-bottom, 0px)";

export function VentureEmbed({ name, site, slug }: { name: string; site: string; slug: string }) {
  const [loaded, setLoaded] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

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
      {/*
        A returning strip, not a title bar. The guest's own full width header
        sits directly underneath, so anything with weight here reads as two
        headers stacked: one quiet way back, one way into a call.
      */}
      <div
        className="absolute top-0 inset-x-0 z-10 flex items-center justify-between pl-2 pr-1 bg-black/85 backdrop-blur-xl border-b border-white/[0.04]"
        style={{ height: CHROME_TOP, paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <Link
          href={`/ventures/${slug}`}
          className="group inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[12px] font-medium text-white/50 hover:text-white/90 transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          JothamHall.com
        </Link>
        <button
          onClick={() => setIsCalendlyOpen(true)}
          className="inline-flex items-center min-h-[44px] px-2.5 text-[12px] font-semibold whitespace-nowrap text-[#D4A853] hover:text-[#E8C97A] transition-colors"
        >
          Book a call
        </button>
      </div>

      {!loaded && (
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none"
          style={{ top: CHROME_TOP, bottom: 0 }}
        >
          <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase animate-pulse">Loading {name}</p>
        </div>
      )}

      <iframe
        src={site}
        title={name}
        onLoad={() => setLoaded(true)}
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
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </div>
  );
}
