"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CalendlyModal } from "@/components/calendly-modal";

/*
  The site's primary action as one self contained button: "Book a Strategy
  Call" in gold, opening the booking calendar on the page. For server
  rendered pages that have no state of their own to hold the modal.
*/
export function BookCallButton({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex w-full items-center justify-center gap-2 bg-[#D4A853] py-3.5 text-sm font-medium tracking-wide text-[#0D0D0D] transition-colors hover:bg-[#E8C97A] pointer-coarse:active:scale-[0.97] ${className}`}
      >
        Book a Strategy Call
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
      <CalendlyModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
