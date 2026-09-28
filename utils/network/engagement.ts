import type { NostrEvent } from '~/composables/useNostr'

export type NoteEngagement = {
  replies: number
  reposts: number
  likes: number
}

type QueryFn = (filter: { kinds: number[], '#e': string[], limit: number }, maxWait?: number) => Promise<NostrEvent[]>

export function emptyEngagement(): NoteEngagement {
  return { replies: 0, reposts: 0, likes: 0 }
}

function bucketFor(
  store: Map<string, { replies: Set<string>, reposts: Set<string>, likes: Set<string> }>,
  noteId: string,
) {
  let row = store.get(noteId)
  if (!row) {
    row = { replies: new Set(), reposts: new Set(), likes: new Set() }
    store.set(noteId, row)
  }
  return row
}

function absorb(store: Map<string, { replies: Set<string>, reposts: Set<string>, likes: Set<string> }>, noteIds: Set<string>, events: NostrEvent[]) {
  for (const event of events) {
    for (const tag of event.tags) {
      if (tag[0] !== 'e' || !tag[1] || !noteIds.has(tag[1])) continue
      const noteId = tag[1]
      const row = bucketFor(store, noteId)
      if (event.kind === 7) row.likes.add(event.pubkey)
      else if (event.kind === 6) row.reposts.add(event.pubkey)
      else if (event.kind === 1 && event.id !== noteId) row.replies.add(event.id)
    }
  }
}

export async function loadEngagementForNotes(query: QueryFn, noteIds: string[], maxWait = 3200): Promise<Record<string, NoteEngagement>> {
  const ids = [...new Set(noteIds)].filter(Boolean).slice(0, 40)
  if (!ids.length) return {}

  const noteIdSet = new Set(ids)
  const store = new Map<string, { replies: Set<string>, reposts: Set<string>, likes: Set<string> }>()
  for (const id of ids) bucketFor(store, id)

  const chunks: string[][] = []
  for (let index = 0; index < ids.length; index += 8) chunks.push(ids.slice(index, index + 8))

  await Promise.all(chunks.map(async (chunk) => {
    const [likes, reposts, replies] = await Promise.all([
      query({ kinds: [7], '#e': chunk, limit: 400 }, maxWait).catch(() => []),
      query({ kinds: [6], '#e': chunk, limit: 400 }, maxWait).catch(() => []),
      query({ kinds: [1], '#e': chunk, limit: 400 }, maxWait).catch(() => []),
    ])
    absorb(store, noteIdSet, [...likes, ...reposts, ...replies])
  }))

  const out: Record<string, NoteEngagement> = {}
  for (const id of ids) {
    const row = store.get(id)!
    out[id] = {
      replies: row.replies.size,
      reposts: row.reposts.size,
      likes: row.likes.size,
    }
  }
  return out
}
