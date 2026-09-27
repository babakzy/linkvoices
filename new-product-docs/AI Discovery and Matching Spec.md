# AI Discovery and Matching Spec

Companion to `Product Requirements Document - Nostr Client MVP.md` sections 13 and 14, and `Data Model and Schema.md`.

Stack-agnostic. Model names are deliberately omitted; the pipeline holds regardless of which embedding and language models are chosen.

## 1. What this system must do

Three user-visible jobs, one pipeline:

| Job                   | Trigger                 | Output                            |
| --------------------- | ----------------------- | --------------------------------- |
| **People search**     | Natural-language query  | Ranked people, each with a reason |
| **Discover feed**     | Opening the app         | Ranked posts and articles         |
| **Suggested follows** | Onboarding, and ongoing | Ranked people, each with a reason |

And two hard constraints from the PRD, which shape every decision below:

1. **No invented attributes.** An explanation may only assert something the user actually wrote and marked public.
2. **The user picks the algorithm.** Presets are selectable, must persist, and must differ in ways a person can actually feel.

## 2. Inputs, and what each is allowed to touch

The separation between what may *influence* ranking and what may *appear* in an explanation is the most important rule in this document. It is easy to implement and easy to violate accidentally.

| Input | Ranking | Explanation | Embedding |
| --- | --- | --- | --- |
| Public profile fields | Yes | Yes | Yes |
| Discovery-tier fields | Yes | **No** | Yes |
| Private-tier fields | **No** | **No** | **No** |
| Active intent (own) | Yes | Yes, own side only | Yes |
| Another person's intent | Yes, if discovery-tier | **No** | Yes |
| Public posts and articles | Yes | Yes | Yes |
| Follow graph | Yes | Yes | No |
| Connection types | **No** | **No** | No |
| Connection feedback (own) | Yes | No | No |
| Unconfirmed AI-extracted fields | **No** | **No** | No |

Two rows deserve emphasis.

**Discovery-tier data ranks but cannot be quoted.** If someone marks "looking for a co-founder" as discovery-only, it may pull them up in your results, but the explanation must say "you both work on AI products", not "they're looking for a co-founder". Quoting it would disclose to a stranger something the user chose not to make public.

**Unconfirmed AI extractions are inert.** Per PRD section 10, anything with `source = 'ai_*'` and `confirmed_by_user = false` is a suggestion. It does not rank, embed, or explain. Otherwise the system would recommend people based on things it invented about them.

## 3. Representation

### Multi-facet embeddings

Do not embed a profile as one blob. The single most valuable match type — *what I can offer meets what you are looking for* — is invisible to a blended vector, because the blend averages away the distinction between offering and seeking.

Embed these facets separately, per `embeddings.facet` in the schema:

| Facet | Source text |
| --- | --- |
| `skills` | Skills, roles, experience |
| `interests` | Interests, topics, tags |
| `offers` | What I can offer |
| `looking_for` | What I am looking for, goals |
| `intent` | Active intent text, embedded per intent |
| `full` | Whole profile, for generic similarity |

Content embeddings: `note` and `article` per post, with title and summary weighted for articles.

### Facet pairings

Retrieval queries specific facet pairs rather than comparing like to like:

```text
Similar Interests      my.interests   ↔  their.interests
People I Can Help      my.offers      ↔  their.looking_for
Find a Collaborator    my.looking_for ↔  their.offers      (bidirectional)
                       my.skills      ↔  their.skills      (complementary, not identical)
Professional Match     my.skills      ↔  their.skills
Active intent          my.intent      ↔  their.full, their.offers
```

Collaborator matching is the one case where high similarity is not the goal. Two identical backend engineers are a weaker match than a backend engineer and a designer with the same goal. Score it as *goal similarity × skill complementarity*, where complementarity peaks in a middle band of distance — same domain, different specialisation — rather than at maximum distance, which is just noise.

### Text preparation

Normalise before embedding: expand tag synonyms via `tags.canonical_id`, strip boilerplate, cap length per facet. Store `source_hash` and skip re-embedding unchanged text, as the schema requires.

