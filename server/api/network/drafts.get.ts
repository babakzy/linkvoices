import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  const { data, error } = await db
    .from('article_drafts')
    .select('id, title, summary, content, image, topics, updated_at')
    .eq('account_id', account.id)
    .order('updated_at', { ascending: false })
    .limit(20)
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { drafts: data || [] }
})
