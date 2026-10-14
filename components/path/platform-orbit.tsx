"use client";

import { useEffect, useRef, useState } from "react";

/*
  The Brain, from successupgrade.ai/path: one brain at the centre, Jo's brands
  on the rings around it and every platform it publishes to further out, each
  ring turning at its own pace while its chips stay upright.

  SIZED FROM ITS OWN WIDTH, NOT THE VIEWPORT.
  The original sized everything in vw for a phone. This site is a 430px column
  at every screen size, so on a desktop those vw clamps read the 1440px window
  and drew a 620px orbit with full size chips inside the column. Every size
  below is a fraction of the measured box (the original's vw values divided by
  its 92vw width), so a phone and the desktop column draw the same picture.

  Positions are pixels from the measured width, never percentages: on iOS Safari
  percentage offsets inside an aspect-ratio box did not resolve and the chips
  fell off their rings. The outer ring leaves room for half a wordmark pill, so
  nothing ever crosses the edge of the box at any angle.
*/

const GOLD_RING = "rgba(212,168,83,.22)";
const CHIP_BG = "#141416";
const CHIP_BORDER = "rgba(250,248,245,.10)";

type Mark = { name: string; src?: string; wide?: boolean; label?: string };

// The same files as successupgrade.ai's brand ribbon. Two brands have no logo
// file, so they are set as wordmarks rather than left off the ring.
const BRANDS: Mark[] = [
  { name: "Success Upgrade", src: "/logos/success-upgrade.png", wide: true },
  { name: "AI Army", src: "/logos/ai-army.png", wide: true },
  { name: "Electro Hydration", src: "/logos/electro-hydration.png" },
  { name: "Verza TV", src: "/logos/verza-tv.png", wide: true },
  { name: "MediaMD", src: "/logos/mediamd.png" },
  { name: "The Boat Goat", src: "/logos/the-boat-goat.png" },
  { name: "CodeVibe", src: "/logos/code-vibe.svg" },
  { name: "Website Wave", src: "/logos/website-wave.png" },
  { name: "Big Films Only", wide: true },
  { name: "JothamHall.com", label: "Jotham Hall", wide: true },
];

const PLATFORMS: Mark[] = [
  "instagram|Instagram", "youtube|YouTube", "linkedin|LinkedIn", "tiktok|TikTok",
  "facebook|Facebook", "threads|Threads", "x|X", "pinterest|Pinterest",
  "discord|Discord", "telegram|Telegram", "reddit|Reddit", "whatsapp|WhatsApp",
  "googlebusiness|Google Business",
].map((entry) => {
  const [file, name] = entry.split("|");
  return { name, src: `/logos/platforms/${file}.svg` };
});

const ALL_MARKS: Mark[] = [...BRANDS, ...PLATFORMS];

/*
  Wide wordmark pills go on the outer ring, where the circumference has room
  for them; squares and the first platforms ride inside. Three rings, because a
  fourth has no radial gap left once the core sits in the middle.
*/
const SQUARE_BRANDS = BRANDS.filter((b) => !b.wide);
const WIDE_BRANDS = BRANDS.filter((b) => b.wide);

const RINGS = [
  { size: 44, seconds: 74, reverse: false, offsetDeg: 0, items: [...SQUARE_BRANDS, ...PLATFORMS.slice(0, 3)] },
  { size: 70, seconds: 98, reverse: true, offsetDeg: 18, items: PLATFORMS.slice(3, 13) },
  { size: 90, seconds: 128, reverse: false, offsetDeg: 26, items: WIDE_BRANDS },
] as const;

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

