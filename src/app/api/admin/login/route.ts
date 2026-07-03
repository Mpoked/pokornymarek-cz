import { cookies } from "next/headers"
import { ADMIN_COOKIE, sessionToken, verifyPassword } from "@/lib/admin-auth"

export async function POST(request: Request) {
  let password = ""
  try {
    const body = await request.json()
    password = String(body?.password ?? "")
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  if (!verifyPassword(password)) {
    return Response.json(
      { ok: false, error: "Nesprávné heslo." },
      { status: 401 }
    )
  }

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
