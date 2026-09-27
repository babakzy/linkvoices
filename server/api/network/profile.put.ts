import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'
import { slugify } from '../../../utils/network/format'

interface FieldInput {
  fieldGroup: 'identity' | 'knowledge' | 'direction' | 'topics'
  fieldKey: string
  value: unknown
  visibility?: 'public' | 'discovery' | 'private'
  source?: 'user' | 'ai_interview' | 'ai_import' | 'nostr_import'
  confirmed?: boolean
  publishedToNostr?: boolean
}

interface TagInput {
  kind: 'skill' | 'interest' | 'role' | 'language'
  label: string
  visibility?: 'public' | 'discovery' | 'private'
}

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ displayName?: string, fields?: FieldInput[], tags?: TagInput[] }>(event)
  const db = networkDb(event)

  if (typeof body.displayName === 'string') {
    await db.from('accounts').update({ display_name: body.displayName.trim() || null }).eq('id', account.id)
  }

  for (const field of body.fields || []) {
    if (!field.fieldKey || !field.fieldGroup) continue
    await db.from('profile_fields').upsert({
      account_id: account.id,
      field_group: field.fieldGroup,
      field_key: field.fieldKey,
      value: field.value ?? null,
      visibility: field.visibility || 'discovery',
      source: field.source || 'user',
      confirmed_by_user: Boolean(field.confirmed),
      published_to_nostr: Boolean(field.publishedToNostr),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'account_id,field_key' })
  }

  if (body.tags) {
    await db.from('account_tags').delete().eq('account_id', account.id)
    for (const tag of body.tags) {
      const slug = slugify(tag.label)
      if (!slug) continue
      const { data: existing } = await db.from('tags').select('id').eq('kind', tag.kind).eq('slug', slug).maybeSingle()
      let tagId = existing?.id as string | undefined
      if (!tagId) {
        const { data: created } = await db.from('tags').insert({
          kind: tag.kind,
          slug,
          label: tag.label.trim(),
        }).select('id').single()
        tagId = created?.id
      }
      if (!tagId) continue
      await db.from('account_tags').insert({
        account_id: account.id,
        tag_id: tagId,
        kind: tag.kind,
        visibility: tag.visibility || 'public',
      })
    }
  }

  return { ok: true }
})
