import { endNetworkSession } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  await endNetworkSession(event)
  return { ok: true }
})
