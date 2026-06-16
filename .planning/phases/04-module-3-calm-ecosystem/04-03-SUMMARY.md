---
phase: 04-module-3-calm-ecosystem
plan: "03"
subsystem: content
tags: [module-03, calm-ecosystem, vscode, cicd, illustrations]
dependency_graph:
  requires:
    - 04-01 (cli-toolbox.mdx, patterns-and-standards.mdx)
    - 04-02 (calm-server-validation-service.mdx — prerequisite for vscode-extension.mdx)
  provides:
    - content/module-03-calm-ecosystem/vscode-extension.mdx (Chapter 3.5)
    - content/module-03-calm-ecosystem/cicd-integration.mdx (Chapter 3.7)
    - illustrations/source/m03-vscode-extension-panels.excalidraw (stub)
    - illustrations/source/m03-cicd-gate-flow.excalidraw (stub)
    - illustrations/source/m03-full-stack-pipeline.excalidraw (stub)
    - illustrations/exported/m03-{vscode-extension-panels,cicd-gate-flow,full-stack-pipeline}.svg (placeholders)
  affects:
    - Plan 04-04 (Lab 3 — CI/CD gate — depends on cicd-integration.mdx for teaching context)
    - Phase 4 illustration set (ILL-04 requirement for 10 stubs now fully met)
tech_stack:
  added: []
  patterns:
    - MDX chapter structure per STYLE-GUIDE.md (TL;DR → Why → Concept → Examples → Mistakes → Quiz → Lab → Further reading)
    - Excalidraw stub format with detailed DIAGRAM SPEC text element
    - SVG placeholder with 800x400 viewBox and 4 descriptive text lines
key_files:
  created:
    - content/module-03-calm-ecosystem/vscode-extension.mdx
    - content/module-03-calm-ecosystem/cicd-integration.mdx
    - illustrations/source/m03-vscode-extension-panels.excalidraw
    - illustrations/source/m03-cicd-gate-flow.excalidraw
    - illustrations/source/m03-full-stack-pipeline.excalidraw
    - illustrations/exported/m03-vscode-extension-panels.svg
    - illustrations/exported/m03-cicd-gate-flow.svg
    - illustrations/exported/m03-full-stack-pipeline.svg
  modified:
    - illustrations/INVENTORY.md (3 new m03-* rows appended; total now 10 m03 rows)
decisions:
  - Bundled Schemas added as explicit H3 section to satisfy the 6-feature requirement and pass acceptance criteria; the feature was originally woven into the Real-Time Validation section but needed its own named heading
  - GitHub Actions YAML in cicd-integration.mdx exactly matches RESEARCH.md verified pattern — actions/checkout@v4, actions/setup-node@v4 node-version 22, upload-artifact@v4
  - cicd-integration.mdx contains explicit --exit-code teaching: compare PR version against Hub-published baseline, NOT block all commits
metrics:
  duration: "~6 minutes"
  completed_date: "2026-06-16"
  task_count: 2
  file_count: 9
---

# Phase 04 Plan 03: Module 3 Wave 2 — VSCode Extension and CI/CD Integration Summary

## One-liner

CALM Tools VSCode extension chapter (all 6 verified features) and the CI/CD integration chapter (exact GitHub Actions YAML from RESEARCH.md, two-level validation, correct --exit-code teaching, Hub-integrated pipeline) — completing Module 3's 7-chapter set — plus 3 Excalidraw stubs fulfilling the full ILL-04 illustration requirement of 10 m03 stubs.

## What was built

### Task 1 — MDX chapters 3.5 and 3.7 (commit: 7df0b49)

**`content/module-03-calm-ecosystem/vscode-extension.mdx`** (Chapter 3.5, 143 lines)

| Section | Content |
|---------|---------|
| TL;DR | 4 bullets: extension name (CALM Tools, FINOS), Preview Panel live diagram, Problems panel real-time validation, Timeline navigation |
| Why it matters | Context-switch cost of leaving editor; extension closes the feedback loop inline |
| Installing | 3 paths: marketplace search, `code --install-extension FINOS.calm-vscode-plugin`, marketplace URL; version 0.6.0 |
| Interactive Preview Panel | Live diagram updates on keystroke, click-to-inspect, Auto Layout via ELK; VS Studio vs Preview Panel distinction |
| Tree View navigation | Sidebar tree: Nodes (by type), Relationships (by type), Flows; click to navigate to JSON line |
| Timeline navigation | Milestone-click opens snapshot; combined with `calm diff` for change review |
| Real-Time Validation | Problems panel triggers (open/save/switch), clickable errors, same schemas as `calm validate` |
| Bundled Schemas | No network at validation time; works offline and air-gapped; `calm.urlMapping` for schema override |
| Template and documentation mode | Live docify preview; review output before running CLI |
| Configuration | `.vscode/settings.json` with all 3 keys: `calm.urlMapping`, `calm.schemas.additionalFolders`, `calm.files.globs` |
| When extension catches errors | Preventive validation story; no CI round-trip; editor and CI use same schemas |
| Common mistakes | 3 pitfalls: $schema auto-activation misunderstood, Preview Panel vs Studio confusion, files.globs without $schema field |

