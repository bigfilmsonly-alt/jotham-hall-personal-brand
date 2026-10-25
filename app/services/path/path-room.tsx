"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VentureEmbed } from "@/components/venture-embed";
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
  useEffect(() => setUnlocked(readPathUnlocked()), []);

  if (unlocked === null) return <div className="fixed inset-0 bg-[#0D0D0D]" />;
  if (unlocked) return <VentureEmbed name="The Path" site={PATH_SITE} backHref="/services" />;

  // On a desktop the strip's link lines up with the site's centered max-w-6xl bar row, and the join centers below it.
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#0D0D0D]">
      <h1 className="sr-only">The Path</h1>
      <div className="sticky top-0 z-10 flex items-center h-11 pl-2 md:pl-0 bg-black/85 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex md:mx-auto md:w-full md:max-w-6xl md:px-8">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[12px] font-medium text-white/50 hover:text-white/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
            JothamHall.com
          </Link>
        </div>
      </div>
      <div className="px-6 pt-10 pb-16 md:px-10 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <PathJoin onUnlock={() => setUnlocked(true)} />
        </div>
      </div>
    </div>
  );
}
