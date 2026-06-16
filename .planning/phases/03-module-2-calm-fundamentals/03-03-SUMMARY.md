---
phase: 03-module-2-calm-fundamentals
plan: "03"
subsystem: module-02-labs-and-quiz
tags: [module-02, lab-02, quiz, calm-validation, learnforge]
dependency_graph:
  requires:
    - 03-01 (chapters 2.1-2.7 authored)
    - 03-02 (interfaces, controls, decorators chapters and conference-signup code example)
  provides:
    - labs/lab-02-conference-signup/ (Lab 2 complete with starter + solution)
    - quizzes/module-02-calm-fundamentals.yaml (21-question Module 2 quiz)
  affects:
    - Module 2 learning loop (lab proves skill, quiz tests vocabulary coverage)
tech_stack:
  added: []
  patterns:
    - Learnforge-compatible LAB.md YAML frontmatter (7 steps, command_regex + file_state + ai_judge)
    - CALM 1.2 minimal valid skeleton (2 nodes, 1 relationship) for lab starter
    - YAML quiz schema with 3/4/3/3/3/3/2 chapter distribution
key_files:
  created:
    - labs/lab-02-conference-signup/LAB.md
    - labs/lab-02-conference-signup/starter/conference-signup.architecture.json
    - labs/lab-02-conference-signup/starter/README.md
    - labs/lab-02-conference-signup/solution/conference-signup.architecture.json
    - quizzes/module-02-calm-fundamentals.yaml
  modified: []
decisions:
  - "Lab starter is a valid CALM 1.2 document (2 nodes, 1 relationship) — intentionally minimal but passes calm validate with zero errors"
  - "Lab uses 7 steps (6 objective-aligned + 1 ai_judge for CALM Studio visualization) per plan spec"
  - "Quiz uses accepted_answers (not accepted_patterns) for all short_answer questions per critical constraint"
  - "q2.3.3 protocol enum question includes 16 accepted_answers covering all major valid triplets to maximize grader correctness"
  - "solution file is content-identical to code-examples/module-02-calm-fundamentals/conference-signup.architecture.json (byte-matched)"
metrics:
  duration: "~35 minutes"
  completed: "2026-06-16T05:02:55Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 03 Plan 03: Lab 2 + Module 2 Quiz Summary

**One-liner:** Lab 2 teaches hand-writing CALM 1.2 (6 nodes, 5 relationships, 1 interface, 1 control); 21-question quiz covers all 7 chapters with pitfall-focused questions.

## What Was Built

### Task 1: Lab 2 — Conference Signup (feat(lab-02): commit 8a34024)

**Files created:**
- `labs/lab-02-conference-signup/LAB.md` — Learnforge-compatible YAML frontmatter with 7 steps + 6 objectives + 6 resources. Steps use `file_state`, `command_regex` (5 steps), and `ai_judge` (step 7 for CALM Studio visualization). Markdown body has Goal, Setup, Walkthrough (all 7 steps), Stretch Goals (3 extensions), and Solution sections.
- `labs/lab-02-conference-signup/starter/conference-signup.architecture.json` — Intentionally minimal valid CALM 1.2 document: 2 nodes (conference-attendee/actor, conference-website/webclient) + 1 relationship (interacts). Passes `calm validate` with zero errors.
- `labs/lab-02-conference-signup/starter/README.md` — Brief setup guide listing the 5 tasks and pointing to LAB.md and solution.
- `labs/lab-02-conference-signup/solution/conference-signup.architecture.json` — Complete conference signup architecture: 6 nodes (actor, webclient, network, service, database, system), 5 relationships (interacts, 3x connects with HTTPS/mTLS/JDBC, deployed-in), 1 freeform interface on attendees service, 1 encryption-in-transit top-level control. Content-identical to `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`.

