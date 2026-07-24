"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Submission } from "@/lib/db"

const BALICKY_LABELS: Record<string, string> = {
  jednoduchy: "Jednoduchý web",
  standard: "Standard",
  premium: "Prémiový",
  nevim: "Chce poradit",
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString("cs-CZ", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function SubmissionList({ submissions }: { submissions: Submission[] }) {
  const router = useRouter()
  const [busy, setBusy] = useState<number | null>(null)

  const unread = submissions.filter((s) => !s.read).length

  async function toggleRead(s: Submission) {
    setBusy(s.id)
    try {
      await fetch(`/api/admin/submissions/${s.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !s.read }),
      })
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  async function remove(s: Submission) {
    if (!window.confirm(`Opravdu smazat poptávku od „${s.jmeno}"? Toto nejde vrátit.`)) return
    setBusy(s.id)
    try {
      await fetch(`/api/admin/submissions/${s.id}`, { method: "DELETE" })
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <>
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.25em] text-white/30">
            Marek Pokorný · Administrace
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Poptávky</h1>
          <p className="mt-2 text-sm text-white/40">
            Celkem {submissions.length} · nepřečtené {unread}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-white/15 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/50 transition-all hover:bg-white/10 hover:text-white"
        >
          Odhlásit
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/40">
          Zatím žádné poptávky. Až někdo odešle formulář, objeví se tady.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {submissions.map((s) => (
            <li
              key={s.id}
              className={`rounded-2xl border p-6 transition-colors ${
                s.read
                  ? "border-white/8 bg-white/[0.03]"
                  : "border-white/25 bg-white/[0.07]"
              }`}
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  {!s.read && (
                    <span className="inline-block h-2 w-2 shrink-0 translate-y-[-1px] rounded-full bg-white" title="Nepřečtené" />
                  )}
                  <span className="font-semibold text-white">{s.jmeno}</span>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-sm text-white/50 underline underline-offset-2 hover:text-white"
                  >
                    {s.email}
                  </a>
                </div>
                <span className="text-xs font-mono text-white/30">{formatDate(s.created_at)}</span>
              </div>

              {s.balicek && (
                <p className="mb-2 text-xs font-mono uppercase tracking-widest text-white/40">
                  Balíček: {BALICKY_LABELS[s.balicek] ?? s.balicek}
                </p>
              )}

              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {s.zprava}
              </p>

              <div className="mt-4 flex gap-3 border-t border-white/8 pt-4">
                <button
                  onClick={() => toggleRead(s)}
                  disabled={busy === s.id}
                  className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/60 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  {s.read ? "Označit jako nepřečtené" : "Označit jako přečtené"}
                </button>
                <button
                  onClick={() => remove(s)}
                  disabled={busy === s.id}
                  className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400/80 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                >
                  Smazat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
