/**
 * Jedno místo pro fakta o firmě.
 *
 * Web, patička, GDPR stránka, metadata i JSON-LD čtou odsud. Když se
 * něco změní, mění se to na jednom řádku a nikde jinde.
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

  /** 1. pád, do titulků a samostatných popisků („Tvorba webů · Uherské Hradiště"). */
  mesto: "Uherské Hradiště",
  /** 2. pád, do vět typu „z Uherského Hradiště a okolí". Bez toho vzniká
   *  „z Uherské Hradiště", což je přesně ta chyba, kterou weby prozradí. */
  mestoGen: "Uherského Hradiště",
  /** 6. pád, do vět typu „sídlím v Uherském Hradišti". */
  mestoLok: "Uherském Hradišti",
  /** Oblast, kterou obsluhuju osobně. Jde i do JSON-LD areaServed. */
  region: "Slovácko",

  url: "https://pokornymarek.cz",

  /**
   * Zatím nejsem OSVČ, takže žádné IČO. Patička i GDPR stránka to řeší
   * podmíněně: dokud je null, prostě se nezobrazí. Tvrdit na webu, že
   * jsem „fyzická osoba podnikající", když nejsem, je horší než mlčet.
   *
   * Až bude živnost ohlášená, stačí sem doplnit číslo.
   */
  ico: null as string | null,

  /** Od kdy weby dělám. Zatím při škole, ale je to pravda a je konkrétní. */
  odRoku: 2023,

  /* ── Doplnit ──────────────────────────────────────────────────────── */

  /** true = ceny jsou včetně DPH, false = nejsem plátce DPH. */
  platceDph: false as boolean | null,
} as const

/**
 * Doba odezvy na poptávku. Drží se na jednom místě schválně. Dřív byly
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

/**
 * Nabídka pro první klienty.
 *
 * Nulové portfolio je fakt, který se nedá schovat, tak ať aspoň pracuje.
 * Je to skutečný obchod, ne umělá sleva: nižší cena výměnou za právo
 * ukázat web jako referenci a za krátké hodnocení. Až budou tři, blok
 * se z webu vypne přepnutím `aktivni`.
 */
export const PRVNI_KLIENTI = {
  aktivni: true,
  pocet: 3,
  slevaProcent: 25,
} as const

/** Cena po slevě pro první klienty. */
export function cenaProPrvni(cena: number): number {
  return Math.round((cena * (100 - PRVNI_KLIENTI.slevaProcent)) / 100 / 100) * 100
}

/** Ceny balíčků. Jedno místo pro ceník, dropdown i JSON-LD Offer. */
export const BALICKY = [
  {
    id: "jednoduchy",
    nazev: "Jednoduchý web",
    cena: 7900,
    cenaText: "7 900 Kč",
    note: "Pro jednu službu",
  },
  {
    id: "standard",
    nazev: "Standard",
    cena: 14900,
    cenaText: "14 900 Kč",
    note: "Nejčastější volba",
  },
  {
    id: "premium",
    nazev: "E-shop a větší projekty",
    cena: 24900,
    cenaText: "24 900 Kč",
    note: "Rozsah podle zadání",
  },
] as const

/**
 * Správa webu po předání.
 *
 * Odpovídá na otázku, kterou dřív ceník nechával viset („doména a hosting
 * v ceně, ale na jak dlouho?"). Zároveň je to jediná část nabídky, která
 * se opakuje každý měsíc, takže z jednorázových zakázek dělá příjem.
 */
export const SPRAVA = [
  {
    id: "zadna",
    nazev: "Bez správy",
    cena: "0 Kč",
    perioda: "",
    note: "Web je váš",
    items: [
      "Předám vám hotový web i přístupy",
      "Doménu a hosting si vedete sami",
      "Pozdější změny 600 Kč / hodinu",
    ],
    featured: false,
  },
  {
    id: "zakladni",
    nazev: "Základní správa",
    cena: "390 Kč",
    perioda: "/ měsíc",
    note: "Doporučuju",
    items: [
      "Doména i hosting v ceně",
      "Zálohy, certifikát, aktualizace",
      "Hlídám, že web běží",
      "30 minut změn měsíčně (texty, fotky, ceny)",
    ],
    featured: true,
  },
  {
    id: "rozsirena",
    nazev: "Rozšířená správa",
    cena: "890 Kč",
    perioda: "/ měsíc",
    note: "Když se web mění často",
    items: [
      "Vše ze základní správy",
      "2 hodiny změn měsíčně",
      "Změny řeším do 24 hodin",
      "Každý měsíc přehled návštěvnosti",
    ],
    featured: false,
  },
] as const

/** Hodinová sazba na práci nad rámec správy. */
export const HODINOVKA = "600 Kč"

/** Věta o DPH pod ceník. */
export function dphPoznamka(): string {
  if (FIRMA.platceDph === true) return "Všechny ceny jsou včetně DPH."
  if (FIRMA.platceDph === false) return "Nejsem plátce DPH, takže cena, kterou vidíte, je konečná."
  return "[DOPLNIT: jsou ceny s DPH, nebo nejsem plátce?]"
}
