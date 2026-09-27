import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ targetPubkey?: string, targetEventId?: string, reason?: string }>(event)
  if (!body.targetPubkey || !body.reason?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'A person and a reason are required.' })
  }
  const db = networkDb(event)
  const { error } = await db.from('reports').insert({
    reporter_account: account.id,
    target_pubkey: body.targetPubkey.toLowerCase(),
    target_event_id: body.targetEventId || null,
    reason: body.reason.trim(),
  })
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { ok: true }
})
