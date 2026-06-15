# ROADMAP: CALM Academy — Milestone 1

**Goal:** Ship Modules 0–3 end-to-end (text + labs + quizzes + illustrations + slides) on a production-ready Docusaurus site. Prove the full production workflow. Enable FINOS proposal demo.

**Requirements coverage:** 21 v1 requirements across 6 phases. All requirements mapped ✓

**Delivery model:** Vertical MVP — each phase ships one module end-to-end as a learnable increment.

---

### Phase 1: Module 0 — The 15-Minute On-Ramp

**Goal:** Author and publish Module 0 (the demo hook) end-to-end — proves the production workflow and hooks early learners with immediate value before they've learned the spec.
**Mode:** mvp
**Requirements:** MOD-01, LAB-01, QUIZ-01, ILL-01
**Dependencies:** calmstudio-mcp available globally (already confirmed)

**Plans:** 2/3 plans executed

Plans:

**Wave 1**

- [x] 01-01-PLAN.md — Setup gate: Chapter 0.1 (Three Paths) + Chapter 0.4 (Get Set Up) + todo-api code example + validation scripts

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 01-02-PLAN.md — Demo + Why: Chapter 0.2 (Live Demo) + Chapter 0.3 (Why it Works) + 3 Excalidraw illustration stubs (ILL-01) `[autonomous: false — requires user illustration authoring]`
- [x] 01-03-PLAN.md — Hands-on: Chapter 0.5 (Lab wrapper) + Lab 0 (LAB.md + solution) + Module 0 quiz (QUIZ-01)

**Cross-cutting constraints:**

- All `.architecture.json` examples must validate with `npx @finos/calm-cli validate` before commit
- No `npx @calmstudio/mcp` references anywhere — package is NOT on npm; use local .cjs install or CALM Studio web
- Illustrations: user must author Excalidraw files and export SVGs (>1KB each) before phase gate

**Success Criteria:**

1. All 5 Module 0 chapters authored as MDX, readable in the site
2. Lab 0 completes end-to-end on a fresh machine: `describe → .calm.json → calm validate → Studio visualize`
3. Module 0 quiz (YAML) passes auto-grade check with correct answer key
4. 3–5 Excalidraw B&W illustrations exported as SVG, inline in lessons
5. One learner (internal tester) completes Module 0 in under 30 minutes with no hand-holding

---

### Phase 2: Module 1 — The Case for Architecture as Code

**Goal:** Author and publish Module 1 — the conceptual foundation that earns the learner's buy-in before the spec deep-dive. Includes the first slide deck.
**Mode:** mvp
**Requirements:** MOD-02, QUIZ-02, ILL-02, SLIDE-01
**Dependencies:** Phase 1 complete (production workflow validated)

**Success Criteria:**

1. All 5 Module 1 chapters authored, cross-referenced to Module 0 by permalink slug
2. Module 1 quiz covers CALM positioning, FINOS ecosystem at a glance, and Gemara overview
3. 8–10 Excalidraw B&W illustrations complete — includes architecture drift timeline, FINOS ecosystem map, Gemara 7-layer overview
4. Module 1 slide deck (20–30 slides) generated from text + illustrations, speaker notes accurate
5. Learner can articulate the AaC case and FINOS ecosystem relationships after reading Module 1

---

### Phase 3: Module 2 — CALM Fundamentals

**Goal:** Author and publish Module 2 — the spec vocabulary module. Most reference-heavy; must be precise. Includes the largest quiz, a cheatsheet, and 10+ code examples.
**Mode:** mvp
**Requirements:** MOD-03, LAB-02, QUIZ-03, ILL-03, SLIDE-02, CODE-01, CODE-02
**Dependencies:** Phase 2 complete; all 9 core node types confirmed from CALM 1.2 spec

**Success Criteria:**

1. All 7 Module 2 chapters authored — covers all 9 core node types, relationship types, interface shapes, controls, decorators, metadata, and building a first full architecture
2. Lab 2 (conference signup architecture) completes end-to-end: learner writes CALM JSON by hand, passes `calm validate`, visualizes in Studio
3. Module 2 quiz covers all CALM vocabulary — largest quiz in the course
4. 10–15 Excalidraw B&W illustrations complete — all node types visual, relationship pattern diagrams, architecture build-up sequence
5. Module 2 slide deck (30–40 slides) complete with visual node type gallery
6. Module 2 cheatsheet (1-page printable) published
7. All code-examples/ in `code-examples/module-02-*` pass `calm validate` in CI

