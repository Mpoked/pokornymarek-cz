import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { BALICKY, FIRMA, PRVNI_KLIENTI } from "@/lib/firma";
import "./globals.css";

/* Čeština potřebuje latin-ext. V samotném `latin` chybí ě, š, č, ř, ž, ů
   a ď/ť/ň — bez toho by je prohlížeč dobral z náhradního písma a půlka
   slova by měla jiný tvar než druhá. */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

/* Patky jen na nadpisy. Drobný text patkovým písmem se na černém pozadí
   rozpadá — tenké tahy zmizí. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal"],
});

/**
 * Title začíná dotazem, ne jménem — „Marek Pokorný" nikdo nehledá,
 * „tvorba webů Uherské Hradiště" ano. Značka je až za oddělovačem.
 * Description je mini-inzerát (slib + cena + důvod kliknout), ne shrnutí.
 */
export const metadata: Metadata = {
  metadataBase: new URL(FIRMA.url),
  title: `Tvorba webů ${FIRMA.mesto}, od ${BALICKY[0].cenaText} | ${FIRMA.jmeno}`,
  description:
    `Weby na míru pro firmy ze Slovácka. Od ${BALICKY[0].cenaText}, cena ` +
    `předem a jednáte přímo se mnou. Hledám první ${PRVNI_KLIENTI.pocet} ` +
    `klienty, teď se slevou ${PRVNI_KLIENTI.slevaProcent} %.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "/",
    siteName: FIRMA.jmeno,
    title: `Tvorba webů ${FIRMA.mesto}, od ${BALICKY[0].cenaText}`,
    description:
      `Weby na míru pro firmy ze Slovácka, na dálku po celé ČR. ` +
      `Bez agentury a bez obchodníka mezi námi.`,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
