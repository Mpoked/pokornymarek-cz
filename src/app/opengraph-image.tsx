import { ImageResponse } from "next/og"
import { BALICKY, FIRMA, PRVNI_KLIENTI } from "@/lib/firma"

/**
 * Náhledový obrázek pro sdílení odkazu (Facebook, Messenger, WhatsApp) —
 * u lokální firmy na Slovácku je to hlavní distribuční kanál a bez něj
 * se odkaz sdílí jako holá URL.
 *
 * Generuje se při buildu. Bez vlastního fontu schválně: v public/fonts
 * jsou jen woff2, které satori neumí. Výchozí font diakritiku zvládá.
 */

export const alt = `${FIRMA.jmeno}, tvorba webů ${FIRMA.mesto}, od ${BALICKY[0].cenaText}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Tvorba webů · {FIRMA.mesto}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Web pro vaši firmu od {BALICKY[0].cenaText}.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {PRVNI_KLIENTI.aktivni
              ? `Hledám první ${PRVNI_KLIENTI.pocet} klienty.`
              : "Bez agentury, bez obchodníka mezi námi."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex", color: "#ffffff" }}>{FIRMA.jmeno}</div>
          <div style={{ display: "flex" }}>pokornymarek.cz</div>
        </div>
      </div>
    ),
    size
  )
}
