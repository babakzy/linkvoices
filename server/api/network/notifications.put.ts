import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ id?: string, prefs?: Array<{ type: string, inApp: boolean }> }>(event)
  const db = networkDb(event)
  if (body.id) {
    await db.from('notifications').update({ read_at: new Date().toISOString() }).eq('id', body.id).eq('account_id', account.id)
  }
  for (const pref of body.prefs || []) {
    await db.from('notification_prefs').upsert({
      account_id: account.id,
      type: pref.type,
      in_app: pref.inApp,
    }, { onConflict: 'account_id,type' })
  }
  return { ok: true }
})
