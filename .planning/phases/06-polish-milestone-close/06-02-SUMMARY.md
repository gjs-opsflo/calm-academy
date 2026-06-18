---
phase: 06-polish-milestone-close
plan: "02"
subsystem: planning-docs
tags:
  - requirements
  - glossary
  - proposal
  - milestone-close
dependency_graph:
  requires:
    - 06-01
  provides:
    - requirements-traceability-current
    - ecosystem-glossary
    - proposal-live-site-link
  affects:
    - .planning/REQUIREMENTS.md
    - docs-meta/GLOSSARY.md
    - PROPOSAL.md
    - CLAUDE.md
tech_stack:
  added: []
  patterns:
    - alphabetical glossary table with lesson links
    - requirements traceability with evidence-based status
key_files:
  created:
    - docs-meta/GLOSSARY.md
  modified:
    - .planning/REQUIREMENTS.md
    - PROPOSAL.md
    - CLAUDE.md
decisions:
  - "ILL-04 corrected from Complete to Partial — it was incorrectly marked Complete in the original traceability table; all four ILL-* are placeholder SVG stubs deferred to Milestone 2"
  - "MOD-03/LAB-02/QUIZ-03/SLIDE-02/ILL-03/CODE-01/CODE-02 phase column corrected from Phase 4 to Phase 3 in traceability table"
  - "CODE-01 marked Complete (not Partial) — Plan 01 closed the CI gap; marking it Complete here reflects post-Plan-01 state"
metrics:
  duration: "~15 minutes"
  completed: "2026-06-18"
  tasks_completed: 3
  tasks_total: 3
  files_changed: 4
---

# Phase 6 Plan 02: Documentation Polish — Requirements Traceability, Glossary, Proposal Summary

Traceability table updated from 14 stale Pending to 17 Complete + 4 Partial-deferred; CALM + Gemara + FINOS ecosystem glossary created with 20 terms; PROPOSAL.md updated with live site URL and current delivery status.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Update REQUIREMENTS.md traceability table | b94eb77 | `.planning/REQUIREMENTS.md` |
| 2 | Create docs-meta/GLOSSARY.md with 20 ecosystem terms | 4d6b596 | `docs-meta/GLOSSARY.md`, `CLAUDE.md` |
| 3 | Update PROPOSAL.md with live site URL and current status | 863a05c | `PROPOSAL.md` |

## Detailed Results

### Task 1: REQUIREMENTS.md Update

**Requirements updated (14 → 17 Complete, 4 Partial):**

| Req ID | Before | After | Evidence |
|--------|--------|-------|----------|
| MOD-01 | Pending | Complete | 5 MDX files verified in 01-VERIFICATION.md |
| LAB-01 | Pending | Complete | LAB.md + starter + solution; test-lab.sh exits 0 |
| QUIZ-01 | Pending | Complete | 9 questions; lint passes |
| ILL-01 | Pending | Partial — user authoring deferred | 3 stubs; placeholder SVGs < 1KB |
| MOD-02 | Pending | Complete | 5 MDX files; verified in 02-VERIFICATION.md |
| QUIZ-02 | Pending | Complete | 11 questions; lint passes |
| ILL-02 | Pending | Partial — deferred to Milestone 2 | 8 stubs; placeholder SVGs < 1KB |
| SLIDE-01 | Pending | Complete | 26 slides; marp: true; 362 lines |
| MOD-03 | Pending → Phase 4 | Complete → Phase 3 | 7 MDX files; verified in 03-VERIFICATION.md |
| LAB-02 | Pending → Phase 4 | Complete → Phase 3 | LAB.md + starter + solution |
| QUIZ-03 | Pending → Phase 4 | Complete → Phase 3 | 21 questions; lint passes |
| ILL-03 | Pending → Phase 4 | Partial — Phase 3 | 13 stubs; placeholder SVGs < 1KB |
| SLIDE-02 | Pending → Phase 4 | Complete → Phase 3 | 40 slides; marp: true; 848 lines |
| CODE-01 | Pending → Phase 4 | Complete — CI gap closed Phase 6 | Plan 01 added architecture.json validation |
| CODE-02 | Pending → Phase 4 | Complete → Phase 3 | 198-line cheatsheet |
| ILL-04 | Complete | Partial — deferred to Milestone 2 | Was incorrectly marked Complete; 10 stubs < 1KB |

