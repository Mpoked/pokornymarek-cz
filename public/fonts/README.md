# Písma

Všechna písma jsou hostovaná lokálně — `next.config.ts` nastavuje
`font-src 'self' data:`, takže načítání z Google Fonts by prohlížeč zablokoval.

## Geist / Geist Mono

- Soubory: `geist-latin.woff2`, `geist-latin-ext.woff2`,
  `geist-mono-latin.woff2`, `geist-mono-latin-ext.woff2`
- Licence: SIL Open Font License 1.1
- Zdroj: převzato z výstupu `next/font/google`, který si je stahuje při buildu
- Použití: `public/ukazky/truhlarstvi.html`

## Playfair Display

- Soubory: `playfair-latin.woff2`, `playfair-latin-ext.woff2`,
  `playfair-italic-latin.woff2`, `playfair-italic-latin-ext.woff2`
- Variabilní váha 400–900, řez normální i kurzíva
- Licence: SIL Open Font License 1.1 — https://openfontlicense.org
- Autoři: Claus Eggers Sørensen a přispěvatelé,
  https://github.com/clauseggers/Playfair-Display
- Použití: `public/ukazky/vinny-sklep.html`

Obě písma jsou pod OFL, která dovoluje volné šíření i komerční použití
včetně vložení do webu. Podmínkou je zachovat toto uvedení autorství
a nešířit písma pod původním názvem v upravené podobě.

## Proč jen latin a latin-ext

Subset `latin` pokrývá základní abecedu, `latin-ext` přidává české
diakritické znaky (ě š č ř ž ů ď ť ň). Ostatní subsety (cyrilice,
vietnamština) by jen zbytečně zvětšovaly stránku.
