# Agentic Automation Business — Launch Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch an AI receptionist agency that acquires clients through Meta ads, delivers via GoHighLevel, and runs mostly automatically through Claude Code + n8n agent orchestration.

**Architecture:** Three-layer system — Claude Code (brain: generates content, researches prospects, builds demos), n8n running locally (nervous system: routes webhooks, schedules tasks, chains agents, sends notifications), GoHighLevel (storefront: client-facing CRM, voice AI, automations). Human review gates only at customer-facing moments.

**Tech Stack:** Claude Code, GoHighLevel (Unlimited plan), n8n (self-hosted local), Meta Ads, Discord (notifications), Vercel (landing page hosting), ElevenLabs or GHL native voice AI.

**Timeline:** 4 phases across ~6 weeks. Phase 0 starts immediately (week of 2026-03-30).

**Revenue Target:** $5,000-$6,000/mo recurring by month 3-4. First paying clients by end of month 2.

---

## The Business at a Glance

### What You Sell

| Tier | Service | Price | What It Does |
|------|---------|-------|-------------|
| **Entry** | AI Receptionist | $297-$497/mo | Answers calls 24/7, books appointments, answers FAQs, transfers urgent calls |
| **Add-on 1** | Google Review Automation | $150-$250/mo | Auto-requests reviews after service, AI responds to all reviews |
| **Add-on 2** | Missed Call Text-Back + CRM | $150-$250/mo | Texts customers who called when line was busy, basic pipeline tracking |
| **Bundle** | Full AI Front Desk | $500-$800/mo | All three services packaged together at a discount |

Full-stack client = ~$600-$800/mo. Need 8-10 clients for $5-6K/mo target.

### Who You Sell To (Starting Niches)

1. **Home service contractors** (HVAC, plumbing, electrical, roofing) — On job sites all day, miss 40-60% of calls. Average job value $500-$5,000+.
2. **Dental offices** — Front desk gets overwhelmed, patients call after hours. Average new patient LTV $1,000-$3,000.

Run both as separate ad sets. Let Meta data tell you which niche converts better. Double down on the winner.

### The Offer

"Try our AI receptionist free for 14 days. It answers your calls 24/7, books appointments, and never puts a customer on hold. If you love it, keep it for $297-$497/mo. If not, cancel with zero obligation. All I ask is honest feedback."

### The Sales Process

1. Prospect sees Meta ad → clicks → lands on your page (or fills out lead form)
2. Your own AI receptionist calls/texts them back within 60 seconds
3. They experience the product by interacting with your AI receptionist
4. AI books them a discovery call with you
5. You get on a 15-20 minute call, run the CLOSER script, offer the free trial
6. They say yes → you onboard them in GHL using a pre-built snapshot in under 1 hour
7. 14-day trial runs → you check in at day 7 and day 12
8. Trial converts to paid → recurring revenue begins

---

## Agent Architecture

### The Agents You Need

These are not separate AI systems — they are Claude Code skills/sub-agents triggered by n8n workflows or scheduled tasks.

| Agent | What It Does | Trigger | Output | Human Gate? |
|-------|-------------|---------|--------|-------------|
| **Prospect Researcher** | When a new lead comes in, researches the business: Google reviews, website, phone behavior, competitors | n8n webhook from Meta lead form or GHL | Research brief saved to `/outputs/research/` | No |
| **Demo Builder** | Creates a personalized AI receptionist demo using the research brief | Auto-triggered after Prospect Researcher completes | Demo config + personalized script saved to `/outputs/demos/` | No |
| **Outreach Drafter** | Writes personalized follow-up email/SMS for the prospect based on research | Auto-triggered after Demo Builder completes | Draft message saved to `/outputs/outreach/` + Discord notification sent | **Yes** — you approve in Discord before it sends |
| **Ad Creative Agent** | Generates new ad copy variations, analyzes performance data, suggests kills/scales | Scheduled (weekly) or on-demand | New ad drafts saved to `/outputs/ads/` + Discord notification | **Yes** — you approve before uploading to Meta |
| **Client Onboarder** | Sets up new client sub-account in GHL from snapshot, configures their specific details | Triggered when you mark a client as "sold" | Configured GHL sub-account | No (snapshot-based, deterministic) |
| **Review Manager** | Monitors and responds to Google reviews for all clients | Scheduled (daily) | Auto-responds to 4-5 star reviews; flags 1-3 star reviews to Discord for your review | **Yes** for negative reviews only |
| **Quality Monitor** | Reviews AI receptionist call logs, flags issues, generates weekly client reports | Scheduled (weekly) | Report saved to `/outputs/reports/` + Discord summary | No |
| **Report Generator** | Creates weekly/monthly performance reports for each client | Scheduled (weekly/monthly) | PDF/email report sent to client via GHL | No |

### How Agents Chain (Without You in the Middle)

```
New Lead Arrives (Meta → GHL webhook → n8n)
    │
    ├─→ n8n triggers Claude Code: "Prospect Researcher" agent
    │       Researches business, saves brief to /outputs/research/lead-123.md
    │
    ├─→ n8n detects research file complete
    │       Triggers Claude Code: "Demo Builder" agent
    │       Reads research brief, creates demo config at /outputs/demos/lead-123.md
    │
    ├─→ n8n detects demo file complete
    │       Triggers Claude Code: "Outreach Drafter" agent
    │       Reads research + demo, writes personalized follow-up
    │       Saves to /outputs/outreach/lead-123.md
    │
    └─→ n8n sends Discord notification:
            "New prospect ready: [Business Name]
             Research: [link]
             Demo: [link]
             Outreach draft: [link]
             React ✅ to approve outreach, ❌ to edit"
                │
                ├─ You react ✅ → n8n triggers GHL to send the outreach
                └─ You react ❌ → n8n notifies you to edit, waits for re-approval
```

