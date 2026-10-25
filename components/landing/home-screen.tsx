"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MessageSquare, Mail, BarChart3, X } from "lucide-react";
import { CalendlyModal } from "../calendly-modal";
import { saveRecord } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

/*
  The home screen is one screen: no scrolling on a phone or on a desktop.
  Spacing and the photo scale with the screen HEIGHT (dvh, clamped), so the
  same composition fits 375x667 and fills 390x844. Below 600px of height (an
  iPhone SE in Safari) the three least needed lines step aside via max-height
  queries. Anything shorter still scrolls inside its own area rather than
  being cut off.

  The base classes are the approved phone design. From md: (768px wide) up the
  page fills the window, so md: variants give the same column a desktop size:
  a second set of height based values (the -d variables below) grows the
  photo, the name, the stats and the gaps from a 720px tall window to a 1080px
  one, and the proof row and the buttons sit at a centered desktop width
  instead of spanning the window.
*/

// Facts from app/credits/credits-content.tsx: 50+ credits, 15 years, 7 networks.
const stats = [
  { value: "50+", label: "TV Credits" },
  { value: "15", label: "Years in TV" },
  { value: "7", label: "Networks" },
];
const networks = ["Hallmark", "Food Network", "NBC", "MTV", "VH1"];

// The bottom tab bar (components/landing/mobile-tab-bar.tsx) is h-20 plus a 1px border.
const TAB_BAR_CLEARANCE = "calc(5rem + 1px + env(safe-area-inset-bottom, 0px))";

// Each value runs in a straight line from a 667px tall screen (iPhone SE, and
// about what Safari leaves on a 390x844 iPhone) to an 844px one, then clamps.
// The -d values are the desktop set, used only by md: classes. Each runs in a
// straight line from a 720px tall window (1280x720) to a 1080px one
// (1920x1080), clamped at the phone's smallest size below and the desktop
// size above. Unused on a phone, so they change nothing there.
const fluid = {
  "--photo": "clamp(72px, calc(27.1dvh - 101px), 136px)",
  "--gap-s": "clamp(4px, calc(2.26dvh - 9px), 12px)",
  "--gap-m": "clamp(8px, calc(5.65dvh - 27.7px), 22px)",
  "--gap-l": "clamp(10px, calc(7.9dvh - 38.7px), 32px)",
  "--photo-d": "clamp(72px, calc(26.67dvh - 88px), 200px)",
  "--name-d": "clamp(1.625rem, calc(6.667dvh - 8px), 4rem)",
  "--value-d": "clamp(1.0625rem, calc(1.111dvh + 12px), 1.5rem)",
  "--stat-d": "clamp(1.375rem, calc(2.778dvh + 10px), 2.5rem)",
  "--gap-s-d": "clamp(4px, calc(1.944dvh - 7px), 14px)",
  "--gap-m-d": "clamp(8px, calc(3.889dvh - 18px), 24px)",
  "--gap-l-d": "clamp(10px, calc(6.111dvh - 28px), 38px)",
} as CSSProperties;

const contactLinks = [
  { label: "Call", href: "tel:+15106809100", detail: "Call (510) 680-9100", icon: Phone },
  { label: "Text", href: "sms:+15106934083", detail: "Text (510) 693-4083", icon: MessageSquare },
  { label: "Email", href: "mailto:bigfilmsonly@gmail.com", detail: "Email bigfilmsonly@gmail.com", icon: Mail },
];

