---
phase: 3
slug: module-2-calm-fundamentals
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-06-16
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `npx @finos/calm-cli validate` (JSON Schema validation) + `bash scripts/lint-quizzes.sh` (YAML lint) + `npx @marp-team/marp-cli` (slide render) |
| **Config file** | None — validator is stateless; quiz linter is `scripts/lint-quizzes.sh` |
| **Quick run command** | `bash scripts/validate-calm.sh` |
| **Full suite command** | `bash scripts/validate-calm.sh && bash scripts/lint-quizzes.sh` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bash scripts/validate-calm.sh`
- **After every plan wave:** Run `bash scripts/validate-calm.sh && bash scripts/lint-quizzes.sh`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 03-01-T1 | 03-01 | 1 | CODE-01 | validation | `bash scripts/validate-calm.sh` → both node-types and relationship-types JSON pass | ⬜ pending |
| 03-01-T2 | 03-01 | 1 | MOD-03 | file_state | `ls content/module-02-calm-fundamentals/*.mdx \| wc -l` ≥ 3 (Ch 2.1-2.3) | ⬜ pending |
| 03-01-T3 | 03-01 | 1 | ILL-03 | file_state | `ls illustrations/source/m02-*.excalidraw \| wc -l` = 6; `jq . illustrations/source/m02-*.excalidraw >/dev/null` | ⬜ pending |
| 03-02-T1 | 03-02 | 2 | CODE-01 | validation | `bash scripts/validate-calm.sh` → with-interfaces, with-controls, conference-signup JSON pass | ⬜ pending |
| 03-02-T2 | 03-02 | 2 | MOD-03 | file_state | `ls content/module-02-calm-fundamentals/*.mdx \| wc -l` = 7 (all Ch 2.1-2.7) | ⬜ pending |
| 03-02-T3 | 03-02 | 2 | ILL-03 | file_state | `ls illustrations/source/m02-*.excalidraw \| wc -l` = 13; `jq . illustrations/source/m02-*.excalidraw >/dev/null` | ⬜ pending |
| 03-03-T1 | 03-03 | 3 | LAB-02 | validation | `npx @finos/calm-cli validate -a labs/lab-02-conference-signup/solution/conference-signup.architecture.json -f pretty` exit 0 | ⬜ pending |
| 03-03-T2 | 03-03 | 3 | QUIZ-03 | YAML lint | `bash scripts/lint-quizzes.sh` → module-02-calm-fundamentals.yaml passes all checks | ⬜ pending |
| 03-04-T1 | 03-04 | 3 | SLIDE-02 | render | `npx @marp-team/marp-cli slides/module-02-calm-fundamentals.md --output /tmp/m02-verify.pdf` exit 0 | ⬜ pending |
| 03-04-T2 | 03-04 | 3 | CODE-02 | file_state | `test -f docs-meta/cheatsheets/module-02-cheatsheet.md && wc -l docs-meta/cheatsheets/module-02-cheatsheet.md` ≥ 50 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `code-examples/module-02-calm-fundamentals/` directory — create in Wave 1 (03-01 Task 1)
- [ ] `content/module-02-calm-fundamentals/` directory — create in Wave 1 (03-01 Task 2)
- [ ] `labs/lab-02-conference-signup/` directory — create in Wave 3 (03-03 Task 1)
- [ ] `docs-meta/cheatsheets/` directory — create in Wave 3 (03-04 Task 2)

No framework install required — `npx @finos/calm-cli` and `npx @marp-team/marp-cli` are run on-demand via npx.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Learner can name all 9 node types from memory | MOD-03 | Requires human cognitive assessment | Have tester read Chapter 2.2 and list 9 node types without looking |
| Lab 2 completes end-to-end on a fresh machine | LAB-02 | Requires clean environment + human execution | Follow LAB.md from start on a machine without pre-installed CALM files |
| Illustration stubs have adequate DIAGRAM SPEC text for user authoring | ILL-03 | Requires human judgment of spec adequacy | Read each `.excalidraw` text element and verify it describes what to draw |
| Slide deck speaker notes are accurate to chapter text | SLIDE-02 | Requires cross-reading chapter + slide | Read Ch 2.1-2.7 then verify slide speaker notes don't contradict chapters |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-06-16
