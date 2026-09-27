import { DEFAULT_RELAYS } from '~/utils/network/constants'
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
const profileCache = new Map<string, NostrEvent | null>()

async function getPool(): Promise<SimplePool> {
  if (!pool) {
    const { SimplePool } = await import('nostr-tools/pool')
    pool = new SimplePool()
  }
  return pool
}

export function useNostr() {
  const relays = useState<string[]>('network-relays', () => [...DEFAULT_RELAYS])

  async function query(filter: NostrFilter, maxWait = 3500) {
    const client = await getPool()
    return client.querySync(relays.value, filter, { maxWait })
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
    const missing = [...new Set(pubkeys)].filter(pubkey => !profileCache.has(pubkey))
    if (missing.length) {
      const events = await query({ kinds: [0], authors: missing.slice(0, 80) })
      const newest = new Map<string, NostrEvent>()
      for (const event of events) {
        const current = newest.get(event.pubkey)
        if (!current || event.created_at > current.created_at) newest.set(event.pubkey, event)
      }
      for (const pubkey of missing) profileCache.set(pubkey, newest.get(pubkey) || null)
      const found = [...newest.values()]
      if (found.length) {
        $fetch('/api/network/events', { method: 'POST', body: { events: found, relays: relays.value } }).catch(() => undefined)
      }
    }
    return profileCache
  }

  return { relays, query, publish, sign, signAndPublish, profiles }
}

export type { NostrEvent }
