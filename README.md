# pokornymarek.cz

Portfolio web pro **Studio Dva** — Marek Pokorný & Matěj Vrážel, webové studio z Uherského Hradiště.

Postaveno na **Next.js 16 · Tailwind CSS · TypeScript · SQLite**.

---

## Poptávky, admin a e-maily

Kontaktní formulář běží kompletně ve vlastní režii (žádný Formspree):

- **`POST /api/contact`** — validace, uložení do SQLite (`./data/studio.db`), e-mailové upozornění, honeypot proti spamu
- **`/admin`** — přehled poptávek (nepřečtené zvýrazněné, označit přečtené, smazat = GDPR výmaz), chráněno heslem
- **`/ochrana-osobnich-udaju`** — zásady zpracování osobních údajů; formulář vyžaduje souhlas

### První nastavení

```bash
cp .env.example .env.local
```

Pak v `.env.local` doplň:

1. **`ADMIN_PASSWORD`** — silné heslo do administrace
2. **SMTP pro Gmail** (upozornění na nové poptávky):
   - zapni dvoufázové ověření: https://myaccount.google.com/security
   - vygeneruj heslo aplikace: https://myaccount.google.com/apppasswords
   - vlož ho do `SMTP_PASS`
3. **`CONTACT_TO`** — kam mají upozornění chodit (víc adres odděl čárkou)

Bez SMTP se poptávky pořád ukládají do databáze — jen nechodí e-maily.

---

## Vývoj lokálně

```bash
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

## Nasazení (Docker na vlastním serveru)

```bash
docker compose build
docker compose up -d
```

Web běží na portu 3000 — na veřejný internet přes Cloudflare Tunnel.
Databáze žije ve složce `./data` (volume) — přežije restart i rebuild kontejneru.

**Záloha = zkopírovat `./data/studio.db`.**

---

## Co dodělat

### Obsah
- [ ] Doplnit reálné telefonní číslo (aktuálně `+420 000 000 000`)
- [ ] Doplnit skutečné reference / projekty (aktuálně jsou placeholdery s `localhost:3001`)
- [ ] Přidat fotku nebo logo do navbaru (místo textu „DVA")
- [ ] Favicon a `og:image` pro sdílení na sociálních sítích
- [ ] Zřídit e-mailové schránky marek@ / matej@ (na webu jsou zatím jen jako text)

### Funkce
- [ ] Mobilní hamburger menu (nav je schovaný pod `md:flex`, na mobilu chybí)
- [ ] Animace při prvním načtení (hero sekce před sticky kartami)
- [ ] Přidat analytics bez cookies (např. Plausible) — zásady údajů slibují žádné sledování, pozor na to

### Technické
- [ ] Rozjet Cloudflare Tunnel na domácím serveru a připojit doménu `pokornymarek.cz`
- [ ] Přidat `sitemap.xml` a `robots.txt` pro SEO
- [ ] Zkontrolovat Lighthouse skóre a vyladit Core Web Vitals
- [ ] Zálohovat `./data/studio.db` (cron na serveru)

### Design
- [ ] Otestovat na různých prohlížečích (Safari, Firefox)
