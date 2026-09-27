import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ id?: string, accept?: boolean }>(event)
  if (!body.id) throw createError({ statusCode: 400, statusMessage: 'Missing connection.' })
  const db = networkDb(event)
  const { data: row } = await db.from('connection_types').select('id, from_account, to_pubkey, status').eq('id', body.id).maybeSingle()
  if (!row || row.to_pubkey !== account.pubkey) {
    throw createError({ statusCode: 404, statusMessage: 'Connection request not found.' })
  }
  const status = body.accept ? 'active' : 'rejected'
  await db.from('connection_types').update({
    status,
    responded_at: new Date().toISOString(),
  }).eq('id', row.id)
  const { data: pref } = await db.from('notification_prefs').select('in_app').eq('account_id', row.from_account).eq('type', 'connection_response').maybeSingle()
  if (pref?.in_app !== false) {
    await db.from('notifications').insert({
      account_id: row.from_account,
      type: 'connection_response',
      payload: { status, connectionId: row.id },
    })
  }
  return { status }
})
