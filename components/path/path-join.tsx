"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { saveRecord } from "@/lib/supabase";
import { trackEvent } from "@/lib/tracking";

/*
  The Path is free. This is a join, not a lock, exactly as on
  successupgrade.ai/path: it asks who you are, which is the thing worth having,
  and opens. Not access control and not pretending to be.

  Same four fields and the same record as successupgrade.ai's join, so a lead
  from here lands beside every other lead (saveRecord stamps brand jothamhall).
  The email to Jo and the GoHighLevel contact go through /api/notify whether or
  not the insert worked, and neither can hold the Path back from somebody who
  just asked for it.
*/

export const PATH_UNLOCK_KEY = "path-unlocked";

export function readPathUnlocked(): boolean {
  try {
    return localStorage.getItem(PATH_UNLOCK_KEY) === "true";
  } catch {
    return false;
  }
}

const INCLUDED = [
  "Every mission and step by step walkthrough",
  "Complete video training from start to finish",
  "Build at your own pace",
  "Your progress saved automatically",
  "New skills you can put to work immediately",
];

// Square, like every field and button on the site.
const field =
  "w-full bg-[#141416] border border-[#3D3A35] px-4 py-3.5 text-[16px] text-[#FAF8F5] placeholder:text-[#8A837B] outline-none focus:border-[#D4A853]/60 transition-colors";

export function PathJoin({ onUnlock }: { onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [social, setSocial] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleJoin(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const lead = { name: name.trim(), email: email.trim(), phone: phone.trim(), social: social.trim() };
    if (!lead.name || !lead.email || !lead.phone) {
      setError("Name, email and phone, please. The Path is free either way.");
      return;
    }
    setError("");
    setBusy(true);

    const saved = await saveRecord("email_captures", {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      social_media: lead.social || null,
      about: null,
      source: "path_unlock",
    });
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "email_capture",
          data: { name: lead.name, email: lead.email, phone: lead.phone, source: "path_unlock", dbSaved: saved.ok },
        }),
      });
    } catch {
      /* The Path still opens; the row above is the record. */
    }
    try {
      localStorage.setItem(PATH_UNLOCK_KEY, "true");
    } catch {
      /* Private mode: it opens now and asks again next visit. */
    }
    trackEvent.lead("path_unlock");
    setBusy(false);
    onUnlock();
  }

  /*
    On a phone: the heading, the list, then the form, one column. On a desktop
    the heading centers at reading width and the form at a form's width; from
    lg the list stands beside the form instead of above it, the two columns
    sized to their content and centered as one block under the heading.
  */
  return (
    <div className="text-center">
      <div className="md:mx-auto md:max-w-2xl">
        <p className="text-[11px] md:text-xs tracking-[0.15em] uppercase text-[#D4A853]">Free Access</p>
        <h3 className="mt-3 md:mt-4 font-display text-xl md:text-3xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
          Everything you need to start building with AI
        </h3>
        <p className="mt-3 md:mt-4 text-[15px] md:text-[17px] leading-relaxed text-[#B8B0A8] text-pretty md:mx-auto md:max-w-xl md:text-balance">
          It&apos;s free. Tell me who you are and it opens.
        </p>
      </div>

      <div className="md:mt-10 lg:mt-12 lg:grid lg:grid-cols-[auto_auto] lg:justify-center lg:items-center lg:gap-16">
        <ul className="mt-6 space-y-2.5 text-left md:mt-0 md:mx-auto md:w-fit md:space-y-3 lg:mx-0">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] md:text-[17px] leading-relaxed text-pretty text-[#FAF8F5]/90">
              <Check aria-hidden="true" className="w-4 h-4 mt-[5px] md:mt-[6px] shrink-0 text-[#D4A853]" />
              {item}
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleJoin}
          noValidate
          className="mt-7 p-5 bg-[#1A1A1A] border border-[#3D3A35] space-y-3 md:mt-10 md:mx-auto md:max-w-md md:p-8 lg:mt-0 lg:mx-0 lg:w-[28rem]"
        >
          <input className={field} type="text" name="name" autoComplete="name" placeholder="Full name" aria-label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={field} type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className={field} type="tel" name="tel" autoComplete="tel" inputMode="tel" placeholder="Phone number" aria-label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className={field} type="text" name="social" placeholder="Instagram or TikTok (optional)" aria-label="Instagram or TikTok (optional)" value={social} onChange={(e) => setSocial(e.target.value)} />
          {error && <p role="alert" className="text-sm text-[#E8C97A]">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full mt-1 py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 pointer-coarse:active:scale-[0.97] disabled:opacity-60 disabled:cursor-default"
          >
            {busy ? "Opening" : "Open the Path"}
            {!busy && <ArrowRight aria-hidden="true" className="w-4 h-4" />}
          </button>
          <p className="text-[13px] text-[#8A837B]">The Path is free. No card needed.</p>
        </form>
      </div>
    </div>
  );
}