All 6 verified extension features covered. Extension identified as "CALM Tools" by "FINOS", marketplace ID `FINOS.calm-vscode-plugin`, version 0.6.0. Inline illustration references `m03-vscode-extension-panels.svg`.

**`content/module-03-calm-ecosystem/cicd-integration.mdx`** (Chapter 3.7, 270 lines)

| Section | Content |
|---------|---------|
| TL;DR | 5 bullets: validate on every PR, -f junit produces parseable reports, --exit-code vs Hub baseline, Hub-integrated pipeline, Lab 3 link |
| Why it matters | Architecture standards without enforcement are suggestions; CI gate closes the drift loop |
| Why architecture validation in CI | Architecture drift analogy; treat architecture like a test |
| Basic GitHub Actions workflow | Complete verified YAML: checkout@v4, setup-node@v4 (node 22), npm install -g @finos/calm-cli, validate schema, validate pattern, junit output, upload-artifact@v4 if:always() |
| JUnit XML output | -f junit flag, upload-artifact if:always() rationale, test reporter integration |
| Two validation levels | Schema-only step + pattern step as SEPARATE steps; explains WHY separate (distinct error categories) |
| calm diff as PR gate | -f summary for human-readable output; --exit-code correct use: compare against Hub-published baseline, not hardcoded version |
| Installing CALM CLI in CI | npm install -g @finos/calm-cli; version pinning; Docker builder image pattern |
| Hub-integrated pipeline | 8-step workflow: PR → Hub validate → Hub diff → tests → merge → hub push → Guard → Terraform/IaC |
| The full stack pipeline | Mental model: architecture is code, same pipeline as app code |
| Blocking strategy | Architecture gate before IaC; catches infra-update-without-architecture-update pattern |
| Lab section | Link to `../../labs/lab-03-cicd-gate/LAB.md` with one-line intro |
| Common mistakes | 5 pitfalls: single step for both validations, --exit-code on all commits, no -f junit, no if:always() on upload, Hub URL in architecture files |

Inline illustration references: `m03-cicd-gate-flow.svg` and `m03-full-stack-pipeline.svg`. Lab 3 link present. Both chapters link to `../quizzes/module-03-ecosystem.yaml`.

### Task 2 — 3 Excalidraw stubs + SVG placeholders + INVENTORY (commit: 5e03e2f)

**3 Excalidraw stubs** (all valid JSON with `type: "excalidraw"` and DIAGRAM SPEC text element):

| Stub | Chapter | DIAGRAM SPEC summary |
|------|---------|---------------------|
| `m03-vscode-extension-panels.excalidraw` | 3.5 | Wireframe: 4-panel VS Code window layout (Tree View left ~10%, JSON editor centre ~50%, Preview Panel right ~30%, Problems strip bottom); squiggly red underline on one JSON line; Auto Layout button in Preview |
| `m03-cicd-gate-flow.excalidraw` | 3.7 | Horizontal flow: PR opened → Checkout+Install → calm validate → PASS branch (upward, heavy border) → JUnit → upload-artifact → PR can merge; FAIL branch (downward, dashed) → Pipeline blocked |
| `m03-full-stack-pipeline.excalidraw` | 3.7, slide deck | Vertical 7-step pipeline: PR opened → calm validate (Gate 1) → calm diff (Gate 2) → Tests pass → PR merged → calm hub push (heavy border) → parallel tracks: CALM Guard + Terraform/IaC → Deploy |

**3 SVG placeholders** — all valid XML, all ≥400 bytes (925–965 bytes each).

**`illustrations/INVENTORY.md`** — 3 new m03-* rows appended. Total m03 rows: **10**. All prior m00-*, m01-*, m02-* rows preserved unchanged. ILL-04 requirement for 10 Module 3 stubs is now fully met.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added explicit "Bundled Schemas" H3 section to vscode-extension.mdx**

