# Decisions Log

## 2026-04-03 — Session 2

- **Business name: Vocalo** (vocalo.co) — bilingual-friendly, pronounceable identically in English and Spanish, broad enough to cover services beyond AI receptionist
- **Subscription pricing only** — rejected per-call ($5/call) model. Predictable recurring revenue > volume play. Free trial handles the low-barrier-to-entry problem already.
- **Three-tier pricing structure** (same price for all niches — no contractor/dental split):
  - **Starter $497/mo** — 24/7 call answering, appointment booking, FAQ, urgent transfers
  - **Professional $797/mo** — Starter + text summaries, missed call text-back, lead follow-up sequences
  - **Elite $897/mo** — Professional + Google review requests, auto review responses, monthly report, priority support
  - Tiers framed as levels of automation, not feature lists. Starter = calls answered. Professional = calls + lead nurturing. Elite = full front desk on autopilot.
  - Text summaries moved from Starter to Professional to justify the $300 jump.
  - All Google review features consolidated in Elite to make it the clear winner for $100 more.
  - Removed vague filler ("No lead goes cold", "Dedicated account setup") — every line item must be a real deliverable.
  - Removed tagline descriptions from tier cards — feature lists speak for themselves.
  - Free trial is always on Starter. Upsells happen after clients see value.
- **Decoy pricing (Hormozi-style)** — Professional priced at $797 (only $100 less than Elite) to make Elite the obvious value pick. Pushes clients toward the highest tier where we deliver most value.
- **No "Most Popular" badge** — dishonest until we've sold something. Use "Best Value" on Elite instead (defensible claim).
- **Unsourced stats removed from landing page** — replaced with defensible general claims. Verify real stats before ads go live (Meta may scrutinize unsourced numeric claims).
- **ROI calculator: no conversion rate assumption** — every missed call treated as lost customer. Matches prospect's mental math. Min 1 call/week, max 50.
- **Meta ads as sole acquisition channel** — dropped cold outreach. Axon wants to learn Meta ads as a skill for future ventures.
- **GHL before ads** — reordered phases so AI receptionist demo is live before any ad runs. Prospects must be able to call and experience the product.
- **Voice AI strategy: GHL native first, Vapi + ElevenLabs as upgrade path** — start with what's built in. If quality isn't good enough after testing, swap to Vapi (phone infrastructure) with ElevenLabs voices (best quality). Backend swap only, client never sees it.
- **AI sales agent: later** — Axon does the first 20+ sales calls manually to learn real objection patterns. Then we build an AI sales agent trained on real conversation data, not theory.
- **Own platform: long-term play** — use GHL as scaffolding now. Replace pieces as the business outgrows them (50+ clients). Revenue first, custom build second.
- **n8n via Docker** — auto-restart, persistent data. Machine stays on 24/7.
- **No Google Workspace needed** — GHL has its own calendar/app. Google Calendar sync works with free Gmail if wanted.
- **Business email deferred** — not needed for Meta account setup. Will set up when prospect-facing communication begins.
- **Timeline flexible** — no hard dates, sequential progress
