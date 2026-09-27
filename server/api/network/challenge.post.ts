import { randomBytes } from 'node:crypto'
import { networkDb } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const db = networkDb(event)
  const challenge = randomBytes(32).toString('base64url')
  const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  const { data, error } = await db.from('auth_challenges').insert({
    challenge,
    expires_at: expires,
  }).select('id, challenge').single()
  if (error || !data) throw createError({ statusCode: 500, statusMessage: error?.message || 'Could not start sign-in.' })
  return data
})
