"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Mic, Rocket, User, Phone } from "lucide-react";
import { isFullBleed } from "@/lib/full-bleed";

/*
  Six tabs, six places. Every tab opens its page in one tap, with no menu to
  choose from first, and the tab of the section you are in stays lit on every
  page inside it, so the bar always answers "where am I": About covers TV
  Credits and the articles, Services covers the four service pages and the
  Miami pages, Ventures covers every venture.

  Tabs are links, so moving between them is an instant in app change rather
  than a full page load, and on a desktop they show their address, open in a
  new tab with a modifier key, and never shrink under the cursor.
*/
const tabs = [
  { name: "Home", href: "/", icon: Home, section: ["/"] },
  { name: "About", href: "/about", icon: User, section: ["/about", "/credits", "/insights"] },
  { name: "Services", href: "/services", icon: Briefcase, section: ["/services", "/miami"] },
  { name: "Ventures", href: "/ventures", icon: Rocket, section: ["/ventures"] },
  { name: "Speaking", href: "/speaking", icon: Mic, section: ["/speaking"] },
  { name: "Contact", href: "/contact", icon: Phone, section: ["/contact"] },
];

function inSection(pathname: string, section: string[]) {
  return section.some((root) =>
    root === "/" ? pathname === "/" : pathname === root || pathname.startsWith(`${root}/`)
  );
}

export function MobileTabBar() {
  const pathname = usePathname() ?? "/";

  // Inside a venture's own site, its navigation is the only one on screen.
  if (isFullBleed(pathname)) return null;

  /*
    One bar at every width (Jo: visible on all screen sizes). On a phone the
    six tabs share the full width; from md up the bar still runs the full
    window, like successupgrade.ai's, and the tabs sit in a centered
    max-w-2xl row.
  */
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-[999] border-t border-[#3D3A35] bg-[#0D0D0D]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-20 items-stretch px-2 md:mx-auto md:max-w-2xl">
        {tabs.map(({ name, href, icon: Icon, section }) => {
          const active = inSection(pathname, section);
          return (
            <li key={name} className="flex flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                // Tapping the tab you are on takes you back to its top, as in an app.
                onClick={() => {
                  if (pathname === href) window.scrollTo(0, 0);
                }}
                className={`relative flex flex-1 flex-col items-center justify-center gap-1.5 transition-colors duration-150 ${
                  active ? "text-[#D4A853]" : "text-[#8A837B] hover:text-[#FAF8F5]"
                }`}
              >
                {/* The lit tab's gold rule, on the bar's top edge. */}
                {active && (
                  <span aria-hidden="true" className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-[#D4A853] md:w-10" />
                )}
                <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={active ? 2 : 1.5} />
                <span className="text-xs tracking-wide">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
