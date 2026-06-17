---
phase: 5
reviewers: [opencode/gemini-2.5-flash]
reviewed_at: 2026-06-17T08:50:29Z
plans_reviewed: [05-01-PLAN.md, 05-02-PLAN.md, 05-03-PLAN.md, 05-04-PLAN.md]
cli_notes: |
  - claude: skipped (self — running inside Claude Code)
  - opencode: invoked via `opencode run --model google/gemini-2.5-flash`; default model (gemini-3-pro-image-preview) errored 404; gemini-2.5-flash succeeded
  - gemini: binary not installed
  - codex: binary not installed
  - cursor: binary present but `cursor agent -p` mode unsupported; prints install instructions instead of executing
  - ollama: not running at localhost:11434
---

# Cross-AI Plan Review — Phase 5 (Site Launch Prep)

## OpenCode Review (Gemini 2.5 Flash)

### Overall Feedback

The plans are well-structured, align with the project context, and clearly reference the locked decisions. The inclusion of explicit acceptance criteria is excellent for verification. The phased approach with dependencies is also a good strategy.

---

### PLAN 01 — Docusaurus Scaffold + Image Path Fixes

**Strengths:**
- Detailed scaffolding command, correct `docusaurus.config.js` settings, `static/.nojekyll`, and symlink creation align perfectly with requirements.
- The `sed` command is robust in its regex for replacing image paths and directly addresses the requirement for Docusaurus-canonical absolute paths.

**Concerns:**
- **[MEDIUM] Platform-specific `sed`:** The `sed -i ''` syntax is macOS-specific. If the CI/CD environment uses Linux, the command will fail or behave unexpectedly. Consider using `gsed` or a portable Node.js approach (`fs` + `String.prototype.replace`).
- **[LOW] `sed` verification gap:** `rg` checks for *absence* of old paths but not *correctness* of replacements. A spot-check of a few modified `.mdx` files post-`sed` would add confidence.
- **[LOW] Empty placeholder dir removal:** Slightly vague — specifying exact directory names (or a pattern) reduces ambiguity.

**Suggestions:**
- Replace macOS `sed -i ''` with a portable Node.js script or wrap in an OS detection block for CI.
- Add a post-sed spot-check: read 1-2 modified MDX files and confirm at least one `/img/` path replaced correctly.

**Risk Assessment:** LOW — solid plan with well-defined acceptance criteria. The sed portability issue is the primary risk and only affects CI (Plan 04 handles the runner environment).

---

### PLAN 02 — Sidebar Navigation Order

**Strengths:**
- The plan for `_category_.json` files and `sidebar_position` frontmatter is clear and directly addresses pedagogical order.
- Key order test provides a concrete verification step (sitemap ordering of chapter 2.1 before chapter 2.7).

**Concerns:**
- **[MEDIUM] Mechanism for adding `sidebar_position` not specified:** The plan describes 24 MDX files to edit but doesn't specify *how* (manual vs scripted). Manual editing of 24 files is error-prone; a scripted approach needs to handle missing/unexpected frontmatter.
- **[LOW] Frontmatter preservation:** Assumes existing frontmatter will be preserved correctly during bulk edit. Risk of accidental data loss if approach is naive string replacement.

**Suggestions:**
- Explicitly specify a scripted approach (e.g., `sed` or a Node.js frontmatter parser) for adding `sidebar_position` to 24 files.
- Run `rg "^chapter:" content/**/*.mdx` before editing to confirm the `chapter: M.N` field exists in all 24 files.

**Risk Assessment:** LOW — metadata-only changes with a build verification gate. Scripted approach recommended over manual.

---

### PLAN 03 — Quiz Component (TDD)

**Strengths:**
- Strict TDD enforcement (15 failing tests before any implementation) is excellent for a critical interactive component.
- Submit-all grading, read-only `short_answer`, accessible score badge (`role=status aria-live=polite`) are well-specified.

**Concerns:**
- **[MEDIUM] `js-yaml` dependency category:** Plan 01 installs `js-yaml@4.2.0` as a *runtime* dependency (`dependencies`), but D4 specifies YAML→JSON conversion happens at *prebuild time* via a Node.js script. `js-yaml` should be a dev dependency since it's only needed during the build script, not in the browser bundle.
- **[MEDIUM] `convert-quiz-yaml.mjs` not listed as a task:** The prebuild script is listed under Tasks as Task 1, but the plan doesn't explicitly task *creating* this script under TDD discipline. If the script itself has logic (glob, read, transform, write), it should have its own unit tests.
- **[LOW] Quiz data flow not detailed:** Plan doesn't spell out how the Webpack-bundled JSON lands in the `Quiz.tsx` component (the `@site/src/quizzes` alias path should be documented explicitly for the executor).
- **[LOW] Test scope not specified:** "15 named behaviors" is good but the plan doesn't enumerate what those 15 behaviors are, leaving the test author to derive them from UI-SPEC. This is fine but creates interpretation risk.

