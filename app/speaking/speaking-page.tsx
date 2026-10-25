"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Copy, Download, Mail, MessageSquare, Phone } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { FooterSection } from "@/components/landing/footer-section";
import { ventures } from "@/lib/ventures";

/*
  The unprefixed classes are the phone design, approved as is. The site now
  fills the window on desktop, so md: (768px up) and lg: (1024px up) only add
  the desktop size: full width hairlines, content centered at a reading width
  (hero max-w-3xl, the bio card max-w-2xl, grids max-w-5xl), larger type, the
  two hero buttons side by side, and the lists as grids. No sm: variants, so
  nothing changes on a phone.

  Facts come only from app/credits/credits-content.tsx and lib/ventures.ts.
  No past engagements, audience sizes, fees or testimonials are claimed.
*/

const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];

// One show per network, newest first. Jo was Talent Producer on each.
const shows = [
  { show: "Finding Mr. Christmas", network: "Hallmark" },
  { show: "Ciao House", network: "Food Network" },
  { show: "Snake in the Grass", network: "NBC" },
  { show: "Temptation Island", network: "USA Network" },
  { show: "After Happily Ever After", network: "BET" },
  { show: "Flavor of Love", network: "VH1" },
  { show: "From G’s to Gents", network: "MTV" },
];

// Jo's own order from lib/ventures.ts: Verza TV first.
const featuredVentures = ventures.filter((venture) => venture.featured);

const topics = [
  {
    title: "Run Your Business on AI",
    text: "How AI agents and automation take over repetitive work, so a small team can grow without adding headcount.",
  },
  {
    title: "The Vibe Coding Revolution",
    text: "How anyone can build working apps by describing them in plain words, and what that changes for every team.",
  },
  {
    title: "From Agency to Ecosystem",
    text: "How a service business grows into products and systems that keep selling without you on every call.",
  },
  {
    title: "Personal Brand as a Revenue Engine",
    text: "What 15 years of producing TV taught me about attention, and how to turn it into leads, partners, and opportunities.",
  },
];

const formats = [
  { name: "Keynote", duration: "45 to 60 min", text: "A focused talk for conferences, summits, and company events." },
  { name: "Workshop", duration: "2 to 4 hours", text: "A working session for teams, with exercises and clear takeaways." },
  { name: "Fireside Chat", duration: "30 to 45 min", text: "A guided conversation on stage, with time for audience questions." },
  { name: "Podcast Guest", duration: "60 to 90 min", text: "A conversation on AI, business, and entrepreneurship for your show." },
];

// Third person, ready to paste into a program. Every fact is on /credits or /ventures.
const BIO =
  "Jotham Hall is a television producer turned AI systems architect. Over 15 years in TV, Jotham earned more than 50 credits on Hallmark, Food Network, VH1, MTV, USA Network, NBC, and BET, including Finding Mr. Christmas, Ciao House, and Temptation Island. Today Jotham builds apps and AI systems for businesses, including the Verza TV app on the App Store, and is the founder of Success Upgrade, based in Miami Beach.";

// Opens the visitor's mail app with the details an organizer would send anyway.
const EMAIL_HREF = `mailto:bigfilmsonly@gmail.com?subject=${encodeURIComponent(
  "Speaking inquiry"
)}&body=${encodeURIComponent("Event:\nDate:\nCity:\nAudience:\nFormat:\n")}`;

const label = "text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]";
const heading =
  "font-display text-[1.375rem] md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]";
const intro =
  "text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] text-balance max-w-[320px] md:max-w-xl mx-auto";
const hairline = "border-[#3D3A35]/60";
// Section shell: full width hairline on top, the content centered inside.
const section = `px-6 py-14 md:px-10 md:py-20 border-t ${hairline} text-center`;
const primaryButton =
  "w-full py-3.5 bg-[#D4A853] border border-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] hover:border-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97]";
// Stacked on the phone; on desktop the two buttons sit side by side at equal
// width, and the direct lines open in a full row beneath both.
const actions =
  "flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-x-3 md:gap-y-1.5 md:max-w-xl md:mx-auto";
const textLink =
  "inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#D4A853] hover:text-[#E8C97A] transition-colors";

