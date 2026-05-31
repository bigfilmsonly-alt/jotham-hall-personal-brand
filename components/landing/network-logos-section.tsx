"use client";

import { useEffect, useRef, useState } from "react";

const networks = [
  "Hallmark",
  "Food Network",
  "VH1",
  "MTV",
  "NBC",
  "USA Network",
  "BET",
];

export function NetworkLogosSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 lg:py-16 border-y border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className={`text-center text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          15+ Years Producing For
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {networks.map((network, i) => (
            <span
              key={network}
              className={`font-display text-lg sm:text-xl md:text-2xl text-foreground/30 hover:text-foreground transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {network}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
