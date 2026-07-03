import { insertSubmission } from "@/lib/db"
import { sendSubmissionNotification } from "@/lib/mail"

const VALID_BALICKY = new Set(["", "jednoduchy", "standard", "premium", "nevim"])
const CONSENT_TEXT =
  "Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky."

export async function POST(request: Request) {
  let data: FormData
  try {
    data = await request.formData()
  } catch {
    return Response.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 })
  }

  // Honeypot — skryté pole, které vyplní jen spam boti. Tváříme se,
  // že vše prošlo, ale nic neukládáme.
  if (String(data.get("web") ?? "").trim() !== "") {
    return Response.json({ ok: true })
  }

  const jmeno = String(data.get("jmeno") ?? "").trim().slice(0, 200)
  const email = String(data.get("email") ?? "").trim().slice(0, 320)
  const zprava = String(data.get("zprava") ?? "").trim().slice(0, 5000)
  const balicekRaw = String(data.get("balicek") ?? "").trim()
  const balicek = VALID_BALICKY.has(balicekRaw) ? balicekRaw : ""
  const souhlas = String(data.get("souhlas") ?? "")

  const errors: Record<string, string> = {}
  if (!jmeno) errors.jmeno = "Vyplňte prosím jméno."
  if (!email) errors.email = "Vyplňte prosím e-mail."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Zadejte platný e-mail."
  if (!zprava) errors.zprava = "Napište prosím krátkou zprávu."
  if (souhlas !== "ano")
    errors.souhlas = "Pro odeslání je potřeba souhlas se zpracováním osobních údajů."

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 })
  }

  const submission = insertSubmission({
    jmeno,
    email,
    balicek,
    zprava,
    consentText: CONSENT_TEXT,
  })

  // Selhání e-mailu nesmí shodit odpověď — poptávka už je v databázi.
  try {
    await sendSubmissionNotification(submission)
  } catch (err) {
    console.error("[mail] Nepodařilo se odeslat upozornění:", err)
  }

  return Response.json({ ok: true })
}