- **Found during:** Task 1 acceptance criteria verification
- **Issue:** The plan's acceptance criteria states "VSCode chapter covers all 6 verified features: Preview Panel, Tree View, Timeline Navigation, Real-Time Validation, **Bundled Schemas**, Template/Documentation Mode." The initial draft addressed bundled schemas as part of the Real-Time Validation section (mentioned "bundled CALM 1.2 schemas" in lowercase), but the automated acceptance check looked for the exact string "Bundled Schemas" and failed.
- **Fix:** Added a dedicated `### Bundled Schemas` H3 subsection between Real-Time Validation and Template/Documentation Mode, with the offline/air-gapped rationale and the `calm.urlMapping` connection.
- **Files modified:** `content/module-03-calm-ecosystem/vscode-extension.mdx`
- **Commit:** Inline fix before 7df0b49

## Validation results

```
Acceptance criteria checks (Task 1): ALL PASSED
  - vscode-extension.mdx: module 3, chapter 3.5, CALM Tools, FINOS.calm-vscode-plugin, 0.6.0 FOUND
  - vscode-extension.mdx: all 6 features named, settings.json keys, illustration ref FOUND
  - vscode-extension.mdx: 143 lines (min 90) PASSED
  - cicd-integration.mdx: module 3, chapter 3.7, -f junit, lab-03-cicd-gate FOUND
  - cicd-integration.mdx: actions/checkout@v4, upload-artifact@v4 FOUND
  - cicd-integration.mdx: m03-cicd-gate-flow.svg, m03-full-stack-pipeline.svg FOUND
  - cicd-integration.mdx: ## Lab section, labs/lab-03-cicd-gate/LAB.md FOUND
  - cicd-integration.mdx: 270 lines (min 140) PASSED

Illustration stubs check (Task 2): ALL PASSED
  - m03-vscode-extension-panels: valid JSON + DIAGRAM SPEC, SVG 965 bytes OK
  - m03-cicd-gate-flow: valid JSON + DIAGRAM SPEC, SVG 925 bytes OK
  - m03-full-stack-pipeline: valid JSON + DIAGRAM SPEC, SVG 962 bytes OK
  - INVENTORY.md: 10 m03-* rows (7 existing + 3 new) PASSED

Overall plan verification: ALL PASSED
```

## Known Stubs

The 3 new Excalidraw illustration files are stubs by design — INVENTORY.md marks them `stub — needs Excalidraw authoring`. This does NOT block the plan's goal: chapters 3.5 and 3.7 reference the SVG placeholder files which exist on disk and resolve correctly. The user authors the Excalidraw sources in the illustration pass; the phase gate requires status to flip to `authored` with SVG >1KB.

## Threat Flags

No new security-relevant surface introduced. All files are static educational MDX content and Excalidraw stubs with no network endpoints, auth paths, file access patterns, or schema changes. Threat mitigations confirmed:

- T-04-03-01 (GitHub Actions YAML tamper): YAML in Chapter 3.7 matches RESEARCH.md verified pattern exactly — `actions/checkout@v4`, `actions/setup-node@v4`, `upload-artifact@v4`; all flag names and node versions verified
- T-04-03-03 (wrong VSCode extension name/publisher): Chapter 3.5 uses exact strings "CALM Tools", "FINOS", "FINOS.calm-vscode-plugin", "0.6.0" from verified RESEARCH.md

## Self-Check: PASSED

Files verified to exist:

- `content/module-03-calm-ecosystem/vscode-extension.mdx` — FOUND
- `content/module-03-calm-ecosystem/cicd-integration.mdx` — FOUND
- `illustrations/source/m03-vscode-extension-panels.excalidraw` — FOUND
- `illustrations/source/m03-cicd-gate-flow.excalidraw` — FOUND
- `illustrations/source/m03-full-stack-pipeline.excalidraw` — FOUND
- `illustrations/exported/m03-vscode-extension-panels.svg` — FOUND
- `illustrations/exported/m03-cicd-gate-flow.svg` — FOUND
- `illustrations/exported/m03-full-stack-pipeline.svg` — FOUND

Commits verified to exist in git log:

- 7df0b49 — FOUND (Task 1: two MDX chapters)
- 5e03e2f — FOUND (Task 2: 3 Excalidraw stubs + SVG + INVENTORY)
