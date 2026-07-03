import { isAuthenticated } from "@/lib/admin-auth"
import { deleteSubmission, setSubmissionRead } from "@/lib/db"

async function requireAuth(): Promise<Response | null> {
  if (await isAuthenticated()) return null
  return Response.json({ ok: false, error: "Nepřihlášeno." }, { status: 401 })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAuth()
  if (denied) return denied

  const { id } = await params
  let read = true
  try {
    const body = await request.json()
    read = Boolean(body?.read)
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  const changed = setSubmissionRead(Number(id), read)
  if (!changed) return Response.json({ ok: false }, { status: 404 })
  return Response.json({ ok: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAuth()
  if (denied) return denied

  const { id } = await params
  const changed = deleteSubmission(Number(id))
  if (!changed) return Response.json({ ok: false }, { status: 404 })
  return Response.json({ ok: true })
}
