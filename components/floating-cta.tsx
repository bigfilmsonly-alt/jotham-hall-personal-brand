"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CalendlyModal } from "./calendly-modal";

export function FloatingCTA() {
  const pathname = usePathname();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  // Only show on sub-pages, not homepage
  if (pathname === "/") return null;

  return (
    <>
      <button
        onClick={() => setIsCalendlyOpen(true)}
        className="fixed bottom-20 right-4 z-[997] bg-foreground text-background px-4 py-2.5 text-xs font-medium shadow-2xl hover:bg-foreground/90 transition-all active:scale-95 flex items-center gap-1.5"
      >
        <span className="animate-pulse w-1.5 h-1.5 bg-green-400 rounded-full" />
        Book Free Call
      </button>
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