## 4. Query understanding

A natural-language query becomes a structured object before any retrieval runs. This is a small, cheap, strictly-schema'd model call.

```text
"Find people building AI products who care about decentralization, ideally near me"
                              ↓
{
  "entity":   "person",
  "topics":   ["ai", "decentralization"],
  "skills":   [],
  "seeking":  "builders",
  "location": { "near_user": true, "radius_km": 100 },
  "recency":  null,
  "preset_hint": "similar_interests"
}
```

Rules:

- Output is validated against a fixed schema. A parse failure falls back to plain hybrid search over the raw string rather than erroring.
- Topics are mapped onto the canonical tag taxonomy, never used as free text.
- `preset_hint` may *suggest* a preset but never silently overrides the user's selection. Offer it as a visible one-tap switch instead.
- No location inference beyond what the user has explicitly set.

## 5. Retrieval

Candidate generation is hybrid, because each source fails differently. Vector search alone misses exact terms, keyword search alone misses paraphrase, and both miss the social signal that makes a recommendation feel plausible.

```text
                        structured query
                               │
        ┌──────────────┬───────┴───────┬──────────────┐
        ▼              ▼               ▼              ▼
   vector ANN     keyword / BM25   graph proximity  freshness
   per facet      exact terms,     follows-of-      recent
   pair           names, tags      follows, 2 hops  activity
        │              │               │              │
        └──────────────┴───────┬───────┴──────────────┘
                               ▼
                      union, dedupe by pubkey
                        ~500 candidates
                               │
                               ▼
                       hard filters
                    (see below, non-negotiable)
                               │
                               ▼
                      feature scoring
                        ~100 survive
                               │
                               ▼
                    preset weighting + rerank
                               │
                               ▼
                         top 20 shown
```

### Hard filters

Applied before scoring, never as a score penalty, because a sufficiently high relevance score must not be able to override them:

- Muted or blocked, in either direction
- `spam_score` above threshold
- `trust_score` below floor, unless the user explicitly chose Outside My Network
- Inactive beyond a cutoff, no events in N months
- Self
- Already-dismissed suggestions, for a cooling-off period
- NSFW, unless the user has opted in

### Trust weighting

Web-of-trust distance is a ranking feature everywhere, but its weight varies by preset. Serendipity and Outside My Network deliberately lower the floor and invert part of the signal — that is the entire point of those presets. They still apply spam and safety filters at full strength. Novelty is a product goal; exposure to spam is not.

## 6. Scoring

A transparent linear combination over normalised features. Not a black box, for three reasons: explanations must be derivable from the same features, presets must be tunable without retraining, and a linear model is debuggable when a bad recommendation is reported.

| Feature | Meaning |
| --- | --- |
| `f_interest` | Interest facet similarity |
| `f_skill` | Skill facet similarity |
| `f_complement` | Skill complementarity, mid-band peak |
| `f_offer_need` | My offers ↔ their looking_for |
| `f_need_offer` | My looking_for ↔ their offers |
| `f_intent` | Active intent ↔ their profile |
| `f_graph` | Inverse social distance |
| `f_mutual` | Follows in common, normalised |
| `f_local` | Geographic proximity |
| `f_activity` | Recent posting activity |
| `f_trust` | Web-of-trust score |
| `f_novelty` | Inverse of prior exposure |
| `f_reciprocity` | Predicted likelihood they engage back |

```text
score = Σ (wᵢ × fᵢ)   where w comes from the active preset
```

`f_reciprocity` prevents the failure mode where every user is recommended the same twenty popular accounts who will never reply. A recommendation is only useful if the other person might actually respond, so predicted reciprocity is weighted positively and raw follower count is not a feature at all.

### Presets as weight vectors

Presets differ by weights, not by pipeline. This keeps them cheap to add and guarantees they behave consistently.

