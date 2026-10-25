"use client";

import { useRef, type KeyboardEvent } from "react";

/*
  Two rooms, one section, as on successupgrade.ai/path: the Brain is the
  machine and how its parts connect; the Path is the training that builds the
  same thing in someone else's business. Equal width, one row: the full
  column on a phone, a modest centered pair on a desktop. Square, like every
  control on the site.

  A real tab list: each tab names the panel it controls (pathTabId and
  pathPanelId give brain-and-path.tsx the same ids), only the chosen tab is in
  the Tab order, and the Left and Right arrow keys move between the tabs.
*/
const TABS = [
  { id: "brain" as const, label: "Brain", hint: "How it connects" },
  { id: "path" as const, label: "Path", hint: "Build it" },
];

export type PathTab = (typeof TABS)[number]["id"];

export const pathTabId = (tab: PathTab) => `the-path-tab-${tab}`;
export const pathPanelId = (tab: PathTab) => `the-path-panel-${tab}`;

export default function PathTabs({ value, onChange }: { value: PathTab; onChange: (tab: PathTab) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = TABS.findIndex((tab) => tab.id === value);
    const next = (index + step + TABS.length) % TABS.length;
    onChange(TABS[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="The Brain and the Path"
      onKeyDown={onKeyDown}
      className="grid grid-cols-2 gap-2 md:mx-auto md:max-w-sm"
    >
      {TABS.map((tab, index) => {
        const on = value === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            id={pathTabId(tab.id)}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={pathPanelId(tab.id)}
            tabIndex={on ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`min-h-[52px] md:min-h-[56px] px-1 py-2.5 md:px-3 border transition-colors ${
              on
                ? "bg-[#D4A853]/[0.12] border-[#D4A853]/55 text-[#D4A853]"
                : "border-[#3D3A35] text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5]"
            }`}
          >
            <span className="block text-sm font-semibold">{tab.label}</span>
            {/* Slightly closer tracking on a phone keeps "How it connects" on one line down to a 360px screen. */}
            <span className={`block mt-0.5 text-[13px] md:text-sm tracking-[0.08em] md:tracking-[0.1em] uppercase ${on ? "text-[#D4A853]/85" : "text-[#8A837B]"}`}>
              {tab.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
