"use client";

/*
  Two rooms, one section, as on successupgrade.ai/path: the Brain is the
  machine and how its parts connect; the Path is the training that builds the
  same thing in someone else's business. Equal width, one row.
*/
const TABS = [
  { id: "brain" as const, label: "Brain", hint: "How it connects" },
  { id: "path" as const, label: "Path", hint: "Build it" },
];

export type PathTab = (typeof TABS)[number]["id"];

export default function PathTabs({ value, onChange }: { value: PathTab; onChange: (tab: PathTab) => void }) {
  return (
    <div role="tablist" aria-label="The Brain and the Path" className="grid grid-cols-2 gap-2">
      {TABS.map((tab) => {
        const on = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(tab.id)}
            className={`min-h-[52px] px-3 py-2.5 rounded-full border transition-colors ${
              on
                ? "bg-[#D4A853]/[0.12] border-[#D4A853]/55 text-[#D4A853]"
                : "border-[#FAF8F5]/10 text-[#FAF8F5]/55 hover:text-[#FAF8F5]/80"
            }`}
          >
            <span className="block text-sm font-semibold">{tab.label}</span>
            <span className="block mt-0.5 text-[10px] tracking-[0.15em] uppercase opacity-75">{tab.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
