import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  const { data, error } = await db
    .from('notifications')
    .select('id, type, payload, read_at, created_at')
    .eq('account_id', account.id)
    .order('created_at', { ascending: false })
    .limit(40)
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  const { data: prefs } = await db.from('notification_prefs').select('type, in_app, email').eq('account_id', account.id)
  return { notifications: data || [], prefs: prefs || [] }
})
