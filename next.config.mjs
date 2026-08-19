/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/tv-credits", destination: "/credits", permanent: true },
      { source: "/television", destination: "/credits", permanent: true },
      { source: "/filmography", destination: "/credits", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            // No X-Frame-Options here on purpose. It cannot allowlist a single
            // origin (ALLOW-FROM is dead in every current browser), and
            // successupgrade.ai/mentorship embeds this site full screen.
            // frame-ancestors below does the same job and can name an origin.
            // This MUST stay on the enforcing header: frame-ancestors is
            // ignored entirely in Content-Security-Policy-Report-Only.
            // Both apex and www are listed because successupgrade.ai 308s to
            // www, so www is the origin that actually does the framing.
            // builtbyjothamhall.vercel.app is the Lumi med spa demo, whose
            // footer and welcome screen credit this site and frame it in the
            // same in app overlay rather than sending the visitor away.
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://successupgrade.ai https://www.successupgrade.ai https://builtbyjothamhall.vercel.app",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
