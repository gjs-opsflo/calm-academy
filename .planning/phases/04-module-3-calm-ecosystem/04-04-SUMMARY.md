---
phase: 04-module-3-calm-ecosystem
plan: "04"
subsystem: content
tags: [module-03, calm-ecosystem, lab, quiz, cicd]
dependency_graph:
  requires:
    - 04-01 (secure-api-service.pattern.json, secure-api-generated.calm.json — Lab 3 starter files)
    - 04-03 (cicd-integration.mdx — Lab 3 teaching context)
  provides:
    - labs/lab-03-cicd-gate/LAB.md (Learnforge-compatible lab with 5 steps)
    - labs/lab-03-cicd-gate/starter/.github/workflows/calm-gate.yml (stub for learner)
    - labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json (valid architecture)
    - labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json (intentionally invalid)
    - labs/lab-03-cicd-gate/starter/patterns/secure-api-service.pattern.json (pattern copy)
    - labs/lab-03-cicd-gate/starter/README.md (starter overview)
    - labs/lab-03-cicd-gate/solution/.github/workflows/calm-gate.yml (complete workflow)
    - quizzes/module-03-ecosystem.yaml (18 questions, 7 chapters)
  affects:
    - Phase 4 verification (LAB-03 and QUIZ-04 requirements now met)
    - Wave 3 slide deck (quiz completion confirms chapter coverage)
tech_stack:
  added: []
  patterns:
    - Learnforge-compatible LAB.md YAML frontmatter (id, module, chapter, steps with check kinds)
    - Step check kinds: file_state (exists + content_regex), command_regex, ai_judge
    - CALM 1.2 intentionally-broken architecture (missing required description field)
    - Quiz YAML schema: module, title, chapters array, questions with type/prompt/options/reference_section
key_files:
  created:
    - labs/lab-03-cicd-gate/LAB.md
    - labs/lab-03-cicd-gate/starter/.github/workflows/calm-gate.yml
    - labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json
    - labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json
    - labs/lab-03-cicd-gate/starter/patterns/secure-api-service.pattern.json
    - labs/lab-03-cicd-gate/starter/README.md
    - labs/lab-03-cicd-gate/solution/.github/workflows/calm-gate.yml
    - quizzes/module-03-ecosystem.yaml
  modified: []
decisions:
  - broken-api.calm.json uses missing description on customer-db node as the intentional breakage (clearest error message for learners)
  - Lab requires_docker false — Hub is stretch goal only, not required for core lab steps
  - Quiz types: 12 multiple_choice + 1 code_completion (q3.6.1) + 5 short_answer = 18 total (between 16-20 target)
  - Verbatim sample questions from RESEARCH.md used for q3.1.1 and q3.6.1 as specified
  - Solution workflow uses pinned action versions (checkout@v4, setup-node@v4, upload-artifact@v4) per T-04-04-02 threat mitigation
metrics:
  duration: "~25 minutes"
  completed_date: "2026-06-16"
  task_count: 2
  file_count: 8
---

# Phase 04 Plan 04: Lab 3 (CI/CD Gate) and Module 3 Quiz Summary

## One-liner

Lab 3 CI/CD gate (LAB.md + 5-step Learnforge-compatible scaffold with valid and intentionally-broken architectures + complete GitHub Actions solution) and Module 3 ecosystem quiz (18 questions across 7 chapters, lint-quizzes.sh exits 0).

## What was built

### Task 1 — Lab 3 CI/CD Gate (commit: 113bc26)

Created the full Lab 3 directory structure at `labs/lab-03-cicd-gate/`:

**`LAB.md`** — Learnforge-compatible lab instructions with YAML frontmatter:

| Field | Value |
|-------|-------|
| id | lab-03-cicd-gate |
| module | 3 |
| chapter | 3.7 |
| estimated_minutes | 35 |
| difficulty | 2 |
| requires_docker | false |
| steps | 5 (step-1 through step-5) |
| check kinds used | file_state (exists), command_regex, ai_judge, file_state (content_regex) |

Step checks:
- step-1: `file_state` — `.github/workflows/calm-gate.yml` exists (learner in starter directory)
- step-2: `command_regex` — `npx @finos/calm-cli validate -a architectures/secure-api.calm.json -f pretty` → pattern "0 errors"
- step-3: `file_state` content_regex — `.github/workflows/calm-gate.yml` contains "calm validate" (after learner edits stub)
- step-4: `ai_judge` — GitHub Actions run (or act) shows all steps green for valid architecture
- step-5: `command_regex` — `npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty` → pattern "0 errors" (after learner adds missing field)

Markdown body: Goal, Setup (including `act` local fallback), Walkthrough (5 steps with copy-paste commands), Stretch goals (calm diff, Hub publish, JUnit report), Solution reference.

**Starter directory** (`labs/lab-03-cicd-gate/starter/`):

| File | Purpose | Validation |
|------|---------|-----------|
| `.github/workflows/calm-gate.yml` | Stub workflow with TODO comment | N/A (intentionally incomplete) |
| `architectures/secure-api.calm.json` | Valid architecture | `calm validate -a` → 0 errors |
| `architectures/broken-api.calm.json` | Missing `description` on `customer-db` node | `calm validate -a` → 1 error (missing required property) |
| `patterns/secure-api-service.pattern.json` | Copy of code-examples pattern | N/A (pattern file) |
| `README.md` | One-paragraph starter overview | N/A |

