# NovaOS — brand site

Demo luxury-technology brand site for a fictional AI workspace platform.
Portfolio project 06. Built to emulate Apple-grade craftsmanship: large-scale
presentation, generous whitespace, restrained color, scroll-driven storytelling.

## Stack

- Next.js (App Router), multi-page
- Tailwind v4 (`@tailwindcss/postcss`)
- Motion (`motion/react`) — `useScroll` / `useTransform` + CSS sticky for
  cinematic scroll storytelling (no GSAP)
- Phosphor icons (`@phosphor-icons/react`)
- Onest (via `next/font`)

Dark-primary brand system, locked across all pages.

## Pages

- `/` — Home (long-form cinematic, fully built)
- `/product`, `/ai-features`, `/enterprise`, `/about`, `/contact` — placeholders
  in this pass, built to full depth next.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Images

All visuals are `picsum.photos` placeholders with a dark cinematic treatment.
Swap the `TODO`-marked sources for real product renders and brand imagery.
