"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { CalendlyModal } from "@/components/calendly-modal";
import { ventures } from "@/lib/ventures";

/*
  One centered column at every screen size. globals.css holds the whole site
  to a 430px column from 768px up, but sm: md: lg: variants still answer to the
  viewport, so on a desktop they used to switch on huge type and wide padding
  inside that narrow column and push this page to the left. Nothing here keys
  off a viewport breakpoint; it reads the same from 360 to 430 wide.

  Facts only from the codebase: the TV numbers, networks and the 51 Minds start
  match app/credits/credits-content.tsx, and the ventures come straight from
  lib/ventures.ts in Jo's order. No invented stats, results, quotes or scarcity.
*/

const featured = ventures.filter((venture) => venture.featured);

const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];

const networks = ["Hallmark", "Food Network", "NBC", "USA Network", "VH1", "MTV", "BET"];

const steps = [
  {
    title: "Book a Strategy Call",
    body: "Pick a time that works for you. The call is free.",
  },
  {
    title: "Get a Clear Plan",
    body: "I show you what to automate, what to build, and the order to build it in.",
  },
  {
    title: "Build and Launch",
    body: "I build it with you, from AI workflows to apps and websites, and we launch it together.",
  },
];

const faqs = [
  {
    q: "What happens on the call?",
    a: "You walk me through how the business runs today and what you want to change. I tell you what I would automate or build first. There is no obligation.",
  },
  {
    q: "What do you build?",
    a: "AI systems that take repetitive work off your plate, plus websites and apps. I built the Verza TV website and iPhone app, and the Peaceful Healing Rx app.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. I handle the technical work and explain each step in plain words.",
  },
  {
    q: "Where are you based?",
    a: "Miami Beach, Florida. You can book a call from anywhere.",
  },
];

const contacts = [
  { label: "Call", detail: "(510) 680-9100", href: "tel:+15106809100", icon: Phone },
  { label: "Text", detail: "(510) 693-4083", href: "sms:+15106934083", icon: MessageSquare },
  { label: "Email", detail: "bigfilmsonly@gmail.com", href: "mailto:bigfilmsonly@gmail.com", icon: Mail },
];

const label = "text-[11px] tracking-[0.15em] uppercase text-[#D4A853]";
const heading =
  "font-display text-[1.375rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]";
const primaryButton =
  "w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]";

