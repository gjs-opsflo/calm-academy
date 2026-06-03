# CALM Academy — Project Roadmap

## North star
Ship a complete, FINOS-adoption-ready Architecture as Code course covering the full CALM + Gemara + AIGF + SAIF ecosystem, with primary delivery as text + video + labs + slides, secondary as 5-day instructor-led workshop.

## Phases

### Phase 1 — Bootstrap ✅
**Status:** Done (this commit)
- Repo created, structure scaffolded
- CLAUDE.md / AGENTS.md / README / LICENSE / CONTRIBUTING in place
- Curriculum migrated to `.planning/CURRICULUM.md`
- Research migrated to `.planning/research/`
- GSD scaffolding ready
- Docusaurus site stubbed
- CI scaffolded

**Exit criteria:** First commit pushed, repo browsable end-to-end.

---

### Phase 2 — Module 0 + Module 1 (Hook + Foundation)
**Goal:** Prove the production workflow works on the two most important modules. Module 0 is the demo hook; Module 1 is the conceptual foundation.

**Deliverables:**
- Module 0 text lessons (5 chapters)
- Module 0 illustrations (3–5 SVGs)
- Module 0 lab (15-min on-ramp lab)
- Module 1 text lessons (5 chapters)
- Module 1 illustrations (8–10 SVGs)
- Module 1 quiz (YAML)
- Module 1 slide deck
- Production workflow validated end-to-end
- Style guide refined based on real authoring experience

**Exit criteria:**
- Module 0 + Module 1 readable on the live site
- Module 0 lab works on a fresh machine
- All quizzes auto-grade correctly
- One sample chapter completed in all formats (text + slides + lab) as proof of pipeline

**Estimated duration:** 2–3 weeks

---

### Phase 3 — Module 2 (CALM Fundamentals)
**Goal:** Teach the CALM spec vocabulary completely. Most reference-heavy module.

**Deliverables:**
- 7 text lessons (nodes, relationships, interfaces, controls, decorators, metadata, first architecture)
- 10–15 illustrations
- Lab 2 (conference signup architecture, end-to-end)
- Quiz (largest of the modules — vocabulary coverage)
- Cheatsheet (1-page printable reference)
- 5+ code examples in `code-examples/`

**Exit criteria:** Student can name every node type, every relationship type, write a valid CALM JSON by hand.

---

### Phase 4 — Module 3 (CALM Ecosystem)
**Goal:** Teach the full toolchain (CLI, Studio, Hub, Server, VSCode, patterns, CI/CD).

**Deliverables:**
- 7 text lessons
- Tool demo screencasts (CLI, Studio, Hub)
- Lab 3 (CI/CD pipeline with CALM validation gate)
- Hub-published pattern example
- Quiz + cheatsheet

---

### Phase 5 — Module 4 (Governance + Gemara + CALM Guard)
**Goal:** The flagship governance module. Gemara is the conceptual spine.

**Deliverables:**
- Gemara 7-layer walkthrough chapter (most-illustrated chapter in the course)
- Compliance framework chapters (FINOS CCC, SOX, DORA, SR 11-7 intro, MiFID II intro)
- Threat modeling chapter (FINOS Multi-Agent Threat Model)
- CALM Guard deep dive
- Timelines + enterprise rollout chapters
- Labs 4A + 4B (general + FSI track)
- 15+ illustrations
- Quiz + cheatsheet

---

### Phase 6 — Module 5 (AI-Native Architecture)
**Goal:** The frontier module. `ai:*` types, calmstudio-mcp, AIGF, SAIF.

**Deliverables:**
- 7 text lessons including the FINOS Multi-Agent ARB walkthrough
- calmstudio-mcp tool reference chapter
- AIGF + SAIF + Gemara overlay chapter
- Labs 5A + 5B + 5C (general + wealth management + credit scoring)
- 12+ illustrations including the full 8-layer ARB diagram

---

### Phase 7 — Module 6 (Enterprise Adoption + Capstone)
**Goal:** Adoption playbook + capstone scenarios as deliverable kits.

**Deliverables:**
- 5 text lessons
- Capstone A brief + starter kit
- Capstone B brief + starter kit (wealth management)
- Capstone C brief + starter kit (credit scoring)
- Capstone rubric for peer review

---

### Phase 8 — Polish + Site Launch
**Goal:** Production-quality site, ready for soft launch.

**Deliverables:**
- All cheatsheets finalized
- Glossary complete
- Cross-references audited
- Site SEO + accessibility audit
- Beta-tester cohort (10 students) runs through all modules
- Feedback incorporated
- Site goes public

---

### Phase 9 — FINOS Proposal
**Goal:** Formal FINOS adoption proposal.

**Deliverables:**
- Project proposal document
- Demo deck for FINOS Working Group
- License clarification with FINOS legal
- Repo transfer plan (private gjs-opsflo → public finos)

---

### Phase 10 — Workshop Pilot + Video Production
**Goal:** Validate workshop delivery + produce video assets.

**Deliverables:**
- 4-hour OSFF workshop slot delivered
- Video lessons recorded for Modules 0–3 (Variant B narrated for stable content)
- Video lessons recorded for Module 4–5 demos (Variant A talking-head)
- Workshop feedback incorporated into v2 of content

---

### Phase 11 — Learnforge Integration
**Goal:** Ship as a Learnforge topic-pack.

**Deliverables:**
- `pack.json` for Learnforge topic-pack format
- Module-to-topic-pack mapping
- Step-check definitions for all labs (`command_regex`, `exit_code`, `file_state`, `ai_judge`)
- Tested end-to-end in Learnforge

---

### Phase 12 — Certification Program
**Goal:** Launch CALM Associate / Practitioner / Architect certifications.

**Deliverables:**
- Cert exam item bank (300+ questions)
- Architect-track capstone rubric
- Examination platform integration (LF EdX or similar)
- First cert cohort run

---

## Estimated total duration
6–9 months from Phase 1 to Phase 8 (public soft launch) at part-time pace.
Phases 9–12 dependent on FINOS adoption timeline.

## Critical path
Phase 1 → 2 → (3, 4 in parallel) → 5 → (6, 7 in parallel) → 8

Modules 3 and 4 can run in parallel (different domains).
Modules 6 and 7 can run in parallel (one is content-heavy, one is project briefs).

## Risk register

| Risk | Mitigation |
|---|---|
| CALM spec changes mid-course production | Pin to CALM 1.2; track 1.3 RC in parallel; refresh after stable |
| CALM Guard roadmap items don't ship in time | Curriculum already documents what's assumed; reduce labs to currently-shipping features in v1, expand in v2 |
| Excalidraw export pipeline breaks | Maintain script; backup workflow is manual export |
| FINOS adoption slower than expected | Course ships and operates regardless under private/community model |
| Learnforge integration contract changes | Stay loosely coupled; topic-pack format is one of several delivery targets |
