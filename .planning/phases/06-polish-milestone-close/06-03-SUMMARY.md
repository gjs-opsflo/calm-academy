---
phase: 06-polish-milestone-close
plan: "03"
subsystem: site
tags: [accessibility, wcag, illustrations, a11y]
dependency_graph:
  requires: [06-02]
  provides: [SITE-01-a11y, ILL-01-complete]
  affects: [site/src/css/custom.css, illustrations/exported/m00-*.svg]
tech_stack:
  added: []
  patterns: [WCAG 2.1 AA CSS override, Prism token override, Excalidraw MCP SVG generation]
key_files:
  created: []
  modified:
    - site/src/css/custom.css
    - illustrations/exported/m00-three-paths.svg
    - illustrations/exported/m00-calm-studio-mock.svg
    - illustrations/exported/m00-architecture-as-prompt.svg
    - illustrations/source/m00-three-paths.excalidraw
    - illustrations/source/m00-calm-studio-mock.excalidraw
    - illustrations/source/m00-architecture-as-prompt.excalidraw
decisions:
  - "@axe-core/cli 4.11.4 used instead of axe-cli 3.2.1 (deprecated, broken on Node 22 due to selenium-webdriver atoms module incompatibility)"
  - "Breadcrumb active link fix: targeted CSS override using primary-darkest (#205d3b) rather than changing primary variable globally (would affect navbar, links, buttons)"
  - "Prism comment token override uses !important to beat Prism inline style attribute"
  - "Illustrations generated via Excalidraw MCP tools (create_view + read_checkpoint) instead of user-authored in Excalidraw GUI — user approved this approach"
metrics:
  duration: 420s
  completed: "2026-06-18"
  tasks_completed: 2
  tasks_total: 2
  files_changed: 7
---

# Phase 6 Plan 03: Accessibility Check + Illustration Authoring Summary

**One-liner:** Axe-core fixed 3 Serious color-contrast violations; all 3 Module 0 illustrations authored via Excalidraw MCP and exported as SVG (5.1–5.6KB each), replacing placeholder stubs.

## Status

**COMPLETE**

- Task 1 (axe-cli check + fix): COMPLETE (commit `b29c7d9`)
- Task 2 (illustration authoring): COMPLETE — all 3 SVGs authored via Excalidraw MCP, each >1KB

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

## Task 2: Module 0 Illustration Authoring — COMPLETE

**Approach:** Illustrations generated via Excalidraw MCP tools (`create_view`, `read_checkpoint`) — user approved this in-session approach as equivalent to Excalidraw GUI export.

### Final State

All 3 illustration SVGs are real B&W diagrams (replacing placeholder stubs):

| File | Size | Content |
|------|------|---------|
| `illustrations/exported/m00-three-paths.svg` | 5.1 KB | Three vertical lanes (Talk/Sketch/Markdown) converging to single .calm.json |
| `illustrations/exported/m00-calm-studio-mock.svg` | 5.2 KB | Browser window frame with 4 CALM nodes (actor, webclient, service, database) |
| `illustrations/exported/m00-architecture-as-prompt.svg` | 5.6 KB | Left-to-right flow: Architect → speech bubble → calmstudio-mcp → .architecture.json → downstream |

Source `.excalidraw` files updated with proper element JSON (replacing spec-only stubs):
- `illustrations/source/m00-three-paths.excalidraw` (17.5 KB — full element definitions)
- `illustrations/source/m00-calm-studio-mock.excalidraw` (13.8 KB)
- `illustrations/source/m00-architecture-as-prompt.excalidraw` (12.2 KB)

**Commit:** `feat(ill-01): author Module 0 illustrations (three-paths, calm-studio-mock, architecture-as-prompt)` — pushed to origin/main.

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

None — all 3 placeholder stubs replaced with real SVG diagrams.

---

## Threat Flags

None. CSS-only changes; no new network endpoints, auth paths, or trust boundary modifications.

---

## Self-Check

- [x] `site/src/css/custom.css` exists and contains both WCAG fixes
- [x] Commit `b29c7d9` exists (a11y fix)
- [x] 15/15 Quiz vitest tests pass
- [x] TypeScript typecheck passes
- [x] All 3 m00-*.svg files > 1KB (5.1–5.6KB each)
- [x] Illustrations commit pushed to origin/main
- [x] SUMMARY.md written and updated

## Self-Check: PASSED
