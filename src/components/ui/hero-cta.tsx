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
        /* Okraj musí být vidět bez hledání. Při /20 to na fotce splynulo
           s pozadím a druhá možnost vypadala jako odstavec, ne jako volba. */
        className="w-full rounded-lg border border-white/45 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto"
      >
        Ceník a co je v ceně
      </a>
    </div>
  )
}