// The secondary action: opens three direct lines in place, no modal.
function ContactOptions({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const row =
    "flex items-center gap-3 px-4 min-h-[44px] border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors pointer-coarse:active:scale-[0.98]";

  // md:contents lets the button and its panel join the parent's two column
  // grid on desktop: the button beside the gold one, the panel spanning both.
  return (
    <div className="flex flex-col gap-1.5 md:contents">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full py-3.5 border border-[#3D3A35] text-sm font-medium tracking-wide text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97]"
      >
        <Phone className="w-3.5 h-3.5" />
        Call, Text, or Email
      </button>
      <div id={id} hidden={!open} className="space-y-1.5 text-left md:col-span-2">
        <a href="tel:+15106809100" className={row}>
          <Phone className="w-4 h-4 shrink-0 text-[#D4A853]" />
          Call (510) 680-9100
        </a>
        <a href="sms:+15106934083" className={row}>
          <MessageSquare className="w-4 h-4 shrink-0 text-[#D4A853]" />
          Text (510) 693-4083
        </a>
        <a href={EMAIL_HREF} className={row}>
          <Mail className="w-4 h-4 shrink-0 text-[#D4A853]" />
          bigfilmsonly@gmail.com
        </a>
      </div>
    </div>
  );
}

export function SpeakingPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const openInquiry = () => setIsContactOpen(true);

  const copyBio = async () => {
    try {
      await navigator.clipboard.writeText(BIO);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the bio stays on screen to select by hand.
    }
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero: who Jo is, where, and one way to book */}
        <header className="px-6 pt-14 pb-14 text-center md:mx-auto md:max-w-3xl md:px-10 md:pt-24 md:pb-20">
          <Image
            src="/jotham-hall-headshot-480.jpg"
            alt="Jotham Hall"
            width={224}
            height={224}
            preload
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-2 border-[#D4A853]/30 shadow-[0_0_30px_rgba(212,168,83,0.15)] md:shadow-[0_0_44px_rgba(212,168,83,0.15)] mx-auto mb-6 md:mb-8"
          />
          <p className={`${label} mb-3 md:mb-4`}>Keynotes · Workshops · Podcasts</p>
          <h1 className="font-display text-[2rem] md:text-5xl lg:text-6xl leading-tight tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
            Jotham Hall
          </h1>
          <p className="mt-4 md:mt-6 text-[1.0625rem] md:text-lg lg:text-xl leading-relaxed text-[#FAF8F5]/90 text-balance max-w-[320px] md:max-w-xl mx-auto">
            TV producer of 15 years turned AI systems architect.
          </p>
          <p className="mt-2 md:mt-3 text-[15px] md:text-[17px] leading-relaxed text-[#8A837B]">
            Based in Miami Beach. Available worldwide.
          </p>
          <div className={`mt-8 md:mt-10 ${actions}`}>
            <button type="button" onClick={openInquiry} aria-haspopup="dialog" className={primaryButton}>
              Inquire About Speaking
              <ArrowRight className="w-4 h-4" />
            </button>
            <ContactOptions id="hero-contact" />
          </div>
        </header>

        {/* Proof, part one: television */}
        <section className={section}>
          <p className={`${label} mb-3`}>Television</p>
          <h2 className={heading}>Fifteen Years in TV</h2>
          <p className={`${intro} mt-3 md:mt-4`}>
            Talent producer on reality and competition shows across seven networks.
          </p>
          <div
            className={`grid grid-cols-3 gap-2 mt-8 py-5 border-y ${hairline} md:mt-12 md:py-10 md:gap-0 md:max-w-5xl md:mx-auto md:divide-x md:divide-[#3D3A35]/60`}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl md:text-5xl text-[#FAF8F5] tracking-wide">{stat.value}</p>
                <p className="mt-1 md:mt-3 text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <ul className="mt-6 text-left md:mt-8 md:max-w-5xl md:mx-auto md:grid md:grid-cols-2 md:gap-x-12">
            {shows.map((item) => (
              <li
                key={item.show}
                className={`flex items-baseline justify-between gap-4 py-3.5 border-b ${hairline} md:py-5`}
              >
                <span className="text-[15px] md:text-[17px] text-[#FAF8F5]">{item.show}</span>
                <span className="shrink-0 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                  {item.network}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/credits" className={`${textLink} mt-5 md:mt-8`}>
            All TV Credits
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Proof, part two: what Jo builds now */}
        <section className={section}>
          <p className={`${label} mb-3`}>Technology</p>
          <h2 className={heading}>What I Build Now</h2>
          <p className={`${intro} mt-3 md:mt-4`}>Companies I founded, and products I built with partners.</p>
          {/*
            Desktop: a grid of hairline rows. The list's top rule moves onto the
            first row's cells so every rule breaks at the column gaps alike.
          */}
          <ul
            className={`mt-8 border-t ${hairline} text-left md:mt-12 md:max-w-5xl md:mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 md:border-t-0`}
          >
            {featuredVentures.map((venture) => (
              <li
                key={venture.slug}
                className={`border-b ${hairline} md:[&:nth-child(-n+2)]:border-t lg:[&:nth-child(3)]:border-t`}
              >
                <Link
                  href={`/ventures/${venture.slug}`}
                  className="group flex items-center justify-between gap-4 py-3.5 md:py-6 active:opacity-80"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] md:text-[17px] text-[#FAF8F5] group-hover:text-[#E8C97A] transition-colors">
                      {venture.name}
                    </span>
                    <span className="block mt-0.5 md:mt-1 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                      {venture.category}
                    </span>
                  </span>
                  <span className="shrink-0 px-2 py-0.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
                    {venture.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/ventures" className={`${textLink} mt-5 md:mt-8`}>
            All Ventures
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* What the audience hears */}
        <section className={section}>
          <p className={`${label} mb-3`}>Topics</p>
          <h2 className={heading}>What I Speak On</h2>
          <ol className="mt-8 space-y-3 text-left md:mt-12 md:max-w-5xl md:mx-auto md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {topics.map((topic, index) => (
              <li key={topic.title} className="bg-[#1A1A1A] border border-[#3D3A35] p-6 md:p-8 lg:p-10">
                <span className="font-mono text-xs md:text-sm text-[#D4A853]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 md:mt-4 font-display text-[1.0625rem] md:text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
                  {topic.title}
                </h3>
                <p className="mt-2.5 md:mt-3 text-[15px] md:text-[17px] leading-relaxed text-pretty text-[#B8B0A8]">
                  {topic.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* How it fits the event */}
        <section className={section}>
          <p className={`${label} mb-3`}>Formats</p>
          <h2 className={heading}>Choose a Format</h2>
          {/* Desktop: two by two, hairlines broken at the gap like the ventures. */}
          <ul
            className={`mt-8 border-t ${hairline} text-left md:mt-12 md:max-w-5xl md:mx-auto md:grid md:grid-cols-2 md:gap-x-12 md:border-t-0`}
          >
            {formats.map((format) => (
              <li
                key={format.name}
                className={`py-5 border-b ${hairline} md:py-8 md:[&:nth-child(-n+2)]:border-t`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-base md:text-lg tracking-[0.12em] uppercase text-[#FAF8F5]">
                    {format.name}
                  </h3>
                  <span className="shrink-0 text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">
                    {format.duration}
                  </span>
                </div>
                <p className="mt-1.5 md:mt-2.5 text-[15px] md:text-[17px] leading-relaxed text-pretty text-[#B8B0A8]">
                  {format.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* What an organizer needs to announce the session */}
        <section className={section}>
          <p className={`${label} mb-3`}>For Organizers</p>
          <h2 className={heading}>Bio and Headshot</h2>
          <p className={`${intro} mt-3 md:mt-4`}>Ready for your program, website, and promotion.</p>
          <div className="mt-8 bg-[#1A1A1A] border border-[#3D3A35] text-left md:mt-12 md:max-w-2xl md:mx-auto">
            <div className="flex items-center gap-4 px-6 pt-6 md:gap-5 md:px-10 md:pt-10">
              <Image
                src="/jotham-hall-headshot-480.jpg"
                alt=""
                width={112}
                height={112}
                className="w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full object-cover border border-[#D4A853]/30"
              />
              <div className="min-w-0">
                <p className="font-display text-[0.95rem] md:text-xl tracking-[0.12em] uppercase text-[#FAF8F5]">
                  Jotham Hall
                </p>
                <p className="mt-1 md:mt-1.5 text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#8A837B]">
                  Short Bio
                </p>
              </div>
            </div>
            <p className="px-6 pt-5 pb-6 md:px-10 md:pt-6 md:pb-10 text-[15px] md:text-[17px] leading-relaxed text-pretty text-[#B8B0A8]">
              {BIO}
            </p>
            <div className={`grid grid-cols-2 border-t ${hairline}`}>
              <button
                type="button"
                onClick={copyBio}
                className={`min-h-[48px] md:min-h-[56px] flex items-center justify-center gap-1.5 border-r ${hairline} text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#B8B0A8] hover:text-[#FAF8F5] transition-colors`}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#D4A853]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied" : "Copy Bio"}
              </button>
              <a
                href="/jotham-hall-headshot.jpg"
                download="jotham-hall-headshot.jpg"
                className="min-h-[48px] md:min-h-[56px] flex items-center justify-center gap-1.5 text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase text-[#D4A853] hover:text-[#E8C97A] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Headshot
              </a>
            </div>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? "Bio copied" : ""}
          </p>
        </section>

        {/*
          Closing: the same action as the hero. It sits right before the footer
          on purpose: the floating Book a Call button steps aside when the
          footer's previous sibling reaches the screen, so it never covers this.
        */}
        <section className="mx-6 mb-14 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center md:mx-auto md:mb-20 md:max-w-2xl md:px-12 md:py-16">
          <p className={`${label} mb-3 md:mb-4`}>Bookings</p>
          <h2 className="font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3 md:mb-4">
            Tell Me About Your Event
          </h2>
          <p className="text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] text-balance mb-7 md:mb-10 max-w-[300px] md:max-w-md mx-auto">
            Fees depend on the format, length, and travel. Send an inquiry and I reply within 24 hours.
          </p>
          <div className={actions}>
            <button type="button" onClick={openInquiry} aria-haspopup="dialog" className={primaryButton}>
              Inquire About Speaking
              <ArrowRight className="w-4 h-4" />
            </button>
            <ContactOptions id="closing-contact" />
          </div>
        </section>

        {/* The footer ends with its own clearance for the fixed tab bar. */}
        <FooterSection />
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
