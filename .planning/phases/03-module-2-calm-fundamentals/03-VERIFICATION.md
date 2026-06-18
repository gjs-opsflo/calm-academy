---
phase: 03-module-2-calm-fundamentals
verified: 2026-06-16T00:00:00Z
status: human_needed
score: 7/7
overrides_applied: 1
overrides:
  - must_have: "relationship-types-reference.architecture.json demonstrates all 5 relationship types including options"
    reason: "CALM CLI 1.44.1 has a confirmed runtime crash (TypeError: Cannot read properties of undefined) when validating the options relationship type. No working examples exist in the canonical architecture-as-code repo. options is taught via inline code snippet in Chapter 2.3 with an explicit CLI limitation callout. The cheatsheet documents the limitation. This is an intentional, documented deviation to keep CI green."
    accepted_by: "orchestrator"
    accepted_at: "2026-06-16T00:00:00Z"
human_verification:
  - test: "Lab 2 completes end-to-end on a fresh machine"
    expected: "Learner starts from labs/lab-02-conference-signup/starter/conference-signup.architecture.json, extends it following LAB.md steps 1-7, validates with npx @finos/calm-cli validate -a and sees hasErrors:false, then opens https://studio.calm.finos.org and imports the file to see 6 nodes and 5 relationships on the canvas"
    why_human: "Step 7 uses ai_judge check for CALM Studio visualization — requires a real human to open the browser and confirm the canvas renders correctly. Cannot be automated with grep or CLI commands."
  - test: "Illustration stubs have adequate DIAGRAM SPEC text for authoring"
    expected: "Reading each .excalidraw file's text element reveals a detailed layout description (positions, labels, style notes, B&W instruction) that is sufficient for the user to author the illustration without additional guidance"
    why_human: "Requires human judgment of specification adequacy — automated checks can only confirm the files exist and contain text, not whether the spec is clear enough to execute."
  - test: "Slide deck speaker notes do not contradict chapter text"
    expected: "Reading Chapters 2.1-2.7 alongside slides/module-02-calm-fundamentals.md confirms all 41 speaker notes accurately reflect the chapter content and no speaker note makes a claim that contradicts the prose in the MDX files"
    why_human: "Cross-reading content accuracy requires human semantic judgment — cannot be verified with string matching."
  - test: "Lab 2 starter file provides the correct scaffolding experience"
    expected: "A learner opening labs/lab-02-conference-signup/starter/conference-signup.architecture.json can clearly see the actor and webclient nodes plus one interacts relationship, understands what to extend, and is not confused by the minimal starter"
    why_human: "UX quality of the starter experience requires learner perspective — automated checks confirm the file validates but not whether the pedagogical scaffolding is appropriate."
---

# Phase 3: Module 2 (CALM Fundamentals) — Verification Report

