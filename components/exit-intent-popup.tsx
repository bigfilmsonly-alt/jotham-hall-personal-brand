"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Mobile: Back button or scroll up detection
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls up quickly from below fold, show popup
      if (currentScrollY < lastScrollY - 200 && currentScrollY < 100 && !hasShown && lastScrollY > 500) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
      lastScrollY = currentScrollY;
    };

    // Delay adding listeners to avoid immediate trigger
    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll);
    }, 5000); // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-background border border-foreground/10 max-w-lg w-full p-8 lg:p-12 pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 border border-foreground/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-foreground/70" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-4">
              Before you go...
            </h2>

            {/* Subhead */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Get the free playbook I used to build multiple 7-figure systems. 
              No fluff. Just the frameworks that actually work.
            </p>

            {/* Lead Magnet Title */}
            <div className="border border-foreground/10 p-4 mb-8 bg-foreground/[0.02]">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                Free Download
              </span>
              <h3 className="font-display text-lg">
                The 7-Figure Systems Playbook
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI automation, revenue systems, and scaling strategies
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setIsContactOpen(true);
                }}
                className="w-full bg-foreground hover:bg-foreground/90 text-background h-14 text-base rounded-none group"
              >
                Get the Free Playbook
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                No thanks, I will figure it out myself
              </button>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-muted-foreground mt-6 font-mono">
              Join 500+ founders who downloaded this playbook
            </p>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
