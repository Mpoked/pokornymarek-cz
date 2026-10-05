import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PaperBackground from "@/components/ui/paper-background"
import Navbar from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { BALICKY, DODANI, FIRMA, ODEZVA } from "@/lib/firma"
import { OBORY, najdiObor, type Obor } from "@/lib/obory"

/* Obory jsou pevně v kódu, takže cokoli mimo pole je 404, ne stránka
   vyrenderovaná na požádání pro libovolný slug. */
export const dynamicParams = false

export function generateStaticParams() {
  return OBORY.map((o) => ({ obor: o.slug }))
}

export async function generateMetadata(
  props: PageProps<"/weby-pro/[obor]">
): Promise<Metadata> {
  const { obor } = await props.params
  const o = najdiObor(obor)
  if (!o) return {}
  const url = `/weby-pro/${o.slug}`
  return {
    title: `${o.title}, od ${BALICKY[0].cenaText} | ${FIRMA.jmeno}`,
    description: o.description,
    alternates: { canonical: url },
    openGraph: { url, title: o.title, description: o.description },
  }
}

/* Stejná pravidla jako JSON-LD na úvodní stránce: jen to, co je tu vidět. */
function jsonLd(o: Obor) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Tvorba webů pro ${o.nazev}`,
    name: o.title,
    description: o.description,
    url: `${FIRMA.url}/weby-pro/${o.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: FIRMA.jmeno,
      url: FIRMA.url,
      email: FIRMA.email,
      telephone: FIRMA.telefonHref,
    },
    areaServed: [
      { "@type": "Place", name: FIRMA.region },
      { "@type": "Country", name: "Česká republika" },
    ],
    offers: {
      "@type": "Offer",
      price: BALICKY[0].cena,
      priceCurrency: "CZK",
    },
  }
}

/* Karta a štítek vypadají stejně jako na hlavní stránce (scroll-sections.tsx),
   jen se nelepí: lepení je navázané na pět sekcí hlavní stránky a jejich
   výšky, tady by karty jen překrývaly text. */
const KARTA = "rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl p-6 sm:p-8 md:p-10"

function Stitek({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-white/45">
      <span className="text-akcent">{num}</span> <span className="ml-1">{children}</span>
    </p>
  )
}

const BTN_PRIMARNI =
  "w-full rounded-lg bg-white px-6 py-3.5 text-center text-sm font-semibold text-black transition-all hover:bg-white/85 sm:w-auto"
const BTN_SEKUNDARNI =
  "w-full rounded-lg border border-white/45 bg-white/5 px-6 py-3.5 text-center text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto"

