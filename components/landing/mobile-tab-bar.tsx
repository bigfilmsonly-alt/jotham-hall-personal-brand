"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  BarChart3,
  Rocket,
  Newspaper,
  User,
  Phone,
  ChevronUp,
  X,
} from "lucide-react";
import { CalendlyModal } from "../calendly-modal";

const tabs = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/services",
    icon: Briefcase,
    submenu: [
      { name: "All Services", href: "/services" },
      { name: "Strategic Consulting", href: "/services/strategic-consulting" },
      { name: "Systems Architecture", href: "/services/systems-architecture" },
      { name: "AI Automation", href: "/services/ai-automation" },
      { name: "Personal Branding", href: "/services/personal-branding" },
      { name: "Executive Advisory", href: "/services/executive-advisory" },
      { name: "Fractional COO", href: "/services/fractional-coo" },
      { name: "Content Strategy", href: "/services/content-strategy" },
      { name: "Business Development", href: "/services/business-development" },
      { name: "Speaking", href: "/services/speaking" },
    ],
  },
  {
    name: "Work",
    href: "/case-studies",
    icon: BarChart3,
    submenu: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "SaaS Revenue 3x", href: "/case-studies/saas-revenue-transformation" },
      { name: "Agency Systems", href: "/case-studies/agency-systems-overhaul" },
      { name: "E-commerce Automation", href: "/case-studies/ecommerce-automation" },
      { name: "Personal Brand Launch", href: "/case-studies/personal-brand-launch" },
      { name: "Startup Advisory", href: "/case-studies/startup-advisory" },
    ],
  },
  {
    name: "Ventures",
    href: "/ventures",
    icon: Rocket,
    submenu: [
      { name: "All Ventures", href: "/ventures" },
      { name: "Success Upgrade", href: "/ventures/success-upgrade" },
      { name: "Big Films Only", href: "/ventures/big-films-only" },
      { name: "Say It Build It", href: "/ventures/say-it-build-it" },
      { name: "SaaS Agency", href: "/ventures/saas-agency" },
      { name: "Alkaline Water", href: "/ventures/alkaline-water" },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
    icon: Newspaper,
    submenu: [
      { name: "All Articles", href: "/insights" },
      { name: "Paradise Protocol", href: "/insights/how-i-built-ai-first-ecosystem-paradise-protocol" },
      { name: "Vibe Coding", href: "/insights/vibe-coding-future-ai-assisted-development" },
      { name: "AI Agents", href: "/insights/ai-agents-future-of-work" },
      { name: "Founder OS", href: "/insights/founder-os-operating-system-thinking" },
    ],
  },
  {
    name: "About",
    href: "/about",
    icon: User,
    submenu: [
      { name: "About", href: "/about" },
      { name: "Who is Jotham Hall", href: "/who-is-jotham-hall" },
      { name: "TV Credits", href: "/tv-credits" },
      { name: "Speaking", href: "/speaking" },
    ],
  },
  {
    name: "Contact",
    href: "contact-modal",
    icon: Phone,
    submenu: [
      { name: "Book a Call", href: "action:calendly" },
      { name: "Schedule", href: "action:calendly" },
      { name: "Text Me", href: "sms:+15106934083" },
      { name: "Email Me", href: "mailto:bigfilmsonly@gmail.com" },
    ],
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  // Close submenu on route change
  useEffect(() => {
    setActiveSubmenu(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleTabClick = (tab: (typeof tabs)[number]) => {
    if (tab.href === "contact-modal") {
      // Contact now has a submenu, toggle it
      setActiveSubmenu(activeSubmenu === tab.name ? null : tab.name);
      return;
    }

    if (tab.submenu) {
      setActiveSubmenu(activeSubmenu === tab.name ? null : tab.name);
      return;
    }

    setActiveSubmenu(null);
    window.location.href = tab.href;
  };

  return (
    <>
      {/* Submenu Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[998] transition-all duration-300 ${
          activeSubmenu
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm transition-opacity duration-300 ${
            activeSubmenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setActiveSubmenu(null)}
        />

        {/* Submenu Content */}
        <div
          className={`relative bg-[#1A1A1A] border-t border-[#3D3A35] rounded-t-2xl shadow-2xl transition-all duration-300 ${
            activeSubmenu
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
        >
          {tabs
            .filter((t) => t.submenu && t.name === activeSubmenu)
            .map((tab) => (
              <div key={tab.name} className="px-6 pt-5 pb-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground">
                    {tab.name}
                  </h3>
                  <button
                    onClick={() => setActiveSubmenu(null)}
                    className="p-1 rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {tab.submenu!.map((item) => (
                    <a
                      key={item.href}
                      href={item.href.startsWith("action:") ? undefined : item.href}
                      onClick={(e) => {
                        if (item.href === "action:calendly") {
                          e.preventDefault();
                          setActiveSubmenu(null);
                          setIsContactOpen(true);
                        } else if (item.href.startsWith("http")) {
                          e.preventDefault();
                          setActiveSubmenu(null);
                          window.open(item.href, "_blank");
                        } else {
                          setActiveSubmenu(null);
                        }
                      }}
                      className={`px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        pathname === item.href
                          ? "bg-[#D4A853] text-[#0D0D0D] font-medium"
                          : "text-[#B8B0A8] hover:bg-[#252320] hover:text-[#FAF8F5] active:bg-[#3D3A35]"
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-[999]">
        <div
          className="bg-[#0D0D0D] border-t border-[#3D3A35]"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-around h-20 px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active =
                tab.href === "contact-modal"
                  ? false
                  : isActive(tab.href);
              const submenuOpen = activeSubmenu === tab.name;

              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab)}
                  className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 active:scale-90 ${
                    active
                      ? "text-[#D4A853]"
                      : "text-[#5C5750] hover:text-[#B8B0A8]"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-6 h-6 transition-all duration-300 ${
                        active ? "stroke-[2px]" : "stroke-[1.5px]"
                      }`}
                    />
                    {active && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A853]" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] tracking-wide transition-all duration-300 ${
                      active ? "font-medium" : "font-normal"
                    }`}
                  >
                    {tab.name}
                  </span>
                  {tab.submenu && (
                    <ChevronUp
                      className={`absolute top-2 right-0.5 w-2.5 h-2.5 opacity-30 transition-transform duration-200 ${
                        submenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <CalendlyModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
