# pokornymarek.cz

Landing page pro Marka Pokorného — tvorba webových stránek v Uherském Hradišti.

## Struktura

- `index.html` — hlavní stránka s SEO meta, Schema.org markupem (LocalBusiness, Person, Service, FAQPage), Open Graph
- `styles.css` — kompletní styl, mobile-first, responzivní
- `script.js` — minimum JS (mobilní menu, scroll-reveal, sticky header, formulář → mailto fallback)
- `favicon.svg` — SVG favikona "MP"
- `robots.txt`, `sitemap.xml` — SEO

## Spuštění lokálně

Stačí otevřít `index.html` v prohlížeči. Nebo přes jednoduchý server:

```bash
npx http-server . -p 3000
```

Pak otevři `http://localhost:3000`.

## Před nasazením doplnit

- `kontakt@pokornymarek.cz` → reálný e-mail
- `+420 000 000 000` → reálné telefonní číslo
- `IČO: 00000000` → reálné IČO
- `og-image.jpg` (1200×630 px) → náhledový obrázek pro sdílení
- `apple-touch-icon.png` (180×180 px)
- Fotografie do sekce "O mně" (nahradit placeholder)
- Reference (6 projektů) — náhledy + popisy
- Ověřit ceny v ceníku

## SEO checklist po nasazení

- [ ] Google Search Console — přidat doménu, ověřit, nahrát sitemap
- [ ] Google Business Profile — založit lokální profil pro Uherské Hradiště
- [ ] Seznam.cz Sklik — registrace firmy v lokálním katalogu
- [ ] Firmy.cz — bezplatný zápis
- [ ] Test rich snippets: search.google.com/test/rich-results
- [ ] PageSpeed: pagespeed.web.dev — cílit Lighthouse 95+

## Cílová klíčová slova (primární)

- tvorba webových stránek Uherské Hradiště
- webové stránky Uherské Hradiště
- webař Uherské Hradiště
- tvorba webu Slovácko
- levné webové stránky Uherské Hradiště
