---
phase: "02-module-1-the-case-for-architecture-as-code"
plan: "01"
subsystem: "content/module-01-case-for-aac"
tags:
  - content-authoring
  - module-01
  - mdx-chapters
  - illustrations
  - quiz
dependency_graph:
  requires:
    - "01-01 (Module 0 chapters — slug cross-references confirmed)"
    - "01-02 (Excalidraw stub pattern — m00-* stubs used as template)"
    - "01-03 (lint-quizzes.sh — upgraded linter carried forward)"
  provides:
    - "content/module-01-case-for-aac/*.mdx (5 chapters, MOD-02)"
    - "illustrations/source/m01-*.excalidraw (8 stubs, ILL-02 minimum)"
    - "illustrations/exported/m01-*.svg (8 SVG placeholders)"
    - "quizzes/module-01-case-for-aac.yaml (11 questions, QUIZ-02)"
    - "illustrations/INVENTORY.md (updated with 8 m01-* entries)"
  affects:
    - "02-02 (slide deck derives from these 5 chapters)"
    - "Phase 5 (Docusaurus site renders these MDX files)"
tech_stack:
  added:
    - "MDX frontmatter pattern: module, chapter, estimated_minutes, prerequisites"
    - "CALM 1.2 prose references: nodes, relationships, interfaces, controls, decorators (no .architecture.json code examples — Module 1 is concept-only)"
  patterns:
    - "Excalidraw stub: minimal valid JSON with embedded DIAGRAM SPEC text element"
    - "SVG placeholder: 800x400 viewBox with three text lines (illustration name, description, authoring instructions)"
    - "Quiz YAML: chapter grouping, qN.N.N ID format, 11 questions across 5 chapters, lint-quizzes.sh validation"
key_files:
  created:
    - content/module-01-case-for-aac/architecture-debt-crisis.mdx
    - content/module-01-case-for-aac/lessons-from-adjacent-disciplines.mdx
    - content/module-01-case-for-aac/what-architecture-as-code-enables.mdx
    - content/module-01-case-for-aac/governance-frameworks-and-aac.mdx
    - content/module-01-case-for-aac/introducing-calm.mdx
    - illustrations/source/m01-architecture-drift-timeline.excalidraw
    - illustrations/source/m01-iac-analogy.excalidraw
    - illustrations/source/m01-finos-ecosystem-map.excalidraw
    - illustrations/source/m01-gemara-7-layers-overview.excalidraw
    - illustrations/source/m01-calm-as-layer-4.excalidraw
    - illustrations/source/m01-aac-stack.excalidraw
    - illustrations/source/m01-architecture-debt-compound.excalidraw
    - illustrations/source/m01-calm-ecosystem-flywheel.excalidraw
    - illustrations/exported/m01-architecture-drift-timeline.svg
    - illustrations/exported/m01-iac-analogy.svg
    - illustrations/exported/m01-finos-ecosystem-map.svg
    - illustrations/exported/m01-gemara-7-layers-overview.svg
    - illustrations/exported/m01-calm-as-layer-4.svg
    - illustrations/exported/m01-aac-stack.svg
    - illustrations/exported/m01-architecture-debt-compound.svg
    - illustrations/exported/m01-calm-ecosystem-flywheel.svg
    - quizzes/module-01-case-for-aac.yaml
  modified:
    - illustrations/INVENTORY.md
decisions:
  - "Gemara treatment in Ch 1.4 stopped at Layer 4 punchline — full layer-by-layer treatment deferred to Module 4 per plan constraints"
  - "IaC comparison table in Ch 1.2 rendered as both inline Markdown table AND referenced as m01-iac-analogy.svg illustration for slide deck use"
  - "Reflection exercise in Ch 1.5 embedded inline within The concept section (NOT as a ## Lab section) per plan specification"
  - "m01-aac-stack.svg reused in both Ch 1.2 and Ch 1.3 — single illustration covers the AaC stack concept across both chapters"
  - "Word count targets met via iterative expansion — concept sections expanded to hit 1800+/2000+/1500+ word targets per chapter"
metrics:
  duration_minutes: 20
  completed_date: "2026-06-15"
  tasks_completed: 3
  tasks_total: 3
  files_created: 23
  files_modified: 1
