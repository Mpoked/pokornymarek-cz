"use client"

import { scrollToSection } from "@/lib/scroll"

/**
 * Dvě tlačítka pod hero. Primární slibuje výsledek („cenu"), ne akci
 * návštěvníka („mám zájem") — sekundární vede na ceník, protože část
 * lidí chce nejdřív číslo a až pak formulář.
 *
 * Zůstávají to skutečné odkazy na kotvy: fungují i bez JS a jdou
 * otevřít na nové kartě.
 */
export function HeroCta() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a
        href="#kontakt"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection("kontakt")
        }}
        className="w-full rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/85 sm:w-auto"
      >
        Chci nezávaznou cenu
      </a>
      <a
        href="#cenik"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection("cenik")
        }}
        className="w-full rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white sm:w-auto"
      >
        Ceník a co je v ceně
      </a>
    </div>
  )
}
