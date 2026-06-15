---
phase: 01-module-0-on-ramp
reviewed: 2026-06-15T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx
  - content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx
  - code-examples/module-00-on-ramp/todo-api.architecture.json
  - scripts/validate-calm.sh
  - scripts/lint-quizzes.sh
  - content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx
  - content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx
  - illustrations/INVENTORY.md
  - content/module-00-on-ramp/your-first-calm-document.mdx
  - labs/lab-00-on-ramp/LAB.md
  - labs/lab-00-on-ramp/solution/my-system.architecture.json
  - labs/lab-00-on-ramp/starter/README.md
  - quizzes/module-00-on-ramp.yaml
  - scripts/test-lab.sh
findings:
  critical: 3
  warning: 6
  info: 3
  total: 12
status: fixed
fixed_at: 2026-06-15T00:00:00Z
fixed_scope: CR-01, CR-03, WR-01, WR-02, WR-03, WR-04, WR-05, WR-06
skipped: CR-02 (placeholder SVGs — illustrations deferred by user)
---

# Phase 01: Code Review Report

**Reviewed:** 2026-06-15T00:00:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Module 0 (15-minute on-ramp) content is well-structured and mostly consistent. CALM JSON examples use only valid node types. The three shell scripts follow safe shell idioms (`set -euo pipefail`, exit-code-based validation). The quiz and lab YAML are structurally sound.

Three blockers require fixes before this module ships: a regex in the lab check that produces false positives on validation failures, placeholder SVG stub files that violate the project's own phase gate rule, and unresolved "verify URL before publication" markers left in publishable content. Six warnings cover a chapter numbering inconsistency, a tool-call count factual error repeated across two files, an incorrect terminology cross-reference, a dead regex branch in the lab check, CWD-dependent script execution, and missing quiz coverage for two chapters.

---

## Critical Issues

### CR-01: Lab step-3 regex false-positives on validation failures

**File:** `labs/lab-00-on-ramp/LAB.md:48`

**Issue:** The `command_regex` check for step-3 uses pattern `(?i)has.*error.*false|0 error|No issues found`. The `0 error` branch is a substring match — it matches any string containing "0 error" including `"Found 10 errors"`, `"20 errors in schema"`, and similar failure output from the CALM CLI. A learner whose architecture has 10 or 20 schema errors would be marked as passing step-3. Confirmed via Python regex test: `"Found 10 errors in schema"` matches `0 error`.

Additionally, the command in the check runs `npx @finos/calm-cli validate -a my-system.architecture.json -f pretty`. With `-f pretty`, the CALM CLI produces human-readable output (`Errors: no (0)`, `No issues found.`), not JSON. The `has.*error.*false` branch only matches `hasErrors: false` which is the JSON format output (without `-f pretty`). This branch is dead for this command — it will never fire. Only `No issues found` is reachable for a passing validation run with `-f pretty`.

**Fix:** Replace the pattern with one that matches only the actual pretty-format success output and avoids substring false-positives:

```yaml
check:
  kind: command_regex
  command: "npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
  pattern: "No issues found"
```

Or switch to an `exit_code` check (cleaner and immune to CLI output format changes):

```yaml
check:
  kind: exit_code
  command: "npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
  expected: 0
```

---

### CR-02: Placeholder SVG files violate the project phase gate

**File:** `illustrations/INVENTORY.md:3` (all three SVG files under `illustrations/exported/`)

**Issue:** The `INVENTORY.md` explicitly states: "Phase gate requires non-placeholder SVGs (each >1KB)". All three exported SVGs are stubs below the threshold:

```
illustrations/exported/m00-three-paths.svg        — 890 bytes
illustrations/exported/m00-calm-studio-mock.svg   — 905 bytes
illustrations/exported/m00-architecture-as-prompt.svg — 930 bytes
```

