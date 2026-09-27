const HEX = /^[0-9a-f]{64}$/

export function isHex64(value: string): boolean {
  return HEX.test(value)
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export function shortNpub(value: string): string {
  if (value.length < 16) return value
  return `${value.slice(0, 8)}…${value.slice(-4)}`
}

export function formatTime(seconds: number): string {
  const delta = Date.now() / 1000 - seconds
  if (delta < 60) return 'now'
  if (delta < 3600) return `${Math.floor(delta / 60)}m`
  if (delta < 86400) return `${Math.floor(delta / 3600)}h`
  return `${Math.floor(delta / 86400)}d`
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function linkifyNote(content: string): string {
  const escaped = escapeHtml(content)
  return escaped
    .replace(
      /https?:\/\/[^\s<]+/g,
      url => `<a href="${url}" class="text-brand-blue hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`,
    )
    .replace(/\n/g, '<br>')
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function parseProfileJson(raw: string): Record<string, unknown> | null {
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null
    return parsed as Record<string, unknown>
  } catch {
    return null
  }
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).map(item => item.trim())
}
