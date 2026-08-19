import "server-only"
import { upsertContact, addTags, createOpportunity, isGhlConfigured as apiConfigured, type Brand } from "@/lib/ghl"

/**
 * One call that puts a lead into GoHighLevel properly.
 *
 * This is the thin layer the capture routes use. Everything that actually talks
 * to GHL lives in lib/ghl.ts, so there is one client rather than two drifting
 * copies of the same thing.
 *
 * FULL BACKBONE, NOT JUST A CONTACT. A lead becomes a contact with the brand and
 * its fields, gets tagged by brand and source, and opens an opportunity at the
 * first stage of that brand's own pipeline. A contact with no opportunity sits
 * in a list nobody works; the pipeline is where it actually gets followed up.
 *
 * NEVER THROWS. Callers record ghlSent true or false, and a CRM problem must not
 * be able to take down a form submission that has already emailed and saved.
 * lib/ghl.ts throws typed errors, this catches them.
 *
 * A THIRD DESTINATION, NEVER A DEPENDENCY. Database, inbox, CRM. None sits
 * downstream of another, because the homepage once had the notification chained
 * behind the database write and a paused project ate the entire lead.
 */

export type GhlResult = {
  ok: boolean
  /** Present when the lead did not fully land. Safe to put in an internal email. */
  reason?: string
  contactId?: string
  opportunityId?: string
}

export type GhlLead = {
  email: string
  name?: string
  phone?: string
  /** successupgrade or jothamhall. Decides tag and pipeline. */
  brand: Brand
  /** contact-form, quiz, newsletter, chat. Becomes the source tag. */
  source: string
  /** first-build, done-for-you, mentorship. Optional offer tag. */
  offer?: string
  /** Any provisioned custom field, keyed by name. */
  fields?: Record<string, string | number | undefined>
}

/** Only tags that were provisioned. An unknown one would be created silently and rot. */
const KNOWN_SOURCES = new Set(["contact-form", "quiz", "newsletter", "chat"])
const KNOWN_OFFERS = new Set(["first-build", "done-for-you", "mentorship"])

export function isGhlConfigured(): boolean {
  return apiConfigured() || Boolean(process.env.GOHIGHLEVEL_WEBHOOK_URL)
}

export async function sendToGhl(lead: GhlLead): Promise<GhlResult> {
  if (!apiConfigured()) {
    /* No token. The inbound webhook path is kept as a fallback so a location
       with only a workflow URL still receives leads, but it cannot create
       opportunities, so it is genuinely a lesser mode rather than an equal one. */
    const url = process.env.GOHIGHLEVEL_WEBHOOK_URL
    if (!url) return { ok: false, reason: "not configured" }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, submitted_at: new Date().toISOString() }),
        cache: "no-store",
      })
      return res.ok ? { ok: true } : { ok: false, reason: `webhook ${res.status}` }
    } catch (err) {
      return { ok: false, reason: err instanceof Error ? err.message : "webhook failed" }
    }
  }

  let contactId: string | undefined
  try {
    contactId = await upsertContact({
      brand: lead.brand,
      email: lead.email,
      name: lead.name,
      phone: lead.phone,
      customFields: { source: lead.source, offer: lead.offer, ...(lead.fields ?? {}) },
    })

    const tags = [`brand-${lead.brand}`]
    if (KNOWN_SOURCES.has(lead.source)) tags.push(`source-${lead.source}`)
    if (lead.offer && KNOWN_OFFERS.has(lead.offer)) tags.push(`offer-${lead.offer}`)
    await addTags(contactId, tags)

    const opportunityId = await createOpportunity({
      contactId,
      brand: lead.brand,
      name: lead.name ? `${lead.name} (${lead.source})` : `${lead.email} (${lead.source})`,
    })

    return { ok: true, contactId, opportunityId }
  } catch (err) {
    const reason = err instanceof Error ? err.message : "GHL failed"
    console.error(`[ghl] ${reason}`)
    /* Report the contact id even on a later failure. If the contact landed and
       only the opportunity did not, that is a very different problem from the
       lead never arriving, and the difference should not be lost. */
    return { ok: false, reason, contactId }
  }
}
