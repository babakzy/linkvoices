export default defineNuxtPlugin(async () => {
  await refreshNetworkSession()
})