**Phase Goal:** Author and publish Module 2 — the spec vocabulary module. Most reference-heavy; must be precise. Includes the largest quiz, a cheatsheet, and 10+ code examples.
**Verified:** 2026-06-16
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 7 Module 2 chapters authored — covers all 9 core node types, relationship types, interface shapes, controls, decorators, metadata, and building a first full architecture | VERIFIED | 7 MDX files exist in content/module-02-calm-fundamentals/: calm-specification.mdx (ch 2.1, 1832w), nodes.mdx (ch 2.2, 2993w), relationships.mdx (ch 2.3, 2412w), interfaces.mdx (ch 2.4, 1713w), controls.mdx (ch 2.5, 1808w), decorators.mdx (ch 2.6, 1534w), building-your-first-architecture.mdx (ch 2.7, 2610w). All 9 node types verified in nodes.mdx and node-types-reference code example. All 5 relationship types (including options with CLI limitation note) covered in relationships.mdx. Interfaces, controls, decorators each have dedicated chapters. Metadata treated in calm-specification.mdx (top-level field table) and building-your-first-architecture.mdx (used in final example). |
| 2 | Lab 2 (conference signup architecture) completes end-to-end: learner writes CALM JSON by hand, passes calm validate, visualizes in Studio | VERIFIED (automated) / UNCERTAIN (Studio step) | labs/lab-02-conference-signup/ contains LAB.md (350 lines, 7 steps, Learnforge-compatible YAML frontmatter), starter/conference-signup.architecture.json (2 nodes + 1 relationship, hasErrors:false confirmed), solution/conference-signup.architecture.json (6 nodes, 5 relationships, 1 interface, 1 control, hasErrors:false confirmed, content-identical to code-examples/module-02-calm-fundamentals/conference-signup.architecture.json). Steps 1-6 use command_regex and file_state checks. Step 7 (CALM Studio) uses ai_judge — requires human. |
| 3 | Module 2 quiz covers all CALM vocabulary — largest quiz in the course | VERIFIED | quizzes/module-02-calm-fundamentals.yaml has 21 questions across chapters 2.1-2.7 (distribution: 3/4/3/3/3/3/2). Module 1 has 11 questions — Module 2 is confirmed largest. bash scripts/lint-quizzes.sh passes all 59 checks for this file. |
| 4 | 10-15 Excalidraw B&W illustrations complete — all node types visual, relationship pattern diagrams, architecture build-up sequence (stubs count) | VERIFIED | 13 .excalidraw stubs in illustrations/source/m02-*.excalidraw (confirmed with DIAGRAM SPEC text describing exact layout, B&W style, labels). 13 corresponding SVG placeholders in illustrations/exported/m02-*.svg. Count is within 10-15 range. Stubs explicitly accepted per success criteria. |
| 5 | Module 2 slide deck (30-40 slides) complete with visual node type gallery | VERIFIED | slides/module-02-calm-fundamentals.md exists (848 lines). 42 `---` separators = 2 frontmatter + 40 slides (within 30-40 range). 41 HTML comment speaker notes. 13 m02 SVG illustration references (13 `![]()` refs to m02-*.svg). Node gallery: slide 4 (overview) + slides 5-13 (one per node type = 9 slides). marp: true header present. npx @marp-team/marp-cli render exits 0. |
| 6 | Module 2 cheatsheet (1-page printable) published | VERIFIED | docs-meta/cheatsheets/module-02-cheatsheet.md exists (198 lines, within 60-200 target). Contains: $schema URL, required fields table, all 9 node types (use-for/never-use table), all 5 relationship types (with options CLI limitation note), protocol enum (12 values), both interface forms (freeform + definition-url), control skeleton (encryption-in-transit), decorator with target+applies-to, CLI reference, 7 common mistakes. |
| 7 | All code-examples/ in code-examples/module-02-* pass calm validate in CI | VERIFIED | bash scripts/validate-calm.sh passes all 5 module-02 files: node-types-reference.architecture.json PASS, relationship-types-reference.architecture.json PASS, with-interfaces.architecture.json PASS, with-controls.architecture.json PASS, conference-signup.architecture.json PASS. "Validation summary: 6 passed, 0 failed" (including module-00). All 5 module-02 files confirmed PASS individually. |

**Score:** 7/7 truths verified (1 override applied for options relationship deviation; all other truths verified through direct evidence)

---

### Deferred Items

