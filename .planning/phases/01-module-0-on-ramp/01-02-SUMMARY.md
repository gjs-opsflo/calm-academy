---
phase: 01-module-0-on-ramp
plan: "02"
subsystem: content
tags: [calm, calm-1.2, mdx, docusaurus, excalidraw, illustrations, module-00]

# Dependency graph
requires:
  - "01-01 (todo-api.architecture.json, Chapter 0.1, Chapter 0.4)"
provides:
  - "Chapter 0.2 (live-demo-diagram-to-calm-in-five-minutes.mdx) — step-by-step demo walkthrough, all 6 calmstudio-mcp tool calls, full CALM JSON"
  - "Chapter 0.3 (why-this-works-and-when-it-doesnt.mdx) — read_calm_guide mechanism, 9 node types table, 5 limitation scenarios, architecture-as-the-prompt concept"
  - "illustrations/source/m00-three-paths.excalidraw — stub with embedded authoring spec (ILL-01-A, user authors)"
  - "illustrations/source/m00-calm-studio-mock.excalidraw — stub with embedded authoring spec (ILL-01-B, user authors)"
  - "illustrations/source/m00-architecture-as-prompt.excalidraw — stub with embedded authoring spec (ILL-01-C, user authors)"
  - "illustrations/exported/m00-three-paths.svg — placeholder SVG (replaced after user checkpoint)"
  - "illustrations/exported/m00-calm-studio-mock.svg — placeholder SVG (replaced after user checkpoint)"
  - "illustrations/exported/m00-architecture-as-prompt.svg — placeholder SVG (replaced after user checkpoint)"
  - "illustrations/INVENTORY.md — living illustration index"
affects: [module-00, illustrations]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Excalidraw stub pattern: minimal valid JSON with spec text element, opened by user to start authoring"
    - "SVG placeholder pattern: valid SVG with descriptive placeholder text that inlines in MDX without broken link"
    - "illustrations/INVENTORY.md as living index of all Excalidraw illustrations with status tracking"

key-files:
  created:
    - content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx
    - content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx
    - illustrations/source/m00-three-paths.excalidraw
    - illustrations/source/m00-calm-studio-mock.excalidraw
    - illustrations/source/m00-architecture-as-prompt.excalidraw
    - illustrations/exported/m00-three-paths.svg
    - illustrations/exported/m00-calm-studio-mock.svg
    - illustrations/exported/m00-architecture-as-prompt.svg
    - illustrations/INVENTORY.md
  modified: []

key-decisions:
  - "Excalidraw stubs contain the full authoring spec as a visible text element — user sees the spec when opening the file, no separate reference document needed"
  - "SVG placeholders are valid SVGs (inlineable in MDX) but below 1KB — they satisfy link validity but fail the >1KB phase gate, correctly signaling user authoring is required"
  - "Chapter 0.2 and 0.3 completed before user checkpoint (Task 2) because text-first workflow means text does not depend on illustrations being final"
  - "Both chapters reference the placeholder SVGs by relative path — links will be correct when placeholders are replaced by real exports (same filenames)"

# Metrics
duration: ~20min
completed: 2026-06-15
---

# Phase 1 Plan 02: Live Demo Chapter, Why It Works Chapter, Illustration Stubs Summary

**Two MDX teaching chapters (0.2 + 0.3) plus three Excalidraw stubs and SVG placeholders for ILL-01 — automated tasks complete, user illustration authoring checkpoint reached**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-06-15T09:03:25Z
- **Completed:** 2026-06-15 (automated tasks; user checkpoint pending)
- **Tasks:** 3 / 4 automated tasks completed (Task 2 is user checkpoint — see below)
- **Files created:** 9

## Accomplishments

### Task 1: Excalidraw stubs and SVG placeholders (COMPLETE)

Created the illustration scaffold for ILL-01:

- `illustrations/source/m00-three-paths.excalidraw` — valid JSON stub with embedded authoring spec (three parallel vertical lanes, Path A/B/C, converging to single .calm.json output)
- `illustrations/source/m00-calm-studio-mock.excalidraw` — valid JSON stub with embedded authoring spec (browser window frame, 4 CALM node shapes, connecting arrows)
- `illustrations/source/m00-architecture-as-prompt.excalidraw` — valid JSON stub with embedded authoring spec (left-to-right: architect → calmstudio-mcp → .calm.json with downstream CALM tools)
- `illustrations/exported/m00-three-paths.svg` — placeholder SVG (~890 bytes; valid, inlineable, below 1KB phase gate threshold)
- `illustrations/exported/m00-calm-studio-mock.svg` — placeholder SVG (~905 bytes; valid, inlineable, below 1KB phase gate threshold)
- `illustrations/exported/m00-architecture-as-prompt.svg` — placeholder SVG (~930 bytes; valid, inlineable, below 1KB phase gate threshold)
- `illustrations/INVENTORY.md` — living illustration index with all 3 entries, status "stub — needs Excalidraw authoring", update instructions

### Task 3: Chapter 0.2 — Live Demo: Diagram to CALM in 5 Minutes (COMPLETE)

Authored `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` (2568 words):

