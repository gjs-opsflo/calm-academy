# Requirements: CALM Academy

**Defined:** 2026-06-15
**Core Value:** A learner produces a validated `.calm.json` in under 15 minutes (Module 0) — before learning a single spec rule. Everything else explains why that works and what to do with it.

## v1 Requirements

Milestone 1 scope: Modules 0–3 delivered end-to-end (text + labs + quizzes + illustrations + slides), Docusaurus site live. Vertical MVP — each module phase is a shippable increment.

### Module Content (Text Lessons)

- [ ] **MOD-01**: Module 0 has 5 fully-authored MDX chapters covering the three paths to first CALM doc, live demo walkthrough, why the AI approach works, environment setup, and hands-on exercise
- [ ] **MOD-02**: Module 1 has 5 fully-authored MDX chapters covering architecture debt crisis, lessons from IaC adoption, CALM introduction and positioning, FINOS ecosystem overview, and governance landscape
- [ ] **MOD-03**: Module 2 has 7 fully-authored MDX chapters covering all CALM language constructs: nodes (9 core types), relationships, interfaces, controls, decorators, metadata, and building a first full architecture
- [ ] **MOD-04**: Module 3 has 7 fully-authored MDX chapters covering the full CALM toolchain: CLI, CALM Studio, CALM Hub, CALM Server, VSCode extension, pattern library, and CI/CD integration

### Labs

- [ ] **LAB-01**: Lab 0 is a Docker-free 15-minute on-ramp where learner describes a system in 3 sentences, gets a `.calm.json`, runs `calm validate`, and visualizes in CALM Studio — no prior spec knowledge required
- [ ] **LAB-02**: Lab 2 (conference signup architecture) is a cumulative hands-on lab where learner writes a complete valid CALM JSON document by hand from a spec description, passes `calm validate`, and reviews it in Studio
- [ ] **LAB-03**: Lab 3 (CI/CD gate) adds `calm validate` to a GitHub Actions pipeline and demonstrates a passing and failing architecture check — lab runs end-to-end without external dependencies

### Quizzes

- [ ] **QUIZ-01**: Module 0 quiz (YAML format, auto-gradeable) — tests: setup completed, first CALM doc produced, three AI paths understood
- [ ] **QUIZ-02**: Module 1 quiz — tests: AaC value proposition, CALM vs static diagrams, FINOS ecosystem relationships, Gemara/AIGF/SAIF at a glance
- [ ] **QUIZ-03**: Module 2 quiz — comprehensive vocabulary coverage: all 9 core node types, relationship types, interface shapes, control patterns, decorator syntax
- [ ] **QUIZ-04**: Module 3 quiz — tests: CLI commands, Studio workflow, Hub publish/consume, CI/CD gate pattern, pattern reuse concepts

### Illustrations

- [ ] **ILL-01**: Module 0 has 3–5 Excalidraw B&W illustrations exported as SVG: three paths diagram, CALM Studio screenshot mock, architecture-as-the-prompt concept
- [ ] **ILL-02**: Module 1 has 8–10 Excalidraw B&W illustrations: architecture drift timeline, IaC analogy diagram, FINOS ecosystem map, Gemara 7-layer overview, CALM as Layer 4
- [ ] **ILL-03**: Module 2 has 10–15 Excalidraw B&W illustrations: all 9 node types, relationship types, interface patterns, control decorator flow, sample architecture build-up sequence
- [ ] **ILL-04**: Module 3 has 8–10 Excalidraw B&W illustrations: CLI workflow, Studio canvas overview, Hub publish/consume flow, CI/CD pipeline gate, pattern inheritance

### Slide Decks

- [ ] **SLIDE-01**: Module 1 slide deck (Marp/Reveal.js) — 20–30 slides covering module chapters, inline illustrations, speaker notes matching text chapters
- [ ] **SLIDE-02**: Module 2 slide deck — 30–40 slides with all node types and relationship visual examples
- [ ] **SLIDE-03**: Module 3 slide deck — 25–35 slides covering toolchain demos and CI/CD examples

### Code Examples

