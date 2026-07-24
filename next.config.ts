import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Content-Security-Policy — pragmatická, ale výrazně omezuje prostor pro XSS.
// - 'unsafe-inline' u scriptů/stylů je nutné kvůli Next.js hydrataci a inline
//   style={{}} (framer-motion, sticky karty). Nonce by šel, ale přidává
//   složitost a riziko rozbití; tohle je dobrý poměr bezpečnost/údržba.
// - blob:/data: kvůli WebGL pozadí (three.js / paper-shaders).
// - V devu navíc 'unsafe-eval' a ws: kvůli HMR / React Refresh.
const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `img-src 'self' data: blob:`,
  `font-src 'self' data:`,
  `style-src 'self' 'unsafe-inline'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
]
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // frame-ancestors 'none' výše je novější ekvivalent; X-Frame-Options
  // ponecháváme pro starší prohlížeče.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // HSTS řeší i Cloudflare edge; nastavujeme i tady jako pojistku.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Neprozrazovat, že běží Next.js (drobné omezení fingerprintingu).
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
