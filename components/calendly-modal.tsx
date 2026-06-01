"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Phone, MessageSquare, Mail, ArrowRight, Check } from "lucide-react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { trackEvent } from "@/lib/tracking";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  const [booked, setBooked] = useState(false);

  useCalendlyEventListener({
    onEventScheduled: () => {
      setBooked(true);
      trackEvent.formSubmit("Calendly Booking");
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "calendly", data: {} }),
      }).catch(() => {});
    },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setBooked(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) trackEvent.schedule("Calendly Modal");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1001] bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#3D3A35]">
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853]">
            {booked ? "You're Booked" : "Book a Call"}
          </p>
          <h3 className="font-display text-base tracking-wide uppercase text-[#FAF8F5]">
            {booked ? "See you soon." : "Pick a time that works"}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-[#5C5750] hover:text-[#FAF8F5] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {booked ? (
        /* Post-booking: confirmation + contact options */
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-full max-w-sm text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[#D4A853] flex items-center justify-center">
              <Check className="w-8 h-8 text-[#D4A853]" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl tracking-[0.1em] uppercase text-[#FAF8F5] mb-3">
              Confirmed.
            </h2>
            <p className="text-sm text-[#B8B0A8] mb-10 leading-relaxed">
              Your strategy call is booked. Check your email for the confirmation. In the meantime, feel free to reach out directly.
            </p>

            <div className="space-y-2 text-left mb-8">
              <a
                href="tel:+15106809100"
                className="flex items-center gap-3 px-5 py-3.5 border border-[#3D3A35] hover:border-[#D4A853]/30 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#D4A853]" />
                <div className="flex-1">
                  <span className="text-sm text-[#FAF8F5] font-medium block">Call me directly</span>
                  <span className="text-xs text-[#5C5750]">(510) 680-9100</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3D3A35]" />
              </a>

              <a
                href="sms:+15106934083"
                className="flex items-center gap-3 px-5 py-3.5 border border-[#3D3A35] hover:border-[#D4A853]/30 transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-[#D4A853]" />
                <div className="flex-1">
                  <span className="text-sm text-[#FAF8F5] font-medium block">Send a text</span>
                  <span className="text-xs text-[#5C5750]">(510) 693-4083</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3D3A35]" />
              </a>

              <a
                href="mailto:bigfilmsonly@gmail.com"
                className="flex items-center gap-3 px-5 py-3.5 border border-[#3D3A35] hover:border-[#D4A853]/30 transition-all active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-[#D4A853]" />
                <div className="flex-1">
                  <span className="text-sm text-[#FAF8F5] font-medium block">Email me</span>
                  <span className="text-xs text-[#5C5750]">bigfilmsonly@gmail.com</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3D3A35]" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        /* Calendly embed */
        <div className="flex-1 overflow-y-auto">
          <InlineWidget
            url="https://calendly.com/bigfilmsonly/30min"
            styles={{ height: "100%", minHeight: "700px" }}
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
      )}
    </div>
  );
}