All three are referenced in published lesson content via `<img>` syntax. When rendered in a browser or Docusaurus, they will display as broken or nearly invisible images. The `live-demo-diagram-to-calm-in-five-minutes.mdx` chapter uses two of them as direct teaching aids — the missing CALM Studio canvas mock and the three-paths convergence diagram are both referenced in the "The result" section at lines 289–290, which is the climax of the demo walkthrough.

**Fix:** Author all three illustrations in Excalidraw (black and white, per house style documented in `docs-meta/ILLUSTRATION-STANDARDS.md`) and export SVGs that exceed 1KB. Update `INVENTORY.md` status column from `stub` to `authored` for each. Do not ship this module until all three are replaced.

---

### CR-03: Unresolved "verify URL before publication" markers in publishable content

**Files:**
- `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx:102`
- `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx:306,338`
- `content/module-00-on-ramp/your-first-calm-document.mdx:65,93`
- `labs/lab-00-on-ramp/LAB.md:60,143`

**Issue:** Six locations contain the literal string `[verify URL before publication]` inline in learner-facing text. These appear as visible bracketed text in the rendered Docusaurus site and in the LAB.md learner walkthrough. Example from `your-first-calm-document.mdx` line 65:

```
Open [CALM Studio](https://studio.calm.finos.org) [verify URL before publication].
```

Learners reading this see `[verify URL before publication]` as part of the lesson text. This is a draft marker that must be resolved before publication — either by confirming `https://studio.calm.finos.org` is the correct URL and removing the marker, or by replacing the placeholder URL with the confirmed URL.

**Fix:** Verify the CALM Studio URL via `https://github.com/finos/architecture-as-code`. Remove all six `[verify URL before publication]` markers once the URL is confirmed. If the URL cannot be confirmed before publication, replace the markers with a note directing users to the FINOS architecture-as-code GitHub releases page instead.

---

## Warnings

### WR-01: Chapter numbering inconsistency — get-set-up (0.4) logically precedes live-demo (0.2)

**File:** `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx:5,23`

**Issue:** `get-set-up-in-sixty-seconds.mdx` is numbered `chapter: 0.4` in its frontmatter, but its own body text explicitly states: "This chapter precedes the demo (Chapter 0.2) in the reading order precisely so you can follow along." The `live-demo-diagram-to-calm-in-five-minutes.mdx` (chapter 0.2) lists `get-set-up-in-sixty-seconds` as a prerequisite (line 9), confirming that learners must read the chapter numbered 0.4 before the chapter numbered 0.2.

This inverted numbering will confuse learners navigating by chapter number and will produce incorrect ordering in any system that sorts chapters numerically (Docusaurus sidebar, Learnforge).

**Fix:** Renumber `get-set-up-in-sixty-seconds.mdx` to `chapter: 0.0` or `chapter: 0.05` to reflect its position as a pre-demo setup chapter, OR renumber `live-demo-diagram-to-calm-in-five-minutes.mdx` from 0.2 to a number after 0.4. The current numbering implies the reading order is 0.1 → 0.2 → 0.3 → 0.4 → 0.5, but the intended order is 0.1 → 0.4 → 0.2 → 0.3 → 0.5.

---

### WR-02: Factual error — "six tool calls" claim contradicts the listed sequence (two files)

**Files:**
- `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx:15`
- `content/module-00-on-ramp/your-first-calm-document.mdx:15`

**Issue:** Both TL;DR sections state "the AI makes six tool calls in sequence" and then list:

```
read_calm_guide → create_architecture → add_node (×4) → add_relationship (×3) → finalize_architecture → export_calm
```

Counting individual calls: 1 + 1 + 4 + 3 + 1 + 1 = **11 tool calls**, not 6. The six-count conflates distinct tool names with individual invocations. A learner watching the tool call panel in their AI client will see 11 calls, not 6, and will distrust the teaching material.

**Fix:** Correct both TL;DR bullets to state "eleven tool calls" (or "up to eleven tool calls, depending on the number of nodes and relationships"), or reword to "six distinct tool types: `read_calm_guide`, `create_architecture`, `add_node`, `add_relationship`, `finalize_architecture`, `export_calm`."

