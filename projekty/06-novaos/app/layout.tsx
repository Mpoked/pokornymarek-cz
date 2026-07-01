import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SiteNav } from "./components/site-nav";
import { SiteFooter } from "./components/site-footer";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NovaOS - one workspace, everything in flow",
  description:
    "NovaOS unifies productivity, communication, and automation in one calm, intelligent workspace. A new standard for how work feels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={onest.variable}>
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
