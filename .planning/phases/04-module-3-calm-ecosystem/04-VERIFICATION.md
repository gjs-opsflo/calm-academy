---
phase: 04-module-3-calm-ecosystem
verified: 2026-06-16T00:00:00Z
status: human_needed
score: 10/10 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Lab 3 end-to-end run: fork starter, complete workflow stub, push to GitHub Actions, observe pass + fail gates"
    expected: "GitHub Actions run shows all steps green for secure-api.calm.json; broken-api.calm.json step fails the gate; learner can complete in 35 minutes without hand-holding"
    why_human: "Requires GitHub account, Actions runner, and an actual push-to-remote workflow — cannot verify programmatically without live execution environment"
  - test: "Visual quality of slide deck when rendered with Marp"
    expected: "28 slides render cleanly with correct layout, all 10 SVG placeholder references display, speaker notes visible in presenter mode"
    why_human: "Marp rendering requires a browser or Marp CLI — cannot verify visual output programmatically"
  - test: "Quiz auto-grade experience: learner answers all 18 questions, correct answers are scored correctly, wrong answers show explanation"
    expected: "Every multiple_choice question accepts exactly one correct answer; all wrong answers display explanation text; code_completion and short_answer accepted_answers list covers expected variants"
    why_human: "Auto-grading behavior depends on quiz component integration not yet wired to a site (SITE-01 is Phase 5); functional quiz rendering cannot be verified without the Docusaurus MDX component"
---

# Phase 4: Module 3 — The CALM Ecosystem Verification Report

**Phase Goal:** Author and publish Module 3 — the toolchain module. Covers everything the learner needs to know about the CALM ecosystem: CLI, Studio, Hub, Server, VSCode extension, Patterns/Standards, and CI/CD integration. All 7 chapters authored, 10 illustration stubs, Lab 3 (CI/CD gate), Module 3 quiz, Module 3 slide deck.
**Verified:** 2026-06-16
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 7 Module 3 chapters authored (CLI, Studio, Hub, Server, VSCode, Patterns, CI/CD) | VERIFIED | `ls content/module-03-calm-ecosystem/` shows 7 .mdx files; line counts 143–328 lines each; all pass slug/frontmatter checks |
| 2 | Three .calm.json code examples validate with `calm validate -a` | VERIFIED | `secure-api-generated.calm.json`, `timeline-moment-v1.calm.json`, `timeline-moment-v2.calm.json` all return `hasErrors: false, hasWarnings: false` |
| 3 | Pattern file validates with `calm validate -p` | VERIFIED | `secure-api-service.pattern.json` returns `hasErrors: false, hasWarnings: false` |
| 4 | Hub metadata code example validates | VERIFIED | `with-hub-metadata.calm.json` returns `hasErrors: false, hasWarnings: false` |
| 5 | CI glob correctly covers *.calm.json for Module 3 examples | VERIFIED | `.github/workflows/ci.yml` uses `find code-examples -name "*.calm.json"` — all 4 Module 3 .calm.json files match this glob |
| 6 | Lab 3 valid architecture passes validation; broken architecture fails | VERIFIED | `starter/architectures/secure-api.calm.json` → `hasErrors: false`; `broken-api.calm.json` → `hasErrors: true` (missing `description` on customer-db node) |
| 7 | 10 Excalidraw stubs exist with valid JSON and DIAGRAM SPEC text | VERIFIED | All 10 m03-*.excalidraw files pass `python3 -c "..."` JSON check; all contain DIAGRAM SPEC text element |
| 8 | 10 SVG placeholder files exist, valid XML, >400 bytes each | VERIFIED | All 10 m03-*.svg files parse as valid XML; sizes range 881–968 bytes |
| 9 | Module 3 quiz has 18 questions across all 7 chapters; passes lint-quizzes.sh | VERIFIED | `scripts/lint-quizzes.sh` → "50 checks passed, 0 failed"; quiz YAML has 7 chapters × 2-3 questions = 18 total |
| 10 | Module 3 slide deck exists with 25-35 slides, Marp frontmatter, 6+ illustration references | VERIFIED | `slides/module-03-calm-ecosystem.md` (456 lines); 28 slides (within 25-35 range); `marp: true`; all 10 m03-*.svg referenced; 86 speaker notes; `--exit-code` pitfall and Module 4 preview both present |

