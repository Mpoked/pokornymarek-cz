"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!password) { setError("Zadejte heslo."); return }
    setError("")
    setSending(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError("Nesprávné heslo.")
      }
    } catch {
      setError("Něco se pokazilo, zkuste to znovu.")
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <p className="mb-2 text-xs font-mono uppercase tracking-[0.25em] text-white/30">
          Studio Dva
        </p>
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Administrace</h1>

        <label className="mb-1.5 block text-xs font-mono uppercase tracking-widest text-white/40">
          Heslo
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError("") }}
          autoFocus
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-white/30"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="mt-6 w-full rounded-lg border border-white/20 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50"
        >
          {sending ? "Přihlašuji…" : "Přihlásit se"}
        </button>
      </form>
    </main>
  )
}
