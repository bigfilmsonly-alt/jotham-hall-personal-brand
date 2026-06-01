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
  X,
  ArrowRight,
} from "lucide-react";
import { CalendlyModal } from "../calendly-modal";

interface SubMenuItem {
  name: string;
  href: string;
  desc?: string;
}

interface Tab {
  name: string;
  href: string;
  icon: typeof Home;
  submenu?: SubMenuItem[];
}

const tabs: Tab[] = [
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
      { name: "AI Automation", href: "/services/ai-automation", desc: "Save 20+ hrs/week with AI systems" },
      { name: "Revenue Systems", href: "/services/revenue-systems", desc: "3x your revenue with automated funnels" },
      { name: "Strategic Consulting", href: "/services/strategic-consulting", desc: "Custom roadmap for your business" },
      { name: "Systems Architecture", href: "/services/systems-architecture", desc: "Build infrastructure that scales" },
      { name: "Fractional COO", href: "/services/fractional-coo", desc: "Executive ops, fraction of the cost" },
      { name: "Personal Branding", href: "/services/personal-branding", desc: "Position yourself as the authority" },
      { name: "Executive Advisory", href: "/services/executive-advisory", desc: "High level strategic guidance" },
      { name: "All Services", href: "/services", desc: "View the full catalog" },
    ],
  },
  {
    name: "Work",
    href: "/case-studies",
    icon: BarChart3,
    submenu: [
      { name: "SaaS Revenue 3x", href: "/case-studies/saas-revenue-transformation", desc: "300% revenue increase in 90 days" },
      { name: "Agency Systems", href: "/case-studies/agency-systems-overhaul", desc: "30 hrs/week saved with automation" },
      { name: "E-commerce Automation", href: "/case-studies/ecommerce-automation", desc: "Full pipeline on autopilot" },
      { name: "Personal Brand Launch", href: "/case-studies/personal-brand-launch", desc: "From zero to authority" },
      { name: "Startup Advisory", href: "/case-studies/startup-advisory", desc: "Scaled from idea to revenue" },
      { name: "All Case Studies", href: "/case-studies", desc: "See every result" },
    ],
  },
  {
    name: "Ventures",
    href: "/ventures",
    icon: Rocket,
    submenu: [
      { name: "Success Upgrade", href: "/ventures/success-upgrade", desc: "AI ecosystem for entrepreneurs" },
      { name: "Big Films Only", href: "/ventures/big-films-only", desc: "Premium video production" },
      { name: "Say It Build It", href: "/ventures/say-it-build-it", desc: "VibeCoding platform" },
      { name: "SaaS Agency", href: "/ventures/saas-agency", desc: "Automation systems" },
      { name: "Electro Hydration", href: "/ventures/alkaline-water", desc: "Wellness products" },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
    icon: Newspaper,
    submenu: [
      { name: "Paradise Protocol", href: "/insights/how-i-built-ai-first-ecosystem-paradise-protocol", desc: "Building an AI first ecosystem" },
      { name: "Vibe Coding", href: "/insights/vibe-coding-future-ai-assisted-development", desc: "The future of AI development" },
      { name: "AI Agents", href: "/insights/ai-agents-future-of-work", desc: "How AI agents change everything" },
      { name: "Founder OS", href: "/insights/founder-os-operating-system-thinking", desc: "Operating system for founders" },
      { name: "All Articles", href: "/insights", desc: "Read everything" },
    ],
  },
  {
    name: "About",
    href: "/about",
    icon: User,
    submenu: [
      { name: "About Jotham", href: "/about", desc: "The full story" },
      { name: "Who is Jotham Hall", href: "/who-is-jotham-hall", desc: "Background and mission" },
      { name: "TV Credits (50+)", href: "/tv-credits", desc: "Hallmark, VH1, Food Network, MTV" },
      { name: "Speaking", href: "/speaking", desc: "Book for your event" },
    ],
  },
  {
    name: "Contact",
    href: "contact-modal",
    icon: Phone,
    submenu: [
      { name: "Book a Call", href: "action:calendly", desc: "Free 30-min strategy session" },
      { name: "Schedule", href: "action:calendly", desc: "Pick a time on the calendar" },
      { name: "Text Me", href: "sms:+15106934083", desc: "(510) 693-4083" },
      { name: "Email Me", href: "mailto:bigfilmsonly@gmail.com", desc: "bigfilmsonly@gmail.com" },
    ],
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setActiveSubmenu(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleTabClick = (tab: Tab) => {
    if (tab.href === "contact-modal") {
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

  const handleItemClick = (item: SubMenuItem, e: React.MouseEvent) => {
    if (item.href === "action:calendly") {
      e.preventDefault();
      setActiveSubmenu(null);
      setIsContactOpen(true);
    } else if (item.href.startsWith("sms:") || item.href.startsWith("mailto:")) {
      setActiveSubmenu(null);
      window.location.href = item.href;
      e.preventDefault();
    } else if (item.href.startsWith("http")) {
      e.preventDefault();
      setActiveSubmenu(null);
      window.open(item.href, "_blank");
    } else {
      setActiveSubmenu(null);
    }
  };

  return (
    <>
      {/* Submenu Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[998] transition-all duration-300 ${
          activeSubmenu ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-[#0D0D0D]/70 backdrop-blur-sm transition-opacity duration-300 ${
            activeSubmenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setActiveSubmenu(null)}
        />

        {/* Submenu Content */}
        <div
          className={`relative bg-[#1A1A1A] border-t border-[#D4A853]/20 rounded-t-3xl shadow-2xl transition-all duration-300 ${
            activeSubmenu ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
          style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
        >
          {tabs
            .filter((t) => t.submenu && t.name === activeSubmenu)
            .map((tab) => (
              <div key={tab.name} className="px-5 pt-4 pb-2">
                {/* Handle + Header */}
                <div className="w-10 h-1 bg-[#3D3A35] rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A853] font-medium">
                    {tab.name}
                  </h3>
                  <button
                    onClick={() => setActiveSubmenu(null)}
                    className="p-1.5 rounded-full hover:bg-[#252320] transition-colors"
                  >
                    <X className="w-4 h-4 text-[#5C5750]" />
                  </button>
                </div>

                {/* Scrollable list */}
                <div className="max-h-[50vh] overflow-y-auto no-scrollbar space-y-1">
                  {tab.submenu!.map((item) => (
                    <a
                      key={item.href + item.name}
                      href={item.href.startsWith("action:") || item.href.startsWith("sms:") || item.href.startsWith("mailto:") ? undefined : item.href}
                      onClick={(e) => handleItemClick(item, e)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98] cursor-pointer ${
                        pathname === item.href
                          ? "bg-[#D4A853] text-[#0D0D0D]"
                          : "hover:bg-[#252320]"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className={`text-sm font-medium ${pathname === item.href ? "text-[#0D0D0D]" : "text-[#FAF8F5]"}`}>
                          {item.name}
                        </p>
                        {item.desc && (
                          <p className={`text-[11px] mt-0.5 ${pathname === item.href ? "text-[#0D0D0D]/70" : "text-[#5C5750]"}`}>
                            {item.desc}
                          </p>
                        )}
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ml-3 ${pathname === item.href ? "text-[#0D0D0D]/50" : "text-[#3D3A35]"}`} />
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
                    active || submenuOpen
                      ? "text-[#D4A853]"
                      : "text-[#5C5750] hover:text-[#B8B0A8]"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-6 h-6 transition-all duration-300 ${
                        active || submenuOpen ? "stroke-[2px]" : "stroke-[1.5px]"
                      }`}
                    />
                    {active && (
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4A853]" />
                    )}
                  </div>
                  <span
                    className={`text-[11px] tracking-wide transition-all duration-300 ${
                      active || submenuOpen ? "font-medium" : "font-normal"
                    }`}
                  >
                    {tab.name}
                  </span>
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
