# Design System: Truhlářství Kovář — Industrial Blueprint Landing

Zdroj pravdy pro `public/ukazky/truhlarstvi.html`. Vychází z referenčního
průmyslového webu (výrobce rozvaděčů) a překlápí ho do jazyka truhlářské dílny.

---

## 1. Visual Theme & Atmosphere

Dílna, ne showroom. Atmosféra technického výkresu přišpendleného na ponku —
milimetrové kóty, čistá čerň, teplé piliny a jedna signální žlutá, která
znamená „tady se rozhoduje". Rozhraní je věcné a sebejisté: velká tvrzení
zarovnaná vlevo, technické kresby vpravo, žádná dekorace bez funkce.

- **Density:** 5 — Daily App Balanced. Hutné pásy informací, ale s prostorem na nádech.
- **Variance:** 8 — Offset Asymmetric. Žádná osová symetrie, žádné centrované hero.
- **Motion:** 6 — Fluid CSS. Kaskádové odkrývání, nekonečný pás materiálů, taktilní tlačítka.

Stránka střídá **celoplošné pásy** (tmavý → krémový → šedý → tmavý → žlutý → tmavý).
Přechod mezi pásy je ostrý řez, ne gradient.

---

## 2. Color Palette & Roles

- **Dílna Off-Black** (`#141414`) — tmavé pásy, patika, sticky navigace. Nikdy `#000000`.
- **Ponk Deep** (`#0E0E0E`) — hlubší vrstva uvnitř tmavých pásů (karty, patika navu).
- **Pilina Bone** (`#F0EDE4`) — hlavní světlý podklad, teplý krém.
- **Prach Warm Gray** (`#D8D5CC`) — střední pás, odděluje dva světlé úseky.
- **Křída White** (`#FAF9F5`) — výplň karet na světlém podkladu.
- **Ink** (`#17181A`) — primární text na světlém.
- **Tuha Muted** (`#7A776E`) — sekundární text, popisky, metadata.
- **Rýha Line** (`rgba(23,24,26,0.12)`) — 1px konstrukční linky na světlém.
- **Rýha Line Dark** (`rgba(240,237,228,0.14)`) — 1px linky na tmavém.
- **Značka Yellow** (`#E8DC55`) — **jediný akcent.** hsl(54, 76%, 62%), saturace pod 80 %.
  Použití: primární CTA, aktivní stavy, zvýrazněné slovo v nadpisu, žlutý pás case study.

Zákaz: fialová/neonová AI paleta, zářivé gradienty, jakýkoli druhý akcent.

---

## 3. Typography Rules

Fonty jsou **self-hostované** v `public/fonts/` — CSP webu povoluje `font-src 'self' data:`,
takže Google Fonts nelze načíst. Soubory jsou latin + latin-ext subsety kvůli
české diakritice (ě š č ř ž ů ď ť ň).

- **Display + Body:** `Geist` (variable 100–900). Tight tracking (`-0.03em` u velkých
  nadpisů), hierarchie přes váhu a barvu, ne přes křiklavou velikost.
- **Mono:** `Geist Mono` — popisky sekcí, kóty, čísla, technická metadata.
  Vždy uppercase s tracking `0.14em` u labelů.
- **Body copy:** max 65 znaků na řádek, line-height 1.6.
- **Nadpisy:** `clamp()` škálování, line-height 0.95–1.05.

**Zakázáno:** `Inter`, `Georgia`, `Times New Roman`, `Palatino`, `Garamond`
a jakákoli patka. Tahle stránka je čistě bezpatková.

---

## 4. Component Stylings

- **Tlačítka:** ostré, radius 4px. Primární = žlutá výplň, černý text.
  Sekundární = 1px rámeček, průhledná výplň. Na `:active` posun `translateY(1px)`
  (taktilní stisk). Žádná vnější záře, žádný custom kurzor.
- **Karty:** radius 4px, 1px rámeček, plochá výplň. Používají se jen tam, kde
  elevace nese hierarchii. V hutných pásech se nahrazují linkou `border-top`.
- **Blueprint kresby:** inline SVG, tah 1.2–1.6px, kóty s šipkami a odsazovacími
  čárami, šrafování řezů. Barva tahu dědí z kontextu (světlá na tmavém a naopak).
- **Pás materiálů:** nekonečný marquee, animovaný pouze přes `transform`.
- **Akordeon (FAQ):** bez rámečků, položky dělí jen `border-bottom`. Přepínač `+` / `−`.
- **Formulář:** label nad polem, mono uppercase, chyba pod polem. Focus ring ve žluté.
- **Statistiky:** čísla v mono, kóta pod nimi.

---

## 5. Layout Principles

- CSS Grid, žádná `calc()` procenta.
- Kontejner max-width `1400px`, vnitřní odsazení `clamp(20px, 4vw, 48px)`.
- **Hero je asymetrický split** — nadpis vlevo (širší sloupec), doplňkový text
  a kresba vpravo. Centrované hero je zakázané.
- Sekční mezery `clamp(72px, 11vw, 160px)`.
- Žádné překrývání prvků — každý má svou vlastní plochu.
- Procesní kroky **nejsou tři stejné karty vedle sebe** — jsou schodovitě
  odsazené s propojovací kótou.
- Plnovýškové sekce používají `min-height: 100dvh`, nikdy `100vh`.

### Responsive
- Pod `768px` všechny vícesloupcové mřížky do jednoho sloupce.
- Horizontální přetečení = kritická chyba, kontroluje se na 375px.
- Dotykové cíle minimálně `44px`.
- Navigace se pod `900px` sbalí; blueprint kresby zůstávají, jen se zmenší.

---

## 6. Motion & Interaction

- Easing `cubic-bezier(0.16, 1, 0.3, 1)`, trvání 600–800 ms — vážný, pružinový dojem.
- Kaskádové odkrývání přes `IntersectionObserver`, stagger `70–80 ms`.
- **Pojistka:** když observer nespustí (načtení na pozadí, ctrl+klik), obsah se
  po 1,5 s odkryje natvrdo. Stránka nikdy nesmí zůstat prázdná.
- Perpetuální mikropohyb: nekonečný pás materiálů.
- Animuje se **výhradně** `transform` a `opacity`.
- `prefers-reduced-motion` vypíná odkrývání i marquee.

---

## 7. Anti-Patterns (zakázáno)

- Emoji kdekoli v kódu i obsahu
- `Inter` a jakákoli patka
- Čistá černá `#000000`
- Neonová záře, vnější glow, přesycené akcenty
- Gradientový text ve velkých nadpisech
- Tři stejné karty v řadě
- Centrované hero
- Výplňové texty typu „Scroll to explore", skákající šipky dolů
- Obecná jména („Jan Novák", „Acme"), vymyšlená kulatá čísla („99,9 %")
- AI fráze („špičkový", „na míru šitá řešení", „posuneme vás dál")
- Rozbité externí obrázky — CSP stejně povoluje jen `self` a `data:`,
  proto veškerá grafika běží jako inline SVG
