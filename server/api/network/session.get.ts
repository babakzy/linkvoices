import { readAccount } from '../../utils/networkAuth'

export default defineEventHandler(async (event) => {
  const account = await readAccount(event)
  return { account }
})
