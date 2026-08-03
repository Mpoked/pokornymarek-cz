"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/toast"
import { scrollToSection } from "@/lib/scroll"
import { BALICKY as CENIK, FIRMA, ODEZVA, dphPoznamka } from "@/lib/firma"

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
      /* Na mobilu karty plynou normálně pod sebou (relative), aby se
         nezakrývaly — sticky vrstvení se zapne až od md výš. */
      className="relative md:sticky w-full"
      style={{ top: `${80 + index * 20}px`, zIndex: 10 + index }}
    >
      <div
        className="rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl p-6 sm:p-8 md:p-14 transition-transform duration-300"
        style={{ transformOrigin: "top center" }}
      >
        {children}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-white/30">
      {children}
    </p>
  )
}

/* ── Sekce 1: Služby ── */
function SluzbySection({ index }: { index: number }) {
  const services = [
    {
      num: "01",
      title: "Landing pages",
      desc: "Jedna stránka, jeden cíl. Pro jednu službu nebo jednu kampaň, kde má návštěvník udělat jedinou věc — zavolat, objednat, přijít.",
    },
    {
      num: "02",
      title: "Webové prezentace",
      desc: "Firemní web na čtyři až šest stránek. Načte se do dvou sekund a najdou vás v Googlu na dotazy typu „truhlář Uherské Hradiště“.",
    },
    {
      num: "03",
      title: "Redesign starých webů",
      desc: "Starý web předělám do současné podoby — hlavně na mobilu, kde dnes chodí většina lidí. Adresy stránek zůstanou, takže nepřijdete o pozice ve vyhledávání.",
    },
    {
      num: "04",
      title: "Jednoduché e-shopy",
      desc: "Pár desítek položek, košík a platba kartou. Bez administrace, ve které se po týdnu ztratíte.",
    },
  ]
  return (
    <Card id="sluzby" index={index}>
      <SectionLabel>01 — Služby</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Čtyři typy webů od 9 900 Kč. Vyberte podle toho, co potřebujete.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Dělám weby pro malé firmy, živnostníky, restaurace a řemeslníky
        z {FIRMA.mestoGen} a okolí. Ne pro korporace — na ty jsou agentury
        s obchodním oddělením.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.num} className="rounded-xl border border-white/8 bg-white/5 p-5">
            <span className="text-xs font-mono text-white/30 tracking-widest">{s.num}</span>
            <h3 className="mt-2 mb-1 font-semibold text-white">{s.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Sekce 2: Ceník ── */
function CenikSection({ index }: { index: number }) {
  const plans = [
    {
      ...CENIK[0],
      items: [
        "1 stránka (landing page)",
        "Funguje na mobilu i na počítači",
        "Základní SEO — najdou vás v Googlu",
        "Kontaktní formulář",
      ],
      featured: false,
    },
    {
      ...CENIK[1],
      items: [
        "Až 6 podstránek",
        "Vlastní design na míru, ne šablona",
        "Rozšířené SEO + strukturovaná data",
        "Doména a hosting v ceně [DOPLNIT: na jak dlouho]",
      ],
      featured: true,
    },
    {
      ...CENIK[2],
      items: [
        "Neomezený rozsah stránek",
        "E-shop nebo rezervační systém",
        "Pokročilé SEO + měření návštěvnosti",
        "Přednostní řešení oprav a změn",
      ],
      featured: false,
    },
  ]
  return (
    <Card id="cenik" index={index}>
      <SectionLabel>02 — Ceník</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        9 900, 19 900 nebo 34 900 Kč. Cenu se dozvíte tady, ne po telefonu.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Většina webařů v okolí má místo ceny formulář „ozveme se vám“. Tady jsou
        tři balíčky, ze kterých vychází skoro každý projekt. Přesnou cenu si
        domluvíme napevno předem — po odsouhlasení se už nemění. {dphPoznamka()}
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.nazev}
            className={`rounded-xl border p-6 flex flex-col ${
              p.featured
                ? "border-white/40 bg-white text-black"
                : "border-white/8 bg-white/5 text-white"
            }`}
          >
            <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${p.featured ? "text-black/40" : "text-white/30"}`}>
              {p.note}
            </p>
            <h3 className="font-bold text-lg mb-1">{p.nazev}</h3>
            <p className={`text-2xl sm:text-3xl font-bold tracking-tight mb-6 ${p.featured ? "text-black" : "text-white"}`}>
              od {p.cenaText}
            </p>
            <ul className="flex flex-col gap-2 flex-1">
              {p.items.map((item) => (
                <li key={item} className={`flex items-start gap-2 text-sm ${p.featured ? "text-black/70" : "text-white/60"}`}>
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${p.featured ? "bg-black/40" : "bg-white/30"}`} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); scrollToSection("kontakt") }}
              className={`mt-8 block rounded-lg border py-2.5 text-center text-sm font-semibold transition-all ${
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

      <p className="mt-8 max-w-xl text-sm text-white/35 leading-relaxed">
        Co v ceníku ještě chybí a lidé se na to ptají nejčastěji: jak dlouho web
        trvá, co potřebuju od vás, a co se děje po předání.{" "}
        <span className="text-white/50">
          [DOPLNIT: termín dodání u každého balíčku, co dodává klient (texty,
          fotky, logo), a jak to funguje po spuštění — kdo web upravuje a za kolik]
        </span>
      </p>
    </Card>
  )
}

/* ── Sekce 3: Ukázky ── */
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
      <SectionLabel>03 — Ukázky</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Čtyři weby, které jsem navrhl a postavil od nuly.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Nejsou to zakázky pro klienty — jsou to moje vlastní návrhy a firmy
        v nich jsou vymyšlené. Nechci vydávat cizí práci za svou. Každý z nich
        jsem postavil celý sám, aby bylo vidět, jak pracuju v různých oborech.
        Klikněte a proklikejte si je.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.num}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-5 py-4 transition-all hover:border-white/25 hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/30">{p.num}</span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white text-sm">{p.title}</p>
                  <span className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Koncept
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">{p.tag}</p>
              </div>
            </div>
            <svg className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 16 16" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 11L11 5M11 5H6M11 5V10" />
            </svg>
          </a>
        ))}
      </div>
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
}: {
  value: string
  onChange: (v: string) => void
  labelId: string
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
        className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-sm outline-none transition-all bg-white/5 text-left focus-visible:border-white/40 ${
          open ? "border-white/30" : "border-white/10 hover:border-white/20"
        }`}
      >
        <span className={selected.value ? "text-white" : "text-white/30"}>
          {selected.label}
          {selected.sub && <span className="ml-2 text-white/30 text-xs">{selected.sub}</span>}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className={`shrink-0 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
              <span className="text-xs text-white/30">{b.sub}</span>
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

/* ── Sekce 4: Kontakt ── */
function KontaktSection({ index }: { index: number }) {
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [balicek, setBalicek] = useState("")
  const { show, ToastPortal } = useToast()

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

  const labelCls = "mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40"

  return (
    <Card id="kontakt" index={index}>
      <SectionLabel>04 — Kontakt</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Napište mi. Cenu i termín pošlu {ODEZVA.dlouhy}.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Stačí pár vět o tom, co potřebujete. Odpovím konkrétní cenou a termínem —
        ne pozvánkou na schůzku. Když se nedomluvíme, nic se neděje a nic neplatíte.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Kontaktní info */}
        <div className="flex flex-col gap-6">
          {/* Slib „osobně, bez prostředníků" potřebuje obličej — bez fotky
              je to jen tvrzení. Nahradit za <Image> hned, jak bude. */}
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-white/20 p-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full border border-dashed border-white/20 text-[10px] font-mono uppercase tracking-widest text-white/30">
              Foto
            </div>
            <p className="text-xs leading-relaxed text-white/40">
              [DOPLNIT: fotka] Prodáváte osobní přístup — návštěvník by měl vidět,
              s kým bude jednat.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {[
              { label: FIRMA.jmeno, value: FIRMA.email, href: `mailto:${FIRMA.email}` },
              { label: "Telefon", value: FIRMA.telefon, href: `tel:${FIRMA.telefonHref}` },
            ].map((item) => (
              <li key={item.label} className="border-b border-white/8 pb-5">
                <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1">{item.label}</p>
                <a href={item.href} className="break-all text-white font-medium hover:text-white/70 transition-colors">{item.value}</a>
              </li>
            ))}
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
            <BalicekDropdown value={balicek} onChange={setBalicek} labelId="balicek-label" />
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
              <span className="text-xs leading-relaxed text-white/50">
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
            {sending ? "Odesílám…" : `Odeslat — cenu pošlu ${ODEZVA.kratky}`}
          </button>
        </form>
      </div>
      {ToastPortal}
    </Card>
  )
}

/* ── Hlavní export ── */
export default function ScrollSections() {
  return (
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-0 px-6 pb-24 pt-8">
      <div className="flex flex-col gap-6">
        <SluzbySection index={0} />
        <CenikSection index={1} />
        <UkazkySection index={2} />
        <KontaktSection index={3} />
      </div>
    </div>
  )
}
