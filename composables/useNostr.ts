import { DEFAULT_RELAYS, PROFILE_RELAYS } from '~/utils/network/constants'
import { getSecretKey } from '~/utils/network/keyStore'

type NostrEvent = {
  id: string
  pubkey: string
  created_at: number
  kind: number
  tags: string[][]
  content: string
  sig: string
}

type SimplePool = import('nostr-tools/pool').SimplePool
type NostrFilter = import('nostr-tools/filter').Filter

let pool: SimplePool | null = null
const profileCache = new Map<string, { event: NostrEvent | null, at: number }>()
const PROFILE_MISS_MS = 60_000

async function getPool(): Promise<SimplePool> {
  if (!pool) {
    const { SimplePool } = await import('nostr-tools/pool')
    pool = new SimplePool()
  }
  return pool
}

export function useNostr() {
  const relays = useState<string[]>('network-relays', () => [...DEFAULT_RELAYS])

  async function query(filter: NostrFilter, maxWait = 3500, relayList?: string[]) {
    const client = await getPool()
    return client.querySync(relayList?.length ? relayList : relays.value, filter, { maxWait })
  }

  async function publish(event: NostrEvent) {
    const client = await getPool()
    const settled = await Promise.allSettled(client.publish(relays.value, event))
    if (settled.every(item => item.status === 'rejected')) {
      throw new Error('No relay accepted that.')
    }
    $fetch('/api/network/events', {
      method: 'POST',
      body: { events: [event], relays: relays.value },
    }).catch(() => undefined)
    return event
  }

  async function sign(template: { kind: number, content: string, tags: string[][], created_at?: number }) {
    const draft = {
      kind: template.kind,
      content: template.content,
      tags: template.tags,
      created_at: template.created_at ?? Math.floor(Date.now() / 1000),
    }
    const secret = getSecretKey()
    if (secret) {
      const { finalizeEvent } = await import('nostr-tools/pure')
      return finalizeEvent(draft, secret) as NostrEvent
    }
    const nostr = (window as Window & { nostr?: { signEvent: (event: typeof draft) => Promise<NostrEvent> } }).nostr
    if (nostr) return nostr.signEvent(draft)
    throw new Error('Sign in again to publish. Your key stays in memory for this visit only.')
  }

  async function signAndPublish(template: { kind: number, content: string, tags: string[][], created_at?: number }) {
    const event = await sign(template)
    await publish(event)
    return event
  }

  async function profiles(pubkeys: string[]) {
    const now = Date.now()
    const missing = [...new Set(pubkeys)].filter((pubkey) => {
      if (!pubkey) return false
      const row = profileCache.get(pubkey)
      if (!row) return true
      if (row.event) return false
      return now - row.at > PROFILE_MISS_MS
    })
    const chunks: string[][] = []
    for (let index = 0; index < missing.length; index += 16) chunks.push(missing.slice(index, index + 16))
    const found: NostrEvent[] = []
    await Promise.all(chunks.map(async (slice) => {
      try {
        const events = await query({ kinds: [0], authors: slice }, 7000, PROFILE_RELAYS)
        const newest = new Map<string, NostrEvent>()
        for (const event of events) {
          const current = newest.get(event.pubkey)
          if (!current || event.created_at > current.created_at) newest.set(event.pubkey, event)
        }
        for (const pubkey of slice) {
          const event = newest.get(pubkey) || null
          profileCache.set(pubkey, { event, at: Date.now() })
          if (event) found.push(event)
        }
      } catch {
        /* leave the name unresolved so the next load can try again */
      }
    }))
    if (found.length) {
      $fetch('/api/network/events', { method: 'POST', body: { events: found, relays: PROFILE_RELAYS } }).catch(() => undefined)
    }
    const view = new Map<string, NostrEvent | null>()
    for (const pubkey of pubkeys) view.set(pubkey, profileCache.get(pubkey)?.event || null)
    return view
  }

  return { relays, query, publish, sign, signAndPublish, profiles }
}

export type { NostrEvent }