**Score:** 10/10 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `content/module-03-calm-ecosystem/cli-toolbox.mdx` | Chapter 3.1 — CLI toolbox, 8 commands, CI integration | VERIFIED | 313 lines; slug: cli-toolbox; module: 3; chapter 3.1; all 8 CLI command H3s present; `m03-calm-cli-command-map.svg` referenced; quiz link present |
| `content/module-03-calm-ecosystem/patterns-and-standards.mdx` | Chapter 3.6 — pattern vs architecture, calm generate | VERIFIED | 328 lines; slug: patterns-and-standards; full pattern JSON in fenced block; `m03-pattern-vs-architecture.svg` referenced |
| `code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json` | Lab 3 pattern — enforces HTTPS WAF + service + database topology | VERIFIED | Contains `"$schema"`; passes `calm validate -p` |
| `code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json` | Architecture generated from secure-api-service pattern | VERIFIED | Contains `"$schema": "https://calm.finos.org/release/1.2/meta/calm.json"`; passes `calm validate -a` |
| `code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json` | calm diff baseline (v1, 3 nodes) | VERIFIED | v1 has 3 nodes (webclient, service, database); passes `calm validate -a` |
| `code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json` | calm diff comparison (v2, 4 nodes) | VERIFIED | v2 has 4 nodes (adds email-notification-service); passes `calm validate -a` |
| `content/module-03-calm-ecosystem/calm-studio-visual-design.mdx` | Chapter 3.2 — Studio canvas, bidirectional sync | VERIFIED | 183 lines; slug: calm-studio-visual-design; references `studio.calm.finos.org`; `m03-studio-canvas-anatomy.svg` referenced |
| `content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx` | Chapter 3.3 — Hub namespaces, CLI hub commands | VERIFIED | 315 lines; slug: calm-hub-architecture-registry; covers auth profiles, hub push/pull/list; states Lab 3 does NOT require Hub; both hub illustration SVGs referenced |
| `content/module-03-calm-ecosystem/calm-server-validation-service.mdx` | Chapter 3.4 — calm-server endpoints, rate limiting | VERIFIED | 182 lines; slug: calm-server-validation-service; POST /calm/validate shown; `m03-calm-server-platform-pattern.svg` referenced |
| `code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json` | Hub namespace metadata demo | VERIFIED | passes `calm validate -a`; contains `"$schema"` |
| `content/module-03-calm-ecosystem/vscode-extension.mdx` | Chapter 3.5 — CALM Tools extension, 6 features | VERIFIED | 143 lines; slug: vscode-extension; "CALM Tools" + "FINOS" + "FINOS.calm-vscode-plugin" + "0.6.0" all present; `m03-vscode-extension-panels.svg` referenced |
| `content/module-03-calm-ecosystem/cicd-integration.mdx` | Chapter 3.7 — GitHub Actions workflow, CI/CD gate | VERIFIED | 270 lines; slug: cicd-integration; `-f junit` present; `lab-03-cicd-gate` link present; `m03-cicd-gate-flow.svg` + `m03-full-stack-pipeline.svg` both referenced |
| `labs/lab-03-cicd-gate/LAB.md` | Learnforge-compatible lab, 5 steps | VERIFIED | Contains `id: lab-03-cicd-gate`; step-1 through step-5 present; `requires_docker: false` |
| `labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json` | Valid architecture for Lab 3 | VERIFIED | passes `calm validate -a` with 0 errors |
| `labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json` | Invalid architecture for Lab 3 | VERIFIED | Fails `calm validate -a` with 1 error: "must have required property 'description'" on customer-db node |
| `labs/lab-03-cicd-gate/starter/.github/workflows/calm-gate.yml` | Stub workflow with TODO comment | VERIFIED | File exists; contains TODO stub |
| `labs/lab-03-cicd-gate/starter/patterns/secure-api-service.pattern.json` | Pattern copy for lab | VERIFIED | File exists in starter/patterns/ |
| `labs/lab-03-cicd-gate/solution/.github/workflows/calm-gate.yml` | Complete workflow — lab solution | VERIFIED | Contains `calm validate`, `upload-artifact@v4` |
| `quizzes/module-03-ecosystem.yaml` | Module 3 quiz, 18 questions, 7 chapters | VERIFIED | module: 3; 7 chapters (3.1-3.7); 18 questions total; `lint-quizzes.sh` exits 0 |
| `slides/module-03-calm-ecosystem.md` | Marp slide deck, 25-35 slides | VERIFIED | 456 lines; 28 slides (computed); `marp: true`; all 10 m03-*.svg referenced; 86 speaker notes |
| All 10 m03-*.excalidraw Excalidraw stubs | Valid JSON with DIAGRAM SPEC text | VERIFIED | All 10 pass `python3` JSON + DIAGRAM SPEC check |
| All 10 m03-*.svg SVG placeholders | Valid XML, >400 bytes | VERIFIED | All 10 parse as valid XML; 881-968 bytes each |
| `illustrations/INVENTORY.md` | 10 m03-* rows appended | VERIFIED | Lines 33-42 contain exactly 10 m03-* rows; all prior m00-*, m01-*, m02-* rows preserved |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `cli-toolbox.mdx` | `code-examples/.../timeline-moment-v1.calm.json` | calm diff demo reference | VERIFIED | `rg 'timeline-moment-v'` returns 6 matches in cli-toolbox.mdx |
| `patterns-and-standards.mdx` | `code-examples/.../secure-api-service.pattern.json` | calm generate example | VERIFIED | `rg 'secure-api-service.pattern.json'` matches in patterns-and-standards.mdx |
| `.github/workflows/ci.yml` | `code-examples/module-03-calm-ecosystem/*.calm.json` | find *.calm.json glob | VERIFIED | `find code-examples -name "*.calm.json"` matches all 4 Module 3 .calm.json files |
| `calm-hub-architecture-registry.mdx` | `code-examples/.../with-hub-metadata.calm.json` | Hub metadata example | VERIFIED | rg matches in calm-hub-architecture-registry.mdx |
| `calm-studio-visual-design.mdx` | `illustrations/exported/m03-studio-canvas-anatomy.svg` | inline Markdown image | VERIFIED | File exists (942 bytes); reference present in chapter |
| `cicd-integration.mdx` | `illustrations/exported/m03-cicd-gate-flow.svg` | inline image | VERIFIED | File exists (925 bytes); reference present in chapter |
| `cicd-integration.mdx` | `illustrations/exported/m03-full-stack-pipeline.svg` | inline image | VERIFIED | File exists (962 bytes); reference present in chapter |
| `cicd-integration.mdx` | `labs/lab-03-cicd-gate/LAB.md` | Lab section link | VERIFIED | `rg 'lab-03-cicd-gate'` in cicd-integration.mdx returns link match |
| `slides/module-03-calm-ecosystem.md` | `illustrations/exported/m03-calm-cli-command-map.svg` | Marp image | VERIFIED | All 10 m03-*.svg referenced in slide deck |
| `labs/lab-03-cicd-gate/LAB.md` | `starter/architectures/secure-api.calm.json` | step-2 check command | VERIFIED | step-2 references secure-api.calm.json |
| `labs/lab-03-cicd-gate/solution/...calm-gate.yml` | `starter/architectures/secure-api.calm.json` | calm validate step | VERIFIED | Solution workflow validates architectures/secure-api.calm.json |