function Chip({ mark, glyph, pill, font }: { mark: Mark; glyph: number; pill: number; font: number }) {
  const { name, src, wide, label } = mark;
  return (
    <span
      title={name}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: wide ? pill : glyph,
        height: glyph,
        borderRadius: 13,
        background: CHIP_BG,
        border: `1px solid ${CHIP_BORDER}`,
        boxShadow: "0 2px 10px rgba(0,0,0,.45)",
        padding: wide ? "0 5px" : 0,
      }}
    >
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name}
          // minWidth 0 plus object-fit: a flex item's min-width is its image's
          // intrinsic width, and Verza's file is 450px wide.
          style={{
            minWidth: 0,
            width: wide ? "100%" : "54%",
            height: wide ? "64%" : "54%",
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (
        <span
          style={{
            minWidth: 0,
            maxWidth: "100%",
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            fontFamily: "var(--font-cinzel), 'Cinzel', serif",
            fontSize: font,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.15,
            color: "rgba(250,248,245,.82)",
          }}
        >
          {/* A zero width space at the camel case joint offers the break a reader would choose. */}
          {(label ?? name).replace(/([a-z])([A-Z])/g, "$1​$2")}
        </span>
      )}
    </span>
  );
}

export default function PlatformOrbit() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setSize(el.getBoundingClientRect().width);
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const glyph = clamp(28, size * 0.1033, 44);
  const pill = clamp(52, size * 0.152, 78);
  const core = clamp(64, size * 0.239, 88);
  const font = clamp(7, size * 0.0239, 9);
  const usable = Math.max(0, size / 2 - pill / 2 - 2);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={`One brain running every brand and publishing to every platform: ${ALL_MARKS.map((m) => m.name).join(", ")}`}
      style={{ position: "relative", width: "100%", maxWidth: 400, aspectRatio: "1 / 1", margin: "0 auto" }}
    >
      {size > 0 &&
        RINGS.map((r, i) => {
          const d = usable * 2 * (r.size / 100);
          return (
            <div
              key={`track-${i}`}
              aria-hidden
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: d,
                height: d,
                marginLeft: -d / 2,
                marginTop: -d / 2,
                border: `1px dashed ${GOLD_RING}`,
                borderRadius: "50%",
              }}
            />
          );
        })}

      {size > 0 &&
        RINGS.map((r, i) => {
          const d = usable * 2 * (r.size / 100);
          return (
            <div
              key={`ring-${i}`}
              aria-hidden
              className={r.reverse ? "jh-orbit-ring-rev" : "jh-orbit-ring"}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: d,
                height: d,
                marginLeft: -d / 2,
                marginTop: -d / 2,
                ["--dur" as string]: `${r.seconds}s`,
              }}
            >
              {r.items.map((mark, j) => {
                // Evenly spaced, offset per ring so the chips never line up in spokes; -90 starts at the top.
                const angle = ((j * 360) / r.items.length + r.offsetDeg - 90) * (Math.PI / 180);
                const x = d / 2 + (d / 2) * Math.cos(angle);
                const y = d / 2 + (d / 2) * Math.sin(angle);
                return (
                  <span key={mark.name} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
                    <span
                      className={r.reverse ? "jh-orbit-chip-rev" : "jh-orbit-chip"}
                      style={{ display: "block", ["--dur" as string]: `${r.seconds}s` }}
                    >
                      <Chip mark={mark} glyph={glyph} pill={pill} font={font} />
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}

      {/* The core is successupgrade.ai's hero image, so the brain at the centre is recognisably the same one. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: core,
          height: core,
          borderRadius: "50%",
          overflow: "hidden",
          background: "#0D0D0D",
          border: "1px solid rgba(212,168,83,.45)",
          boxShadow: "0 0 42px rgba(212,168,83,.22)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/army-core.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/*
        Rotation only: the rings are centred by negative margins, so an animation
        that also translated would move every ring off the shared centre. Chips
        counter rotate at the same rate so their logos stay upright.
      */}
      <style>{`
        @keyframes jh-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes jh-orbit-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .jh-orbit-ring { animation: jh-orbit-spin var(--dur) linear infinite; }
        .jh-orbit-ring-rev { animation: jh-orbit-spin-rev var(--dur) linear infinite; }
        .jh-orbit-chip { animation: jh-orbit-spin-rev var(--dur) linear infinite; }
        .jh-orbit-chip-rev { animation: jh-orbit-spin var(--dur) linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .jh-orbit-ring, .jh-orbit-ring-rev, .jh-orbit-chip, .jh-orbit-chip-rev { animation: none; }
        }
      `}</style>
    </div>
  );
}
