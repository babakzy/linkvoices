import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createError, deleteCookie, getCookie, setCookie, type H3Event } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export const SESSION_COOKIE = 'lv_network'
const SESSION_DAYS = 30

export interface NetworkAccount {
  id: string
  pubkey: string
  custodyMode: 'managed_encrypted' | 'nip07' | 'nip46'
  status: string
  displayName: string | null
}

export function networkDb(event: H3Event): SupabaseClient {
  try {
    return serverSupabaseServiceRole(event)
  } catch {
    throw createError({
      statusCode: 503,
      statusMessage: 'Add SUPABASE_SERVICE_KEY and run supabase/migrations/20260927120000_human_network.sql.',
    })
  }
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function createSession(event: H3Event, accountId: string) {
  const token = randomBytes(32).toString('base64url')
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  const db = networkDb(event)
  const { error } = await db.from('sessions').insert({
    account_id: accountId,
    token_hash: hashToken(token),
    expires_at: expires.toISOString(),
  })
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function readAccount(event: H3Event): Promise<NetworkAccount | null> {
  const token = getCookie(event, SESSION_COOKIE)
  if (!token) return null
  const db = networkDb(event)
  const { data: session, error } = await db
    .from('sessions')
    .select('account_id, expires_at')
    .eq('token_hash', hashToken(token))
    .maybeSingle()
  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  if (!session || new Date(session.expires_at).getTime() < Date.now()) return null
  const { data: account, error: accountError } = await db
    .from('accounts')
    .select('id, pubkey, custody_mode, status, display_name')
    .eq('id', session.account_id)
    .maybeSingle()
  if (accountError) {
    throw createError({ statusCode: 500, statusMessage: accountError.message })
  }
  if (!account || account.status !== 'active') return null
  return {
    id: account.id,
    pubkey: account.pubkey,
    custodyMode: account.custody_mode,
    status: account.status,
    displayName: account.display_name,
  }
}

export async function requireAccount(event: H3Event): Promise<NetworkAccount> {
  const account = await readAccount(event)
  if (!account) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in required' })
  }
  return account
}

export async function endNetworkSession(event: H3Event) {
  const token = getCookie(event, SESSION_COOKIE)
  if (token) {
    const db = networkDb(event)
    await db.from('sessions').delete().eq('token_hash', hashToken(token))
  }
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
}

export const NOTIFICATION_TYPES = [
  'reply',
  'mention',
  'message',
  'connection_request',
  'connection_response',
  'new_follower',
  'intent_match',
  'security',
] as const

export async function seedAccountDefaults(db: SupabaseClient, accountId: string) {
  await db.from('notification_prefs').insert(
    NOTIFICATION_TYPES.map(type => ({ account_id: accountId, type })),
  )
  await db.from('feed_preferences').insert({ account_id: accountId })
  await db.from('onboarding_state').insert({ account_id: accountId, step: 'interests' })
}

export async function ensurePerson(db: SupabaseClient, pubkey: string, isMember = false) {
  const { error } = await db.from('people').insert({ pubkey, is_member: isMember })
  if (error && !error.message.toLowerCase().includes('duplicate') && error.code !== '23505') {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  if (isMember) {
    await db.from('people').update({ is_member: true }).eq('pubkey', pubkey)
  }
}
