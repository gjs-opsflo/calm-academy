---
phase: 06-polish-milestone-close
plan: 01
subsystem: ci-and-content
tags: [ci, broken-links, quiz, lab, symlink, validation]
dependency_graph:
  requires: []
  provides: [CODE-01-closed, site-static-labs-symlink, zero-broken-quiz-links, zero-broken-lab-links]
  affects: [.github/workflows/ci.yml, site/static/labs, content/module-00-on-ramp, content/module-01-case-for-aac, content/module-02-calm-fundamentals, content/module-03-calm-ecosystem]
tech_stack:
  added: []
  patterns: [additive-ci-step, docusaurus-static-symlink, prose-redirect-pattern]
key_files:
  created:
    - site/static/labs (symlink -> ../../labs)
  modified:
    - .github/workflows/ci.yml
    - content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx
    - content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx
    - content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx
    - content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx
    - content/module-00-on-ramp/your-first-calm-document.mdx
    - content/module-01-case-for-aac/architecture-debt-crisis.mdx
    - content/module-01-case-for-aac/introducing-calm.mdx
    - content/module-01-case-for-aac/lessons-from-adjacent-disciplines.mdx
    - content/module-01-case-for-aac/what-architecture-as-code-enables.mdx
    - content/module-02-calm-fundamentals/calm-specification.mdx
    - content/module-02-calm-fundamentals/controls.mdx
    - content/module-02-calm-fundamentals/decorators.mdx
    - content/module-02-calm-fundamentals/interfaces.mdx
    - content/module-02-calm-fundamentals/nodes.mdx
    - content/module-02-calm-fundamentals/relationships.mdx
    - content/module-02-calm-fundamentals/building-your-first-architecture.mdx
    - content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx
    - content/module-03-calm-ecosystem/calm-server-validation-service.mdx
    - content/module-03-calm-ecosystem/calm-studio-visual-design.mdx
    - content/module-03-calm-ecosystem/cli-toolbox.mdx
    - content/module-03-calm-ecosystem/patterns-and-standards.mdx
    - content/module-03-calm-ecosystem/vscode-extension.mdx
    - content/module-03-calm-ecosystem/cicd-integration.mdx
decisions:
  - "Add additive CI step (not unified find) to keep *.calm.json and *.architecture.json validation paths separate — preserves known accepted deviation for relationship-types-reference.architecture.json"
  - "Replace broken quiz links with prose redirect rather than raw YAML links — interactive quiz in final chapter is the authoritative experience"
  - "Replace broken lab links with GitHub blob URLs — simpler than serving from static; symlink enables future Docusaurus-served links"
  - "site/static/labs symlink follows same pattern as site/static/img -> ../../illustrations/exported"
metrics:
  duration: "~25 minutes"
  completed_date: "2026-06-18"
  tasks_completed: 2
  files_changed: 25
---

# Phase 06 Plan 01: CI Validation Gap + Broken Link Fix Summary

**One-liner:** Closed CODE-01 CI gap by adding `bash scripts/validate-calm.sh` step; removed 19 broken quiz YAML links from 19 non-final chapters; replaced 9 broken lab relative links with GitHub URLs; created `site/static/labs` symlink; fixed vscode-extension.mdx D9 cross-refs.

## What Was Built

### Task 1: CI CODE-01 Gap Closed (commit ae83b7a)

Added a second `run` step to the `validate-calm-examples` job in `.github/workflows/ci.yml`:

```yaml
- name: Validate legacy architecture.json examples
  run: bash scripts/validate-calm.sh
```

This covers the 6 `*.architecture.json` files that the existing `*.calm.json` glob missed:
- `code-examples/module-00-on-ramp/todo-api.architecture.json`
- `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`
- `code-examples/module-02-calm-fundamentals/node-types-reference.architecture.json`
- `code-examples/module-02-calm-fundamentals/relationship-types-reference.architecture.json`
- `code-examples/module-02-calm-fundamentals/with-controls.architecture.json`
- `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json`

CI now validates all 10 CALM files across both extension types.

### Task 2: Broken Links + Static Labs Symlink (commit 650981b)

**Sub-step A — `site/static/labs` symlink:**
- Created `site/static/labs -> ../../labs` (mode 120000, follows same pattern as `site/static/img`)
- Git-tracked as a symlink

