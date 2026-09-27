# AI-Powered Nostr Client

## 1. Product Overview

An easy, complete Nostr client for everyone.

The product gives people the familiar experience of a modern social application while hiding unnecessary protocol complexity. Users can create or connect a Nostr identity, build an advanced human profile, follow people, publish posts, join conversations, and discover relevant people and content with AI.

Users should not need to understand keys, relays, event kinds, or other Nostr terminology to get started.

The product combines:

- Easy registration
- Automatic or existing Nostr identity
- Existing Nostr profiles and posts
- A complete social feed
- Advanced human profiles
- Interests and current intents
- AI-assisted discovery and search
- Secure messaging
- MCP access with explicit permissions

## 2. Product Vision

Nostr provides an open identity and social network, but most clients are still designed for people who already understand Nostr.

This product makes Nostr accessible to everyone.

It should feel like a polished, simple social application while preserving the benefits of an open network:

- Portable identity
- Existing profiles and social graph
- Public posts from across Nostr
- Freedom to use other compatible clients
- User-controlled algorithms
- No dependency on a single closed social platform

AI should help users understand the network, improve their profiles, and find relevant people and conversations. It should not replace human interaction or publish information without user approval.

## 3. Core Promise

> **Let's connect people again.**

The product is a simple Nostr client that helps people find the right people and conversations. AI should guide discovery, but users should be able to communicate with real, experienced people—not rely only on AI for knowledge, advice, and support.

Supporting principles:

- Nostr made easy
- Human connection before AI substitution
- Access to experienced people, not only generated answers
- Decentralization instead of dependence on a single platform
- Digital freedom to choose clients, relays, algorithms, and communities
- Your identity belongs to you
- AI helps you discover; it does not decide for you
- Algorithms work for you, not against you
- People matter more than engagement metrics

## 4. Target Users

### Primary users

- People who want a simple alternative to traditional social networks
- People who want to own their online identity
- Creators, developers, founders, researchers, and independent makers
- People looking for collaborators, communities, knowledge, or conversation
- Existing Nostr users seeking a more approachable and intelligent client
- New users who have never heard of Nostr

### Product requirement

The experience must work for a beginner without limiting advanced Nostr users.

Nostr concepts should be progressively disclosed:

- Beginner: normal social application language
- Advanced: identity export, signer connection, relay settings
- Expert: detailed relay and event controls

## 5. Core User Experience

The primary navigation should remain simple:

- **Home:** Posts from followed people
- **Discover:** Recommended people, posts, and conversations
- **Search:** Search people and posts using keywords or natural language
- **Post:** Create a post
- **Profile:** Identity, advanced profile, interests, and intents
- **Messages:** Private conversations

Protocol terms should not appear in the primary interface unless the user enables advanced controls.

## 6. Registration and Identity

Registration must be fast and understandable.

Users can:

1. Create a new account and Nostr identity
2. Connect an existing Nostr identity
3. Explore public profiles and posts before registering

### New user flow

```text
Create account
      ↓
Create Nostr identity automatically
      ↓
Secure identity and recovery method
      ↓
Choose interests
      ↓
Create or import advanced profile
      ↓
Follow suggested people
      ↓
Enter the populated feed
```

The user should not need to:

- Install another Nostr client
- Select relays during onboarding
- Understand public and private key terminology
- Manually configure Nostr

### Existing Nostr user flow

Users can prove ownership of an existing identity using a compatible signer or signed challenge.

After authentication, the product imports:

- Public profile metadata
- Follow list
- Recent posts
- Relay information

Entering an `npub` alone must never be sufficient to claim an identity.

### Identity ownership

Identity recovery or export is an MVP requirement, not a future feature.

The product should support a secure approach such as:

- Client-side encrypted key storage
- Passkey-protected encrypted backup
- NIP-46 remote signer
- NIP-07 browser signer

If managed custody is temporarily used, it must be explained honestly and include a clear export path.

## 7. Existing Nostr Network

The application should use existing Nostr profiles, posts, and social graphs from launch. This prevents an empty-network experience and makes the client useful immediately.

The client should retrieve and display:

