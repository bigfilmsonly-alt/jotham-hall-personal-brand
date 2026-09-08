import "server-only"

/**
 * GoHighLevel API v2 client. One location, two brands.
 *
 * SERVER ONLY. GHL_PRIVATE_TOKEN can create contacts, move opportunities and
 * fire workflows in the account. In a NEXT_PUBLIC_ variable it would be baked
 * into the client bundle of a public website, one devtools tab from anybody. No
 * function here takes the token as an argument, so there is no call site that
 * could accidentally pass it down from the browser.
 *
 * IT IS NEVER LOGGED. Errors carry status and the API's own message, never the
 * request headers.
 *
 * ONE LOCATION, TWO BRANDS. successupgrade.ai and jothamhall.com both feed
 * DivpINqhDkgqu2ibUFno and are told apart by the `brand` custom field plus a
 * brand tag, the same way the shared Supabase tags every row. Pipelines are per
 * brand, so a lead never lands in the other business's board.
 */

const API = "https://services.leadconnectorhq.com"
/* GHL pins v2 behind a date header. Without it the request is rejected. */
const API_VERSION = "2021-07-28"

/* A third party on the critical path of a form submission. Without a ceiling a
   slow endpoint holds the request open while the visitor watches a spinner for
   something they cannot see. */
const TIMEOUT_MS = 8000

/* Field and pipeline definitions change rarely and every lead needs them. Long
   enough to matter, short enough that a rename in GHL takes effect on the next
   cold start rather than needing a deploy. */
const CACHE_MS = 10 * 60 * 1000

export type Brand = "successupgrade" | "jothamhall"

/** Named per brand at provisioning time. Resolved to ids at runtime, never hardcoded. */
const PIPELINE_FOR: Record<Brand, { pipeline: string; firstStage: string }> = {
  successupgrade: { pipeline: "Success Upgrade - First Build", firstStage: "New Lead" },
  jothamhall: { pipeline: "Jotham Hall - Done For You", firstStage: "New Inquiry" },
}

export class GhlError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly step?: string,
  ) {
    super(message)
    this.name = "GhlError"
  }
}

function config() {
  /* GHL_PRIVATE_TOKEN is the name the build brief specified. The older name is
     still read so an environment set before this file existed keeps working. */
  const token = process.env.GHL_PRIVATE_TOKEN || process.env.GOHIGHLEVEL_API_TOKEN
  const locationId = process.env.GHL_LOCATION_ID || process.env.GOHIGHLEVEL_LOCATION_ID
  return { token, locationId }
}

export function isGhlConfigured(): boolean {
  const { token, locationId } = config()
  return Boolean(token && locationId)
}

async function call<T>(method: string, path: string, body?: unknown, step = "request"): Promise<T> {
  const { token } = config()
  if (!token) throw new GhlError("GHL_PRIVATE_TOKEN is not set", undefined, step)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${API}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: API_VERSION,
        Accept: "application/json",
        "Content-Type": "application/json",
        /*
          GoHighLevel sits behind Cloudflare, which returns a 403 HTML page to
          clients whose user agent looks automated. Discovered the hard way:
          identical requests succeeded from curl and failed from a default
          runtime agent, and the 403 body was a Cloudflare page rather than
          anything from GHL.
        */
        "User-Agent": "successupgrade-server/1.0",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    })

    const text = await res.text()
    const json = text ? (JSON.parse(text) as T & { message?: string }) : ({} as T)

    if (!res.ok) {
      const msg = (json as { message?: string }).message || text.slice(0, 200) || res.statusText
      throw new GhlError(msg, res.status, step)
    }
    return json
  } catch (err) {
    if (err instanceof GhlError) throw err
    const aborted = err instanceof Error && err.name === "AbortError"
    throw new GhlError(
      aborted ? `timed out after ${TIMEOUT_MS}ms` : err instanceof Error ? err.message : "request failed",
      undefined,
      step,
    )
  } finally {
    clearTimeout(timer)
  }
}

/* ──────────────────────── custom fields ──────────────────────── */

