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
import { ContactModal } from "./contact-modal";

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
  },
  {
    name: "About",
    href: "/about",
    icon: User,
    submenu: [
      { name: "About", href: "/about" },
      { name: "Who is Jotham Hall", href: "/who-is-jotham-hall" },
      { name: "Speaking", href: "/speaking" },
      { name: "Television", href: "/television" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    name: "Contact",
    href: "contact-modal",
    icon: Phone,
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide tab bar when scrolling down fast, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setActiveSubmenu(null);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      setActiveSubmenu(null);
      setIsContactOpen(true);
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
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[998] transition-all duration-300 ${
          activeSubmenu
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300 ${
            activeSubmenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setActiveSubmenu(null)}
        />

        {/* Submenu Content */}
        <div
          className={`relative bg-background border-t border-foreground/10 rounded-t-2xl shadow-2xl transition-all duration-300 ${
            activeSubmenu
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
          style={{ paddingBottom: "calc(4.5rem + env(safe-area-inset-bottom))" }}
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
                      href={item.href}
                      className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                        pathname === item.href
                          ? "bg-foreground text-background font-medium"
                          : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10"
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
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[999] transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="bg-background/90 backdrop-blur-xl border-t border-foreground/10"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-around h-[4.5rem] px-1">
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
                  className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 active:scale-95 ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${
                        active ? "stroke-[2.5px]" : "stroke-[1.5px]"
                      }`}
                    />
                    {active && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] leading-tight transition-all duration-200 ${
                      active ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {tab.name}
                  </span>
                  {tab.submenu && (
                    <ChevronUp
                      className={`absolute top-1.5 right-1 w-2.5 h-2.5 transition-transform duration-200 ${
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

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
