import { readBody } from 'h3'
import { createSession, networkDb, safeEqual } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, verifier?: string }>(event)
  const email = body.email?.trim().toLowerCase()
  if (!email || !body.verifier) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required.' })
  }
  const db = networkDb(event)
  const { data: credential } = await db
    .from('credentials')
    .select('account_id, password_verifier')
    .eq('email', email)
    .eq('type', 'password')
    .maybeSingle()
  if (!credential?.password_verifier || !safeEqual(credential.password_verifier, body.verifier)) {
    throw createError({ statusCode: 401, statusMessage: 'Email or password is wrong.' })
  }

  const { data: account } = await db
    .from('accounts')
    .select('id, pubkey, custody_mode, status, display_name')
    .eq('id', credential.account_id)
    .single()
  if (!account || account.status !== 'active') {
    throw createError({ statusCode: 403, statusMessage: 'This account is not active.' })
  }

  const { data: encryptedKey } = await db
    .from('encrypted_keys')
    .select('ciphertext, nonce')
    .eq('account_id', account.id)
    .maybeSingle()
  const { data: wraps } = await db
    .from('key_wraps')
    .select('method, wrapped_dek, nonce, kdf_params, label')
    .eq('account_id', account.id)

  await db.from('key_wraps').update({ last_used_at: new Date().toISOString() }).eq('account_id', account.id).eq('method', 'password')
  await createSession(event, account.id)

  return {
    account: {
      id: account.id,
      pubkey: account.pubkey,
      custodyMode: account.custody_mode,
      displayName: account.display_name,
    },
    encryptedKey,
    wraps: wraps || [],
  }
})
