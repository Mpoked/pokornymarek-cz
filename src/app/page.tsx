import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import ScrollSections from "@/components/ui/scroll-sections"
import { Footer } from "@/components/ui/footer"
import { HeroCta } from "@/components/ui/hero-cta"
import { BALICKY, FIRMA, ODEZVA } from "@/lib/firma"

/**
 * Strukturovaná data pro lokální vyhledávání. Popisují jen to, co je
 * na stránce opravdu vidět (ceny, telefon, e-mail) — značkovat skrytý
 * obsah je důvod k ručnímu postihu.
 *
 * Adresa se přidá až bude doplněná ve FIRMA — neúplný PostalAddress
 * je horší než žádný.
 */
function jsonLd() {
  const maAdresu = !FIRMA.ulice.startsWith("[DOPLNIT")

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: FIRMA.jmeno,
    description: `Tvorba webových stránek pro živnostníky, malé firmy, restaurace a řemeslníky z ${FIRMA.mestoGen} a okolí.`,
    url: FIRMA.url,
    email: FIRMA.email,
    telephone: FIRMA.telefonHref,
    priceRange: "9900–34900 CZK",
    areaServed: [
      { "@type": "City", name: FIRMA.mesto },
      { "@type": "Place", name: FIRMA.region },
    ],
    ...(maAdresu && {
      address: {
        "@type": "PostalAddress",
        streetAddress: FIRMA.ulice,
        addressLocality: FIRMA.mesto,
        postalCode: FIRMA.psc,
        addressCountry: "CZ",
      },
    }),
    founder: {
      "@type": "Person",
      name: FIRMA.jmeno,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Balíčky tvorby webu",
      itemListElement: BALICKY.map((b) => ({
        "@type": "Offer",
        name: b.nazev,
        price: b.cena,
        priceCurrency: "CZK",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: b.cena,
          priceCurrency: "CZK",
        },
      })),
    },
  }
}

export default function Home() {
  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />

      {/* Fixed fullscreen background */}
      <div className="fixed inset-0 z-0">
        <PaperBackground />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero — první obrazovka musí říct co prodávám, komu a za kolik.
          Dřív tu bylo jen jméno, které nikdo nehledá a nic neslibuje. */}
      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
            Tvorba webů · {FIRMA.mesto}
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Web pro vaši firmu od 9 900 Kč.
            <span className="mt-2 block text-white/70">
              Bez agentury, bez obchodníka mezi námi.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
            Jsem {FIRMA.jmeno}. Dělám weby pro živnostníky, řemeslníky
            a restaurace ze Slovácka — sám, od prvního návrhu po spuštění.
            Domlouváte se přímo se mnou, ne s někým, kdo to pak přehodí dál.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/35">
            {FIRMA.pocetWebu} hotových webů od roku {FIRMA.odRoku}. Cenu i termín
            pošlu {ODEZVA.dlouhy}.
          </p>

          <HeroCta />
        </div>
      </section>

      {/* Scroll-triggered card sections */}
      <ScrollSections />

      {/* Footer */}
      <div className="relative z-10 px-6 pb-8 pt-10 md:pt-0">
        <Footer />
      </div>
    </main>
  )
}
