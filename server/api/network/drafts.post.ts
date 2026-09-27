import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  if (event.method === 'GET') {
    const { data } = await db.from('article_drafts').select('id, title, summary, content, image, topics, updated_at').eq('account_id', account.id).order('updated_at', { ascending: false }).limit(20)
    return { drafts: data || [] }
  }
  const body = await readBody<{ id?: string, title?: string, summary?: string, content?: string, image?: string, topics?: string[] }>(event)
  const row = {
    account_id: account.id,
    title: body.title || '',
    summary: body.summary || '',
    content: body.content || '',
    image: body.image || null,
    topics: body.topics || [],
    updated_at: new Date().toISOString(),
  }
  if (body.id) {
    const { data, error } = await db.from('article_drafts').update(row).eq('id', body.id).eq('account_id', account.id).select('id').single()
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return { draft: data }
  }
  const { data, error } = await db.from('article_drafts').insert(row).select('id').single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  return { draft: data }
})
