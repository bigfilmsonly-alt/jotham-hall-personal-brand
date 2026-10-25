// Whether a guest site lets jothamhall.com show it in a frame, read from the
// guest's own response headers. A guest that refuses (Verza TV's release on
// 2026-10-15 brought back X-Frame-Options: DENY) gets an "open it" panel in
// the viewer instead of a blank frame, and the viewer frames it again on its
// own once the guest allows it, because the viewer re-checks every hour.

const OURS = /(^|\s)(https:\/\/(www\.)?jothamhall\.com|\*)(\s|$)/i;

export async function canFrameIn(url: string): Promise<boolean> {
  try {
    // Eight seconds at most, so a slow guest never holds up a build or a page.
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(8000), next: { revalidate: 3600 } });
    // frame-ancestors on an enforcing policy wins over X-Frame-Options in every current browser.
    const policy = res.headers.get("content-security-policy") ?? "";
    const ancestors = policy
      .split(";")
      .map((d) => d.trim())
      .find((d) => d.toLowerCase().startsWith("frame-ancestors"));
    if (ancestors) return OURS.test(ancestors.slice("frame-ancestors".length));
    const xfo = (res.headers.get("x-frame-options") ?? "").toLowerCase();
    return !(xfo.includes("deny") || xfo.includes("sameorigin"));
  } catch {
    // The guest could not be reached from here; try the frame and let the browser decide.
    return true;
  }
}