/*
  Resolved by name at runtime and cached, so no field id is hardcoded and this
  survives being pointed at a different GHL location.

  IT HAS TO BE IDS. GoHighLevel accepts customFields as [{ id, value }] and
  writes them. It also accepts [{ key, field_value }], answers 200, and writes
  nothing at all. Measured: a contact upserted with the key form came back with
  an empty customFields array while tags and the opportunity landed correctly. A
  silent no-op behind a success response is the worst shape an API can have, so
  the lookup below exists purely to never send the key form again.
*/
type FieldDef = { id: string; name: string }
let fieldCache: { at: number; byName: Map<string, string> } | null = null

async function fieldIds(): Promise<Map<string, string>> {
  if (fieldCache && Date.now() - fieldCache.at < CACHE_MS) return fieldCache.byName
  const { locationId } = config()
  const res = await call<{ customFields: FieldDef[] }>(
    "GET",
    `/locations/${locationId}/customFields`,
    undefined,
    "customFields",
  )
  const byName = new Map((res.customFields ?? []).map((f) => [f.name, f.id]))
  fieldCache = { at: Date.now(), byName }
  return byName
}

/* ─────────────────────────── contacts ─────────────────────────── */

export type UpsertContactInput = {
  /** Drives the original and latest attribution fields. Omit and they are untouched. */
  source?: string
  brand: Brand
  email: string
  name?: string
  phone?: string
  /** Keyed by custom field name, e.g. { budget: "10k", challenge: "..." }. */
  customFields?: Record<string, string | number | undefined>
}

/** "Ada Lovelace" becomes first "Ada", last "Lovelace". One word stays a first name. */
function splitName(name?: string) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { firstName: parts[0] }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}

/**
 * Create or update by email, and return the contact id.
 *
 * Uses /contacts/upsert rather than /contacts/, because create returns 400 for
 * an email GHL already holds and a returning customer is not an error worth
 * branching on at every call site.
 */
/**
 * Existing custom field values for one contact, keyed by field NAME.
 *
 * Needed for write-once attribution: you cannot honour "never overwrite the
 * original" without first knowing whether an original is already there.
 * Returns an empty map on any failure, which makes the caller treat the contact
 * as new. That direction is safe: it writes an original that may already match,
 * rather than skipping one that was missing.
 */
async function existingFields(email: string): Promise<Map<string, string>> {
  const { locationId } = config()
  const out = new Map<string, string>()
  try {
    const res = await call<{
      contacts?: { customFields?: { id: string; value?: string }[] }[]
    }>(
      "GET",
      `/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}&limit=1`,
      undefined,
      "existingFields",
    )
    const fields = res.contacts?.[0]?.customFields ?? []
    const byId = new Map([...(await fieldIds())].map(([name, id]) => [id, name]))
    for (const f of fields) {
      const name = byId.get(f.id)
      if (name && f.value) out.set(name, String(f.value))
    }
  } catch {
    /* treated as a new contact, see above */
  }
  return out
}

