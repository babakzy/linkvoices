import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'
import { isHex64 } from '../../../utils/network/format'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const body = await readBody<{ targetPubkey?: string, remove?: boolean }>(event)
  const target = (body.targetPubkey || '').toLowerCase()
  if (!isHex64(target)) throw createError({ statusCode: 400, statusMessage: 'Choose who to mute.' })
  const db = networkDb(event)
  if (body.remove) {
    await db.from('mutes').delete().eq('account_id', account.id).eq('target_pubkey', target)
    return { ok: true }
  }
  await db.from('mutes').upsert({ account_id: account.id, target_pubkey: target }, { onConflict: 'account_id,target_pubkey' })
  return { ok: true }
})
