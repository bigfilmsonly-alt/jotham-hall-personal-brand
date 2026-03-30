"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Film } from "lucide-react";

const featuredCredits = [
  {
    show: "Finding Mr. Christmas",
    network: "Hallmark Channel",
    role: "Talent Producer",
    years: "2023\u20132025",
    seasons: "Seasons 1 & 2",
    description:
      "Competition series where aspiring actors compete for a leading role in a Hallmark Christmas movie.",
  },
  {
    show: "Ciao House",
    network: "Food Network",
    role: "Talent Producer",
    years: "2023\u20132024",
    seasons: "Seasons 1 & 2",
    location: "Italy",
    description:
      "Culinary competition series hosted by Alex Guarnaschelli, filmed on location in Italy.",
  },
  {
    show: "Temptation Island",
    network: "USA Network",
    role: "Talent Producer",
    years: "2019\u20132023",
    description:
      "Reality dating series testing committed couples. One of the longest-running dating formats in television.",
  },
  {
    show: "Snake in the Grass",
    network: "NBC",
    role: "Talent Producer",
    years: "2022",
    description:
      "Outdoor competition series where contestants identify the saboteur among them.",
  },
  {
    show: "After Happily Ever After",
    network: "BET",
    role: "Talent Producer",
    years: "2015",
    description:
      "Relationship reality series following couples navigating marriage challenges.",
  },
];

const fiftyMindsCredits = [
  { show: "Flavor of Love", network: "VH1", role: "Talent Producer" },
  { show: "Rock of Love", network: "VH1", role: "Talent Producer" },
  { show: "I Love Money", network: "VH1", role: "Talent Producer" },
  { show: "For the Love of Ray J", network: "VH1", role: "Talent Producer" },
  { show: "Real Chance of Love", network: "VH1", role: "Talent Producer" },
  { show: "From G\u2019s to Gents", network: "MTV", role: "Talent Producer" },
];

const summaryData = [
  { label: "Years Active", value: "2008 \u2013 Present" },
  { label: "Total Shows", value: "50+" },
  { label: "Networks", value: "VH1, MTV, Hallmark, Food Network, NBC, BET, USA Network" },
  { label: "Primary Role", value: "Talent Producer" },
  { label: "Production Companies", value: "51 Minds Entertainment, Big Films Only" },
];

export function TvCreditsContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [eraVisible, setEraVisible] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);
  const eraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFeaturedVisible(true);
      },
      { threshold: 0.1 }
    );
    if (featuredRef.current) observer.observe(featuredRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEraVisible(true);
      },
      { threshold: 0.1 }
    );
    if (eraRef.current) observer.observe(eraRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span
              className={`inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Television Production
            </span>
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6 transition-all duration-700 delay-75 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Television Credits
            </h1>
            <p
              className={`text-xl sm:text-2xl lg:text-3xl font-display text-muted-foreground tracking-tight mb-8 transition-all duration-700 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              15+ years. 50+ shows. VH1, MTV, Hallmark, Food Network, NBC, BET,
              USA Network.
            </p>
            <p
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Before I built AI systems, I built television. As a Talent
              Producer at 51 Minds Entertainment and founder of Big Films Only,
              I&apos;ve worked on some of the most iconic reality TV franchises
              of the past two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Credits */}
      <section
        ref={featuredRef}
        className="py-20 lg:py-32 border-b border-foreground/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <Tv className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
              Featured Credits
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCredits.map((credit, index) => (
              <div
                key={credit.show}
                className={`p-8 border border-foreground/10 hover:border-foreground/20 transition-all duration-700 ${
                  featuredVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  {credit.network}
                </div>
                <h3 className="text-2xl font-display mb-2">{credit.show}</h3>
                <p className="text-muted-foreground mb-1">{credit.years}</p>
                {credit.seasons && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {credit.seasons}
                  </p>
                )}
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  {credit.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 border border-foreground/20">
                    {credit.role}
                  </span>
                  {credit.location && (
                    <span className="text-xs px-3 py-1 border border-foreground/20 text-muted-foreground">
                      {credit.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 51 Minds Entertainment Era */}
      <section
        ref={eraRef}
        className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground/[0.02]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <Film className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
              51 Minds Entertainment Era (2008&ndash;2014)
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            During my six years at 51 Minds Entertainment, I worked on the
            production team for over 50 reality television shows, rising from
            production assistant to Talent Producer.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fiftyMindsCredits.map((credit, index) => (
              <div
                key={credit.show}
                className={`p-6 border border-foreground/10 hover:border-foreground/20 transition-all duration-700 ${
                  eraVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-sm font-mono text-muted-foreground mb-2">
                  {credit.network}
                </div>
                <h3 className="text-xl font-display mb-2">{credit.show}</h3>
                <span className="text-xs px-3 py-1 border border-foreground/20">
                  {credit.role}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 text-center">
            Plus over 45 additional productions during this period
          </p>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">
            Career Summary
          </h2>
          <div className="max-w-3xl border border-foreground/10">
            {summaryData.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 px-6 py-5 ${
                  index < summaryData.length - 1
                    ? "border-b border-foreground/10"
                    : ""
                }`}
              >
                <span className="text-sm font-mono text-muted-foreground sm:w-48 shrink-0">
                  {row.label}
                </span>
                <span className="text-lg">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Does a Talent Producer Do? */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-6">
                What Does a Talent Producer Do?
              </h2>
            </div>
            <div>
              <p className="text-lg text-background/70 leading-relaxed">
                A Talent Producer is the critical link between production and
                on-screen talent. Responsibilities include casting coordination,
                talent management, on-set dynamics, story development, and
                logistics. In reality television, the Talent Producer often
                determines whether a show succeeds or fails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From TV to Technology */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-6">
                From TV to Technology
              </h2>
            </div>
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The skills developed as a Talent Producer translate directly to
                building businesses: systems thinking, high-pressure execution,
                people management, process design, and problem-solving under
                constraints. These are the same skills I now apply to AI
                automation at SuccessUpgrade.ai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Ready to work with a producer who builds systems?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/5 px-8 h-16 text-lg rounded-none"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
