import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import ScrollSections from "@/components/ui/scroll-sections"
import { Footer } from "@/components/ui/footer"
import { HeroCta } from "@/components/ui/hero-cta"
import { BALICKY, FIRMA, JISTOTY, ODEZVA } from "@/lib/firma"

/**
 * Strukturovaná data pro lokální vyhledávání. Popisují jen to, co je
 * na stránce opravdu vidět (ceny, telefon, e-mail). Značkovat skrytý
 * obsah je důvod k ručnímu postihu.
 *
 * areaServed má město i celou ČR: osobně jezdím po Slovácku, na dálku
 * pracuju kdekoli. Adresa chybí schválně, dokud není co vyplnit.
 */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: FIRMA.jmeno,
    description: `Tvorba webových stránek pro živnostníky, malé firmy, restaurace a řemeslníky z ${FIRMA.mestoGen} a okolí. Na dálku po celé ČR.`,
    url: FIRMA.url,
    email: FIRMA.email,
    telephone: FIRMA.telefonHref,
    priceRange: `${BALICKY[0].cena}–${BALICKY[BALICKY.length - 1].cena} CZK`,
    areaServed: [
      { "@type": "City", name: FIRMA.mesto },
      { "@type": "Place", name: FIRMA.region },
      { "@type": "Country", name: "Česká republika" },
    ],
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

      {/* Hero. Jedna řádka nadpisu a dvě věty pod ní — druhá řádka
          „Hledám první tři klienty" dělala z úvodu hradbu textu.
          Nabídka pro první klienty žije dál v ceníku (PRVNI_KLIENTI). */}
      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
            Tvorba webů · {FIRMA.mesto}
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Web pro vaši firmu od {BALICKY[0].cenaText}.
          </h1>

          {/* Dvě věty, víc ne. První portfolio pořád vysvětluje nízkou cenu
              i plnou pozornost — jen bez rozvíjení („ne jedna z deseti…"),
              které úvod natahovalo. */}
          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
            Jsem {FIRMA.jmeno} a stavím si první portfolio. Proto je cena
            nízká a váš web bude jediná zakázka, kterou zrovna dělám.
            Čtyři ukázky si můžete proklikat níž.
          </p>

          {/* Reference nemám, tak riziko nesu já. Tři závazky, ne tři
              přídavná jména — a stojí těsně nad tlačítkem schválně. */}
          <ul className="mx-auto mt-8 flex max-w-2xl flex-col justify-center gap-x-8 gap-y-3 sm:flex-row">
            {JISTOTY.map((j) => (
              <li key={j.nadpis} className="flex items-start justify-center gap-2 text-left sm:flex-1">
                <svg className="mt-0.5 size-4 shrink-0 text-akcent" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <span className="block text-sm font-semibold text-white">{j.nadpis}</span>
                  <span className="block text-xs leading-relaxed text-white/55">{j.text}</span>
                </span>
              </li>
            ))}
          </ul>

          <HeroCta />

          <p className="mx-auto mt-8 max-w-xl text-sm text-white/50">
            Sídlím v {FIRMA.mestoLok}, na dálku pracuju kdekoli v Česku. Cenu i termín pošlu {ODEZVA.dlouhy}.
          </p>
        </div>
      </section>

      {/* Scroll-triggered card sections */}
      <ScrollSections />

      {/* Footer */}
      {/* Stejný obal jako karty sekcí, aby patička začínala a končila
          přesně na jejich hraně, ne o šířku odsazení vedle. */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-10 md:pt-0">
        <Footer />
      </div>
    </main>
  )
}
