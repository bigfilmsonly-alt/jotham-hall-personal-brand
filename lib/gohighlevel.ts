import "server-only"

/**
 * Push a lead into GoHighLevel.
 *
 * SERVER ONLY, AND THAT IS THE POINT. Both credentials below are write
 * credentials: whoever holds them can create contacts and fire workflows in the
 * account. In a NEXT_PUBLIC_ variable either one would be baked into the client
 * bundle of a public website, one devtools tab away from anybody. Neither ever
 * reaches the browser.
 *
 * TWO WAYS IN, AND IT TAKES WHICHEVER EXISTS.
 *
 *   1. Private Integration Token, preferred. Settings, Private Integrations, in
 *      the GHL account. Creates a real contact through API v2, so GHL does its
 *      own deduplication and the record carries name, phone and source as
 *      proper fields rather than as workflow payload.
 *
 *   2. Inbound Webhook URL, the fallback. Automation, Workflows, Inbound
 *      Webhook trigger. No auth to configure because the URL is the secret.
 *      Simpler to set up, but the lead arrives as workflow data rather than as
 *      a structured contact.
 *
 * A THIRD DESTINATION, NEVER A DEPENDENCY. A capture lands in three places: the
 * database as a record, the inbox as a notification, GHL as a contact. None may
 * sit downstream of another. That rule exists because the successupgrade.ai
 * homepage once had the notification chained behind the database write, so a
 * paused project ate the whole lead rather than just the row.
 *
 * Same file as successupgrade.ai's on purpose. Both sites feed one GHL account,
 * and two drifting copies of a CRM client is how one site quietly stops sending.
 *
 * DEGRADES TO NOTHING. With neither credential set this returns "not
 * configured" and the capture is otherwise unaffected.
 */

export type GhlResult = {
  ok: boolean
  /** Present when the lead did not reach GHL. Safe to put in an internal email. */
  reason?: string
  /** Which path was used, so a failure email says where to look. */
  via?: "api" | "webhook"
}

export type GhlLead = {
  email: string
  name?: string
  phone?: string
  /** Which form or page produced it, so GHL workflows can branch on it. */
  source: string
  /** Anything else worth carrying. */
  extra?: Record<string, unknown>
}

/* The account these sites feed. Not a secret: it is visible in every dashboard
   URL and is useless without a token. Kept here so a token is the only thing
   anyone has to add. Override with GOHIGHLEVEL_LOCATION_ID if the account moves
   again, which it already did once. */
const DEFAULT_LOCATION_ID = "DivpINqhDkgqu2ibUFno"

const API_BASE = "https://services.leadconnectorhq.com"
/* GHL pins API v2 behind a date header. Without it the request is rejected. */
const API_VERSION = "2021-07-28"

/* GHL is a third party on the critical path of a form submission. Without a
   ceiling, a slow endpoint holds the request open and the visitor watches a
   spinner for something they neither asked for nor can see. */
const TIMEOUT_MS = 6000

export function isGhlConfigured(): boolean {
  return Boolean(process.env.GOHIGHLEVEL_API_TOKEN || process.env.GOHIGHLEVEL_WEBHOOK_URL)
}

/** "Ada Lovelace" becomes first "Ada", last "Lovelace". One word stays a first name. */
function splitName(name?: string): { firstName?: string; lastName?: string } {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { firstName: parts[0] }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

async function withTimeout(run: (signal: AbortSignal) => Promise<Response>): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await run(controller.signal)
  } finally {
    clearTimeout(timer)
  }
}

async function viaApi(lead: GhlLead, token: string): Promise<GhlResult> {
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID || DEFAULT_LOCATION_ID
  try {
    const res = await withTimeout((signal) =>
      fetch(`${API_BASE}/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: API_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          locationId,
          email: lead.email,
          ...splitName(lead.name),
          ...(lead.phone ? { phone: lead.phone } : {}),
          source: lead.source,
        }),
        signal,
        cache: "no-store",
      }),
    )

    if (res.ok) return { ok: true, via: "api" }

    const detail = (await res.text().catch(() => "")).slice(0, 300)

    /*
      A returning visitor is not an error. GHL answers 400 for an email it
      already holds, and treating that as a failure would put a red line in the
      log every time a real customer came back, which is how a monitor stops
      being read.
    */
    if (res.status === 400 && /duplicat/i.test(detail)) {
      return { ok: true, via: "api" }
    }

    console.error(`[ghl] api ${res.status} ${detail}`)
    return { ok: false, via: "api", reason: `GHL API ${res.status}${detail ? `: ${detail}` : ""}` }
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError"
    const reason = aborted ? `timed out after ${TIMEOUT_MS}ms` : err instanceof Error ? err.message : "request failed"
    console.error(`[ghl] api ${reason}`)
    return { ok: false, via: "api", reason }
  }
}

async function viaWebhook(lead: GhlLead, url: string): Promise<GhlResult> {
  try {
    const res = await withTimeout((signal) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: lead.email,
          name: lead.name ?? "",
          phone: lead.phone ?? "",
          source: lead.source,
          submitted_at: new Date().toISOString(),
          ...(lead.extra ?? {}),
        }),
        signal,
        cache: "no-store",
      }),
    )

    if (res.ok) return { ok: true, via: "webhook" }

    /* Read a little of the body: GHL returns a useful message on a deactivated
       or deleted webhook, and "GHL 404" alone sends someone looking in the
       wrong place. */
    const detail = (await res.text().catch(() => "")).slice(0, 200)
    console.error(`[ghl] webhook ${res.status} ${detail}`)
    return { ok: false, via: "webhook", reason: `GHL ${res.status}${detail ? `: ${detail}` : ""}` }
  } catch (err) {
    const aborted = err instanceof Error && err.name === "AbortError"
    const reason = aborted ? `timed out after ${TIMEOUT_MS}ms` : err instanceof Error ? err.message : "request failed"
    console.error(`[ghl] webhook ${reason}`)
    return { ok: false, via: "webhook", reason }
  }
}

export async function sendToGhl(lead: GhlLead): Promise<GhlResult> {
  const token = process.env.GOHIGHLEVEL_API_TOKEN
  if (token) return viaApi(lead, token)

  const url = process.env.GOHIGHLEVEL_WEBHOOK_URL
  if (url) return viaWebhook(lead, url)

  return { ok: false, reason: "not configured" }
}