- [ ] **CODE-01**: Every `.calm.json` file in `code-examples/` passes `calm validate` — enforced by CI check
- [ ] **CODE-02**: Module 2 cheatsheet published — 1-page printable reference covering all node types, relationship types, and key metadata fields

### Site

- [ ] **SITE-01**: Docusaurus site is production-ready: all Module 0–3 content published, search working, quizzes rendering via custom MDX component, lab links active, mobile-responsive

## v2 Requirements

Deferred to Milestone 2. Not in current roadmap.

### Advanced Modules

- **MOD-05**: Module 4 complete — Governance, Gemara 7-layer walkthrough, FINOS CCC, CALM Guard, threat models, compliance frameworks (SOX, DORA, SR 11-7 intro, MiFID II intro)
- **MOD-06**: Module 5 complete — AI-native architecture: ai:* types (15 types), calmstudio-mcp tool reference, AIGF auto-attach, SAIF mapping, FINOS Multi-Agent ARB walkthrough
- **MOD-07**: Module 6 complete — Enterprise adoption playbook + capstone A/B/C starter kits

### Advanced Labs

- **LAB-04A**: Lab 4A — General governance lab (CALM Guard validation run)
- **LAB-04B**: Lab 4B — FSI track (SOX/DORA control mapping)
- **LAB-05A**: Lab 5A — General AI-native architecture lab
- **LAB-05B**: Lab 5B — Wealth management scenario (MiFID II, AIGF)
- **LAB-05C**: Lab 5C — Credit scoring scenario (SR 11-7, ECOA, model governance)

### Capstones

- **CAP-A**: Capstone A brief + starter kit — FSI monolith to multi-agent migration
- **CAP-B**: Capstone B brief + starter kit — Autonomous Wealth Management (full 8-layer ARB)
- **CAP-C**: Capstone C brief + starter kit — AI Credit Risk Scoring

### Remaining Quizzes + Illustrations

- **QUIZ-05**: Module 4 quiz
- **QUIZ-06**: Module 5 quiz
- **QUIZ-07**: Module 6 quiz
- **ILL-05**: Module 4 illustrations (15+)
- **ILL-06**: Module 5 illustrations (12+)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Video production (Variant A/B) | Deferred to Phase 10; text-first workflow by design; expensive to redo |
| Learnforge integration | Deferred to Phase 11; Docker Compose labs are Learnforge-compatible but not yet wired |
| Certification exam item bank | Deferred to Phase 12; requires FINOS legal/partnership and 300+ exam items |
| FINOS formal adoption process | Tracked in PROPOSAL.md; content ships regardless of FINOS decision |
| DCO sign-off workflow | Not required until repo transfer from private gjs-opsflo to finos org |
| Workshop pilot delivery | Phase 10 deliverable; needs Module 0–3 content complete first |
| Real-time CALM Studio collaboration | CALM Studio product decision; out of course scope |
| CALM spec 1.3 content | Pinned to 1.2 for production stability; refresh post-1.3-stable |

## Traceability

Updated by roadmapper. Each requirement maps to exactly one phase.

| Requirement | Phase | Status |
|-------------|-------|--------|
| MOD-01 | Phase 1 | Pending |
| LAB-01 | Phase 1 | Pending |
| QUIZ-01 | Phase 1 | Pending |
| ILL-01 | Phase 1 | Pending |
| MOD-02 | Phase 2 | Pending |
| QUIZ-02 | Phase 2 | Pending |
| ILL-02 | Phase 2 | Pending |
| SLIDE-01 | Phase 2 | Pending |
| MOD-03 | Phase 4 | Pending |
| LAB-02 | Phase 4 | Pending |
| QUIZ-03 | Phase 4 | Pending |
| ILL-03 | Phase 4 | Pending |
| SLIDE-02 | Phase 4 | Pending |
| CODE-01 | Phase 4 | Pending |
| CODE-02 | Phase 4 | Pending |
| MOD-04 | Phase 5 | Pending |
| LAB-03 | Phase 5 | Pending |
| QUIZ-04 | Phase 5 | Pending |
| ILL-04 | Phase 5 | Pending |
| SLIDE-03 | Phase 5 | Pending |
| SITE-01 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-15*
*Last updated: 2026-06-15 after initial definition*
