"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Phone, MessageSquare, Mail, ArrowRight, Check } from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { trackEvent } from "@/lib/tracking";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
  The modal renders into document.body through a portal. Callers mount it
  inside their own layouts (the home screen's fixed <main>, page sections with
  their own z-index), and each of those is a stacking context that would trap
  z-[1001] underneath the tab bar (z 999). From the body it always sits above
  the tab bar. It covers the whole screen on a phone. From md up it takes the
  contact dialog's desktop style (components/landing/contact-modal.tsx): a
  centered 560px dialog of one height (820px, at most 90% of the window) with
  a hairline border and 8px corners, over a black backdrop that also covers
  the tab bar. Clicking the backdrop closes it until a time is picked in the
  calendar; after that only Close or Escape do, so a stray click never throws
  away a booking in progress.
*/

const directLines = [
  { label: "Call", action: "Call me directly", detail: "(510) 680-9100", href: "tel:+15106809100", icon: Phone },
  { label: "Text", action: "Send a text", detail: "(510) 693-4083", href: "sms:+15106934083", icon: MessageSquare },
  { label: "Email", action: "Email me", detail: "bigfilmsonly@gmail.com", href: "mailto:bigfilmsonly@gmail.com", icon: Mail },
];

/*
  Shown while Calendly's page loads. InlineWidget renders it inside
  .calendly-inline-widget, whose own stylesheet forces 16px type on every
  descendant, so the label's size is set inline.
*/
function CalendarLoading() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-4 pt-24"
    >
      <span className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853] animate-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853] animate-pulse [animation-delay:200ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853] animate-pulse [animation-delay:400ms]" />
      </span>
      <span
        className="tracking-[0.15em] uppercase text-[#8A837B]"
        style={{ fontSize: "11px", lineHeight: "1.4" }}
      >
        Loading the calendar
      </span>
    </div>
  );
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [booked, setBooked] = useState(false);
  // True once a time is picked in the calendar: from then on the desktop
  // backdrop no longer closes the dialog.
  const [timePicked, setTimePicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  // False until Calendly's frame has loaded. Until then the frame stays
  // transparent, so an empty or still loading frame never flashes white.
  const [frameReady, setFrameReady] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  /*
    Every mounted CalendlyModal hears Calendly's window messages, and pages
    mount several (the floating button plus each page's own CTAs). Only the
    open one may act on a booking; otherwise one booking fired /api/notify and
    the conversion event once per mounted modal. The origin check keeps any
    other frame from posting a fake "event scheduled".
  */
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useCalendlyEventListener({
    onDateAndTimeSelected: (e) => {
      if (!isOpenRef.current) return;
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      setTimePicked(true);
    },
    onEventScheduled: (e) => {
      if (!isOpenRef.current) return;
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      setBooked(true);
      trackEvent.formSubmit("Calendly Booking");
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "calendly", data: {} }),
      }).catch(() => {});
    },
  });

  // The portal needs document.body, which exists only after mount.
  useEffect(() => setMounted(true), []);

  // Reveal the frame on its own load event. A layout effect attaches the
  // listener in the same commit that inserts the frame, before load can fire.
  useLayoutEffect(() => {
    if (!isOpen || !mounted || booked) return;
    setFrameReady(false);
    const frame = widgetRef.current?.querySelector("iframe");
    if (!frame) return;
    const reveal = () => setFrameReady(true);
    frame.addEventListener("load", reveal);
    return () => frame.removeEventListener("load", reveal);
  }, [isOpen, mounted, booked]);

  // While open: hold the page still (html scrolls this document, so it is
  // locked along with body), move focus to Close, and give focus back after.
  useEffect(() => {
    if (!isOpen) return;
    setBooked(false);
    setTimePicked(false);
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) trackEvent.schedule("Calendly Modal");
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
    {/* Desktop only: the dimmed page behind the centered dialog. */}
    <div
      aria-hidden="true"
      onClick={timePicked && !booked ? undefined : onClose}
      className="fixed inset-0 z-[1001] hidden bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 motion-reduce:animate-none md:block"
    />
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[1001] flex flex-col bg-[#0D0D0D] text-[#FAF8F5] md:m-auto md:h-[820px] md:max-h-[90vh] md:w-full md:max-w-[560px] md:overflow-hidden md:rounded-xl md:border md:border-[#3D3A35] md:shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:animate-in md:fade-in md:zoom-in-95 md:duration-200 md:motion-reduce:animate-none"
    >
      {/* Header: centered title, Close on the right, balanced by an empty cell on the left */}
      <header
        className="shrink-0 border-b border-[#3D3A35]/60"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3 px-4 py-3">
          <span aria-hidden="true" />
          <div className="min-w-0 text-center">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] md:text-xs">
              {booked ? "You're Booked" : "Book a Strategy Call"}
            </p>
            <h2
              id={titleId}
              className="mt-1 font-display text-[0.95rem] leading-snug tracking-[0.12em] uppercase text-balance"
            >
              {booked ? "See You Soon" : "Pick a Time"}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3D3A35] bg-[#1A1A1A] text-[#FAF8F5] transition-colors hover:border-[#D4A853]/60 hover:text-[#E8C97A] active:scale-[0.94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {booked ? (
        /* After booking: confirmation and the direct lines */
        <div
          className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-6 pt-10 md:pt-4 md:pb-4!"
          style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="my-auto mx-auto w-full max-w-[340px] text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#D4A853]/60">
              <Check className="h-7 w-7 text-[#D4A853]" strokeWidth={1.75} />
            </div>

            <h3 className="mb-3 font-display text-2xl tracking-[0.12em] uppercase text-[#FAF8F5]">
              Confirmed
            </h3>
            <p className="mb-8 text-[15px] leading-relaxed text-[#B8B0A8]">
              Your strategy call is booked. Check your email for the confirmation. Need me before then? Reach me directly.
            </p>

            <div className="mb-8 space-y-2 text-left">
              {directLines.map(({ action, detail, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-4 border border-[#3D3A35] px-5 py-3.5 transition-colors hover:border-[#D4A853]/40 active:scale-[0.98]"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#D4A853]" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-[#FAF8F5]">{action}</span>
                    <span className="block text-[13px] text-[#8A837B]">{detail}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#5C5750]" />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#D4A853] py-3.5 text-sm font-medium tracking-wide text-[#0D0D0D] transition-colors hover:bg-[#E8C97A] active:scale-[0.97]"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Calendly embed */}
          <div
            ref={widgetRef}
            className={`relative flex-1 overflow-y-auto overscroll-contain [&_iframe]:transition-opacity [&_iframe]:duration-300 ${
              frameReady ? "" : "[&_iframe]:opacity-0"
            }`}
          >
            <InlineWidget
              url="https://calendly.com/bigfilmsonly/30min"
              styles={{ height: "100%", minHeight: "700px" }}
              iframeTitle="Book a strategy call with Jotham Hall"
              LoadingSpinner={CalendarLoading}
              pageSettings={{
                backgroundColor: "0d0d0d",
                primaryColor: "D4A853",
                textColor: "FAF8F5",
                hideLandingPageDetails: true,
                hideGdprBanner: true,
                hideEventTypeDetails: false,
              }}
            />
          </div>

          {/* The direct lines, for anyone who would rather talk now. Also the
              way through if the calendar is slow or blocked. */}
          <div
            className="shrink-0 border-t border-[#3D3A35]/60 bg-[#0D0D0D]"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <p className="pt-3 text-center text-[10px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">
              Prefer to talk now?
            </p>
            <div className="grid grid-cols-3">
              {directLines.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex min-h-[48px] items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#B8B0A8] transition-colors hover:text-[#FAF8F5] md:text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-[#D4A853]" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
    </>,
    document.body
  );
}
