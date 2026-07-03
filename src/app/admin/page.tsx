import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { listSubmissions } from "@/lib/db"
import { SubmissionList } from "@/components/admin/submission-list"

// Data se čtou z databáze při každém requestu — žádná statická cache.
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  const submissions = listSubmissions()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <SubmissionList submissions={submissions} />
      </div>
    </main>
  )
}
