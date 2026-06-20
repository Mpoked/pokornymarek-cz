"use client"

import { useEffect, useState } from "react"

const SECTION_IDS = ["sluzby", "cenik", "reference", "kontakt"] as const
const STICKY_TOP = (index: number) => 80 + index * 20

function getNaturalTop(el: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const idx = SECTION_IDS.indexOf(id as typeof SECTION_IDS[number])
  const nextId = idx >= 0 && idx < SECTION_IDS.length - 1 ? SECTION_IDS[idx + 1] : null
  const nextEl = nextId ? document.getElementById(nextId) : null

  if (nextEl) {
    // Scrollujeme těsně před bod, kde se DALŠÍ sekce začne přichycovat.
    // To zaručí, že cílová sekce bude aktivní a nadřazená sekce neskryje obsah.
    const nextNaturalTop = getNaturalTop(nextEl)
    const nextStickyTop = STICKY_TOP(idx + 1)
    const target = nextNaturalTop - nextStickyTop - 1
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" })
  } else {
    // Poslední sekce — scrollujeme na její přirozenou pozici
    const top = getNaturalTop(el)
    window.scrollTo({ top: top - 100, behavior: "smooth" })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleNav(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          className="text-sm font-bold tracking-widest uppercase text-white"
        >
          MP
        </a>
        <nav className="hidden gap-8 text-xs font-mono uppercase tracking-widest text-white/50 md:flex">
          {(["sluzby", "cenik", "reference", "kontakt"] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNav(e, id)}
              className="hover:text-white transition-colors capitalize"
            >
              {id === "sluzby" ? "Služby" : id === "cenik" ? "Ceník" : id === "reference" ? "Reference" : "Kontakt"}
            </a>
          ))}
        </nav>
        <a
          href="#kontakt"
          onClick={(e) => handleNav(e, "kontakt")}
          className="border border-white/30 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/70 hover:bg-white hover:text-black transition-all duration-200"
        >
          Poptávka
        </a>
      </div>
    </header>
  )
}
