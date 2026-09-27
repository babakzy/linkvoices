
## AI-Powered Human Connection Network

### 1. Product Overview

A decentralized human connection network where people create a rich human profile once and use it to discover relevant people, communities, projects, and opportunities through AI.

The platform automatically creates a **Nostr identity** for every new user, giving them a portable decentralized social identity without requiring them to understand Nostr, keys, relays, or protocols.

The product combines:

- Simple registration
    
- Rich human profiles
    
- Automatic Nostr identity
    
- Social feed
    
- AI-powered people discovery
    
- Custom matching algorithms
    
- Communities
    

### 2. Core Vision

The internet is extremely good at helping people find content.

It is much worse at helping people find the **right people**.

This product creates a network where AI understands who people are, what they know, what they need, what they can offer, and what they are currently looking for.

AI is used to **connect humans**, not replace human relationships.

### 3. Core Product Principle

> **Create your human profile once. Let AI help you find the right humans.**

The user should not think:

> "I am creating a Nostr account."

The user should think:

> "I am creating my human profile."

Behind the scenes, the platform creates a Nostr identity and connects the profile to the decentralized network.

---

# 4. Target Users

### Primary users

People who want to:

- Meet interesting people
    
- Find collaborators
    
- Find co-founders
    
- Find communities
    
- Find projects
    
- Find mentors
    
- Find people with similar interests
    
- Find people they can help
    
- Discover people outside their existing network
    

### Early adopter communities

Potential initial communities include:

- Developers
    
- AI builders
    
- Open-source contributors
    
- Startup founders
    
- Web3/Nostr users
    
- Independent makers
    
- Researchers
    
- Creators
    
- Remote workers
    
- People interested in decentralized technology
    

---

# 5. User Registration

Registration should be extremely simple.

### New user flow

```text
Landing page
      ↓
Create profile
      ↓
AI-assisted onboarding
      ↓
Basic information
      ↓
Interests / skills / goals
      ↓
What I can offer
      ↓
What I'm looking for
      ↓
Privacy preferences
      ↓
Nostr identity automatically created
      ↓
Profile completed
      ↓
Start discovering people
```

The user should not need to:

- Install a Nostr client
    
- Understand relays
    
- Understand private keys
    
- Manually create a Nostr profile
    
- Choose a relay
    
- Learn Nostr terminology
    

### Existing Nostr users

Existing Nostr users can optionally connect their existing identity.

```text
Create new identity
        OR
Connect existing Nostr identity
```

The existing user's Nostr public key becomes their identity on the platform.

---

# 6. Automatic Nostr Identity

Every new account receives a Nostr identity automatically.

The platform creates:

- Public key / npub
    
- Private key / signing mechanism
    
- Nostr profile metadata
    
- Nostr social identity
    

The user can continue using the platform without seeing technical details.

### Advanced users

Users can later:

- View their npub
    
- Export/recover their identity
    
- Connect external Nostr signers
    
- Use their identity with other Nostr applications
    
- Import an existing Nostr identity
    

### Important principle

Nostr should be **progressively disclosed**.

Beginner:

> "Your decentralized identity has been created."

Advanced user:

> "View Nostr identity"

Expert:

> "Connect external signer / manage relays"

---

# 7. Human Profile

The profile is the foundation of the network.

Unlike a traditional social profile, it should represent the person as a structured entity.

### Example

```json
{
  "identity": {
    "name": "Babak",
    "location": "Ljubljana",
    "languages": ["English", "Persian"],
    "roles": ["AI Engineer", "Web3 Developer"],
    "bio": "long text",

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

  "preferences": {},

  "privacy": {}
}
```

The profile should be continuously editable.

AI can help users build and maintain it through natural conversation.

---

# 8. AI Profile Builder

First, we give the user a prompt to give the AI, like his personal ChatGPT, to extract his information. Then, if it's not available or there is missing information, we should ask like below:

Instead of forcing users to fill out a long form, the platform can interview them.

Example:

> What are you working on these days?

User answers naturally.

AI extracts:

- Skills
    
- Interests
    
- Experience
    
- Projects
    
- Goals
    
- Needs
    
- Offers
    
- Topics
    
- Preferences
    

The user always reviews and controls what gets saved.

### Goal

A user should be able to create a meaningful profile in a few minutes.

---

# 9. Intent System

Users can continuously express what they currently need.
Users can have multiple intent preferences, but each time they can go with one of their intent to conect people.

Examples:

- "Looking for a technical co-founder."
    
- "I want to meet totally new random people just to chat with!."
    
- "Looking for people to play guitar with."
    
- "I want to join an open-source project."
    
- "Looking for someone who understands fundraising."
    
- "I can help startups with frontend development."
    

Intent is separate from the permanent profile.

```text
Profile = Who I am

Intents = What I currently want
```

This distinction is important because people's needs change.

---

# 10. AI Matching

The core function of the platform is matching humans.

