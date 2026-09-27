import type { SupabaseClient } from '@supabase/supabase-js'
import { verifyEvent, type Event } from 'nostr-tools/pure'
import { ensurePerson } from './networkAuth'

function tagValue(tags: string[][], name: string): string | null {
  const tag = tags.find(item => item[0] === name && item[1])
  return tag?.[1] ?? null
}

function unixToIso(seconds: number): string {
  return new Date(seconds * 1000).toISOString()
}

export async function ingestNostrEvent(db: SupabaseClient, raw: Event, relays: string[] = []) {
  if (!verifyEvent(raw)) return { stored: false, reason: 'invalid signature' }
  if (!/^[0-9a-f]{64}$/.test(raw.pubkey) || !/^[0-9a-f]{128}$/.test(raw.sig)) {
    return { stored: false, reason: 'malformed' }
  }

  await ensurePerson(db, raw.pubkey)
  const dTag = tagValue(raw.tags, 'd')
  const { error } = await db.from('nostr_events').upsert({
    id: raw.id,
    pubkey: raw.pubkey,
    created_at: unixToIso(raw.created_at),
    kind: raw.kind,
    tags: raw.tags,
    content: raw.content,
    sig: raw.sig,
    d_tag: dTag,
  }, { onConflict: 'id' })
  if (error) return { stored: false, reason: error.message }

  if (relays.length) {
    await db.from('nostr_event_relays').upsert(
      relays.map(relayUrl => ({ event_id: raw.id, relay_url: relayUrl })),
      { onConflict: 'event_id,relay_url' },
    )
  }

  await db.from('people').update({ last_event_at: unixToIso(raw.created_at) }).eq('pubkey', raw.pubkey)

  if (raw.kind === 0) await ingestProfile(db, raw)
  if (raw.kind === 3) await ingestFollows(db, raw)
  if (raw.kind === 5) await ingestDeletion(db, raw)
  if (raw.kind === 30023) await ingestArticle(db, raw, dTag)
  if (raw.kind === 10002) await ingestRelays(db, raw)

  return { stored: true }
}

async function ingestProfile(db: SupabaseClient, raw: Event) {
  let meta: Record<string, string> = {}
  try {
    const parsed = JSON.parse(raw.content) as Record<string, unknown>
    for (const key of ['name', 'display_name', 'about', 'picture', 'banner', 'website', 'nip05']) {
      const value = parsed[key]
      if (typeof value === 'string') meta[key] = value
    }
  } catch {
    meta = {}
  }
  const { data: existing } = await db.from('nostr_profiles').select('updated_at').eq('pubkey', raw.pubkey).maybeSingle()
  if (existing && new Date(existing.updated_at).getTime() > raw.created_at * 1000) return
  await db.from('nostr_profiles').upsert({
    pubkey: raw.pubkey,
    event_id: raw.id,
    name: meta.name ?? null,
    display_name: meta.display_name ?? null,
    about: meta.about ?? null,
    picture: meta.picture ?? null,
    banner: meta.banner ?? null,
    website: meta.website ?? null,
    nip05: meta.nip05 ?? null,
    updated_at: unixToIso(raw.created_at),
  })
}

async function ingestFollows(db: SupabaseClient, raw: Event) {
  const { data: existing } = await db
    .from('nostr_follows')
    .select('created_at')
    .eq('follower', raw.pubkey)
    .limit(1)
    .maybeSingle()
  if (existing && new Date(existing.created_at).getTime() > raw.created_at * 1000) return
  await db.from('nostr_follows').delete().eq('follower', raw.pubkey)
  const followees = [...new Set(raw.tags.filter(tag => tag[0] === 'p' && /^[0-9a-f]{64}$/.test(tag[1] || '')).map(tag => tag[1] as string))]
  for (const followee of followees) {
    await ensurePerson(db, followee)
  }
  if (followees.length) {
    await db.from('nostr_follows').insert(followees.map(followee => ({
      follower: raw.pubkey,
      followee,
      event_id: raw.id,
      created_at: unixToIso(raw.created_at),
    })))
  }
}

async function ingestDeletion(db: SupabaseClient, raw: Event) {
  const ids = raw.tags.filter(tag => tag[0] === 'e' && tag[1]).map(tag => tag[1] as string)
  if (!ids.length) return
  await db.from('nostr_events')
    .update({ deleted_at: new Date().toISOString() })
    .eq('pubkey', raw.pubkey)
    .in('id', ids)
}

async function ingestArticle(db: SupabaseClient, raw: Event, dTag: string | null) {
  if (!dTag) return
  const title = tagValue(raw.tags, 'title')
  const summary = tagValue(raw.tags, 'summary')
  const image = tagValue(raw.tags, 'image')
  const published = tagValue(raw.tags, 'published_at')
  const topics = raw.tags.filter(tag => tag[0] === 't' && tag[1]).map(tag => tag[1] as string)
  const words = raw.content.trim().split(/\s+/).filter(Boolean).length
  await db.from('nostr_articles').upsert({
    pubkey: raw.pubkey,
    d_tag: dTag,
    event_id: raw.id,
    title,
    summary,
    image,
    published_at: published ? new Date(Number(published) * 1000).toISOString() : unixToIso(raw.created_at),
    updated_at: unixToIso(raw.created_at),
    topics,
    reading_minutes: Math.max(1, Math.round(words / 220)),
  })
}

async function ingestRelays(db: SupabaseClient, raw: Event) {
  const rows = raw.tags
    .filter(tag => tag[0] === 'r' && tag[1])
    .map(tag => {
      const marker = tag[2]
      return {
        pubkey: raw.pubkey,
        relay_url: tag[1] as string,
        can_read: marker !== 'write',
        can_write: marker !== 'read',
        updated_at: unixToIso(raw.created_at),
      }
    })
  if (!rows.length) return
  await db.from('nostr_relay_prefs').delete().eq('pubkey', raw.pubkey)
  await db.from('nostr_relay_prefs').insert(rows)
}
