"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Services: [
    { name: "All Services", href: "/services" },
    { name: "AI Automation", href: "/services/ai-automation" },
    { name: "Revenue Systems", href: "/services/revenue-systems" },
    { name: "Brand Strategy", href: "/services/brand-strategy" },
  ],
  Insights: [
    { name: "All Insights", href: "/insights" },
    { name: "AI Ecosystem", href: "/insights/how-i-built-ai-first-ecosystem-paradise-protocol" },
    { name: "Daily Upgrade", href: "/insights/daily-upgrade-compounding-small-decisions" },
    { name: "Vibe Coding", href: "/insights/vibe-coding-future-ai-assisted-development" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Ventures", href: "/ventures" },
    { name: "Contact", href: "/contact" },
  ],
  Connect: [
    { name: "Call", href: "tel:+15106809100" },
    { name: "Text", href: "sms:+15106934083" },
    { name: "Email", href: "mailto:jothamjhall@gmail.com" },
  ],
};

const socialLinks = [
  { name: "Success Upgrade", href: "/ventures/success-upgrade", highlight: true, internal: true },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jotham-hall-b6b9491b2" },
  { name: "Instagram", href: "https://www.instagram.com/successupgrade_" },
  { name: "TikTok", href: "https://www.tiktok.com/@successupgrade_" },
  { name: "Facebook", href: "https://www.facebook.com/share/1DuisNbTVK/?mibextid=wwXIfr" },
];

export function FooterSection() {
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2 text-center lg:text-left">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display">Jotham Hall</span>
              </a>

              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6 lg:mb-8 max-w-xs mx-auto lg:mx-0">
                Strategic consultant and systems architect. Building machines that scale businesses.
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={'internal' in link && link.internal ? undefined : "_blank"}
                    rel={'internal' in link && link.internal ? undefined : "noopener noreferrer"}
                    className={`text-sm transition-colors flex items-center gap-1 group ${
                      'highlight' in link && link.highlight 
                        ? 'text-foreground font-medium border-b border-foreground/30 hover:border-foreground pb-0.5' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.name}
                    {'internal' in link && link.internal ? null : (
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="text-center lg:text-left">
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Sitemap Dropdown */}
        <div className="py-6 border-t border-foreground/10">
          <button
            onClick={() => setIsSitemapOpen(!isSitemapOpen)}
            className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Sitemap</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isSitemapOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSitemapOpen ? 'max-h-[1200px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Main</span>
                <a href="/" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Home</a>
                <a href="/about" className="block text-foreground/60 hover:text-foreground transition-colors py-1">About</a>
                <a href="/jotham-hall" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Jotham Hall</a>
                <a href="/contact" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Contact</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Services</span>
                <a href="/services" className="block text-foreground/60 hover:text-foreground transition-colors py-1">All Services</a>
                <a href="/services/strategic-consulting" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Strategic Consulting</a>
                <a href="/services/systems-architecture" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Systems Architecture</a>
                <a href="/services/ai-automation" className="block text-foreground/60 hover:text-foreground transition-colors py-1">AI Automation</a>
                <a href="/services/automation" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Automation</a>
                <a href="/services/personal-branding" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Personal Branding</a>
                <a href="/services/content-strategy" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Content Strategy</a>
                <a href="/services/business-development" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Business Development</a>
                <a href="/services/executive-advisory" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Executive Advisory</a>
                <a href="/services/fractional-coo" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Fractional COO</a>
                <a href="/services/speaking" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Speaking</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Case Studies</span>
                <a href="/case-studies" className="block text-foreground/60 hover:text-foreground transition-colors py-1">All Case Studies</a>
                <a href="/case-studies/saas-revenue-transformation" className="block text-foreground/60 hover:text-foreground transition-colors py-1">SaaS Revenue 3x</a>
                <a href="/case-studies/agency-systems-overhaul" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Agency Systems</a>
                <a href="/case-studies/ecommerce-automation" className="block text-foreground/60 hover:text-foreground transition-colors py-1">E-commerce Automation</a>
                <a href="/case-studies/personal-brand-launch" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Personal Brand Launch</a>
                <a href="/case-studies/startup-advisory" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Startup Advisory</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Ventures</span>
                <a href="/ventures" className="block text-foreground/60 hover:text-foreground transition-colors py-1">All Ventures</a>
                <a href="/ventures/success-upgrade" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Success Upgrade</a>
                <a href="/ventures/big-films-only" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Big Films Only</a>
                <a href="/ventures/say-it-build-it" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Say It Build It</a>
                <a href="/ventures/saas-agency" className="block text-foreground/60 hover:text-foreground transition-colors py-1">SaaS Agency</a>
                <a href="/ventures/alkaline-water" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Alkaline Water</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Insights</span>
                <a href="/insights" className="block text-foreground/60 hover:text-foreground transition-colors py-1">All Articles</a>
                <a href="/insights/how-i-built-ai-first-ecosystem-paradise-protocol" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Paradise Protocol</a>
                <a href="/insights/vibe-coding-future-ai-assisted-development" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Vibe Coding</a>
                <a href="/insights/personal-branding-most-valuable-asset" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Personal Branding</a>
                <a href="/insights/founder-os-operating-system-thinking" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Founder OS</a>
                <a href="/insights/ai-agents-future-of-work" className="block text-foreground/60 hover:text-foreground transition-colors py-1">AI Agents</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-3 font-medium">Connect</span>
                <a href="tel:+15106809100" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Call</a>
                <a href="sms:+15106934083" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Text</a>
                <a href="mailto:jothamjhall@gmail.com" className="block text-foreground/60 hover:text-foreground transition-colors py-1">Email</a>
                <a href="https://www.linkedin.com/in/jotham-hall-b6b9491b2" target="_blank" rel="noopener noreferrer" className="block text-foreground/60 hover:text-foreground transition-colors py-1">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            2025 Jotham Hall. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Accepting new clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
