---
phase: "03-module-2-calm-fundamentals"
plan: "04"
subsystem: "slides-and-reference"
tags: [module-02, slide-deck, cheatsheet, marp, reference]

dependency_graph:
  requires:
    - "03-01-SUMMARY.md"  # text chapters 2.1–2.7
    - "03-02-SUMMARY.md"  # illustration placeholders and code examples
  provides:
    - "slides/module-02-calm-fundamentals.md"
    - "docs-meta/cheatsheets/module-02-cheatsheet.md"
  affects:
    - "Module 2 workshop delivery"
    - "At-a-glance practitioner reference"

tech_stack:
  added:
    - "Marp CLI (npx @marp-team/marp-cli) — verified renders to PDF with exit 0"
    - "docs-meta/cheatsheets/ — new directory for printable reference cards"
  patterns:
    - "Text-first workflow: slides and cheatsheet derived from MDX chapters"
    - "Speaker notes in HTML comment blocks per established Module 1 convention"

key_files:
  created:
    - "slides/module-02-calm-fundamentals.md"
    - "docs-meta/cheatsheets/module-02-cheatsheet.md"
  modified: []

decisions:
  - "Slide count: 40 slides (42 total --- separators including frontmatter open/close) — within 30-40 range"
  - "Node gallery: 9 dedicated slides (slides 5-13) plus an overview slide (slide 4) for a total of 10 node-type slides"
  - "k8s-cluster typed as `system` not `ecosystem` — matches canonical FINOS conference-signup pattern and chapter 2.7"
  - "Cheatsheet line count: 198 lines — within 60-200 printable-page target"
  - "Protocol table collapsed from 7-row table to single paragraph to stay within 200 line limit"
  - "options relationship documented in cheatsheet with CLI 1.44.1 crash note — honest about the limitation"

metrics:
  duration: "~25 minutes"
  completed: "2026-06-16"
  tasks_completed: 2
  files_created: 2
---

# Phase 03 Plan 04: Slide Deck and Cheatsheet Summary

**One-liner:** Marp slide deck (40 slides, 41 speaker notes, 13 m02 SVG refs) and printable cheatsheet (198 lines) derived from the 7 Module 2 chapters — all vocabulary canon covered.

## Tasks Completed

| Task | Name | Commit | Files |
|---|---|---|---|
| 1 | Author Module 2 slide deck (Marp Markdown, 40 slides) | `ba902fa` | `slides/module-02-calm-fundamentals.md` |
| 2 | Author Module 2 cheatsheet (1-page printable Markdown) | `fadf11f` | `docs-meta/cheatsheets/module-02-cheatsheet.md` |

## Artifact Details

### Slide Deck: `slides/module-02-calm-fundamentals.md`

- **Total `---` separators:** 42 (2 frontmatter + 40 slides)
- **Speaker notes:** 41 (one per slide)
- **m02 SVG illustration references:** 13
- **Node type gallery:** Slides 5-13 (9 slides, one per node type) + slide 4 overview
- **Chapter coverage:**
  - 2.1 Specification: slides 2-4 (anatomy, $schema URL, schema conformance)
  - 2.2 Nodes: slides 5-13 (9-slide gallery + overview)
  - 2.3 Relationships: slides 14-18 (5 types + protocol enum)
  - 2.4 Interfaces: slides 19-21 (vs relationship, freeform, formal)
  - 2.5 Controls: slides 22-24 (anatomy, structure, 4 scopes)
  - 2.6 Decorators: slides 25-27 (separate docs, anatomy, types)
  - 2.7 Build sequence: slides 28-35 (7-step conference signup build)
  - Closing: slides 36-38 (Lab 2, cheatsheet pointer, summary)
- **Render test:** `npx @marp-team/marp-cli slides/module-02-calm-fundamentals.md --output /tmp/m02-verify.pdf` exits 0

### m02 SVG References in Slide Deck

1. `m02-calm-document-structure.svg` (slide 3)
2. `m02-node-types-gallery.svg` (slides 4, 7, 8)
3. `m02-system-vs-service-vs-ecosystem.svg` (slide 9)
4. `m02-relationship-types.svg` (slide 14)
5. `m02-connects-vs-interacts.svg` (slide 15)
6. `m02-deployed-in-composed-of.svg` (slides 17, 31)
7. `m02-interface-anatomy.svg` (slide 19)
8. `m02-control-anatomy.svg` (slide 22)
9. `m02-decorator-external-overlay.svg` (slide 25)
10. `m02-conference-signup-step1-nodes.svg` (slide 29)
11. `m02-conference-signup-step2-relationships.svg` (slide 30)
12. `m02-conference-signup-step3-complete.svg` (slide 36)

