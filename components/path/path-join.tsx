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

const field =
  "w-full bg-[#141416] border border-[#3D3A35] rounded-full px-5 py-3.5 text-[16px] text-[#FAF8F5] placeholder:text-[#8A837B] outline-none focus:border-[#D4A853]/60 transition-colors";

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

  return (
    <div className="text-center">
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853]">Free Access</p>
      <h3 className="mt-3 font-display text-xl leading-snug tracking-[0.12em] uppercase text-balance text-[#FAF8F5]">
        Everything you need to start building with AI
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[#B8B0A8]">
        Every mission, every walkthrough, every video. Free. Tell me who you are and it opens.
      </p>

      <ul className="mt-6 space-y-2.5 text-left">
        {INCLUDED.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#FAF8F5]/90">
            <Check aria-hidden="true" className="w-4 h-4 mt-[5px] shrink-0 text-[#D4A853]" />
            {item}
          </li>
        ))}
      </ul>

      <form onSubmit={handleJoin} noValidate className="mt-7 p-5 bg-[#1A1A1A] border border-[#3D3A35] space-y-3">
        <input className={field} type="text" name="name" autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={field} type="email" name="email" autoComplete="email" inputMode="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={field} type="tel" name="tel" autoComplete="tel" inputMode="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className={field} type="text" name="social" placeholder="Instagram or TikTok handle (optional)" value={social} onChange={(e) => setSocial(e.target.value)} />
        {error && <p role="alert" className="text-sm text-[#E8C97A]">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full mt-1 py-3.5 rounded-full bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-60"
        >
          {busy ? "Opening" : "Open the Path"}
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="text-[13px] text-[#8A837B]">The Path is free. No card, no code, no trial.</p>
      </form>
    </div>
  );
}
