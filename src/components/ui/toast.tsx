"use client"

import { useEffect, useState } from "react"

type ToastType = "success" | "error"

interface ToastProps {
  message: string
  type: ToastType
  /** Titulek nad hláškou. Bez něj se doplní ten pro odeslání formuláře. */
  title?: string
  onClose: () => void
}

export function Toast({ message, type, title, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // mount → animate in
    const t1 = setTimeout(() => setVisible(true), 10)
    // after 4s → animate out → remove
    const t2 = setTimeout(() => setVisible(false), 4000)
    const t3 = setTimeout(() => onClose(), 4400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onClose])

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[200] w-max max-w-[calc(100vw-32px)] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex items-center gap-4 rounded-2xl border px-6 py-4 shadow-2xl backdrop-blur-xl ${
          type === "success"
            ? "border-white/15 bg-black/80 text-white"
            : "border-red-500/20 bg-black/80 text-white"
        }`}
        style={{ minWidth: "min(320px, calc(100vw - 32px))" }}
      >
        {/* Icon */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            type === "success" ? "bg-white/10" : "bg-red-500/15"
          }`}
        >
          {type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 5L11 11M11 5L5 11" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {title ?? (type === "success" ? "Zpráva odeslána!" : "Nepodařilo se odeslat")}
          </span>
          <span className="text-xs text-white/50 mt-0.5">{message}</span>
        </div>

        {/* Close */}
        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 400) }}
          className="ml-auto text-white/30 hover:text-white/70 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-px w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-none ${type === "success" ? "bg-white/40" : "bg-red-400/60"}`}
          style={{
            width: visible ? "0%" : "100%",
            transition: visible ? "width 4000ms linear" : "none",
          }}
        />
      </div>
    </div>
  )
}

/* ── Hook pro snadné použití ── */
export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType; title?: string } | null>(null)

  const show = (message: string, type: ToastType, title?: string) =>
    setToast({ message, type, title })
  const hide = () => setToast(null)

  const ToastPortal = toast ? (
    <Toast message={toast.message} type={toast.type} title={toast.title} onClose={hide} />
  ) : null

  return { show, ToastPortal }
}
