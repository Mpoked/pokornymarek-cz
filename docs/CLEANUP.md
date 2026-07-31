# Úklid repozitáře

Záznam o pročištění repozitáře před zveřejněním na GitHubu.

---

## 2026-07-31

### Odstraněno

| Soubor | Důvod |
|---|---|
| `public/file.svg` | Zbytek výchozí šablony Next.js, nikde se nepoužíval |
| `public/globe.svg` | Totéž |
| `public/next.svg` | Totéž |
| `public/vercel.svg` | Totéž |
| `public/window.svg` | Totéž |
| `src/components/ui/etheral-shadow.tsx` | Komponenta bez jediného importu |
| `src/components/ui/background-paper-shaders.tsx` | Bez importu; navíc jediný zdroj chyb ESLint (`react-hooks/immutability`) |
| `src/app/favicon2.ico` | Nesledovaný zbytek po experimentu s ikonou |

Ověřeno, že žádný z odstraněných souborů nikde nefiguroval — `paper-background.tsx`
(který se používá) je jiná komponenta a zůstal.

### Opraveno

- **Nespárované uvozovky.** Na šesti místech byla česká otevírací `„` (U+201E)
  ukončená obyčejnou ASCII `"` (U+0022). Nahrazeno správnou českou zavírací `“`
  (U+201D) v souborech `ochrana-osobnich-udaju/page.tsx`, `admin/submission-list.tsx`
  a ve třech ukázkových stránkách. Tím zmizela i poslední chyba ESLint
  (`react/no-unescaped-entities`).
- **Zbytečné `eslint-disable` direktivy** v `lib/db.ts`, `lib/mail.ts`
  a `lib/rate-limit.ts` — pravidla, která potlačovaly, už nehlásí nic.

Výsledek: `npx eslint src` hlásí **0 chyb a 0 varování**, `next build` prochází.

### Doplněno do `.gitignore`

- Systémové smetí: `Thumbs.db`, `ehthumbs.db`, `desktop.ini`
- Dočasné soubory a zálohy: `*.tmp`, `*.temp`, `*.bak`, `*.log`
- IDE: `.vs/`, `.idea/`, `*.suo`, `*.user`
- Lokální spouštěče: `run.cmd`, `vystup.log` (obsahují absolutní cesty ke konkrétnímu počítači)

---

## Známé věci, které zůstaly

### Velikost repozitáře (156 MB)

V historii leží zabalené buildy demo projektů, které se do repa kdysi dostaly
a byly až později zaneseny do `.gitignore` (commit `f2d4761`):

```
projekty/05-launchforge/.next/cache/webpack/…/1.pack.gz   18,6 MB
projekty/06-novaos/.next/cache/webpack/…/1.pack.gz        18,5 MB
projekty/06-novaos/.next/cache/webpack/…/0.pack.gz        17,5 MB
projekty/05-launchforge/.next/cache/webpack/…/0.pack.gz   16,0 MB
… a dalších přibližně 60 MB
```

Z pracovního stromu jsou pryč, ale z historie ne — proto se repo klonuje jako 156 MB
místo zhruba 2 MB. Odstranění by znamenalo přepsat historii (`git filter-repo`)
a vynutit push, čímž se změní všechny hashe commitů. **Vědomě odloženo** —
funkčnosti to nevadí, jen je klonování pomalejší.

### Dvě nesouvisející historie

Repozitář obsahuje dva oddělené stromy commitů bez společného předka:

| Kořen | Větve | Obsah |
|---|---|---|
| `3f6ee4f` | `main`, `test/*`, `feature/*` | Starší designové experimenty |
| `2a483ca` | `master` → `osobni` | Současný web |

Proto nelze `osobni` do `main` prostě sloučit — chybí společný základ.
Výchozí větev na GitHubu je kvůli tomu přepnuta na `osobni`.

---

## Ověřeno jako v pořádku

- `.env.local` i databáze `data/` jsou správně ignorované, do repa se nedostaly
- V kódu není žádné heslo ani API klíč natvrdo
- Žádné `console.log`, `debugger` ani nedokončené `TODO` / `FIXME`
