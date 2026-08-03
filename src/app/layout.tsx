import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BALICKY, FIRMA, PRVNI_KLIENTI } from "@/lib/firma";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    `Weby pro živnostníky a malé firmy ze Slovácka. Od ${BALICKY[0].cenaText}, ` +
    `jednáte přímo se mnou. Hledám první ${PRVNI_KLIENTI.pocet} klienty, ` +
    `teď se slevou ${PRVNI_KLIENTI.slevaProcent} %.`,
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
      `Weby pro živnostníky, řemeslníky a restaurace ze Slovácka, na dálku ` +
      `po celé ČR. Bez agentury a bez obchodníka mezi námi.`,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
