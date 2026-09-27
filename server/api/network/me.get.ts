import { networkDb, requireAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  const { data } = await db.from('feed_preferences').select('feed_mode, discovery_preset').eq('account_id', account.id).maybeSingle()
  const { data: mutes } = await db.from('mutes').select('target_pubkey').eq('account_id', account.id)
  const { data: fields } = await db.from('profile_fields').select('field_group, field_key, value, visibility, source, confirmed_by_user').eq('account_id', account.id)
  const { data: tags } = await db.from('account_tags').select('kind, visibility, tags(label)').eq('account_id', account.id)
  return {
    preferences: data,
    mutes: (mutes || []).map(row => row.target_pubkey),
    fields: fields || [],
    tags: (tags || []).map(row => ({
      kind: row.kind,
      visibility: row.visibility,
      label: (row.tags as { label?: string } | null)?.label || '',
    })).filter(row => row.label),
  }
})
