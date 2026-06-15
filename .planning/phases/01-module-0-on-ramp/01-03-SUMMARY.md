---
phase: 01-module-0-on-ramp
plan: "03"
subsystem: content
tags: [calm, calm-1.2, lab, quiz, mdx, finos, learnforge, module-00]

# Dependency graph
requires:
  - "01-01 (todo-api.architecture.json, scripts/validate-calm.sh, scripts/lint-quizzes.sh stub)"
provides:
  - "Chapter 0.5 (your-first-calm-document.mdx) — lab wrapper chapter with 3-sentence frame, lab link, validate command, hook closing paragraph"
  - "Lab 0 (labs/lab-00-on-ramp/LAB.md) — Learnforge-compatible YAML frontmatter (4 Docker-free steps) + Markdown walkthrough"
  - "Lab 0 solution (labs/lab-00-on-ramp/solution/my-system.architecture.json) — simple-blog 4-node architecture, validates with calm CLI exit 0"
  - "Lab 0 starter (labs/lab-00-on-ramp/starter/README.md) — explains empty starter pattern"
  - "Module 0 quiz (quizzes/module-00-on-ramp.yaml) — 5 questions across 3 chapters covering all QUIZ-01 topic areas"
  - "scripts/lint-quizzes.sh — upgraded from stub to full schema checker (19 checks pass)"
  - "scripts/test-lab.sh — new LAB-01 end-to-end CI verification script"
affects: [module-00, lab-00, quiz-00]

# Tech tracking
tech-stack:
  added:
    - "python3 yaml module (for lint-quizzes.sh schema validation)"
  patterns:
    - "Learnforge-compatible LAB.md: YAML frontmatter (id, title, module, chapter, estimated_minutes, difficulty, prerequisites, requires_docker, workspace, objectives, steps, resources) + Markdown body"
    - "ai_judge step check for subjective verification (step-1 method verification, step-4 visualization confirmation)"
    - "Quiz YAML schema: module-level grouping by chapter, question types (multiple_choice, code_completion), id format q{module}.{chapter}.{question}"
    - "lint-quizzes.sh: Python3 YAML validation with structured error reporting"
    - "test-lab.sh: npx @finos/calm-cli validate on solution files + LAB.md existence + requires_docker check"

key-files:
  created:
    - content/module-00-on-ramp/your-first-calm-document.mdx
    - labs/lab-00-on-ramp/LAB.md
    - labs/lab-00-on-ramp/solution/my-system.architecture.json
    - labs/lab-00-on-ramp/starter/README.md
    - quizzes/module-00-on-ramp.yaml
    - scripts/test-lab.sh
  modified:
    - scripts/lint-quizzes.sh (upgraded from stub to full schema checker)

key-decisions:
  - "step-1 uses ai_judge not exit_code on npx @calmstudio/mcp — package is not on npm per research resolution; ai_judge prompt covers all three valid paths (Claude Code MCP, Claude Desktop MCP, CALM Studio web)"
  - "lint-quizzes.sh upgraded via Python3/yaml (not yq) — the installed yq is yq 3.4.3 which uses jq-style syntax but Python3 yaml is more reliable for nested structure iteration"
  - "solution/my-system.architecture.json models Simple Blog (reader/blog-web/blog-api/posts-db) — distinct from todo-api in code-examples/ so learners compare structure not copy content"
  - "Chapter 0.5 targets 1000-1500 words as lab wrapper (not concept deep-dive) — 1437 words achieved"
  - "[verify URL before publication] annotation retained for CALM Studio web URL per research open question resolution (URL not publicly confirmable at research time)"

# Metrics
duration: 5min
completed: 2026-06-15
---

# Phase 1 Plan 03: Lab 0, Quiz, Chapter 0.5, Lint/Test Scripts Summary

**Lab 0 with validated simple-blog solution, Module 0 quiz YAML (5 questions, 3 chapters), Chapter 0.5 lab wrapper, upgraded lint-quizzes.sh (19 schema checks), and new test-lab.sh — completing the hands-on half of Module 0**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-15T09:02:47Z
- **Completed:** 2026-06-15T09:08:41Z
- **Tasks:** 3 / 3
- **Files modified:** 7 created, 1 upgraded

## Accomplishments

- Created `labs/lab-00-on-ramp/LAB.md` — Learnforge-compatible YAML frontmatter with 4 Docker-free steps; step-1 uses ai_judge covering all 3 CALM access paths (not exit_code on non-existent npx @calmstudio/mcp); step-2 file_state; step-3 command_regex; step-4 ai_judge; requires_docker: false explicitly set
- Created `labs/lab-00-on-ramp/solution/my-system.architecture.json` — Simple Blog: 4 nodes (actor/webclient/service/database), 3 relationships; validated with npx @finos/calm-cli exit 0, hasErrors: false, no warnings
- Created `labs/lab-00-on-ramp/starter/README.md` — explains empty starter pattern (learners generate their own file)
- Created `scripts/test-lab.sh` — validates solution CALM files with calm CLI, checks LAB.md exists, checks requires_docker: false; exits 0
- Created `quizzes/module-00-on-ramp.yaml` — 5 questions (q0.1.1, q0.1.2, q0.4.1, q0.5.1, q0.5.2, q0.5.3) across chapters 0.1, 0.4, 0.5; all QUIZ-01 topic areas covered; q0.4.1 tests correct calmstudio-mcp setup (correct answer: claude mcp list, NOT npx @calmstudio/mcp)
- Upgraded `scripts/lint-quizzes.sh` from stub to full schema checker via Python3/yaml — validates YAML syntax, ID format (qNN.N.N), single correct answer per multiple_choice, reference_section present; 19 checks all pass against the new quiz file
- Authored `content/module-00-on-ramp/your-first-calm-document.mdx` (Chapter 0.5) — 1437 words; lab wrapper structure; 3-sentence frame with FSI example; generate/validate/visualize steps; prominent lab link; hook closing paragraph; 4 common mistakes; validate command with expected output shown

