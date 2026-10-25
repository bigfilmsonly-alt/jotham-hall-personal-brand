"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Phone, MessageSquare, Mail, BarChart3, X } from "lucide-react";
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

const ventureLink =
  "inline-block text-[#B8B0A8] underline decoration-[#3D3A35] underline-offset-4 hover:text-[#D4A853] transition-colors pointer-coarse:-mt-[15px] pointer-coarse:-mb-[10px] pointer-coarse:pt-[15px] pointer-coarse:pb-[10px]";

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
  { label: "Call", value: "(510) 680-9100", href: "tel:+15106809100", icon: Phone },
  { label: "Text", value: "(510) 693-4083", href: "sms:+15106934083", icon: MessageSquare },
  { label: "Email", value: "bigfilmsonly@gmail.com", href: "mailto:bigfilmsonly@gmail.com", icon: Mail },
];

/*
  Call, text and email as one row of three, 48px tall. On a phone each cell is
  its verb, one tap from the call, the text or the email. On a desktop, where
  a tel: or sms: link usually does nothing, each cell also shows its number or
  address under the verb, and the row takes the proof row's width (max-w-xl,
  the email's cell a little wider) so every value fits on one line.
*/
function ContactRow({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-2 md:grid-cols-[1fr_1fr_1.2fr] ${className}`}>
      {contactLinks.map(({ label, value, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={`${label} ${value}`}
          className="h-12 flex items-center justify-center gap-2 border border-[#3D3A35] text-sm text-[#FAF8F5] hover:border-[#D4A853]/40 transition-colors pointer-coarse:active:scale-[0.97] md:flex-col md:gap-0.5"
        >
          <span className="flex items-center gap-2 md:gap-1.5 md:text-xs md:leading-4 md:tracking-[0.15em] md:uppercase md:text-[#8A837B]">
            <Icon aria-hidden="true" className="w-4 h-4 text-[#D4A853] md:w-3.5 md:h-3.5" />
            {label}
          </span>
          <span className="hidden md:block md:leading-5 md:tabular-nums">{value}</span>
        </a>
      ))}
    </div>
  );
}

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
      { text: "Most of it runs without me. I oversee.", score: 3 },
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
      { text: "Very clear. Clients pay a premium for it.", score: 4 },
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
  // The option chosen on the current question, shown in gold. With a mouse
  // it waits here for Continue; after Back it shows the earlier answer.
  const [selected, setSelected] = useState<number | null>(null);
  // Which way the step slides in: forward from the right, Back from the left.
  const [stepDirection, setStepDirection] = useState<"forward" | "back">("forward");

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = results.find((r) => totalScore >= r.range[0] && totalScore <= r.range[1]) || results[0];

  // answers[i] is question i's score, so answers.length is always the step
  // being shown, and the five scores arrive in order exactly as before.
  const handleAnswer = (score: number) => {
    const newAnswers = [...answers.slice(0, quizStep), score];
    setAnswers(newAnswers);
    setSelected(null);
    setStepDirection("forward");
    if (newAnswers.length < questions.length) {
      setQuizStep(newAnswers.length);
    } else {
      setQuizStatus("capture");
    }
  };

  // A tap on a touch screen answers and moves on at once, as before. A click
  // with a mouse or trackpad only selects, and Continue moves on, so one stray
  // click on a desktop is never an answer.
  const chooseOption = (index: number) => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setSelected(index);
      return;
    }
    handleAnswer(questions[quizStep].options[index].score);
  };

  const continueQuiz = () => {
    if (selected !== null) handleAnswer(questions[quizStep].options[selected].score);
  };

  // Back one question, from question 2 on or from the results form, with the
  // earlier answer shown selected so a mis-tap is easy to see and change.
  const goBack = () => {
    const step = quizStatus === "capture" ? questions.length - 1 : quizStep - 1;
    if (step < 0) return;
    const previous = questions[step].options.findIndex((option) => option.score === answers[step]);
    setSelected(previous < 0 ? null : previous);
    setAnswers(answers.slice(0, step));
    setStepDirection("back");
    setQuizStep(step);
    setQuizStatus("quiz");
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
    setSelected(null);
    setStepDirection("forward");
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
            <p className="text-xs tracking-[0.15em] uppercase text-[#8A837B]">
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
              <div
                className={`w-full animate-in fade-in duration-300 ${stepDirection === "back" ? "slide-in-from-left-4" : "slide-in-from-right-4"}`}
                key={`${quizStatus}-${quizStep}`}
              >
                {quizStatus === "quiz" && (
                  <div>
                    <h2 className="text-[1.375rem] leading-snug font-medium text-center text-balance text-[#FAF8F5] mb-8 md:text-3xl md:mb-10">
                      {questions[quizStep].question}
                    </h2>
                    <div className="space-y-2.5 md:space-y-3">
                      {questions[quizStep].options.map((opt, i) => {
                        const isSelected = selected === i;
                        return (
                          <button
                            type="button"
                            key={opt.text}
                            onClick={() => chooseOption(i)}
                            aria-pressed={isSelected}
                            className={`w-full min-h-14 flex items-center gap-4 px-4 py-3.5 text-left border pointer-coarse:active:scale-[0.98] transition-colors md:min-h-16 md:gap-5 md:px-5 md:py-4 ${
                              isSelected
                                ? "bg-[#D4A853]/10 border-[#D4A853]"
                                : "bg-[#1A1A1A] border-[#3D3A35] hover:border-[#D4A853]/50 active:border-[#D4A853] active:bg-[#D4A853]/10"
                            }`}
                          >
                            <span
                              className={`shrink-0 w-7 h-7 flex items-center justify-center border text-xs font-medium transition-colors md:w-8 md:h-8 ${
                                isSelected ? "border-[#D4A853] bg-[#D4A853] text-[#0D0D0D]" : "border-[#3D3A35] text-[#D4A853]"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-[15px] leading-snug text-pretty text-[#FAF8F5] md:text-[17px]">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                    {/* Back from question 2 on (held in place, unseen, on the
                        first so the options never shift). Continue shows only
                        with a mouse or trackpad, where a click just selects. */}
                    <div className="mt-5 flex items-center justify-between gap-3 md:mt-8">
                      <button
                        type="button"
                        onClick={goBack}
                        className={`-ml-3 inline-flex h-11 items-center gap-2 px-3 text-[13px] tracking-wide text-[#B8B0A8] hover:text-[#FAF8F5] transition-colors md:text-sm ${
                          quizStep === 0 ? "invisible" : ""
                        }`}
                      >
                        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={continueQuiz}
                        disabled={selected === null}
                        className="hidden pointer-fine:inline-flex h-12 items-center gap-2 px-8 bg-[#D4A853] text-[#0D0D0D] text-[15px] font-medium tracking-wide enabled:hover:bg-[#E8C97A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continue
                        <ArrowRight aria-hidden="true" className="w-4 h-4" />
                      </button>
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
                    <p className="text-[15px] leading-relaxed text-balance text-[#B8B0A8] mb-8 md:text-[17px] md:mb-10">
                      Enter your info to see your personalized assessment.
                    </p>
                    <form onSubmit={handleQuizCapture} className="text-left space-y-5 md:mx-auto md:max-w-md md:space-y-6">
                      <label className="block">
                        <span className="text-xs tracking-[0.15em] uppercase text-[#8A837B]">Name</span>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={quizName}
                          onChange={(e) => setQuizName(e.target.value)}
                          className="mt-1 w-full bg-transparent border-b border-[#3D3A35] focus:border-[#D4A853] text-[17px] text-[#FAF8F5] py-2.5 outline-none transition-colors placeholder:text-[#5C5750]"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs tracking-[0.15em] uppercase text-[#8A837B]">Email</span>
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
                        className="w-full !mt-8 py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:!mt-10 md:py-4 md:text-[15px]"
                      >
                        See My Results <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                    {/* Back to question 5, its answer shown selected. */}
                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-4 inline-flex h-11 items-center gap-2 px-3 text-[13px] tracking-wide text-[#B8B0A8] hover:text-[#FAF8F5] transition-colors md:mt-5 md:text-sm"
                    >
                      <ArrowLeft aria-hidden="true" className="w-4 h-4" />
                      Back
                    </button>
                  </div>
                )}

                {quizStatus === "saving" && (
                  <p className="text-center text-[13px] tracking-[0.15em] uppercase text-[#8A837B] animate-pulse md:text-sm">
                    Analyzing your results...
                  </p>
                )}

                {quizStatus === "result" && (
                  <div className="text-center">
                    <p className="text-xs tracking-[0.15em] uppercase text-[#D4A853] mb-3 md:mb-4">
                      Your Score: {totalScore}/{questions.length * 4}
                    </p>
                    <h2 className="font-display text-[1.75rem] leading-tight tracking-[0.12em] uppercase text-balance mb-3 md:text-4xl md:mb-4">
                      {result.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#B8B0A8] text-balance mb-5 md:text-[17px] md:mb-6">{result.description}</p>
                    <div className="bg-[#1A1A1A] border border-[#3D3A35] px-5 py-4 mb-5 space-y-3 md:px-8 md:py-6 md:mb-6 md:space-y-4">
                      <div>
                        <p className="text-xs tracking-[0.15em] uppercase text-[#8A837B]">Recommended</p>
                        <p className="mt-1 text-[15px] leading-snug font-medium text-[#FAF8F5] md:mt-1.5 md:text-[17px]">{result.recommendation}</p>
                      </div>
                      <div className="pt-3 border-t border-[#3D3A35]/60 md:pt-4">
                        <p className="text-xs tracking-[0.15em] uppercase text-[#8A837B]">Key Insight</p>
                        <p className="mt-1 text-[15px] leading-snug text-[#FAF8F5] text-balance md:mt-1.5 md:text-[17px]">{result.urgency}</p>
                      </div>
                    </div>
                    {/* On a desktop the actions match the home screen's width. */}
                    <button
                      onClick={() => setIsCalendlyOpen(true)}
                      className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:mx-auto md:max-w-[22rem] md:py-4 md:text-[15px]"
                    >
                      Book a Strategy Call <ArrowRight className="w-4 h-4" />
                    </button>
                    <ContactRow className="mt-2.5 md:mx-auto md:max-w-xl" />
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="mt-2 inline-flex h-11 items-center px-6 text-[13px] tracking-wide text-[#8A837B] hover:text-[#FAF8F5] transition-colors md:mt-3 md:text-sm"
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
            {/* 12px on a phone: at 13px the line no longer fits a 360px screen. */}
            <p className="mt-2 pl-[0.15em] text-xs leading-4 font-medium tracking-[0.15em] uppercase text-[#D4A853] md:mt-2.5 md:pl-[0.22em] md:text-[13px] md:leading-5 md:tracking-[0.22em]">
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
                    <p className="mt-1.5 text-xs tracking-[0.12em] uppercase text-[#8A837B] md:mt-2.5">{stat.label}</p>
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
            {/* On a touch screen each link's tap area is 44px tall: padding
                with a matching negative margin, so the line does not move.
                More of it sits above, over the proof row's own padding, than
                below, where the gold button starts at least 10px away. */}
            <p className="mt-(--gap-m) text-[13px] text-[#8A837B] [@media(max-height:560px)]:hidden md:mt-(--gap-m-d) md:text-[15px]">
              I built the{" "}
              <Link href="/ventures/verza-tv" className={ventureLink}>
                Verza TV
              </Link>{" "}
              and{" "}
              <Link href="/ventures/peaceful-healing-rx" className={ventureLink}>
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
              className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] md:mx-auto md:max-w-[22rem] md:py-4 md:text-[15px]"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-1.5 pl-[0.15em] text-[13px] leading-4 tracking-[0.15em] uppercase text-[#8A837B] [@media(max-height:600px)]:hidden md:mt-2">
              Free · 30 minutes
            </p>

            {/* Opens in place, at the same height, so nothing below moves. On a
                desktop the open row widens to the proof row's width to show
                each number and the email address. */}
            <div
              className={`mt-(--gap-s) h-12 md:mt-(--gap-s-d) md:mx-auto ${showContact ? "md:max-w-xl" : "md:max-w-[22rem]"}`}
            >
              {showContact ? (
                <ContactRow className="animate-in fade-in duration-200" />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowContact(true)}
                  className="w-full h-full border border-[#3D3A35] text-sm font-medium text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call, Text, or Email
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setQuizActive(true)}
              className="mx-auto w-fit min-h-11 px-3 flex items-center gap-2 text-[13px] text-[#B8B0A8] hover:text-[#D4A853] transition-colors md:text-sm"
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#D4A853]" />
              <span className="underline decoration-[#3D3A35] underline-offset-4">Take the Free Business Assessment</span>
            </button>

            {/* Build credit. This screen renders no footer, so the credit sits here
                to match the inner pages. JothamHall.com is this site: plain text.
                On a touch screen the link's tap area is 44px tall (padding with
                a matching negative margin), mostly above the line: it sits
                18px under the assessment button, so the two tap areas never
                overlap, and only 10px of it reaches into the space below. */}
            <p className="text-[11px] text-[#8A837B] text-balance [@media(max-height:600px)]:hidden pointer-coarse:mt-[18px] md:text-xs">
              Built by JothamHall.com &middot; Developed by{" "}
              <a
                href="https://successupgrade.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#B8B0A8] hover:text-[#D4A853] transition-colors pointer-coarse:-mt-[18px] pointer-coarse:-mb-[10px] pointer-coarse:pt-[18px] pointer-coarse:pb-[10px]"
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
