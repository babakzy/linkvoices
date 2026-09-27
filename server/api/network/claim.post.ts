import { readBody } from 'h3'
import { verifyEvent, type Event } from 'nostr-tools/pure'
import { createSession, ensurePerson, networkDb, seedAccountDefaults } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ challengeId?: string, event?: Event }>(event)
  if (!body.challengeId || !body.event) {
    throw createError({ statusCode: 400, statusMessage: 'A signed challenge is required.' })
  }
  if (!verifyEvent(body.event)) {
    throw createError({ statusCode: 401, statusMessage: 'The signature was not valid.' })
  }
  const db = networkDb(event)
  const { data: challenge } = await db.from('auth_challenges').select('id, challenge, expires_at, used_at').eq('id', body.challengeId).maybeSingle()
  if (!challenge || challenge.used_at || new Date(challenge.expires_at).getTime() < Date.now()) {
    throw createError({ statusCode: 401, statusMessage: 'That sign-in challenge expired. Try again.' })
  }
  if (body.event.content !== challenge.challenge) {
    throw createError({ statusCode: 401, statusMessage: 'The signed message does not match the challenge.' })
  }
  await db.from('auth_challenges').update({ used_at: new Date().toISOString() }).eq('id', challenge.id)

  const pubkey = body.event.pubkey
  await ensurePerson(db, pubkey, true)
  let accountId: string
  const { data: existing } = await db.from('accounts').select('id, status').eq('pubkey', pubkey).maybeSingle()
  if (existing) {
    if (existing.status !== 'active') throw createError({ statusCode: 403, statusMessage: 'This account is not active.' })
    accountId = existing.id
  } else {
    const { data: created, error } = await db.from('accounts').insert({
      pubkey,
      custody_mode: 'nip07',
    }).select('id').single()
    if (error || !created) throw createError({ statusCode: 500, statusMessage: error?.message || 'Could not connect the identity.' })
    accountId = created.id
    await seedAccountDefaults(db, accountId)
  }
  await createSession(event, accountId)
  const { data: account } = await db.from('accounts').select('id, pubkey, custody_mode, display_name').eq('id', accountId).single()
  return {
    account: {
      id: account?.id,
      pubkey: account?.pubkey,
      custodyMode: account?.custody_mode,
      displayName: account?.display_name,
    },
  }
})
