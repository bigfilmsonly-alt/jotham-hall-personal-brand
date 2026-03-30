"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Phone, MessageSquare, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Call",
    description: "Business line for immediate consultation",
    action: "tel:+15106809100",
    cta: "Call Now",
  },
  {
    icon: MessageSquare,
    label: "Text",
    description: "Quick questions and scheduling",
    action: "sms:+15106934083",
    cta: "Send Text",
  },
  {
    icon: Mail,
    label: "Email",
    description: "Detailed inquiries and proposals",
    action: "mailto:jothamjhall@gmail.com",
    cta: "Send Email",
  },
];

const faqs = [
  {
    question: "What is the typical engagement timeline?",
    answer: "Most consulting engagements range from 30 days for focused projects to 6+ months for comprehensive system builds. We will scope the exact timeline during our strategy call."
  },
  {
    question: "Do you work with early-stage startups?",
    answer: "I work with founders at all stages, from pre-revenue to 8-figure operations. The approach differs based on your current stage and goals."
  },
  {
    question: "What industries do you specialize in?",
    answer: "I have built systems across SaaS, e-commerce, professional services, content creation, and health and wellness. The principles of automation and systems thinking apply universally."
  },
  {
    question: "How quickly can I expect results?",
    answer: "Quick wins typically appear within the first 2-4 weeks. Significant operational transformation takes 60-90 days. Compound results continue indefinitely."
  },
];

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              Contact
            </span>
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Let us Build
              <br />
              <span className="text-muted-foreground">Something Real.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to architect systems that scale? Choose your preferred method of contact below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.action}
                className="group p-8 lg:p-12 border border-foreground/10 hover:border-foreground/30 transition-all text-center"
              >
                <method.icon className="w-8 h-8 mx-auto mb-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                <h2 className="text-2xl font-display mb-3">{method.label}</h2>
                <p className="text-muted-foreground mb-6">{method.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  {method.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-display mb-6">Response Time</h2>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>Within 24 hours on business days</span>
              </div>
              <p className="text-muted-foreground">
                I personally respond to every inquiry. For urgent matters, calling is fastest.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-display mb-6">Location</h2>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Bay Area, California</span>
              </div>
              <p className="text-muted-foreground">
                I work with clients globally via video call. In-person available for Bay Area engagements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Common questions about working together
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-foreground/10 pb-8">
                <h3 className="text-xl font-display mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
