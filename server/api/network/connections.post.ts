import { readBody } from 'h3'
import { ensurePerson, networkDb, requireAccount } from '../../utils/networkAuth'
import { isHex64 } from '../../../utils/network/format'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ toPubkey?: string, kindSlug?: string, customLabel?: string }>(event)
  const toPubkey = (body.toPubkey || '').toLowerCase()
  if (!isHex64(toPubkey) || !body.kindSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a person and a connection type.' })
  }
  const db = networkDb(event)
  const { data: kind } = await db.from('connection_type_kinds').select('slug, requires_approval').eq('slug', body.kindSlug).maybeSingle()
  if (!kind) throw createError({ statusCode: 400, statusMessage: 'Unknown connection type.' })
  await ensurePerson(db, toPubkey)
  const status = kind.requires_approval ? 'pending' : 'active'
  const { data, error } = await db.from('connection_types').insert({
    from_account: account.id,
    to_pubkey: toPubkey,
    kind_slug: kind.slug,
    custom_label: body.customLabel?.trim() || null,
    status,
    responded_at: status === 'active' ? new Date().toISOString() : null,
  }).select('id, status, kind_slug').single()
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })

  const { data: target } = await db.from('accounts').select('id').eq('pubkey', toPubkey).eq('status', 'active').maybeSingle()
  if (target && status === 'pending') {
    const { data: pref } = await db.from('notification_prefs').select('in_app').eq('account_id', target.id).eq('type', 'connection_request').maybeSingle()
    if (pref?.in_app !== false) {
      await db.from('notifications').insert({
        account_id: target.id,
        type: 'connection_request',
        payload: { fromPubkey: account.pubkey, kindSlug: kind.slug, connectionId: data.id },
      })
    }
  }
  return { connection: data }
})
