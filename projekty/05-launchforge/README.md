# LaunchForge — landing page

Demo marketing landing page for a fictional AI-native developer-tool platform.
Built for the portfolio (project 05).

## Stack

- Next.js (App Router)
- Tailwind v4 (`@tailwindcss/postcss`)
- Motion (`motion/react`) for animation
- Phosphor icons (`@phosphor-icons/react`)
- Geist + Geist Mono (`geist` package)

The whole landing page lives in one file: `app/page.tsx`.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Dark mode is the default; the nav has a
light/dark toggle.

## Images

All images are `picsum.photos` placeholders with a dark + ember treatment.
Swap these for real assets before any real launch:

- Hero asset (1200x1000, abstract forge / molten-metal mood)
- Capability feature image (900x900)
- Three testimonial portraits (96x96)

The placeholder sources are marked with `TODO` in `app/page.tsx`.