- Profile metadata
- Public posts
- Replies
- Reposts
- Reactions
- Follow lists
- Relay hints
- NIP-05 verification where available

### Profile labels

The interface should distinguish between:

- **Member:** A person who has joined this platform and may have an enriched profile
- **Nostr profile:** A public identity indexed from Nostr relays

An indexed Nostr profile is not a platform account. Its owner may later join and claim it by proving control of the corresponding identity.

### Data handling

- Signed Nostr events remain the source of truth for Nostr data.
- Cached data must retain event IDs, signatures, timestamps, and source relay information.
- Replaceable profile events should resolve to the latest valid event.
- Deleted or superseded events should be handled according to Nostr behavior and relay availability.
- Spam and unsafe content should be filtered without presenting moderation as protocol-level deletion.

## 8. Complete Nostr Client Features

The MVP should provide the essential functionality expected from a practical Nostr client.

### Feed

- Following feed
- Discover feed
- Replies and conversation threads
- Reposts
- Reactions
- Basic media display
- Long-form article previews and reading view
- Loading, empty, and error states

### Publishing

- Create a short post
- Write a long-form article
- Reply to a post or article
- Repost
- React
- Delete or request deletion of the user's own content

### Long-form articles

Alongside short posts, users can publish full articles using the standard Nostr long-form content format, so articles remain readable in other compatible clients.

An article supports:

- Title
- Optional summary
- Cover image
- Rich text with headings, lists, links, quotes, code, and images
- Topics or tags
- Reading time
- Published and last-updated dates

Behavior:

- Drafts save automatically and stay private until published.
- A published article can be edited; the update replaces the previous version rather than creating a duplicate.
- Articles are addressable by a stable identifier so links keep working after an edit.
- Articles receive replies, reposts, and reactions like any other content.
- In the feed an article appears as a preview card with title, cover image, and summary, opening into a full reading view.

Writing support:

- AI can help outline, tighten, or proofread a draft, and suggest a title, summary, and tags.
- Nothing is published without the user's explicit approval.
- Article content belongs to the author and stays portable across Nostr clients.

### Social graph

- Follow and unfollow
- View followers and following where available
- Import existing follows
- Suggested follows based on interests and trusted social proximity

### Optional connection types

**Follow** remains the primary social action. Following never requires approval.

When following someone, the user may optionally select a connection type. They can also add or change it later.

Examples:

- Online friend
- Real-life friend
- Interested in
- Inspired by
- Works with
- Family
- Romantic partner
- Married
- Custom

Connection types are an optional layer over the Nostr follow graph; users can ignore them completely.

#### Approval rules

- A normal follow happens immediately, even when a connection type is selected.
- Non-sensitive, directional types such as **Interested in** or **Inspired by** do not require approval.
- Sensitive types that claim a mutual, private, family, professional, or romantic relationship require the other person to accept the connection type.
- A sensitive type remains pending and is not displayed as an established relationship until accepted.
- Accepting or rejecting a connection type does not accept, reject, or remove the underlying follow.
- Either person can remove an accepted connection type later.
- Custom types that imply a sensitive or mutual relationship must require approval.

Connection-type data should remain platform-private by default. Publishing it to Nostr or displaying it publicly requires explicit permission from everyone identified by the relationship.

### Messaging

- Basic private messaging using an appropriate Nostr standard
- Clear explanation of privacy and encryption behavior
- Blocking and reporting controls

### Advanced Nostr controls

Available outside the primary beginner experience:

- View public identity
- Export or recover identity
- Connect an external signer
- View and manage relays
- Inspect signed event information

## 9. Advanced Human Profile

The profile is the foundation of discovery. Unlike a traditional social bio, it represents the person as a structured entity that AI can reason about.

It combines standard Nostr metadata with structured fields the platform adds on top.

### Profile structure

