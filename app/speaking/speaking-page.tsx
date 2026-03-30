"use client";

import { useState } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Users, Lightbulb, Zap } from "lucide-react";

const topics = [
  {
    icon: Zap,
    title: "AI-First Business Operations",
    description: "How to leverage AI agents and automation to scale without scaling headcount. Real systems, real results."
  },
  {
    icon: Lightbulb,
    title: "The Vibe Coding Revolution",
    description: "Building products at the speed of thought using AI-assisted development and creative flow states."
  },
  {
    icon: Users,
    title: "From Agency to Ecosystem",
    description: "Transforming service businesses into scalable product ecosystems using systems thinking."
  },
  {
    icon: Mic,
    title: "Personal Brand as Revenue Engine",
    description: "Building authentic personal brands that generate leads, partnerships, and opportunities on autopilot."
  },
];

const formats = [
  { name: "Keynote", duration: "45-60 min", description: "High-energy presentations for conferences and summits" },
  { name: "Workshop", duration: "2-4 hours", description: "Hands-on sessions with actionable takeaways" },
  { name: "Fireside Chat", duration: "30-45 min", description: "Intimate conversations and Q&A sessions" },
  { name: "Podcast Guest", duration: "60-90 min", description: "Deep-dive discussions on AI, business, and entrepreneurship" },
];

export function SpeakingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const speakerSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jotham Hall",
    "jobTitle": "Keynote Speaker & Entrepreneur",
    "description": "Jotham Hall is available for speaking engagements on AI automation, entrepreneurship, business systems, and creative technology.",
    "url": "https://jothamhall.com/speaking",
    "sameAs": [
      "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
      "https://www.instagram.com/successupgrade_"
    ],
    "knowsAbout": ["AI Automation", "Entrepreneurship", "Business Systems", "Personal Branding", "Creative Technology"]
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakerSchema) }}
      />
      
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
            <span className="w-8 h-px bg-foreground/30" />
            Speaking Engagements
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8">
            Book Jotham Hall<br />for Your Event
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Keynotes, workshops, and conversations on AI automation, entrepreneurship, 
            and building systems that scale. Based in Miami Beach, available worldwide.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => setIsContactOpen(true)}
            className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
          >
            Inquire About Speaking
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-16 text-center">
            Speaking Topics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {topics.map((topic, index) => (
              <div key={index} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                <topic.icon className="w-8 h-8 mb-6" />
                <h3 className="text-xl font-display mb-3">{topic.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-16 text-center">
            Engagement Formats
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {formats.map((format, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-display mb-2">{format.name}</h3>
                <p className="text-background/50 text-sm mb-4">{format.duration}</p>
                <p className="text-background/70 text-sm">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-8">
            Let&apos;s Create Something Memorable
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Whether it&apos;s a conference keynote, corporate workshop, or podcast appearance, 
            I bring energy, insights, and actionable strategies.
          </p>
          <Button 
            size="lg" 
            onClick={() => setIsContactOpen(true)}
            className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
          >
            Book Jotham Hall
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <FooterSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