**Sub-step B — 19 broken quiz YAML links removed from 19 non-final chapters:**
- Replaced every `[Take the quiz](...quizzes/module-NN.yaml)` pattern with:
  `Complete the module quiz in the final chapter of each module.`
- vscode-extension.mdx special case: replaced with `Complete the module quiz in the [CI/CD Integration](./cicd-integration.mdx) chapter.`
- Affected modules: Module 0 (4 chapters), Module 1 (4 chapters), Module 2 (5 chapters), Module 3 (5 chapters minus 1 final = 5 non-final)
- Final chapters (governance-frameworks-and-aac.mdx, your-first-calm-document.mdx, building-your-first-architecture.mdx, cicd-integration.mdx) were NOT modified — they retain their proper `import quizData` + `<Quiz />` pattern

**Sub-step C — 9 broken lab relative links replaced with GitHub URLs:**
- Lab 0 links (5 occurrences in module-00): `../../labs/lab-00-on-ramp/LAB.md` → `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-00-on-ramp/LAB.md`
- Lab 2 links (2 occurrences in building-your-first-architecture.mdx): → `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-02-conference-signup/LAB.md`
- Lab 3 links (2 occurrences in cicd-integration.mdx): → `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-03-cicd-gate/LAB.md`

**Sub-step D — vscode-extension.mdx D9 chapter-number cross-refs fixed:**
- Removed `Chapter 3.7,` and `Chapter 3.1,` prose from Further Reading section
- Links already used slug-based `.mdx` references; prose chapter numbers were redundant

**Sub-step E — cicd-integration.mdx Further Reading chapter-number refs fixed:**
- Removed `Chapter 3.6,` and `Chapter 3.3,` prose from Further Reading section (same deviation as vscode-extension.mdx)

**Sub-step F — Module 01 chapter-number hyperlink audit:**
- Confirmed zero chapter-number hyperlinks in module-01-case-for-aac/ (`rg "\[.*Chapter [0-9]+\.[0-9]+\]\("` returns 0)
- In-prose references (76 across all modules) are not hyperlinks — confirmed as style tech debt, not blocker

## Verification Results

All checks passed:

| Check | Result |
|-------|--------|
| `ci.yml` contains `bash scripts/validate-calm.sh` | PASS |
| `site/static/labs` symlink mode 120000 → `../../labs` | PASS |
| `rg "quizzes/module" content/` — only `@site/src/quizzes/` import lines in 4 final chapters | PASS |
| `rg "../../labs/lab-" content/` returns 0 | PASS |
| GitHub lab URLs count: 9 across 7 files | PASS |
| `vscode-extension.mdx` quiz line contains `Complete the module quiz...` | PASS |
| `vscode-extension.mdx` Further Reading has no `Chapter 3.7` or `Chapter 3.1` | PASS |
| `cd site && npm run build` succeeds with zero new errors | PASS |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] cicd-integration.mdx Further Reading had chapter-number prose refs**
- **Found during:** Task 2 Sub-step D
- **Issue:** cicd-integration.mdx Further Reading had `— Chapter 3.6,` and `— Chapter 3.3,` prose refs (same D9 issue as vscode-extension.mdx but not listed explicitly in the plan)
- **Fix:** Removed the chapter number prose from both Further Reading lines
- **Files modified:** `content/module-03-calm-ecosystem/cicd-integration.mdx`
- **Commit:** 650981b (included in Task 2 commit)

**2. [Observation] Lab link count 9 not 10**
- The research documented 10 broken lab links in 7 files. Direct file inspection shows `your-first-calm-document.mdx` had 1 actual hyperlink + 1 code comment (`// Reference solution: labs/lab-00-on-ramp/...`). The code comment is not a hyperlink and not a broken link — no fix needed. Actual hyperlink fixes: 9.

## Known Stubs

None. This plan modified CI config and existing MDX content only — no UI rendering or data components involved.

## Threat Flags

None. Changes are: additive CI step (T-06-01 mitigated — change is additive only), symlink to educational content (T-06-03 accepted), MDX content bulk edit (T-06-04 mitigated — build verified clean). No new network endpoints, auth paths, or schema changes.

## Self-Check: PASSED

Files exist:
- `.github/workflows/ci.yml` — modified with new step
- `site/static/labs` — symlink created
- All 19 MDX chapter files — quiz links replaced
- All 7 lab-link MDX files — lab links replaced

Commits exist:
- ae83b7a — CI validation step
- 650981b — broken links + symlink fix
