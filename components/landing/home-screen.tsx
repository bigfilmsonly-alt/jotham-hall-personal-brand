"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone, MessageSquare, Mail, BarChart3, Check, X } from "lucide-react";
import { ContactModal } from "./contact-modal";
import { CalendlyModal } from "../calendly-modal";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

const networks = ["Hallmark", "Food Network", "VH1", "MTV", "USA Network"];

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
      { text: "Sales calls and lead follow-up", score: 2 },
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
      { text: "Fully integrated AI-powered systems", score: 4 },
    ],
  },
];

const results = [
  { type: "foundation", title: "Foundation Stage", range: [5, 9], description: "You're running on hustle. No systems, no automation, no leverage. You need a complete business infrastructure overhaul.", recommendation: "AI Automation + Revenue Systems", urgency: "You're leaving 60-80% of potential revenue on the table." },
  { type: "growth", title: "Growth Stage", range: [10, 14], description: "You've got momentum but you're the bottleneck. Some pieces are in place, but nothing is working together.", recommendation: "Revenue Systems + Brand Strategy", urgency: "With the right systems, you could 3x in 90 days." },
  { type: "scale", title: "Scale Stage", range: [15, 17], description: "Strong foundation. Now it's about optimization, automation, and removing yourself from daily operations.", recommendation: "Fractional COO + AI Automation", urgency: "You're one system away from a breakthrough." },
  { type: "optimize", title: "Optimization Stage", range: [18, 20], description: "You're operating at a high level. The opportunity is in fine-tuning and expanding into new revenue channels.", recommendation: "Strategic Consulting + VibeCoding", urgency: "Let's find the hidden 20% you're missing." },
];