export async function upsertContact(input: UpsertContactInput): Promise<string> {
  const { locationId } = config()
  if (!locationId) throw new GhlError("GHL_LOCATION_ID is not set", undefined, "upsertContact")

  /*
    ATTRIBUTION, AND WHY IT IS HERE RATHER THAN AT THE CALL SITES.

    The scalar fields on a contact are last-write-wins, so a Jotham Hall
    interaction overwrote how a Success Upgrade lead originally arrived. Fixing
    that per call site would mean every future form has to remember the rule.
    Doing it in the one function that writes contacts means every path gets it:
    forms, quiz, chat and bookings.

    original_* is WRITE ONCE. Once populated it is never touched again, because
    the question it answers, where did this human first enter, has exactly one
    true answer and a later touch is not new evidence about it.

    latest_* updates every time. Tags remain the cumulative history and are
    written by the caller.

    Fields that do not exist yet in GHL are skipped with a warning by the loop
    below, so this is safe to ship before Instinct provisions them.
  */
  const prior = input.source ? await existingFields(input.email) : new Map<string, string>()
  const attribution: Record<string, string | undefined> = input.source
    ? {
        latest_source: input.source,
        latest_brand: input.brand,
        ...(prior.get("original_source") ? {} : { original_source: input.source }),
        ...(prior.get("original_brand") ? {} : { original_brand: input.brand }),
      }
    : {}

  const merged: Record<string, string | number | undefined> = {
    brand: input.brand,
    ...attribution,
    ...(input.customFields ?? {}),
  }
  const ids = await fieldIds()
  const custom: { id: string; value: string }[] = []
  for (const [name, value] of Object.entries(merged)) {
    if (value === undefined || value === "") continue
    const id = ids.get(name)
    if (!id) {
      /* Not provisioned. Skipped loudly rather than sent, because GHL would
         accept the write and drop it, and a field that silently never fills is
         worse than one that was never asked for. */
      console.warn(`[ghl] no custom field named "${name}", skipping`)
      continue
    }
    custom.push({ id, value: String(value) })
  }

  const res = await call<{ contact?: { id?: string }; id?: string }>(
    "POST",
    "/contacts/upsert",
    {
      locationId,
      email: input.email,
      ...splitName(input.name),
      ...(input.phone ? { phone: input.phone } : {}),
      customFields: custom,
    },
    "upsertContact",
  )

  const id = res.contact?.id ?? res.id
  if (!id) throw new GhlError("upsert returned no contact id", undefined, "upsertContact")
  return id
}

export async function addTags(contactId: string, tags: string[]): Promise<void> {
  const clean = tags.filter(Boolean)
  if (clean.length === 0) return
  await call("POST", `/contacts/${contactId}/tags`, { tags: clean }, "addTags")
}

/* ───────────────────────── opportunities ───────────────────────── */

type Pipeline = { id: string; name: string; stages?: { id: string; name: string }[] }

/*
  Pipelines change rarely and every lead needs them, so they are cached for the
  life of the serverless instance. Not longer: a rename in GHL should take
  effect on the next cold start rather than requiring a deploy.
*/
let pipelineCache: { at: number; list: Pipeline[] } | null = null

async function pipelines(): Promise<Pipeline[]> {
  if (pipelineCache && Date.now() - pipelineCache.at < CACHE_MS) return pipelineCache.list
  const { locationId } = config()
  const res = await call<{ pipelines: Pipeline[] }>(
    "GET",
    `/opportunities/pipelines?locationId=${locationId}`,
    undefined,
    "pipelines",
  )
  pipelineCache = { at: Date.now(), list: res.pipelines ?? [] }
  return pipelineCache.list
}

export type CreateOpportunityInput = {
  contactId: string
  brand: Brand
  name: string
  /** Defaults to the brand's own pipeline and its first stage. */
  pipeline?: string
  stage?: string
  monetaryValue?: number
}

/**
 * An existing OPEN opportunity for this contact IN ONE PIPELINE.
 *
 * SCOPED TO THE PIPELINE ON PURPOSE, and this is the whole design decision.
 *
 * The rule is one human = one contact, one active buying intent = one open
 * opportunity. Contact identity is the human; opportunity identity is the
 * intent. So the dedupe key has to be the intent, never the contact alone: a
 * global "one open opportunity per person" would collapse a genuine first build
 * enquiry and a genuine done-for-you enquiry into one deal and lose a real sale.
 *
 * The pipeline is the only thing in this system that actually varies with the
 * offer, so it is the intent key. `offer` looks like the right field and is not:
 * every call site that sets it sends the single value "done-for-you", including
 * jothamhall.com's newsletter signups, and the quiz, newsletter and chat paths
 * set no offer at all. Keying on it would be keying on a constant.
 *
 * Returns null when the search itself fails, which deliberately falls through to
 * creating one. A CRM lookup that errors must not swallow a real lead.
 */
async function findOpenOpportunityInPipeline(
  contactId: string,
  pipelineId: string,
): Promise<string | null> {
  const { locationId } = config()
  try {
    const res = await call<{ opportunities?: { id: string; status: string; pipelineId?: string }[] }>(
      "GET",
      `/opportunities/search?location_id=${locationId}&contact_id=${contactId}&status=open`,
      undefined,
      "findOpenOpportunityInPipeline",
    )
    return (
      res.opportunities?.find((o) => o.status === "open" && o.pipelineId === pipelineId)?.id ?? null
    )
  } catch {
    return null
  }
}

