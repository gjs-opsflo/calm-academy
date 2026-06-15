---
phase: "01"
phase_slug: module-0-on-ramp
date: "2026-06-15"
nyquist_validation: true
---

# Validation Strategy: Phase 01 — Module 0 On-Ramp

## Test Framework

| Property | Value |
|----------|-------|
| CALM JSON validation | `npx @finos/calm-cli validate -a <file>.architecture.json` |
| Quiz YAML validation | `scripts/lint-quizzes.sh` |
| Lab verification | `scripts/test-lab.sh lab-00-on-ramp` |
| MDX presence check | `ls content/module-00-on-ramp/*.mdx | wc -l` |
| Quick run | `npx @finos/calm-cli validate -a code-examples/module-00-on-ramp/todo-api.architecture.json` |

## Phase Requirements — Test Map

| Req ID | Behavior | Test Type | Command | Built By |
|--------|----------|-----------|---------|----------|
| MOD-01 | 5 MDX chapters present | file_state | `ls content/module-00-on-ramp/*.mdx \| wc -l` → 5 | Plan 01-01/02/03 |
| MOD-01 | MDX frontmatter valid | lint | `markdownlint content/module-00-on-ramp/*.mdx` | Plan 01-01/02/03 |
| LAB-01 | Solution validates end-to-end | unit | `npx @finos/calm-cli validate -a labs/lab-00-on-ramp/solution/*.architecture.json` | Plan 01-03 |
| LAB-01 | Lab is Docker-free | file_state | `grep 'requires_docker: false' labs/lab-00-on-ramp/LAB.md` | Plan 01-03 |
| LAB-01 | test-lab.sh exits 0 | integration | `scripts/test-lab.sh lab-00-on-ramp` | Plan 01-03 |
| QUIZ-01 | Quiz YAML schema valid | lint | `scripts/lint-quizzes.sh` | Plan 01-03 |
| QUIZ-01 | One correct answer per question | lint | (part of lint-quizzes.sh) | Plan 01-03 |
| ILL-01 | 3+ SVG files in illustrations/exported/ | file_state | `ls illustrations/exported/m00-*.svg \| wc -l` ≥ 3 | Plan 01-02 (stubs) + user authoring |
| CODE-01 | code-examples validates | unit | `npx @finos/calm-cli validate -a code-examples/module-00-on-ramp/todo-api.architecture.json` | Plan 01-01 |

## Sampling Rate

- **Per task commit:** Run `npx @finos/calm-cli validate` on any `.architecture.json` modified
- **Per wave merge:** All file_state checks + CALM validation + markdownlint on new chapters
- **Phase gate:** All checks in test map pass before `/gsd:verify-work`

## Wave 0 Gaps (built during phase execution)

- [ ] `scripts/lint-quizzes.sh` — QUIZ-01 schema validation (Plan 01-01 stub, 01-03 upgrade)
- [ ] `scripts/test-lab.sh` — LAB-01 end-to-end verification (Plan 01-03)
- [ ] `scripts/validate-calm.sh` — CODE-01 batch validation (Plan 01-01)

## ILL-01 Gate Note

ILL-01 requires exported SVGs authored in Excalidraw by user. Plans create Excalidraw stubs with authoring specs. Phase gate requires:
1. `illustrations/source/m00-*.excalidraw` files exist (stubs have authoring instructions)
2. User exports SVGs to `illustrations/exported/m00-*.svg`
3. SVG files are non-placeholder (> 1KB, not the generated rectangle placeholder)
4. SVGs are inline-referenced in chapter MDX files

This step requires manual user action before `/gsd:verify-work` is run.
