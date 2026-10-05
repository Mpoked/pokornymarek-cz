/**
 * Obory, pro které mají weby vlastní podstránku (/weby-pro/[slug]).
 *
 * Na „tvorba webů Uherské Hradiště" se přetahuje deset let starých webů.
 * Na „web pro vinařství" nebo „web pro developerský projekt" skoro nikdo,
 * a ten dotaz hledá i člověk z druhého konce republiky.
 *
 * Nový obor = nový objekt tady. Stránka, sitemapa i odkazy v patičce
 * se z toho pole generují samy.
 *
 * Texty musí být o oboru, ne kopie úvodní stránky. Google stránky,
 * které se liší jen dosazeným slovem, bere jako jednu.
 */

import { BALICKY, DODANI, ODEZVA } from "@/lib/firma"

export type Obor = {
  slug: string
  /** Do věty „Weby pro {nazev}" a do odkazů. */
  nazev: string
  /** <title> bez značky, ta se přidá v šabloně. */
  title: string
  description: string
  /** Nadpis H1. */
  h1: string
  uvod: string
  /** Co obor na webu opravdu potřebuje. Každá položka = konkrétní funkce. */
  potreby: { nadpis: string; text: string }[]
  /** Statická ukázka v /public/ukazky, pokud pro obor existuje. */
  ukazka?: { href: string; popis: string }
  faq: { otazka: string; odpoved: string }[]
}