export function HomeScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
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

  useEffect(() => { setIsVisible(true); }, []);

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
    await supabase.from("quiz_results").insert({ email: quizEmail, name: quizName || null, score: finalScore, result_type: finalResult.type, answers: { responses: answers.map((a, i) => ({ question: questions[i].question, score: a })) } });
    await supabase.from("email_captures").upsert({ email: quizEmail, source: "quiz" }, { onConflict: "email" });
    setQuizStatus("result");
    trackEvent.quizComplete(finalScore, finalResult.type);
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setQuizStep(0);
    setAnswers([]);
    setQuizEmail("");
    setQuizName("");
    setQuizStatus("quiz");
  };

  // Full-screen quiz modal
  if (quizActive) {
    const progress = quizStatus === "quiz" ? (quizStep / questions.length) * 100 : 100;
    return (
      <div className="fixed inset-0 z-[1001] bg-background flex flex-col">
        <div className="shrink-0 flex items-center justify-between px-6 py-4">
          <span className="font-display text-sm text-foreground/40">
            {quizStatus === "quiz" ? `Question ${quizStep + 1} of ${questions.length}` : ""}
          </span>
          <button onClick={resetQuiz} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="shrink-0 px-6"><div className="h-0.5 bg-foreground/10 w-full"><div className="h-full bg-foreground transition-all duration-500 ease-out" style={{ width: `${progress}%` }} /></div></div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-300" key={`${quizStatus}-${quizStep}`}>
            {quizStatus === "quiz" && (
              <div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-8">{questions[quizStep].question}</h2>
                <div className="space-y-2">
                  {questions[quizStep].options.map((opt, i) => (
                    <button key={opt.text} onClick={() => handleAnswer(opt.score)} className="w-full text-left px-5 py-4 border border-foreground/10 hover:border-foreground/30 transition-all duration-150 flex items-center justify-between active:scale-[0.98] active:bg-foreground active:text-background">
                      <span className="text-sm font-medium">{opt.text}</span>
                      <span className="text-xs font-mono text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {quizStatus === "capture" && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-foreground flex items-center justify-center"><BarChart3 className="w-7 h-7" /></div>
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-3">Your results are ready.</h2>
                <p className="text-muted-foreground text-sm mb-8">Enter your info to see your personalized assessment.</p>
                <form onSubmit={handleQuizCapture} className="max-w-sm mx-auto text-left space-y-3">
                  <input type="text" placeholder="Your name" value={quizName} onChange={(e) => setQuizName(e.target.value)} className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground text-lg py-3 outline-none transition-colors placeholder-foreground/20 font-display" />
                  <input type="email" required placeholder="your@email.com" value={quizEmail} onChange={(e) => setQuizEmail(e.target.value)} className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground text-lg py-3 outline-none transition-colors placeholder-foreground/20 font-display" autoFocus />
                  <button type="submit" className="w-full mt-6 px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]">See My Results <ArrowRight className="w-4 h-4" /></button>
                </form>
              </div>
            )}
            {quizStatus === "saving" && (<div className="text-center"><p className="text-muted-foreground font-mono text-sm">Analyzing your results...</p></div>)}
            {quizStatus === "result" && (
              <div className="text-center">
                <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Your Score: {totalScore}/{questions.length * 4}</p>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3">{result.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm mx-auto">{result.description}</p>
                <div className="border border-foreground/10 text-left p-5 mb-6 space-y-3 max-w-sm mx-auto">
                  <div><p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Recommended</p><p className="text-sm font-medium mt-1">{result.recommendation}</p></div>
                  <div><p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Key Insight</p><p className="text-sm font-medium mt-1">{result.urgency}</p></div>
                </div>
                <div className="space-y-2 mb-6 max-w-sm mx-auto">
                  <a href="tel:+15106809100" className="w-full flex items-center justify-between px-5 py-3.5 border border-foreground/10 hover:border-foreground/30 transition-all text-left active:scale-[0.98]">
                    <div><span className="text-sm font-medium block">Call me directly</span><span className="text-xs text-muted-foreground">(510) 680-9100</span></div><ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href="sms:+15106934083" className="w-full flex items-center justify-between px-5 py-3.5 border border-foreground/10 hover:border-foreground/30 transition-all text-left active:scale-[0.98]">
                    <div><span className="text-sm font-medium block">Send a text</span><span className="text-xs text-muted-foreground">(510) 693-4083</span></div><ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                  <a href="mailto:jothamjhall@gmail.com" className="w-full flex items-center justify-between px-5 py-3.5 border border-foreground/10 hover:border-foreground/30 transition-all text-left active:scale-[0.98]">
                    <div><span className="text-sm font-medium block">Email me</span><span className="text-xs text-muted-foreground">jothamjhall@gmail.com</span></div><ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
                <button onClick={resetQuiz} className="px-8 py-3 border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground/5 transition-colors active:scale-[0.97]">Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 flex flex-col bg-background text-foreground overflow-hidden" style={{ paddingBottom: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}>
      <div itemScope itemType="https://schema.org/Person" className="sr-only">
        <meta itemProp="name" content="Jotham Hall" />
        <meta itemProp="jobTitle" content="AI Systems Architect, Television Producer, Founder" />
        <meta itemProp="description" content="Jotham Hall is an entrepreneur, television producer, and technology founder. 50+ TV credits. AI systems architect. VibeCoding pioneer." />
        <link itemProp="url" href="https://jothamhall.com" />
      </div>
      <h1 className="sr-only">Jotham Hall - AI Systems Architect, Television Producer, Founder of SuccessUpgrade.ai</h1>

      {/* TOP: Profile card */}
      <div className="relative z-10 flex-shrink-0 pt-4 pb-3 px-6 text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.successupgrade.ai/images/profile.jpeg" alt="Jotham Hall" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-foreground/10 shadow-2xl mx-auto mb-2" />
        </div>
        <h2 className={`font-display text-xl sm:text-2xl tracking-tight mb-0.5 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>Jotham Hall</h2>
        <p className={`text-[10px] sm:text-xs font-mono text-muted-foreground/50 mb-1.5 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          50+ TV shows. $2.4M+ client revenue. I build what works.
        </p>
        <p className={`text-[11px] sm:text-sm text-foreground/70 max-w-xs mx-auto transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          I build AI systems that scale businesses without scaling stress.
        </p>
        <div className={`flex flex-wrap justify-center gap-x-2.5 mt-2 transition-all duration-700 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {networks.map((n) => (
            <span key={n} className="text-[10px] sm:text-xs font-mono text-foreground/50 uppercase tracking-wider">{n}</span>
          ))}
        </div>
      </div>

      {/* BOTTOM: Action zone */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6">
        <div className={`space-y-2.5 max-w-sm mx-auto w-full transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Primary CTA — Calendly */}
          <button
            onClick={() => setIsCalendlyOpen(true)}
            className="w-full py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Book Your Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Call/Text/Email */}
          <button
            onClick={() => setShowContact(!showContact)}
            className="w-full py-3 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            <Phone className="w-3.5 h-3.5" />
            Call, Text, or Email
          </button>

          {/* Contact dropdown */}
          {showContact && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <a href="tel:+15106809100" className="flex items-center gap-3 px-4 py-2.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
                <Phone className="w-4 h-4 text-muted-foreground" /><span className="text-sm">Call (510) 680-9100</span>
              </a>
              <a href="sms:+15106934083" className="flex items-center gap-3 px-4 py-2.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
                <MessageSquare className="w-4 h-4 text-muted-foreground" /><span className="text-sm">Text (510) 693-4083</span>
              </a>
              <a href="mailto:jothamjhall@gmail.com" className="flex items-center gap-3 px-4 py-2.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
                <Mail className="w-4 h-4 text-muted-foreground" /><span className="text-sm">jothamjhall@gmail.com</span>
              </a>
            </div>
          )}

          {/* Quiz CTA */}
          <button
            onClick={() => setQuizActive(true)}
            className="w-full py-3 border border-foreground/10 text-sm hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 active:scale-[0.97] text-muted-foreground hover:text-foreground"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Take the Free Business Assessment
          </button>

          {/* Scarcity */}
          <p className="text-[10px] font-mono text-foreground/60 text-center">
            Only 3 partnership spots per quarter
          </p>
        </div>
      </div>

      <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