| Preset | Dominant weights | Suppressed |
| --- | --- | --- |
| Similar Interests | `f_interest`, `f_intent` | `f_complement` |
| People I Can Help | `f_offer_need`, `f_reciprocity` | `f_interest` |
| Find a Collaborator | `f_need_offer`, `f_complement`, `f_intent` | — |
| Local Connections | `f_local` as gate, then `f_interest` | `f_graph` |
| Professional Match | `f_skill`, `f_intent` | `f_novelty` |
| Serendipity | `f_novelty`, randomised tie-break | `f_graph`, `f_interest` |
| Outside My Network | inverted `f_graph`, `f_interest` | `f_mutual` |

Serendipity needs care. Pure randomness reads as broken, not serendipitous. Constrain it to profiles that clear the quality floor and share at least one weak signal with the user, then randomise aggressively within that pool. The felt experience should be "unexpected but not irrelevant".

Store weight vectors as configuration, not code, so they are tunable without a release.

## 7. Explanations

The PRD promises a plain-language "Why this person?" on every recommendation, and forbids invented attributes. These two requirements are met by never letting the language model assert anything.

### Evidence-first generation

Scoring produces structured evidence. The model only phrases it.

```text
scoring
   │
   ▼
evidence set, built only from public-tier facts
[
  { type: "shared_interest", value: "AI agents",  source: "profile_fields#interests" },
  { type: "shared_interest", value: "Nostr",      source: "profile_fields#interests" },
  { type: "mutual_follows",  count: 4 },
  { type: "skill_match",     mine: "TypeScript",  theirs_seeks: "TypeScript" }
]
   │
   ▼
deterministic template  ──►  optional LLM rephrase for fluency
   │
   ▼
validator: every claim maps to an evidence item
   │
   ▼
render, or fall back to the template on validation failure
```

Rules:

- The model receives **only** the evidence set. Never the raw profile, never discovery-tier fields.
- The model may reword and order. It may not add facts, infer, speculate, or flatter.
- A post-generation validator checks each claim against the evidence set. On failure, render the deterministic template instead. Log the failure.
- Empty evidence means no recommendation. A person who cannot be explained should not be shown.
- Explanations are cached against `(viewer, candidate, evidence_hash)`. Regenerating identical prose per feed load is pure waste.

The honest framing matters too. Say "You're both interested in AI agents", not "You'll get along well". The first is evidence. The second is a promise the system cannot keep.

## 8. Feed ranking

Feed modes are also weight profiles, over content rather than people.

| Mode | Behaviour |
| --- | --- |
| Following | Reverse chronological from follows. **No ranking at all.** |
| For You | Author affinity × content relevance × freshness × trust |
| Local | Location gate, then For You weights |
| Work & Collaborate | Classifier-gated to building, hiring, collaboration, then relevance |
| New People | Authors the user has never seen, quality floor applied |
| Serendipity | Novelty-weighted, constrained randomness |
| Trends | Velocity of engagement within the trusted graph, not global raw counts |

**Following must stay strictly chronological and unfiltered.** It is the mode users reach for when they distrust the algorithm, and quietly ranking it would break the "algorithms for you, not against you" promise more than any other single decision in this document. The only permitted intervention is spam and mute filtering.

Trends is scoped to the trusted graph deliberately. Global engagement counts on an open network are trivially gameable by anyone willing to spin up pubkeys.

### Diversity

Apply after ranking, before render: cap consecutive posts per author, cap posts per author per page, and enforce a minimum number of distinct authors. Without this, one prolific poster eats the feed, which is a common and very visible failure in Nostr clients.

## 9. Cold start

| Situation | Approach |
| --- | --- |
| New member, no profile | Interests only; suggest well-known active accounts per topic |
| New member, profile complete | Full pipeline immediately, this is the advantage of the onboarding design |
| Existing Nostr user | Import follows, bootstrap trust from their existing graph |
| Candidate with sparse profile | Embed their posts instead; label evidence as "based on what they post about" |
| Thin topic coverage | Broaden to parent tags before returning an empty state |

Never show an empty discovery result. Degrade to a broader preset and say so plainly: "Not many exact matches yet, so here are people working nearby to your interests."

## 10. Cost and latency

