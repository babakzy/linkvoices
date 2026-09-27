export default defineNuxtRouteMiddleware(async (to) => {
  const next = `/start?next=${encodeURIComponent(to.fullPath)}`
  if (import.meta.server) {
    const session = useCookie('lv_network')
    if (!session.value) return navigateTo(next)
    return
  }
  const account = useNetworkAccount()
  if (!account.value) await refreshNetworkSession()
  if (!account.value) return navigateTo(next)
})
