"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/toast"
import { STICKY_TOP, scrollToSection } from "@/lib/scroll"
import {
  BALICKY as CENIK,
  DODANI,
  FIRMA,
  HODINOVKA,
  ODEZVA,
  PRVNI_KLIENTI,
  SPRAVA,
  cenaProPrvni,
  dphPoznamka,
  korun,
} from "@/lib/firma"

/* ── Card wrapper — sticky stacked cards ── */
function Card({
  id,
  children,
  index,
}: {
  id: string
  children: React.ReactNode
  index: number
}) {
  return (
    <div
      id={id}
      /* Lepí se všechny karty, aby se vrstvily bez děr. Podmínkou je,
         že se každá vejde do obrazovky — sticky karta vyšší než výřez
         se přilepí horním okrajem a spodek už nedorolujete. Proto jsou
         texty v kartách krátké; když do některé něco přidáváš, hlídej
         si výšku. Na mobilu karty plynou pod sebou (relative), tam se
         `top` neuplatní. */
      className="karta-stack relative w-full"
      style={
        {
          "--sticky-top": `${STICKY_TOP(index)}px`,
          zIndex: 10 + index,
        } as React.CSSProperties
      }
    >
      <div
        className="rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl p-6 sm:p-8 md:p-10 transition-transform duration-300"
        style={{ transformOrigin: "top center" }}
      >
        {children}
      </div>
    </div>
  )
}

/** Číslo a název sekce. Bez pomlčky mezi nimi, ta vypadá strojově. */
function SectionLabel({ num, children }: { num: string; children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-white/45">
      <span className="text-akcent">{num}</span>{" "}
      <span className="ml-1">{children}</span>
    </p>
  )
}

