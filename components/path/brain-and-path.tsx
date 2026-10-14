"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PlatformOrbit from "./platform-orbit";
import PathTabs, { type PathTab } from "./path-tabs";
import { PathJoin, readPathUnlocked } from "./path-join";

/*
  The Brain and the Path from successupgrade.ai/path, on the Services tab.
  The Brain shows the system behind every service: one brain running every
  brand and publishing everywhere. The Path is the free training that builds
  it, opened full screen at /services/path once someone has joined.

  On a desktop it is laid out the way successupgrade.ai/path is: the tabs a
  modest centered pair, the heading over a large orbit (it sizes itself, see
  platform-orbit.tsx), then the line and the two buttons, all on one axis.
*/
export function BrainAndPath() {
  const router = useRouter();
  const [tab, setTab] = useState<PathTab>("brain");
  const [unlocked, setUnlocked] = useState(false);

  // localStorage exists only in the browser, so the first render assumes a new visitor.
  useEffect(() => setUnlocked(readPathUnlocked()), []);

  return (
    <section
      id="the-path"
      data-hide-floating-cta
      className="px-6 py-12 md:px-10 md:py-20 lg:py-24 border-t border-[#3D3A35]/60"
    >
      <div className="mx-auto max-w-5xl">
        <PathTabs value={tab} onChange={setTab} />

        {tab === "brain" ? (
          <div className="pt-9 md:pt-14 text-center">
            <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">How the machine runs</p>
            {/* The orbit's box keeps clear space around its outer ring, so the margins either side of it stay modest. */}
            <h2 className="mt-3 mb-7 md:mt-4 md:mb-8 font-display text-2xl md:text-4xl leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
              One brain.
              <span className="block text-[#D4A853]">Every platform.</span>
            </h2>
            <PlatformOrbit />
            <p className="mt-7 md:mt-8 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] max-w-[320px] md:max-w-md mx-auto md:text-balance">
              One post, everywhere. Written once, shaped for each platform, and published on schedule.
            </p>
            <div className="mt-6 md:mt-10 grid grid-cols-2 gap-2.5 md:gap-3 md:mx-auto md:max-w-xl">
              <Link
                href="/ventures"
                className="min-h-[48px] md:min-h-[52px] flex items-center justify-center border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.97]"
              >
                See the Ventures
              </Link>
              <button
                type="button"
                onClick={() => setTab("path")}
                className="min-h-[48px] md:min-h-[52px] flex items-center justify-center gap-1.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium hover:bg-[#E8C97A] transition-colors active:scale-[0.97] md:cursor-pointer"
              >
                Build It
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-9 md:pt-14">
            {unlocked ? (
              <div className="text-center md:mx-auto md:max-w-xl">
                <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">The Path is open</p>
                <h3 className="mt-3 md:mt-4 font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
                  Pick up where you left off
                </h3>
                <p className="mt-3 md:mt-4 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8]">
                  Missions, walkthroughs, and video training, with your progress saved as you go.
                </p>
                <Link
                  href="/services/path"
                  className="mt-7 md:mt-10 w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:w-fit md:min-w-[280px] md:px-10 md:mx-auto"
                >
                  Open the Path
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <PathJoin
                onUnlock={() => {
                  setUnlocked(true);
                  router.push("/services/path");
                }}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
