import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import ScrollSections from "@/components/ui/scroll-sections"
import { Footer } from "@/components/ui/footer"
import { HeroCta } from "@/components/ui/hero-cta"
import { BALICKY, FIRMA, ODEZVA, PRVNI_KLIENTI } from "@/lib/firma"

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

      {/* Hero. Nulové portfolio se nedá schovat, tak ať aspoň pracuje:
          „hledám první tři klienty" je novinka, vysvětluje nízkou cenu
          a dává důvod ozvat se teď a ne někdy. */}
      <section className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/40">
            Tvorba webů · {FIRMA.mesto}
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Web pro vaši firmu od {BALICKY[0].cenaText}.
            {PRVNI_KLIENTI.aktivni && (
              <span className="mt-2 block text-white/70">
                Hledám {PRVNI_KLIENTI.pocet === 3 ? "první tři" : `prvních ${PRVNI_KLIENTI.pocet}`} klienty.
              </span>
            )}
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed">
            Jsem {FIRMA.jmeno}. Weby dělám od roku {FIRMA.odRoku}, zatím
            při škole. Zakázku pro klienta jsem ještě nedělal a nebudu
            předstírat, že ano. Místo referencí vám ukážu čtyři weby,
            které jsem postavil od nuly, a dám cenu, za kterou to nikdo
            se stovkou zakázek za sebou neudělá.
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/35">
            Sídlím v {FIRMA.mestoLok}, po Slovácku se rád stavím osobně.
            Na dálku pracuju kdekoli v Česku. Cenu i termín pošlu {ODEZVA.dlouhy}.
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