None.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `content/module-02-calm-fundamentals/calm-specification.mdx` | Ch 2.1 — CALM spec anatomy | VERIFIED | 1832 words, slug: calm-specification, ch 2.1, proper frontmatter |
| `content/module-02-calm-fundamentals/nodes.mdx` | Ch 2.2 — all 9 node types | VERIFIED | 2993 words, all 9 types covered with FSI examples |
| `content/module-02-calm-fundamentals/relationships.mdx` | Ch 2.3 — all 5 relationship types | VERIFIED | 2412 words, all 5 types including options with CLI note |
| `content/module-02-calm-fundamentals/interfaces.mdx` | Ch 2.4 — interface shapes | VERIFIED | 1713 words, both freeform and definition-url forms |
| `content/module-02-calm-fundamentals/controls.mdx` | Ch 2.5 — controls | VERIFIED | 1808 words, 4 attachment scopes |
| `content/module-02-calm-fundamentals/decorators.mdx` | Ch 2.6 — decorators | VERIFIED | 1534 words, separate-document pattern |
| `content/module-02-calm-fundamentals/building-your-first-architecture.mdx` | Ch 2.7 — first architecture | VERIFIED | 2610 words, 7-step build walkthrough, metadata used |
| `code-examples/module-02-calm-fundamentals/node-types-reference.architecture.json` | All 9 node types | VERIFIED | All 9 types confirmed: actor, data-asset, database, ecosystem, ldap, network, service, system, webclient |
| `code-examples/module-02-calm-fundamentals/relationship-types-reference.architecture.json` | 4 of 5 relationship types | VERIFIED (override) | 4 types: composed-of, connects, deployed-in, interacts. options excluded per CLI 1.44.1 bug |
| `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json` | Interface examples | VERIFIED | Freeform + definition-url forms, validates |
| `code-examples/module-02-calm-fundamentals/with-controls.architecture.json` | Control examples | VERIFIED | 3 control scopes (top-level, per-node, per-relationship), validates |
| `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json` | Conference signup reference | VERIFIED | 6 nodes, 5 relationships, 1 interface, 1 control, validates |
| `labs/lab-02-conference-signup/LAB.md` | Learnforge-compatible lab | VERIFIED | 350 lines, 7 steps, command_regex + file_state + ai_judge |
| `labs/lab-02-conference-signup/starter/conference-signup.architecture.json` | Minimal valid starter | VERIFIED | 2 nodes + 1 relationship, hasErrors:false |
| `labs/lab-02-conference-signup/solution/conference-signup.architecture.json` | Complete solution | VERIFIED | 6 nodes, 5 rels, 1 interface, 1 control, content-identical to code-example |
| `quizzes/module-02-calm-fundamentals.yaml` | 21-question quiz | VERIFIED | 21 questions, 7 chapters, lint-quizzes.sh all 59 checks PASS |
| `illustrations/source/m02-*.excalidraw` (13 files) | Excalidraw stubs | VERIFIED | 13 files with DIAGRAM SPEC text, within 10-15 target |
| `illustrations/exported/m02-*.svg` (13 files) | SVG placeholders | VERIFIED | 13 valid SVG placeholders matching source stubs |
| `slides/module-02-calm-fundamentals.md` | 30-40 slide deck | VERIFIED | 40 slides, marp: true, 41 speaker notes, 13 SVG refs, Marp renders PDF exit 0 |
| `docs-meta/cheatsheets/module-02-cheatsheet.md` | 1-page printable reference | VERIFIED | 198 lines, all vocabulary covered |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| chapters 2.1-2.7 | code-examples/ | relative path references in MDX | VERIFIED | 27 references to code-examples/module-02 found across MDX files |
| LAB.md step 7 | CALM Studio URL | ai_judge prompt references https://studio.calm.finos.org | VERIFIED | URL present in step 7 check prompt and hints |
| lab solution | conference-signup code example | content-identical JSON files | VERIFIED | Python content comparison confirms solution == code-example (True) |
| quiz questions | MDX chapter sections | reference_section field with anchor links | VERIFIED | All 21 questions have reference_section pointing to module-02 chapters |
| slides | m02 SVG files | Markdown image syntax ![]() | VERIFIED | 13 SVG references, 25 total m02-*.svg matches in slide deck |
| cheatsheet | CALM spec URL | literal $schema value | VERIFIED | https://calm.finos.org/release/1.2/meta/calm.json present |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase produces static content assets (MDX lessons, JSON examples, YAML quizzes, Markdown slides) with no dynamic data rendering components.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| All module-02 code examples validate | `bash scripts/validate-calm.sh` | 6 passed, 0 failed | PASS |
| Lab starter validates | `npx @finos/calm-cli validate -a labs/lab-02-conference-signup/starter/conference-signup.architecture.json` | hasErrors: false, hasWarnings: false | PASS |
| Lab solution validates | `npx @finos/calm-cli validate -a labs/lab-02-conference-signup/solution/conference-signup.architecture.json` | hasErrors: false, hasWarnings: false | PASS |
| Quiz passes schema lint | `bash scripts/lint-quizzes.sh` | All 59 checks passed for module-02-calm-fundamentals.yaml | PASS |
| Slide deck renders to PDF | `npx @marp-team/marp-cli slides/module-02-calm-fundamentals.md --output /tmp/m02-verify.pdf` | exit 0 | PASS |
| Module 2 quiz is largest | Python comparison of question counts | Module 2: 21 questions, Module 1: 11 questions | PASS |
| All 9 node types in code example | Python parse of node-types-reference.architecture.json | actor, data-asset, database, ecosystem, ldap, network, service, system, webclient | PASS |
| Lab solution has correct structure | Python parse: 6 nodes, 5 relationships, 1 interface, 1 control | Confirmed | PASS |
| Solution content-identical to code example | Python equality check: solution == example | True | PASS |

---

### Probe Execution

No probes declared in PLAN files. No probe-*.sh files in scripts/tests/. SKIPPED.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| MOD-03 | 03-01, 03-02 | Module 2 text lessons — all 7 chapters | SATISFIED | 7 MDX files, 14902 total words |
| LAB-02 | 03-03 | Lab 2 conference signup end-to-end | SATISFIED | LAB.md + starter + solution, both validate |
| QUIZ-03 | 03-03 | Module 2 quiz — largest in course | SATISFIED | 21 questions, lint passes |
| ILL-03 | 03-01, 03-02 | 10-15 illustration stubs | SATISFIED | 13 stubs + 13 SVG placeholders |
| SLIDE-02 | 03-04 | Module 2 slide deck 30-40 slides | SATISFIED | 40 slides, Marp renders |
| CODE-01 | 03-01, 03-02 | Code examples pass calm validate | SATISFIED | 5 files, all PASS |
| CODE-02 | 03-04 | Cheatsheet published | SATISFIED | 198-line cheatsheet at docs-meta/cheatsheets/ |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `illustrations/exported/m02-*.svg` (13 files) | all | "Illustration placeholder" text in SVG body | INFO | Placeholder SVGs are intentional per success criteria #4 — "stubs count — user defers actual authoring". These are valid XML files that render a labeled grey placeholder. The corresponding .excalidraw source files exist with full DIAGRAM SPEC text. No real diagram content until user authors in Excalidraw. |
| `content/module-02-calm-fundamentals/controls.mdx` | 289 | `requirements: []` in "Common mistakes" section | INFO | This is documented anti-pattern content (teaching learners what NOT to do), not a stub. The code examples (with-controls.architecture.json) all use populated requirements arrays. Not a gap. |

