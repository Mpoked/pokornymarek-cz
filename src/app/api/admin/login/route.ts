import { cookies } from "next/headers"
import { ADMIN_COOKIE, sessionToken, verifyPassword } from "@/lib/admin-auth"
import { clientIp, isBlocked, registerFailure, resetAttempts } from "@/lib/rate-limit"

// Brute-force ochrana: max 5 NEÚSPĚŠNÝCH pokusů / 10 min / IP.
// Správné přihlášení se do limitu nepočítá a počítadlo vynuluje, takže
// běžné používání (i občasný překlep) tě nezamkne — brzdí jen hádání hesla.
const LOGIN_LIMIT = 5
const LOGIN_WINDOW_MS = 10 * 60 * 1000

export async function POST(request: Request) {
  const key = `login:${clientIp(request)}`

  const blocked = isBlocked(key, LOGIN_LIMIT)
  if (!blocked.ok) {
    return Response.json(
      { ok: false, error: "Příliš mnoho pokusů. Zkuste to za chvíli." },
      { status: 429, headers: { "Retry-After": String(blocked.retryAfter) } }
    )
  }

  let password = ""
  try {
    const body = await request.json()
    password = String(body?.password ?? "")
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  if (!verifyPassword(password)) {
    registerFailure(key, LOGIN_WINDOW_MS)
    return Response.json(
      { ok: false, error: "Nesprávné heslo." },
      { status: 401 }
    )
  }

  // Úspěch → smazat počítadlo neúspěchů.
  resetAttempts(key)

  const store = await cookies()
  store.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dní
  })

  return Response.json({ ok: true })
}

/** Odhlášení — smaže session cookie. */
export async function DELETE() {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
  return Response.json({ ok: true })
}