export const OBORY: Obor[] = [
  {
    slug: "vinarstvi",
    nazev: "vinařství",
    title: "Weby pro vinařství a vinné sklepy",
    description:
      "Web pro vinařství, který prodává: degustace, rezervace sklepa, ceník vín a akce. Od Slovácka po celou ČR, cena předem.",
    h1: "Weby pro vinařství a vinné sklepy",
    uvod:
      "Bydlím na Slovácku, takže vím, že vinařství nežije jen z lahví v regálu. Lidi jezdí na degustace, spí ve sklepě, chodí na otevřené sklepy. Web má tohle všechno ukázat a hlavně umožnit si to zarezervovat, ne jen vypsat telefon.",
    potreby: [
      {
        nadpis: "Rezervace degustací a sklepa",
        text: "Formulář na termín a počet lidí, který vám přijde e-mailem. Žádné dohadování přes Messenger.",
      },
      {
        nadpis: "Ceník vín, který si upravíte sami",
        text: "Odrůdy, ročníky, přívlastky a cena. Když víno dojde, označíte ho jako vyprodané a nemusíte volat mně.",
      },
      {
        nadpis: "Akce a otevřené sklepy",
        text: "Kalendář akcí na jednom místě, ať se o nich lidé nedozvídají až z Facebooku den předem.",
      },
      {
        nadpis: "Ubytování",
        text: "Pokoje nebo apartmány ve sklepě s fotkami, cenou a dotazem na volný termín.",
      },
      {
        nadpis: "Prodej vína online",
        text: "Jednoduchý e-shop s ověřením věku 18+, protože alkohol se nezletilým prodávat nesmí ani přes internet.",
      },
      {
        nadpis: "Jazykové verze",
        text: "Němčina nebo angličtina pro turisty z Rakouska a cyklisty z vinařských stezek.",
      },
    ],
    ukazka: {
      href: "/ukazky/vinny-sklep.html",
      popis: "Ukázka: vinný sklep s degustacemi a ubytováním",
    },
    faq: [
      {
        otazka: "Zvládnu si ceník vín upravovat sám?",
        odpoved: "Ano. Ceník je udělaný tak, abyste změnil cenu nebo označil víno jako vyprodané bez mě. Když nechcete, udělám to v rámci správy.",
      },
      {
        otazka: "Můžu přes web prodávat víno?",
        odpoved: `Můžete, s ověřením věku a doručením přes dopravce, který převzetí ověří. Pro pár desítek vín stačí jednoduchý e-shop z balíčku za ${BALICKY[2].cenaText}.`,
      },
    ],
  },
  {
    slug: "stavebni-firmy",
    nazev: "stavební firmy",
    title: "Weby pro stavební firmy a řemeslníky",
    description:
      `Web pro stavební firmu: reference realizací s fotkami, poptávkový formulář a nábor lidí. Fixní cena, hotovo ${DODANI.text} od podkladů.`,
    h1: "Weby pro stavební firmy",
    uvod:
      "U stavebky rozhoduje, co už jste postavili. Investor si chce prohlédnout hotové stavby, ne číst, že jste spolehliví. Web proto stavím kolem realizací a kolem poptávky, ze které hned poznáte, o jakou zakázku jde.",
    potreby: [
      {
        nadpis: "Reference realizací",
        text: "Každá stavba s fotkami, lokalitou, rokem a rozsahem prací. Nové přidáte sami z telefonu.",
      },
      {
        nadpis: "Poptávka, která se dá nacenit",
        text: "Formulář s typem stavby, lokalitou, termínem a přílohou s projektem. Žádné „ozvěte se mi“ bez kontextu.",
      },
      {
        nadpis: "Co děláte a kde",
        text: "Samostatné stránky pro hlavní služby a oblast působení, aby vás našli lidé, kteří hledají „rekonstrukce domu“ v okrese, ne jen vaše jméno.",
      },
      {
        nadpis: "Certifikáty a pojištění",
        text: "Oprávnění, certifikace a pojištění odpovědnosti na očích. U větších zakázek to investor stejně chce vidět.",
      },
      {
        nadpis: "Nábor",
        text: "Stránka s volnými místy. Řemeslníky dnes hledá každá stavebka a web je jedno z mála míst, kde za inzerát neplatíte.",
      },
    ],
    faq: [
      {
        otazka: "Nemám profesionální fotky, vadí to?",
        odpoved: "Nevadí. Fotky z telefonu z hotových staveb stačí, upravím je. Důležitější je, aby jich bylo dost a byly skutečné.",
      },
      {
        otazka: "Kolik takový web stojí?",
        odpoved: `Firemní web s referencemi a poptávkovým formulářem odpovídá balíčku ${BALICKY[1].nazev} za ${BALICKY[1].cenaText}. Cenu pošlu předem a nemění se.`,
      },
    ],
  },
  {
    slug: "developery",
    nazev: "developery",
    title: "Weby pro developerské projekty",
    description:
      "Web developerského projektu: ceník a dostupnost bytů, půdorysy, vizualizace, lokalita a rezervace. Fixní cena, bez agentury.",
    h1: "Weby pro developerské projekty",
    uvod:
      "Kdo kupuje byt, chce na první pohled vidět, co je ještě volné, kolik to stojí a jak to vypadá uvnitř. Web projektu má tohle ukázat rychleji, než stihne zavolat makléři, a poptávku poslat rovnou vám.",
    potreby: [
      {
        nadpis: "Ceník a dostupnost bytů",
        text: "Tabulka bytů s filtrem podle dispozice, patra a ceny. Stav volný, rezervovaný, prodaný měníte sami.",
      },
      {
        nadpis: "Karta každého bytu",
        text: "Půdorys, plocha místností, balkon nebo předzahrádka, sklep, parkování a cena na jedné stránce.",
      },
      {
        nadpis: "Vizualizace a průběh stavby",
        text: "Galerie vizualizací a fotky ze stavby, které ukazují, že projekt opravdu roste.",
      },
      {
        nadpis: "Lokalita",
        text: "Mapa s okolím: škola, obchody, zastávka, cyklostezka. Kupující se rozhoduje i podle toho, co je kolem.",
      },
      {
        nadpis: "Poptávka a rezervace",
        text: "Dotaz na konkrétní byt rovnou z jeho karty, ať víte, o který jde.",
      },
    ],
    faq: [
      {
        otazka: "Uděláte web pro jeden projekt, nebo pro celou firmu?",
        odpoved: "Obojí. Nejčastější je samostatný web projektu na vlastní doméně, který po doprodání můžete odkázat z firemního webu.",
      },
      {
        otazka: "Kolik stojí web projektu s ceníkem bytů?",
        odpoved: `Podle počtu bytů a funkcí, obvykle v rozsahu balíčku za ${BALICKY[2].cenaText}. Přesnou cenu pošlu ${ODEZVA.dlouhy} od zadání.`,
      },
    ],
  },
]

export function najdiObor(slug: string): Obor | undefined {
  return OBORY.find((o) => o.slug === slug)
}
