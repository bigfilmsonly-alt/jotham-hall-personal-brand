"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";
import { ContactModal } from "./contact-modal";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactOpen, setIsContactOpen] = useState(false);

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

  const updatePosition = (clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    setMousePosition({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY, e.currentTarget);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-6 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-7xl font-display tracking-tight mb-6 lg:mb-8 leading-[0.95]">
                  Ready to stop
                  <br />
                  being the bottleneck?
                </h2>

                <p className="text-base lg:text-xl text-muted-foreground mb-8 lg:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Build systems that scale without chaos. Book a strategy call.
                </p>

                <Button 
                  size="lg"
                  onClick={() => setIsContactOpen(true)}
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 lg:px-12 h-12 lg:h-16 text-base lg:text-lg rounded-none group w-full sm:w-auto"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-xs text-muted-foreground mt-8 font-mono tracking-wider uppercase text-center lg:text-left">
                  Response within 24 hours
                </p>
              </div>

              {/* Right animation */}
              <div className="flex items-center justify-center w-[250px] h-[250px] mx-auto sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] lg:-mr-16">
                <AnimatedTetrahedron />
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
