"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { trackEvent } from "@/lib/tracking";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
    <div className="fixed inset-0 z-[1001] bg-background flex flex-col">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-foreground/10">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Book a Call</p>
          <h3 className="font-display text-base tracking-tight">Pick a time that works for you</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Calendly embed */}
      <div className="flex-1 overflow-y-auto">
        <InlineWidget
          url="https://calendly.com/bigfilmsonly/30min"
          styles={{ height: "100%", minHeight: "700px" }}
          pageSettings={{
            backgroundColor: "0a0a0a",
            primaryColor: "ffffff",
            textColor: "ededed",
            hideLandingPageDetails: true,
            hideGdprBanner: true,
            hideEventTypeDetails: false,
          }}
        />
      </div>
    </div>
  );
}
