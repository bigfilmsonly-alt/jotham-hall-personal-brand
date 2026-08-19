"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Film, ChevronDown } from "lucide-react";

const networks = [
  "VH1",
  "MTV",
  "NBC",
  "USA Network",
  "Food Network",
  "Hallmark Channel",
  "BET",
];

const featuredCredits = [
  {
    show: "Finding Mr. Christmas",
    network: "Hallmark Channel",
    role: "Talent Producer",
    year: "2023\u20132025",
    sortYear: 2025,
    seasons: "Seasons 1 & 2",
    description:
      "Competition series where aspiring actors compete for a leading role in a Hallmark Christmas movie.",
  },
  {
    show: "Ciao House",
    network: "Food Network",
    role: "Talent Producer",
    year: "2023\u20132024",
    sortYear: 2024,
    seasons: "Seasons 1 & 2",
    location: "Filmed in Italy",
    description:
      "Culinary competition series hosted by Alex Guarnaschelli, filmed on location in Italy.",
  },
  {
    show: "Snake in the Grass",
    network: "NBC",
    role: "Talent Producer",
    year: "2022",
    sortYear: 2022,
    description:
      "Outdoor competition series where contestants identify the saboteur among them.",
  },
  {
    show: "Temptation Island",
    network: "USA Network",
    role: "Talent Producer",
    year: "2019\u20132023",
    sortYear: 2019,
    description:
      "Reality dating series testing committed couples. One of the longest running dating formats in television.",
  },
  {
    show: "After Happily Ever After",
    network: "BET",
    role: "Talent Producer",
    year: "2015",
    sortYear: 2015,
    description:
      "Relationship reality series following couples navigating marriage challenges.",
  },
].sort((a, b) => b.sortYear - a.sortYear);

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
  { label: "Total Credits", value: "50+" },
  {
    label: "Networks",
    value: "VH1, MTV, NBC, USA Network, Food Network, Hallmark, BET",
  },
  { label: "Primary Role", value: "Talent Producer" },
  {
    label: "Production Companies",
    value: "51 Minds Entertainment, Big Films Only",
  },
  { label: "Based In", value: "Miami, Florida" },
];

const faqs = [
  {
    q: "Who is Jotham Hall?",
    a: "Jotham Hall is a television producer with over 50 credits across 15 years on VH1, MTV, NBC, USA Network, Food Network, and Hallmark. He is the founder of Success Upgrade and Big Films Only, where he builds AI systems for businesses.",
  },
  {
    q: "What has Jotham Hall produced?",
    a: "His credits include Temptation Island, Flavor of Love, Rock of Love, I Love Money, From G\u2019s to Gents, Ciao House, Snake in the Grass, and Finding Mr. Christmas.",
  },
  {
    q: "What does Jotham Hall do now?",
    a: "He builds AI powered business systems and custom software through Success Upgrade, and produces film and content through Big Films Only.",
  },
  {
    q: "Where is Jotham Hall based?",
    a: "Miami, Florida.",
  },
];

export function CreditsContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(false);
  const [eraVisible, setEraVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Hero */}
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-foreground/10">
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
              Credits & Filmography
            </span>
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6 transition-all duration-700 delay-75 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Television Producer
            </h1>
            <p
              className={`text-xl sm:text-2xl lg:text-3xl font-display text-muted-foreground tracking-tight mb-10 transition-all duration-700 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              50+ credits across 15 years. Reality and unscripted television.
            </p>

            {/* Network row */}
            <div
              className={`flex flex-wrap gap-x-6 gap-y-3 mb-10 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {networks.map((network) => (
                <span
                  key={network}
                  className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {network}
                </span>
              ))}
            </div>

            <p
              className={`text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Jotham Hall is a television producer with over 50 credits spanning
              15 years in reality and unscripted television. He has produced for
              VH1, MTV, NBC, USA Network, Food Network, and Hallmark, including
              cultural touchstones in the dating, competition, and lifestyle
              genres. He is based in Miami and is the founder of Big Films Only
              and Success Upgrade.
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-14 border-b border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Credits" },
              { value: "7+", label: "Networks" },
              { value: "15+", label: "Years" },
              { value: "2008", label: "Career Start" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-display mb-2">
                  {stat.value}
                </div>
                <div className="text-background/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Credits */}
      <section
        ref={featuredRef}
        className="py-20 lg:py-28 border-b border-foreground/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <Tv className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
              Selected Credits
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-muted-foreground">
                    {credit.network}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground">
                    {credit.year}
                  </span>
                </div>
                <h3 className="text-2xl font-display mb-2">{credit.show}</h3>
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

      {/* 51 Minds Era */}
      <section
        ref={eraRef}
        className="py-20 lg:py-28 border-b border-foreground/10 bg-foreground/[0.02]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <Film className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">
              51 Minds Entertainment Era (2008&ndash;2014)
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            During six years at 51 Minds Entertainment, Jotham worked on the
            production team for over 50 reality television shows, rising from
            production assistant to Talent Producer on some of the most iconic
            dating and competition franchises of the era.
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
                <h3 className="text-xl font-display mb-3">{credit.show}</h3>
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

      {/* Career Summary */}
      <section className="py-20 lg:py-28 border-b border-foreground/10">
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

      {/* From the Control Room to the Command Line */}
      <section className="py-20 lg:py-28 border-b border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-6">
                From the Control Room to the Command Line
              </h2>
            </div>
            <div className="space-y-6 text-lg text-background/70 leading-relaxed">
              <p>
                Producing reality TV at scale is one skill: building systems
                that perform without you in every seat. Jotham now applies that
                skill to business, building AI systems that run companies.
              </p>
              <p>
                He is the founder of Big Films Only, an independent television
                and content production company, and Success Upgrade, where he
                builds AI business systems and custom software for founders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
            {faqs.map((faq, index) => (
              <details
                key={faq.q}
                open={openFaq === index}
                className="group"
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) setOpenFaq(index);
                }}
              >
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none">
                  <span className="text-lg font-display">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-muted-foreground leading-relaxed pb-6 max-w-2xl">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Work with a producer who builds systems
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
              <Link href="/about">About Jotham</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