/* ── Sekce 1: Služby ── */
function SluzbySection({ index }: { index: number }) {
  const services = [
    {
      num: "01",
      title: "Landing pages",
      desc: "Jedna stránka, jeden cíl. Pro jednu službu nebo jednu kampaň, kde má návštěvník udělat jedinou věc: zavolat, objednat nebo přijít.",
    },
    {
      num: "02",
      title: "Webové prezentace",
      desc: "Firemní web na čtyři až šest stránek. Načte se do dvou sekund a najdou vás v Googlu na dotazy typu „truhlář Uherské Hradiště“.",
    },
    {
      num: "03",
      title: "Redesign starých webů",
      desc: "Starý web předělám do současné podoby. Hlavně na mobilu, kde dnes chodí většina lidí. Adresy stránek zůstanou, takže nepřijdete o pozice ve vyhledávání.",
    },
    {
      num: "04",
      title: "Jednoduché e-shopy",
      desc: "Pár desítek položek, košík a platba kartou. Bez administrace, ve které se po týdnu ztratíte.",
    },
  ]
  /* Tvar sekce: nadpis vlevo, seznam vpravo. Karty v mřížce si tuhle
     sekci pletly s ukázkami a stránka pak byla pětkrát stejná. Cena je
     schválně pryč z nadpisu — stojí v hero i o sekci níž v ceníku. */
  return (
    <Card id="sluzby" index={index}>
      <div className="grid gap-8 md:grid-cols-[22rem_1fr] md:gap-12">
        <div>
          <SectionLabel num="01">Služby</SectionLabel>
          <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl">
            Čtyři typy webů. Vyberte podle toho, co potřebujete.
          </h2>
          <p className="text-sm text-white/65 leading-relaxed">
            Dělám weby pro malé firmy, živnostníky, restaurace a řemeslníky
            z {FIRMA.mestoGen} a okolí. Ne pro korporace, na ty jsou agentury
            s obchodním oddělením. Když jste z druhého konce republiky, nevadí:
            domluvíme se po telefonu a e-mailem, jen se nepotkáme u kávy.
          </p>
        </div>

        <ul className="flex flex-col">
          {services.map((s, i) => (
            <li
              key={s.num}
              className={`flex gap-5 py-5 ${i === 0 ? "border-t border-white/10 md:border-t-0 md:pt-0" : "border-t border-white/10"}`}
            >
              <span className="mt-1 shrink-0 font-mono text-xs tracking-widest text-akcent">{s.num}</span>
              <div>
                <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

/* ── Sekce 2: Ceník ── */
function CenikSection({
  index,
  onVybrat,
}: {
  index: number
  /** Předá vybraný balíček formuláři a odroluje na něj. */
  onVybrat: (id: string) => void
}) {
  const plans = [
    {
      ...CENIK[0],
      items: [
        "1 stránka (landing page)",
        "Funguje na mobilu i na počítači",
        "Základní SEO, aby vás našli v Googlu",
        "Kontaktní formulář",
      ],
      featured: false,
    },
    {
      ...CENIK[1],
      items: [
        "Až 6 podstránek",
        "Vlastní design na míru, ne šablona",
        "Rozšířené SEO a strukturovaná data",
        "Přihlášení do Googlu i Seznamu",
      ],
      featured: true,
    },
    {
      ...CENIK[2],
      items: [
        "Rozsah podle zadání",
        "E-shop nebo rezervační systém",
        "Platební brána a doprava",
        "Zaškolení, jak si to spravovat sami",
      ],
      featured: false,
    },
  ]

  return (
    <Card id="cenik" index={index}>
      {/* Hlavička na dvě části: nadpis vlevo, vysvětlení a sleva vedle něj.
          Sražené pod sebe zabíraly tři pásy výšky a ceník je nejvyšší karta
          na webu — o výšku se tu opravdu hraje, viz komentář v globals.css. */}
      <div className="mb-6 grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <SectionLabel num="02">Ceník</SectionLabel>
          <h2 className="font-heading text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl">
            {/* Jen poslední číslo nese „Kč" — a bere si ho z cenaText, kde je
                před ním pevná mezera, takže se od něj cena neodtrhne. */}
            {CENIK[0].cena.toLocaleString("cs-CZ")}, {CENIK[1].cena.toLocaleString("cs-CZ")}{" "}
            nebo {CENIK[2].cenaText}. Cenu se dozvíte tady, ne po telefonu.
          </h2>
        </div>

        <div className="flex flex-col justify-end gap-4">
          <p className="text-sm text-white/65 leading-relaxed">
            Většina webařů má místo ceny formulář „ozveme se vám“. Tady jsou tři
            balíčky, cena se pak nemění. {dphPoznamka()}
          </p>

          {/* Nabídka pro první klienty. Není to umělá sleva, ale skutečný
              obchod: nižší cena za právo ukázat web jako referenci. */}
          {PRVNI_KLIENTI.aktivni && (
            <div className="flex items-center gap-4 rounded-xl border border-akcent/40 bg-akcent/10 px-4 py-3">
              <p className="shrink-0 font-heading text-2xl font-bold leading-none tracking-tight text-akcent sm:text-3xl">
                −{PRVNI_KLIENTI.slevaProcent}&nbsp;%
              </p>
              <p className="text-sm leading-snug text-white/70">
                <strong className="font-semibold text-white">
                  Pro první {PRVNI_KLIENTI.pocet} klienty.
                </strong>{" "}
                Chci za to svolení ukázat web jako svou práci.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Doporučený balíček je světlý, ale ne bílý. Čistě bílá plocha na
            černém pozadí opticky nabývá a karta pak vypadá, že vyčnívá
            z řádku, i když má stejnou výšku jako sousedi. */}
        {plans.map((p) => (
          <div
            key={p.nazev}
            className={`rounded-xl border p-5 flex flex-col ${
              p.featured
                ? "border-akcent/50 bg-[#e7e4de] text-black"
                : "border-white/8 bg-white/5 text-white"
            }`}
          >
            <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${p.featured ? "text-akcent-tmavy" : "text-white/45"}`}>
              {p.note}
            </p>
            <h3 className="font-bold text-lg mb-1">{p.nazev}</h3>
            <p className={`font-heading text-2xl sm:text-3xl font-bold tracking-tight ${p.featured ? "text-black" : "text-white"}`}>
              od {p.cenaText}
            </p>
            {PRVNI_KLIENTI.aktivni && (
              <p className={`mb-6 mt-1 text-sm font-semibold ${p.featured ? "text-akcent-tmavy" : "text-akcent"}`}>
                Teď {korun(cenaProPrvni(p.cena))}
              </p>
            )}
            <ul className={`flex flex-col gap-1.5 flex-1 ${PRVNI_KLIENTI.aktivni ? "" : "mt-5"}`}>
              {p.items.map((item) => (
                <li key={item} className={`flex items-start gap-2 text-sm ${p.featured ? "text-black/75" : "text-white/70"}`}>
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${p.featured ? "bg-akcent-tmavy/60" : "bg-white/35"}`} />
                  {item}
                </li>
              ))}
            </ul>
            {/* Zůstává to odkaz na kotvu, aby fungoval i bez JS a šel
                otevřít na nové kartě. S JS navíc předvybere balíček
                ve formuláři, ať ho člověk nevyplňuje podruhé. */}
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); onVybrat(p.id) }}
              className={`mt-6 block rounded-lg border py-2 text-center text-sm font-semibold transition-all ${
                p.featured
                  ? "border-black bg-black text-white hover:bg-black/80"
                  : "border-white/20 text-white/70 hover:bg-white/10"
              }`}
            >
              Chci cenu na tenhle balíček
            </a>
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-2xl text-xs text-white/50 leading-relaxed">
        V ceně je návrh, stavba i spuštění. Od vás texty, fotky a logo, od
        kterých běží {DODANI.dnu} dnů na dodání. Doména a hosting jsou ve
        správě níž. Cena platí od domluvy a nic se k ní nedoúčtovává.
      </p>
    </Card>
  )
}

/* ── Sekce 3: Správa ── */
function SpravaSection({ index }: { index: number }) {
  return (
    <Card id="sprava" index={index}>
      <SectionLabel num="03">Správa</SectionLabel>
      <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl">
        A pak? Web sám od sebe neběží.
      </h2>
      <p className="mb-8 max-w-xl text-sm sm:text-base text-white/65 leading-relaxed">
        Doména se musí každý rok prodloužit, certifikát obnovit, systém
        aktualizovat. Můžete si to vést sami, nebo mi to hodit na krk
        a nestarat se. Obojí je v pořádku, tady je cena za obojí.
      </p>

      {/* Tři řádky, ne tři sloupce. Ceník o sekci výš je mřížka tří karet
          s cenou a odrážkami — kdyby správa vypadala stejně, čtenář by při
          scrollu nepoznal, že přišla nová sekce, a jen přečetl jiná čísla. */}
      <ul className="border-t border-white/10">
        {SPRAVA.map((s) => (
          <li
            key={s.id}
            className={`grid gap-x-6 gap-y-3 border-b border-white/10 py-5 md:grid-cols-[13rem_1fr_auto] md:items-start ${
              s.featured ? "-mx-4 border-l-2 border-l-akcent bg-akcent/[0.06] px-4" : ""
            }`}
          >
            <div>
              <p className={`mb-0.5 text-xs font-mono uppercase tracking-widest ${s.featured ? "text-akcent" : "text-white/45"}`}>
                {s.note}
              </p>
              <h3 className="font-bold text-white">{s.nazev}</h3>
            </div>

            {/* Na úzké obrazovce se řádek skládá pod sebe a cena by skončila
                až pod výčtem. Cena patří hned k názvu, jinak si ji čtenář
                musí najít. Od md je řádek zase trojsloupcový a pořadí
                se vrací do zdrojového. */}
            <ul className="order-3 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-5 md:order-none">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="order-2 font-heading text-2xl font-bold tracking-tight text-white md:order-none md:text-right">
              {s.cena}
              {s.perioda && (
                <span className="ml-1 text-sm font-normal text-white/55">{s.perioda}</span>
              )}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-2xl text-xs text-white/50 leading-relaxed">
        Správu můžete kdykoli zrušit nebo změnit, nic nepodepisujete na rok
        dopředu. Větší zásahy nad rámec balíčku dělám za {HODINOVKA} na hodinu
        a cenu řeknu předem.
      </p>
    </Card>
  )
}

/* ── Sekce 4: Ukázky ── */
function UkazkySection({ index }: { index: number }) {
  // Vlastní návrhy, ne cizí zakázky. Označené jako koncept přímo na
  // kartě — kdyby to bylo jen v úvodním odstavci, čte se to později
  // než název firmy a návštěvník má pocit, že ho někdo obelstil.
  const projects = [
    { num: "01", title: "Truhlářství Kovář", tag: "Řemeslo · web prezentace", href: "/ukazky/truhlarstvi.html" },
    { num: "02", title: "Vinný sklep U Šardických", tag: "Gastro · web + rezervace", href: "/ukazky/vinny-sklep.html" },
    { num: "03", title: "Pekárna Zrníčko", tag: "Lokální e-shop", href: "/ukazky/pekarna.html" },
    { num: "04", title: "Run Slovácko", tag: "Kampaň · landing page", href: "/ukazky/run-slovacko.html" },
  ]
  return (
    <Card id="ukazky" index={index}>
      <SectionLabel num="04">Ukázky</SectionLabel>
      <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl">
        Čtyři weby, které jsem navrhl a postavil od nuly.
      </h2>
      <p className="mb-8 max-w-xl text-sm sm:text-base text-white/65 leading-relaxed">
        Nejsou to zakázky pro klienty. Zatím žádnou nemám a nebudu si vymýšlet
        loga firem, pro které jsem nic neudělal. Firmy v ukázkách jsem si
        vymyslel, ale weby jsou skutečné: můžete si je proklikat, vyzkoušet
        na mobilu a podívat se, jak jsou rychlé.
      </p>
      {/* Široké řádky místo dlaždic 2×2 — ty vypadaly stejně jako služby.
          Levý sloupec je zatím jen číslo; až budou náhledy webů, patří
          přesně sem a řádek se kvůli nim nebude muset přestavovat. */}
      <ul className="border-t border-white/10">
        {projects.map((p) => (
          <li key={p.num} className="border-b border-white/10">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg px-3 py-4 transition-colors hover:bg-white/[0.05] sm:flex-nowrap"
            >
              <span className="shrink-0 font-mono text-xs tracking-widest text-akcent">{p.num}</span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-lg font-semibold text-white">{p.title}</span>
                  <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/55">
                    Koncept
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-white/55">{p.tag}</span>
              </span>

              {/* Že je řádek odkaz, musí být vidět bez najetí myší. */}
              <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-white/65 transition-colors group-hover:text-white">
                <span className="underline decoration-white/25 underline-offset-4 group-hover:decoration-white">
                  Otevřít živou ukázku
                </span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 11L11 5M11 5H6M11 5V10" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ── Custom dropdown ── */
const BALICKY = [
  { value: "",           label: "Vyberte balíček…", sub: "" },
  { value: "jednoduchy", label: CENIK[0].nazev,     sub: `od ${CENIK[0].cenaText}` },
  { value: "standard",   label: CENIK[1].nazev,     sub: `od ${CENIK[1].cenaText}` },
  { value: "premium",    label: CENIK[2].nazev,     sub: `od ${CENIK[2].cenaText}` },
  { value: "nevim",      label: "Ještě nevím",      sub: "poradíte mi" },
]

const MOZNOSTI = BALICKY.filter((b) => b.value !== "")

/**
 * Vlastní dropdown místo nativního <select> kvůli vzhledu. Aby byl
 * použitelný i z klávesnice a pro čtečky obrazovky, drží se vzoru
 * listbox: aria-expanded na spouštěči, role="option" na položkách,
 * šipky pro pohyb, Escape pro zavření.
 */
function BalicekDropdown({
  value,
  onChange,
  labelId,
  zvyrazneno = false,
}: {
  value: string
  onChange: (v: string) => void
  labelId: string
  /** Krátce po předvyplnění z ceníku, ať je vidět, že se pole změnilo. */
  zvyrazneno?: boolean
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const selected = BALICKY.find((b) => b.value === value) ?? BALICKY[0]

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function openAndFocus(idx: number) {
    setOpen(true)
    // Položky se renderují až po otevření, proto až v dalším snímku.
    requestAnimationFrame(() => optionRefs.current[idx]?.focus())
  }

  function close(vratitFokus = true) {
    setOpen(false)
    if (vratitFokus) buttonRef.current?.focus()
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openAndFocus(0)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      openAndFocus(MOZNOSTI.length - 1)
    } else if (e.key === "Escape") {
      close(false)
    }
  }

  function onOptionKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      optionRefs.current[(idx + 1) % MOZNOSTI.length]?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      optionRefs.current[(idx - 1 + MOZNOSTI.length) % MOZNOSTI.length]?.focus()
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    } else if (e.key === "Tab") {
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="balicek-listbox"
        aria-labelledby={labelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-sm outline-none transition-all text-left focus-visible:border-white/40 ${
          zvyrazneno
            ? "border-akcent bg-akcent/10"
            : open
              ? "border-white/30 bg-white/5"
              : "border-white/10 bg-white/5 hover:border-white/20"
        }`}
      >
        <span className={selected.value ? "text-white" : "text-white/45"}>
          {selected.label}
          {selected.sub && <span className="ml-2 text-white/45 text-xs">{selected.sub}</span>}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className={`shrink-0 text-white/45 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id="balicek-listbox"
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {MOZNOSTI.map((b, i) => (
            <button
              key={b.value}
              ref={(el) => { optionRefs.current[i] = el }}
              type="button"
              role="option"
              aria-selected={value === b.value}
              onClick={() => { onChange(b.value); close() }}
              onKeyDown={(e) => onOptionKeyDown(e, i)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left outline-none transition-colors hover:bg-white/8 focus-visible:bg-white/10 ${
                value === b.value ? "bg-white/10 text-white" : "text-white/70"
              } ${i !== 0 ? "border-t border-white/5" : ""}`}
            >
              <span>{b.label}</span>
              <span className="text-xs text-white/45">{b.sub}</span>
            </button>
          ))}
        </div>
      )}

      {/* hidden input pro FormData */}
      <input type="hidden" name="balicek" value={value} />
    </div>
  )
}

/* ── Inline field error ── */
/**
 * Řádek kontaktu s kopírováním.
 *
 * Odkaz `mailto:` funguje jen tomu, kdo má v systému nastavený poštovní
 * klient. Kdo ho nemá — a to je na cizím počítači nebo ve firemním
 * prohlížeči většina lidí — dostane prázdné okno a odejde s pocitem, že
 * je web rozbitý. Odkaz zůstává pro ty, komu funguje; vedle něj je
 * tlačítko, které adresu zkopíruje do schránky.
 */
function KontaktRadek({
  label,
  typ,
  hodnota,
  href,
  onZprava,
}: {
  label: string
  /** Do hlášky po zkopírování: „E-mail zkopírován". */
  typ: string
  hodnota: string
  href: string
  onZprava: (zprava: string, druh: "success" | "error", titulek?: string) => void
}) {
  const [hotovo, setHotovo] = useState(false)

  useEffect(() => {
    if (!hotovo) return
    const t = setTimeout(() => setHotovo(false), 2000)
    return () => clearTimeout(t)
  }, [hotovo])

  /**
   * Starší cesta přes skryté pole. Potřebná dvakrát: v nezabezpečeném
   * kontextu, kde `navigator.clipboard` vůbec není, a taky když existuje,
   * ale writeText odmítne (chybí oprávnění, okno není zaostřené).
   */
  function kopirovatStareCesty(text: string): boolean {
    try {
      const pole = document.createElement("textarea")
      pole.value = text
      pole.setAttribute("readonly", "")
      pole.style.position = "fixed"
      pole.style.top = "0"
      pole.style.opacity = "0"
      document.body.appendChild(pole)
      pole.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(pole)
      return ok
    } catch {
      return false
    }
  }

  async function kopirovat() {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hodnota)
        ok = true
      }
    } catch {
      // Spadlo to i s dostupným rozhraním, zkusíme ještě zálohu níž.
      ok = false
    }
    if (!ok) ok = kopirovatStareCesty(hodnota)

    if (ok) {
      setHotovo(true)
      onZprava(`${typ} máte ve schránce.`, "success", "Zkopírováno")
    } else {
      // I neúspěch musí být k něčemu: adresu vypíšeme, ať se dá přepsat.
      onZprava(`Označte a zkopírujte ručně: ${hodnota}`, "error", "Kopírování nevyšlo")
    }
  }

  return (
    <li className="flex items-end justify-between gap-4 border-b border-white/8 pb-5">
      <div className="min-w-0">
        <p className="mb-1 text-xs font-mono uppercase tracking-widest text-white/45">{label}</p>
        <a
          href={href}
          className="break-all font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white"
        >
          {hodnota}
        </a>
      </div>

      <button
        type="button"
        onClick={kopirovat}
        aria-label={`Zkopírovat ${typ.toLowerCase()} do schránky`}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
          hotovo
            ? "border-akcent/50 bg-akcent/10 text-akcent"
            : "border-white/15 text-white/65 hover:border-white/35 hover:text-white"
        }`}
      >
        {hotovo ? (
          <>
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8.5L6.2 11.5L13 4.5" />
            </svg>
            Zkopírováno
          </>
        ) : (
          <>
            <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
              <path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
            </svg>
            Kopírovat
          </>
        )}
      </button>
    </li>
  )
}

interface FieldErrors { jmeno?: string; email?: string; balicek?: string; zprava?: string; souhlas?: string }

function FieldError({ msg, id }: { msg?: string; id?: string }) {
  if (!msg) return null
  return (
    <div id={id} role="alert" className="mt-1.5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
        <path d="M8 5v4M8 11v.5" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="8" r="6.5" stroke="#f87171" strokeWidth="1.4" />
      </svg>
      <span className="text-xs text-red-400">{msg}</span>
    </div>
  )
}

/* ── Sekce 5: Kontakt ── */
function KontaktSection({
  index,
  balicek,
  setBalicek,
  vyber,
}: {
  index: number
  balicek: string
  setBalicek: (v: string) => void
  /** Roste s každým kliknutím v ceníku. Jen spouštěč zvýraznění. */
  vyber: number
}) {
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [zvyraznit, setZvyraznit] = useState(false)
  const { show, ToastPortal } = useToast()

  /* Pole se vyplní samo někde mimo obrazovku, než k němu člověk dorolí.
     Bez krátkého zvýraznění by nepoznal, že se něco stalo, a vybíral by
     balíček znovu. Při prvním vykreslení se nespouští — vyber je 0. */
  useEffect(() => {
    if (vyber === 0) return
    setZvyraznit(true)
    const t = setTimeout(() => setZvyraznit(false), 1600)
    return () => clearTimeout(t)
  }, [vyber])

  function validate(data: FormData): FieldErrors {
    const e: FieldErrors = {}
    const jmeno = (data.get("jmeno") as string)?.trim()
    const email = (data.get("email") as string)?.trim()
    const zprava = (data.get("zprava") as string)?.trim()
    if (!jmeno) e.jmeno = "Vyplňte prosím jméno."
    if (!email) e.email = "Vyplňte prosím e-mail."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Zadejte platný e-mail."
    if (!zprava) e.zprava = "Napište prosím krátkou zprávu."
    if (data.get("souhlas") !== "ano") e.souhlas = "Pro odeslání je potřeba souhlas se zpracováním osobních údajů."
    return e
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const errs = validate(data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (res.ok) { show(`Mám to. Ozvu se ${ODEZVA.dlouhy}.`, "success"); form.reset(); setBalicek("") }
      else show(`Napište přímo na ${FIRMA.email}`, "error")
    } catch {
      show(`Napište přímo na ${FIRMA.email}`, "error")
    } finally {
      setSending(false)
    }
  }

  const inputCls = (err?: string) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all bg-white/5 ${
      err ? "border-red-500/40 focus:border-red-400" : "border-white/10 focus:border-white/30"
    }`

  const labelCls = "mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/55"

  return (
    <Card id="kontakt" index={index}>
      <SectionLabel num="05">Kontakt</SectionLabel>
      <h2 className="mb-4 font-heading text-2xl font-bold tracking-tight leading-snug sm:text-3xl md:text-4xl">
        Napište mi. Cenu i termín pošlu {ODEZVA.dlouhy}.
      </h2>
      <p className="mb-8 max-w-xl text-sm sm:text-base text-white/65 leading-relaxed">
        Stačí pár vět o tom, co potřebujete. Odpovím konkrétní cenou a termínem,
        ne pozvánkou na schůzku. Když se nedomluvíme, nic se neděje a nic
        neplatíte.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Kontaktní info */}
        <div className="flex flex-col gap-6">
          {/* Slib „jednáte přímo se mnou" potřebuje obličej. Bez fotky
              je to jen tvrzení. Nahradit za <Image> hned, jak bude. */}
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/20 p-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-dashed border-white/20 text-[10px] font-mono uppercase tracking-widest text-white/45">
              Foto
            </div>
            <p className="text-xs leading-relaxed text-white/55">
              [DOPLNIT: fotka] Prodáváte osobní přístup, ať je vidět, s kým
              bude klient jednat.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            <KontaktRadek
              label={FIRMA.jmeno}
              typ="E-mail"
              hodnota={FIRMA.email}
              href={`mailto:${FIRMA.email}`}
              onZprava={show}
            />
            <KontaktRadek
              label="Telefon"
              typ="Telefon"
              hodnota={FIRMA.telefon}
              href={`tel:${FIRMA.telefonHref}`}
              onZprava={show}
            />
          </ul>
        </div>

        {/* Formulář */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Honeypot proti spamu — skryté pole, lidé ho nevyplní */}
          <input
            type="text"
            name="web"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="jmeno" className={labelCls}>Jméno</label>
              <input
                id="jmeno"
                name="jmeno"
                autoComplete="name"
                aria-invalid={!!errors.jmeno}
                aria-describedby={errors.jmeno ? "jmeno-error" : undefined}
                className={inputCls(errors.jmeno)}
                placeholder="Jan Novák"
                onChange={() => errors.jmeno && setErrors(p => ({ ...p, jmeno: undefined }))}
              />
              <FieldError id="jmeno-error" msg={errors.jmeno} />
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputCls(errors.email)}
                placeholder="jan@firma.cz"
                onChange={() => errors.email && setErrors(p => ({ ...p, email: undefined }))}
              />
              <FieldError id="email-error" msg={errors.email} />
            </div>
          </div>

          {/* Výběr balíčku */}
          <div>
            <span id="balicek-label" className={labelCls}>
              Jaký web vás zajímá?
            </span>
            <BalicekDropdown
              value={balicek}
              onChange={setBalicek}
              labelId="balicek-label"
              zvyrazneno={zvyraznit}
            />
          </div>

          <div>
            <label htmlFor="zprava" className={labelCls}>Co potřebujete?</label>
            <textarea
              id="zprava"
              name="zprava"
              rows={4}
              aria-invalid={!!errors.zprava}
              aria-describedby={errors.zprava ? "zprava-error" : undefined}
              className={inputCls(errors.zprava)}
              placeholder="Krátce popište, jaký web byste rádi…"
              style={{ resize: "none" }}
              onChange={() => errors.zprava && setErrors(p => ({ ...p, zprava: undefined }))}
            />
            <FieldError id="zprava-error" msg={errors.zprava} />
          </div>

          <div>
            <label className="flex cursor-pointer select-none items-start gap-3">
              <input
                type="checkbox"
                name="souhlas"
                value="ano"
                onChange={() => errors.souhlas && setErrors(p => ({ ...p, souhlas: undefined }))}
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-white"
              />
              <span className="text-xs leading-relaxed text-white/65">
                Souhlasím se{" "}
                <a
                  href="/ochrana-osobnich-udaju"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 underline underline-offset-2 transition-colors hover:text-white"
                >
                  zpracováním osobních údajů
                </a>{" "}
                za účelem vyřízení poptávky.
              </span>
            </label>
            <FieldError msg={errors.souhlas} />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="rounded-lg bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-white/85 disabled:opacity-50"
          >
            {sending ? "Odesílám…" : `Odeslat, cenu pošlu ${ODEZVA.kratky}`}
          </button>
        </form>
      </div>
      {ToastPortal}
    </Card>
  )
}

/* ── Hlavní export ── */
export default function ScrollSections() {
  /* Balíček vybraný v ceníku má padnout rovnou do formuláře. Proto stav
     nesedí v kontaktu, ale tady nad oběma sekcemi.

     `vyber` je počítadlo, ne jen hodnota: kdyby někdo klikl na stejný
     balíček podruhé, hodnota by se nezměnila a pole by se nerozsvítilo,
     takže by to vypadalo, že tlačítko nic neudělalo. */
  const [balicek, setBalicek] = useState("")
  const [vyber, setVyber] = useState(0)

  function vybratBalicek(id: string) {
    setBalicek(id)
    setVyber((n) => n + 1)
    scrollToSection("kontakt")
  }

  return (
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-0 px-6 pb-24 pt-8">
      <div className="flex flex-col gap-6">
        <SluzbySection index={0} />
        <CenikSection index={1} onVybrat={vybratBalicek} />
        <SpravaSection index={2} />
        <UkazkySection index={3} />
        <KontaktSection index={4} balicek={balicek} setBalicek={setBalicek} vyber={vyber} />
      </div>
    </div>
  )
}
