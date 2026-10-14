"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { CalendlyModal } from "@/components/calendly-modal";
import { ContactForm, DirectContactList } from "@/components/landing/contact-modal";

/*
  The fastest ways to reach Jo, in order: book a call, then call, text or
  email, then the written application for people who prefer to write.

  Phone width at every screen size (see globals.css), so no breakpoint
  variants here: one centered column from 360px to 430px.
*/

const faqs = [
  {
    question: "Is the strategy call free?",
    answer: "Yes. The call is free, with no obligation. Pick any open time on the calendar.",
  },
  {
    question: "What happens after I send the form?",
    answer: "I read your answers myself. If there is a fit, I reach out to set up a call. If I am not the right person to help, I tell you that too.",
  },
  {
    question: "What can you help with?",
    answer: "AI automation, revenue systems, brand strategy, and video production. I built the Verza TV iPhone app, now on the App Store, and the apps for Peaceful Healing Rx and Evolve Longevity.",
  },
  {
    question: "Do you work with early stage founders?",
    answer: "Yes. I work with founders at every stage, including before revenue. The approach changes with your stage and goals.",
  },
  {
    question: "Where are you based?",
    answer: "Miami Beach, Florida. I work with clients anywhere by video call, and in person in Miami.",
  },
];

export default function ContactPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const openCalendly = () => setIsCalendlyOpen(true);

  return (
    <>
      <main className="min-h-screen bg-background pb-36">
        <header className="px-6 pt-14 pb-10 text-center">
          <Image
            src="/jotham-hall-headshot.jpg"
            alt="Jotham Hall"
            width={160}
            height={160}
            priority
            className="w-20 h-20 rounded-full object-cover border-2 border-[#D4A853]/30 shadow-[0_0_30px_rgba(212,168,83,0.15)] mx-auto mb-6"
          />
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Contact</p>
          <h1 className="font-display text-[2.25rem] leading-tight tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto mb-8">
            Book a free strategy call, or reach me directly. I answer every message myself.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </header>

        <section aria-labelledby="direct-heading" className="px-6 pb-12">
          <h2 id="direct-heading" className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] mb-4">
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
            Or reach me directly
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
          </h2>
          <DirectContactList />
          <p className="mt-4 text-[13px] text-[#8A837B] leading-relaxed text-balance text-center max-w-[300px] mx-auto">
            Calling is fastest. I reply to texts and emails within 24 hours on business days.
          </p>
        </section>

        <section id="write" aria-labelledby="write-heading" className="px-6 py-12 border-t border-[#3D3A35]/60">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Prefer to Write</p>
            <h2 id="write-heading" className="font-display text-[1.5rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3">
              Tell Me About Your Business
            </h2>
            <p className="text-[15px] text-[#B8B0A8] leading-relaxed text-balance max-w-[320px] mx-auto">
              Seven quick questions, about a minute. Most take one tap.
            </p>
          </div>
          <ContactForm onBook={openCalendly} />
        </section>

        <section aria-labelledby="faq-heading" className="px-6 py-12 border-t border-[#3D3A35]/60">
          <div className="text-center mb-8">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3">Questions</p>
            <h2 id="faq-heading" className="font-display text-[1.5rem] leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
              Before You Reach Out
            </h2>
          </div>
          <dl className="border-y border-[#3D3A35]/60 divide-y divide-[#3D3A35]/60">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="text-base font-medium text-[#FAF8F5] mb-2">{faq.question}</dt>
                <dd className="text-[15px] text-[#B8B0A8] leading-relaxed text-pretty">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-6 mb-16 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
          <h2 className="font-display text-lg tracking-[0.12em] uppercase text-balance text-[#FAF8F5] mb-3">Ready When You Are</h2>
          <p className="text-sm text-[#B8B0A8] leading-relaxed text-balance mb-7 max-w-[280px] mx-auto">
            Pick a time that suits you. The call is free.
          </p>
          <button
            type="button"
            onClick={openCalendly}
            className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Book a Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <FooterSection />
      </main>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
