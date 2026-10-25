"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";

/*
  The one top bar, on every page except Home (one screen with its own booking
  button) and the full screen viewers. It is the same on every tab, so the
  frame never changes as you move around: Jotham Hall at the left, Book a Call
  at the right, and the tab bar at the bottom lighting the section you are in.

  A page inside a section (a venture, a service, TV Credits) passes `back`,
  and the left of the bar becomes the way back to that section instead.

  Book a Call opens the booking calendar here on the page. Pages start their
  content below the bar's 56px (64px from md): pt-28 md:pt-32 on a hero.
*/
export function SiteHeader({ back }: { back?: { href: string; label: string } }) {
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#3D3A35]/60 bg-[#0D0D0D]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-6 md:h-16 md:px-10">
          {back ? (
            <Link
              href={back.href}
              className="-ml-2 inline-flex h-11 items-center gap-2 px-2 text-[13px] tracking-[0.12em] uppercase text-[#B8B0A8] transition-colors hover:text-[#FAF8F5] md:text-sm"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {back.label}
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex h-11 items-center font-display text-sm tracking-[0.12em] uppercase text-[#FAF8F5] transition-colors hover:text-[#E8C97A] md:text-base"
            >
              Jotham Hall
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsBookOpen(true)}
            className="inline-flex h-10 shrink-0 items-center bg-[#D4A853] px-5 text-[13px] font-medium tracking-wide text-[#0D0D0D] transition-colors hover:bg-[#E8C97A] pointer-coarse:active:scale-[0.97] md:h-11 md:px-6 md:text-sm"
          >
            Book a Call
          </button>
        </div>
      </header>
      <CalendlyModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
    </>
  );
}