```json
{
  "identity": {
    "name": "Babak",
    "location": "Ljubljana",
    "languages": ["English", "Persian"],
    "roles": ["AI Engineer", "Web3 Developer"],
    "bio": "long text",
    "links": []
  },

  "skills": [
    "AI",
    "Full-stack development",
    "Nuxt",
    "Supabase",
    "TypeScript"
  ],

  "interests": [
    "AI agents",
    "Open source",
    "Nostr",
    "Web3",
    "Music"
  ],

  "experience": [],

  "projects": [],

  "goals": [],

  "looking_for": [
    "Co-founder",
    "AI projects",
    "Interesting people"
  ],

  "can_offer": [
    "Software development",
    "AI engineering",
    "Product development"
  ],

  "availability": {},

  "preferences": {},

  "privacy": {}
}
```

### Field groups

- **Identity:** name, profile image, bio, general location, languages, roles, links
- **Knowledge:** skills, experience, projects
- **Direction:** goals, what I am looking for, what I can offer, availability
- **Topics:** interests
- **Control:** preferences and privacy settings

### Rules

- The profile must be continuously editable.
- The profile should remain useful even when only standard Nostr metadata is available.
- Standard fields map to Nostr profile metadata; platform-specific fields stay on the platform.
- Platform-specific fields are never published to Nostr unless the user explicitly chooses to publish them.
- Each field group can be set to public, discovery-only, or private.

## 10. AI-Assisted Profile Creation

Users should never face a long empty form. There are two ways to fill the profile, and they can be combined.

### Bring your own AI

The platform gives the user a ready-made prompt to paste into the AI assistant they already use, such as ChatGPT or Claude. That assistant already knows a lot about them, so it can produce a structured summary of their background, skills, projects, and goals.

```text
Platform generates a prompt
      ↓
User pastes it into their own AI assistant
      ↓
Assistant returns a structured summary
      ↓
User pastes it back
      ↓
Platform parses it into profile fields
      ↓
User reviews and approves
```

### Guided interview

For anything missing, incomplete, or unclear, the platform interviews the user in short natural steps instead of asking them to fill fields.

Example:

> What are you working on these days?

The user answers naturally, and AI extracts:

- Skills
- Interests
- Experience
- Projects
- Goals
- Needs
- Offers
- Topics
- Preferences

### Rules

- The user always reviews and controls what gets saved.
- The user chooses what becomes public, discovery-only, or private.
- AI-generated claims must never be presented as verified facts.
- Nothing is published to Nostr without explicit approval.

### Goal

A user should be able to create a meaningful profile in a few minutes.

## 11. Interests

Interests describe topics the user generally cares about.

Examples:

- Artificial intelligence
- Open source
- Nostr
- Music
- Startups
- Local events

Interests can improve:

- Suggested profiles
- Discover feed
- Search results
- Starter follow recommendations

Users must be able to edit or remove interests and control whether they are public or used only for recommendations.

## 12. Intent

Intent describes what the user currently wants, while the profile describes who the user is.

```text
Profile = Who I am
Interests = Topics I generally care about
Intent = What I want right now
```

Examples:

- Find people building open-source AI tools
- Meet local musicians
- Find a technical co-founder
- Learn about Nostr development
- Find someone I can help with product development
- Discover interesting conversations outside my network

### Multiple intents, one active

A user can save several intents, but discovery runs against one active intent at a time. This keeps results focused instead of blending unrelated goals into one vague recommendation set.

```text
Saved intents:  co-founder search · guitar jam · open-source contribution
Active intent:  guitar jam
      ↓
Discovery and search are shaped by the active intent
```

Users can create, edit, switch, pause, or delete intents at any time.

Intent should improve discovery and search without automatically contacting anyone or publishing private information.

## 13. AI Discovery and Search

AI is a layer over the Nostr network, not a replacement for it.

Users can search naturally:

> Find people who build AI products and care about decentralization.

> Show recent discussions about Nostr identity.

> Find people whose work complements my current project.

The system can:

1. Understand the request
2. Search indexed public Nostr data and approved platform profile data
3. Rank relevant people or posts
4. Explain why each result is relevant
5. Let the user follow, open the conversation, or message the person

### Match explanation

Every recommended person must come with a plain-language reason. The user should never see an unexplained suggestion.

Example:

> **Why this person?**
>
> You both work on AI products.
>
> They are looking for a technical collaborator.
>
> You have the skills they are looking for.
>
> You are both interested in decentralized technology.

Explanations can draw on:

- Shared interests
- Relevant profile information
- Current active intent
- People followed in common
- Relevant public posts
- Social proximity
- Location

### Discovery presets

There is no single correct ranking. The user picks how they want to discover people.

> Algorithms for you, not against you.

Built-in presets:

- **Similar Interests:** people who care about the same topics
- **People I Can Help:** people whose needs match what you offer
- **Find a Collaborator:** complementary skills and shared goals
- **Local Connections:** people near your chosen location
- **Professional Match:** role, skill, and experience alignment
- **Serendipity:** unexpected people who widen your network
- **Outside My Network:** people your current follows do not reach

Presets are selectable and switchable at any time. Building or publishing custom algorithms is outside this document.

## 14. Feed and Recommendation Principles

The feed is a core part of the Nostr client, but it should not be optimized only for attention.

The feed should help users:

- Keep up with people they follow
- Discover useful conversations
- Find relevant people
- Explore outside their existing network

### Feed modes

The user chooses their feed algorithm the same way they choose a discovery preset:

- **Following:** Posts only from people you follow
- **For You:** Posts selected from your profile, interests, and active intent
- **Local:** People and conversations near your chosen location
- **Work & Collaborate:** Posts about projects, building, hiring, and collaboration
- **New People:** Posts from people you have never seen before
- **Serendipity:** Unexpected people and conversations that widen your network
- **Trends:** What the wider network is currently discussing

### Rules

- The user's selected feed mode must persist and never be silently overridden.
- Recommendations must avoid inventing profile attributes or presenting AI inference as user-provided information.
- The feed exists to surface people and conversations, not to maximize time spent.

## 15. Connection Feedback

The platform should learn whether its recommendations actually led to something real.

Some time after a connection or first conversation, the platform can optionally ask:

> Did this connection turn out to be useful?

Possible answers:

- Had a good conversation
- Met in person
- Started working together
- Became friends
- Not relevant
- No response

### Rules

- Feedback is always optional and never blocks the interface.
- Feedback is private and never shown to the other person.
- Feedback improves the user's own future recommendations.
- The system optimizes for successful human connections, not time spent scrolling.

## 16. Notifications

Notifications exist to inform, not to pull people back into the app.

The platform should notify about meaningful actions and requests:

- Replies and mentions
- New messages
- Connection type requests and responses
- New followers
- Relevant people found for the active intent
- Identity or security events

### Rules

- Every notification type must be individually controllable.
- No engagement-bait notifications, streaks, or artificial urgency.
- Batch low-priority notifications instead of sending them one by one.

## 17. Privacy and Safety

Profile data can have three visibility levels:

### Public

- Standard Nostr profile
- Public posts
- User-approved interests, skills, and profile fields

### Discovery-only

- Current intent
- Availability
- Private recommendation preferences
- User-approved information used for matching

### Private

- Email
- Phone
- Exact location
- Recovery information
- Private notes

Users must control which information:

- Is published to Nostr
- Is visible only inside the platform
- Can be used by AI
- Can be accessed through MCP

Safety controls should include:

- Mute
- Block
- Report
- Content warnings
- Spam filtering
- Basic moderation preferences

## 18. MCP

MCP provides controlled access to the user's Nostr client and profile for compatible AI agents.

Initial MCP tools can include:

```text
get_my_profile()
update_my_profile()
get_my_interests()
update_my_interests()
get_my_intents()
create_intent()
search_people()
search_posts()
get_feed()
get_public_profile()
draft_post()
draft_article()
```

Sensitive or public actions require explicit permission.

An external agent must never:

- Receive private profile data without permission
- Publish a post without explicit confirmation
- Send a message without explicit confirmation
- Export or access private key material
- Change identity or relay security settings

Read and write permissions should be independently controllable and revocable.

## 19. Data Responsibilities

### Nostr

Nostr is responsible for:

- Public identity
- Standard public profile metadata
- Public posts
- Long-form articles
- Replies
- Reposts
- Reactions
- Follows
- Compatible private messages
- Signed social events

### Platform infrastructure

The platform is responsible for:

- Account convenience and secure key experience
- Advanced profile fields
- Private and discovery-only information
- AI processing
- Search index
- Semantic discovery
- Recommendation preferences
- Permissions
- MCP authorization
- Notifications
- Moderation preferences

Platform data should extend the open Nostr identity without pretending that private platform fields are universally available across Nostr.

## 20. Data Architecture

### Primary database

A relational database holds the structured platform data:

```text
users
profiles
skills
interests
goals
intents
connections
connection_types
permissions
feedback
notifications
```

### Vector search

Used for semantic discovery:

- Profile similarity
- Intent matching
- Post understanding
- Natural-language search

### Nostr indexer

Relevant Nostr events are indexed into the platform's search and discovery infrastructure so the network is searchable and the feed loads quickly.

```text
Nostr relays
      ↓
Event indexer
      ↓
Database and search index
      ↓
AI processing
      ↓
Feed and discovery
```

Signed Nostr events remain the source of truth. The index is a cache and must be rebuildable from relays.

## 21. Core Product Loop

```text
Create or connect Nostr identity
      ↓
Import profile, follows, and posts
      ↓
Add interests and advanced profile information
      ↓
Read and participate in the Nostr feed
      ↓
Express a current intent
      ↓
AI discovers relevant people and conversations
      ↓
Follow, reply, or message
      ↓
Improve preferences and profile
```

## 22. MVP Scope

The MVP includes:

1. Easy registration
2. Automatic Nostr identity creation
3. Existing Nostr identity authentication
4. Identity recovery or export
5. Import of existing profile and follows
6. Existing Nostr profiles and posts
7. Following, discover, and recent feeds
8. Short posts, long-form articles, replies, reposts, and reactions
9. Follow and unfollow
10. Optional connection types with approval for sensitive relationships
11. Basic private messaging
12. Advanced structured profile
13. AI-assisted profile creation, via both the bring-your-own-AI prompt and the guided interview
14. Interests
15. Multiple saved intents with one active at a time
16. AI people and post search
17. Explainable recommendations with "Why this person?"
18. Selectable discovery presets and feed modes
19. Optional connection feedback
20. Meaningful, controllable notifications
21. MCP with explicit permissions
22. Privacy, mute, block, report, and spam controls
23. Beginner and advanced Nostr settings

Anything not listed above is outside this product document.

## 23. Success Metrics

### Activation

- Registration completion rate
- Existing identity connection success rate
- New identity recovery setup rate
- Time until the feed becomes useful
- Profile and interest completion rate
- First follow, post, or reply

### Nostr client utility

- Successful feed loads
- Posts and replies published successfully
- Follow lists imported successfully
- Returning users who read or participate in conversations
- Identity export and signer connection success

### Discovery

- Relevant people or posts opened
- Searches producing a useful result
- Recommendations followed
- Conversations started from discovery
- User feedback on recommendation quality

### Guardrails

The product should not primarily optimize for:

- Time spent scrolling
- Number of notifications opened
- Posting frequency
- Reaction count
- Viral engagement

The primary question is:

> Did the client make Nostr easy and help the user find people or conversations that mattered to them?

## 24. Positioning

### Primary message

> Nostr made easy—for everyone.

### Product message

> A complete, approachable Nostr client with AI that helps you discover the right people and conversations.

### Supporting message

> Create or bring your identity, join the existing network, and choose how you discover it.

### Ownership message

> Your identity and social graph are portable. You are not locked into this application.

## 25. Product Boundary

This product is first a Nostr client.

Advanced profiles, interests, intents, AI discovery, and MCP make the client more useful, but they should not prevent users from completing normal Nostr actions simply and reliably.

If a feature makes the product harder to understand without improving the core Nostr experience, it should not be included.

## 26. Long-Term Direction

This document describes the first product, not the ceiling.

Because identity and the social graph live on Nostr, the people a user finds here remain reachable from any other compatible client. The platform earns its place by being the easiest and most intelligent way into that network, not by locking anyone inside it.

Over time the intelligence layer — profiles, intents, and discovery — can serve more than one application, so different clients could offer completely different ways of finding people while sharing the same open human identity.

> Nostr provides the identity and the open social layer. This product provides the intelligence that helps humans find each other.