**Key principle:** Agents chain automatically through file outputs. n8n watches for file changes and triggers the next step. You only see the final result in Discord and approve/reject. The intermediate steps flow without you.

### Where n8n Fits vs Claude Code

| n8n Does | Claude Code Does |
|----------|-----------------|
| Catches webhooks from GHL and Meta | Writes ad copy, emails, scripts |
| Watches for file changes to trigger next agent | Researches businesses |
| Sends Discord notifications | Builds demo configurations |
| Handles approval routing (Discord reactions) | Analyzes ad performance |
| Schedules recurring tasks (daily/weekly) | Generates reports |
| Connects APIs (GHL, Meta, Google, Discord) | Quality-checks call logs |

Think of it this way: n8n is the conveyor belt. Claude Code is the worker at each station.

---

## Phase 0 — Foundation (This Week: March 30 - April 5)

Everything in this phase happens BEFORE the GHL trial starts. No clock is ticking.

### Task 0.1: Set Up Business Infrastructure

**Goal:** Get the basic accounts and tools in place.

- [ ] **Step 1: Create a Facebook Business Page**

Go to facebook.com/pages/create. Choose "Business or Brand."
- Page name: Use your business name (or a placeholder like "AI Front Desk" until you decide)
- Category: "Business Service" or "Marketing Agency"
- Add a simple profile photo and cover image (can be text-based, created in Canva)
- You need this page to run Meta ads — it's the identity behind your ads

- [ ] **Step 2: Create a Meta Business Manager account**

Go to business.facebook.com. Create an account.
- Add your Facebook Page to the Business Manager
- This is where you'll manage ad accounts, pages, and pixels from one dashboard

- [ ] **Step 3: Create a Meta Ad Account**

Inside Business Manager → Ad Accounts → Create
- Set currency to USD, timezone to Mountain Time
- Add a payment method (credit/debit card)

- [ ] **Step 4: Install Meta Pixel on your landing page (after Task 0.3)**

The pixel tracks visitors and conversions. You'll add it to your landing page later.
- Business Manager → Data Sources → Pixels → Create
- Name it something like "[Business Name] Pixel"
- Save the pixel ID — you'll embed it in the landing page code

- [ ] **Step 5: Set up a Discord server for business notifications**

Create a new Discord server (e.g., "AI Front Desk HQ")
- Create channels:
  - `#new-leads` — notifications when new prospects come in
  - `#approvals` — outreach drafts waiting for your approval
  - `#ad-performance` — weekly ad performance summaries
  - `#client-alerts` — negative reviews, quality issues, urgent items
  - `#daily-digest` — daily summary of everything that happened
- Create a webhook URL for each channel (Server Settings → Integrations → Webhooks)
- Save these webhook URLs — n8n will use them to send notifications

- [ ] **Step 6: Set up n8n locally**

Open a terminal and run:
```bash
npx n8n
```
Or install via Docker if preferred. Access at http://localhost:5678.
- Create an account
- This will be your workflow automation hub
- We will configure specific workflows in Phase 1

---

### Task 0.2: Craft the Offer and Sales Materials

**Goal:** Lock down exactly what you're selling, how you describe it, and the sales script you'll use on calls.

- [ ] **Step 1: Write the core offer document**

This is the one-page document that describes your service. Claude Code will draft this based on the frameworks from your research. The offer doc follows this structure:

**Headline:** "Never Miss Another Customer Call — AI Receptionist That Works 24/7 For Less Than $17/Day"

**The Problem (3 bullets):**
- "62% of calls to local businesses go unanswered — each one is a lost customer"
- "Hiring a receptionist costs $2,000-$4,000/month and they still miss calls after hours"
- "Your competitors who answer faster get the job. Speed to lead = speed to revenue"

**The Solution (what they get):**
- AI receptionist that answers every call within 2 rings, 24/7/365
- Books appointments directly into their calendar
- Answers common questions about services, pricing, hours
- Transfers urgent calls to their cell phone
- Sends them a text summary after every call

**The Guarantee:**
"Try it free for 14 days. If you don't love it, cancel with zero obligation. No contracts. No setup fees. No risk."

**Price:** $297/mo (contractors) or $497/mo (dental/medical)

**CTA:** "Book a free demo call — or better yet, call this number and experience it yourself: [your AI receptionist number]"

- [ ] **Step 2: Write the CLOSER sales script**

For your 15-20 minute discovery calls. Structure:

**C — Clarify (2 min):**
"Hey [Name], thanks for booking this call. Just so I'm clear — you saw our ad about the AI receptionist for [HVAC/dental] businesses, right? What made you interested enough to book?"

**L — Label (3 min):**
"So it sounds like you're dealing with [missed calls / overwhelmed front desk / after-hours leads going to voicemail]. Would you say that's a fair summary?"

**O — Overview past attempts (3 min):**
"What have you tried so far to solve this? Answering service? Extra staff? Just letting it ring?"
(Pull teeth: "Can you give me an example of a time you lost a customer because of this?")

