"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "@/components/ui/toast"
import { scrollToSection } from "@/lib/scroll"

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
    { num: "01", title: "Landing pages", desc: "Jednostránkové weby zaměřené na jednu službu nebo kampaň." },
    { num: "02", title: "Webové prezentace", desc: "Moderní firemní web, který reprezentuje vaši značku a vyhledá se v Googlu." },
    { num: "03", title: "Redesign starých webů", desc: "Předělám váš web do moderní podoby, zrychlím ho a připravím pro vyhledávače." },
    { num: "04", title: "Jednoduché e-shopy", desc: "Prodejní stránka rychlá, přehledná a snadno spravovatelná." },
  ]
  return (
    <Card id="sluzby" index={index}>
      <SectionLabel>01 — Služby</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Weby, které opravdu fungují.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Specializujeme se na weby pro malé firmy, živnostníky, restaurace a řemeslníky
        z Uherského Hradiště a okolí.
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
      name: "Jednoduchý web",
      price: "9 900 Kč",
      note: "Ideální pro živnostníky",
      items: ["1 stránka (landing page)", "Mobilní responzivita", "Základní SEO", "Kontaktní formulář"],
      featured: false,
    },
    {
      name: "Standard",
      price: "19 900 Kč",
      note: "Nejčastější volba",
      items: ["Až 6 podstránek", "Vlastní design na míru", "Rozšířené SEO + schema", "Doména a hosting v ceně"],
      featured: true,
    },
    {
      name: "Prémiový",
      price: "34 900 Kč",
      note: "E-shopy a větší projekty",
      items: ["Neomezený rozsah stránek", "E-shop / rezervační systém", "Pokročilé SEO + analytika", "Prioritní podpora"],
      featured: false,
    },
  ]
  return (
    <Card id="cenik" index={index}>
      <SectionLabel>02 — Ceník</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Transparentní ceny, žádná překvapení.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Vždy si domluvíme přesnou cenu předem. Tři jasné balíčky, ze kterých vychází
        většina projektů.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border p-6 flex flex-col ${
              p.featured
                ? "border-white/40 bg-white text-black"
                : "border-white/8 bg-white/5 text-white"
            }`}
          >
            <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${p.featured ? "text-black/40" : "text-white/30"}`}>
              {p.note}
            </p>
            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
            <p className={`text-2xl sm:text-3xl font-bold tracking-tight mb-6 ${p.featured ? "text-black" : "text-white"}`}>
              od {p.price}
            </p>
            <ul className="flex flex-col gap-2 flex-1">
              {p.items.map((item) => (
                <li key={item} className={`flex items-center gap-2 text-sm ${p.featured ? "text-black/70" : "text-white/60"}`}>
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.featured ? "bg-black/40" : "bg-white/30"}`} />
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
              Mám zájem
            </a>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ── Sekce 3: Reference ── */
function ReferenceSection({ index }: { index: number }) {
  // Reference dočasně skryté (odkazy zatím mířily na localhost). Až budou
  // živé URL, vrátit sem pole projektů a odkazované karty — viz git historie.
  return (
    <Card id="reference" index={index}>
      <SectionLabel>03 — Reference</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Vybrané projekty.
      </h2>
      <p className="max-w-xl text-base text-white/50 leading-relaxed">
        Právě dokončujeme první veřejné ukázky. Portfolio rádi pošleme na
        vyžádání — stačí nám napsat přes formulář níže.
      </p>
    </Card>
  )
}

/* ── Custom dropdown ── */
const BALICKY = [
  { value: "",          label: "Vyberte balíček…",  sub: "" },
  { value: "jednoduchy", label: "Jednoduchý web",   sub: "od 9 900 Kč" },
  { value: "standard",   label: "Standard",          sub: "od 19 900 Kč" },
  { value: "premium",    label: "Prémiový",          sub: "od 34 900 Kč" },
  { value: "nevim",      label: "Ještě nevím",       sub: "poradíte mi" },
]

function BalicekDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = BALICKY.find(b => b.value === value) ?? BALICKY[0]

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between rounded-lg border px-4 py-3 text-sm outline-none transition-all bg-white/5 text-left ${
          open ? "border-white/30" : "border-white/10 hover:border-white/20"
        }`}
      >
        <span className={selected.value ? "text-white" : "text-white/30"}>
          {selected.label}
          {selected.sub && <span className="ml-2 text-white/30 text-xs">{selected.sub}</span>}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl overflow-hidden">
          {BALICKY.filter(b => b.value !== "").map((b, i) => (
            <button
              key={b.value}
              type="button"
              onClick={() => { onChange(b.value); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors hover:bg-white/8 ${
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

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
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
      if (res.ok) { show("Ozveme se do 2 pracovních dní.", "success"); form.reset(); setBalicek("") }
      else show("Napište přímo na kontakt@studiodva.cz", "error")
    } catch {
      show("Napište přímo na kontakt@studiodva.cz", "error")
    } finally {
      setSending(false)
    }
  }

  const inputCls = (err?: string) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all bg-white/5 ${
      err ? "border-red-500/40 focus:border-red-400" : "border-white/10 focus:border-white/30"
    }`

  return (
    <Card id="kontakt" index={index}>
      <SectionLabel>04 — Kontakt</SectionLabel>
      <h2 className="mb-5 text-3xl font-bold tracking-tight leading-snug md:text-5xl">
        Napište — ozveme se obratem.
      </h2>
      <p className="mb-10 max-w-xl text-base text-white/50 leading-relaxed">
        Pošlete nám krátkou zprávu a ozveme se vám nejpozději do druhého pracovního dne.
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Kontaktní info */}
        <ul className="flex flex-col gap-5">
          {[
            { label: "Marek Pokorný", value: "marek@studiodva.cz", href: "mailto:marek@studiodva.cz" },
            { label: "Matěj Vrážel", value: "matej@studiodva.cz", href: "mailto:matej@studiodva.cz" },
            { label: "Telefon", value: "+420 000 000 000", href: "tel:+420000000000" },
          ].map((item) => (
            <li key={item.label} className="border-b border-white/8 pb-5">
              <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1">{item.label}</p>
              {item.href
                ? <a href={item.href} className="break-all text-white font-medium hover:text-white/70 transition-colors">{item.value}</a>
                : <p className="text-white font-medium">{item.value}</p>
              }
            </li>
          ))}
        </ul>

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
              <label className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40">Jméno</label>
              <input
                name="jmeno"
                className={inputCls(errors.jmeno)}
                placeholder="Jan Novák"
                onChange={() => errors.jmeno && setErrors(p => ({ ...p, jmeno: undefined }))}
              />
              <FieldError msg={errors.jmeno} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40">E-mail</label>
              <input
                name="email"
                type="email"
                className={inputCls(errors.email)}
                placeholder="jan@firma.cz"
                onChange={() => errors.email && setErrors(p => ({ ...p, email: undefined }))}
              />
              <FieldError msg={errors.email} />
            </div>
          </div>

          {/* Výběr balíčku */}
          <div>
            <label className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40">
              Jaký web vás zajímá?
            </label>
            <BalicekDropdown value={balicek} onChange={setBalicek} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40">Co potřebujete?</label>
            <textarea
              name="zprava"
              rows={4}
              className={inputCls(errors.zprava)}
              placeholder="Krátce popište, jaký web byste rádi…"
              style={{ resize: "none" }}
              onChange={() => errors.zprava && setErrors(p => ({ ...p, zprava: undefined }))}
            />
            <FieldError msg={errors.zprava} />
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
            className="rounded-lg border border-white/20 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50"
          >
            {sending ? "Odesílám…" : "Odeslat poptávku"}
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
        <ReferenceSection index={2} />
        <KontaktSection index={3} />
      </div>
    </div>
  )
}