// The secondary action: opens direct call, text and email links in place.
// The numbers stay visible because tel: and sms: do nothing on most desktops.
function ContactOptions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="w-full py-3.5 border border-[#3D3A35] text-sm font-medium tracking-wide text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
      >
        <Phone className="w-3.5 h-3.5" />
        Call, Text, or Email
      </button>
      {isOpen && (
        <ul className="mt-2 space-y-2 animate-in fade-in duration-200">
          {contacts.map(({ label: name, detail, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                className="flex items-center justify-center gap-2.5 py-3 border border-[#3D3A35]/60 text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.98]"
              >
                <Icon className="w-4 h-4 text-[#D4A853]" />
                {name} {detail}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-[#FAF8F5]">
      {/* Hero: who Jo is, in one sentence, and the call */}
      <header className="px-6 pt-14 pb-14 text-center animate-in fade-in duration-700 motion-reduce:animate-none">
        <div className="mx-auto w-fit rounded-full border border-[#D4A853]/35 p-1.5">
          <Image
            src="/jotham-hall-headshot.jpg"
            alt="Jotham Hall"
            width={136}
            height={136}
            priority
            className="w-[136px] h-[136px] rounded-full object-cover"
          />
        </div>
        <h1 className="mt-7 font-display text-[1.875rem] leading-tight tracking-[0.12em] uppercase text-balance">
          Jotham Hall
        </h1>
        <p className={`mt-3 leading-relaxed ${label}`}>
          AI Systems Architect
          <br />
          App Developer · Strategist
        </p>
        <p className="mt-6 max-w-[340px] mx-auto text-[1.0625rem] leading-relaxed text-[#FAF8F5]/85 text-pretty">
          I spent 15 years producing network television. Now I build AI systems and apps so your business runs
          without you in every seat.
        </p>
        <div className="mt-8 space-y-2.5">
          <button type="button" onClick={openCalendly} className={primaryButton}>
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <ContactOptions />
        </div>
      </header>

      {/* Proof: the TV career, with the full list one tap away */}
      <section className="px-6 py-14 border-t border-[#3D3A35]/60 text-center">
        <p className={label}>Television</p>
        <h2 className={`mt-4 ${heading}`}>Fifteen Years Behind the Camera</h2>
        <dl className="mt-8 grid grid-cols-3 border-y border-[#3D3A35]/60 divide-x divide-[#3D3A35]/60">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 flex flex-col-reverse items-center gap-2">
              <dt className="text-[10px] tracking-[0.15em] uppercase text-[#8A837B]">{stat.label}</dt>
              <dd className="font-display text-[1.75rem] leading-none text-[#FAF8F5]">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-[340px] mx-auto text-base leading-relaxed text-[#B8B0A8] text-pretty">
          I started in 2008 as a production assistant at 51 Minds Entertainment. I became a talent producer on
          shows for{" "}
          {networks.map((network, i) => (
            <span key={network}>
              <span className="text-[#FAF8F5]">{network}</span>
              {i < networks.length - 2 ? ", " : i === networks.length - 2 ? ", and " : "."}
            </span>
          ))}
        </p>
        <Link
          href="/credits"
          className="group mt-6 inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[11px] font-medium tracking-[0.15em] uppercase text-[#D4A853] hover:text-[#E8C97A] transition-colors"
        >
          See All TV Credits
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* Story: Jo's own words, condensed from Jo's founder statement */}
      <section className="px-6 py-14 border-t border-[#3D3A35]/60 text-center">
        <p className={label}>In My Own Words</p>
        <h2 className={`mt-4 ${heading}`}>Why I Build Systems</h2>
        <div className="mt-7 max-w-[340px] mx-auto space-y-5 text-base leading-relaxed text-[#B8B0A8] text-pretty">
          <p>
            Engineering is in my blood. My grandfather was a submarine engineer, and I grew up knowing that every
            great outcome begins with a system designed well.
          </p>
          <p>
            Producing reality TV at scale taught me the same lesson: a great system keeps working when you step
            away.
          </p>
          <p>Now I build those systems for business owners, and it is the work I love.</p>
        </div>
        <div className="mt-9 mx-auto w-10 h-px bg-[#D4A853]/50" />
        <p className="mt-6 font-display text-lg leading-relaxed tracking-wide text-[#D4A853] text-balance">
          Do what you love and love what you do.
        </p>
      </section>

      {/* Ventures: real products, straight from lib/ventures.ts */}
      <section className="px-6 py-14 border-t border-[#3D3A35]/60 text-center">
        <p className={label}>What I Build Now</p>
        <h2 className={`mt-4 ${heading}`}>Real Products, Live Today</h2>
        <p className="mt-4 max-w-[320px] mx-auto text-base leading-relaxed text-[#B8B0A8] text-pretty">
          Companies I founded, and products I built with partners. Verza TV is on the App Store.
        </p>
        <ul className="mt-9 grid grid-cols-3 gap-x-3 gap-y-7">
          {featured.map((venture) => (
            <li key={venture.slug}>
              <Link href={`/ventures/${venture.slug}`} className="group block active:scale-[0.98] transition-transform">
                <span className="relative block aspect-[390/844] overflow-hidden rounded-[14px] border border-[#3D3A35] bg-black group-hover:border-[#D4A853]/50 transition-colors">
                  {venture.preview && (
                    <Image src={venture.preview} alt="" fill sizes="120px" className="object-cover object-top" />
                  )}
                </span>
                <span className="mt-3 block text-[13px] font-medium leading-snug text-[#FAF8F5] text-balance">
                  {venture.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/ventures"
          className="group mt-8 inline-flex items-center gap-1.5 min-h-[44px] px-2 text-[11px] font-medium tracking-[0.15em] uppercase text-[#D4A853] hover:text-[#E8C97A] transition-colors"
        >
          See All Ventures
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* How it works: three steps, outcome first */}
      <section className="px-6 py-14 border-t border-[#3D3A35]/60 text-center">
        <p className={label}>The Process</p>
        <h2 className={`mt-4 ${heading}`}>How We Work Together</h2>
        <ol className="mt-10 space-y-9">
          {steps.map((step, i) => (
            <li key={step.title}>
              <p className="font-display text-sm tracking-[0.15em] text-[#D4A853]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-base tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[300px] mx-auto text-[15px] leading-relaxed text-[#B8B0A8] text-pretty">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Questions a visitor has before booking */}
      <section className="px-6 py-14 border-t border-[#3D3A35]/60 text-center">
        <p className={label}>Questions</p>
        <h2 className={`mt-4 ${heading}`}>Before You Book</h2>
        <dl className="mt-8 divide-y divide-[#3D3A35]/60 border-y border-[#3D3A35]/60">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <dt className="text-base font-medium text-[#FAF8F5] text-balance">{faq.q}</dt>
              <dd className="mt-2 max-w-[340px] mx-auto text-[15px] leading-relaxed text-[#B8B0A8] text-pretty">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Final call to action */}
      <section className="px-6 pt-4 pb-16">
        <div className="px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
          <p className={label}>Your Next Step</p>
          <h2 className={`mt-4 ${heading}`}>Ready to Work Together?</h2>
          {/* Each sentence on its own line, so a narrow phone never splits one
              across the other. */}
          <p className="mt-4 font-display text-[15px] leading-relaxed tracking-wide text-[#D4A853]">
            <span className="block text-balance">Turn complexity into systems.</span>
            <span className="block text-balance">Turn systems into freedom.</span>
          </p>
          {/* One action here: the footer right below lists the call, text and
              email details, so a second contact button would only repeat it. */}
          <button type="button" onClick={openCalendly} className={`mt-8 ${primaryButton}`}>
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-5 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">Free · No obligation</p>
        </div>
      </section>

      <FooterSection />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </main>
  );
}
