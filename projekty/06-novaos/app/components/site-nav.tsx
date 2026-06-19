"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/ai-features", label: "AI Features" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-[17px] font-semibold tracking-tight"
        >
          Nova<span className="text-muted">OS</span>
        </Link>

        <div className="hidden items-center gap-9 text-[14px] text-muted md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Request access
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 top-[68px] z-40 flex flex-col gap-1 bg-bg px-6 pt-8 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 text-2xl font-medium tracking-tight"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-4 font-medium text-bg"
          >
            Request access
          </Link>
        </div>
      )}
    </header>
  );
}
