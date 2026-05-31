"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Check, X, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  {
    type: "foundation",
    title: "Foundation Stage",
    range: [5, 9],
    description: "You're running on hustle. No systems, no automation, no leverage. You need a complete business infrastructure overhaul.",
    recommendation: "AI Automation + Revenue Systems",
    urgency: "You're leaving 60-80% of potential revenue on the table.",
  },
  {
    type: "growth",
    title: "Growth Stage",
    range: [10, 14],
    description: "You've got momentum but you're the bottleneck. Some pieces are in place, but nothing is working together.",
    recommendation: "Revenue Systems + Brand Strategy",
    urgency: "With the right systems, you could 3x in 90 days.",
  },
  {
    type: "scale",
    title: "Scale Stage",
    range: [15, 17],
    description: "Strong foundation. Now it's about optimization, automation, and removing yourself from daily operations.",
    recommendation: "Fractional COO + AI Automation",
    urgency: "You're one system away from a breakthrough.",
  },
  {
    type: "optimize",
    title: "Optimization Stage",
    range: [18, 20],
    description: "You're operating at a high level. The opportunity is in fine-tuning and expanding into new revenue channels.",
    recommendation: "Strategic Consulting + VibeCoding",
    urgency: "Let's find the hidden 20% you're missing.",
  },
];

export function QuizSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"quiz" | "capture" | "result" | "saving" | "saved">("quiz");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = results.find((r) => totalScore >= r.range[0] && totalScore <= r.range[1]) || results[0];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (newAnswers.length < questions.length) {
      setStep((s) => s + 1);
    } else {
      setStatus("capture");
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    const finalScore = answers.reduce((a, b) => a + b, 0);
    const finalResult = results.find((r) => finalScore >= r.range[0] && finalScore <= r.range[1]) || results[0];

    await supabase.from("quiz_results").insert({
      email,
      name: name || null,
      score: finalScore,
      result_type: finalResult.type,
      answers: { responses: answers.map((a, i) => ({ question: questions[i].question, score: a })) },
    });

    await supabase.from("email_captures").upsert({ email, source: "quiz" }, { onConflict: "email" });

    setStatus("result");
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep(0);
    setAnswers([]);
    setEmail("");
    setName("");
    setStatus("quiz");
  };

  const progress = status === "quiz" ? (step / questions.length) * 100 : 100;

  return (
    <>
      {/* Section on homepage */}
      <section id="quiz" ref={sectionRef} className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
              Free Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display tracking-tight mb-4">
              Where does your
              <br />
              <span className="text-muted-foreground">business actually stand?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Take the 60-second Business Growth Assessment. Find out exactly where you are,
              what's holding you back, and what to fix first.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
            >
              <BarChart3 className="w-4 h-4" />
              Take the Assessment
            </button>
            <p className="text-[10px] text-muted-foreground/50 font-mono mt-4">
              5 questions. 60 seconds. Personalized results.
            </p>
          </div>
        </div>
      </section>

      {/* Full-screen quiz modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1001] bg-background flex flex-col">
          {/* Top bar */}
          <div className="shrink-0 flex items-center justify-between px-6 py-4">
            <span className="font-display text-sm text-foreground/40">
              {status === "quiz" ? `Question ${step + 1} of ${questions.length}` : ""}
            </span>
            <button onClick={handleClose} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="shrink-0 px-6">
            <div className="h-0.5 bg-foreground/10 w-full">
              <div className="h-full bg-foreground transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-300" key={`${status}-${step}`}>

              {/* Quiz questions */}
              {status === "quiz" && (
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-8">
                    {questions[step].question}
                  </h2>
                  <div className="space-y-2">
                    {questions[step].options.map((opt, i) => (
                      <button
                        key={opt.text}
                        onClick={() => handleAnswer(opt.score)}
                        className="w-full text-left px-5 py-4 border border-foreground/10 hover:border-foreground/30 transition-all duration-150 flex items-center justify-between active:scale-[0.98] active:bg-foreground active:text-background"
                      >
                        <span className="text-sm font-medium">{opt.text}</span>
                        <span className="text-xs font-mono text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Email capture before showing results */}
              {status === "capture" && (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-foreground flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-foreground" />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-3">
                    Your results are ready.
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Enter your email to see your personalized growth assessment.
                  </p>
                  <form onSubmit={handleCapture} className="max-w-sm mx-auto text-left space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground text-lg py-3 outline-none transition-colors placeholder-foreground/20 font-display"
                    />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground text-lg py-3 outline-none transition-colors placeholder-foreground/20 font-display"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full mt-6 px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
                    >
                      See My Results
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {status === "saving" && (
                <div className="text-center">
                  <p className="text-muted-foreground font-mono text-sm">Analyzing your results...</p>
                </div>
              )}

              {/* Results */}
              {status === "result" && (
                <div className="text-center">
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
                    Your Score: {totalScore}/{questions.length * 4}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-3">
                    {result.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                    {result.description}
                  </p>

                  <div className="border border-foreground/10 text-left p-5 mb-6 space-y-3 max-w-sm mx-auto">
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Recommended</p>
                      <p className="text-sm font-medium mt-1">{result.recommendation}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Key Insight</p>
                      <p className="text-sm font-medium mt-1">{result.urgency}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleClose();
                      const contactBtn = document.querySelector('[data-contact-trigger]') as HTMLButtonElement;
                      if (contactBtn) contactBtn.click();
                    }}
                    className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
                  >
                    Book Your Free Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-muted-foreground/50 font-mono mt-4">
                    Results sent to {email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
