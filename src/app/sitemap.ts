import type { MetadataRoute } from "next"
import { FIRMA } from "@/lib/firma"
import { OBORY } from "@/lib/obory"

/**
 * Sitemapa pro Google i Seznam. Admin a API jsou mimo (viz robots.ts),
 * ukázky v /public/ukazky mají vlastní <meta name="robots" content="noindex">.
 * Oborové stránky se berou z OBORY, nový obor se sem dostane sám.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: FIRMA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...OBORY.map((o) => ({
      url: `${FIRMA.url}/weby-pro/${o.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${FIRMA.url}/ochrana-osobnich-udaju`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