**Solution directory** (`labs/lab-03-cicd-gate/solution/`):

Complete GitHub Actions workflow with all steps from RESEARCH.md verified pattern:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` (node-version: '22')
3. `npm install -g @finos/calm-cli`
4. `calm validate -a architectures/secure-api.calm.json -f pretty` (schema validation)
5. `calm validate -a architectures/secure-api.calm.json -p patterns/secure-api-service.pattern.json -f pretty` (pattern validation)
6. `calm validate ... -f junit -o calm-validation-results.xml` (JUnit output)
7. `actions/upload-artifact@v4` with `if: always()` (test results upload)

### Task 2 — Module 3 Quiz (commit: 816839b)

Created `quizzes/module-03-ecosystem.yaml` with 18 questions across 7 chapters:

| Chapter | Questions | Types |
|---------|-----------|-------|
| 3.1 CLI | 3 (q3.1.1-3) | MC, MC, short_answer |
| 3.2 Studio | 2 (q3.2.1-2) | MC, MC |
| 3.3 Hub | 3 (q3.3.1-3) | MC, short_answer, MC |
| 3.4 Server | 2 (q3.4.1-2) | MC, MC |
| 3.5 VSCode | 2 (q3.5.1-2) | MC, short_answer |
| 3.6 Patterns | 3 (q3.6.1-3) | code_completion, MC, short_answer |
| 3.7 CI/CD | 3 (q3.7.1-3) | MC, MC, short_answer |
| **Total** | **18** | **12 MC + 1 code_completion + 5 short_answer** |

Question highlights:
- q3.1.1 (verbatim from RESEARCH.md): `-f junit` flag for CI dashboards
- q3.6.1 (verbatim from RESEARCH.md): `calm generate` code completion
- q3.2.2: bidirectional sync explanation (canvas ↔ JSON panel)
- q3.3.3: Hub 401 on default Maven profile (common pitfall)
- q3.4.2: scenario-based — platform team centralized validation (CALM Server)
- q3.7.1: `calm diff --exit-code` behavior

Lint results: `bash scripts/lint-quizzes.sh` → 50 checks passed, 0 failed, exit 0.

## Deviations from Plan

None — plan executed exactly as written.

The plan specified verbatim sample questions for q3.1.1 and q3.6.1 from RESEARCH.md — both used exactly as specified. All 5 step checks match the RESEARCH.md "Lab 3 steps" section verbatim. Solution workflow YAML matches RESEARCH.md verified pattern exactly.

## Threat Mitigations Applied

Per the plan's threat register:

- **T-04-04-01** (Tampering — architecture files): `secure-api.calm.json` validated with `npx @finos/calm-cli validate -a` → 0 errors. `broken-api.calm.json` confirmed fails validation → 1 error (missing description on customer-db node). Both behaviors match acceptance criteria.

- **T-04-04-02** (Tampering — GitHub Actions YAML): Solution workflow uses pinned versions: `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`. No third-party actions introduced. `@finos/calm-cli` installed via `npm install -g` (official FINOS package, previously verified at 1.45.0).

- **T-04-04-SC** (Tampering — npm install): Uses `npm install -g @finos/calm-cli` — the same official FINOS package verified in RESEARCH.md. No new packages introduced.

## Validation Results

```
calm validate -a labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json → 0 errors (exit 0)
calm validate -a labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json → 1 error: missing 'description' on customer-db (exit 1)
bash scripts/lint-quizzes.sh → 50 checks passed, 0 failed (exit 0)
grep -c 'id: q3\.' quizzes/module-03-ecosystem.yaml → 18 questions
```

## Known Stubs

None. All lab files are complete and functional:
- `secure-api.calm.json` passes validation (not a placeholder)
- `broken-api.calm.json` is intentionally invalid by design (this is the pedagogical point, not a stub)
- The starter workflow stub has a TODO comment by design (the learner fills it in — this is the lab exercise)
- The solution workflow is complete

## Threat Flags

No new security-relevant surface introduced. All files are educational content (YAML, JSON, Markdown). No network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

Files verified to exist:

- `labs/lab-03-cicd-gate/LAB.md` — FOUND
- `labs/lab-03-cicd-gate/starter/.github/workflows/calm-gate.yml` — FOUND
- `labs/lab-03-cicd-gate/starter/architectures/secure-api.calm.json` — FOUND
- `labs/lab-03-cicd-gate/starter/architectures/broken-api.calm.json` — FOUND
- `labs/lab-03-cicd-gate/starter/patterns/secure-api-service.pattern.json` — FOUND
- `labs/lab-03-cicd-gate/starter/README.md` — FOUND
- `labs/lab-03-cicd-gate/solution/.github/workflows/calm-gate.yml` — FOUND
- `quizzes/module-03-ecosystem.yaml` — FOUND

Commits verified:
- 113bc26 — FOUND (Task 1: Lab 3 CI/CD gate)
- 816839b — FOUND (Task 2: Module 3 quiz)