---

### WR-03: Terminology collision — "Path A/B/C" vs "Option 1/2/3" cross-referenced incorrectly

**File:** `content/module-00-on-ramp/your-first-calm-document.mdx:46,63`

**Issue:** Chapter 0.5 uses "Path A or B from Chapter 0.4" (line 46) and "Path C from Chapter 0.4" (line 63). Chapter 0.4 (`get-set-up-in-sixty-seconds.mdx`) uses the terminology "Option 1", "Option 2", and "Option 3" — it never uses "Path A", "Path B", or "Path C". The "Path" terminology belongs to Chapter 0.1 (`three-paths-to-first-calm-doc.mdx`) where it describes input types (Talk, Sketch, Markdown).

"Path C" in Chapter 0.1 means "Markdown document input". "Option 3" in Chapter 0.4 means "CALM Studio web (zero install)". These are different concepts. A learner reading Chapter 0.5 who follows "Path C from Chapter 0.4" back to Chapter 0.4 will find "Option 3" (CALM Studio web) — which is the right destination, but the label mismatch creates confusion that undermines trust in the content.

**Fix:** Replace "Path A or B from Chapter 0.4" with "Option 1 or 2 from Chapter 0.4" on line 46. Replace "Path C from Chapter 0.4" with "Option 3 from Chapter 0.4" on line 63.

---

### WR-04: All three shell scripts fail when run from any directory other than the repo root

**Files:**
- `scripts/validate-calm.sh:28`
- `scripts/test-lab.sh:13-15`
- `scripts/lint-quizzes.sh:12`

**Issue:** All three scripts use bare relative paths (`code-examples`, `labs/lab-00-on-ramp`, `quizzes`) without anchoring to the script's own location. If invoked from any directory other than the repo root (e.g., `cd scripts && bash validate-calm.sh`, or via a CI runner that sets a different CWD), all `find` and `[ -f ]` checks fail silently or produce misleading "nothing found" results.

`validate-calm.sh` exits 0 with "No .architecture.json files found" message when run from the wrong directory — no actual validation occurs but the script reports success. `test-lab.sh` would emit `FAIL: No *.architecture.json files found` but then also fail the LAB.md check, causing two false failures rather than a clear "wrong CWD" error.

**Fix:** Add a `SCRIPT_DIR` anchor at the top of each script and use it for all path references:

```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Then use ${REPO_ROOT}/code-examples, ${REPO_ROOT}/labs, ${REPO_ROOT}/quizzes
```

---

### WR-05: Quiz has no questions covering chapters 0.2 and 0.3

**File:** `quizzes/module-00-on-ramp.yaml` (entire file)

**Issue:** The quiz covers chapters 0.1, 0.4, and 0.5. Chapters 0.2 (`live-demo-diagram-to-calm-in-five-minutes.mdx`) and 0.3 (`why-this-works-and-when-it-doesnt.mdx`) each link to the quiz with "Take the quiz" calls-to-action, but neither chapter has any questions in the quiz file. A learner who reads the demo walkthrough and the mechanism explanation — the two most technically substantive chapters — and then takes the quiz will find nothing testing that knowledge.

Chapter 0.3 in particular introduces the 9-node-type reference table, the five failure modes of the AI path, and the "architecture as the prompt" concept. These are core Module 0 outcomes with no quiz coverage.

**Fix:** Add a chapter entry for 0.2 and 0.3 to the quiz. Minimum viable additions:
- One question testing the `interacts` vs `connects` distinction (Chapter 0.2 teaching point)
- One question on which scenario requires human review over AI judgment (Chapter 0.3 failure modes)
- One question on `deployed-in` vs `composed-of` distinction (Chapter 0.3)

---

### WR-06: Dead regex branch in lab step-3 check

**File:** `labs/lab-00-on-ramp/LAB.md:48`