**Final coverage:**
- Complete: 17 (MOD-01–04, LAB-01–03, QUIZ-01–04, SLIDE-01–03, CODE-01, CODE-02, SITE-01)
- Partial — deferred: 4 (ILL-01, ILL-02, ILL-03, ILL-04)
- Pending: 0

### Task 2: docs-meta/GLOSSARY.md Created

**File:** `docs-meta/GLOSSARY.md` (70 lines)

**20 terms defined (alphabetical):**
AIGF, ARB, Architecture as Code, CALM, CALM Guard, CALM Hub, CALM Server, CALM Studio, calmstudio-mcp, control, decorator, FINOS CCC, Gemara, GRIS, interface, node type, pattern (CALM), relationship, SAIF, validation

**Format:** Each term has definition + example usage + `/docs/...` lesson link

**Also:** Abbreviation reference table (8 entries), module coverage map showing which module introduces each term

**CLAUDE.md updated:** Added `| Ecosystem glossary | docs-meta/GLOSSARY.md |` to "Where to find things" table

### Task 3: PROPOSAL.md Updated

**Changes made:**
1. Status line: "Draft — for FINOS Working Group review" → "Live demo available — ready for FINOS Working Group review"
2. Added header field: `**Live site:** https://gjs-opsflo.github.io/calm-academy/`
3. Added `## Current Status (as of 2026-06-18)` section with 11-row delivery table (all 4 modules Live, 3 labs Complete, 4 quizzes Live, 3 slide decks Complete)
4. URL appears in 2 locations: header + Current Status section

**Unchanged:** All 8 numbered sections (Executive Summary through Appendix)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected ILL-04 from Complete to Partial in traceability table**
- **Found during:** Task 1 — reading REQUIREMENTS.md traceability table line 121 showed `ILL-04 | Phase 5 | Complete`
- **Issue:** 06-RESEARCH.md evidence (line 57) shows ILL-04 is PARTIAL — deferred, with 10 stubs (881–968 bytes, all < 1KB). The original Complete status was incorrect; it matches the pattern of all other ILL-* requirements being partial.
- **Fix:** Changed ILL-04 from Complete to `Partial — deferred to Milestone 2` in the traceability table; changed checklist from `[x]` to `[ ]`
- **Files modified:** `.planning/REQUIREMENTS.md`
- **Commit:** b94eb77

**2. [Rule 1 - Bug] Corrected Phase column for MOD-03 and related Phase 3 requirements**
- **Found during:** Task 1 — traceability table showed MOD-03, LAB-02, QUIZ-03, ILL-03, SLIDE-02, CODE-01, CODE-02 as "Phase 4" but they belong to Phase 3
- **Fix:** Updated phase column from Phase 4 to Phase 3 for all affected rows
- **Files modified:** `.planning/REQUIREMENTS.md`
- **Commit:** b94eb77

## Known Stubs

None in files created/modified by this plan — all content is factual documentation updates.

## Threat Flags

No new network endpoints, auth paths, file access patterns, or schema changes introduced. This plan is documentation-only.

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| `.planning/REQUIREMENTS.md` exists | FOUND |
| `docs-meta/GLOSSARY.md` exists | FOUND |
| `PROPOSAL.md` exists | FOUND |
| `CLAUDE.md` exists | FOUND |
| `06-02-SUMMARY.md` exists | FOUND |
| Commit b94eb77 (Task 1) | FOUND |
| Commit 4d6b596 (Task 2) | FOUND |
| Commit 863a05c (Task 3) | FOUND |
| REQUIREMENTS.md: 17 Complete in traceability | PASS — 17 Complete rows |
| REQUIREMENTS.md: 4 Partial (ILL-01–04) | PASS — 4 Partial entries + coverage summary |
| REQUIREMENTS.md: 0 Pending | PASS — "Pending: 0" in coverage summary |
| GLOSSARY.md >= 60 lines | PASS — 70 lines |
| PROPOSAL.md: live site URL in >= 2 places | PASS — 2 occurrences |
| PROPOSAL.md: Status reads "Live demo available" | PASS |
| PROPOSAL.md: Current Status section present | PASS — line 12 |
