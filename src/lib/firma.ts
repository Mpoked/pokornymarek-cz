/**
 * Jedno místo pro fakta o firmě.
 *
 * Web, patička, GDPR stránka, metadata i JSON-LD čtou odsud — když se
 * něco změní (nebo doplní), mění se to na jednom řádku a nikde jinde.
 *
 * !!! Hodnoty označené DOPLNIT jsou zástupné a jsou vidět na webu.
 *     Najdeš je: rg "DOPLNIT" src/
 */

export const FIRMA = {
  jmeno: "Marek Pokorný",
  email: "info@pokornymarek.cz",
  telefon: "+420 774 664 403",
  /** Telefon ve formátu pro odkaz tel: a pro JSON-LD. */
  telefonHref: "+420774664403",

  /** 1. pád — do titulků a samostatných popisků („Tvorba webů · Uherské Hradiště"). */
  mesto: "Uherské Hradiště",
  /** 2. pád — do vět typu „z Uherského Hradiště a okolí". Bez toho vzniká
   *  „z Uherské Hradiště", což je přesně ta chyba, kterou weby prozradí. */
  mestoGen: "Uherského Hradiště",
  /** Oblast, kterou reálně obsluhuju — jde i do JSON-LD areaServed. */
  region: "Slovácko",

  url: "https://pokornymarek.cz",

  /* ── Doplnit ──────────────────────────────────────────────────────── */

  /** Zobrazuje se v patičce a na GDPR stránce (identifikace správce). */
  ico: "[DOPLNIT: IČO]",
  /** Ulice a č. p. — bez toho nelze do JSON-LD dát PostalAddress. */
  ulice: "[DOPLNIT: ulice a číslo popisné]",
  psc: "[DOPLNIT: PSČ]",
  /** true = ceny jsou včetně DPH, false = nejsem plátce DPH. */
  platceDph: null as boolean | null,
  /** Kolik webů už mám hotových — do hero jako důkaz. */
  pocetWebu: "[DOPLNIT: počet]",
  /** Od kdy weby dělám. */
  odRoku: "[DOPLNIT: rok]",
} as const

/**
 * Doba odezvy na poptávku. Drží se na jednom místě schválně — dřív byly
 * na webu tři různé sliby („obratem", „do druhého pracovního dne",
 * „do 2 pracovních dní"). Slib, který se o řádek níž stahuje, je horší
 * než ten skromnější sám o sobě.
 */
export const ODEZVA = {
  /** Do věty: „Cenu i termín pošlu {dlouhy}." */
  dlouhy: "do dvou pracovních dnů",
  /** Do tlačítka a toastu, kde je málo místa. */
  kratky: "do 2 dnů",
} as const

/** Ceny balíčků — jedno místo pro ceník, dropdown i JSON-LD Offer. */
export const BALICKY = [
  {
    id: "jednoduchy",
    nazev: "Jednoduchý web",
    cena: 9900,
    cenaText: "9 900 Kč",
    note: "Ideální pro živnostníky",
  },
  {
    id: "standard",
    nazev: "Standard",
    cena: 19900,
    cenaText: "19 900 Kč",
    note: "Nejčastější volba",
  },
  {
    id: "premium",
    nazev: "Prémiový",
    cena: 34900,
    cenaText: "34 900 Kč",
    note: "E-shopy a větší projekty",
  },
] as const

/** Věta o DPH pod ceník. Dokud není jasno, řekne to na rovinu. */
export function dphPoznamka(): string {
  if (FIRMA.platceDph === true) return "Všechny ceny jsou včetně DPH."
  if (FIRMA.platceDph === false) return "Nejsem plátce DPH — cena, kterou vidíte, je konečná."
  return "[DOPLNIT: jsou ceny s DPH, nebo nejsem plátce?]"
}
