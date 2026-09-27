export interface NetworkAccount {
  id: string
  pubkey: string
  custodyMode: 'managed_encrypted' | 'nip07' | 'nip46'
  displayName: string | null
}

export function useNetworkAccount() {
  return useState<NetworkAccount | null>('network-account', () => null)
}

export async function refreshNetworkSession() {
  const account = useNetworkAccount()
  try {
    const response = await $fetch<{ account: NetworkAccount | null }>('/api/network/session')
    account.value = response.account
  } catch {
    account.value = null
  }
  return account.value
}

export async function networkLogout() {
  const { clearSecretKey } = await import('~/utils/network/keyStore')
  clearSecretKey()
  await $fetch('/api/network/logout', { method: 'POST' })
  useNetworkAccount().value = null
  await navigateTo('/')
}
