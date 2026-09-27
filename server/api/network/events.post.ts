import { readBody } from 'h3'
import type { Event } from 'nostr-tools/pure'
import { networkDb } from '../../utils/networkAuth'
import { ingestNostrEvent } from '../../utils/networkIngest'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ events?: Event[], relays?: string[] }>(event)
  const events = (body.events || []).slice(0, 40)
  if (!events.length) return { stored: 0 }
  const db = networkDb(event)
  let stored = 0
  for (const raw of events) {
    const result = await ingestNostrEvent(db, raw, body.relays || [])
    if (result.stored) stored += 1
  }
  return { stored }
})