---

# Phase 02 Plan 01: Module 1 — Text, Illustrations, and Quiz — Summary

Module 1 is fully authored as a persuasive narrative module covering 5 chapters — Architecture Debt Crisis, Lessons from Adjacent Disciplines, What AaC Enables, Governance Frameworks, and Introducing CALM — with 8 Excalidraw illustration stubs, 8 SVG placeholders, and an 11-question quiz that passes `lint-quizzes.sh`.

## What was built

**5 MDX chapters (content/module-01-case-for-aac/)**

All five chapters follow the STYLE-GUIDE.md structure (TL;DR → Why it matters → The concept → Common mistakes → Knowledge check → Further reading) and omit Lab and Code/CALM examples sections (Module 1 is concept-driven).

| Chapter | File | Words (concept) | Key illustrations |
|---------|------|----------------|-------------------|
| 1.1 Architecture Debt Crisis | architecture-debt-crisis.mdx | ~1900 | m01-architecture-drift-timeline, m01-architecture-debt-compound |
| 1.2 Lessons from Adjacent Disciplines | lessons-from-adjacent-disciplines.mdx | ~2010 | m01-aac-stack, m01-iac-analogy |
| 1.3 What AaC Enables | what-architecture-as-code-enables.mdx | ~1533 | m01-aac-stack (reuse), m01-calm-ecosystem-flywheel |
| 1.4 Governance Frameworks | governance-frameworks-and-aac.mdx | ~1663 | m01-gemara-7-layers-overview, m01-calm-as-layer-4 |
| 1.5 Introducing CALM | introducing-calm.mdx | ~1679 | m01-finos-ecosystem-map |

All cross-references to Module 0 use slug-based relative paths — no "Chapter 0.N" prose references anywhere.

**8 Excalidraw stubs (illustrations/source/m01-*.excalidraw)**

Each stub is a minimal valid JSON file with a single text element containing the full DIAGRAM SPEC for that illustration. All 8 pass `jq .` validation. Ready for user authoring in Excalidraw.

| Stub | Chapter(s) | Spec includes |
|------|-----------|---------------|
| m01-architecture-drift-timeline | 1.1 | Three-panel before/after/now with 3am incident marker |
| m01-iac-analogy | 1.2, slide deck | Two-column table diagram: Terraform vs CALM (6 rows) |
| m01-finos-ecosystem-map | 1.5, slide deck | Hub-and-spoke: CALM at centre, 8 surrounding components |
| m01-gemara-7-layers-overview | 1.4, slide deck | 7 horizontal rows, OSI-style, L4 annotated "← CALM LIVES HERE" |
| m01-calm-as-layer-4 | 1.4 | Vertical sandwich: L1-3 / L4 CALM / L5-7 |
| m01-aac-stack | 1.2, 1.3, slide deck | Three-layer stack: Infra / CALM (emphasised) / Policy |
| m01-architecture-debt-compound | 1.1 | Line chart: linear effort vs exponential debt cost curve |
| m01-calm-ecosystem-flywheel | 1.3 | Circular flow: validate → detect drift → enforce → improve |

**8 SVG placeholders (illustrations/exported/m01-*.svg)**

All 8 SVGs are valid XML with 800x400 viewBox. Each inline-referenced by the relevant chapter without broken paths. Ready to be replaced when user authors in Excalidraw and runs `bash scripts/export-excalidraw.sh`.

**INVENTORY.md updated**

8 new m01-* rows appended. All 3 original m00-* rows preserved. Total: 11 rows.

**Quiz YAML (quizzes/module-01-case-for-aac.yaml)**

11 questions distributed 2/2/2/3/2 across chapters 1.1 through 1.5:

- Ch 1.1: q1.1.1 (architecture drift definition), q1.1.2 (architecture debt vs technical debt)
- Ch 1.2: q1.2.1 (AaC as missing layer — per RESEARCH.md model), q1.2.2 (CALM Hub = Terraform state equivalent)
- Ch 1.3: q1.3.1 (automated validation = CI gate capability), q1.3.2 (code completion: `calm validate`)
- Ch 1.4: q1.4.1 (Gemara Layer 4 = CALM — per RESEARCH.md model), q1.4.2 (FINOS CCC at L2), q1.4.3 (AIGF auto-attaches)
- Ch 1.5: q1.5.1 (FINOS as steward), q1.5.2 (name one CALM ecosystem tool)

