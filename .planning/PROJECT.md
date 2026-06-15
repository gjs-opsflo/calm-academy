# CALM Academy

## What This Is

CALM Academy is a comprehensive Architecture as Code certification course built on FINOS CALM 1.2, positioned as the proposed official FINOS educational program — analogous to what CKA is for Kubernetes and Terraform Associate is for IaC. It targets architects, platform engineers, security architects, and AI/ML engineers (especially in FSI) who need to move from static diagrams to versioned, validated, AI-consumable architecture specifications. Delivered as text lessons + interactive labs + quizzes on a Docusaurus site, with slides and video as derived assets.

## Core Value

A learner who completes Module 0 produces a validated `.calm.json` in under 15 minutes — before learning a single spec rule. Everything else in the course explains why that works and what to do with it.

## Requirements

### Validated

- ✓ Curriculum designed — CURRICULUM.md (7 modules, ~20 hours, 3 cert levels)
- ✓ FINOS proposal authored — PROPOSAL.md
- ✓ Gemara 7-layer model research completed — `.planning/research/gemara-analysis.md`
- ✓ FINOS ecosystem research completed — `.planning/research/finos-ecosystem.md`
- ✓ FINOS architecture-as-code repo intel — `.planning/intel/finos-aac-ecosystem.md`
- ✓ Repo bootstrapped with full directory structure, CLAUDE.md, authoring standards

### Active

**Milestone 1 — First Public Draft (Phases 1–8)**

- [ ] MOD-01: Module 0 text lessons (5 chapters) + lab (15-min on-ramp) — hook learner, prove pipeline
- [ ] MOD-02: Module 1 text lessons (5 chapters) + quiz + slides — foundational AaC case
- [ ] MOD-03: Module 2 text lessons (7 chapters) + lab + quiz + cheatsheet — CALM language fundamentals
- [ ] MOD-04: Module 3 text lessons (7 chapters) + lab + quiz — CALM ecosystem (CLI, Studio, Hub, CI/CD)
- [ ] MOD-05: Module 4 text lessons + labs 4A/4B + quiz — Governance, Gemara, CALM Guard
- [ ] MOD-06: Module 5 text lessons + labs 5A/5B/5C + quiz — AI-native architecture, ai:* types, AIGF
- [ ] MOD-07: Module 6 text lessons + capstone A/B/C kits — Enterprise adoption, capstones
- [ ] SITE-01: Docusaurus site production-quality, public soft launch
- [ ] ILL-01: Illustrations authored for all modules (Excalidraw B&W)
- [ ] CODE-01: All code-examples/ validate with `calm validate`

### Out of Scope (this milestone)

- Video production (Variant A/B) — deferred to Phase 10; text-first by design
- Learnforge integration — deferred to Phase 11; Docker Compose local labs first
- Certification exam item bank — deferred to Phase 12; requires FINOS legal/partnership
- FINOS formal adoption process — tracked separately in PROPOSAL.md; content ships regardless
- DCO sign-off workflow — not required until FINOS repo transfer (private repo now)

## Context

**Production workflow (locked):** Text lesson → Illustrations → Slide deck → Video → Publish. Text is the canonical source; all other formats derive. Site launches text-only; videos roll out later.

**Spec version:** Pinned to CALM 1.2. CALM 1.3 RC tracked in parallel; refresh post-stable.

**Toolchain (locked):** Docusaurus (site), Excalidraw B&W (illustrations), Docker Compose (labs), YAML quizzes, Marp/Reveal.js (slides).

**calmstudio-mcp** is available globally via `npx @calmstudio/mcp` — use for all CALM JSON authoring and validation in code examples.

**FINOS ecosystem** this course teaches as connective tissue: CALM ↔ Gemara ↔ AIGF ↔ SAIF ↔ FINOS CCC ↔ ARB ↔ GRIS ↔ CALM Hub ↔ CALM Guard.

**Authoring style:** Plain English, FSI-aware but not FSI-only. All code snippets must work copy-paste. Every CALM JSON example is a real validated artifact in `code-examples/` referenced by relative path.

**Repo is private** (gjs-opsflo account). No DCO sign-off yet. No Co-Authored-By until EasyCLA clarified.

## Constraints

- **Spec:** CALM 1.2 only — no invented node types. 9 core + 15 `ai:*` types. No `container`, no `component`.
- **Content license:** Apache 2.0 (code) + CC BY-SA 4.0 (content) — TBD by FINOS legal
- **Style:** Excalidraw B&W house style — no color in illustrations
- **Labs:** Must run end-to-end without external dependencies (Docker for any state)
- **Commits:** Conventional Commits format, no DCO sign-off, no Co-Authored-By (until FINOS transfer)
- **Content origin:** Text-first — never produce video script before text exists, never produce slides before illustrations

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Text-first production workflow | Enables translation pipeline, incremental correction, cheaper updates, site-day-one without video | — Pending |
| Docusaurus for site | Matches calm.finos.org; FINOS-ready; MDX support for custom quiz component | — Pending |
| Excalidraw B&W only | User has agentic skill; B&W = translatable, single source for slides + video | — Pending |
| Pin CALM 1.2 | Stability during course production; track 1.3 RC separately | — Pending |
| Docker Compose for labs | Lowest friction now; Learnforge-compatible structure already | — Pending |
| calmstudio-mcp for code examples | AI-driven generation + validation in one tool; enforces correct node types | — Pending |
| Module 0 first | Hook learner with immediate value before theory; earns the right to teach the spec | — Pending |
| Gemara as Module 4 spine | Gemara 7-layer model is the conceptual frame for all governance content | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-15 after initialization*