**S — Sell the vacation (5 min):**
"Imagine this: tomorrow morning, every call to your business gets answered instantly. The AI knows your services, your pricing, your availability. It books appointments right into your calendar. You wake up to 3 new appointments booked overnight. That's what this does."
- Show them: "Actually, let me prove it. Call this number right now: [demo number]."
- They call, experience the AI, come back impressed.

**E — Explain away concerns (3 min):**
- "What if the AI says something wrong?" → "We customize it with your exact services, prices, and FAQs. And any call it can't handle gets transferred directly to your cell."
- "What if my customers don't like it?" → "That's what the 14-day trial is for. If a single customer complains, cancel free."
- "I already have a receptionist." → "This handles the 30% of calls your receptionist misses — after hours, lunch breaks, sick days, hold times."

**R — Reinforce (2 min):**
"So here's what happens next: I set up your AI receptionist this week, customized to your business. For 14 days it answers your calls for free. You watch it work. If you love it — and I think you will — it's $297/mo. Less than $10 a day. What do you think?"
(Pause. Wait 8+ seconds. Let them answer.)

- [ ] **Step 3: Write objection response cards**

Quick reference for common objections during sales calls:

| Objection | Response |
|-----------|----------|
| "It's too expensive" | "A missed call costs you $500-$5,000 in lost revenue. This is $10/day. How many calls do you miss per week?" |
| "I need to think about it" | "Totally fair. What specifically do you want to think about? Maybe I can help clarify right now." |
| "I don't trust AI on the phone" | "Call the demo number right now. You'll see exactly what your customers experience. If it feels off, I'll tell you myself this isn't a fit." |
| "What if it breaks?" | "You get a direct line to me. If anything goes wrong, I fix it same day. And your calls always have a fallback to your cell." |
| "I already have an answering service" | "What are you paying? [Usually $300-$800/mo]. This does more for less — plus it books appointments directly into your calendar, which answering services don't do." |
| "Can I talk to other businesses using it?" | "Absolutely. Let me connect you with [testimonial client] — they've been using it for [X weeks]." (Use this once you have 1-2 happy clients.) |

---

### Task 0.3: Build the Landing Page

**Goal:** A simple, high-converting landing page that captures leads. Hosted on Vercel (free).

- [ ] **Step 1: Design and build the landing page**

Claude Code will build a single-page site with these sections:

**Above the fold:**
- Headline: "Never Miss Another Customer Call"
- Subheadline: "AI receptionist that answers 24/7, books appointments, and pays for itself in the first week. Try it free for 14 days."
- CTA button: "Book a Free Demo" (scrolls to booking form)
- Phone number: "Or call now and experience it yourself: [number]"

**Problem section (3 pain points):**
- "You're losing customers every time a call goes to voicemail"
- "Hiring staff costs $2,000-$4,000/month — and they still miss calls"
- "Your fastest competitor wins the job. Every time."

**Solution section (what they get):**
- Answers every call in 2 rings, 24/7/365
- Books appointments into your calendar automatically
- Answers questions about your services, pricing, and hours
- Transfers urgent calls to your cell phone
- Text summary after every call so you never miss a detail

**How it works (3 steps):**
1. "We customize the AI to your business (takes 1 day)"
2. "Calls to your business number get answered instantly by AI"
3. "You get more booked appointments and zero missed calls"

**ROI calculator (interactive):**
- "How many calls do you miss per week?" [slider: 5-50]
- "What's your average job value?" [slider: $200-$10,000]
- "You're losing approximately $X/month in missed revenue"
- "Our AI receptionist costs $297/mo. Your ROI: X%"

**Testimonials section:**
- Placeholder for now: "Join [X] businesses that never miss a call"
- Will be populated with real testimonials after first clients

**Pricing:**
- $297/mo for home service contractors
- $497/mo for dental/medical offices
- "14-day free trial. No contracts. Cancel anytime."

**Final CTA:**
- Booking form (name, business name, phone, niche)
- "Or call our AI receptionist right now: [number]"

**Technical details:**
- Built with HTML/CSS/JS (or Next.js if we want dynamic features like the ROI calculator)
- Hosted on Vercel (free tier)
- Meta Pixel installed in the header
- Form submissions go to a webhook that n8n catches

- [ ] **Step 2: Deploy to Vercel**

```bash
cd landing-page
vercel --prod
```

- [ ] **Step 3: Connect domain (optional)**

If you buy a domain (e.g., aifrontdesk.com), connect it via Vercel dashboard.
Otherwise, the Vercel URL works fine for ads initially.

- [ ] **Step 4: Install Meta Pixel**

Add the pixel code from Step 0.1.4 to the landing page's `<head>` tag.
Add conversion tracking to the form submission event.

---

### Task 0.4: Create Ad Creatives

**Goal:** Create 10-15 ad variations across 2 niches (contractors + dental). Test at $5/day per ad set.

- [ ] **Step 1: Write ad copy variations**

Claude Code will generate these using the frameworks from your research files. Each ad needs:
- A hook (first line — this is the targeting)
- Body copy (the pitch — grade 3-5 reading level)
- CTA

**Contractor ads (6-8 variations):**

*Variation 1 — Pain/stat hook:*
> "HVAC business owners: you're missing 40% of your calls while you're on a job site.
>
> Every missed call is a $500-$5,000 job going to your competitor. Our AI receptionist answers every call in 2 rings, 24/7. It knows your services, your pricing, and your availability. It books appointments directly into your calendar.
>
> Less than $10/day. 14-day free trial.
>
> Book a demo or call our AI right now and test it yourself."

