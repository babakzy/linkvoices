const IDLE_MS = 30 * 60 * 1000

let secretKey: Uint8Array | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null

function armIdleTimer() {
  if (!import.meta.client) return
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    clearSecretKey()
  }, IDLE_MS)
}

export function setSecretKey(key: Uint8Array | null) {
  secretKey = key ? new Uint8Array(key) : null
  if (secretKey) armIdleTimer()
  else if (idleTimer) clearTimeout(idleTimer)
}

export function getSecretKey(): Uint8Array | null {
  if (secretKey) armIdleTimer()
  return secretKey
}

export function clearSecretKey() {
  if (secretKey) secretKey.fill(0)
  secretKey = null
  if (idleTimer) clearTimeout(idleTimer)
}

export function hasSecretKey(): boolean {
  return secretKey !== null
}
