"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, Mail, Check, BarChart3 } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { supabase } from "@/lib/supabase";
import type { CityData } from "@/lib/city-data";

interface Props {
  city: CityData;
  services: { slug: string; name: string; description: string; benefits: string[]; priceRange: string }[];
}

const testimonials = [
  { quote: "Went from chaotic hustle to systematic scaling in 90 days.", author: "Marcus Thompson", role: "Founder, Thompson Media", metric: "300% revenue increase" },
  { quote: "The automation systems eliminated 30 hours of manual work per week.", author: "Angela Rivera", role: "CEO, Rivera Consulting", metric: "30 hrs/week saved" },
  { quote: "Like having a CTO, CMO, and operations consultant rolled into one.", author: "David Kim", role: "Founder, Apex Ventures", metric: "7-figure systems built" },
];

export function CityPageContent({ city, services }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [captureEmail, setCaptureEmail] = useState("");
  const [captureStatus, setCaptureStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureEmail || captureStatus === "loading") return;
    setCaptureStatus("loading");
    await supabase.from("email_captures").upsert({ email: captureEmail, source: `city_${city.slug}` }, { onConflict: "email" });
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email_capture", data: { email: captureEmail, source: `city_${city.slug}` } }),
    }).catch(() => {});
    setCaptureEmail("");
    setCaptureStatus("done");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-10 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="text-xs font-mono text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{city.name}</span>
          </nav>

          {/* Urgency banner */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/20 bg-yellow-500/5 mb-6">
            <span className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-xs font-mono text-yellow-500/80">Only accepting 3 new {city.name} clients this month</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-4">
            AI Automation &amp; Business Systems in {city.name}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mb-6">
            {city.localAngle} 50+ TV credits. 500+ founders scaled. 3x average revenue growth.
          </p>

          {/* Price anchor */}
          <div className="mb-6">
            <span className="text-xs text-muted-foreground line-through">$500 Strategy Call</span>
            <span className="ml-2 text-sm font-medium text-green-400">FREE for {city.name} Founders</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
            >
              Apply for Free Strategy Call <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+15106809100" className="px-6 py-3.5 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors inline-flex items-center gap-2 active:scale-[0.97]">
              Call Now (510) 680-9100
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-8">Services in {city.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${city.slug}/${service.slug}`}
                className="group p-5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.99]"
              >
                <h3 className="font-display text-lg mb-1">{service.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {service.benefits.slice(0, 2).map((b) => (
                    <span key={b} className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Check className="w-3 h-3" />{b}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-8">Results That Speak</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { value: "500+", label: "Founders Scaled" },
              { value: "50+", label: "TV Credits" },
              { value: "3x", label: "Avg Revenue Growth" },
              { value: "40%", label: "Overhead Reduced" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 border border-foreground/10">
                <div className="text-2xl font-display">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.author} className="p-5 border border-foreground/10">
                <p className="text-sm mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium">{t.author}</span>
                    <span className="text-xs text-muted-foreground ml-2">{t.role}</span>
                  </div>
                  <span className="text-xs font-mono text-green-400">{t.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-mono text-yellow-500/80 uppercase tracking-widest mb-3">Limited Availability</p>
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-3">
            I only work with 12 clients at a time.
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Every {city.name} engagement gets my full attention. Apply now before spots fill.
          </p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
          >
            Check Availability <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Stay Connected</p>
          <h2 className="text-xl lg:text-2xl font-display tracking-wide uppercase text-foreground mb-3">
            Get AI strategies for {city.name}
          </h2>
          <p className="text-xs text-muted-foreground mb-6 max-w-md mx-auto">
            Weekly insights on automation, revenue systems, and scaling. Join 500+ founders.
          </p>
          {captureStatus === "done" ? (
            <p className="text-sm text-[#D4A853] font-medium">You&apos;re in. Welcome.</p>
          ) : (
            <form onSubmit={handleCapture} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                required
                value={captureEmail}
                onChange={(e) => setCaptureEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#3D3A35] text-foreground placeholder-[#5C5750] text-sm focus:outline-none focus:border-[#D4A853]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={captureStatus === "loading"}
                className="px-5 py-3 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium hover:bg-[#E8C97A] transition-colors disabled:opacity-50"
              >
                {captureStatus === "loading" ? "..." : "Join Free"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-8">FAQ &mdash; {city.name}</h2>
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-medium text-sm mb-1">Who is the best AI automation consultant in {city.name}?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Jotham Hall is a top AI automation consultant serving {city.name}. With 50+ TV production credits and 500+ entrepreneurs mentored, he specializes in ChatGPT, Claude, GoHighLevel, and no-code automation for {city.name} businesses.</p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">How much does AI automation cost in {city.name}?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">Free 60-minute strategy call. AI automation projects range from $2,500 to $15,000+. Revenue systems $5,000 to $25,000+. Fractional COO $5,000 to $15,000/month.</p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">What services are available in {city.name}?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">AI Automation, Revenue Systems, VibeCoding, and Fractional COO. Serving {city.neighborhoods.slice(0, 5).join(", ")}, and throughout {city.state}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-6">Reach Me Directly</h2>
          <div className="max-w-md space-y-2">
            <a href="tel:+15106809100" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Call</span> <span className="text-xs text-muted-foreground">(510) 680-9100</span></div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
            <a href="sms:+15106934083" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Text</span> <span className="text-xs text-muted-foreground">(510) 693-4083</span></div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
            <a href="mailto:bigfilmsonly@gmail.com" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Email</span> <span className="text-xs text-muted-foreground">bigfilmsonly@gmail.com</span></div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>

      {/* Areas + Cross-links */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-lg font-display tracking-tight mb-4">Areas Served in {city.name}</h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {city.neighborhoods.map((n) => (
              <span key={n} className="px-2.5 py-1 border border-foreground/10 text-xs text-muted-foreground">{n}</span>
            ))}
          </div>

          <h2 className="text-lg font-display tracking-tight mb-4">Also Serving</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { slug: "new-york", name: "New York" }, { slug: "san-francisco", name: "San Francisco" },
              { slug: "los-angeles", name: "Los Angeles" }, { slug: "miami", name: "Miami" },
              { slug: "atlanta", name: "Atlanta" }, { slug: "austin", name: "Austin" },
              { slug: "chicago", name: "Chicago" }, { slug: "dallas", name: "Dallas" },
              { slug: "houston", name: "Houston" }, { slug: "boston", name: "Boston" },
            ].filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[4.5rem]" />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
