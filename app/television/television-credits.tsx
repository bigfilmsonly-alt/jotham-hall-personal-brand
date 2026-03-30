"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tv, Film, Award } from "lucide-react";

const currentProductions = [
  {
    title: "Finding Mr. Christmas",
    network: "Hallmark Channel",
    seasons: "Season 1 & 2",
    role: "Talent Producer"
  },
  {
    title: "Ciao House",
    network: "Food Network",
    seasons: "Season 1 & 2",
    role: "Talent Producer",
    note: "Filmed in Italy"
  },
  {
    title: "Temptation Island",
    network: "USA Network",
    seasons: "Multiple Seasons",
    role: "Talent Producer"
  },
  {
    title: "Snake in the Grass",
    network: "NBC",
    seasons: "Multiple Seasons",
    role: "Talent Producer"
  },
  {
    title: "After Happily Ever After",
    network: "BET",
    seasons: "Current",
    role: "Talent Producer",
    note: "Hosted by Bow Wow"
  }
];

const earlierProductions = [
  {
    title: "From G's to Gents",
    network: "MTV",
    role: "Talent Producer"
  },
  {
    title: "Flavor of Love",
    network: "VH1",
    role: "Talent Producer"
  },
  {
    title: "I Love Money",
    network: "VH1",
    role: "Talent Producer"
  }
];

const networks = [
  "Hallmark Channel",
  "Food Network",
  "USA Network",
  "NBC",
  "BET",
  "MTV",
  "VH1"
];

export function TelevisionCredits() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="text-sm font-mono text-muted-foreground mb-6 block">Television Production</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Television Credits
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              Over 50 reality television shows across major networks including Hallmark, Food Network, USA Network, NBC, BET, MTV, and VH1.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display mb-2">50+</div>
              <div className="text-background/60">TV Shows</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display mb-2">7+</div>
              <div className="text-background/60">Networks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display mb-2">15+</div>
              <div className="text-background/60">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-display mb-2">2008</div>
              <div className="text-background/60">Career Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Productions */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <Tv className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">Current & Recent Productions</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProductions.map((show) => (
              <div key={show.title} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="text-sm font-mono text-muted-foreground mb-2">{show.network}</div>
                <h3 className="text-2xl font-display mb-2">{show.title}</h3>
                <p className="text-muted-foreground mb-4">{show.seasons}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 border border-foreground/20">{show.role}</span>
                  {show.note && (
                    <span className="text-xs px-3 py-1 border border-foreground/20 text-muted-foreground">{show.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earlier Career */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <Film className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">Earlier Career (51 Minds Entertainment)</h2>
          </div>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            From 2008 to 2015, Jotham Hall worked at 51 Minds Entertainment where he rose through the ranks as a talent producer, contributing to the creative development of dozens of hit reality TV shows.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {earlierProductions.map((show) => (
              <div key={show.title} className="p-8 border border-foreground/10">
                <div className="text-sm font-mono text-muted-foreground mb-2">{show.network}</div>
                <h3 className="text-2xl font-display mb-2">{show.title}</h3>
                <span className="text-xs px-3 py-1 border border-foreground/20">{show.role}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8 text-center">Plus over 45 additional productions during this period</p>
        </div>
      </section>

      {/* Networks */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight">Networks</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {networks.map((network) => (
              <div key={network} className="px-8 py-4 border border-foreground/20 text-lg">
                {network}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-6">About Jotham Hall&apos;s Television Career</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Jotham Hall began his television career in 2008 when he moved to Los Angeles and joined 51 Minds Entertainment. He quickly adapted to the fast-paced production environment and rose through the ranks as a talent producer.
              </p>
              <p>
                During his seven years at 51 Minds, Jotham traveled internationally, worked with top 40 music artists, and contributed to the creative development of over 50 reality television shows.
              </p>
              <p>
                Today, Jotham continues to work in television production while also running his companies SuccessUpgrade.ai and Big Films Only. His unique combination of entertainment industry experience and technology expertise allows him to bridge the worlds of media and artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Work with Jotham Hall
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Interested in production collaborations, media projects, or business inquiries?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
            >
              Contact
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/5 px-8 h-16 text-lg rounded-none"
            >
              <Link href="/who-is-jotham-hall">Full Biography</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