A user can enter:

> "Find me people who are building AI products and are interested in decentralization."

The system:

1. Understands the request
    
2. Converts it into structured intent
    
3. Searches relevant profiles
    
4. Applies the selected algorithm
    
5. Ranks candidates
    
6. Explains the match
    
7. Allows the user to connect
    

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


  

---

# 11. Matching Algorithms

The platform should not have one permanent "correct" algorithm.
Slogan: Algorithms for you, Not against you.
Users can choose how they want to discover people.


### Built-in algorithms

Examples:

- Similar Interests
    
- People I Can Help
    
- Find a Collaborator
    
- Local Connections
    
- Professional Match
    
- Serendipity
    
- People Outside My Network
    
- Shared Projects
    

###  Feed algorithms options

There should be option to choose algorithm of their feed like youtube but much options like:
- Just following
- Local
- To Work & Collaborate
- New Peoples Posts
- Trends

---

# 12. Social Feed

The platform includes an X-like social feed powered primarily by Nostr events.

Users can:

- Post
    
- Reply
    
- Follow
    
- Repost
    
- React
    
- Discover conversations
    

The feed should not become the primary purpose of the product.

Its purpose is to generate:

- Social interaction
    
- New connections
    
- Signals about people's interests
    
- Signals about people's current needs
    
- Opportunities for AI matching
    

### Feed types

#### Following

Posts from people the user follows.

#### For You

AI-selected posts and people based on profile, interests, intent, and selected algorithm.

#### Discover

Content and people outside the user's existing network.

#### Serendipity

Unexpected people and conversations selected to increase network diversity.

#### Local

People and conversations relevant to the user's chosen location.

---

# 13. AI Understanding of the Feed (Not Now)

The AI layer can understand public posts.

Example:

A user posts:

> "I'm building an open-source AI agent and need someone experienced with TypeScript."

The system can identify:

```text
Intent:
Find collaborator

Need:
TypeScript developer

Project:
Open-source AI agent

Opportunity:
Collaboration
```

This can create new matching opportunities without requiring the user to manually create a job/project listing.

The original Nostr post remains a normal social post.

The AI simply adds structured understanding on top.

---

# 14. Communities (Not Now)

Communities can be created manually or suggested by AI.

AI can detect groups of people with:

- Shared interests
    
- Shared goals
    
- Shared projects
    
- Geographic proximity
    
- Similar needs
    
- Complementary skills
    

Example:

```text
50 people
    ↓
AI detects common interests
    ↓
Suggested community
    ↓
"AI + Decentralized Identity"
    ↓
Community created
```

Communities can contain:

- Members
    
- Posts
    
- Discussions
    
- Projects
    
- Events
    
- Algorithms
    
- Shared resources
    

---

# 15. Projects and Opportunities (Not Now)

Projects are first-class entities.

A project can define:

- Description
    
- Team
    
- Required skills
    
- Goals
    
- Location
    
- Remote/on-site
    
- Availability
    
- Compensation
    
- Stage
    
- People needed
    

The AI can match:

```text
Project ↔ Person
```

and:

```text
Project ↔ Community
```

---

# 16. Connection System

The goal is not to maximize followers.

The goal is to create useful human relationships.
## Connection Type With Other Poeple

there should be multiple connection type for people graphs, like:
- Real Friend
- Online Friend
- Follows (no need to accept)
- Interested in (no need to accept)
- Inspired By (no need to accept)
- Works With
- Loves
- Married
- Other (custom)

Possible actions:

- Connect
    
- Message (simple for now)
    
- Connect (with choosing connection type)
    

After connecting, users communicate directly.

AI can help explain why two people might be relevant to each other, but it should not replace their interaction.

---

# 17. Feedback Loop

After a connection, the platform can optionally ask:

> Did this connection turn out to be useful?

Possible outcomes:

- Had a conversation
    
- Met in person
    
- Started collaboration
    
- Joined the same community
    
- Became friends
    
- Not relevant
    
- No response
    

This feedback can improve future matching.

The system should optimize for **successful human connections**, not time spent scrolling.

---

# 18. Privacy

The profile should have multiple visibility levels.

### Public

Examples:

- Name
    
- Bio
    
- Interests
    
- Skills
    
- Public posts
    
    

### Matching-only

Examples:

- Current goals
    
- Current needs
    
- Availability
    
- Detailed preferences
    
- Additional profile information
    

### Private

Examples:

- Email
    
- Phone
    
- Exact location
    
- Private notes
    
- Sensitive information
    

Users should control what information can be used for matching.

---

# 19. Nostr Architecture

Nostr should primarily provide the decentralized social layer.

### Nostr

Responsible for:

- Identity
    
- Public profile
    
- Public posts
    
- Replies
    
- Follows
    
- Reposts
    
- Reactions
    
- Public social graph
    

### Platform infrastructure

Responsible for:

- Rich profiles
    
- Private information
    
- Permissions
    
