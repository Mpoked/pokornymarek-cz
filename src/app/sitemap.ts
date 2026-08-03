import type { MetadataRoute } from "next"
import { FIRMA } from "@/lib/firma"

/**
 * Sitemapa pro Google i Seznam. Zatím jen dvě veřejné stránky —
 * admin a API jsou mimo (viz robots.ts), ukázky v /public/ukazky
 * mají vlastní <meta name="robots" content="noindex">.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: FIRMA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${FIRMA.url}/ochrana-osobnich-udaju`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
