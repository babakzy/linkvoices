import { requireAccount, networkDb } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  const { data, error } = await db
    .from('intents')
    .select('id, text, is_active, paused, created_at, visibility')
    .eq('account_id', account.id)
    .order('created_at', { ascending: false })
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { intents: data || [] }
})