*Variation 2 — Story hook:*
> "A plumber in Utah set up an AI receptionist on a Monday. By Friday, it had booked 11 appointments he would have missed.
>
> It answers every call instantly — nights, weekends, when you're on a job. It knows your services and books directly into your calendar.
>
> $297/month. 14-day free trial. No contracts.
>
> Call this number right now and see for yourself."

*Variation 3 — Question hook:*
> "How many calls did your business miss last week?
>
> For most contractors, it's 5-15. At $500+ per job, that's $2,500-$7,500 in lost revenue. Every week.
>
> Our AI receptionist answers every call, 24/7. Books appointments. Answers questions. Transfers urgent calls to your cell.
>
> Try it free for 14 days. Call our demo line and test it yourself."

*Variation 4 — Direct challenge:*
> "Your customers are calling your competitors right now.
>
> Not because they're better. Because they answered the phone and you didn't.
>
> AI receptionist. Answers every call. Books every appointment. $10/day.
>
> 14-day free trial. No risk. Call our AI right now."

*Create 2-4 more variations following these patterns: before/after, ROI math, "what if" scenario, competitor comparison.*

**Dental ads (6-8 variations):**

*Variation 1 — Pain hook:*
> "Dental offices: how many new patients called today and got put on hold?
>
> 34% of callers hang up after 60 seconds of hold time. They call the next dentist on Google.
>
> Our AI receptionist answers instantly, schedules appointments, and answers questions about insurance, services, and hours. 24/7. No hold times. Ever.
>
> $497/month. 14-day free trial.
>
> Call our demo right now and experience it."

*Create 5-7 more variations following similar patterns, adapted for dental pain points: after-hours calls, staff sick days, lunch hour coverage, new patient intake.*

- [ ] **Step 2: Create ad images**

For each variation, create a simple image. Options:
- Text-on-solid-color (e.g., bold white text on dark blue: "You missed 47 calls last month. We would have answered all of them.")
- Before/after split (left: phone ringing with "Missed Call" notification. Right: "Appointment Booked — 2:30 PM Thursday")
- Screenshot mockup of a text message: "Hi! Thanks for calling [Business Name]. I'd love to help you schedule an appointment..."

Tools: Canva (free), or Claude Code can generate simple HTML-based ad images.

No stock photos of smiling receptionists. Raw, native-looking content outperforms polished graphics.

- [ ] **Step 3: Set up Meta ad campaign structure**

