---
phase: 04-module-3-calm-ecosystem
plan: "01"
subsystem: content
tags: [module-03, calm-ecosystem, cli, patterns, code-examples, illustrations]
dependency_graph:
  requires: []
  provides:
    - code-examples/module-03-calm-ecosystem/*.calm.json (validated CALM 1.2 architecture files)
    - code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json (CALM pattern)
    - content/module-03-calm-ecosystem/cli-toolbox.mdx (Chapter 3.1)
    - content/module-03-calm-ecosystem/patterns-and-standards.mdx (Chapter 3.6)
    - illustrations/source/m03-*.excalidraw (4 Excalidraw stubs)
    - illustrations/exported/m03-*.svg (4 SVG placeholders)
  affects:
    - Wave 2 plans (chapters 3.2-3.5, 3.7 depend on 3.1 for CLI command references)
    - Lab 3 (depends on secure-api-service.pattern.json for lab exercises)
tech_stack:
  added: []
  patterns:
    - CALM 1.2 architecture (.calm.json) and pattern (.pattern.json) file conventions
    - Excalidraw stub format with DIAGRAM SPEC text element
    - SVG placeholder with 800x400 viewBox and descriptive text lines
key_files:
  created:
    - code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json
    - code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json
    - code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json
    - code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json
    - content/module-03-calm-ecosystem/cli-toolbox.mdx
    - content/module-03-calm-ecosystem/patterns-and-standards.mdx
    - illustrations/source/m03-calm-cli-command-map.excalidraw
    - illustrations/source/m03-pattern-vs-architecture.excalidraw
    - illustrations/source/m03-hub-namespace-tree.excalidraw
    - illustrations/source/m03-hub-publish-consume-flow.excalidraw
    - illustrations/exported/m03-calm-cli-command-map.svg
    - illustrations/exported/m03-pattern-vs-architecture.svg
    - illustrations/exported/m03-hub-namespace-tree.svg
    - illustrations/exported/m03-hub-publish-consume-flow.svg
  modified:
    - illustrations/INVENTORY.md (4 new m03-* rows appended)
decisions:
  - CI glob (*.calm.json) already correct — no ci.yml change needed for Module 3 code examples
  - secure-api-service.pattern.json uses .pattern.json extension so CI -a glob does not pick it up (correct by design)
  - Protocol field placed at top level of relationship objects (not nested in connects sub-object) per CALM 1.2 spec
metrics:
  duration: "~35 minutes"
  completed_date: "2026-06-16"
  task_count: 3
  file_count: 15
---

# Phase 04 Plan 01: Module 3 Wave 1 Foundation Summary

## One-liner

CALM 1.2 code examples (1 pattern + 3 architecture files all passing validate), two MDX chapters (3.1 CLI Toolbox and 3.6 Patterns and Standards following STYLE-GUIDE.md structure), and 4 Excalidraw stubs with SVG placeholders — the Wave 1 foundation that anchors all other Module 3 chapters.

## What was built

### Task 1 — CI glob verification + code examples (commit: d6e0372)

Confirmed the existing CI `validate-calm-examples` job uses `find code-examples -name "*.calm.json"` — this correctly matches all Module 3 code examples which use the `.calm.json` extension per FINOS canonical convention. No CI change was needed.

Created `code-examples/module-03-calm-ecosystem/` with:

| File | Type | Nodes | Relationships | Validation |
|------|------|-------|---------------|------------|
| `secure-api-service.pattern.json` | Pattern | 3 (network, service, database) | 2 (waf→api HTTPS, api→db) | `calm validate -p` — 0 errors |
| `secure-api-generated.calm.json` | Architecture | 3 (network, service, database) | 2 (HTTPS, JDBC) | `calm validate -a` — 0 errors |
| `timeline-moment-v1.calm.json` | Architecture | 3 (webclient, service, database) | 2 (HTTPS, JDBC) | `calm validate -a` — 0 errors |
| `timeline-moment-v2.calm.json` | Architecture | 4 (+ email-notification-service) | 3 (adds HTTPS to email) | `calm validate -a` — 0 errors |

All files use `$schema: "https://calm.finos.org/release/1.2/meta/calm.json"`. Zero invented node types (no `container`, `component`, `microservice`). Protocol field at top level of relationship objects throughout.

### Task 2 — MDX chapters 3.1 and 3.6 (commit: 9546e83)

**`content/module-03-calm-ecosystem/cli-toolbox.mdx`** (313 lines, Chapter 3.1):
- Covers all 8 CLI commands: validate, generate, diff, timeline, docify, template, init-ai, hub
- Documents the `~/.calm.json` config file via `calm init-config`
- CI integration section with GitHub Actions yaml pattern using `-f junit`
- Pitfall 4 (schema validate vs pattern validate) shown as distinct commands with distinct purposes
- Pitfall 6 (`--exit-code` misuse) explained in diff section with the correct Hub-gating pattern
- Common mistake covers `@calmstudio/mcp` with explicit "NOT available on npm / returns 404" warning
- References `timeline-moment-v1.calm.json` and `timeline-moment-v2.calm.json` in diff demo
- Inline illustration reference: `m03-calm-cli-command-map.svg`

**`content/module-03-calm-ecosystem/patterns-and-standards.mdx`** (328 lines, Chapter 3.6):
- Pattern vs architecture vs standard comparison table
- `calm generate` interactive and `--option-choices` non-interactive forms shown separately
- Full `secure-api-service.pattern.json` content in fenced ```json block with constraint explanations
- Generated architecture `secure-api-generated.calm.json` shown as its conforming instance
- Multi-pattern validation via separate `calm validate -a -p` invocations
- Org standards stored in Hub and referenced in validate calls
- Pattern library workflow: create → Hub push → team browse → generate → CI validate
- Inline illustration reference: `m03-pattern-vs-architecture.svg`

Both chapters follow STYLE-GUIDE.md section order (TL;DR → Why → Concept → Examples → Common mistakes → Knowledge check → Further reading). All cross-references use slug-based links. No "Chapter N.N" prose references.

### Task 3 — Excalidraw stubs + SVG placeholders + INVENTORY (commit: 13c1c0a)

Created 4 Excalidraw stubs in `illustrations/source/`:

| Stub | Chapter | DIAGRAM SPEC summary |
|------|---------|---------------------|
| `m03-calm-cli-command-map.excalidraw` | 3.1 | Tree: calm root → 8 primary command branches with flag children; hub expands to push/pull/list sub-branches |
| `m03-pattern-vs-architecture.excalidraw` | 3.6 | Two panels: left (pattern with const constraints) → calm generate arrow → right (architecture with filled values) |
| `m03-hub-namespace-tree.excalidraw` | 3.3 | Tree: Hub root → org.mybank (architectures/patterns/standards/controls with version annotations) + finos (patterns/controls) |
| `m03-hub-publish-consume-flow.excalidraw` | 3.3 | Horizontal flow: Architect → Hub push → CALM Hub → Hub pull → Product Team → calm validate → CI/CD Pipeline |

All stubs are valid JSON with `type: "excalidraw"` and DIAGRAM SPEC text element.

Created 4 corresponding SVG placeholders in `illustrations/exported/` — all valid XML, all >400 bytes.

Appended 4 new rows to `illustrations/INVENTORY.md` (status: `stub — needs Excalidraw authoring`). All prior m00-*, m01-*, m02-* rows preserved.

## Deviations from Plan

None — plan executed exactly as written.

The plan's Task 1 Sub-task A noted the CI glob "already correctly finds .calm.json files" if it reads `*.calm.json`. Confirmed on read — ci.yml uses `find code-examples -name "*.calm.json"`. No change made, as planned.

## Validation results

```
calm validate -a code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json → 0 errors
calm validate -a code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json  → 0 errors
calm validate -a code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json  → 0 errors
calm validate -p code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json → 0 errors
```

## Known Stubs

The 4 Excalidraw illustration files are stubs by design — the INVENTORY.md explicitly marks them `stub — needs Excalidraw authoring`. This does NOT block the plan's goal: both MDX chapters reference the SVG placeholder files which exist on disk and resolve correctly. The user authors the Excalidraw sources in a later illustration pass; the phase gate requires status to flip to `authored` with SVG >1KB.

## Self-Check: PASSED

All files verified to exist:
- `[ -f code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json ]` — FOUND
- `[ -f code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json ]` — FOUND
- `[ -f code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json ]` — FOUND
- `[ -f code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json ]` — FOUND
- `[ -f content/module-03-calm-ecosystem/cli-toolbox.mdx ]` — FOUND
- `[ -f content/module-03-calm-ecosystem/patterns-and-standards.mdx ]` — FOUND
- `[ -f illustrations/source/m03-calm-cli-command-map.excalidraw ]` — FOUND
- `[ -f illustrations/source/m03-pattern-vs-architecture.excalidraw ]` — FOUND
- `[ -f illustrations/source/m03-hub-namespace-tree.excalidraw ]` — FOUND
- `[ -f illustrations/source/m03-hub-publish-consume-flow.excalidraw ]` — FOUND
- `[ -f illustrations/exported/m03-calm-cli-command-map.svg ]` — FOUND
- `[ -f illustrations/exported/m03-pattern-vs-architecture.svg ]` — FOUND
- `[ -f illustrations/exported/m03-hub-namespace-tree.svg ]` — FOUND
- `[ -f illustrations/exported/m03-hub-publish-consume-flow.svg ]` — FOUND

All commits verified to exist in git log:
- d6e0372 — FOUND
- 9546e83 — FOUND
- 13c1c0a — FOUND