No `TBD`, `FIXME`, or `XXX` markers found in any phase 3 file. No `TODO` or `HACK` markers in production content files.

---

### Key Deviation — Accepted

**options relationship type excluded from relationship-types-reference.architecture.json**

The CALM CLI 1.44.1 has a confirmed runtime crash (`TypeError: Cannot read properties of undefined (reading 'nodes')`) when validating any architecture file containing the `options` relationship type. No working `options` examples exist in the canonical FINOS `architecture-as-code` repository. Including `options` in the reference file would break `bash scripts/validate-calm.sh` and block CI.

**Resolution:** `options` is taught via inline code snippet in Chapter 2.3 (relationships.mdx, section "### options", ~200 words). The chapter's TL;DR explicitly flags the CLI limitation: "options is an ADR-in-spec pattern for architectural decision branches — it is in the 1.2 schema but has a known limitation in CALM CLI 1.44.1." The cheatsheet also documents the limitation. The `relationship-types-reference.architecture.json` description field explicitly notes the exclusion.

This deviation is accepted via the override above. The teaching intent (all 5 relationship types understood by learner) is achieved; only the validation-safe code example is affected.

---

### Human Verification Required

#### 1. Lab 2 CALM Studio Visualization (Step 7)

**Test:** Follow labs/lab-02-conference-signup/LAB.md steps 1-6 from a fresh machine using the starter file. After `calm validate` passes (step 6), open https://studio.calm.finos.org, import the completed conference-signup.architecture.json, and describe what appears on the canvas.

**Expected:** 6 node boxes visible (conference-attendee, conference-website, load-balancer, attendees, attendees-store, k8s-cluster), relationship arrows between them labeled with relationship types (interacts, connects, deployed-in). The architecture renders without error.

**Why human:** Step 7 uses `ai_judge` check type — requires a human to interact with the CALM Studio web application. Cannot be verified with CLI commands.

---

#### 2. Illustration Stub Adequacy

**Test:** Open each of the 13 `.excalidraw` files in `illustrations/source/m02-*.excalidraw` and read the `text` element content (the DIAGRAM SPEC). Assess whether the specification is detailed enough for the user to author the illustration without additional guidance.

**Expected:** Each spec clearly describes layout (positions, relative sizes), labels for all elements, line/arrow connections, and style notes ("B&W only", stroke weights). A skilled Excalidraw user can produce the illustration from the spec alone.

**Why human:** Requires judgment of specification quality and authoring-readiness. Automated checks confirmed the files exist and contain text, not whether the spec is actionable.

---

#### 3. Slide Deck Speaker Note Accuracy

**Test:** Read Module 2 chapters 2.1-2.7 (content/module-02-calm-fundamentals/*.mdx) and then review slides/module-02-calm-fundamentals.md. Verify that all 41 speaker notes accurately reflect the corresponding chapter content and no note contradicts what the chapters teach.

**Expected:** All speaker notes are factually consistent with chapter text. Notes may be abbreviated versions of chapter content but must not introduce different definitions, wrong enum values, or contradictory examples.

**Why human:** Cross-content accuracy requires semantic comparison — cannot be verified with string matching.

---

#### 4. Lab 2 Starter File Pedagogical Experience

**Test:** As a course learner who has read chapters 2.1-2.7, open `labs/lab-02-conference-signup/starter/conference-signup.architecture.json` and assess whether the 2-node/1-relationship minimal file gives appropriate scaffolding without being too simple or too complex.

**Expected:** The starter is recognizable as a CALM 1.2 document, shows the conference-attendee and conference-website nodes plus the interacts relationship, and leaves clear room for the learner to add the remaining 4 nodes and 4 relationships as instructed in the lab steps.

**Why human:** Pedagogical scaffolding quality is a learner experience judgment.

---

## Gaps Summary

No automated gaps found. All 7 observable truths verified. All required artifacts exist, are substantive (substantial word counts, proper structure), and are wired (quiz references chapters, lab references code example, slides reference SVGs, cheatsheet references spec URLs).

The one deviation (options relationship excluded from code example) is an intentional, documented decision to avoid a confirmed CLI bug. It is accepted via the override entry above.

This phase is pending human verification on 4 items before final PASSED status can be confirmed. The automated verification score is 7/7.

---

_Verified: 2026-06-16T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
