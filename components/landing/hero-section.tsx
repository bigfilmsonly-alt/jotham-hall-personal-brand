"use client";
// Cache bust: v3
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";
import { ContactModal } from "./contact-modal";

const words = ["scale", "automate", "execute", "dominate"];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden" itemScope itemType="https://schema.org/Person">
      {/* Hidden SEO content for search engines */}
      <meta itemProp="name" content="Jotham Hall" />
      <meta itemProp="jobTitle" content="Entrepreneur, Television Producer, Founder of SuccessUpgrade.ai" />
      <meta itemProp="description" content="Jotham Hall is an entrepreneur, television producer, and technology founder known for his work in reality television production, creative media, and artificial intelligence systems for business automation." />
      <link itemProp="url" href="https://jothamhall.com" />
      {/* Animated sphere background — positioned below CTAs */}
      <div className="absolute right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 top-[55%] sm:top-[40%] lg:top-[15%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] lg:w-[900px] lg:h-[900px] opacity-25 sm:opacity-35 lg:opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-48 lg:py-40 text-center lg:text-left">
        {/* Hidden H1 for SEO - Primary keyword */}
        <h1 className="sr-only">Jotham Hall - Entrepreneur, Television Producer, Founder of SuccessUpgrade.ai</h1>
        
        {/* Eyebrow */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center justify-center lg:justify-start text-sm font-mono text-muted-foreground">
            I turn founders into brands that print revenue on autopilot
          </span>
        </div>
        
        {/* Main headline */}
        <div className="mb-12">
          <h2 
            className={`text-[clamp(3rem,12vw,10rem)] font-display leading-[0.9] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            aria-label="Jotham Hall helps founders build systems, not schedules"
          >
            <span className="block">Build systems.</span>
            <span className="block">
              Not schedules.{" "}
              <span className="relative inline-block">
                <span 
                  key={wordIndex}
                  className="inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
              </span>
            </span>
          </h2>
        </div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p 
            className={`text-base sm:text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="block sm:hidden">Entrepreneur, TV producer, and founder of SuccessUpgrade.ai. Combining media, AI, and entrepreneurship to create impact.</span>
            <span className="hidden sm:block">Jotham Hall is an entrepreneur, television producer, and technology innovator. Founder of SuccessUpgrade.ai and Big Films Only. TV credits include Finding Mr. Christmas, Ciao House, Temptation Island, and more. Combining media, AI, and entrepreneurship to create social impact.</span>
          </p>
          
          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="lg" 
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
              onClick={() => setIsContactOpen(true)}
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
              asChild
            >
              <a href="#features">See My Work</a>
            </Button>
          </div>
        </div>
        
      </div>
      
      {/* Stats marquee - positioned lower for visibility */}
      <div 
        className={`absolute bottom-4 md:bottom-6 left-0 right-0 transition-all duration-700 delay-500 overflow-hidden ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-8 sm:gap-12 md:gap-16 marquee whitespace-nowrap px-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 sm:gap-12 md:gap-16">
              {[
                { value: "7-Fig", label: "revenue systems", company: "SUCCESS UPGRADE" },
                { value: "40%", label: "overhead cut", company: "BIG FILMS ONLY" },
                { value: "10x", label: "lead increase", company: "SAAS CLIENTS" },
                { value: "Zero", label: "code needed", company: "SAY IT BUILD IT" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-2 sm:gap-3 md:gap-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-[8px] sm:text-[10px] md:text-xs mt-0.5 sm:mt-1">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
