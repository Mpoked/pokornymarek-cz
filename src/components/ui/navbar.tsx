"use client"

import { useEffect, useState } from "react"
import { scrollToSection } from "@/lib/scroll"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleNav(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    scrollToSection(id)
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
          2Studio
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