---

### Data-Flow Trace (Level 4)

Not applicable to this phase. All artifacts are static educational content (MDX chapters, YAML quizzes, JSON code examples, Marp slides). No dynamic data rendering occurs — there is no component-to-API data flow to trace. The site rendering (Docusaurus) is a Phase 5 (SITE-01) concern.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| secure-api-generated.calm.json passes validation | `npx @finos/calm-cli validate -a code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json` | `hasErrors: false, hasWarnings: false` | PASS |
| timeline-moment-v1.calm.json passes validation | `npx @finos/calm-cli validate -a code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json` | `hasErrors: false, hasWarnings: false` | PASS |
| timeline-moment-v2.calm.json passes validation | `npx @finos/calm-cli validate -a code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json` | `hasErrors: false, hasWarnings: false` | PASS |
| with-hub-metadata.calm.json passes validation | `npx @finos/calm-cli validate -a code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json` | `hasErrors: false, hasWarnings: false` | PASS |
| secure-api-service.pattern.json validates as pattern | `npx @finos/calm-cli validate -p code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json` | `hasErrors: false, hasWarnings: false` | PASS |
| Lab starter valid arch passes | `npx @finos/calm-cli validate -a labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json` | `hasErrors: false, hasWarnings: false` | PASS |
| Lab starter broken arch fails | `npx @finos/calm-cli validate -a labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json` | `hasErrors: true` — "must have required property 'description' at /nodes/customer-db" | PASS |
| Quiz lint passes | `bash scripts/lint-quizzes.sh` | "50 checks passed, 0 failed" | PASS |

---

### Probe Execution

