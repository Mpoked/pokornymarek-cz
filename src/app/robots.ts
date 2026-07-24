import type { MetadataRoute } from "next"

/**
 * Vyhledávače nemají indexovat administraci ani API. Není to bezpečnostní
 * ochrana (tou je heslo + rate limit), jen aby se /admin nešířilo ve
 * výsledcích vyhledávání.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
  }
}
