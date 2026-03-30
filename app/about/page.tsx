"use client";

import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const philosophy = [
  {
    title: "Systems Over Schedules",
    description: "I don't sell motivation. I build machines — automated systems that run without you, scale without limits, and compound over time."
  },
  {
    title: "Execution Over Theory",
    description: "Every framework I teach comes from building real businesses and producing real shows. Not case studies. Real revenue. Real results."
  },
  {
    title: "Infrastructure Over Hustle",
    description: "The goal isn't to work harder. The goal is to build infrastructure so good that growth becomes inevitable and burnout becomes impossible."
  },
];

const timeline = [
  { year: "1984", event: "Born in Oakland, California" },
  { year: "2008", event: "Moved to Los Angeles, joined 51 Minds Entertainment" },
  { year: "2008–2014", event: "Talent Producer on 50+ reality TV shows (VH1, MTV, BET)" },
  { year: "2015", event: "Founded Big Films Only" },
  { year: "2015–Present", event: "Talent Producer on Hallmark, Food Network, NBC productions" },
  { year: "2023", event: "Founded SuccessUpgrade.ai" },
  { year: "2024", event: "Pioneered vibe coding methodology" },
  { year: "2025", event: "Consulting for 7-figure founders, relocated to Miami" },
];

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

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={sectionRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              About
            </span>
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Jotham Hall
            </h1>
            <p
              className={`text-xl sm:text-2xl lg:text-3xl font-display text-muted-foreground tracking-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Television Producer. AI Systems Architect. Builder.
            </p>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-12">
              I spent a decade producing reality television for networks like VH1, MTV, Food Network, and Hallmark.
              Now I build AI-powered systems that help founders scale without burning out. The throughline is the same:
              I architect experiences that work.
            </p>

            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none group"
            >
              Work With Me
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-16">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              The Story
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              How I Got Here
            </h2>
          </div>

          <div className="max-w-3xl space-y-16">
            {/* Oakland to Los Angeles */}
            <div>
              <h3 className="text-2xl font-display mb-4">Oakland to Los Angeles</h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I grew up in Oakland, California. At Common Ground — an ecology-based academy — I learned that
                  systems thinking applies to everything: ecosystems, communities, businesses, lives. That foundation
                  shaped how I see the world.
                </p>
                <p>
                  After studying film production and media at Santa Barbara City College, I moved to Los Angeles
                  in 2008 with one goal: break into entertainment.
                </p>
              </div>
            </div>

            {/* 51 Minds Entertainment */}
            <div>
              <h3 className="text-2xl font-display mb-4">51 Minds Entertainment (2008–2014)</h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I joined 51 Minds Entertainment, one of the most prolific reality TV production companies in the
                  industry. Over six years, I rose from production assistant to Talent Producer, working on over 50
                  shows across VH1, MTV, NBC, BET, and more.
                </p>
                <div>
                  <p className="text-foreground font-medium mb-3">Select credits:</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {tvCredits.map((credit) => (
                      <li key={credit} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2.5 shrink-0" />
                        {credit}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  As a Talent Producer, I managed casting, talent relationships, and on-set dynamics — high-stakes
                  coordination where one wrong move could derail a production. I traveled internationally, worked
                  16-hour days, and learned how to build systems that perform under pressure.
                </p>
              </div>
            </div>

            {/* Big Films Only */}
            <div>
              <h3 className="text-2xl font-display mb-4">Big Films Only (2015–Present)</h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  In 2015, I founded Big Films Only — a Black-owned independent production company focused on
                  storytelling with social impact.
                </p>
                <div>
                  <p className="text-foreground font-medium mb-3">Recent credits include:</p>
                  <ul className="space-y-2">
                    {recentCredits.map((credit) => (
                      <li key={credit} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2.5 shrink-0" />
                        {credit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* The Pivot to AI */}
            <div>
              <h3 className="text-2xl font-display mb-4">The Pivot to AI (2023–Present)</h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  After 15 years in entertainment, I saw the same pattern everywhere: talented founders drowning
                  in operations. Manual follow-ups. Scattered systems. Revenue leaking through the cracks.
                </p>
                <p>
                  I started applying what I learned on set — systems thinking, process design, high-pressure
                  coordination — to business infrastructure. I taught myself AI automation, no-code development,
                  and what I now call &ldquo;vibe coding.&rdquo;
                </p>
                <p>
                  In 2023, I launched SuccessUpgrade.ai to help founders escape the chaos of scaling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-16">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              The Path to Here
            </h2>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-6 py-4 border-b border-foreground/10">
                <span className="font-mono text-2xl text-muted-foreground w-32 shrink-0">{item.year}</span>
                <span className="text-lg">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-16">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              How I Think About Building
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                <h3 className="text-xl font-display mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Ready to Build Your System?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let us architect the infrastructure that lets you scale without the chaos.
          </p>
          <Button
            size="lg"
            onClick={() => setIsContactOpen(true)}
            className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
          >
            Book a Strategy Call
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <FooterSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
