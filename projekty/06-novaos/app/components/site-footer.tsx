import Link from "next/link";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "AI Features", href: "/ai-features" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/about" },
      { label: "Terms", href: "/about" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-[19px] font-semibold tracking-tight">
              Nova<span className="text-muted">OS</span>
            </Link>
            <p className="mt-4 max-w-[26ch] text-[14px] leading-relaxed text-muted">
              One calm, intelligent workspace for everything you make.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-ink">{col.title}</p>
              <ul className="mt-5 space-y-3.5 text-[14px] text-muted">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 NovaOS. All rights reserved.</span>
          <span>Designed for the way work should feel.</span>
        </div>
      </div>
    </footer>
  );
}