No probes declared in PLAN files. Step 7c: SKIPPED (no probe scripts for this phase).

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| MOD-04 | 04-01, 04-02, 04-03 | Module 3 has 7 fully-authored MDX chapters covering CLI, Studio, Hub, Server, VSCode, patterns, CI/CD | SATISFIED | All 7 .mdx files exist in content/module-03-calm-ecosystem/ with substantive content (143-328 lines each) |
| LAB-03 | 04-04 | Lab 3 (CI/CD gate) adds calm validate to GitHub Actions; runs without external dependencies | SATISFIED | labs/lab-03-cicd-gate/ complete: LAB.md + starter + solution; secure-api validates (0 errors); broken-api fails (1 error); requires_docker: false |
| QUIZ-04 | 04-04 | Module 3 quiz tests CLI commands, Studio workflow, Hub publish/consume, CI/CD gate pattern, pattern reuse | SATISFIED | quizzes/module-03-ecosystem.yaml: 18 questions across 7 chapters; lint-quizzes.sh exits 0 |
| ILL-04 | 04-01, 04-02, 04-03 | Module 3 has 8-10 Excalidraw B&W illustrations: CLI workflow, Studio canvas, Hub flow, CI/CD gate | SATISFIED | 10 Excalidraw stubs + 10 SVG placeholders exist; INVENTORY.md has 10 m03-* rows; exceeds 8-10 minimum |
| SLIDE-03 | 04-05 | Module 3 slide deck — 25-35 slides covering toolchain demos and CI/CD examples | SATISFIED | slides/module-03-calm-ecosystem.md: 28 slides within 25-35 range; all 10 m03-*.svg referenced; 86 speaker notes |

**Note on REQUIREMENTS.md traceability:** The REQUIREMENTS.md traceability table maps MOD-04, LAB-03, QUIZ-04, ILL-04, SLIDE-03 to "Phase 5" while ROADMAP.md clearly labels this as "Phase 4: Module 3 — The CALM Ecosystem." This is a documentation numbering inconsistency in REQUIREMENTS.md (the table uses a different phase offset starting from Module 2). The requirement descriptions and deliverables are correct and fully satisfied by this phase — the mismatch is only in the phase number column of the traceability table.

---

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `illustrations/INVENTORY.md` | All 10 m03-* stubs marked `stub — needs Excalidraw authoring` | INFO | Expected and intentional by design. INVENTORY.md itself documents this as the correct state until user authors Excalidraw files. SVG placeholder files (881-968 bytes) exist on disk and are valid XML — chapter image references all resolve. Phase gate for illustrations explicitly says status must flip to `authored` with SVG >1KB in a separate user-authoring pass. |

No TBD/FIXME/XXX markers found in any modified files. No placeholder content in MDX chapters. No hardcoded empty returns in content. No stubs hiding in chapter content.

The illustration stubs are by design, not debt. They are correctly tracked in INVENTORY.md and the SVG placeholders serve as valid resolvable references until the user authors the Excalidraw sources.

---

### Human Verification Required

#### 1. Lab 3 End-to-End Execution

**Test:** Fork `labs/lab-03-cicd-gate/starter/`, push to a GitHub repo (or run `act push` locally). Complete the calm-gate.yml stub by adding the `calm validate` step. Push to trigger GitHub Actions.

**Expected:** 
- All steps green for `secure-api.calm.json` (valid architecture)
- Step fails when `broken-api.calm.json` is validated before the learner fixes it (missing `description` field)
- After fix and re-push, all steps green again
- Total completion time under 40 minutes without assistance

**Why human:** Requires live GitHub Actions runner or `act` installation. Cannot verify PR merge behavior, CI dashboard display, or artifact upload visibility programmatically.

#### 2. Module 3 Slide Deck Marp Rendering

**Test:** Install Marp CLI (`npm install -g @marp-team/marp-cli`) and render `slides/module-03-calm-ecosystem.md` to HTML: `marp slides/module-03-calm-ecosystem.md --html`. Open in a browser.

**Expected:** 28 slides render cleanly. Speaker notes visible in presenter mode. All 10 m03-*.svg placeholder images display (as placeholder boxes — actual illustrations authored separately). Slide layout is readable without text overflow.

**Why human:** Marp rendering visual quality and layout can only be assessed visually. Cannot detect text overflow or layout breaks programmatically.

#### 3. Quiz Grading Experience

**Test:** With the Docusaurus site available (Phase 5), navigate to the Module 3 quiz, answer all 18 questions (mix of correct and incorrect answers), submit.

**Expected:** Correct answers marked green; wrong answers show the explanation text that reinforces the teaching point; `code_completion` question accepts `generate` as the answer; `short_answer` questions accept all variants in `accepted_answers` lists.

**Why human:** Quiz component rendering and auto-grading behavior requires SITE-01 (Phase 5). The YAML structure is lint-verified, but interactive behavior can only be tested against the rendered quiz component.

---

### Gaps Summary

No blocking gaps found. All 10 must-haves verified. All required artifacts exist, are substantive, and are wired. All CALM JSON files pass validation. All 7 chapters follow STYLE-GUIDE.md structure. Lab 3 architectures behave as designed (valid passes, broken fails). Quiz passes lint. Slide deck is in range.

Three items require human testing as noted above — these are behavioral/visual checks that cannot be verified programmatically. They do not indicate missing implementation; they require live execution or visual inspection.

---

_Verified: 2026-06-16_
_Verifier: Claude (gsd-verifier)_
