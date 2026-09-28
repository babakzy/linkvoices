export const DEFAULT_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.nostr.band',
  'wss://relay.primal.net',
]

/** Relays that index kind 0 profiles, plus the default read relays. */
export const PROFILE_RELAYS = [
  'wss://purplepag.es',
  'wss://relay.nostr.band',
  ...DEFAULT_RELAYS,
]

export const FEED_MODES = [
  { id: 'following', label: 'Following' },
  { id: 'for_you', label: 'For you' },
  { id: 'local', label: 'Local' },
  { id: 'work', label: 'Work' },
  { id: 'new_people', label: 'New people' },
  { id: 'serendipity', label: 'Serendipity' },
  { id: 'trends', label: 'Trends' },
] as const

export type FeedMode = (typeof FEED_MODES)[number]['id']

export const DISCOVERY_PRESETS = [
  { id: 'similar_interests', label: 'Similar interests' },
  { id: 'people_i_can_help', label: 'People I can help' },
  { id: 'collaborator', label: 'Find a collaborator' },
  { id: 'local', label: 'Local connections' },
  { id: 'professional', label: 'Professional match' },
  { id: 'serendipity', label: 'Serendipity' },
  { id: 'outside_network', label: 'Outside my network' },
] as const

export const INTERESTS = [
  'Artificial intelligence',
  'Open source',
  'Nostr',
  'Music',
  'Startups',
  'Design',
  'Research',
  'Writing',
  'Web development',
  'Privacy',
  'Local events',
  'Climate',
  'Education',
  'Art',
  'Finance',
]

export const PROFILE_PROMPT = `You are helping me export a structured profile of myself for a social app. Use only what you already know about me from this conversation and your memory of me. Do not invent employers, degrees, or facts. If you are unsure, omit the field.

Return only JSON in this shape:
{
  "name": "",
  "location": "",
  "languages": [],
  "roles": [],
  "bio": "",
  "skills": [],
  "interests": [],
  "experience": [],
  "projects": [],
  "goals": [],
  "looking_for": [],
  "can_offer": []
}`

export const SUGGESTED_PEOPLE = [
  {
    npub: 'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6',
    name: 'fiatjaf',
    interests: ['Nostr', 'Open source', 'Privacy'],
    reason: 'Builds the open social protocol this app sits on.',
  },
  {
    npub: 'npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m',
    name: 'jack',
    interests: ['Nostr', 'Startups', 'Open source'],
    reason: 'Writes in public about open social networks.',
  },
  {
    npub: 'npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx',
    name: 'odell',
    interests: ['Nostr', 'Finance', 'Open source'],
    reason: 'A long-running public voice on the open network.',
  },
  {
    npub: 'npub1xtscya34g58tk0z605fvr788k263gsu6cy9x0mhnm87echrgufzsevkk5s',
    name: 'jb55',
    interests: ['Nostr', 'Open source', 'Web development'],
    reason: 'Ships open social software and talks about how it works.',
  },
  {
    npub: 'npub1gcxzte5zlkncx26j68ez60fzkvtkm9e0vrwdcvsjakxf9mu9qewqlfnj5z',
    name: 'Derek Ross',
    interests: ['Nostr', 'Startups', 'Artificial intelligence'],
    reason: 'Introduces people to the open network in plain language.',
  },
]