- Complete step-by-step demo narration: all 6 calmstudio-mcp tool calls in sequence (read_calm_guide → create_architecture → add_node ×4 → add_relationship ×3 → finalize_architecture → export_calm)
- Each of the 4 nodes explained: why that type was chosen over alternatives (actor not person, webclient not system, service not network, database not data-asset)
- interacts vs connects relationship type distinction explained with architectural reasoning
- Full `todo-api.architecture.json` printed without truncation (from code-examples/module-00-on-ramp/)
- Both illustration references: `m00-three-paths.svg` (Section 1) and `m00-calm-studio-mock.svg` (Section 5)
- Four concrete next actions for learner (validate, visualize, modify, use as reference for Chapter 0.5)
- 4 common mistakes documented

### Task 4: Chapter 0.3 — Why This Works (and When It Doesn't) (COMPLETE)

Authored `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` (2373 words):

- read_calm_guide mechanism explained: three-step structural protection (spec returned → spec in context → finalize validates)
- 9 core node types reference table with real-world mappings (all 9 types)
- container and component explicitly called out as non-spec types with explanation of why they are the most common beginner mistakes
- 5 limitation scenarios: ambiguous descriptions, missing nodes, incorrect relationship direction, relationship type selection, spec edge cases
- architecture-as-the-prompt concept explained: description is the spec, CALM captures the structure of intent
- Illustration reference: `m00-architecture-as-prompt.svg`
- Forward hooks to Module 1, 2, 3 establishing the learning path continuation
- 4 common mistakes documented

### Task 2: USER CHECKPOINT (PENDING)

Task 2 is a `type="checkpoint:human-action"` task. The user must open each Excalidraw stub, author the illustration, and export the SVG. This cannot be automated. See checkpoint details below.

## Task Commits

1. **Task 1: Excalidraw stubs and SVG placeholders** — `b335fe5` (feat)
2. **Task 3: Chapter 0.2** — `54f0e6e` (docs)
3. **Task 4: Chapter 0.3** — `a52cf13` (docs)

## Files Created

- `illustrations/source/m00-three-paths.excalidraw` — Excalidraw stub with authoring spec for ILL-01-A
- `illustrations/source/m00-calm-studio-mock.excalidraw` — Excalidraw stub with authoring spec for ILL-01-B
- `illustrations/source/m00-architecture-as-prompt.excalidraw` — Excalidraw stub with authoring spec for ILL-01-C
- `illustrations/exported/m00-three-paths.svg` — placeholder SVG (replace after user authoring)
- `illustrations/exported/m00-calm-studio-mock.svg` — placeholder SVG (replace after user authoring)
- `illustrations/exported/m00-architecture-as-prompt.svg` — placeholder SVG (replace after user authoring)
- `illustrations/INVENTORY.md` — living illustration index (update status after authoring)
- `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` — Chapter 0.2 (2568 words)
- `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` — Chapter 0.3 (2373 words)

## Decisions Made

- **Stubs with embedded specs:** Each Excalidraw stub contains the authoring specification as a visible text element in the canvas. When the user opens the file in Excalidraw, they see the instructions immediately — no separate reference document needed.
- **Placeholder SVGs below 1KB by design:** The placeholder SVGs are ~900 bytes each. The phase gate requires `>1KB`. This design ensures the gate correctly fails until the user authors real illustrations and exports them. The placeholders are valid SVGs and inline correctly in MDX without broken image links.
- **Text chapters authored before illustration checkpoint:** Per the text-first production workflow in CLAUDE.md, text does not depend on illustrations being final. The chapters reference the SVG files by relative path — when placeholders are replaced by real exports (same filename, same path), the references will work without any chapter edits required.

## Deviations from Plan

None — all three automated tasks executed exactly as specified. The Excalidraw stub format from the plan was followed exactly. The chapter content follows the plan's detailed outlines.

## Known Stubs

- `illustrations/exported/m00-three-paths.svg` — placeholder (~890 bytes); MUST be replaced by user-authored Excalidraw export before phase gate
- `illustrations/exported/m00-calm-studio-mock.svg` — placeholder (~905 bytes); MUST be replaced by user-authored Excalidraw export before phase gate
- `illustrations/exported/m00-architecture-as-prompt.svg` — placeholder (~930 bytes); MUST be replaced by user-authored Excalidraw export before phase gate
- `illustrations/INVENTORY.md` — status column shows "stub — needs Excalidraw authoring" for all 3; update to "authored" after user completes illustrations

## Threat Flags

None — all files are static content (MDX chapters, Excalidraw JSON stubs, SVG placeholder files). No new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries. The SVG placeholder files contain only static text elements (no embedded scripts) — T-02-01 disposition is `accept` per the plan's threat model.

## Self-Check: PASSED

| Check | Status |
|-------|--------|
| illustrations/source/m00-three-paths.excalidraw | FOUND |
| illustrations/source/m00-calm-studio-mock.excalidraw | FOUND |
| illustrations/source/m00-architecture-as-prompt.excalidraw | FOUND |
| illustrations/exported/m00-three-paths.svg | FOUND |
| illustrations/exported/m00-calm-studio-mock.svg | FOUND |
| illustrations/exported/m00-architecture-as-prompt.svg | FOUND |
| illustrations/INVENTORY.md | FOUND |
| content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx | FOUND |
| content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx | FOUND |
| Commit b335fe5 (Task 1 — stubs) | FOUND |
| Commit 54f0e6e (Task 3 — Chapter 0.2) | FOUND |
| Commit a52cf13 (Task 4 — Chapter 0.3) | FOUND |

---
*Phase: 01-module-0-on-ramp*
*Completed: 2026-06-15 (automated tasks); user checkpoint pending*
