// Routes that hand the whole screen to a guest site (components/venture-embed.tsx).
// The root layout's tab bar and floating CTA stand down on these, so the only
// navigation on screen is the guest's own.
export function isFullBleed(pathname: string | null) {
  return !!pathname && /^\/ventures\/[^/]+\/site\/?$/.test(pathname);
}
