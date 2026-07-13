"use client"

import { useEffect, useState } from "react"
import { scrollToSection, SECTION_IDS } from "@/lib/scroll"

const LABELS: Record<string, string> = {
  sluzby: "Služby",
  cenik: "Ceník",
  reference: "Reference",
  kontakt: "Kontakt",
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); goTo(id) }}
              className="text-2xl font-bold tracking-tight text-white/80 transition-colors hover:text-white"
            >
              {LABELS[id]}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); goTo("kontakt") }}
            className="mt-4 max-w-[80vw] border border-white/30 px-8 py-3 text-center text-sm font-mono uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
          >
            Poptávka
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="text-sm font-bold tracking-widest uppercase text-white"
        >
          Studio Dva
        </a>

        {/* Desktop navigace */}
        <nav className="hidden gap-8 text-xs font-mono uppercase tracking-widest text-white/50 md:flex">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); goTo(id) }}
              className="transition-colors hover:text-white"
            >
              {LABELS[id]}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#kontakt"
          onClick={(e) => { e.preventDefault(); goTo("kontakt") }}
          className="hidden border border-white/30 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 transition-all duration-200 hover:bg-white hover:text-black md:inline-block"
        >
          Poptávka
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