**Validation results:**
```
npx @finos/calm-cli validate -a labs/lab-02-conference-signup/starter/conference-signup.architecture.json
  hasErrors: false, hasWarnings: false

npx @finos/calm-cli validate -a labs/lab-02-conference-signup/solution/conference-signup.architecture.json
  hasErrors: false, hasWarnings: false

bash scripts/validate-calm.sh (all code-examples/)
  Validation summary: 6 passed, 0 failed
```

### Task 2: Module 2 Quiz (feat(module-02): commit 400fe8d)

**File created:** `quizzes/module-02-calm-fundamentals.yaml`

**Stats:**
- 7 chapters, 21 questions
- Distribution: 3/4/3/3/3/3/2 (chapters 2.1–2.7)
- Type mix: 13 multiple_choice, 5 short_answer, 3 code_completion
- All 21 questions have `reference_section` pointing at existing `content/module-02-calm-fundamentals/*.mdx` files

**Pitfall questions:**
- q2.2.1: NOT a valid node type (container/component/microservice)
- q2.2.4: actor vs webclient for mobile app (correct: actor)
- q2.3.1: protocol placement in connects (correct: top-level, not inside connects object)
- q2.7.2: code_completion requiring correct placement of `protocol` field

**Lint results:**
```
python3 lint-quizzes.sh checks:
  59 checks passed, 0 failures
  YAML valid, all IDs match q2.N.N pattern, no duplicates,
  all reference_sections present, all multiple_choice have exactly 1 correct,
  all code_completion have accepted_answers
```

## Verification

```bash
# Lab structure
test -d labs/lab-02-conference-signup/starter  # PASS
test -d labs/lab-02-conference-signup/solution  # PASS
test -f labs/lab-02-conference-signup/LAB.md    # PASS

# Lab content
grep -q 'id: lab-02-conference-signup' labs/lab-02-conference-signup/LAB.md  # PASS
jq -r '.nodes | length' labs/lab-02-conference-signup/starter/conference-signup.architecture.json  # 2
jq -r '.nodes | length' labs/lab-02-conference-signup/solution/conference-signup.architecture.json  # 6
jq -r '.relationships | length' labs/lab-02-conference-signup/solution/conference-signup.architecture.json  # 5

# Validation
npx @finos/calm-cli validate -a labs/lab-02-conference-signup/starter/conference-signup.architecture.json
  # hasErrors: false
npx @finos/calm-cli validate -a labs/lab-02-conference-signup/solution/conference-signup.architecture.json
  # hasErrors: false

# Quiz
python3 (lint logic): 59/59 checks PASS
chapter slugs: calm-specification, nodes, relationships, interfaces, controls, decorators, building-your-first-architecture
question count: 21 (within 18-21 bound)
```

## Deviations from Plan

None — plan executed exactly as written.

- Lab starter uses `interacts` relationship with unique-id `attendee-interacts-website` (slightly different from code-examples `attendee-to-website`) — this is intentional to make the starter distinct and learner-identifiable.
- q2.3.3 (protocol enum short_answer) includes 16 accepted_answer triplets to maximise grader accuracy across common valid combinations. The plan specified "at least 5-6 common valid triplets" — 16 is a superset.

## Known Stubs

None — no stubs. Both starter and solution wire real CALM 1.2 data. The quiz references actual chapter files that exist.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. Lab files are static JSON; quiz is static YAML. Both rendered as read-only educational content.

## Self-Check

### Files created exist:
- labs/lab-02-conference-signup/LAB.md: FOUND
- labs/lab-02-conference-signup/starter/conference-signup.architecture.json: FOUND
- labs/lab-02-conference-signup/starter/README.md: FOUND
- labs/lab-02-conference-signup/solution/conference-signup.architecture.json: FOUND
- quizzes/module-02-calm-fundamentals.yaml: FOUND

### Commits exist:
- 8a34024 feat(lab-02): add Lab 2 conference signup hand-write exercise: FOUND
- 400fe8d feat(module-02): add Module 2 quiz with 21 questions across all 7 chapters: FOUND

## Self-Check: PASSED
