"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Building2, Lightbulb, Rocket, Heart } from "lucide-react";

const shortBio = "Jotham Hall is an entrepreneur, television producer, and technology founder known for his work in reality television production, creative media, and artificial intelligence systems for business automation. Born and raised in Oakland, California, he has contributed to over 50 reality TV shows and is the founder of SuccessUpgrade.ai and Big Films Only.";

const ventures = [
  {
    name: "Success Upgrade",
    description: "An AI-powered ecosystem designed to help entrepreneurs, creators, and visionaries build wealth, optimize their lives, and scale through AI and automation.",
    url: "/ventures/success-upgrade",
    external: "https://www.successupgrade.ai"
  },
  {
    name: "Big Films Only",
    description: "A black-owned, family-owned independent production company launched in 2015. Currently involved with major TV productions including USA Network's 'Temptation Island', NBC's 'Snake in the Grass', and BET's 'After Happily Ever After' hosted by Bow Wow.",
    url: "/ventures/big-films-only"
  },
  {
    name: "Say It Build It",
    description: "An AI-powered development platform that transforms ideas into functional products through voice and natural language.",
    url: "/ventures/say-it-build-it"
  }
];

const expertise = [
  "Reality Television Production",
  "Media Storytelling",
  "Artificial Intelligence",
  "Business Automation",
  "Marketing & Sales Strategy",
  "Sustainability & Eco-Friendly Housing"
];

const notableAchievements = [
  "Contributed to the creative process of over 50 hit reality TV shows at 51 Minds Entertainment",
  "Managed top 40 music artists as a talent producer in Hollywood",
  "Finding Mr. Christmas - Hallmark Channel (Season 1 & 2)",
  "Ciao House - Food Network (Season 1 & 2, filmed in Italy)",
  "Temptation Island - USA Network",
  "Snake in the Grass - NBC",
  "After Happily Ever After - BET (hosted by Bow Wow)",
  "From G's to Gents - MTV",
  "Flavor of Love - VH1",
  "I Love Money - VH1",
  "Founded Big Films Only - Black-owned independent production company (2015)",
  "Founded SuccessUpgrade.ai - AI-powered platform for entrepreneurs"
];

const timeline = [
  { year: "Present", event: "Based in Miami Beach, FL - Leading Success Upgrade, Big Films Only, and Say It Build It" },
  { year: "2024", event: "Launched Success Upgrade AI ecosystem for entrepreneurs" },
  { year: "2023", event: "Founded Say It Build It - AI development platform" },
  { year: "2015", event: "Moved to Hawaii - Founded Big Films Only, a black-owned independent production company" },
  { year: "2008-2015", event: "Hollywood - Talent producer at 51 Minds Entertainment, contributed to 50+ reality TV shows, managed top 40 artists" },
  { year: "2008", event: "Moved to Hollywood to pursue career in entertainment industry" },
  { year: "Early 2000s", event: "Attended college in Santa Barbara studying film production, media, and marketing" },
  { year: "Post-HS", event: "Worked as builder's apprentice in family construction business" },
  { year: "High School", event: "Attended Common Ground, an ecology-based academy - traveled internationally" },
  { year: "1984", event: "Born September 13 in Oakland, California" },
];

const quotes = [
  {
    text: "Build systems, not schedules.",
    context: "On sustainable business growth"
  },
  {
    text: "The goal isn't to work harder, it's to build systems that work for you.",
    context: "On automation and freedom"
  },
  {
    text: "AI is the great equalizer. With the right systems, anyone can compete at the highest level.",
    context: "On democratizing technology"
  }
];

