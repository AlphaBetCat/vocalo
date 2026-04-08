# Session Summary — AI Business Factory Vision

**Date:** 2026-04-04
**Topic:** Designing a hierarchical multi-agent framework to run entire businesses

---

## What We Discussed

### 1. Agentic Workflow Platform Research
Researched 10 platforms (n8n, LangGraph, CrewAI, AutoGen, Dify, Flowise, Make.com, Zapier, Relevance AI, Claude Agent SDK). Full report at `outputs/agentic-workflow-research.md`.

**Key finding:** n8n alone handles triggers and integrations but not true multi-agent collaboration. For real agent teamwork, need CrewAI or LangGraph.

### 2. Multi-Agent Collaboration Deep Dive
- **Benefits:** specialization, quality control via review loops, parallel speed, easier debugging
- **n8n's limitation:** can only do sequential handoff (assembly line), not true collaboration (team in a room debating/delegating/iterating)

### 3. Axon's Vision — Hierarchical AI Business Org Chart
```
CEO Agent (ethics, culture, vision)
    ↓ delegates
Manager Agents (quality control per department)
    ↓ assigns
Specialist Agents (do actual work: copy, ads, sales, support)
```
Cross-functional collaboration when tasks need multiple specialists.

### 4. Evolution to Product — The AI Business Factory
Two businesses in one:
1. **Internal tool** — runs Axon's own businesses
2. **Product** — sold to others: Builder Agent interviews customer → Architect designs org chart → Deployer spins up their AI team
- **Pitch:** "Launch a business in a day. Your AI team handles marketing, sales, ops."
- **Moat:** business knowledge encoded in agent templates (hard to copy)
- **Model:** subscription — selling a workforce, not a tool

### 5. Knowledge Files = Secret Weapon
Axon's 14 existing knowledge files map directly to agent roles (Marketing, Sales, Ads, Lead Gen, Finance, Operations, etc.). Most founders would start from scratch — Axon already has the hardest part done.

---

## Tech Stack Decision
| Component | Tool | Cost |
|-----------|------|------|
| Multi-agent framework | **CrewAI** | Free |
| AI model | **Claude API** (Sonnet + Opus) | $50-150/mo |
| Orchestration/integrations | **n8n** self-hosted | Free |
| Shared memory | **Qdrant** vector DB | Free |
| Server | **Hetzner/DigitalOcean VPS** | $20-40/mo |

**Total starting cost:** ~$70-190/month

---

## Build Timeline
- **Phase 1 (Weeks 1-4):** One department working end-to-end (Marketing recommended)
- **Phase 2 (Weeks 5-10):** Full org chart across departments
- **Phase 3 (Weeks 11-16):** The Builder Agent — meta-agent that creates agent teams for new businesses

---

## Decision Point (Pending)
- **Path A:** Start building Phase 1 with a light blueprint — learn by doing
- **Path B:** Design the full blueprint first, then build with clarity
- **Recommendation:** Path A with a light blueprint

**Next step for next session:** Pick path, then either start blueprint or start building Marketing department Phase 1.

---

## Related Files
- `outputs/agentic-workflow-research.md` — full platform comparison
- `context/current-state.md` — current project state
- `C:/Users/Administrator/.claude/projects/E--Claude-Code-projects-Business-Research/memory/user_business_vision.md` — vision memory file