/** One open opportunity for this contact in a pipeline, with its current stage. */
export async function openOpportunityIn(
  contactId: string,
  pipelineId: string,
): Promise<{ id: string; pipelineStageId?: string } | null> {
  const { locationId } = config()
  try {
    const res = await call<{
      opportunities?: { id: string; status: string; pipelineId?: string; pipelineStageId?: string }[]
    }>(
      "GET",
      `/opportunities/search?location_id=${locationId}&contact_id=${contactId}&status=open`,
      undefined,
      "openOpportunityIn",
    )
    const found = res.opportunities?.find((o) => o.status === "open" && o.pipelineId === pipelineId)
    return found ? { id: found.id, pipelineStageId: found.pipelineStageId } : null
  } catch {
    return null
  }
}

/** Look a pipeline up by name, with its stages, so callers can resolve stage ids. */
export async function pipelineByName(
  name: string,
): Promise<{ id: string; stages: { id: string; name: string }[] } | null> {
  const p = (await pipelines()).find((x) => x.name === name)
  return p ? { id: p.id, stages: (p.stages ?? []).map((s) => ({ id: s.id, name: s.name })) } : null
}

/**
 * Move one opportunity to a stage. Never backwards, never onto a closed deal.
 *
 * The guard is the point. A booking arriving late, or the same notification
 * processed twice, must not drag a deal that a human has already advanced back
 * to an earlier stage. Stage order is taken from the pipeline itself rather
 * than hardcoded, so renaming or reordering stages in GHL does not silently
 * invert this rule.
 */
export async function moveOpportunityStage(
  opportunityId: string,
  pipelineId: string,
  toStageId: string,
  fromStageId?: string,
): Promise<"moved" | "already-there" | "not-backwards"> {
  if (fromStageId === toStageId) return "already-there"

  const p = (await pipelines()).find((x) => x.id === pipelineId)
  const order = (p?.stages ?? []).map((s) => s.id)
  const from = fromStageId ? order.indexOf(fromStageId) : -1
  const to = order.indexOf(toStageId)
  if (from > -1 && to > -1 && to < from) return "not-backwards"

  await call(
    "PUT",
    `/opportunities/${opportunityId}`,
    { pipelineId, pipelineStageId: toStageId },
    "moveOpportunityStage",
  )
  return "moved"
}

export async function createOpportunity(input: CreateOpportunityInput): Promise<string> {
  const { locationId } = config()
  const wanted = PIPELINE_FOR[input.brand]
  const pipelineName = input.pipeline ?? wanted.pipeline
  const stageName = input.stage ?? wanted.firstStage

  const list = await pipelines()
  const p = list.find((x) => x.name === pipelineName)
  if (!p) throw new GhlError(`pipeline not found: ${pipelineName}`, undefined, "createOpportunity")

  const stage = (p.stages ?? []).find((s) => s.name === stageName)
  if (!stage) throw new GhlError(`stage not found: ${stageName} in ${pipelineName}`, undefined, "createOpportunity")

  /*
    Same person, same intent, already has a live deal here. Return it rather than
    opening a second, and leave its stage alone: it may have been advanced past
    the first stage by a human, and dragging it back to New Lead because someone
    filled in another form would undo real sales work.
  */
  const existing = await findOpenOpportunityInPipeline(input.contactId, p.id)
  if (existing) return existing

  const res = await call<{ opportunity?: { id?: string }; id?: string }>(
    "POST",
    "/opportunities/",
    {
      locationId,
      pipelineId: p.id,
      pipelineStageId: stage.id,
      contactId: input.contactId,
      name: input.name,
      status: "open",
      ...(input.monetaryValue ? { monetaryValue: input.monetaryValue } : {}),
    },
    "createOpportunity",
  )

  const id = res.opportunity?.id ?? res.id
  if (!id) throw new GhlError("create returned no opportunity id", undefined, "createOpportunity")
  return id
}
