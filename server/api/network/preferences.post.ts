import { readBody } from 'h3'
import { networkDb, requireAccount } from '../../utils/networkAuth'
import { FEED_MODES, DISCOVERY_PRESETS } from '../../../utils/network/constants'

export default defineEventHandler(async (event) => {
  const account = await requireAccount(event)
  const db = networkDb(event)
  if (event.method === 'GET') {
    const { data } = await db.from('feed_preferences').select('feed_mode, discovery_preset').eq('account_id', account.id).maybeSingle()
    const { data: mutes } = await db.from('mutes').select('target_pubkey').eq('account_id', account.id)
    return { preferences: data, mutes: (mutes || []).map(row => row.target_pubkey) }
  }
  const body = await readBody<{ feedMode?: string, discoveryPreset?: string }>(event)
  const patch: { account_id: string, updated_at: string, feed_mode?: string, discovery_preset?: string } = {
    account_id: account.id,
    updated_at: new Date().toISOString(),
  }
  if (FEED_MODES.some(mode => mode.id === body.feedMode)) patch.feed_mode = body.feedMode
  if (DISCOVERY_PRESETS.some(preset => preset.id === body.discoveryPreset)) patch.discovery_preset = body.discoveryPreset
  await db.from('feed_preferences').upsert(patch, { onConflict: 'account_id' })
  return { ok: true }
})