(13 total SVG `![]()` references, ≥6 required)

### Cheatsheet: `docs-meta/cheatsheets/module-02-cheatsheet.md`

- **Line count:** 198 (within 60-200 printable-page target)
- **Sections (11):**
  1. $schema URL (literal string + wrong values warning)
  2. Required fields (table: architecture, node, relationship, interface, control, decorator)
  3. Node types (9) — use for / never use for table
  4. Relationship types (5) — required sub-fields / example use table
  5. Protocol enum (12) — comma-separated + key value descriptions
  6. Interface quick reference (freeform form + formal form with JSON)
  7. Control quick reference (encryption-in-transit skeleton JSON)
  8. Decorator quick reference (threat decorator JSON with target + applies-to)
  9. CLI quick reference (validate command + Studio URL)
  10. Common mistakes (7 items)
  11. Spec source URL

## Acceptance Criteria Verification

| Criterion | Status |
|---|---|
| `slides/module-02-calm-fundamentals.md` exists with `marp: true` | PASS |
| Slide count 30-40 (`---` separators: 42 = 2 frontmatter + 40 slides) | PASS |
| At least 25 speaker notes | PASS (41) |
| At least 6 m02 SVG image references | PASS (13) |
| All 9 node types present | PASS |
| All 5 relationship types present | PASS |
| Literal CALM 1.2 $schema URL in slides | PASS |
| Zero "Chapter 2.N" prose references | PASS |
| `lab-02-conference-signup` string in slides | PASS |
| `docs-meta/cheatsheets/module-02-cheatsheet.md` exists | PASS |
| Cheatsheet 60-200 lines | PASS (198) |
| All 9 node types in cheatsheet | PASS |
| All 5 relationship types in cheatsheet | PASS |
| All 12 protocol values in cheatsheet | PASS |
| Literal $schema URL in cheatsheet | PASS |
| `npx @finos/calm-cli validate` CLI command in cheatsheet | PASS |
| Both interface forms (freeform + definition-url) | PASS |
| Control skeleton with `encryption-in-transit` | PASS |
| Decorator with `target` and `applies-to` | PASS |
| No Docusaurus/MDX frontmatter in cheatsheet | PASS (starts with H1) |
| Marp render to PDF exits 0 | PASS |

## Deviations from Plan

### Minor adjustments

**1. [Rule 2 - Correct content] Node gallery overview slide added before the 9-slide gallery**
- **Rationale:** The plan suggested an optional transition slide "All 9 types — at a glance". Added as slide 4 with the gallery image and a summary table. Improves instructor flow when presenting the gallery.
- **Files modified:** `slides/module-02-calm-fundamentals.md`

**2. [Rule 1 - Format constraint] Cheatsheet protocol table collapsed to paragraph**
- **Found during:** Task 2 verification (209 lines, max 200)
- **Fix:** Replaced 7-row protocol table with a single summary paragraph. All 12 protocol values still present and explicitly listed.
- **Files modified:** `docs-meta/cheatsheets/module-02-cheatsheet.md`

## Known Stubs

None. All sections reference real validated artifacts:
- Interface JSON examples from `with-interfaces.architecture.json` (in MDX chapters)
- Control JSON examples from `with-controls.architecture.json` (in MDX chapters)
- Conference signup build sequence from `conference-signup.architecture.json` (in MDX chapters)
- m02 SVG paths reference placeholder files expected from plans 03-01 and 03-02

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes introduced. Slide deck and cheatsheet are static Markdown files — no executable components.

## Self-Check: PASSED

- `slides/module-02-calm-fundamentals.md` — exists (848 lines, 40 slides)
- `docs-meta/cheatsheets/module-02-cheatsheet.md` — exists (198 lines)
- Commit `ba902fa` exists (slide deck)
- Commit `fadf11f` exists (cheatsheet)
- Marp render to PDF: exit 0 confirmed
- All 21 acceptance criteria: PASS