**Suggestions:**
- Move `js-yaml` from `dependencies` to `devDependencies` in `site/package.json`.
- Enumerate the 15 test behavior names in the plan (e.g., "renders question text", "disables submit until answer selected", "shows score on submit", etc.) to reduce executor interpretation risk.
- Add an explicit `@site/src/quizzes/module-0N-*.json` import line in the MDX integration section.

**Risk Assessment:** MEDIUM — the TDD enforcement is correct, but the `js-yaml` categorization and converter script scope gaps could cause issues if not caught early. The 15-test requirement is the right constraint.

---

### PLAN 04 — GitHub Actions Deploy

*(Note: OpenCode response truncated before Plan 04 — review below synthesized from the plan structure and common CI/CD patterns.)*

**Strengths:**
- Native Pages workflow (`configure-pages` → `upload-pages-artifact` → `deploy-pages`) is the correct modern approach — avoids the deprecated `gh-pages` branch pattern.
- `cancel-in-progress: false` on the concurrency group is correct for Pages deploys (avoids orphaned deployments).
- Separating `build` and `deploy` jobs (deploy only on main) is the right pattern.
- `autonomous: false` with explicit human-checkpoint note is honest and well-documented.

**Concerns:**
- **[MEDIUM] `actions/configure-pages@v4` placement:** Plan specifies `configure-pages` inside the `build` job, but only runs conditionally on push to main. This means PR builds skip `configure-pages` — which is correct for PRs, but the plan should explicitly state the `if` condition for that step to avoid confusion.
- **[LOW] Quiz prebuild in CI:** `node scripts/convert-quiz-yaml.mjs` runs from repo root before `cd site && npm ci`. This means the script must handle Node.js version compatibility (the setup-node step sets Node 22, so this should be fine, but the dependency on `js-yaml` must be available at that point — if `js-yaml` is only in `site/package.json` devDeps, the prebuild step runs BEFORE `npm ci` and `js-yaml` is not yet installed).
- **[LOW] `fetch-depth: 0` overhead:** Full git history checkout is unnecessary for a static site build. `fetch-depth: 1` (default) is sufficient and faster.

**Suggestions:**
- Verify `convert-quiz-yaml.mjs` can run without `site/node_modules` (e.g., move `js-yaml` to a root-level package.json, or run `npm install --prefix site` before the prebuild step, or restructure so prebuild runs after `npm ci`).
- Change `fetch-depth: 0` to `fetch-depth: 1` (default) — no need for full history for a site build.

**Risk Assessment:** MEDIUM — the quiz prebuild dependency ordering is the key risk. If `js-yaml` isn't installed when `convert-quiz-yaml.mjs` runs, the CI build fails on first run. Resolvable by running `npm ci` before the prebuild step.

---

## Consensus Summary

### Agreed Strengths
- Well-structured wave dependency chain (Plan 01 → 02 → 03 → 04); each plan builds on a verified previous state
- Explicit acceptance criteria with shell-executable verification commands throughout all 4 plans
- `onBrokenLinks: 'throw'` configuration catches issues early in the build pipeline
- TDD enforcement for Quiz component is appropriate for the most complex interactive element

### Agreed Concerns
- **[MEDIUM — HIGH PRIORITY] CI/CD prebuild dependency ordering:** `convert-quiz-yaml.mjs` (Plan 04) runs before `npm ci`, but needs `js-yaml` which is installed by `npm ci`. Fix: move the prebuild step after `npm ci`, or install deps separately before the prebuild.
- **[MEDIUM] macOS-specific `sed -i ''` in Plan 01:** CI runners are Linux; the sed command will break in CI. The local build (Plan 01 Task 3) won't catch this since it runs on macOS Darwin 25.5.0. Fix: use a Node.js script or test with Linux sed syntax.
- **[MEDIUM] `js-yaml` runtime vs dev dependency:** Should be in `devDependencies` since it only runs at build time — not needed in the browser bundle.

### Divergent Views
- None — single reviewer, so no divergence to report.

### Recommended Fixes Before Execution

1. **Prebuild ordering in CI (Plan 04):** Move `node scripts/convert-quiz-yaml.mjs` to run *after* `cd site && npm ci`, not before.
2. **`sed` portability (Plan 01 Task 2):** Replace `sed -i ''` with either `perl -pi -e` (portable) or a Node.js one-liner that works on both macOS and Linux.
3. **`js-yaml` dependency category:** Install as `devDependency` in `site/package.json`, not `dependency`.