export default async function OborPage(props: PageProps<"/weby-pro/[obor]">) {
  const { obor } = await props.params
  const o = najdiObor(obor)
  if (!o) notFound()

  const ostatni = OBORY.filter((x) => x.slug !== o.slug)

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(o)) }}
      />

      <div className="fixed inset-0 z-0">
        <PaperBackground />
      </div>

      <Navbar />

      {/* Hero ve stejné skladbě jako hlavní stránka, jen nižší, ať je
          obsah oboru vidět bez dlouhého rolování. */}
      <section className="relative z-10 flex min-h-[80svh] items-center justify-center px-6 pb-16 pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] text-white/40 sm:tracking-[0.3em]">
            Tvorba webů · {FIRMA.region}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {o.h1}
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {o.uvod}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#kontakt" className={BTN_PRIMARNI}>
              Chci nezávaznou cenu
            </Link>
            {o.ukazka ? (
              <a href={o.ukazka.href} target="_blank" rel="noopener" className={BTN_SEKUNDARNI}>
                Prohlédnout ukázku
              </a>
            ) : (
              <Link href="/#cenik" className={BTN_SEKUNDARNI}>
                Ceník a co je v ceně
              </Link>
            )}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm text-white/50">
            Od {BALICKY[0].cenaText}, fixní cena, hotovo {DODANI.text} od dodání
            podkladů. Cenu i termín pošlu {ODEZVA.dlouhy}.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-24">
        <section className={KARTA}>
          <div className="grid gap-8 md:grid-cols-[22rem_1fr] md:gap-12">
            <div>
              <Stitek num="01">Co web umí</Stitek>
              <h2 className="mb-4 font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl">
                Co web pro {o.nazev} potřebuje
              </h2>
              <p className="text-sm leading-relaxed text-white/65">
                Každý bod je konkrétní funkce, ne ozdoba. Co nepotřebujete, do webu
                nedávám a neplatíte za to.
              </p>
            </div>
            <ul className="flex flex-col">
              {o.potreby.map((p, i) => (
                <li
                  key={p.nadpis}
                  className={`flex gap-5 py-5 ${i === 0 ? "border-t border-white/10 md:border-t-0 md:pt-0" : "border-t border-white/10"}`}
                >
                  <span className="mt-1 shrink-0 font-mono text-xs tracking-widest text-akcent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">{p.nadpis}</h3>
                    <p className="text-sm leading-relaxed text-white/65">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={KARTA}>
          <div className="grid gap-8 md:grid-cols-[22rem_1fr] md:gap-12">
            <div>
              <Stitek num="02">Ceník</Stitek>
              <h2 className="mb-4 font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl">
                Cenu znáte předem
              </h2>
              <p className="text-sm leading-relaxed text-white/65">
                Stejné balíčky jako pro všechny ostatní. Co v nich je, najdete
                v ceníku na hlavní stránce.
              </p>
            </div>
            <div className="flex flex-col">
              {BALICKY.map((b, i) => (
                <div
                  key={b.id}
                  className={`flex items-baseline justify-between gap-4 py-5 ${i === 0 ? "border-t border-white/10 md:border-t-0 md:pt-0" : "border-t border-white/10"}`}
                >
                  <div>
                    <h3 className="font-semibold text-white">{b.nazev}</h3>
                    <p className="text-xs text-white/50">{b.note}</p>
                  </div>
                  <span className="shrink-0 font-heading text-xl font-bold">{b.cenaText}</span>
                </div>
              ))}
              <Link href="/#cenik" className="mt-4 text-sm text-akcent underline-offset-4 hover:underline">
                Celý ceník a co je v ceně →
              </Link>
            </div>
          </div>
        </section>

        <section className={KARTA}>
          <div className="grid gap-8 md:grid-cols-[22rem_1fr] md:gap-12">
            <div>
              <Stitek num="03">Otázky</Stitek>
              <h2 className="mb-4 font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl md:text-4xl">
                Časté otázky
              </h2>
            </div>
            <dl className="flex flex-col">
              {o.faq.map((f, i) => (
                <div
                  key={f.otazka}
                  className={`py-5 ${i === 0 ? "border-t border-white/10 md:border-t-0 md:pt-0" : "border-t border-white/10"}`}
                >
                  <dt className="mb-1 font-semibold text-white">{f.otazka}</dt>
                  <dd className="text-sm leading-relaxed text-white/65">{f.odpoved}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${KARTA} text-center`}>
          <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Pošlete mi, co potřebujete
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/65">
            Cenu i termín pošlu {ODEZVA.dlouhy}. Dělám weby i pro{" "}
            {ostatni.map((x, i) => (
              <span key={x.slug}>
                {i > 0 && (i === ostatni.length - 1 ? " a " : ", ")}
                <Link href={`/weby-pro/${x.slug}`} className="text-white underline-offset-4 hover:underline">
                  {x.nazev}
                </Link>
              </span>
            ))}
            .
          </p>
          <Link href="/#kontakt" className={BTN_PRIMARNI}>
            Chci nezávaznou cenu
          </Link>
        </section>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-10 md:pt-0">
        <Footer />
      </div>
    </main>
  )
}
