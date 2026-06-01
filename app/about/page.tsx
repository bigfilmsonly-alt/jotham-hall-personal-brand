"use client";

import { useState, useEffect, useRef } from "react";
import { FooterSection } from "@/components/landing/footer-section";
import { CalendlyModal } from "@/components/calendly-modal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


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
