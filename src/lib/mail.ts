import nodemailer from "nodemailer"

/**
 * E-mailové upozornění na novou poptávku přes SMTP (výchozí: Gmail).
 * Konfigurace v .env.local — viz .env.example. Když SMTP není
 * nakonfigurováno, funkce jen zaloguje a nic neposílá (poptávka
 * je i tak uložená v databázi).
 */

const BALICKY_LABELS: Record<string, string> = {
  jednoduchy: "Jednoduchý web (od 9 900 Kč)",
  standard: "Standard (od 19 900 Kč)",
  premium: "Prémiový (od 34 900 Kč)",
  nevim: "Ještě neví — chce poradit",
}

/**
 * Odstraní řídicí znaky (vč. CR/LF) — levná pojistka proti header
 * injection v hodnotách, které jdou do e-mailových hlaviček
 * (subject, replyTo). Nodemailer hlavičky enkóduje, tohle je druhá vrstva.
 */
function sanitizeHeader(value: string): string {
  return value.replace(/[\x00-\x1F\x7F]/g, " ").trim()
}

export async function sendSubmissionNotification(submission: {
  jmeno: string
  email: string
  balicek: string
  zprava: string
}): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env

  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.warn("[mail] SMTP není nakonfigurováno (SMTP_USER/SMTP_PASS/CONTACT_TO) — upozornění se neposílá.")
    return
  }

  const port = Number(SMTP_PORT ?? 465)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const balicek = BALICKY_LABELS[submission.balicek] ?? "Nevybráno"
  const jmeno = sanitizeHeader(submission.jmeno)
  const email = sanitizeHeader(submission.email)

  await transporter.sendMail({
    from: `"Marek Pokorný — web" <${SMTP_USER}>`,
    to: CONTACT_TO,
    replyTo: email,
    subject: `Nová poptávka z webu — ${jmeno}`,
    text: [
      `Jméno: ${submission.jmeno}`,
      `E-mail: ${submission.email}`,
      `Balíček: ${balicek}`,
      ``,
      `Zpráva:`,
      submission.zprava,
      ``,
      `—`,
      `Odpovědět můžeš přímo na tento e-mail (reply-to je nastavený na odesílatele).`,
      `Všechny poptávky: /admin na webu.`,
    ].join("\n"),
  })
}