const questions = [
  {
    question: "How do you currently get new clients?",
    options: [
      { text: "Word of mouth only", score: 1 },
      { text: "Some social media, mostly referrals", score: 2 },
      { text: "Paid ads + organic content", score: 3 },
      { text: "Automated funnels and systems", score: 4 },
    ],
  },
  {
    question: "How much of your business runs without you?",
    options: [
      { text: "Nothing. I touch everything.", score: 1 },
      { text: "A few things are delegated", score: 2 },
      { text: "Most things run, I oversee", score: 3 },
      { text: "Almost everything is automated", score: 4 },
    ],
  },
  {
    question: "What's your biggest time drain right now?",
    options: [
      { text: "Manual admin and repetitive tasks", score: 1 },
      { text: "Sales calls and following up with leads", score: 2 },
      { text: "Content creation and marketing", score: 3 },
      { text: "Managing my team", score: 4 },
    ],
  },
  {
    question: "How clear is your brand positioning?",
    options: [
      { text: "I struggle to explain what I do", score: 1 },
      { text: "People get it, but it's not sharp", score: 2 },
      { text: "Pretty clear, could be stronger", score: 3 },
      { text: "Crystal clear, commands premium", score: 4 },
    ],
  },
  {
    question: "What's your current tech stack?",
    options: [
      { text: "Spreadsheets and manual processes", score: 1 },
      { text: "A few tools, not connected", score: 2 },
      { text: "CRM + some automation", score: 3 },
      { text: "Fully integrated AI systems", score: 4 },
    ],
  },
];

// `type` and `range` are what gets saved and scored; the words are display only.
const results = [
  { type: "foundation", title: "Foundation Stage", range: [5, 9], description: "You're running on hustle. No systems, no automation, no leverage. You need a complete business infrastructure overhaul.", recommendation: "AI Automation + Revenue Systems", urgency: "Every task you still do by hand is time you could spend growing the business." },
  { type: "growth", title: "Growth Stage", range: [10, 14], description: "You've got momentum but you're the bottleneck. Some pieces are in place, but nothing is working together.", recommendation: "Revenue Systems + Brand Strategy", urgency: "Connected systems let you grow without adding more hours." },
  { type: "scale", title: "Scale Stage", range: [15, 17], description: "Strong foundation. Now it's about optimization, automation, and removing yourself from daily operations.", recommendation: "Fractional COO + AI Automation", urgency: "The next step is a business that runs without you in every decision." },
  { type: "optimize", title: "Optimization Stage", range: [18, 20], description: "You're operating at a high level. The opportunity is in refining what works and expanding into new revenue channels.", recommendation: "Strategic Consulting + VibeCoding", urgency: "Let's find the gains you're still leaving on the table." },
];

