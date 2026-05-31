"use client";

import { useEffect, useRef, useState } from "react";

export function VideoSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 lg:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">The Story</span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display tracking-tight">
              15 Years of TV.
              <br />
              <span className="text-muted-foreground">Now I Build Systems.</span>
            </h2>
          </div>

          <div className={`aspect-video bg-foreground/5 rounded-xl overflow-hidden border border-foreground/10 flex items-center justify-center relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.successupgrade.ai/images/profile.jpeg"
              alt="Jotham Hall"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-foreground/10 flex items-center justify-center mb-4 backdrop-blur-sm cursor-pointer hover:bg-foreground/20 transition-all duration-300 border border-foreground/10">
                <svg className="w-8 h-8 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-foreground font-display text-lg">Watch the Founder Story</p>
              <p className="text-sm text-muted-foreground mt-1 font-mono">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
