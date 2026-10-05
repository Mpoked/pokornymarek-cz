"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { scrollToSection, SECTION_IDS } from "@/lib/scroll"
import { FIRMA } from "@/lib/firma"
import { OBORY } from "@/lib/obory"

const LABELS: Record<string, string> = {
  sluzby: "Služby",
  cenik: "Ceník",
  sprava: "Správa",
  ukazky: "Ukázky",
  kontakt: "Kontakt",
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  /* Na podstránkách sekce neexistují, takže kotvy vedou na hlavní stránku
     (/#cenik) obyčejným odkazem a posun tam dorovná efekt níž. */
  const naHlavni = usePathname() === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Příchod z podstránky na /#sekce: prohlížeč by skočil na pozici karty
  // před přilepením, takže posun uděláme sami, až je stránka vykreslená.
  useEffect(() => {
    if (!naHlavni) return
    const id = window.location.hash.slice(1)
    if (!SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) return
    const t = setTimeout(() => scrollToSection(id), 300)
    return () => clearTimeout(t)
  }, [naHlavni])

  // Zamknout scroll pozadí když je otevřené mobilní menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  function goTo(id: string) {
    setOpen(false)
    // Počkat na zavření overlaye, ať scroll cílí správně
    requestAnimationFrame(() => scrollToSection(id))
  }

  /** Odkaz na sekci: na hlavní stránce posun kartami, jinde přechod na /#id. */
  function sekce(id: string) {
    return naHlavni
      ? { href: `#${id}`, onClick: (e: React.MouseEvent) => { e.preventDefault(); goTo(id) } }
      : { href: `/#${id}` }
  }

  return (
    <>
      {/* Mobilní overlay menu — MUSÍ být mimo <header>: backdrop-blur na
          headeru vytváří containing block a fixed overlay by se roztáhl
          jen uvnitř horního pruhu místo přes celou obrazovku. */}
      <div
        className={`fixed inset-0 z-[190] flex flex-col bg-black/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-8 pt-16">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              {...sekce(id)}
              className="text-2xl font-bold tracking-tight text-white/80 transition-colors hover:text-white"
            >
              {LABELS[id]}
            </a>
          ))}
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Obory</span>
            {OBORY.map((o) => (
              <a key={o.slug} href={`/weby-pro/${o.slug}`} className="text-lg text-white/70 transition-colors hover:text-white">
                Weby pro {o.nazev}
              </a>
            ))}
          </div>
          <a
            {...sekce("kontakt")}
            className="mt-4 max-w-[80vw] border border-white/30 px-8 py-3 text-center text-sm font-mono uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Nezávazná cena
          </a>
        </nav>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled || open
            ? "bg-black/70 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
      {/* Stejná šířka jako karty sekcí (max-w-5xl v scroll-sections.tsx).
          Při 6xl přesahovala navigace hranu karet o 64 px na každou stranu
          a nevypadalo to jako záměr, ale jako nedotažené zarovnání. */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Skutečný odkaz na "/" — funguje Ctrl+klik i prostřední tlačítko. */}
        <Link
          href="/"
          aria-label={`${FIRMA.jmeno} — na začátek stránky`}
          onClick={(e) => {
            setOpen(false)
            if (!naHlavni) return
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="text-sm font-bold tracking-widest uppercase text-white"
        >
          MP
        </Link>

        {/* Desktop navigace */}
        <nav className="hidden gap-8 text-xs font-mono uppercase tracking-widest text-white/50 md:flex">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              {...sekce(id)}
              className="transition-colors hover:text-white"
            >
              {LABELS[id]}
            </a>
          ))}

          {/* Rozbalí se najetím i tabulátorem (focus-within), bez JS. */}
          <div className="group relative">
            <button type="button" aria-haspopup="true" className="uppercase tracking-widest transition-colors hover:text-white group-focus-within:text-white">
              Obory ▾
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="flex min-w-56 flex-col gap-1 rounded-xl border border-white/10 bg-black/90 p-2 backdrop-blur-xl">
                {OBORY.map((o) => (
                  <li key={o.slug}>
                    <a
                      href={`/weby-pro/${o.slug}`}
                      className="block rounded-lg px-3 py-2 normal-case tracking-normal text-sm font-sans text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      Weby pro {o.nazev}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Desktop CTA */}
        <a
          {...sekce("kontakt")}
          className="hidden border border-white/30 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 transition-all duration-200 hover:bg-white hover:text-black md:inline-block"
        >
          Nezávazná cena
        </a>

        {/* Mobilní hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
          className="relative z-[210] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      </header>
    </>
  )
}
