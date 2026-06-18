---
phase: 06-polish-milestone-close
plan: "03"
subsystem: site
tags: [accessibility, wcag, illustrations, a11y]
dependency_graph:
  requires: [06-02]
  provides: [SITE-01-a11y, ILL-01-pending]
  affects: [site/src/css/custom.css, illustrations/exported/m00-*.svg]
tech_stack:
  added: []
  patterns: [WCAG 2.1 AA CSS override, Prism token override]
key_files:
  created: []
  modified:
    - site/src/css/custom.css
decisions:
  - "@axe-core/cli 4.11.4 used instead of axe-cli 3.2.1 (deprecated, broken on Node 22 due to selenium-webdriver atoms module incompatibility)"
  - "Breadcrumb active link fix: targeted CSS override using primary-darkest (#205d3b) rather than changing primary variable globally (would affect navbar, links, buttons)"
  - "Prism comment token override uses !important to beat Prism inline style attribute"
metrics:
  duration: 252s
  completed: "2026-06-18"
  tasks_completed: 1
  tasks_total: 2
  files_changed: 1
---

# Phase 6 Plan 03: Accessibility Check + Illustration Authoring Summary

**One-liner:** Axe-core spotted two Serious color-contrast violations (breadcrumb + Prism comment token) — fixed in custom.css; Task 2 (illustration authoring) is a human checkpoint awaiting user action.

## Status

**Partial — paused at human checkpoint (Task 2)**

- Task 1 (axe-cli check + fix): COMPLETE (commit `b29c7d9`)
- Task 2 (illustration authoring): AWAITING HUMAN — checkpoint presented to user

---

## Task 1: axe-cli Accessibility Check — Findings

**Tool used:** `@axe-core/cli` v4.11.4 (axe-core v4.11.4, chrome-headless)

Note: `axe-cli` v3.2.1 (the original plan target) is deprecated and broken on Node 22.22.2 due to a selenium-webdriver atoms module incompatibility. `@axe-core/cli` is the maintained replacement.

### axe Findings Table

| Page | Rule | Impact | Element | Contrast | Required | Status |
|------|------|--------|---------|----------|----------|--------|
| Module 0 (three-paths) | `color-contrast` | **Serious** | `.breadcrumbs__item--active > .breadcrumbs__link` | 4.07:1 | 4.5:1 | **Fixed** |
| Module 0 (three-paths) | `color-contrast` | **Serious** | `.token.comment` (Prism dark theme) | 2.84:1 | 4.5:1 | **Fixed** |
| Module 2 (nodes) | `color-contrast` | **Serious** | `.breadcrumbs__item--active > .breadcrumbs__link` | 4.07:1 | 4.5:1 | **Fixed** |

**Critical violations:** 0 (none found on either page)
**Serious violations:** 3 total across 2 pages — all fixed

### No fieldset/legend violation

Quiz.tsx fieldset/legend wrapping was confirmed already implemented in Phase 5. All 15 Quiz.test.tsx vitest tests pass. axe-core found zero violations related to radio group accessibility — confirming Phase 5 work is correct.

### Fixes Applied (site/src/css/custom.css)

**Fix 1 — Breadcrumb active link contrast:**
- Before: `#2e8555` on `#f2f2f2` = 4.07:1 (fails AA)
- After: `.breadcrumbs__item--active .breadcrumbs__link { color: var(--ifm-color-primary-darkest) }` → `#205d3b` on `#f2f2f2` = 6.97:1 (passes AA)
- Rationale: targeted override preserves primary color for other UI elements (navbar, links, buttons)

**Fix 2 — Prism comment token in dark mode:**
- Before: `#697098` on `#292d3e` = 2.84:1 (fails AA)
- After: `[data-theme='dark'] .token.comment { color: #9aa5cc !important }` = 5.61:1 (passes AA)
- `!important` required to override Prism's inline style attribute on `.token.comment` spans

### Post-fix Verification

- `cd site && npx vitest run src/components/Quiz.test.tsx` → **15/15 tests pass**
- `cd site && npm run typecheck` → **no TypeScript errors**
- axe re-scan not performed (fixes are pure CSS; site requires CI deploy to re-test live)

---

## Task 2: Module 0 Illustration Authoring — CHECKPOINT

**Status:** Awaiting human action (user must author 3 Excalidraw diagrams)

### Current State

All 3 illustration SVGs are placeholder stubs (< 1KB each):