## Task Commits

Each task was committed atomically:

1. **Task 1: Lab 0 — LAB.md, starter, validated solution, test-lab.sh** - `99a86f3` (feat)
2. **Task 2: Module 0 quiz YAML and upgraded lint-quizzes.sh** - `3306055` (feat)
3. **Task 3: Chapter 0.5 — Your First CALM Document** - `68499a3` (docs)

## Files Created/Modified

| File | Status | Purpose |
|------|--------|---------|
| labs/lab-00-on-ramp/LAB.md | Created | LAB-01 — Learnforge-compatible lab with 4 Docker-free steps |
| labs/lab-00-on-ramp/solution/my-system.architecture.json | Created | Simple Blog reference solution, validates with calm CLI |
| labs/lab-00-on-ramp/starter/README.md | Created | Explains the empty starter pattern |
| scripts/test-lab.sh | Created | LAB-01 CI verification: calm validate + LAB.md checks |
| quizzes/module-00-on-ramp.yaml | Created | 5-question quiz across 3 chapters (QUIZ-01) |
| scripts/lint-quizzes.sh | Upgraded | Full schema checker replacing Plan 01-01 stub |
| content/module-00-on-ramp/your-first-calm-document.mdx | Created | Chapter 0.5 lab wrapper (1437 words) |

## Decisions Made

- **ai_judge for step-1 (not exit_code):** Research confirmed @calmstudio/mcp is NOT on npm. Using exit_code on `npx @calmstudio/mcp --version` would always fail. The ai_judge prompt instead covers all three valid access paths and explicitly flags the npm non-availability.
- **Python3/yaml for lint-quizzes.sh:** The installed yq (3.4.3) uses jq-style syntax. While functional for simple queries, iterating nested YAML structures for per-question validation is more robust in Python3. Python3 yaml is available in the project environment and produces clearer error messages.
- **Simple Blog as solution:** Distinct from the todo-api example in code-examples/ (reader/blog-web/blog-api/posts-db vs user/todo-web/todo-api/todo-db). Different enough that learners compare structure without the temptation to copy-paste. Same 4-node pattern ensures tractability.
- **1437-word chapter target met:** Chapter 0.5 is a lab wrapper, not a concept chapter. 1437 words keeps it focused on motivation and next steps rather than spec explanation (which belongs in Chapters 0.3 and beyond).

## Deviations from Plan

None — plan executed exactly as written. All three tasks completed per the plan specification. The calmstudio-mcp npm non-availability deviation was pre-resolved in RESEARCH.md and accounted for in the plan itself (step-1 ai_judge pattern).

## Known Stubs

- `[verify URL before publication]` annotation appears in LAB.md (step-4 hints, walkthrough) and Chapter 0.5 (visualizing section): The CALM Studio web URL (`https://studio.calm.finos.org`) was not publicly confirmable at research time. The annotation is intentional and instructs course editors to verify before publication. Tracked in Plan 01-RESEARCH.md Open Questions (RESOLVED). No functional content blocked by this stub — the lab's primary verification (step-3) is the CLI validate command, not Studio visualization.

## Threat Flags

None — all files are static content (MDX chapter, LAB.md, quiz YAML) and a fictional tutorial CALM JSON. T-03-01 (solution file) disposition is `accept` per plan threat model — Simple Blog contains no real credentials, no PII, no production architecture data. T-03-03 (ai_judge usage) disposition is `accept` — 2 of 4 steps use ai_judge, which is within the LAB-FORMAT.md guidance of "use sparingly".

## Verification Results

All 10 verification checks from the plan passed:

| Check | Result |
|-------|--------|
| 1. Chapter count = 5 | PASS |
| 2. Lab solution validates (hasErrors: false, exit 0) | PASS |
| 3. Quiz linter exits 0 (19 checks) | PASS |
| 4. test-lab.sh exits 0 | PASS |
| 5. No invented node types in solution | PASS (actor, webclient, service, database — all valid) |
| 6. requires_docker: false in LAB.md | PASS |
| 7. No exit_code check on npx @calmstudio/mcp | PASS (0 occurrences) |
| 8. Lab link in Chapter 0.5 | PASS (1 occurrence) |
| 9. Quiz IDs conform to qNN.N.N pattern | PASS (all 6 IDs) |
| 10. Full validate-calm.sh (todo-api + solution) | PASS |

## Self-Check: PASSED

All files confirmed present on disk. All three task commits confirmed in git log.

| Check | Status |
|---|---|
| labs/lab-00-on-ramp/LAB.md | FOUND |
| labs/lab-00-on-ramp/solution/my-system.architecture.json | FOUND |
| labs/lab-00-on-ramp/starter/README.md | FOUND |
| scripts/test-lab.sh | FOUND |
| quizzes/module-00-on-ramp.yaml | FOUND |
| scripts/lint-quizzes.sh (upgraded) | FOUND |
| content/module-00-on-ramp/your-first-calm-document.mdx | FOUND |
| .planning/phases/01-module-0-on-ramp/01-03-SUMMARY.md | FOUND |
| Commit 99a86f3 (Task 1) | FOUND |
| Commit 3306055 (Task 2) | FOUND |
| Commit 68499a3 (Task 3) | FOUND |

---
*Phase: 01-module-0-on-ramp*
*Completed: 2026-06-15*
