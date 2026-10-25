// Shared search and share settings, so every page gets the same treatment.

// Jo's headshot on the site's near black, 1200x630: what a shared link shows.
export const SHARE_IMAGE = { url: "/og-jotham-hall.jpg", width: 1200, height: 630, alt: "Jotham Hall" };

/*
  Search results show roughly 155 to 160 characters of a description and cut
  the rest mid word. This keeps as many whole sentences as fit; if even the
  first sentence is too long, it stops at the last whole word with an ellipsis.
*/
export function fitDescription(text: string, max = 155): string {
  const sentences = (text.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [text]).map((s) => s.trim());
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out) return out;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}