- AI processing
    
- Embeddings
    
- Matching
    
- Algorithms
    
- Community detection (Not now)
    
- Search
    
- Notifications
    

This allows the product to benefit from decentralization without forcing all application data onto Nostr.

---

# 20. Data Architecture

### PostgreSQL

Primary structured database.

```text
users
profiles
skills
interests
goals
intents
projects
communities (not now)
algorithms
connections
permissions
feedback
notifications
```

### Vector search

Used for:

- Profile similarity
    
- Intent matching
    
- Post understanding
    
- Semantic search
    
- Community discovery
    

### Nostr indexer

Indexes relevant Nostr events into the platform's search/matching infrastructure.

```text
Nostr Relays
     ↓
Event Indexer
     ↓
PostgreSQL / Search
     ↓
AI Processing
     ↓
Matching / Feed
```

---

# 21. MCP

MCP can provide controlled access to the network for AI agents.

Potential tools:

```text
get_my_profile()
update_my_profile()

search_people()
find_matches()

find_people_i_can_help()

find_communities()
find_projects()

create_matching_algorithm()
evaluate_algorithm()

get_public_profile()
```

Permissions must be explicit.

External AI agents should never automatically receive private profile information.

---

# 22. Notifications

The platform should notify users about meaningful action and request rather than maximizing engagement.


---

# 23. Core Product Loop

```text
Create Profile
      ↓
Create Nostr Identity
      ↓
Express Intent
      ↓
Discover People / Feed / Communities
      ↓
AI Finds Relevant Humans
      ↓
Connection request -> accept
      ↓
Human Interaction
      ↓
Profile Gets Better
      ↓
More Valuable Connections
```

---

# 24. MVP

The first version should remain small.

### MVP must have

1. Simple registration
    
2. Automatic Nostr identity
    
3. Human profile
    
4. AI-assisted profile creation
    
5. Skills/interests/needs/offers
    
6. Intent creation
    
7. AI people search + MCP
    
8. Basic matching algorithm
    
9. Match explanations
    
10. User profiles
    
11. Connect with connection type
    
12. Basic Nostr feed
    
13. Basic messaging or connection request
    
14. Privacy controls
    

### MVP should NOT initially include

- Complex algorithm marketplace
    
- Token
    
- DAO
    
- Advanced reputation
    
- Community system
    
- Sophisticated recommendation marketplace
    
- Complex gamification
    
- Hundreds of profile fields
    
- Multiple clients using the same human network

---

# 25. Phase 2

After the core matching loop works:

    
- Custom algorithms
    
- Algorithm sharing
    
- Communities
    
- Projects
    
- Opportunity matching
    
- Better feed
    
- Match feedback
    
- Advanced notifications
    
- Nostr identity export
    
- External Nostr clients


---

# 26. Phase 3

Long-term network layer:

- Algorithm marketplace
    
- Third-party matching applications
    
- Developer API
    
- Community-owned spaces
    
- Advanced reputation
    


---

# 27. Product Positioning

The consumer-facing message should focus on humans, not Nostr.

### Core message

**Find the right people, not more content.**
Decentralization and freedom 
Algorithms form you
new way of social networks

### Supporting message

**Create your human profile once. AI helps you discover people, communities, and opportunities that matter to you.**
Algorithms form you, not against you
### Decentralization message

**Your identity is yours. Your social network doesn't have to belong to one company.**

Nostr should be presented as an underlying benefit rather than something users need to learn.

---

# 28. Success Metrics

The most important metrics should measure **human connection**, not engagement.

### Activation

- Profile completion rate
    
- Time to complete profile
    
- Nostr identity creation rate
    
- First discovery session
    

### Matching

- Matches generated
    
- Match click-through rate
    
- Connection requests
    
- Accepted connections
    
- Match feedback
    

### Human outcomes

- Conversations started
    
- Collaborations started
    
- Communities joined
    
- Projects joined
    
- Offline meetings
    

### Network growth

- New users
    
- Active users
    
- Nostr identities created
    
- Connections per user
    
- Cross-network connections
    

### Avoid optimizing primarily for

- Time spent
    
- Infinite scrolling
    
- Number of likes
    
- Number of posts
    
- Notifications opened
    

The primary product metric should eventually answer:

> **Did this network help people form useful human connections they would probably not have made otherwise?**

---

# 29. Long-Term Vision

The long-term product is not simply another social network.

It becomes a **human discovery protocol**.

```text
                 HUMAN
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      People    Projects   Communities
        │          │          │
        └──────────┼──────────┘
                   │
              AI Discovery
                   │
          User-selected algorithms
                   │
             Nostr Network
                   │
          Portable Identity
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
     Client A    Client B    Client C
```

Different applications could eventually use the same underlying human identity and social graph while providing completely different ways of discovering people.

The fundamental idea remains:

> **Nostr provides the identity and open social layer. Your platform provides the intelligence that helps humans find each other.**