Quiz passes `bash scripts/lint-quizzes.sh` (exit 0, 32 checks passed).

## Verification results

All plan verification checks passed:

| Check | Expected | Result |
|-------|----------|--------|
| Chapter count | 5 | 5 |
| Frontmatter slug per chapter | 1 each | 1 each |
| Excalidraw stub count | 8 | 8 |
| SVG placeholder count | 8 | 8 |
| INVENTORY m01 entries | 8 | 8 |
| INVENTORY m00 entries preserved | 3 | 3 |
| lint-quizzes.sh exit code | 0 | 0 |
| No "Chapter 0.N" prose refs | 0 | 0 |
| m01-* refs per chapter | >=1 | All 5 have refs |
| No lab refs in chapters | 0 | 0 |
| Ch 1.4 Layer 5-7 deep-dive | 0 | 0 |
| Ch 1.5 reflection present | >=1 | 2 refs |
| Ch 1.5 no Lab section | 0 | 0 |

## Deviations from Plan

None. Plan executed exactly as written.

All acceptance criteria met:
- All 5 chapters have correct frontmatter fields, required sections, and appropriate cross-references
- Ch 1.1 references m01-architecture-drift-timeline.svg and m01-architecture-debt-compound.svg
- Ch 1.2 references m01-aac-stack.svg and m01-iac-analogy.svg and contains the 6-row Markdown comparison table
- Ch 1.3 references m01-aac-stack.svg and m01-calm-ecosystem-flywheel.svg with 6 H3 subsections
- Ch 1.4 stops at Layer 4 punchline; governance landscape table covers all 7 frameworks; Gemara Section 8 quote attributed to `.planning/research/gemara-analysis.md`
- Ch 1.5 contains inline reflection exercise inside The concept (NOT as a Lab section); no invented adoption claims
- All 8 Excalidraw stubs are valid JSON with embedded DIAGRAM SPEC
- All 8 SVG placeholders are valid XML
- illustrations/INVENTORY.md has 8 new m01-* rows; 3 m00-* rows preserved
- Quiz has 11 questions across 5 chapters (2/2/2/3/2 distribution) and passes lint-quizzes.sh

## Known Stubs

The following stubs exist by design (per plan spec — illustration authoring is deferred to user with Excalidraw skill):

| Stub | File | Reason |
|------|------|--------|
| m01-architecture-drift-timeline.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-iac-analogy.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-finos-ecosystem-map.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-gemara-7-layers-overview.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-calm-as-layer-4.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-aac-stack.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-architecture-debt-compound.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |
| m01-calm-ecosystem-flywheel.svg | illustrations/exported/ | Placeholder SVG — replace with Excalidraw export |

These stubs are intentional — each chapter inline-references them without broken paths. The placeholder SVGs render as placeholder boxes with authoring instructions. They are replaced when the user authors the illustration in Excalidraw and runs `bash scripts/export-excalidraw.sh <name>`.

## Threat Flags

No new security-relevant surface was introduced. This plan is content authoring only: static MDX prose, Excalidraw stub JSON files, SVG placeholder files, and a YAML quiz data file. No network endpoints, auth paths, user input processing, or schema changes at trust boundaries.

The Gemara Section 8 quote (T-02-01) was sourced from `.planning/research/gemara-analysis.md` and cross-checked against the documented whitepaper text. Quote used: "Achieving an opinionated, standardized schema for each activity type will allow rapid industry-wide acceleration of automated Risk Assessments." — attributed to OpenSSF Gemara whitepaper, March 2026, Section 8.

CALM ecosystem claims in Ch 1.5 (T-02-02) were framed as "what it does" rather than current feature status. Adoption framed as "teams at FINOS member organisations" with reference to FINOS CALM Working Group. No specific adoption numbers or unverifiable claims introduced.

## Self-Check: PASSED
