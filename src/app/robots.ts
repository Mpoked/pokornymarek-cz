import type { MetadataRoute } from "next"
import { FIRMA } from "@/lib/firma"

/**
 * Vyhledávače nemají indexovat administraci ani API. Není to bezpečnostní
 * ochrana (tou je heslo + rate limit), jen aby se /admin nešířilo ve
 * výsledcích vyhledávání.
 *
 * Pravidlo platí pro všechny roboty včetně SeznamBota — Seznam má u téhle
 * cílovky (starší, lokální) reálný podíl, takže ho neblokujeme.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${FIRMA.url}/sitemap.xml`,
    host: FIRMA.url,
  }
}
