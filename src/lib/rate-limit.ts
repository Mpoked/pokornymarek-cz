/**
 * Jednoduchý in-memory rate limiter (fixed window).
 *
 * Stačí pro jeden kontejner (self-host). Data drží v paměti procesu —
 * po restartu se počítadla vynulují, což je pro ochranu proti brute-force
 * a spamu naprosto v pořádku.
 *
 * Klíč je reálná IP klienta. Za Cloudflare (Tunnel) je skutečná IP
 * v hlavičce `CF-Connecting-IP` — socketová adresa by byla jen cloudflared,
 * takže by všichni sdíleli jeden limit. Viz clientIp().
 */

type Bucket = { count: number; resetAt: number };

// Globální cache přežije HMR přebalení modulů v dev režimu (viz db.ts).
declare global {
  // eslint-disable-next-line no-var
  var __rateLimitStore: Map<string, Bucket> | undefined;
}

const store: Map<string, Bucket> =
  globalThis.__rateLimitStore ?? (globalThis.__rateLimitStore = new Map());

export interface RateLimitResult {
  /** true = v pořádku (pod limitem); false = zablokováno. */
  ok: boolean;
  /** Sekundy do resetu okna — pro hlavičku Retry-After. */
  retryAfter: number;
}

/**
 * Zaznamená pokus pro daný klíč a řekne, zda je pod limitem.
 * Počítá KAŽDÉ zavolání — vhodné tam, kde chceme limitovat všechny
 * požadavky (např. odeslání kontaktního formuláře).
 *
 * @param key    typicky `${IP}:${akce}`
 * @param limit  max. počet pokusů v okně
 * @param windowMs délka okna v ms
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now >= bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    // Občas prořezat prošlé záznamy, ať paměť neroste donekonečna.
    if (store.size > 5000) pruneExpired(now);
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Peek — je klíč právě nad limitem? NEPOČÍTÁ pokus, jen se podívá.
 * Pro login, kde chceme trestat jen neúspěšné pokusy (viz registerFailure).
 */
export function isBlocked(key: string, limit: number): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);
  if (!bucket || now >= bucket.resetAt) return { ok: true, retryAfter: 0 };
  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/** Zaznamená JEDEN neúspěšný pokus (např. špatné heslo). */
export function registerFailure(key: string, windowMs: number): void {
  const now = Date.now();
  const bucket = store.get(key);
  if (!bucket || now >= bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    if (store.size > 5000) pruneExpired(now);
    return;
  }
  bucket.count += 1;
}

/** Vynuluje počítadlo pro klíč (např. po úspěšném přihlášení). */
export function resetAttempts(key: string): void {
  store.delete(key);
}

function pruneExpired(now: number): void {
  for (const [key, bucket] of store) {
    if (now >= bucket.resetAt) store.delete(key);
  }
}

/**
 * Reálná IP klienta. Za Cloudflare čteme CF-Connecting-IP, jinak první
 * adresu z X-Forwarded-For; fallback na neutrální klíč (limit tak platí
 * globálně, což je bezpečná strana).
 */
export function clientIp(request: Request): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();

  return "unknown";
}
