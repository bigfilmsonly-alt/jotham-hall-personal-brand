"use client"

/**
 * Canonical events, Jotham Hall side.
 *
 * Deliberately a copy of the contract rather than a shared package: this is a
 * separate deployment from successupgrade.ai with no build relationship to it.
 * The names are the contract, so they must match exactly.
 *
 * brand is jothamhall here and is mandatory, not decorative. Both brands
 * currently report into ONE Meta Pixel, so without it the two audiences are
 * indistinguishable and brand level measurement is impossible.
 *
 * NO PII: no email, phone, name, or anything the visitor typed.
 */
export type CanonicalEvent =
  | "diagnostic_start"
  | "diagnostic_complete"
  | "path_start"
  | "path_instinct_click"
  | "ai_call_click"
  | "water_consult_click"
  | "application_start"
  | "calendly_booking"
  | "purchase"

type AnalyticsWindow = {
  dataLayer?: Record<string, unknown>[]
  fbq?: (...args: unknown[]) => void
}

const fired = new Set<string>()

export function trackCanonical(
  event: CanonicalEvent,
  params: Record<string, string | number | boolean> = {},
  opts: { once?: boolean | string } = {},
): void {
  if (typeof window === "undefined") return

  if (opts.once) {
    const key = typeof opts.once === "string" ? `${event}:${opts.once}` : event
    if (fired.has(key)) return
    fired.add(key)
  }

  const payload = { ...params, brand: "jothamhall" as const }
  const w = window as unknown as AnalyticsWindow

  try {
    w.dataLayer?.push({ event, ...payload })
  } catch {
    /* analytics must never take a conversion down with it */
  }
  try {
    /* trackCustom, not a Meta standard event: these are our own names and the
       standard ones assert things we are not claiming. */
    w.fbq?.("trackCustom", event, payload)
  } catch {
    /* as above */
  }
}
