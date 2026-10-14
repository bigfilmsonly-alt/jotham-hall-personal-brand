"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { CalendlyModal } from "./calendly-modal";
import { isFullBleed } from "@/lib/full-bleed";

/*
  A compact "Book a Call" that rides just above the tab bar (h-20 plus the safe
  area, z 999) on every page except home and the full bleed venture sites.

  It stays clear of what the visitor came to read. It waits until the first
  screen has scrolled away (every hero carries its own booking button), and it
  steps aside again once the page's closing block (the element right before
  the footer) or the footer reaches the screen, so it never sits on the final
  call to action, the footer's contact rows or the build credit.

  The fixed element is a full width rail that clicks pass through, and the
  button sits at its right end. globals.css stretches every .fixed element to
  the 430px column from 768px up; the rail takes that, so desktop matches the
  phone instead of growing a 430px wide bar.
*/

// Share of the viewport height to scroll before the button shows.
const SHOW_AFTER = 0.6;

// The nearest element at or before `el` that takes up space on the page.
function lastVisible(el: Element | null) {
  while (el && el.getBoundingClientRect().height === 0) el = el.previousElementSibling;
  return el;
}

// Top of the page's closing block: the last visible element before the
// footer. A wrapper taller than a screen (a <main> holding the whole page) is
// opened up to its own last visible child, until a block fits on one screen.
// With no footer on the page, there is nothing to step aside for.
function closingTop(viewportHeight: number) {
  const footer = document.querySelector("[data-site-footer]");
  if (!footer) return Infinity;
  let block = lastVisible(footer.previousElementSibling);
  while (block && block.getBoundingClientRect().height >= viewportHeight) {
    block = lastVisible(block.lastElementChild);
  }
  return (block ?? footer).getBoundingClientRect().top;
}

// Sections with their own actions or a form (the Brain and Path on Services)
// carry data-hide-floating-cta; the button stays out of their way on screen.
function overOwnActions(viewportHeight: number) {
  return Array.from(document.querySelectorAll("[data-hide-floating-cta]")).some((el) => {
    const r = el.getBoundingClientRect();
    return r.top < viewportHeight && r.bottom > 0;
  });
}

export function FloatingCTA() {
  const pathname = usePathname();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // Only on sub-pages, not the homepage, and not over a venture's own site,
  // whose strip already carries a booking link.
  const standDown = pathname === "/" || isFullBleed(pathname);

  useEffect(() => {
    if (standDown) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      setVisible(
        window.scrollY > viewportHeight * SHOW_AFTER &&
          closingTop(viewportHeight) > viewportHeight &&
          !overOwnActions(viewportHeight)
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [standDown, pathname]);

  if (standDown) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 z-[997] flex justify-end px-4"
        style={{ bottom: "calc(5.75rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <button
          type="button"
          data-floating-cta
          onClick={() => setIsCalendlyOpen(true)}
          className={`pointer-events-auto inline-flex h-11 items-center gap-2 bg-[#D4A853] px-5 text-[13px] font-medium tracking-wide text-[#0D0D0D] shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-[#E8C97A] active:scale-[0.97] motion-reduce:transition-none ${
            visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
          }`}
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
          Book a Call
        </button>
      </div>
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
