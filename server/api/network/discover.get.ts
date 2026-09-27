import { getQuery } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'

interface FieldRow {
  account_id: string
  field_key: string
  value: unknown
  visibility: 'public' | 'discovery' | 'private'
  confirmed_by_user: boolean
  source: string
}

function textOf(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.filter(item => typeof item === 'string').join(' ')
  return ''
}

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const preset = String(getQuery(event).preset || 'similar_interests')
  const db = networkDb(event)

  const [{ data: myTags }, { data: intent }, { data: members }] = await Promise.all([
    db.from('account_tags').select('kind, tags(label, slug)').eq('account_id', account.id),
    db.from('intents').select('id, text').eq('account_id', account.id).eq('is_active', true).eq('paused', false).maybeSingle(),
    db.from('accounts').select('id, pubkey, display_name').eq('status', 'active').neq('id', account.id).limit(60),
  ])

  const memberIds = (members || []).map(member => member.id)
  const pubkeys = (members || []).map(member => member.pubkey)
  const [{ data: fields }, { data: tags }, { data: profiles }] = await Promise.all([
    memberIds.length
      ? db.from('profile_fields').select('account_id, field_key, value, visibility, confirmed_by_user, source').in('account_id', memberIds)
      : Promise.resolve({ data: [] as FieldRow[] }),
    memberIds.length
      ? db.from('account_tags').select('account_id, kind, visibility, tags(label, slug)').in('account_id', memberIds)
      : Promise.resolve({ data: [] as Array<Record<string, unknown>> }),
    pubkeys.length
      ? db.from('nostr_profiles').select('pubkey, name, display_name, about, picture').in('pubkey', pubkeys)
      : Promise.resolve({ data: [] as Array<Record<string, unknown>> }),
  ])

  const myLabels = new Set((myTags || []).map(row => ((row.tags as { label?: string } | null)?.label || '').toLowerCase()).filter(Boolean))
  const intentText = (intent?.text || '').toLowerCase()

  const results = (members || []).map((member) => {
    const memberFields = ((fields || []) as FieldRow[]).filter(field => field.account_id === member.id)
    const publicFields = memberFields.filter(field => field.visibility === 'public' && field.confirmed_by_user !== false)
    const memberTagRows = (tags || []).filter(row => row.account_id === member.id)
    const publicLabels = memberTagRows
      .filter(row => row.visibility === 'public')
      .map(row => ((row.tags as { label?: string } | null)?.label || ''))
      .filter(Boolean)
    const shared = publicLabels.filter(label => myLabels.has(label.toLowerCase()))
    const publicBlob = [
      ...publicLabels,
      ...publicFields.map(field => textOf(field.value)),
    ].join(' ').toLowerCase()

    let score = shared.length * 3
    if (preset === 'people_i_can_help' && /help|mentor|advice|collaborat/.test(publicBlob)) score += 2
    if (preset === 'collaborator' && /project|build|co-founder|collaborat|hiring/.test(publicBlob)) score += 3
    if (preset === 'professional' && /engineer|founder|design|research/.test(publicBlob)) score += 2
    if (preset === 'local' && intentText && publicBlob.includes(intentText.split(' ')[0] || '---')) score += 1
    if (preset === 'serendipity') score = 1 + (member.pubkey.charCodeAt(0) % 5)
    if (preset === 'outside_network') score += 1
    if (intentText && publicBlob.includes(intentText.slice(0, 24))) score += 2

    const reasons: string[] = []
    if (shared.length) reasons.push(`You both list ${shared.slice(0, 3).join(', ')}.`)
    if (intent?.text) reasons.push('This lines up with the intent you have active.')
    const looking = publicFields.find(field => field.field_key === 'looking_for')
    if (looking) reasons.push(`They say they are looking for ${textOf(looking.value)}.`)
    const offer = publicFields.find(field => field.field_key === 'can_offer')
    if (offer && preset === 'people_i_can_help') reasons.push(`They can offer ${textOf(offer.value)}.`)
    if (!reasons.length) reasons.push('They have a public profile on Linkvoices.')

    const nostr = (profiles || []).find(profile => profile.pubkey === member.pubkey)
    return {
      pubkey: member.pubkey,
      name: member.display_name || nostr?.display_name || nostr?.name || 'Member',
      about: nostr?.about || '',
      picture: nostr?.picture || '',
      isMember: true,
      score,
      reasons,
    }
  })

  results.sort((a, b) => b.score - a.score)
  return {
    preset,
    intent: intent?.text || null,
    people: results.slice(0, 12),
  }
})
