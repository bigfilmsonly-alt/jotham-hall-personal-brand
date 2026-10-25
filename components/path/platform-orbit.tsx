"use client";

import { useEffect, useRef, useState } from "react";

/*
  The Brain, from successupgrade.ai/path: one brain at the centre, Jo's brands
  on the two rings around it and every platform it publishes to on the outer
  ring, the whole picture turning slowly while every chip stays upright.

  ONE TURN FOR EVERY RING.
  The rings used to turn at their own speeds, two of them in opposite
  directions, so chips on neighbouring rings ran through each other. Now every
  chip rides one rotating layer: the picture turns as a whole and the space
  between any two chips never changes. Because each chip stays upright while
  its position turns, a pair is closest when the line between them runs corner
  to corner. The radii, offsets and sizes below were solved for that moment:
  at least a 4px gap between any two chips and 7px around the core on a 342px
  phone box (3px at the smallest phone, more as the box grows), and every chip
  inside the box at every angle.

  The order tells the story: the five square brand marks closest to the brain,
  the five wordmarks between them, the thirteen platforms on the outside. Five
  marks and five wordmarks alternate around the circle, 36 degrees apart, which
  is what lets those two rings sit close.

  SIZED FROM ITS OWN WIDTH, NOT THE VIEWPORT.
  Every size is a fraction of the measured box, held to the original's caps,
  so a phone and a desktop draw the same picture at their own scale. The box
  is the column's width up to 400px on a phone. From md up it grows to 600px,
  as successupgrade.ai/path draws it on a desktop, but never taller than the
  window less 200px, so on a short laptop screen the whole circle still fits
  between the top bar and the tab bar. The chips keep their capped sizes, so a
  larger box only opens more space between them.

  Positions are pixels from the measured width, never percentages: on iOS
  Safari percentage offsets inside an aspect-ratio box did not resolve and the
  chips fell off their rings. The rotating layer is a point at the centre with
  no size of its own, so turning it never widens the page.
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

// One full turn, every ring together, in seconds.
const TURN_SECONDS = 120;

/*
  Radius as a fraction of the box's width; offset in degrees clockwise from the
  top. `fill` is how much of a square chip its logo takes: the platform glyphs
  fill their own artwork edge to edge, while the brand files carry padding and
  fine detail, so they get more of the chip.
*/
const RINGS = [
  { radius: 0.18, offsetDeg: 0, fill: "68%", items: BRANDS.filter((b) => !b.wide) },
  { radius: 0.277, offsetDeg: 36, fill: "54%", items: BRANDS.filter((b) => b.wide) },
  { radius: 0.446, offsetDeg: 10, fill: "54%", items: PLATFORMS },
] as const;

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

function Chip({ mark, glyph, pill, font, fill }: { mark: Mark; glyph: number; pill: number; font: number; fill: string }) {
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
        padding: wide ? "0 4px" : 0,
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
            width: wide ? "100%" : fill,
            height: wide ? "64%" : fill,
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

  const glyph = clamp(20, size * 0.09, 44);
  const pill = clamp(34, size * 0.153, 78);
  const core = clamp(44, size * 0.19, 88);
  const font = clamp(7, size * 0.0239, 9);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={`One brain running every brand and publishing to every platform: ${ALL_MARKS.map((m) => m.name).join(", ")}`}
      className="max-w-[400px] md:max-w-[clamp(400px,calc(100vh_-_200px),600px)]"
      style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", margin: "0 auto" }}
    >
      {size > 0 &&
        RINGS.map((r, i) => {
          const d = 2 * r.radius * size;
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

      {/* The rotating layer: a point at the centre carrying every chip. */}
      {size > 0 && (
        <div
          aria-hidden
          className="jh-orbit-turn"
          style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0, ["--dur" as string]: `${TURN_SECONDS}s` }}
        >
          {RINGS.flatMap((r) =>
            r.items.map((mark, j) => {
              // Evenly spaced on the ring; -90 starts at the top.
              const angle = ((j * 360) / r.items.length + r.offsetDeg - 90) * (Math.PI / 180);
              const x = r.radius * size * Math.cos(angle);
              const y = r.radius * size * Math.sin(angle);
              return (
                <span key={mark.name} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
                  <span className="jh-orbit-upright" style={{ display: "block", ["--dur" as string]: `${TURN_SECONDS}s` }}>
                    <Chip mark={mark} glyph={glyph} pill={pill} font={font} fill={r.fill} />
                  </span>
                </span>
              );
            })
          )}
        </div>
      )}

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
        Rotation only, about the layer's own point. Each chip turns back at the
        same rate, so its logo stays upright wherever the layer has carried it.
      */}
      <style>{`
        @keyframes jh-orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes jh-orbit-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .jh-orbit-turn { animation: jh-orbit-spin var(--dur) linear infinite; }
        .jh-orbit-upright { animation: jh-orbit-spin-rev var(--dur) linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .jh-orbit-turn, .jh-orbit-upright { animation: none; }
        }
      `}</style>
    </div>
  );
}
