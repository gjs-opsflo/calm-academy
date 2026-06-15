---
phase: 01-module-0-on-ramp
plan: "01"
subsystem: content
tags: [calm, calm-1.2, mdx, docusaurus, finos, calmstudio-mcp, module-00]

# Dependency graph
requires: []
provides:
  - "Chapter 0.1 (three-paths-to-first-calm-doc.mdx) — conceptual entry gate with three paths explained and todo-api embedded"
  - "Chapter 0.4 (get-set-up-in-sixty-seconds.mdx) — setup guide with correct calmstudio-mcp local install instructions"
  - "code-examples/module-00-on-ramp/todo-api.architecture.json — validated CALM 1.2 anchor example (4 nodes, 3 relationships)"
  - "scripts/validate-calm.sh — CI-ready CALM JSON validation gate for all code-examples/"
  - "scripts/lint-quizzes.sh — stub quiz YAML linter (full schema checks in Plan 01-03)"
affects: [module-00, module-01, lab-00]

# Tech tracking
tech-stack:
  added:
    - "@finos/calm-cli 1.44.1 (npx, no global install required)"
  patterns:
    - "MDX chapter structure: frontmatter → TL;DR → Why → Concept → Code/CALM → Mistakes → Quiz link → Lab link → Further reading"
    - "CALM JSON code examples validated with calm CLI before commit (never merge unvalidated examples)"
    - "calmstudio-mcp local .cjs install pattern (not npm — from FINOS aac releases page)"
    - "check-before-install: claude mcp list first, install only if missing"

key-files:
  created:
    - content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx
    - content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx
    - code-examples/module-00-on-ramp/todo-api.architecture.json
    - scripts/validate-calm.sh
    - scripts/lint-quizzes.sh
  modified: []

key-decisions:
  - "Use todo-api (4-node web application) as Module 0 anchor CALM example — simpler than conference-signup pattern, validates cleanly with CALM 1.2 schema"
  - "Document calmstudio-mcp as local .cjs install (NOT npx @calmstudio/mcp — package not on npm per research resolution)"
  - "CALM Studio web URL annotated [verify URL before publication] — aspirational placeholder per research open question resolution"
  - "scripts/lint-quizzes.sh is a stub in Plan 01 — exits 0 with no-op when no quiz files exist; full schema validation added in Plan 01-03"

patterns-established:
  - "CALM node type discipline: only the 9 core types (actor/ecosystem/system/service/database/network/ldap/webclient/data-asset); container and component never appear positively"
  - "MDX chapter word count targets: concept-heavy chapters 1500-2500 words; procedural setup chapters 800-1200 words"
  - "All code examples in .architecture.json files validated with npx @finos/calm-cli validate before commit"
  - "Check-before-install pattern for calmstudio-mcp: claude mcp list first"

requirements-completed: [MOD-01]

# Metrics
duration: 5min
completed: 2026-06-15
---

# Phase 1 Plan 01: Three Paths Chapter, Setup Chapter, todo-api CALM Example Summary

**Two MDX entry-gate chapters (0.1 + 0.4) plus a validated CALM 1.2 four-node todo-api example and two CI validation scripts — all five deliverables for the Module 0 conceptual and setup pre-reading gate**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-15T08:53:36Z
- **Completed:** 2026-06-15T08:58:32Z
- **Tasks:** 3 / 3
- **Files modified:** 5 created

## Accomplishments

- Authored `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` (Chapter 0.1) — 2311 words covering all three AI-assisted paths (Talk/Sketch/Markdown), with todo-api.architecture.json embedded in full as a non-truncated copy-paste code block
- Authored `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` (Chapter 0.4) — 1148 words covering all three setup options with the correct calmstudio-mcp local install workflow (check `claude mcp list` first; no npm install; CALM Studio web as zero-install path)
- Created and validated `code-examples/module-00-on-ramp/todo-api.architecture.json` — CALM 1.2 architecture using only core types (actor, webclient, service, database); passes `npx @finos/calm-cli validate -a` with exit 0, hasErrors: false, 0 warnings
- Created `scripts/validate-calm.sh` — finds all `*.architecture.json` under `code-examples/` and validates each; exits 1 if any fail
- Created `scripts/lint-quizzes.sh` — stub that checks quiz YAML files exist and are non-empty; exits 0 with informational message when no files found

## Task Commits

Each task was committed atomically:

1. **Task 1: Create and validate todo-api.architecture.json + validation scripts** - `62e91c2` (feat)
2. **Task 2: Author Chapter 0.1 — Three Paths to Your First CALM Document** - `2c1e8c5` (docs)
3. **Task 3: Author Chapter 0.4 — Get Set Up in 60 Seconds** - `3b7ece8` (docs)

**Plan metadata:** (committed after SUMMARY.md creation)

## Files Created/Modified

- `code-examples/module-00-on-ramp/todo-api.architecture.json` — CALM 1.2 minimal four-node architecture; teaching anchor example for all Module 0 chapters
- `scripts/validate-calm.sh` — CI validation gate that finds and validates all code-examples/*.architecture.json
- `scripts/lint-quizzes.sh` — stub quiz YAML linter; exits 0 gracefully when no quizzes exist yet
- `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` — Chapter 0.1 entry gate (2311 words, 8 sections, 3 path H3s, full todo-api JSON embedded)
- `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` — Chapter 0.4 setup guide (1148 words, 8 sections, 3 option H3s, correct calmstudio-mcp install pattern)

## Decisions Made

- **todo-api as anchor example, not conference-signup:** Research confirmed the conference-signup.pattern.json in the aac repo uses CALM 1.0-rc schema and includes Kubernetes complexity — inappropriate for Module 0. The fresh todo-api example uses CALM 1.2, four nodes, three relationships, validates cleanly.
- **calmstudio-mcp as local .cjs install:** Research resolved that `@calmstudio/mcp` is NOT on npm. Chapter 0.4 documents the check-before-install pattern (`claude mcp list` first) and instructs learners to download from FINOS aac releases page. The CURRICULUM.md `npx @calmstudio/mcp` instruction is aspirational and is not used in the chapter.
- **CALM Studio web URL annotated:** `https://studio.calm.finos.org` used as placeholder with `[verify URL before publication]` annotation per research open question resolution.
- **lint-quizzes.sh as stub:** Full schema validation requires quiz YAML files to exist. Plan 01-03 adds complete schema checks. Stub exits 0 cleanly when no files found.

## Deviations from Plan

None — plan executed exactly as written. All five deliverables match the acceptance criteria. The calmstudio-mcp install deviation (local .cjs not npm) was pre-resolved in the RESEARCH.md open questions and accounted for in the plan itself.

## Known Stubs

- `scripts/lint-quizzes.sh`: Stub — only checks that quiz YAML files are non-empty. Full schema validation (required fields, question types, `id` format, `reference_section` paths) is deferred to Plan 01-03 when quiz YAML content exists. The stub exits 0 and prints "No quiz files found — skipping" until then.
- `[verify URL before publication]` annotation in Chapter 0.4: The CALM Studio web URL (`https://studio.calm.finos.org`) was not publicly confirmable at research time. The annotation is intentional and instructs course editors to verify before publication.

## Threat Flags

None — all files are static content (MDX chapters) and a fictional tutorial CALM JSON. No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. The todo-api.architecture.json is explicitly a tutorial artifact (fictional system, no credentials, no PII) — T-01-03 disposition is `accept` per the plan's threat model.

## Issues Encountered

None — the `rtk` proxy tool's output rewriting caused a false positive on the grep | grep -v node type check. Direct Python JSON parse confirmed all four node types are valid core CALM types.

## Next Phase Readiness

- Chapter 0.1 and 0.4 complete — the conceptual and setup pre-reading gate for Module 0 is in place
- todo-api.architecture.json is the Module 0 anchor example and is ready to be referenced by Plans 01-02 and 01-03 chapters
- `scripts/validate-calm.sh` is ready for CI integration and will validate all future code examples added under `code-examples/`
- Plan 01-02 (lab, Chapter 0.2, Chapter 0.3, Chapter 0.5) can proceed immediately — code example is available

## Self-Check: PASSED

All files confirmed present on disk. All three task commits confirmed in git log.

| Check | Status |
|---|---|
| content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx | FOUND |
| content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx | FOUND |
| code-examples/module-00-on-ramp/todo-api.architecture.json | FOUND |
| scripts/validate-calm.sh | FOUND |
| scripts/lint-quizzes.sh | FOUND |
| .planning/phases/01-module-0-on-ramp/01-01-SUMMARY.md | FOUND |
| Commit 62e91c2 (Task 1) | FOUND |
| Commit 2c1e8c5 (Task 2) | FOUND |
| Commit 3b7ece8 (Task 3) | FOUND |

---
*Phase: 01-module-0-on-ramp*
*Completed: 2026-06-15*
