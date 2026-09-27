import { readBody } from 'h3'
import { ensurePerson, networkDb, requireAccount } from '../../utils/networkAuth'
import { isHex64 } from '../../../utils/network/format'

const OUTCOMES = new Set(['conversation', 'met', 'collaborating', 'friends', 'not_relevant', 'no_response'])

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ aboutPubkey?: string, outcome?: string, sourceContext?: Record<string, unknown> }>(event)
  const about = (body.aboutPubkey || '').toLowerCase()
  if (!isHex64(about) || !body.outcome || !OUTCOMES.has(body.outcome)) {
    throw createError({ statusCode: 400, statusMessage: 'Choose what happened with this connection.' })
  }
  const db = networkDb(event)
  await ensurePerson(db, about)
  const { error } = await db.from('connection_feedback').insert({
    account_id: account.id,
    about_pubkey: about,
    outcome: body.outcome,
    source_context: body.sourceContext || null,
  })
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { ok: true }
})
