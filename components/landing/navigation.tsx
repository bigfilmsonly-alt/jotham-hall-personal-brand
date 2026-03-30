"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ContactModal } from "./contact-modal";

const navLinks = [
  { 
    name: "Services", 
    href: "/services/strategic-consulting",
    dropdown: [
      { name: "Strategic Consulting", href: "/services/strategic-consulting" },
      { name: "Systems Architecture", href: "/services/systems-architecture" },
      { name: "AI Automation", href: "/services/ai-automation" },
      { name: "Personal Branding", href: "/services/personal-branding" },
      { name: "Executive Advisory", href: "/services/executive-advisory" },
      { name: "Fractional COO", href: "/services/fractional-coo" },
    ]
  },
  { 
    name: "Case Studies", 
    href: "/case-studies",
    dropdown: [
      { name: "All Case Studies", href: "/case-studies" },
      { name: "SaaS Revenue 3x", href: "/case-studies/saas-revenue-transformation" },
      { name: "Agency Systems", href: "/case-studies/agency-systems-overhaul" },
      { name: "E-commerce Automation", href: "/case-studies/ecommerce-automation" },
    ]
  },
  { 
    name: "Ventures", 
    href: "/ventures",
    dropdown: [
      { name: "All Ventures", href: "/ventures" },
      { name: "Success Upgrade", href: "/ventures/success-upgrade" },
      { name: "Big Films Only", href: "/ventures/big-films-only" },
      { name: "Say It Build It", href: "/ventures/say-it-build-it" },
    ]
  },
  { 
    name: "Insights", 
    href: "/insights",
    dropdown: [
      { name: "All Articles", href: "/insights" },
      { name: "Paradise Protocol", href: "/insights/how-i-built-ai-first-ecosystem-paradise-protocol" },
      { name: "Vibe Coding", href: "/insights/vibe-coding-future-ai-assisted-development" },
      { name: "AI Agents", href: "/insights/ai-agents-future-of-work" },
    ]
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl" : "text-2xl"}`}>Jotham Hall</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 flex items-center gap-1"
                >
                  {link.name}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 py-2 bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-lg shadow-xl min-w-[200px] z-50">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        target={'external' in item && item.external ? "_blank" : undefined}
                        rel={'external' in item && item.external ? "noopener noreferrer" : undefined}
                        className={`block px-4 py-2 text-sm hover:bg-foreground/5 transition-colors ${
                          'external' in item && item.external
                            ? 'text-foreground font-medium'
                            : 'text-foreground/70 hover:text-foreground'
                        }`}
                      >
                        {item.name}
                        {'external' in item && item.external && ' ↗'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/about" className={`text-foreground/70 hover:text-foreground transition-all duration-500 ${isScrolled ? "text-xs" : "text-sm"}`}>
              About
            </a>
            <Button
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className={`bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 ${isScrolled ? "px-4 h-8 text-xs" : "px-6"}`}
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile: Show logo-only nav, tab bar handles navigation */}
        </div>

      </nav>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  );
}
