import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ text?: string, makeActive?: boolean }>(event)
  const text = body.text?.trim()
  if (!text) throw createError({ statusCode: 400, statusMessage: 'Write what you want right now.' })
  const db = networkDb(event)
  if (body.makeActive) {
    await db.from('intents').update({ is_active: false }).eq('account_id', account.id).eq('is_active', true)
  }
  const { data, error } = await db.from('intents').insert({
    account_id: account.id,
    text,
    is_active: Boolean(body.makeActive),
    visibility: 'discovery',
  }).select('id, text, is_active, paused, created_at').single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { intent: data }
})
