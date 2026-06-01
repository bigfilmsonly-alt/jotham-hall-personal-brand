"use client";

import { useState, useEffect, useRef } from "react";
import { FooterSection } from "@/components/landing/footer-section";
import { CalendlyModal } from "@/components/calendly-modal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const tvCredits = [
  "Flavor of Love (VH1)",
  "Rock of Love (VH1)",
  "I Love Money (VH1)",
  "For the Love of Ray J (VH1)",
  "Real Chance of Love (VH1)",
  "From G's to Gents (MTV)",
  "Temptation Island (USA Network)",
  "After Happily Ever After (BET)",
];

const recentCredits = [
  "Finding Mr. Christmas, Seasons 1 & 2 (Hallmark Channel)",
  "Ciao House, Seasons 1 & 2 (Food Network, filmed in Italy)",
  "Snake in the Grass (NBC)",
];

const timeline = [
  { year: "1984", event: "Born in Oakland, California" },
  { year: "2008", event: "Moved to Los Angeles, joined 51 Minds Entertainment" },
  { year: "2008 - 2014", event: "Talent Producer on 50+ reality TV shows (VH1, MTV, BET)" },
  { year: "2015", event: "Founded Big Films Only" },
  { year: "2015 - Present", event: "Talent Producer on Hallmark, Food Network, NBC productions" },
  { year: "2023", event: "Founded SuccessUpgrade.ai" },
  { year: "2024", event: "Pioneered VibeCoding methodology" },
  { year: "2025", event: "Consulting for 7-figure founders, relocated to Miami" },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <section ref={sectionRef} className="relative pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">About</p>

            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Jotham Hall
            </h1>

            <p className={`text-sm sm:text-base text-[#D4A853] tracking-[0.1em] uppercase mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              AI Systems Architect · App Developer · Strategist
            </p>

            <div className={`space-y-5 text-[#B8B0A8] text-[15px] leading-[1.8] max-w-2xl transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
              <p>
                <strong className="text-[#FAF8F5]">Jotham Hall</strong> is an AI systems architect, app developer, entrepreneur, and strategist with more than 20 years of experience across television, film, music, business development, and corporate operations. Drawing from a family legacy of engineering and innovation, he specializes in designing AI-powered systems that automate growth, streamline operations, and help organizations scale sustainably.
              </p>
              <p className="text-[#D4A853] text-lg font-display tracking-wide">
                His mission is simple: build intelligent systems that increase performance while reducing stress.
              </p>
            </div>

            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="mt-8 px-6 py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
            >
              Work With Me
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Core Bio */}
      <section className="py-16 lg:py-24 border-t border-[#3D3A35]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">The Work</p>
            <h2 className="text-2xl lg:text-3xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-8">
              Building Systems That Scale
            </h2>

            <div className="space-y-5 text-[#B8B0A8] text-[15px] leading-[1.8]">
              <p>
                With over two decades of experience spanning television, film, music production, entrepreneurship, corporate strategy, and business operations, Jotham has developed a reputation for designing systems that turn complexity into clarity. His work sits at the intersection of engineering, automation, and practical business execution, creating intelligent workflows that allow organizations to grow efficiently without increasing operational burden.
              </p>
              <p>
                Coming from a family legacy of engineers and innovators, Jotham inherited a deep appreciation for systems thinking from his grandfather, a <strong className="text-[#FAF8F5]">submarine engineer</strong> whose work demanded precision, reliability, and problem-solving at the highest level. That same mindset drives Jotham's approach today: architecting AI-powered solutions that are not only innovative, but dependable, scalable, and built to perform under real-world conditions.
              </p>
              <p>
                As an early adopter and practitioner of artificial intelligence, he has helped businesses leverage automation, data, and emerging technologies to streamline operations, increase profitability, and reclaim valuable time.
              </p>
            </div>

            <div className="mt-10 p-6 border border-[#3D3A35] bg-[#1A1A1A]">
              <p className="text-[#D4A853] text-lg font-display tracking-wide leading-relaxed">
                Build systems once. Let them work forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Statement */}
      <section className="py-16 lg:py-24 border-t border-[#3D3A35]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">In My Own Words</p>
            <h2 className="text-2xl lg:text-3xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-8">
              Founder Statement
            </h2>

            <div className="space-y-5 text-[#B8B0A8] text-[15px] leading-[1.8]">
              <p className="text-[#FAF8F5] text-lg">
                Hi. My name is Jotham Hall. I build AI systems that scale businesses and build legacy.
              </p>
              <p>
                For more than 20 years, I have been obsessed with one thing: creating systems that work.
              </p>
              <p>
                From television and film sets to music production, startups, corporate environments, and emerging technology, I have spent my career learning how great organizations operate and how to make them operate better.
              </p>
              <p>
                Long before AI became mainstream, I was studying automation, workflows, and the mechanics behind scalable success. Today, I combine that experience with cutting edge AI tools to help businesses eliminate bottlenecks, automate repetitive work, and create systems that generate results around the clock.
              </p>
              <p>
                Engineering is in my blood. My grandfather was a submarine engineer, and I grew up understanding that every great outcome begins with a well-designed system. That legacy shaped the way I think: solve the root problem, build with precision, and create solutions that endure.
              </p>
              <p>
                Whether I am designing an AI-powered sales engine, an automated content ecosystem, or an intelligent operational framework, my goal remains the same:
              </p>
            </div>

            <div className="mt-8 p-6 border border-[#D4A853]/20 bg-[#1A1A1A]">
              <p className="text-[#D4A853] text-lg font-display tracking-wide leading-relaxed">
                Turn complexity into systems. Turn systems into freedom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TV Credits */}
      <section className="py-16 lg:py-24 border-t border-[#3D3A35]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">Production</p>
            <h2 className="text-2xl lg:text-3xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-8">
              50+ Television Credits
            </h2>

            <div className="mb-8">
              <p className="text-xs text-[#5C5750] uppercase tracking-[0.1em] mb-4">Recent</p>
              <div className="space-y-2">
                {recentCredits.map((credit) => (
                  <div key={credit} className="flex items-start gap-3 py-2 border-b border-[#252320]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] mt-2 shrink-0" />
                    <span className="text-[#FAF8F5] text-sm">{credit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-[#5C5750] uppercase tracking-[0.1em] mb-4">51 Minds Entertainment Era</p>
              <div className="space-y-2">
                {tvCredits.map((credit) => (
                  <div key={credit} className="flex items-start gap-3 py-2 border-b border-[#252320]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D3A35] mt-2 shrink-0" />
                    <span className="text-[#B8B0A8] text-sm">{credit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 border-t border-[#3D3A35] bg-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">Journey</p>
            <h2 className="text-2xl lg:text-3xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-8">
              The Path
            </h2>

            <div className="space-y-0">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-6 py-4 border-b border-[#252320]">
                  <span className="text-sm font-display text-[#D4A853] w-28 shrink-0 tracking-wide">{item.year}</span>
                  <span className="text-sm text-[#B8B0A8]">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 border-t border-[#3D3A35]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Limited Availability</p>
          <h2 className="text-2xl lg:text-3xl font-display tracking-[0.08em] uppercase text-[#FAF8F5] mb-3">Ready to work together?</h2>
          <p className="text-sm text-[#5C5750] mb-6 max-w-md mx-auto">Book a free strategy call. No pitch. No pressure. Just clarity.</p>
          <button
            onClick={() => setIsCalendlyOpen(true)}
            className="px-8 py-4 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
          >
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <div className="h-[4.5rem]" />
      <FooterSection />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </main>
  );
}
