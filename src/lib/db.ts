import Database from "better-sqlite3"
import path from "path"
import fs from "fs"

/**
 * SQLite databáze pro poptávky z kontaktního formuláře.
 * Soubor leží v ./data/studio.db (v Dockeru přemapováno přes DB_PATH
 * na volume /app/data), takže data přežijí restart kontejneru.
 */

export interface Submission {
  id: number
  jmeno: string
  email: string
  balicek: string
  zprava: string
  consent_text: string
  created_at: string
  read: 0 | 1
}

const dbPath = process.env.DB_PATH ?? path.join(process.cwd(), "data", "studio.db")

// V dev režimu Next.js přebaluje moduly při každé změně (HMR) — globální
// cache brání otevírání dalších a dalších spojení na tentýž soubor.
declare global {
  // eslint-disable-next-line no-var
  var __studioDb: Database.Database | undefined
}

function createDb(): Database.Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jmeno TEXT NOT NULL,
      email TEXT NOT NULL,
      balicek TEXT NOT NULL DEFAULT '',
      zprava TEXT NOT NULL,
      consent_text TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      read INTEGER NOT NULL DEFAULT 0
    )
  `)
  return db
}

const db = globalThis.__studioDb ?? (globalThis.__studioDb = createDb())

export function insertSubmission(input: {
  jmeno: string
  email: string
  balicek: string
  zprava: string
  consentText: string
}): Submission {
  const createdAt = new Date().toISOString()
  const result = db
    .prepare(
      `INSERT INTO submissions (jmeno, email, balicek, zprava, consent_text, created_at)
       VALUES (@jmeno, @email, @balicek, @zprava, @consentText, @createdAt)`
    )
    .run({ ...input, createdAt })
  return db
    .prepare(`SELECT * FROM submissions WHERE id = ?`)
    .get(result.lastInsertRowid) as Submission
}

export function listSubmissions(): Submission[] {
  return db
    .prepare(`SELECT * FROM submissions ORDER BY created_at DESC`)
    .all() as Submission[]
}

export function setSubmissionRead(id: number, read: boolean): boolean {
  const result = db
    .prepare(`UPDATE submissions SET read = ? WHERE id = ?`)
    .run(read ? 1 : 0, id)
  return result.changes > 0
}

/** Trvalé smazání — slouží i pro GDPR právo na výmaz. */
export function deleteSubmission(id: number): boolean {
  const result = db.prepare(`DELETE FROM submissions WHERE id = ?`).run(id)
  return result.changes > 0
}
