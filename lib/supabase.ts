import { createClient } from '@supabase/supabase-js'

/*
  The database, and a guard around it.

  THIS PROJECT IS SHARED WITH successupgrade.ai. Same Supabase project, same
  three tables, same anon key. Anything changed here about table shape or
  policies affects that site too, and the reverse.

  WHY THE GUARD EXISTS. On 18 Aug 2026 the shared project was paused, and a
  paused project drops its DNS record, so every write failed. Nothing on either
  site changed: forms submitted, thank you messages appeared, and the results of
  the writes were discarded at every call site. A dead backend and a healthy one
  were indistinguishable from the browser and from the person running the
  business. successupgrade.ai got this guard the same day; this site did not, and
  went on failing silently for another day.

  So: the client is null when it is not configured, which makes TypeScript find
  every call site rather than trusting a non-null assertion, and saveRecord
  reports what actually happened instead of returning void.

  EVERY ROW IS TAGGED WITH brand. Both sites write into the same tables, so
  without it a lead cannot be attributed to the site that produced it. This one
  writes "jothamhall", the other writes "successupgrade".
*/

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

/** Which site produced the row. Never omit it. */
export const BRAND = 'jothamhall'

/* Null rather than a client built on empty strings. A client pointed at "" fails
   at request time with a confusing error; null fails at compile time with a
   useful one. */
export const supabase = isSupabaseConfigured ? createClient(url as string, anonKey as string) : null

export type SaveResult = {
  ok: boolean
  /** Present only on failure. Safe to put in an internal notification. */
  reason?: string
}

/**
 * Insert one row and say whether it worked. Never throws.
 *
 * INSERT, NOT UPSERT. Every email_captures write on this site used
 * `.upsert({...}, { onConflict: "email" })`, which asks Postgres for
 * INSERT ... ON CONFLICT DO UPDATE. That needs an UPDATE policy as well as an
 * INSERT one, and the shared project grants insert only, so every one of those
 * writes was refused with 42501 even after the database came back. Verified
 * against the live project on 19 Aug 2026.
 *
 * Granting update would fix the symptom and cost more than it saves: the anon
 * key ships in the client bundle of a public site, and an update policy on a
 * table nobody can select is still a policy that lets a stranger overwrite rows.
 * Deduplicating a capture log is a reporting concern, not a storage constraint,
 * so the same person signing up twice simply writes two rows now.
 */
export async function saveRecord(
  table: string,
  row: Record<string, unknown>,
): Promise<SaveResult> {
  if (!supabase) {
    console.error(`[supabase] ${table}: not configured, row dropped`)
    return { ok: false, reason: 'not configured' }
  }

  try {
    const { error } = await supabase.from(table).insert({ brand: BRAND, ...row })
    if (error) {
      /* The case that was invisible before. supabase-js reports most failures
         here rather than throwing, so a discarded return value discards the
         entire error path. */
      console.error(`[supabase] ${table}: ${error.message}`)
      return { ok: false, reason: error.message }
    }
    return { ok: true }
  } catch (err) {
    /* An unresolvable host rejects at the fetch layer. This is the branch a
       paused project takes. */
    const reason = err instanceof Error ? err.message : 'request failed'
    console.error(`[supabase] ${table}: ${reason}`)
    return { ok: false, reason }
  }
}
