"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export function LeadMagnetSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    const { error } = await supabase
      .from("email_captures")
      .insert({ email, source: "lead_magnet" });

    if (error) {
      if (error.code === "23505") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("success");
    }
    setEmail("");
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            Free Download
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display tracking-tight mb-4">
            The Founder&apos;s System Audit Checklist
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            The same 10-point framework I use to find hidden revenue, eliminate bottlenecks,
            and identify automation opportunities. Yours free.
          </p>

          {status === "success" ? (
            <div className="py-4">
              <p className="text-foreground font-medium">You&apos;re in. Check your inbox.</p>
              <p className="text-xs text-muted-foreground mt-2 font-mono">Welcome to the 500+ club.</p>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 bg-foreground/5 border border-foreground/10 text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors font-sans text-sm"
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3.5 bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors whitespace-nowrap text-sm disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Get the Checklist"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs text-red-400 mt-3 font-mono">Something went wrong. Try again.</p>
          )}

          <p className="text-xs text-muted-foreground/60 mt-4 font-mono">
            Join 500+ founders. No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
