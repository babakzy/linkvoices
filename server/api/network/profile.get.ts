import { getQuery } from 'h3'
import { networkDb, readAccount } from '../../utils/networkAuth'
import { isHex64 } from '../../../utils/network/format'

export default defineEventHandler(async (event) => {
  const pubkey = String(getQuery(event).pubkey || '')
  if (!isHex64(pubkey)) throw createError({ statusCode: 400, statusMessage: 'A public identity is required.' })
  const viewer = await readAccount(event)
  const db = networkDb(event)
  const { data: person } = await db.from('people').select('pubkey, is_member').eq('pubkey', pubkey).maybeSingle()
  const { data: profile } = await db.from('nostr_profiles').select('name, display_name, about, picture, website, nip05, nip05_verified').eq('pubkey', pubkey).maybeSingle()
  const { data: member } = await db.from('accounts').select('id, display_name').eq('pubkey', pubkey).eq('status', 'active').maybeSingle()

  let fields: Array<Record<string, unknown>> = []
  let tags: Array<{ kind: string, label: string, visibility: string }> = []
  if (member) {
    const tier = viewer?.id === member.id ? 'private' : viewer ? 'public' : 'public'
    const { data: allFields } = await db.from('profile_fields').select('field_group, field_key, value, visibility, source, confirmed_by_user, published_to_nostr').eq('account_id', member.id)
    fields = (allFields || []).filter((field) => {
      if (field.visibility === 'public') return true
      if (field.visibility === 'discovery') return tier === 'private'
      return tier === 'private'
    })
    const { data: accountTags } = await db.from('account_tags').select('kind, visibility, tags(label)').eq('account_id', member.id)
    tags = (accountTags || [])
      .filter(row => row.visibility === 'public' || tier === 'private')
      .map(row => ({
        kind: row.kind,
        label: (row.tags as { label?: string } | null)?.label || '',
        visibility: row.visibility,
      }))
      .filter(row => row.label)
  }

  return {
    pubkey,
    isMember: Boolean(person?.is_member && member),
    displayName: member?.display_name || profile?.display_name || profile?.name || null,
    nostr: profile,
    fields,
    tags,
  }
})
