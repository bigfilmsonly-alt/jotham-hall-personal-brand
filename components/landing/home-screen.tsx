"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { AnimatedSphere } from "./animated-sphere";

const networks = ["Hallmark", "Food Network", "VH1", "MTV", "NBC", "USA Network", "BET"];

export function HomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden" style={{ paddingBottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}>
      {/* SEO hidden content */}
      <div itemScope itemType="https://schema.org/Person" className="sr-only">
        <meta itemProp="name" content="Jotham Hall" />
        <meta itemProp="jobTitle" content="AI Systems Architect, Television Producer, Founder" />
        <meta itemProp="description" content="Jotham Hall is an entrepreneur, television producer, and technology founder. 50+ TV credits. 500+ founders scaled." />
        <link itemProp="url" href="https://jothamhall.com" />
      </div>
      <h1 className="sr-only">Jotham Hall - AI Systems Architect, Television Producer, Founder of SuccessUpgrade.ai</h1>

      {/* Background sphere */}
      <div className="absolute right-[-20%] bottom-[-20%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-20 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Profile photo */}
        <div className={`mb-5 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.successupgrade.ai/images/profile.jpeg"
            alt="Jotham Hall"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-foreground/10 shadow-2xl mx-auto"
          />
        </div>

        {/* Name */}
        <h2 className={`font-display text-3xl sm:text-4xl tracking-tight mb-2 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Jotham Hall
        </h2>

        {/* Authority line */}
        <p className={`text-[11px] sm:text-xs font-mono text-muted-foreground/60 mb-5 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          50 TV shows. 500 founders. I build what works.
        </p>

        {/* One-liner */}
        <p className={`text-sm sm:text-base text-foreground/80 max-w-xs mb-8 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          I build AI systems that scale businesses without scaling stress.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-3 w-full max-w-sm transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={() => setIsContactOpen(true)}
            className="flex-1 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Book Your Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="tel:+15106809100"
            className="flex-1 py-3.5 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Call (510) 680-9100
          </a>
        </div>

        {/* Scarcity */}
        <p className={`text-[10px] font-mono text-muted-foreground/40 mt-4 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Only 3 partnership spots per quarter
        </p>
      </div>

      {/* Network logos at bottom */}
      <div className={`relative z-10 px-6 pb-3 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-widest text-center mb-2">As Seen On</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {networks.map((network) => (
            <span key={network} className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-wider">
              {network}
            </span>
          ))}
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
