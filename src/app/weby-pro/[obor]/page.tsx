import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
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

export default async function OborPage(props: PageProps<"/weby-pro/[obor]">) {
  const { obor } = await props.params
  const o = najdiObor(obor)
  if (!o) notFound()

  const ostatni = OBORY.filter((x) => x.slug !== o.slug)

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(o)) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          ← Zpět na hlavní stránku
        </Link>

        <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
          {FIRMA.jmeno} · {FIRMA.region}
        </p>
        <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight md:text-5xl">
          {o.h1}
        </h1>
        <p className="mb-8 text-base leading-relaxed text-white/70">{o.uvod}</p>

        <p className="mb-14 text-sm text-white/50">
          Od <strong className="text-white">{BALICKY[0].cenaText}</strong>, fixní cena,
          hotovo {DODANI.text} od dodání podkladů. Cenu i termín pošlu {ODEZVA.dlouhy}.
        </p>

        <section className="border-b border-white/10 pb-10">
          <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">
            Co web pro {o.nazev} potřebuje
          </h2>
          <ul className="flex flex-col">
            {o.potreby.map((p, i) => (
              <li key={p.nadpis} className="flex gap-5 border-t border-white/10 py-5">
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
        </section>

        {o.ukazka && (
          <section className="border-b border-white/10 py-10">
            <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl">Ukázka</h2>
            <a
              href={o.ukazka.href}
              target="_blank"
              rel="noopener"
              className="text-sm text-akcent underline-offset-4 hover:underline"
            >
              {o.ukazka.popis} →
            </a>
          </section>
        )}

        <section className="border-b border-white/10 py-10">
          <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">Časté otázky</h2>
          <dl className="flex flex-col gap-6">
            {o.faq.map((f) => (
              <div key={f.otazka}>
                <dt className="mb-1 font-semibold text-white">{f.otazka}</dt>
                <dd className="text-sm leading-relaxed text-white/65">{f.odpoved}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-10">
          <Link
            href="/#kontakt"
            className="inline-flex items-center rounded-full bg-akcent px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Chci nezávaznou cenu
          </Link>
          <p className="mt-10 text-xs font-mono uppercase tracking-widest text-white/40">
            Dělám weby i pro{" "}
            {ostatni.map((x, i) => (
              <span key={x.slug}>
                {i > 0 && ", "}
                <Link href={`/weby-pro/${x.slug}`} className="text-white/70 hover:text-white">
                  {x.nazev}
                </Link>
              </span>
            ))}
          </p>
        </section>
      </div>
    </main>
  )
}
