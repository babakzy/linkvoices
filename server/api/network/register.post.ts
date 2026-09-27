import { readBody } from 'h3'
import { createSession, ensurePerson, networkDb, seedAccountDefaults } from '../../utils/networkAuth'
import { isHex64 } from '../../../utils/network/format'

interface WrapInput {
  method: 'passkey' | 'password' | 'recovery_phrase'
  wrappedDek: string
  nonce: string
  kdfParams: Record<string, unknown>
  label?: string
}

interface RegisterBody {
  pubkey?: string
  displayName?: string
  email?: string
  passwordVerifier?: string
  encryptedKey?: { ciphertext: string, nonce: string }
  wraps?: WrapInput[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event)
  const pubkey = (body.pubkey || '').toLowerCase()
  const email = body.email?.trim().toLowerCase() || null
  if (!isHex64(pubkey)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid public identity is required.' })
  }
  if (!body.encryptedKey?.ciphertext || !body.encryptedKey.nonce) {
    throw createError({ statusCode: 400, statusMessage: 'Encrypted account material is required.' })
  }
  const wraps = body.wraps || []
  if (!wraps.length) {
    throw createError({ statusCode: 400, statusMessage: 'Add a password or a recovery phrase before creating the account.' })
  }
  if (email && !body.passwordVerifier) {
    throw createError({ statusCode: 400, statusMessage: 'Password verification is required.' })
  }

  const db = networkDb(event)
  await ensurePerson(db, pubkey, true)

  const { data: existingAccount } = await db.from('accounts').select('id').eq('pubkey', pubkey).maybeSingle()
  if (existingAccount) {
    throw createError({ statusCode: 409, statusMessage: 'This identity is already on Linkvoices. Sign in instead.' })
  }
  if (email) {
    const { data: existingEmail } = await db.from('credentials').select('id').eq('email', email).maybeSingle()
    if (existingEmail) {
      throw createError({ statusCode: 409, statusMessage: 'That email already has an account. Sign in instead.' })
    }
  }

  const { data: account, error } = await db.from('accounts').insert({
    pubkey,
    custody_mode: 'managed_encrypted',
    display_name: body.displayName?.trim() || null,
  }).select('id, pubkey, custody_mode, display_name').single()
  if (error || !account) {
    throw createError({ statusCode: 500, statusMessage: error?.message || 'Could not create the account.' })
  }

  const { error: keyError } = await db.from('encrypted_keys').insert({
    account_id: account.id,
    ciphertext: body.encryptedKey.ciphertext,
    nonce: body.encryptedKey.nonce,
  })
  if (keyError) throw createError({ statusCode: 500, statusMessage: keyError.message })

  const { error: wrapError } = await db.from('key_wraps').insert(wraps.map(wrap => ({
    account_id: account.id,
    method: wrap.method,
    wrapped_dek: wrap.wrappedDek,
    nonce: wrap.nonce,
    kdf_params: wrap.kdfParams,
    label: wrap.label || null,
  })))
  if (wrapError) throw createError({ statusCode: 500, statusMessage: wrapError.message })

  if (email && body.passwordVerifier) {
    const { error: credError } = await db.from('credentials').insert({
      account_id: account.id,
      type: 'password',
      email,
      password_verifier: body.passwordVerifier,
    })
    if (credError) throw createError({ statusCode: 500, statusMessage: credError.message })
  }

  await seedAccountDefaults(db, account.id)
  await createSession(event, account.id)

  return {
    account: {
      id: account.id,
      pubkey: account.pubkey,
      custodyMode: account.custody_mode,
      displayName: account.display_name,
    },
  }
})