export function HomeScreen() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizEmail, setQuizEmail] = useState("");
  const [quizName, setQuizName] = useState("");
  const [quizStatus, setQuizStatus] = useState<"quiz" | "capture" | "saving" | "result">("quiz");

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = results.find((r) => totalScore >= r.range[0] && totalScore <= r.range[1]) || results[0];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (newAnswers.length < questions.length) {
      setQuizStep((s) => s + 1);
    } else {
      setQuizStatus("capture");
    }
  };

  const handleQuizCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuizStatus("saving");
    const finalScore = answers.reduce((a, b) => a + b, 0);
    const finalResult = results.find((r) => finalScore >= r.range[0] && finalScore <= r.range[1]) || results[0];
    const savedQuiz = await saveRecord("quiz_results", { email: quizEmail, name: quizName || null, score: finalScore, result_type: finalResult.type, answers: { responses: answers.map((a, i) => ({ question: questions[i].question, score: a })) } });
    const saved = await saveRecord("email_captures", { email: quizEmail, source: "quiz" });
    void savedQuiz;
    void saved;
    setQuizStatus("result");
    trackEvent.quizComplete(finalScore, finalResult.type);
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "quiz",
        data: { name: quizName, email: quizEmail, score: finalScore, result_type: finalResult.type },
      }),
    }).catch(() => {});
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setQuizStep(0);
    setAnswers([]);
    setQuizEmail("");
    setQuizName("");
    setQuizStatus("quiz");
  };

  // Full screen quiz. It sits above the tab bar, so it gets the whole height.
  // On a desktop the header, the progress bar and the questions share one
  // centered column (max-w-2xl) instead of running edge to edge.
  if (quizActive) {
    const progress = quizStatus === "quiz" ? (quizStep / questions.length) * 100 : 100;
    return (
      <>
        <div className="fixed inset-0 z-[1001] flex flex-col bg-[#0D0D0D] text-[#FAF8F5]">
          <div className="shrink-0 flex items-center justify-between h-14 pl-6 pr-3 md:mx-auto md:w-full md:max-w-2xl md:h-16">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">
              {quizStatus === "quiz" ? `Question ${quizStep + 1} of ${questions.length}` : "Business Assessment"}
            </p>
            <button
              onClick={resetQuiz}
              aria-label="Close the assessment"
              className="w-11 h-11 flex items-center justify-center text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="shrink-0 px-6 md:mx-auto md:w-full md:max-w-2xl">
            <div className="h-0.5 w-full bg-[#3D3A35]/60">
              <div className="h-full bg-[#D4A853] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="min-h-full flex flex-col justify-center px-6 py-6 md:mx-auto md:max-w-2xl md:py-10">
              <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300" key={`${quizStatus}-${quizStep}`}>
                {quizStatus === "quiz" && (
                  <div>
                    <h2 className="text-[1.375rem] leading-snug font-medium text-center text-balance text-[#FAF8F5] mb-8 md:text-3xl md:mb-10">
                      {questions[quizStep].question}
                    </h2>
                    <div className="space-y-2.5 md:space-y-3">
                      {questions[quizStep].options.map((opt, i) => (
                        <button
                          key={opt.text}
                          onClick={() => handleAnswer(opt.score)}
                          className="w-full min-h-14 flex items-center gap-4 px-4 py-3.5 text-left bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/50 active:border-[#D4A853] active:bg-[#D4A853]/10 active:scale-[0.98] transition-colors md:min-h-16 md:gap-5 md:px-5 md:py-4"
                        >
                          <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-[#3D3A35] text-[11px] font-medium text-[#D4A853] md:w-8 md:h-8 md:text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-[15px] leading-snug text-[#FAF8F5] md:text-[17px]">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStatus === "capture" && (
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-[#D4A853]/50 flex items-center justify-center md:w-16 md:h-16 md:mb-8">
                      <BarChart3 className="w-6 h-6 text-[#D4A853] md:w-7 md:h-7" />
                    </div>
                    <h2 className="font-display text-2xl leading-tight tracking-[0.12em] uppercase text-balance mb-3 md:text-4xl md:mb-4">
                      Your Results Are Ready
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#B8B0A8] mb-8 md:text-[17px] md:mb-10">
                      Enter your info to see your personalized assessment.
                    </p>
                    <form onSubmit={handleQuizCapture} className="text-left space-y-5 md:mx-auto md:max-w-md md:space-y-6">
                      <label className="block">
                        <span className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">Name</span>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={quizName}
                          onChange={(e) => setQuizName(e.target.value)}
                          className="mt-1 w-full bg-transparent border-b border-[#3D3A35] focus:border-[#D4A853] text-[17px] text-[#FAF8F5] py-2.5 outline-none transition-colors placeholder:text-[#5C5750]"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">Email</span>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={quizEmail}
                          onChange={(e) => setQuizEmail(e.target.value)}
                          className="mt-1 w-full bg-transparent border-b border-[#3D3A35] focus:border-[#D4A853] text-[17px] text-[#FAF8F5] py-2.5 outline-none transition-colors placeholder:text-[#5C5750]"
                          autoFocus
                        />
                      </label>
                      <button
                        type="submit"
                        className="w-full !mt-8 py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:!mt-10 md:py-4 md:text-[15px]"
                      >
                        See My Results <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                {quizStatus === "saving" && (
                  <p className="text-center text-[13px] tracking-[0.15em] uppercase text-[#8A837B] animate-pulse md:text-sm">
                    Analyzing your results...
                  </p>
                )}

                {quizStatus === "result" && (
                  <div className="text-center">
                    <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:text-xs md:mb-4">
                      Your Score: {totalScore}/{questions.length * 4}
                    </p>
                    <h2 className="font-display text-[1.75rem] leading-tight tracking-[0.12em] uppercase text-balance mb-3 md:text-4xl md:mb-4">
                      {result.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#B8B0A8] text-balance mb-5 md:text-[17px] md:mb-6">{result.description}</p>
                    <div className="bg-[#1A1A1A] border border-[#3D3A35] px-5 py-4 mb-5 space-y-3 md:px-8 md:py-6 md:mb-6 md:space-y-4">
                      <div>
                        <p className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">Recommended</p>
                        <p className="mt-1 text-[15px] leading-snug font-medium text-[#FAF8F5] md:mt-1.5 md:text-[17px]">{result.recommendation}</p>
                      </div>
                      <div className="pt-3 border-t border-[#3D3A35]/60 md:pt-4">
                        <p className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B] md:text-xs">Key Insight</p>
                        <p className="mt-1 text-[15px] leading-snug text-[#FAF8F5] text-balance md:mt-1.5 md:text-[17px]">{result.urgency}</p>
                      </div>
                    </div>
                    {/* On a desktop the actions match the home screen's width. */}
                    <button
                      onClick={() => setIsCalendlyOpen(true)}
                      className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:mx-auto md:max-w-[22rem] md:py-4 md:text-[15px]"
                    >
                      Book a Strategy Call <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-3 gap-2 mt-2.5 md:mx-auto md:max-w-[22rem]">
                      {contactLinks.map(({ label, href, detail, icon: Icon }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={detail}
                          title={detail}
                          className="h-11 flex items-center justify-center gap-2 border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.97]"
                        >
                          <Icon className="w-4 h-4 text-[#D4A853]" />
                          {label}
                        </a>
                      ))}
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="mt-2 px-6 py-2.5 text-[13px] tracking-wide text-[#8A837B] hover:text-[#FAF8F5] transition-colors md:mt-3 md:text-sm"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      </>
    );
  }

  return (
    <main
      className="fixed inset-0 flex flex-col bg-background text-foreground"
      style={{ paddingBottom: TAB_BAR_CLEARANCE }}
    >
      <div itemScope itemType="https://schema.org/Person" className="sr-only">
        <meta itemProp="name" content="Jotham Hall" />
        <meta itemProp="jobTitle" content="AI Systems Architect, Television Producer, Founder" />
        <meta itemProp="description" content="Jotham Hall is an entrepreneur, television producer, and technology founder. 50+ TV credits. AI systems architect. VibeCoding pioneer." />
        <link itemProp="url" href="https://jothamhall.com" />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none]">
        <div
          className="min-h-full flex flex-col justify-center px-6 py-(--gap-m) text-center md:px-10 md:py-(--gap-m-d)"
          style={fluid}
        >
          {/* Who: photo, name, role */}
          <div className="animate-in fade-in zoom-in-95 duration-700 motion-reduce:animate-none">
            <Image
              src="/jotham-hall-headshot-480.jpg"
              alt="Jotham Hall"
              width={272}
              height={272}
              priority
              className="size-(--photo) mx-auto rounded-full object-cover ring-1 ring-[#D4A853]/45 ring-offset-[5px] ring-offset-[#0D0D0D] shadow-[0_0_44px_rgba(212,168,83,0.14)] md:size-(--photo-d) md:ring-offset-[6px] md:shadow-[0_0_80px_rgba(212,168,83,0.16)]"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-1 duration-700 delay-100 fill-mode-both motion-reduce:animate-none">
            {/* pl matches the tracking, so letterspaced lines sit exactly on center */}
            <h1 className="mt-(--gap-l) pl-[0.12em] font-display text-[clamp(1.625rem,3.6dvh,2rem)] leading-[1.1] tracking-[0.12em] uppercase text-[#FAF8F5] md:mt-(--gap-l-d) md:text-(length:--name-d)">
              Jotham Hall
            </h1>
            <p className="mt-2 pl-[0.15em] text-[11px] font-medium tracking-[0.15em] uppercase text-[#D4A853] md:mt-2.5 md:pl-[0.22em] md:text-[13px] md:tracking-[0.22em]">
              AI Systems Architect · TV Producer
            </p>

            {/* Why book: what I do for you. One line on a desktop. */}
            <p className="mt-(--gap-m) mx-auto max-w-[21.5rem] text-[clamp(1.0625rem,2.3dvh,1.25rem)] leading-snug text-[#FAF8F5]/90 text-balance md:mt-(--gap-m-d) md:max-w-3xl md:text-(length:--value-d)">
              I build AI systems and apps that bring in clients and save you time.
            </p>
          </div>

          {/* Proof: network TV, then products shipped (lib/ventures.ts) */}
          <div className="mt-(--gap-l) animate-in fade-in duration-700 delay-200 fill-mode-both motion-reduce:animate-none md:mt-(--gap-l-d) md:mx-auto md:w-full md:max-w-xl">
            <div className="border-y border-[#3D3A35]/60 py-(--gap-m) md:py-(--gap-m-d)">
              <ul className="grid grid-cols-3">
                {stats.map((stat, i) => (
                  <li key={stat.label} className={i > 0 ? "border-l border-[#3D3A35]/60" : undefined}>
                    <p className="font-display text-[1.375rem] leading-none text-[#FAF8F5] md:text-(length:--stat-d)">{stat.value}</p>
                    <p className="mt-1.5 text-[11px] tracking-[0.12em] uppercase text-[#8A837B] md:mt-2.5 md:text-xs">{stat.label}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-(--gap-m) text-[13px] text-[#B8B0A8] md:mt-(--gap-m-d) md:text-[15px]">
                {networks.map((network, i) => (
                  <span key={network}>
                    {i > 0 && (
                      <>
                        <span className="sr-only">, </span>
                        <span aria-hidden="true" className="px-1.5 text-[#5C5750] md:px-2.5">·</span>
                      </>
                    )}
                    {network}
                  </span>
                ))}
              </p>
            </div>
            <p className="mt-(--gap-m) text-[13px] text-[#8A837B] [@media(max-height:560px)]:hidden md:mt-(--gap-m-d) md:text-[15px]">
              I built the{" "}
              <Link href="/ventures/verza-tv" className="text-[#B8B0A8] underline decoration-[#3D3A35] underline-offset-4 hover:text-[#D4A853] transition-colors">
                Verza TV
              </Link>{" "}
              and{" "}
              <Link href="/ventures/peaceful-healing-rx" className="text-[#B8B0A8] underline decoration-[#3D3A35] underline-offset-4 hover:text-[#D4A853] transition-colors">
                Peaceful Healing Rx
              </Link>{" "}
              apps.
            </p>
          </div>

          {/* Actions: one dominant, two quieter. On a desktop the two buttons
              share one centered width instead of spanning the window. */}
          <div className="mt-(--gap-l) animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both motion-reduce:animate-none md:mt-(--gap-l-d)">
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] md:mx-auto md:max-w-[22rem] md:py-4 md:text-[15px]"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-1.5 pl-[0.15em] text-[11px] tracking-[0.15em] uppercase text-[#8A837B] [@media(max-height:600px)]:hidden md:mt-2 md:text-xs">
              Free · 30 minutes
            </p>

            {/* Opens in place, at the same height, so nothing below moves. */}
            <div className="mt-(--gap-s) h-12 md:mt-(--gap-s-d) md:mx-auto md:max-w-[22rem]">
              {showContact ? (
                <div className="grid grid-cols-3 gap-2 h-full animate-in fade-in duration-200">
                  {contactLinks.map(({ label, href, detail, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={detail}
                      title={detail}
                      className="flex items-center justify-center gap-2 border border-[#3D3A35] text-sm text-[#FAF8F5] hover:border-[#D4A853]/40 transition-colors active:scale-[0.97]"
                    >
                      <Icon className="w-4 h-4 text-[#D4A853]" />
                      {label}
                    </a>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full h-full border border-[#3D3A35] text-sm font-medium text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call, Text, or Email
                </button>
              )}
            </div>

            <button
              onClick={() => setQuizActive(true)}
              className="mx-auto px-3 py-2.5 inline-flex items-center gap-2 text-[13px] text-[#B8B0A8] hover:text-[#D4A853] transition-colors md:py-2 md:text-sm"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#D4A853]" />
              <span className="underline decoration-[#3D3A35] underline-offset-4">Take the Free Business Assessment</span>
            </button>

            {/* Build credit. This screen renders no footer, so the credit sits here
                to match the inner pages. JothamHall.com is this site: plain text. */}
            <p className="text-[11px] text-[#8A837B]/80 text-balance [@media(max-height:600px)]:hidden md:text-xs">
              Built by JothamHall.com &middot; Developed by{" "}
              <a
                href="https://successupgrade.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4A853] transition-colors"
              >
                SuccessUpgrade.ai
              </a>
            </p>
          </div>
        </div>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </main>
  );
}
