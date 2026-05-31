"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-background via-foreground/5 to-background border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-2.5 text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full shrink-0" />
              <span className="text-muted-foreground truncate">
                <strong className="text-foreground">Free:</strong>
                <span className="hidden sm:inline"> The Founder&apos;s System Audit ($500 value)</span>
                <span className="sm:hidden"> System Audit ($500 value)</span>
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <button
                onClick={() => {
                  setIsVisible(false);
                  const el = document.getElementById("lead-magnet");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 sm:px-4 py-1.5 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap"
              >
                Download Free
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
