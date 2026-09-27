import { readBody } from 'h3'
import { networkDb } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event)
  const email = body.email?.trim().toLowerCase()
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Email is required.' })
  const db = networkDb(event)
  const { data: credential } = await db
    .from('credentials')
    .select('account_id')
    .eq('email', email)
    .eq('type', 'password')
    .maybeSingle()
  if (!credential) {
    throw createError({ statusCode: 404, statusMessage: 'No account uses that email.' })
  }
  const { data: wrap } = await db
    .from('key_wraps')
    .select('kdf_params')
    .eq('account_id', credential.account_id)
    .eq('method', 'password')
    .maybeSingle()
  const salt = wrap?.kdf_params && typeof wrap.kdf_params === 'object'
    ? (wrap.kdf_params as { salt?: string }).salt
    : null
  if (!salt) throw createError({ statusCode: 409, statusMessage: 'This account has no password unlock.' })
  return { salt }
})