Campaign structure (following your research's best practices):

```
Campaign: AI Receptionist — Testing (ABO)
├── Ad Set: Contractors — Variation 1 ($5/day)
├── Ad Set: Contractors — Variation 2 ($5/day)
├── Ad Set: Contractors — Variation 3 ($5/day)
├── Ad Set: Contractors — Variation 4 ($5/day)
├── Ad Set: Dental — Variation 1 ($5/day)
├── Ad Set: Dental — Variation 2 ($5/day)
├── Ad Set: Dental — Variation 3 ($5/day)
└── Ad Set: Dental — Variation 4 ($5/day)
```

- Objective: Leads (or Traffic → landing page, depending on whether you use instant forms)
- Placement: Facebook + Instagram feeds (start here, expand later)
- Targeting: Broad. Let the ad copy do the targeting. The hook "HVAC business owners:" self-selects the audience. You can add interest targeting (e.g., "Small business owners," industry-specific interests) but keep it loose — Meta's Andromeda algorithm works best with broad audiences and specific creative.
- Budget: $5/day per ad set = $40/day total for 8 ad sets = ~$280/week
- Run for 72 hours minimum before making any changes

- [ ] **Step 4: Set up lead capture**

Two options (run both and compare):

**Option A — Meta Instant Lead Form:**
- Built into Meta Ads Manager
- Fields: Name, Business Name, Phone, Email, "What type of business do you run?"
- Auto-fills from Facebook profile (lower friction, more leads, lower quality)
- Webhook to n8n → n8n sends to GHL + triggers Prospect Researcher agent

**Option B — Landing Page:**
- Ad links to your Vercel landing page
- Form on the page captures leads
- Webhook to n8n → same flow as above

Start with both. Compare cost-per-lead and lead quality after 2 weeks.

- [ ] **Step 5: Set kill/scale rules**

After 72 hours:
- Kill any ad set with CTR below 1.25%
- Kill any ad set with cost-per-lead above 2x your target ($30+ for contractors, $50+ for dental is too high to start)
- Scale winners: increase budget by $2-3/day every 48 hours on ad sets with CTR above 2% and acceptable CPL
- After 1-2 weeks, move proven winners into a new Scaling campaign (CBO) at higher budget

---

## Phase 1 — Build the Product (Week 2: April 6-12)

This is when the GHL 30-day trial starts. Time the trial start so that ads are running and leads are starting to come in.

### Task 1.1: Set Up GoHighLevel

**Goal:** Full agency setup with a master template (snapshot) and your own business sub-account.

- [ ] **Step 1: Sign up for GHL Unlimited plan (30-day free trial)**

Go to gohighlevel.com. Select the Unlimited plan ($297/mo after trial).
- This gives you unlimited sub-accounts (one per client) and agency features
- Start this ONLY after your ads are set up and ready to launch (or already running)

- [ ] **Step 2: Configure agency settings**

Settings → Agency:
- Add your business name and logo (placeholder is fine)
- Set up white-label domain if you have one
- Configure LeadConnector (white-label mobile app for clients)

- [ ] **Step 3: Create your "Sandbox" sub-account**

This is your master template. Every client account will be cloned from this.

Create a sub-account called "TEMPLATE — AI Receptionist"
- This is NOT a client account — it's your blueprint
- Everything you build here gets snapshotted and deployed to each new client

- [ ] **Step 4: Build the AI Receptionist in the sandbox**

Inside the sandbox sub-account → AI Agents:

**Create Voice Agent:**
- Name: "[Business Name] AI Receptionist"
- Goal: "Answer inbound calls. Greet the caller warmly. Determine their need. If they want to book an appointment, check availability and book it. If they have questions about services, pricing, or hours, answer from the knowledge base. If it's urgent or the AI can't help, transfer to the business owner's cell phone."
- Instructions: (Detailed prompt covering greeting, question handling, appointment booking, transfer rules, call wrap-up)
- Personality: "Professional, friendly, efficient. Speak naturally — not robotic. Use the caller's name when possible. Keep responses concise."
- Voice speed: Moderate
- Voice temperature: 105
- Max call duration: 15 minutes
- Phone number: Buy a GHL number (~$1/month)

**Connect calendar:**
- Create a calendar in GHL for appointment booking
- Set default business hours (customize per client later)
- Create appointment types: "Service Appointment," "Consultation," "Estimate"

**Build knowledge base:**
- Create a template knowledge base with placeholders:
  - Business hours: [CUSTOMIZE]
  - Services offered: [CUSTOMIZE]
  - Pricing: [CUSTOMIZE]
  - FAQs: [CUSTOMIZE]
  - Address: [CUSTOMIZE]
  - Transfer number: [CUSTOMIZE]

- [ ] **Step 5: Build core automations/workflows**

Inside the sandbox, create these workflows:

**Workflow 1 — Missed Call Text-Back:**
- Trigger: Call missed
- Action: Wait 30 seconds → Send SMS: "Hi! Sorry we missed your call at [Business Name]. How can we help? Reply here or we'll call you right back."
- If they reply → route to AI chat agent or notify business owner

**Workflow 2 — Post-Appointment Review Request:**
- Trigger: Appointment status changed to "Completed"
- Action: Wait 2 hours → Send SMS: "Thanks for choosing [Business Name]! If you had a great experience, we'd love a quick Google review: [Google Review Link]. It means a lot to us!"
- If no review after 3 days → Send follow-up (once only)

**Workflow 3 — New Lead Notification:**
- Trigger: New contact created (from form, call, or chat)
- Action: Send webhook to n8n with contact details → n8n triggers agent chain

**Workflow 4 — Appointment Reminder:**
- Trigger: Appointment booked
- Action: Send SMS confirmation immediately
- 24 hours before: Send reminder SMS with confirm/reschedule options
- 1 hour before: Final reminder

- [ ] **Step 6: Create the snapshot**

Once the sandbox is fully configured:
- Go to Settings → Company → Snapshots → Create Snapshot
- Name it "AI Receptionist — Master Template v1"
- Enable IP protection (prevents clients from exporting)
- This snapshot is now deployable to any new client sub-account in seconds

- [ ] **Step 7: Set up YOUR business sub-account**

Create a new sub-account for your own business (your agency).
- Load the snapshot
- Customize: your business name, your services (AI receptionist agency), your calendar availability for sales calls
- Connect a phone number — this is the number prospects will call
- Your own AI receptionist answers calls from prospects and books sales meetings with you
- This is your live demo: "The AI that just booked this call? That's what I build for businesses like yours."

---

### Task 1.2: Set Up n8n Workflows

**Goal:** Wire up the automation chain so leads flow from Meta → GHL → Claude Code agents → Discord → back to GHL, without you touching anything until the approval gate.

- [ ] **Step 1: Create the Master Lead Flow**

In n8n (http://localhost:5678), create a new workflow:

**"New Lead → Research → Demo → Outreach → Approve"**

Nodes:
1. **Webhook node** — receives lead data from GHL workflow or Meta lead form
2. **Claude Code node** (Execute Command) — runs Prospect Researcher agent
   - Command: `claude -p "Research this business: [business name], [phone], [location]. Find their Google reviews, website, services, competitors. Save a brief to /outputs/research/[lead-id].md"`
3. **Wait node** — waits for research file to be created (or use a delay of 2-3 minutes)
4. **Claude Code node** — runs Demo Builder agent
   - Command: `claude -p "Read /outputs/research/[lead-id].md. Create a personalized AI receptionist demo script for this business. Save to /outputs/demos/[lead-id].md"`
5. **Wait node** — waits for demo file
6. **Claude Code node** — runs Outreach Drafter agent
   - Command: `claude -p "Read /outputs/research/[lead-id].md and /outputs/demos/[lead-id].md. Write a personalized follow-up SMS and email for this prospect. Save to /outputs/outreach/[lead-id].md"`
7. **Discord node** — sends message to #approvals channel:
   - "New prospect ready: [Business Name]"
   - Attaches research summary, demo preview, outreach draft
   - "React ✅ to send, ❌ to skip"
8. **Wait for webhook node** — waits for Discord reaction (via a Discord bot or n8n's built-in Discord trigger)
9. **IF node** — if approved:
   - **GHL API node** — sends the outreach email/SMS via GHL
   - **Discord node** — confirms in #new-leads: "Outreach sent to [Business Name]"
10. **IF node** — if rejected:
    - **Discord node** — "Skipped [Business Name]. Noted."

- [ ] **Step 2: Create the Daily Digest Flow**

Scheduled workflow that runs at 8 PM daily:

1. **Schedule trigger** — 8 PM Mountain Time
2. **Claude Code node** — "Summarize today's activity: new leads, outreach sent, appointments booked, calls handled. Read from /outputs/ and GHL API. Format as a brief daily digest."
3. **Discord node** — sends digest to #daily-digest

- [ ] **Step 3: Create the Weekly Ad Review Flow**

Scheduled workflow that runs every Monday:

1. **Schedule trigger** — Monday 9 AM
2. **Claude Code node** — "Pull ad performance data from Meta Ads API. Analyze: which ads are winning (CTR, CPL), which should be killed, which should be scaled. Generate 3-5 new ad copy variations based on winning patterns. Save recommendations to /outputs/ads/weekly-review-[date].md"
3. **Discord node** — sends summary to #ad-performance with recommendations
4. **Wait for approval** — you review and approve changes
5. **Execute** — Claude Code makes the approved changes in Meta Ads Manager

- [ ] **Step 4: Create the Review Management Flow**

Scheduled workflow that runs every 6 hours:

1. **Schedule trigger** — every 6 hours
2. **GHL API node** — pull new Google reviews for all client sub-accounts
3. **IF node** — if 4-5 stars:
   - **Claude Code node** — generate a personalized, professional response
   - **GHL API node** — auto-post the response
   - **Discord node** — log to #client-alerts: "Auto-responded to 5-star review for [Client]"
4. **IF node** — if 1-3 stars:
   - **Claude Code node** — draft a response (empathetic, professional, offers resolution)
   - **Discord node** — send to #approvals: "Negative review for [Client]. Draft response: [text]. React ✅ to post."
   - Wait for approval before posting

---

### Task 1.3: Set Up Cold Outreach (Supplementary Channel)

**Goal:** While ads are running, also do direct outreach to accelerate client acquisition.

- [ ] **Step 1: Build a prospect list**

Use Outscraper or Google Maps scraping to find:
- HVAC companies in major metro areas (start with Utah, expand to AZ, TX, FL — high-density contractor markets)
- Dental offices in suburbs (where competition for patients is fierce)
- Filter: businesses with Google reviews (they exist and care about online presence), fewer than 50 reviews (still growing), 3.5-4.5 star average (room for improvement)

Save to a spreadsheet: Business Name, Phone, Email, Google Review Count, Rating, Website, City

- [ ] **Step 2: Set up cold email infrastructure**

- Buy 3-5 domains similar to your business name ($10-$15 each/year)
- Set up 2 email inboxes per domain using Google Workspace or Zoho ($5/inbox/month)
- Warm up inboxes for 2-3 weeks before sending (use a warmup service like Instantly's built-in warmup)
- This means cold email won't be active until ~week 4-5, which is fine — ads are the primary channel

- [ ] **Step 3: Write cold email sequence**

**Email 1 (Day 1):**
> Subject: quick question about [Business Name]
>
> Hey [First Name],
>
> I called [Business Name] at 6 PM yesterday — got voicemail.
>
> I help [HVAC companies / dental offices] capture those after-hours calls with an AI receptionist that answers 24/7 and books appointments into your calendar.
>
> Costs less than $10/day and I set it up for free. 14-day trial, cancel anytime.
>
> Worth a quick call?

**Email 2 (Day 3):**
> Subject: re: quick question
>
> Hey [First Name],
>
> Quick follow-up. A [plumber/dentist] in [City] set this up last month and picked up 9 appointments in the first week that would have gone to voicemail.
>
> Happy to show you a live demo — takes 5 minutes.
>
> Interested?

**Email 3 (Day 7):**
> Subject: last one
>
> [First Name] — not trying to fill your inbox. Just figured you might want to see this before your competitor does.
>
> [Link to landing page]
>
> Either way, good luck with [Business Name].

- [ ] **Step 4: Automate with Instantly or SmartLead**

Load prospect list → load email sequence → set send limits (25/inbox/day) → launch.
- Replies go to a unified inbox
- Set up webhook: when someone replies interested → n8n catches it → triggers the same agent chain as Meta leads

---

## Phase 2 — Launch (Week 3: April 13-19)

### Task 2.1: Go Live

- [ ] **Step 1: Launch Meta ads**

Turn on all ad sets. $5/day each. Do NOT touch for 72 hours.

- [ ] **Step 2: Activate your own AI receptionist**

Your GHL sub-account is live. Your AI answers calls from prospects. Test it thoroughly:
- Call from your cell phone
- Call from a friend's phone
- Test edge cases: ask a weird question, try to book outside hours, ask to speak to a human
- Fix anything that sounds off

- [ ] **Step 3: Activate n8n workflows**

Turn on all n8n workflows:
- Master Lead Flow (webhook active, waiting for leads)
- Daily Digest (scheduled)
- Weekly Ad Review (scheduled for next Monday)

- [ ] **Step 4: Monitor for first 72 hours**

Check Discord channels 2-3x/day for the first few days. This is the shakout period.
- Are leads coming in?
- Are the agents producing good research briefs?
- Are the outreach drafts well-written?
- Is the AI receptionist handling calls well?

Adjust and fix issues as they appear. After the first week, you should be able to drop to once-daily batch review.

---

### Task 2.2: First Sales Calls

- [ ] **Step 1: When leads come in and book calls, run the CLOSER script**

You prepared this in Task 0.2. Key moves:
- Let them call your AI receptionist first (they experience the product)
- On the call, reference what just happened: "The AI that just handled your call? That's exactly what I set up for your business."
- Offer the 14-day free trial
- Handle objections with your reference cards
- Book the onboarding session right there on the call

- [ ] **Step 2: Onboard the first client**

When someone says yes to the free trial:
1. Create a new sub-account in GHL
2. Load the snapshot
3. Customize: their business name, services, hours, pricing, FAQs, calendar, transfer number
4. Buy a GHL phone number for their account (~$1/mo)
5. Either forward their existing business number to the GHL number, or give them the new number to publish
6. Test the AI with 3-5 test calls
7. Go live
8. Send them a welcome email/text with what to expect

Total onboarding time: ~1 hour per client.

- [ ] **Step 3: Set up the client's review automation and missed call text-back**

These are already in the snapshot. Just customize:
- Their Google Business Profile review link
- Their specific SMS messaging
- Their missed call response text

Offer these as add-ons during or after the trial: "By the way, I also set up automatic review requests and missed call text-back. Want me to turn those on too? It's an extra $150-$250/mo each."

---

## Phase 3 — Optimize and Scale (Weeks 4-6+: April 20 onward)

### Task 3.1: Optimize Ads

- [ ] **Step 1: Review ad performance at day 7**

Using the Weekly Ad Review agent's output:
- Kill underperforming ad sets (CTR < 1.25%, CPL too high)
- Scale winners (increase budget $2-3/day every 48 hours)
- Generate 3-5 new variations based on winning patterns
- Launch new variations at $5/day

- [ ] **Step 2: Move winners to Scaling campaign**

Once you have 3-5 proven winners:
- Create a new campaign (CBO) with higher budget
- Move winning creatives in
- Let Meta optimize delivery across the winners

- [ ] **Step 3: Iterate monthly**

Budget allocation going forward: 70% reskins of proven winners, 20% adjacent concepts, 10% experimental.

---

### Task 3.2: Collect Testimonials

- [ ] **Step 1: Automate testimonial collection**

At day 10 of each client's trial, n8n triggers:
- SMS: "Hey [Name], you've been using your AI receptionist for 10 days. How's it going? If you're happy with it, would you be open to a quick 2-minute video testimonial? I'll give you [incentive — extra month at 50% off, free add-on, etc.]."
- If they agree → send them a video recording link (Loom, or just ask them to text you a selfie video)

- [ ] **Step 2: Add testimonials to landing page and ads**

Real testimonials from real business owners are the most powerful ad creative you can have.
- Add video testimonials to the landing page
- Create new ad variations featuring the testimonial: "Here's what [Name], a [plumber/dentist] in [City] said after 2 weeks..."
- These will outperform your original ads significantly

---

### Task 3.3: Add Bilingual (English + Spanish) AI Receptionist

**Goal:** Differentiate from every other AI receptionist agency by offering bilingual support. Almost nobody does this. Axon speaks Spanish fluently and can personally QA the experience.

- [ ] **Step 1: Build Spanish-language AI receptionist in GHL sandbox**

Duplicate the English voice agent. Modify:
- All prompts and instructions translated to natural, conversational Spanish (not robotic Google Translate Spanish)
- Greeting: "¡Hola! Gracias por llamar a [Business Name]. ¿En qué le puedo ayudar?"
- Knowledge base: duplicate and translate all FAQ entries, services, pricing
- Voice: select a native Spanish voice option (GHL and ElevenLabs both offer Spanish voices)
- Test extensively — call it yourself and have natural conversations in Spanish

- [ ] **Step 2: Build auto-language-detection flow (if supported)**

Two approaches depending on platform capability:
- **Option A — Auto-detect:** Configure the AI to detect the caller's language in the first few seconds and switch automatically. If the caller says "Hola" or speaks Spanish, the AI continues in Spanish. If English, stays in English. This is the premium experience.
- **Option B — Two numbers:** Give clients two phone numbers — one English, one Spanish. They publish both. Simpler to build, still effective.

Test Option A first. Fall back to Option B if auto-detection isn't reliable enough.

- [ ] **Step 3: Create Spanish-language ad campaign**

Target Spanish-speaking business owners with ads in Spanish:
- "Dueños de negocios de HVAC: ¿Cuántas llamadas pierden cada semana?"
- "Recepcionista con IA que habla inglés y español. 24/7. Prueba gratis por 14 días."
- Run as a separate ad set at $5/day
- This targets an underserved market — almost no one is running AI receptionist ads in Spanish

- [ ] **Step 4: Create bilingual marketing materials**

- Bilingual landing page (toggle or separate /es page)
- Bilingual offer doc
- Bilingual sales script (Axon conducts these calls in Spanish when appropriate)

- [ ] **Step 5: Price and position bilingual as a premium feature**

Two options:
- **Premium pricing:** Bilingual receptionist at $397-$597/mo (vs $297-$497 English-only)
- **Differentiator:** Same price, but bilingual is the feature that wins deals over competitors

Start with premium pricing. If it's blocking sales, drop to same price and use it as a competitive advantage instead.

- [ ] **Step 6: Update snapshot**

Create a new snapshot: "AI Receptionist — Bilingual Master Template v1"
- Includes both English and Spanish voice agents
- All workflows support bilingual SMS/email templates
- Review request templates in both languages

---

### Task 3.4: Add Services and Increase Revenue Per Client

- [ ] **Step 1: Upsell existing clients on add-ons**

After 30 days of paid service, reach out:
- "Your AI receptionist booked [X] appointments this month. Want to also turn on automatic review requests? Most of my clients see 5-10 new Google reviews per month. It's $150/mo."
- "I noticed you had [X] missed calls that went to text-back. Want me to add a CRM so you can track every lead through your pipeline? $200/mo."

- [ ] **Step 2: Build referral system**

Happy clients are your best lead source.
- Offer: "Refer another business owner. If they sign up, you get one month free."
- Set up a simple referral tracking workflow in GHL

- [ ] **Step 3: Raise prices for new clients**

After you have 5+ clients and testimonials:
- New client pricing: $397-$597/mo for receptionist (up from $297-$497)
- Existing clients stay at their original rate (grandfather them)
- Your service is proven, your testimonials are strong, your price reflects that

---

## Phase 4 — Full Automation (Month 3+)

### Task 4.1: Remove Yourself from Daily Operations

- [ ] **Step 1: Trust the agent chain**

After 4-6 weeks of reviewing outreach drafts and approving them:
- If 90%+ of your approvals are "yes" with no edits → remove the approval gate for outreach
- Keep the approval gate for negative review responses (always)
- Keep the approval gate for new ad creatives (always, at least initially)

- [ ] **Step 2: Automate client reporting**

The Report Generator agent sends clients a weekly email:
- Calls answered
- Appointments booked
- Reviews collected
- Missed call text-backs sent

This reduces "how's it going?" support requests to near zero.

- [ ] **Step 3: Automate onboarding**

Once you've onboarded 10+ clients and the process is stable:
- Build a self-service onboarding form: "Tell us about your business" (name, services, hours, FAQs)
- Claude Code agent reads the form, configures the GHL sub-account from the snapshot, creates the demo
- You review the finished setup in 5 minutes instead of spending 1 hour building it

- [ ] **Step 4: Your weekly involvement target**

By month 3-4, your weekly tasks should be:
- **Monday (30 min):** Review weekly ad performance digest in Discord. Approve/reject new ad creatives. Approve/reject ad scaling decisions.
- **Tuesday-Friday (15 min/day):** Glance at Discord #approvals for any negative review responses or flagged issues. Handle any sales calls booked by your AI receptionist.
- **Weekend:** Off.

Total: ~2-3 hours/week of active management, plus sales calls as they come in.

---

## Financial Projections

### Costs (Monthly)

| Item | Month 0 | Month 1 | Month 2+ |
|------|---------|---------|----------|
| GHL Unlimited | $0 (trial) | $0 (trial) | $297 |
| Meta Ad Spend | $280-$600 | $400-$800 | $400-$800 |
| Claude Code | ~$20-$50 | ~$20-$50 | ~$20-$50 |
| GHL Phone Numbers | $0 | ~$5 | ~$10-$20 |
| Cold Email (Instantly) | $0 | $37 | $37 |
| Domains (cold email) | ~$15 (one-time) | $0 | $0 |
| n8n | $0 (local) | $0 (local) | $0 (local) |
| Discord | $0 | $0 | $0 |
| **Total** | **~$315-$665** | **~$462-$892** | **~$764-$1,204** |

### Revenue (Monthly)

| Scenario | Clients | Avg Revenue/Client | Monthly Revenue | Monthly Profit |
|----------|---------|-------------------|-----------------|----------------|
| Conservative | 6 | $450 | $2,700 | $1,500-$1,900 |
| Target | 10 | $500 | $5,000 | $3,800-$4,200 |
| Stretch | 15 | $550 | $8,250 | $7,000-$7,500 |
| Scale | 25 | $600 | $15,000 | $13,800-$14,200 |

The unit economics get better with scale because your fixed costs (GHL, Claude Code, n8n) stay the same while revenue grows linearly with each new client.

### Break-Even

You need **2-3 paying clients** to cover all costs. At $297-$497/mo per client, 3 clients = $891-$1,491/mo revenue vs ~$800-$1,200/mo costs. Everything after client #3 is profit.

---

## Key Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Meta ads don't convert | Cold outreach as backup channel. Iterate on creative — don't give up after one round. Your research shows 20-30 variations are needed to find winners. |
| AI receptionist quality isn't good enough | Test extensively before onboarding clients. Use GHL's native voice AI first; upgrade to ElevenLabs if quality isn't sufficient. Quality is your #1 priority. |
| GHL trial expires before revenue | Start ads before the trial. Have leads in pipeline on day 1 of trial. Worst case, $297/mo for GHL is low risk. |
| Clients churn after trial | Over-deliver during the trial. Check in at day 3, 7, and 12. Make cancellation feel like losing something valuable (missed calls = lost revenue). |
| Getting overwhelmed with setup/sales | Batch everything. Set specific hours for sales calls. Use the snapshot system so onboarding takes <1 hour. |
| AI makes mistakes on calls | Set up the Quality Monitor agent to review every call log. Flag and fix issues immediately. Transfer-to-human as the safety net for anything the AI can't handle. |

---

## Summary: What You Do vs What the AI Does

| You Do | The AI Does |
|--------|------------|
| Approve outreach drafts (Discord reaction) | Research prospects, write outreach, build demos |
| Handle sales calls (15-20 min each) | Answer all inbound calls, book your sales meetings |
| Review weekly ad performance (30 min/week) | Analyze ads, generate new variations, recommend kills/scales |
| Approve negative review responses | Auto-respond to positive reviews, draft negative review responses |
| Make strategic decisions (pricing, niches, offers) | Generate reports, monitor quality, send daily digests |
| Onboard new clients (~1 hr each, decreasing over time) | Set up accounts from snapshots, configure automations |

---

*Plan created: 2026-03-30. Ready for execution.*
