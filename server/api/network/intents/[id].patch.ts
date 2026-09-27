import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody<{ text?: string, paused?: boolean, active?: boolean, remove?: boolean }>(event)
  const db = networkDb(event)
  const { data: intent } = await db.from('intents').select('id').eq('id', id).eq('account_id', account.id).maybeSingle()
  if (!intent) throw createError({ statusCode: 404, statusMessage: 'Intent not found.' })
  if (body.remove) {
    await db.from('intents').delete().eq('id', id)
    return { ok: true }
  }
  if (body.active) {
    const { error } = await db.rpc('set_active_intent', { p_account: account.id, p_intent: id })
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  }
  const patch: Record<string, unknown> = {}
  if (typeof body.text === 'string' && body.text.trim()) patch.text = body.text.trim()
  if (typeof body.paused === 'boolean') patch.paused = body.paused
  if (Object.keys(patch).length) {
    await db.from('intents').update(patch).eq('id', id)
  }
  return { ok: true }
})