**Issue:** (Companion to CR-01.) The pattern `(?i)has.*error.*false` is intended to match `hasErrors: false` from JSON-format CALM CLI output. However, the check command explicitly uses `-f pretty` which produces `Errors: no (0)` and `No issues found.`, not `hasErrors: false`. The `has.*error.*false` branch will never fire for this command. The `0 error` branch is similarly dead against pretty output (which does not produce output of the form "0 error"). This leaves the check relying solely on `No issues found` for correctness, while carrying two misleading dead branches.

This is distinct from the false-positive issue in CR-01 but comes from the same pattern. Both issues share the same fix (use `exit_code` check or `No issues found` only pattern — see CR-01 fix).

---

## Info

### IN-01: JDBC described as "network protocol" — technically inaccurate

**Files:**
- `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx:181`
- `code-examples/module-00-on-ramp/todo-api.architecture.json:62`
- `labs/lab-00-on-ramp/solution/my-system.architecture.json:62`

**Issue:** JDBC (Java Database Connectivity) is a Java API — a programming interface — not a network-level protocol. The actual wire protocol used when a Java application connects to a PostgreSQL or MySQL database is the PostgreSQL wire protocol or MySQL wire protocol. The lesson text states "The protocol is JDBC (Java Database Connectivity), the standard protocol for SQL database access" — this characterization is misleading. CALM's `protocol` field models the communication protocol, not the client library.

This matters because if the CALM 1.2 spec's protocol enum does not include `JDBC` (which is likely given it is an API, not a protocol), the `todo-api.architecture.json` and `my-system.architecture.json` examples may fail validation. If `JDBC` is accepted by the validator as a freeform string, the content is still technically imprecise — the lesson teaches an incorrect concept.

**Fix:** If CALM allows freeform protocol strings, replace `"JDBC"` with `"PostgreSQL"` or `"MySQL"` in both JSON examples, and update the lesson text to say "the protocol is the PostgreSQL wire protocol (or MySQL, depending on the database)" rather than "JDBC". If the spec restricts to an enum, verify the valid values and use an appropriate one.

---

### IN-02: Further reading links in your-first-calm-document.mdx missing `./` prefix

**File:** `content/module-00-on-ramp/your-first-calm-document.mdx:153-154`

**Issue:** Two relative links in the Further Reading section omit the `./` prefix:

```markdown
- [Why This Works...](why-this-works-and-when-it-doesnt.mdx)
- [Live Demo...](live-demo-diagram-to-calm-in-five-minutes.mdx)
```

All other files in this module use `./` consistently (e.g., `./why-this-works-and-when-it-doesnt.mdx`). While most Markdown renderers resolve these correctly, Docusaurus MDX processing may treat bare filenames differently from `./`-prefixed paths depending on plugin version.

**Fix:** Add `./` prefix to both links for consistency and defensive correctness:
```markdown
- [Why This Works...](./why-this-works-and-when-it-doesnt.mdx)
- [Live Demo...](./live-demo-diagram-to-calm-in-five-minutes.mdx)
```

---

### IN-03: CALM CLI reference URL may be incorrect

**File:** `content/module-00-on-ramp/your-first-calm-document.mdx:155`

**Issue:** The Further Reading section links to `https://github.com/finos/architecture-as-code/tree/main/calm-ai/tools` as the "CALM CLI reference". The CALM CLI package is typically under `calm` or `calm-cli` in the architecture-as-code repository, not `calm-ai/tools`. If this path does not exist or resolves to a different directory, learners following the link get a 404 or an unrelated directory listing.

**Fix:** Verify the correct GitHub path for the CALM CLI and update. Based on the FINOS architecture-as-code repo structure referenced elsewhere in the project (`.planning/intel/finos-aac-ecosystem.md`), the likely correct path is `https://github.com/finos/architecture-as-code/tree/main/calm` or the releases page.

---

_Reviewed: 2026-06-15T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
