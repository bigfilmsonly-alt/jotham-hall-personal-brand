/**
 * One place for the public contact address.
 *
 * It was hardcoded in six files, which is exactly how bigfilmsonly@gmail.com
 * ended up being the public face of this site long after it stopped being the
 * inbox anyone watched. A constant means the next change is one edit, not a
 * grep that misses the structured data.
 *
 * PUBLIC ONLY. bigfilmsonly@gmail.com is still the internal notification and
 * Calendly booking transport inbox and must not be swapped for this: see
 * NOTIFY_TO in app/api/notify/route.ts, and the booking pipe that reads
 * Calendly's host notifications out of that mailbox.
 */
export const PUBLIC_CONTACT_EMAIL = "successupgradeinbox@gmail.com"
