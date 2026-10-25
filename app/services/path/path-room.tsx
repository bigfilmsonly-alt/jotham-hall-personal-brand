"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VentureEmbed } from "@/components/venture-embed";
import { CalendlyModal } from "@/components/calendly-modal";
import { PathJoin, readPathUnlocked } from "@/components/path/path-join";

/*
  The Path, full screen inside jothamhall.com: the AI Army missions, the same
  training successupgrade.ai/path opens. The cockpit allowlists jothamhall.com
  in its frame-ancestors, so it loads here and on successupgrade.ai only.

  Someone who has not joined yet gets the free join first, on this screen, so a
  shared link to /services/path never lands on a frame they cannot use.
*/
const PATH_SITE = "https://ai-army-website.vercel.app/missions";

export function PathRoom() {
  // null until the browser has been read, so a joined visitor never sees the form flash.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  useEffect(() => setUnlocked(readPathUnlocked()), []);

  if (unlocked === null) return <div className="fixed inset-0 bg-[#0D0D0D]" />;
  if (unlocked) return <VentureEmbed name="The Path" site={PATH_SITE} backHref="/services#the-path" backLabel="Services" />;

  /*
    The same strip as the full screen Path behind it (components/venture-embed.tsx),
    so the frame does not change when the Path opens: the way back names where
    it goes, and from md it sits on the site's centered max-w-6xl bar row.
  */
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#0D0D0D]">
      <h1 className="sr-only">The Path</h1>
      <div className="sticky top-0 z-10 flex items-center h-11 pl-2 md:pl-0 bg-black/85 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex w-full items-center justify-between pr-1 md:mx-auto md:max-w-6xl md:px-10">
          <Link
            href="/services#the-path"
            className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap md:-ml-2"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4 shrink-0" />
            Services
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
      <div className="px-6 pt-10 pb-16 md:px-10 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <PathJoin onUnlock={() => setUnlocked(true)} />
        </div>
      </div>
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </div>
  );
}
