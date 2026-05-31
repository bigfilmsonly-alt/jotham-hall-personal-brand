"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY - 200 && currentScrollY < 100 && !hasShown && lastScrollY > 500) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
      lastScrollY = currentScrollY;
    };

    const timeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    await supabase.from("email_captures").upsert(
      { email, source: "exit_intent" },
      { onConflict: "email" }
    );

    setStatus("success");
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1002] animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-0 z-[1002] flex items-center justify-center p-6 pointer-events-none">
        <div
          className="relative bg-background border border-foreground/10 max-w-md w-full p-8 pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {status === "success" ? (
            <div className="text-center py-4">
              <h3 className="font-display text-2xl tracking-tight mb-3">You&apos;re in.</h3>
              <p className="text-muted-foreground text-sm mb-6">Check your inbox for the System Audit.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-mono text-xs tracking-widest text-yellow-500/80 uppercase mb-4">
                Before you go
              </p>
              <h2 className="text-xl sm:text-2xl font-display tracking-tight mb-3">
                Get on the insider list
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Weekly AI strategies, system breakdowns, and founder insights. Join 500+ entrepreneurs already inside.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 max-w-xs mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email"
                  className="w-full px-4 py-3.5 bg-foreground/5 border border-foreground/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Get Free Access"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>

              <div className="flex items-center justify-center gap-4 mt-5 text-[10px] text-muted-foreground/50 font-mono">
                <span>Free forever</span>
                <span>No spam</span>
                <span>Unsubscribe anytime</span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                No thanks, I&apos;ll figure it out alone
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
