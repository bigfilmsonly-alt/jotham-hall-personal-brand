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
*/
export function BrainAndPath() {
  const router = useRouter();
  const [tab, setTab] = useState<PathTab>("brain");
  const [unlocked, setUnlocked] = useState(false);

  // localStorage exists only in the browser, so the first render assumes a new visitor.
  useEffect(() => setUnlocked(readPathUnlocked()), []);

  return (
    <section id="the-path" data-hide-floating-cta className="px-6 py-12 border-t border-[#3D3A35]/60">
      <PathTabs value={tab} onChange={setTab} />

      {tab === "brain" ? (
        <div className="pt-9 text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853]">How the machine runs</p>
          <h2 className="mt-3 mb-7 font-display text-2xl leading-snug tracking-[0.12em] uppercase text-[#FAF8F5]">
            One brain.
            <span className="block text-[#D4A853]">Every platform.</span>
          </h2>
          <PlatformOrbit />
          <p className="mt-7 text-[15px] leading-relaxed text-[#B8B0A8] max-w-[320px] mx-auto">
            One post, everywhere. Written once, shaped for each platform, and published on schedule.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <Link
              href="/ventures"
              className="min-h-[48px] flex items-center justify-center border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.97]"
            >
              See the Ventures
            </Link>
            <button
              type="button"
              onClick={() => setTab("path")}
              className="min-h-[48px] flex items-center justify-center gap-1.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
            >
              Build It
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-9">
          {unlocked ? (
            <div className="text-center">
              <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853]">The Path is open</p>
              <h3 className="mt-3 font-display text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
                Pick up where you left off
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#B8B0A8]">
                Missions, walkthroughs, and video training, with your progress saved as you go.
              </p>
              <Link
                href="/services/path"
                className="mt-7 w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
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
    </section>
  );
}
