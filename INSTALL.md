# Návod: nasazení webu na server (Debian + Docker)

Tento návod nasadí celý web tak, aby fungovalo **pozadí, footer, admin
i formulář**. Používá Docker — nemusíš na server ručně instalovat Node,
balíčky ani nic pro `better-sqlite3`. Docker to udělá za tebe.

> Když ti teď na serveru nefunguje pozadí/footer/admin/formulář, skoro
> jistě tam běží starý nebo nekompletní build. Tenhle postup nasadí
> čistou aktuální verzi a přepíše to.

---

## 0. Co potřebuješ

- Server s Debianem (máš — `192.168.0.254`, uživatel `pokorny`)
- Připojení: `ssh pokorny@192.168.0.254`
- 10 minut

---

## 1. Nainstaluj Docker (jen poprvé)

Přihlas se na server:

```bash
ssh pokorny@192.168.0.254
```

Zkontroluj, jestli Docker už není:

```bash
docker --version && docker compose version
```

Pokud to vypíše verze → přeskoč na krok 2. Pokud „command not found“,
nainstaluj Docker oficiálním skriptem:

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
```

Po `usermod` se **odhlas a znovu přihlas** (`exit`, pak znovu `ssh …`),
aby ses dostal k Dockeru bez `sudo`.

---

## 2. Stáhni web z GitHubu

```bash
# potřebuješ git (pokud chybí: sudo apt install -y git)
git clone https://github.com/Mpoked/pokornymarek-cz.git web
cd web
git checkout master
```

Když už složku `web` máš z dřívějška, jen ji aktualizuj:

```bash
cd web
git fetch origin
git reset --hard origin/master
```

> `git reset --hard` zahodí případné lokální změny na serveru a nastaví
> přesně to, co je na GitHubu. To je tady žádoucí — chceme čistý stav.

---

## 3. Vytvoř soubor s hesly (`.env.local`)

Tenhle soubor **není na GitHubu** (obsahuje hesla), musíš ho na serveru
vytvořit ručně:

```bash
nano .env.local
```

Vlož tohle a uprav hodnoty:

```env
# Heslo do administrace na /admin
ADMIN_PASSWORD=zvol-si-silne-heslo

# Gmail SMTP pro upozornění na nové poptávky
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=pokornymarek007@gmail.com
SMTP_PASS=heslo-aplikace-z-gmailu
CONTACT_TO=pokornymarek007@gmail.com
```

Ulož: `Ctrl+O`, `Enter`, pak `Ctrl+X`.

> **Heslo aplikace pro Gmail** (ne tvoje běžné heslo!):
> 1. zapni dvoufázové ověření: https://myaccount.google.com/security
> 2. vygeneruj heslo aplikace: https://myaccount.google.com/apppasswords
> 3. vlož těch 16 znaků (bez mezer) do `SMTP_PASS`
>
> Bez SMTP se poptávky pořád **ukládají do databáze** (uvidíš je v adminu),
> jen nechodí e-mailem.

---

## 4. Sestav a spusť

```bash
docker compose up -d --build
```

První build trvá pár minut (stahuje Node, balíčky, kompiluje).
Až doběhne, web běží na portu **3000**.

Ověř, že běží:

```bash
docker compose ps
curl -I http://localhost:3000
```

`curl` má vrátit `HTTP/1.1 200 OK`.

---

## 5. Otevři si web

Z jiného počítače na stejné síti:

```
http://192.168.0.254:3000
```

- Hlavní stránka → pozadí, footer, sekce, formulář
- Admin → `http://192.168.0.254:3000/admin` (heslo z kroku 3)

**Vyzkoušej formulář** — vyplň, zaškrtni souhlas, odešli. Poptávka se
objeví v adminu a (pokud máš SMTP) přijde e-mail.

---

## 6. Cloudflare Tunnel (veřejná doména)

Až to funguje lokálně, napoj Cloudflare Tunnel na `http://localhost:3000`.
Tunnel běží vedle (mimo tento návod) — v Cloudflare dashboardu nastavíš
Public hostname `pokornymarek.cz` → Service `http://localhost:3000`.

---

## Časté problémy

| Problém | Řešení |
|---|---|
| `docker: command not found` | Krok 1 — nainstaluj Docker, odhlas/přihlas se |
| `permission denied … docker.sock` | Zapomněls `usermod -aG docker` + relogin |
| `.env.local: no such file` | Krok 3 — soubor musí existovat vedle `docker-compose.yml` |
| Pozadí/footer pořád nefunguje | Máš starý build → `git reset --hard origin/master` a `docker compose up -d --build` |
| Formulář/admin nefunguje | Chybí `.env.local` nebo se build nedokončil — koukni `docker compose logs` |
| Nevidím web z jiného PC | Firewall serveru blokuje port 3000, nebo špatná IP |

Log běžícího webu:

```bash
docker compose logs -f
```

---

## Aktualizace webu (když něco změním v kódu)

```bash
cd web
git pull
docker compose up -d --build
```

Databáze poptávek (`./data/studio.db`) zůstává — rebuild ji nesmaže.

**Záloha = zkopírovat soubor `data/studio.db`.**