---

### Phase 4: Module 3 — The CALM Ecosystem

**Goal:** Author and publish Module 3 — the toolchain module. Covers everything the learner needs to use CALM professionally: CLI, Studio, Hub, Server, VSCode, patterns, CI/CD.
**Mode:** mvp
**Requirements:** MOD-04, LAB-03, QUIZ-04, ILL-04, SLIDE-03
**Dependencies:** Phase 3 complete; CALM CLI available locally; GitHub Actions runner available for Lab 3

**Success Criteria:**

1. All 7 Module 3 chapters authored — covers CLI commands, Studio canvas workflow, Hub publish/consume, Server concepts, VSCode extension, pattern library, CI/CD gate
2. Lab 3 (CI/CD gate) runs end-to-end: learner forks a repo, adds `calm validate` to GitHub Actions, pushes a passing and failing architecture — both behave as expected
3. Module 3 quiz covers CLI, Hub, and CI/CD patterns
4. 8–10 Excalidraw B&W illustrations complete — CI/CD pipeline gate, Hub flow, Studio workflow
5. Module 3 slide deck (25–35 slides) complete with tool demo screenshots/mocks

---

### Phase 5: Site Launch Prep

**Goal:** Docusaurus site is production-quality, fully published, and ready for public soft launch and FINOS demo.
**Mode:** mvp
**Requirements:** SITE-01
**Dependencies:** Phases 1–4 complete (all module content exists)

**Success Criteria:**

1. Docusaurus site builds with zero errors or warnings; all Module 0–3 content published
2. Search works across all modules
3. Quiz MDX component renders correctly for all 4 quizzes with correct auto-grading
4. Lab links and code example links are all valid (no 404s)
5. Site is mobile-responsive on iOS Safari and Android Chrome
6. Site deploys automatically via GitHub Pages CI on push to main
7. 10 internal beta testers complete Modules 0–1 and provide feedback; critical feedback incorporated

---

### Phase 6: Polish + Milestone Close

**Goal:** Cross-reference audit, glossary, accessibility check, cheatsheet finalization, and milestone sign-off. Ready for FINOS pitch.
**Mode:** mvp
**Requirements:** (cross-cutting quality gate — all 21 v1 requirements verified complete)
**Dependencies:** Phase 5 complete

**Success Criteria:**

1. All cross-references between lessons use permalink slugs (no chapter numbers)
2. Glossary complete with all CALM and Gemara terms defined
3. All `code-examples/` pass `calm validate` in CI (CODE-01 final verification)
4. Accessibility audit passes at WCAG 2.1 AA level for Module 0 and Module 2 (spot check)
5. All 21 v1 requirements verified — REQUIREMENTS.md traceability fully updated with "Complete"
6. PROPOSAL.md is accurate and references live site URL

---

## Phase Schedule

| Phase | Name | Requirements | Est. Duration |
|-------|------|--------------|---------------|
| 1 | 2/3 | In Progress|  |
| 2 | Module 1 — Case for AaC | MOD-02, QUIZ-02, ILL-02, SLIDE-01 | 1.5 weeks |
| 3 | Module 2 — CALM Fundamentals | MOD-03, LAB-02, QUIZ-03, ILL-03, SLIDE-02, CODE-01, CODE-02 | 2.5 weeks |
| 4 | Module 3 — Ecosystem | MOD-04, LAB-03, QUIZ-04, ILL-04, SLIDE-03 | 2 weeks |
| 5 | Site Launch Prep | SITE-01 | 1 week |
| 6 | Polish + Milestone Close | (all 21) | 1 week |

**Total estimated:** 9 weeks part-time

## Critical Path

Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6

Sequential (each module builds on previous). Within each phase, text → illustrations → quiz/lab can parallelize.

## Risk Register

| Risk | Mitigation |
|------|------------|
| CALM 1.2 node types ambiguous in edge cases | Pin to `architecture-as-code` repo at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code` as canonical spec reference |
| Excalidraw B&W illustrations bottleneck | User has agentic Excalidraw skill; illustrations can be drafted in parallel with text |
| Lab 3 depends on GitHub Actions | Provide local `act` fallback instructions in LAB.md |
| Site build breaks on MDX quirks | Use Docusaurus 3.x with strict mode; validate MDX in CI |
| Content quality inconsistency across modules | Apply STYLE-GUIDE.md before each phase starts; peer-review one chapter per module |
