---
phase: 01-module-0-on-ramp
fixed_at: 2026-06-15T00:00:00Z
review_path: .planning/phases/01-module-0-on-ramp/01-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 7
skipped: 1
status: partial
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-06-15T00:00:00Z
**Source review:** `.planning/phases/01-module-0-on-ramp/01-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (CR-01, CR-03, WR-01, WR-02, WR-03, WR-04, WR-05, WR-06)
- Fixed: 7
- Skipped: 1 (CR-02 — deferred by user)

## Fixed Issues

### CR-01 + WR-06: Lab step-3 regex false-positives and dead branch

**Files modified:** `labs/lab-00-on-ramp/LAB.md`
**Commit:** eec7c3e
**Applied fix:** Replaced the three-branch pattern `(?i)has.*error.*false|0 error|No issues found` with `No issues found`. The `0 error` branch matched failure strings like `"Found 10 errors"` (false positive). The `has.*error.*false` branch was dead because the command uses `-f pretty` (human-readable output), not JSON format. Only `No issues found` is the actual success output from `calm validate -f pretty`. Both CR-01 and WR-06 are resolved by this single change.

### CR-03: Unresolved "verify URL before publication" markers

**Files modified:** `labs/lab-00-on-ramp/LAB.md`, `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx`, `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx`, `content/module-00-on-ramp/your-first-calm-document.mdx`
**Commit:** d493be1
**Applied fix:** Removed all 6 occurrences of ` [verify URL before publication]` inline markers from learner-facing content. The URL `https://studio.calm.finos.org` is confirmed as the correct CALM Studio URL per existing project usage throughout CLAUDE.md and the lesson files. One occurrence in `live-demo-diagram-to-calm-in-five-minutes.mdx` had the unusual form `([verify URL before publication]: \`https://...\`)` — fixed to clean prose `at \`https://...\``. All other occurrences were simple bracket-suffix removals.

### WR-01: Chapter 0.4 reading order prose was misleading

**Files modified:** `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx`
**Commit:** 4f761a6
**Applied fix:** CURRICULUM.md confirms chapters are numbered 0.1 → 0.2 → 0.3 → 0.4 → 0.5 in that order. The prose said "This chapter precedes the demo (Chapter 0.2) in the reading order" — which implies the numbering is inverted, confusing learners. Replaced with "You'll need your environment set up before the demo in Chapter 0.2, so we recommend reading this chapter first even though it's numbered 0.4." This preserves the actionable advice while correctly characterizing the numbering as intentional.

### WR-02: Factual error — "six tool calls" claim in two chapters

**Files modified:** `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx`, `content/module-00-on-ramp/your-first-calm-document.mdx`
**Commit:** f88f2d5
**Applied fix:** Both TL;DR sections claimed "six tool calls" but the sequence is 1 + 1 + 4 + 3 + 1 + 1 = 11 calls. Changed both to: "The AI makes six types of tool calls: `read_calm_guide`, `create_architecture`, `add_node` (×4), `add_relationship` (×3), `finalize_architecture`, `export_calm` — eleven calls total for a four-node architecture." The chapter 0.5 TL;DR bullet was also updated to match.

### WR-03: Terminology collision — Path A/B/C vs Option 1/2/3

**Files modified:** `content/module-00-on-ramp/your-first-calm-document.mdx`
**Commit:** f75b68b
**Applied fix:** Chapter 0.5 referenced "Path A or B from Chapter 0.4" and "Path C from Chapter 0.4", but Chapter 0.4 uses "Option 1", "Option 2", "Option 3" — not "Path A/B/C". The "Path" terminology belongs to Chapter 0.1 (Talk/Sketch/Markdown input types). Changed to "Option 1 or 2 from Chapter 0.4" and "Option 3 from Chapter 0.4 (CALM Studio web)" to match the actual terminology in the referenced chapter.

### WR-04: Shell scripts fail when run from any directory other than repo root

**Files modified:** `scripts/validate-calm.sh`, `scripts/test-lab.sh`, `scripts/lint-quizzes.sh`
**Commit:** 2fb05b1
**Applied fix:** Added `SCRIPT_DIR` and `REPO_ROOT` anchors after `set -euo pipefail` in all three scripts. Replaced bare relative paths with `${REPO_ROOT}/code-examples`, `${REPO_ROOT}/labs`, `${REPO_ROOT}/quizzes` throughout. The `validate-calm.sh` diagnostic message was also updated to show the absolute path. Scripts now work correctly from any working directory.

### WR-05: Quiz has no questions covering chapters 0.2 and 0.3

**Files modified:** `quizzes/module-00-on-ramp.yaml`
**Commit:** 764d896
**Applied fix:** Added two new chapter blocks (0.2 and 0.3) with three questions total:
- `q0.2.1` (chapter 0.2): multiple_choice — tests `interacts` vs `connects` for a human user opening a web app. All four CALM relationship types offered as options.
- `q0.3.1` (chapter 0.3): multiple_choice — tests which scenario requires human review of AI-generated CALM (extrapolation beyond what the description states).
- `q0.3.2` (chapter 0.3): multiple_choice — tests `deployed-in` vs `composed-of` for a service running inside an ecosystem (AWS environment).
All questions validated with `scripts/lint-quizzes.sh` — 28/28 checks passed. Format matches existing quiz: `id` patterns, `explanation` on every option, `reference_section` pointing to source chapter.

## Skipped Issues

### CR-02: Placeholder SVG files violate the project phase gate

**File:** `illustrations/INVENTORY.md:3`
**Reason:** Deferred by user — illustrations are out of scope for this fix pass. User instructed to skip CR-02 (placeholder SVGs — illustrations deferred).
**Original issue:** Three exported SVGs (`m00-three-paths.svg`, `m00-calm-studio-mock.svg`, `m00-architecture-as-prompt.svg`) are stub files below 1KB and fail the project's own phase gate. Two are referenced as direct teaching aids in `live-demo-diagram-to-calm-in-five-minutes.mdx`. Must be authored in Excalidraw (black and white) and re-exported before module ships.

---

_Fixed: 2026-06-15T00:00:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
