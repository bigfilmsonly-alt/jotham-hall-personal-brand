"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageSquare, Mail, ArrowRight } from "lucide-react";
import { ContactModal } from "./contact-modal";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-10">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
              Reach Me Directly
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display tracking-tight mb-3">
              No gatekeepers. No forms.
              <br />
              <span className="text-muted-foreground">Just reach out.</span>
            </h2>
          </div>

          <div className="space-y-3 max-w-md mx-auto mb-8">
            <a
              href="tel:+15106809100"
              className="group flex items-center gap-4 px-5 py-4 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Call</span>
                <span className="block text-xs text-muted-foreground">(510) 680-9100</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="sms:+15106934083"
              className="group flex items-center gap-4 px-5 py-4 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors shrink-0">
                <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Text</span>
                <span className="block text-xs text-muted-foreground">(510) 693-4083</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="mailto:bigfilmsonly@gmail.com"
              className="group flex items-center gap-4 px-5 py-4 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]"
            >
              <div className="w-11 h-11 flex items-center justify-center border border-foreground/10 group-hover:border-foreground/30 transition-colors shrink-0">
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">Email</span>
                <span className="block text-xs text-muted-foreground">bigfilmsonly@gmail.com</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-4 font-mono">Or apply with full details</p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
            >
              Fill Out the Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