export function WhoIsJothamHall() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="text-sm font-mono text-muted-foreground mb-6 block">The Definitive Biography</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8">
              Who is Jotham Hall?
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              {shortBio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => setIsContactOpen(true)}
                className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none group"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-foreground/20 hover:bg-foreground/5 px-8 h-14 text-base rounded-none"
              >
                <Link href="/about">Full Biography</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Quick Facts About Jotham Hall</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-foreground/10">
              <Building2 className="w-8 h-8 mb-4" />
              <h3 className="font-display text-lg mb-2">Location</h3>
              <p className="text-muted-foreground">Miami Beach, Florida</p>
            </div>
            <div className="p-6 border border-foreground/10">
              <Rocket className="w-8 h-8 mb-4" />
              <h3 className="font-display text-lg mb-2">Profession</h3>
              <p className="text-muted-foreground">Entrepreneur, Television Producer, Technology Founder</p>
            </div>
            <div className="p-6 border border-foreground/10">
              <Lightbulb className="w-8 h-8 mb-4" />
              <h3 className="font-display text-lg mb-2">Focus</h3>
              <p className="text-muted-foreground">AI Automation & Creative Technology</p>
            </div>
            <div className="p-6 border border-foreground/10">
              <Heart className="w-8 h-8 mb-4" />
              <h3 className="font-display text-lg mb-2">Mission</h3>
              <p className="text-muted-foreground">Build Systems. Not Schedules.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Long Biography */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-6">Biography</h2>
              <p className="text-muted-foreground">The story of an entrepreneur building the future with AI.</p>
            </div>
            <div className="lg:col-span-2 space-y-6 text-lg leading-relaxed">
              <p>
                <strong>Jotham Hall</strong> was born and raised in Oakland, California on September 13, 1984. He attended an ecology-based academy called Common Ground during high school, where he traveled internationally, learned about new cultures, and developed tangible life skills at a young age.
              </p>
              <p>
                After high school, Jotham worked in his family's construction business as a builder's apprentice before following his passion to attend college in Santa Barbara to study film production, media, and marketing.
              </p>
              <p>
                In 2008, Jotham moved to Los Angeles to pursue a career in the entertainment industry. He joined <strong>51 Minds Entertainment</strong>, a television production company, where he quickly adapted to the fast-paced production environment and rose through the ranks as a talent producer. During the next seven years, he traveled internationally, worked with top 40 music artists, and contributed to the creative development of over 50 reality television shows including MTV's "From G's to Gents," VH1's "Flavor of Love," and "I Love Money."
              </p>
              <p>
                Jotham later continued working in television production as a talent producer on major productions including: <strong>Finding Mr. Christmas</strong> (Hallmark Channel, Season 1 & 2), <strong>Ciao House</strong> (Food Network, Season 1 & 2 filmed in Italy), <strong>Temptation Island</strong> (USA Network), <strong>Snake in the Grass</strong> (NBC), and <strong>After Happily Ever After</strong> (BET, hosted by platinum recording artist Bow Wow).
              </p>
              <p>
                In 2015, Jotham moved to Hawaii to raise his family and focus on entrepreneurship. He launched <strong>Big Films Only</strong>, a black-owned and family-owned independent production company focused on storytelling, content creation, and independent media. As a solo entrepreneur, he developed strong marketing and sales skills while applying his experience from the film industry to build his own ventures.
              </p>
              <p>
                Today, Jotham Hall is also the founder of <strong>SuccessUpgrade.ai</strong>, a technology platform focused on artificial intelligence tools, automation systems, and digital infrastructure that help businesses scale using modern AI technologies. His work today focuses on the intersection of media, entrepreneurship, and artificial intelligence.
              </p>
              <p>
                Jotham is passionate about sustainability, creating social change, developing eco-friendly housing, and giving people an opportunity to tell their story. His unique background in construction, film production, and marketing has allowed him to become a successful entrepreneur dedicated to making a positive impact on society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Companies Founded by Jotham Hall</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ventures.map((venture) => (
              <div key={venture.name} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                <h3 className="text-2xl font-display mb-4">{venture.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{venture.description}</p>
                <div className="flex flex-col gap-2">
                  <Link href={venture.url} className="text-sm flex items-center gap-1 hover:underline">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </Link>
                  {venture.external && (
                    <a href={venture.external} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
                      Visit Website <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Achievements */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Notable Achievements</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {notableAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 p-6 border border-foreground/10">
                <span className="text-2xl font-display text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-lg">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Career Timeline</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-8 pb-6 border-b border-foreground/10">
                <span className="text-xl font-mono text-muted-foreground w-24 shrink-0">{item.year}</span>
                <span className="text-lg">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-20 lg:py-32 border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Quotes by Jotham Hall</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <blockquote key={index} className="p-8 border border-foreground/10 bg-foreground/[0.02]">
                <p className="text-xl font-display mb-4">"{quote.text}"</p>
                <cite className="text-sm text-muted-foreground not-italic">— {quote.context}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 lg:py-32 border-b border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-12">Areas of Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((item) => (
              <div key={item} className="p-6 border border-background/20">
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Connect with Jotham Hall
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Interested in working together or learning more? Get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
            >
              Contact Jotham Hall
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/5 px-8 h-16 text-lg rounded-none"
            >
              <a href="https://www.linkedin.com/in/jotham-hall-b6b9491b2" target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
