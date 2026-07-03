import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ochrana osobních údajů · Studio Dva",
  description:
    "Zásady zpracování osobních údajů — jaké údaje zpracováváme, proč, jak dlouho a jaká máte práva.",
}

function Section({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-b border-white/10 pb-10">
      <p className="mb-2 text-xs font-mono uppercase tracking-[0.25em] text-white/30">
        {num}
      </p>
      <h2 className="mb-4 text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-white/60">{children}</div>
    </section>
  )
}

export default function OchranaOsobnichUdaju() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          ← Zpět na hlavní stránku
        </Link>

        <p className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-white/40">
          Studio Dva · Uherské Hradiště
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Ochrana osobních údajů
        </h1>
        <p className="mb-14 text-sm text-white/40">
          Zásady zpracování osobních údajů podle nařízení (EU) 2016/679 (GDPR).
          <br />
          Účinné od 3. 7. 2026.
        </p>

        <div className="flex flex-col gap-10">
          <Section num="01 — Správce údajů" title="Kdo jsme">
            <p>
              Správcem vašich osobních údajů jsou <strong className="text-white">Marek
              Pokorný</strong> a <strong className="text-white">Matěj Vrážel</strong>,
              působící společně pod značkou Studio Dva, Uherské Hradiště.
            </p>
            <p>
              Kontakt pro záležitosti ochrany osobních údajů:{" "}
              <a
                href="mailto:marek@studiodva.cz"
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                marek@studiodva.cz
              </a>
            </p>
          </Section>

          <Section num="02 — Rozsah" title="Jaké údaje zpracováváme">
            <p>
              Zpracováváme pouze údaje, které nám sami poskytnete odesláním kontaktního
              formuláře na tomto webu:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>jméno (případně název firmy),</li>
              <li>e-mailovou adresu,</li>
              <li>obsah vaší zprávy,</li>
              <li>vybraný balíček služeb (pokud jej zvolíte).</li>
            </ul>
            <p>
              Žádné další údaje nesbíráme. Web nepoužívá analytické ani marketingové
              nástroje a neukládá sledovací cookies.
            </p>
          </Section>

          <Section num="03 — Účel a právní základ" title="Proč údaje zpracováváme">
            <p>
              Údaje z formuláře používáme výhradně k <strong className="text-white">
              vyřízení vaší poptávky</strong> — tedy abychom vám mohli odpovědět,
              připravit nabídku a případně se domluvit na spolupráci.
            </p>
            <p>
              Právním základem zpracování je provedení opatření před uzavřením smlouvy
              na vaši žádost (čl. 6 odst. 1 písm. b GDPR) a váš souhlas udělený
              zaškrtnutím políčka před odesláním formuláře (čl. 6 odst. 1 písm. a GDPR).
            </p>
            <p>
              Vaše údaje nepoužíváme k rozesílání nevyžádaných obchodních sdělení ani je
              neprodáváme třetím stranám.
            </p>
          </Section>

          <Section num="04 — Doba uchování" title="Jak dlouho údaje uchováváme">
            <p>
              Údaje uchováváme po dobu nezbytnou k vyřízení poptávky a navazující
              komunikace, nejdéle však <strong className="text-white">2 roky</strong> od
              poslední vzájemné komunikace. Pokud dojde k uzavření spolupráce, uchováváme
              údaje po dobu trvání smluvního vztahu a dále po dobu vyžadovanou právními
              předpisy (např. účetními).
            </p>
            <p>
              O dřívější výmaz můžete kdykoli požádat — viz sekce Vaše práva.
            </p>
          </Section>

          <Section num="05 — Zpracovatelé" title="Komu údaje předáváme">
            <p>
              Pro technické odeslání formuláře využíváme službu{" "}
              <strong className="text-white">Formspree, Inc.</strong> (USA), která
              vystupuje jako zpracovatel osobních údajů. Předání údajů do USA probíhá na
              základě standardních smluvních doložek EU. Více v{" "}
              <a
                href="https://formspree.io/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                zásadách ochrany soukromí Formspree
              </a>
              .
            </p>
            <p>
              Dále mohou mít k údajům technický přístup poskytovatelé infrastruktury
              (hosting, e-mailová schránka). Jiným subjektům údaje nepředáváme.
            </p>
          </Section>

          <Section num="06 — Vaše práva" title="Jaká máte práva">
            <p>Podle GDPR máte právo:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>na přístup ke svým osobním údajům,</li>
              <li>na opravu nepřesných údajů,</li>
              <li>na výmaz („právo být zapomenut"),</li>
              <li>na omezení zpracování,</li>
              <li>na přenositelnost údajů,</li>
              <li>vznést námitku proti zpracování,</li>
              <li>odvolat souhlas se zpracováním (aniž by tím byla dotčena zákonnost zpracování před odvoláním).</li>
            </ul>
            <p>
              Pro uplatnění kteréhokoli práva nám napište na{" "}
              <a
                href="mailto:marek@studiodva.cz"
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                marek@studiodva.cz
              </a>
              . Odpovíme nejpozději do 30 dnů.
            </p>
            <p>
              Máte také právo podat stížnost u dozorového úřadu — Úřadu pro ochranu
              osobních údajů,{" "}
              <a
                href="https://uoou.gov.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                uoou.gov.cz
              </a>
              .
            </p>
          </Section>

          <Section num="07 — Cookies" title="Cookies a sledování">
            <p>
              Tento web neukládá žádné sledovací ani analytické cookies. Nepoužíváme
              Google Analytics, reklamní systémy ani sociální pluginy, které by vás
              sledovaly.
            </p>
          </Section>

          <section>
            <p className="text-xs text-white/30">
              Tyto zásady můžeme čas od času aktualizovat — aktuální verze je vždy
              dostupná na této stránce. Poslední aktualizace: 3. 7. 2026.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
