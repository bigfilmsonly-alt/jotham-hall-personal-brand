"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ContactModal } from "./contact-modal";

const plans = [
  {
    name: "Strategy Call",
    description: "For founders exploring partnership",
    price: { monthly: 0, annual: 0 },
    features: [
      "60-minute deep dive",
      "Business audit overview",
      "Automation opportunity map",
      "Revenue system assessment",
      "No commitment required",
    ],
    cta: "Book free call",
    popular: false,
  },
  {
    name: "Systems Build",
    description: "For businesses ready to scale",
    price: { monthly: null, annual: null },
    features: [
      "Full business audit",
      "Custom automation design",
      "Revenue system architecture",
      "Implementation support",
      "30-day optimization",
      "Direct access to Jotham",
      "Priority communication",
    ],
    cta: "Apply now",
    popular: true,
  },
  {
    name: "Ongoing Partnership",
    description: "For continued growth and iteration",
    price: { monthly: null, annual: null },
    features: [
      "Everything in Systems Build",
      "Monthly strategy sessions",
      "Continuous optimization",
      "New system builds as needed",
      "Brand positioning support",
      "VIP access to new ventures",
      "Fractional CTO/CMO support",
      "Revenue share options",
    ],
    cta: "Let's talk",
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-20 text-center lg:text-left mx-auto lg:mx-0 px-2 lg:px-0">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4 lg:mb-6">
            Work With Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight text-foreground mb-4 lg:mb-6">
            Invest in systems.
            <br />
            <span className="text-muted-foreground">Scale infinitely.</span>
          </h2>
          <p className="text-sm lg:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            For serious founders ready to build infrastructure that scales.
          </p>
        </div>

        {/* Engagement Philosophy */}
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-16">
          <span className="text-sm text-muted-foreground font-mono text-center lg:text-left">
            All engagements are custom-scoped based on your specific needs and goals.
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-px bg-transparent md:bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-6 lg:p-12 bg-background border border-foreground/10 md:border-0 ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 md:border-2 md:border-foreground" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-6 lg:mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground mt-1 lg:mt-2">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6 lg:mb-8 pb-6 lg:pb-8 border-b border-foreground/10">
                {plan.price.monthly !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl lg:text-6xl text-foreground">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                ) : (
                  <span className="font-display text-3xl lg:text-4xl text-foreground">Custom</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 lg:gap-3">
                    <Check className="w-3 h-3 lg:w-4 lg:h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-xs lg:text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setIsContactOpen(true)}
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Not sure which engagement is right for you? Book a free strategy call and let us figure it out together.{" "}
          <button 
            onClick={() => setIsContactOpen(true)}
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Schedule now
          </button>
        </p>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
}
