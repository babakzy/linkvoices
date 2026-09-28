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

export function isGenericName(value: string | null | undefined): boolean {
  const text = value?.trim().toLowerCase() || ''
  return !text || text === 'nostr profile' || text === 'member' || text === 'someone'
}

export type ProfileMeta = {
  name: string
  picture: string
  about: string
  website: string
  nip05: string
}

export function readProfileContent(content: string | undefined | null): ProfileMeta {
  const empty: ProfileMeta = { name: '', picture: '', about: '', website: '', nip05: '' }
  if (!content) return empty
  let meta: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(content)
    if (!parsed || typeof parsed !== 'object') return empty
    meta = parsed as Record<string, unknown>
  } catch {
    return empty
  }
  const text = (...keys: string[]) => {
    for (const key of keys) {
      const value = meta[key]
      if (typeof value === 'string' && value.trim()) return value.trim()
    }
    return ''
  }
  const nip05 = text('nip05')
  const nipName = nip05.includes('@') ? nip05.split('@')[0] || '' : ''
  return {
    name: text('display_name', 'displayName', 'name', 'username') || nipName,
    picture: text('picture', 'avatar', 'image'),
    about: text('about', 'bio'),
    website: text('website', 'url'),
    nip05,
  }
}

export function personLabel(content: string | undefined | null, fallback: string): string {
  const name = readProfileContent(content).name
  return isGenericName(name) ? fallback : name
}

export function formatCount(value: number): string {
  if (value < 1) return '0'
  if (value < 10_000) return String(value)
  if (value < 1_000_000) {
    const compact = value / 1000
    return compact >= 10 ? `${Math.round(compact)}K` : `${compact.toFixed(1).replace(/\.0$/, '')}K`
  }
  const compact = value / 1_000_000
  return compact >= 10 ? `${Math.round(compact)}M` : `${compact.toFixed(1).replace(/\.0$/, '')}M`
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

const ENGLISH_WORDS = new Set([
  'the', 'and', 'to', 'of', 'is', 'for', 'you', 'this', 'that', 'with', 'it', 'are', 'was', 'have',
  'from', 'we', 'they', 'my', 'your', 'not', 'but', 'just', 'what', 'when', 'who', 'how', 'about',
  'can', 'will', 'would', 'should', 'could', 'their', 'there', 'been', 'were', 'has', 'had', 'do',
  'did', 'does', 'if', 'so', 'or', 'at', 'be', 'on', 'in', 'an', 'as', 'by', 'our', 'me', 'its',
  'im', 'dont', 'youre', 'thats', 'cant', 'wont', 'isnt', 'ive', 'into', 'over', 'after', 'before',
  'because', 'than', 'then', 'them', 'these', 'those', 'here', 'now', 'out', 'up', 'all', 'some',
  'any', 'like', 'get', 'got', 'make', 'know', 'think', 'want', 'need', 'people', 'time', 'day',
])

const OTHER_LANGUAGE_WORDS = new Set([
  'que', 'los', 'las', 'una', 'por', 'para', 'con', 'del', 'como', 'pero', 'este', 'esta', 'eso',
  'muy', 'porque', 'nao', 'voce', 'você', 'não', 'também', 'tambem', 'dos', 'das', 'ele', 'seu',
  'sua', 'und', 'nicht', 'ein', 'eine', 'ich', 'für', 'fur', 'auch', 'auf', 'mit', 'von', 'den',
  'dem', 'sich', 'les', 'des', 'une', 'dans', 'qui', 'avec', 'cette', 'nous', 'vous', 'aux',
  'chez', 'ist', 'och', 'att', 'det', 'som', 'inte', 'een', 'niet', 'che', 'non', 'sono',
  'questo', 'della', 'anche', 'gli', 'nel', 'nella', 'esto', 'hola', 'bonjour', 'gracias',
])

/** Public browse should stay in readable English, not every language a relay happens to return. */
export function isEnglishBrowsePost(content: string, tags: string[][] = []): boolean {
  const lang = tags.find(tag => tag[0] === 'l' && tag[1])?.[1]?.toLowerCase() || ''
  if (lang && !/^en(?:-|$)/.test(lang)) return false

  const urlCount = (content.match(/https?:\/\/\S+/g) || []).length
  const hashCount = (content.match(/#[\p{L}\p{N}_]+/gu) || []).length
  const stripped = content
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/nostr:\S+/g, ' ')
    .replace(/#[\p{L}\p{N}_]+/gu, ' ')
    .trim()
  if (stripped.length < 24) return false

  const letters = stripped.match(/\p{L}/gu) || []
  if (letters.length < 16) return false
  const latin = letters.filter(letter => /\p{Script=Latin}/u.test(letter)).length
  if (latin / letters.length < 0.92) return false

  const words = stripped.toLowerCase().match(/[a-z']+/g) || []
  if (words.length < 6) return false
  if (urlCount >= 3 && words.length < 18) return false
  if (hashCount >= 5 && hashCount > words.length) return false
  if (urlCount + hashCount >= 8) return false

  const turkish = (content.match(/[ğüşöçıİĞÜŞÖÇ]/g) || []).length
  if (turkish >= 2) return false

  let english = 0
  let other = 0
  for (const raw of words) {
    const word = raw.replace(/'/g, '')
    if (ENGLISH_WORDS.has(word)) english += 1
    if (OTHER_LANGUAGE_WORDS.has(word)) other += 1
  }
  if (other >= 2 && other >= english) return false
  if (words.length <= 12) return english >= 1 && english / words.length >= 0.15
  if (english < 2 || english / words.length < 0.12) return false
  return english >= other
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
