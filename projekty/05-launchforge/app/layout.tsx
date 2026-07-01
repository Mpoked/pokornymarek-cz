import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchForge - from idea to launch-ready product",
  description:
    "LaunchForge turns a product idea into a working, launch-ready build. Plan, generate, and ship in one fast loop.",
};

// Set the theme before first paint to avoid a flash. Defaults to dark.
const themeScript = `
try {
  var t = localStorage.getItem('lf-theme');
  if (t === 'light') document.documentElement.classList.remove('dark');
  else document.documentElement.classList.add('dark');
} catch (e) {
  document.documentElement.classList.add('dark');
}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
