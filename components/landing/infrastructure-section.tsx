"use client";

import { useEffect, useState, useRef } from "react";

const ventures = [
  { name: "Big Films Only", category: "Video Production", status: "Active" },
  { name: "Say It Build It", category: "VibeCoding Platform", status: "Active" },
  { name: "SaaS Agency", category: "Automation Systems", status: "Active" },
  { name: "Electro Hydration", category: "Health & Wellness", status: "Active" },
  { name: "Mentorship Program", category: "Education", status: "Active" },
  { name: "Success Upgrade", category: "Ecosystem Hub", status: "Active" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % ventures.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="infrastructure" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              The Success Upgrade Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Multi-vertical
              <br />
              by design.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Success Upgrade is a multi-faceted ecosystem designed to help entrepreneurs, 
              creators, and visionaries build wealth, optimize their lives, and scale through AI and automation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Active Ventures</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">100s</div>
                <div className="text-sm text-muted-foreground">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">7-Fig</div>
                <div className="text-sm text-muted-foreground">Systems Built</div>
              </div>
            </div>
          </div>

          {/* Right: Location list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">Product & Service Pillars</span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  All active
                </span>
              </div>

              {/* Ventures */}
              <div>
                {ventures.map((venture, index) => (
                  <div
                    key={venture.name}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index ? "bg-foreground" : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{venture.name}</div>
                        <div className="text-sm text-muted-foreground">{venture.category}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-green-600">{venture.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