| File | Current size | Target |
|------|-------------|--------|
| `illustrations/exported/m00-three-paths.svg` | 890 B | > 1KB real Excalidraw export |
| `illustrations/exported/m00-calm-studio-mock.svg` | 905 B | > 1KB real Excalidraw export |
| `illustrations/exported/m00-architecture-as-prompt.svg` | 930 B | > 1KB real Excalidraw export |

Source `.excalidraw` files with embedded DIAGRAM SPECs exist at:
- `illustrations/source/m00-three-paths.excalidraw` (2.1 KB)
- `illustrations/source/m00-calm-studio-mock.excalidraw` (2.1 KB)
- `illustrations/source/m00-architecture-as-prompt.excalidraw` (2.0 KB)

Each `.excalidraw` stub contains a full DIAGRAM SPEC describing what to draw. Open the file in Excalidraw to read it.

### What the user needs to do

1. Open each `.excalidraw` stub in Excalidraw (excalidraw.com or local install)
2. Read the embedded DIAGRAM SPEC in each file
3. Draw the diagram in **B&W house style** (black strokes, white fill, grey for depth — no color)
4. Export as SVG: File > Export image > SVG
5. Save to `illustrations/exported/` replacing the placeholder stub
6. Verify: `ls -la illustrations/exported/m00-*.svg` — all must show > 1024 bytes
7. Commit: `git add illustrations/exported/m00-*.svg && git commit -m "feat(ill-01): author Module 0 illustrations (three-paths, calm-studio-mock, architecture-as-prompt)"`
8. Push and verify images render at the live site (~2 min Pages deploy)

### Export script

After authoring, the export script can also be used:
```bash
bash scripts/export-excalidraw.sh m00-three-paths
bash scripts/export-excalidraw.sh m00-calm-studio-mock
bash scripts/export-excalidraw.sh m00-architecture-as-prompt
```

### Resume signals

- **"illustrations done"** — all 3 SVGs authored, > 1KB, committed, live on site
- **"illustrations deferred"** — accept placeholder stubs for FINOS pitch (ILL-01 stays Partial in REQUIREMENTS.md)

---

## Deviations from Plan

### Tool substitution (auto-handled)

**1. [Rule 3 - Blocking] axe-cli replaced with @axe-core/cli**
- **Found during:** Task 1
- **Issue:** `axe-cli` v3.2.1 (the plan's specified tool) is deprecated and fails on Node 22 with a `selenium-webdriver atoms module` error. The package page on npmjs.com shows it as deprecated.
- **Fix:** Used `npx @axe-core/cli@4.11.4` — the officially maintained CLI replacement from Deque Systems (same axe-core engine, compatible with Node 22). Results are equivalent.
- **Package verification:** https://www.npmjs.com/package/@axe-core/cli — published by Deque Systems, 4.11.3 latest, weekly downloads ~50K.
- **axe-core-cli** (the first fallback in the plan) does not exist on npm (404).

### No fieldset/legend fix needed

The plan anticipated a likely fieldset/legend violation in Quiz.tsx. Phase 5 (Wave 3) had already correctly implemented this. axe-core confirmed zero violations for radio group accessibility — the Phase 5 tests were accurate.

---

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| Placeholder SVG (< 1KB grey box) | `illustrations/exported/m00-three-paths.svg` | Awaiting human Excalidraw authoring (Task 2 checkpoint) |
| Placeholder SVG (< 1KB grey box) | `illustrations/exported/m00-calm-studio-mock.svg` | Awaiting human Excalidraw authoring (Task 2 checkpoint) |
| Placeholder SVG (< 1KB grey box) | `illustrations/exported/m00-architecture-as-prompt.svg` | Awaiting human Excalidraw authoring (Task 2 checkpoint) |

These stubs render as grey placeholder boxes in Module 0 chapters 0.1 and 0.2. They are tracked as ILL-01 (Partial). The checkpoint resume signal resolves these.

---

## Threat Flags

None. CSS-only changes; no new network endpoints, auth paths, or trust boundary modifications.

---

## Self-Check

- [x] `site/src/css/custom.css` exists and contains both WCAG fixes
- [x] Commit `b29c7d9` exists (`git log --oneline -1`)
- [x] 15/15 Quiz vitest tests pass
- [x] TypeScript typecheck passes
- [x] SUMMARY.md written before state updates

## Self-Check: PASSED
