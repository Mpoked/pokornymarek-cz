import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

/**
 * Jednoduchá ochrana administrace jedním heslem (ADMIN_PASSWORD v env).
 * Po přihlášení se nastaví httpOnly cookie s HMAC tokenem odvozeným
 * z hesla — bez uložených sessions, bezstavové.
 */

export const ADMIN_COOKIE = "admin_session"

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? ""
}

export function sessionToken(): string {
  return createHmac("sha256", adminPassword())
    .update("studio-dva-admin-v1")
    .digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

export function verifyPassword(password: string): boolean {
  const expected = adminPassword()
  if (!expected) return false
  return safeEqual(password, expected)
}

export async function isAuthenticated(): Promise<boolean> {
  if (!adminPassword()) return false
  const store = await cookies()
  const value = store.get(ADMIN_COOKIE)?.value
  if (!value) return false
  return safeEqual(value, sessionToken())
}