The budget is the design constraint, not an afterthought. A feed that runs a language model per item cannot be served affordably at any scale.

| Path | Budget | Model calls |
| --- | --- | --- |
| Feed load | < 400ms | **Zero** |
| Suggested follows | < 500ms | Zero, explanations templated |
| NL people search | < 2s | One small parse call |
| Explanation rephrase | Async, cached | One small call, optional |
| Profile embedding | Async on save | One embedding call |
| Intent embedding | Async on save | One embedding call |

Governing rules:

- **No language model call on the feed read path.** Ranking is vector arithmetic and a linear combination.
- Embeddings are computed on write, never on read.
- Candidate sets for suggested follows are precomputed on a schedule and refreshed on profile or intent change.
- Explanation rephrasing is asynchronous with a deterministic template as the always-available fallback, so a model outage degrades prose quality rather than breaking the product.
- `source_hash` gates all re-embedding.

Ingestion is the real cost centre, not serving. Embedding every sampled post from the broad ingestion path will dominate the bill. Embed member and followed-author content eagerly; embed sampled content lazily, only when it enters a candidate set, or gate it behind a quality floor first.

## 11. Learning from feedback

Signals, in ascending order of value:

| Signal | Weight |
| --- | --- |
| Dismissed a suggestion | Weak negative |
| Opened a profile | Weak positive |
| Followed | Moderate positive |
| Replied or messaged | Strong positive |
| Got a reply back | Strongest positive |
| Connection feedback: collaborating, met, friends | Strongest positive |
| Connection feedback: not relevant | Strong negative |

`connection_feedback.source_context` records which preset and intent produced each match, which is what makes the loop learnable rather than merely observable.

Constraints:

- Personalise per user first. Global weight changes require offline evaluation before rollout.
- Never let feedback collapse discovery diversity; enforce a novelty floor regardless of learned weights.
- Feedback is private, per the PRD. It must never surface to the other person, in any read path, including MCP.
- Optimise for reciprocated interaction, never for time spent. The PRD's guardrails are explicit on this, and the metric you optimise is the product you get.

## 12. Evaluation

**Offline.** A labelled set of a few hundred profile pairs scored by hand for relevance. Track precision@10 and explanation validity rate per preset. Run before any weight change ships.

**Preset distinctness.** Measure overlap between presets for the same user. If two presets return largely the same people, they are not real choices and the interface is lying about offering a choice. Target well under half overlap between any pair.

**Explanation integrity.** Sample generated explanations and verify every claim against the evidence set. Validation failure rate is a release blocker, not a metric to monitor casually.

**Leak testing.** Automated: assert that no discovery-tier or private-tier string ever appears in explanation output. This should run in CI, not periodically.

**Online.** Follow-through rate, reply rate, reciprocated-reply rate, and connection feedback distribution, segmented by preset.

## 13. Failure modes to watch

| Failure | Guard |
| --- | --- |
| Same twenty popular people for everyone | `f_reciprocity`, novelty floor, per-author caps |
| Explanations that flatter instead of inform | Evidence-only generation, validator |
| Discovery-tier data quoted in explanations | Separate input ceilings, CI leak test |
| Stale intents poisoning results | `intents.expires_at`, periodic confirmation |
| Serendipity reading as broken | Quality floor plus one weak shared signal |
| Ranking creeping into Following | Hard rule, covered by tests |
| Embedding cost scaling with the firehose | Lazy embedding for sampled content |
| Spam clearing the bar via keyword stuffing | Trust floor before scoring, not after |

## 14. Open questions

- Whether skill complementarity can be learned from successful collaborations, or must stay hand-tuned until there is outcome data.
- Whether to let advanced users see and adjust preset weights directly, which fits the PRD's slogan but risks overwhelming the interface.
- How to detect that an intent has been fulfilled without asking, so discovery stops surfacing stale goals.
- Whether reciprocity prediction is viable before there is interaction data, or whether it starts as a simple activity heuristic.
- Where the line sits between the personalisation the PRD promises and the filter bubble it explicitly wants to avoid.
