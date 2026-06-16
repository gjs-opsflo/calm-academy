---
phase: 03-module-2-calm-fundamentals
plan: "02"
status: complete
completed: 2026-06-16
executor: worktree-agent-a0c0c06490ae86832
subsystem: module-02
tags: [module-02, calm-fundamentals, code-examples, mdx-chapters, illustrations, interfaces, controls, decorators]
dependency_graph:
  requires: ["03-01"]
  provides: ["with-interfaces.architecture.json", "with-controls.architecture.json", "conference-signup.architecture.json", "interfaces.mdx", "controls.mdx", "decorators.mdx", "building-your-first-architecture.mdx"]
  affects: ["03-03", "03-04"]
tech_stack:
  added: []
  patterns: ["CALM 1.2 interface-type (freeform)", "CALM 1.2 interface-definition (definition-url + config)", "CALM 1.2 controls at top-level/node/relationship scopes", "CALM 1.2 decorator separate documents"]
key_files:
  created:
    - code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json
    - code-examples/module-02-calm-fundamentals/with-controls.architecture.json
    - code-examples/module-02-calm-fundamentals/conference-signup.architecture.json
    - content/module-02-calm-fundamentals/interfaces.mdx
    - content/module-02-calm-fundamentals/controls.mdx
    - content/module-02-calm-fundamentals/decorators.mdx
    - content/module-02-calm-fundamentals/building-your-first-architecture.mdx
    - illustrations/source/m02-interface-anatomy.excalidraw
    - illustrations/source/m02-control-anatomy.excalidraw
    - illustrations/source/m02-decorator-external-overlay.excalidraw
    - illustrations/source/m02-deployed-in-composed-of.excalidraw
    - illustrations/source/m02-conference-signup-step1-nodes.excalidraw
    - illustrations/source/m02-conference-signup-step2-relationships.excalidraw
    - illustrations/source/m02-conference-signup-step3-complete.excalidraw
    - illustrations/exported/m02-interface-anatomy.svg
    - illustrations/exported/m02-control-anatomy.svg
    - illustrations/exported/m02-decorator-external-overlay.svg
    - illustrations/exported/m02-deployed-in-composed-of.svg
    - illustrations/exported/m02-conference-signup-step1-nodes.svg
    - illustrations/exported/m02-conference-signup-step2-relationships.svg
    - illustrations/exported/m02-conference-signup-step3-complete.svg
  modified:
    - illustrations/INVENTORY.md
decisions:
  - "KYC FSI scenario chosen for with-controls.architecture.json to demonstrate PII/GDPR context naturally alongside mutual-TLS and encryption controls"
  - "Conference signup attendees-api interface is HTTPS-only freeform form (not definition-url) to keep the anchor example approachable; definition-url form is demonstrated in with-interfaces.architecture.json"
  - "k8s-cluster node-type is system (not ecosystem) per RESEARCH.md A1 and the FINOS pattern const assertion — the cluster is a controlled environment the team owns"
  - "with-interfaces.architecture.json description reworded to avoid false-positive on deprecated interface string grep check"
  - "Merged main branch into worktree branch at session start to obtain Wave 1 content (fast-forward merge, no conflicts)"
metrics:
  duration_minutes: 55
  completed_date: "2026-06-16"
  tasks_completed: 3
  files_created: 21
---

# Phase 03 Plan 02 Summary — Advanced Module 2 Slice (Interfaces, Controls, Decorators, First Architecture)

## One-liner

Three validated CALM 1.2 code examples (interfaces, controls, conference-signup anchor), four MDX chapters completing the Module 2 chapter set, and seven Excalidraw stubs for chapters 2.4–2.7.

## Tasks Completed

### Task 1 — Code examples (committed 6a157a2, description fix 88b3576)

**Files created:**

- `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json` — 4 nodes (analyst actor, analyst-portal webclient, orders-api service, orders-db database); orders-api has TWO interfaces (freeform interface-type: `orders-api-rest` with protocol + port; formal interface-definition: `orders-api-host-port` with definition-url + config); analyst-portal has one freeform interface; the connects relationship references `source.interfaces` and `destination.interfaces` arrays; all six files validate.
- `code-examples/module-02-calm-fundamentals/with-controls.architecture.json` — KYC compliance FSI scenario; 4 nodes; top-level `encryption-in-transit` control (TLS 1.3); per-node `data-classification` control on `kyc-records-db` (PII, 2555-day retention per GDPR + FCA SYSC 9.1); per-relationship `mutual-tls` control on the firewall-to-service edge (90-day certificate rotation).
- `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json` — anchor for Lab 2; exactly 6 nodes (actor, webclient, network, service, database, system); exactly 5 relationships (1 interacts, 3 connects with HTTPS/mTLS/JDBC protocols, 1 deployed-in); 1 freeform interface on `attendees` (HTTPS:8443); top-level `encryption-in-transit` control; metadata block with name/version/created-by.

**Validation result:** `6 passed, 0 failed` (includes module-00 todo-api and Wave 1 files)

### Task 2 — MDX chapters (committed c3dab53)

**Files created:**

- `content/module-02-calm-fundamentals/interfaces.mdx` (Ch 2.4, slug: interfaces, ~1900 words) — freeform vs definition-url forms, relationship interface references via source.interfaces/destination.interfaces, 1.0-rc1 deprecation, complete with-interfaces.architecture.json code block.
- `content/module-02-calm-fundamentals/controls.mdx` (Ch 2.5, slug: controls, ~2100 words) — control anatomy, three attachment scopes with examples from each, requirement-url + config pattern, FINOS CCC mention, complete with-controls.architecture.json code block.
- `content/module-02-calm-fundamentals/decorators.mdx` (Ch 2.6, slug: decorators, ~1900 words) — decorators as SEPARATE documents, target vs applies-to distinction, 4 decorator types, anti-pattern (embedding in metadata), inline decorator JSON example.
- `content/module-02-calm-fundamentals/building-your-first-architecture.mdx` (Ch 2.7, slug: building-your-first-architecture, ~2300 words) — 7-step build walkthrough, step-by-step JSON fragments, validate with CALM CLI, visualise in CALM Studio, complete conference-signup.architecture.json reference, Lab 2 forward-link.

Combined with Wave 1, `content/module-02-calm-fundamentals/` now has exactly 7 MDX files.

### Task 3 — Illustration stubs (committed 7f99016)

**Files created:**

| Stub | Chapter | DIAGRAM SPEC summary |
|---|---|---|
| m02-interface-anatomy | Ch 2.4 | Node with freeform and formal interface boxes; connects relationship with source/destination interface references |
| m02-control-anatomy | Ch 2.5 | Vertical chain: controls to control-key to description + requirements[] to requirement-url to config |
| m02-decorator-external-overlay | Ch 2.6 | Two document boxes side-by-side; dashed arrows from decorator to architecture file (target) and specific nodes (applies-to) |
| m02-deployed-in-composed-of | Ch 2.3, 2.7 | Two panels: deployed-in (dashed container) vs composed-of (solid container) |
| m02-conference-signup-step1-nodes | Ch 2.7, Lab 2 | 6 nodes laid out, no relationships |
| m02-conference-signup-step2-relationships | Ch 2.7, Lab 2 | Same 6 nodes with all 5 relationships and protocol labels |
| m02-conference-signup-step3-complete | Ch 2.7, Lab 2 | Complete architecture with interface callout + control badge + [VALIDATED] annotation |

INVENTORY.md updated: 13 m02 rows (6 Wave 1 + 7 Wave 2), 8 m01 rows, 3 m00 rows — all preserved.

## Validation Results

```
Validation summary: 6 passed, 0 failed
  PASS: code-examples/module-00-on-ramp/todo-api.architecture.json
  PASS: code-examples/module-02-calm-fundamentals/with-controls.architecture.json
  PASS: code-examples/module-02-calm-fundamentals/conference-signup.architecture.json
  PASS: code-examples/module-02-calm-fundamentals/node-types-reference.architecture.json
  PASS: code-examples/module-02-calm-fundamentals/relationship-types-reference.architecture.json
  PASS: code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json
```

## Decisions Made

1. **KYC scenario for with-controls.architecture.json** — The KYC (Know Your Customer) compliance scenario maps naturally to three control scopes: system-wide encryption (top-level), PII data classification on the records database (per-node), and certificate rotation on the firewall-to-service connection (per-relationship). It also reflects realistic FSI regulatory context (GDPR, FCA SYSC 9.1).

2. **conference-signup attendees-api interface is HTTPS-only freeform** — No definition-url form on the conference signup anchor example. The formal definition-url form is already demonstrated in `with-interfaces.architecture.json`. Keeping the anchor example simpler makes it easier for Lab 2 learners to reproduce from scratch. Decision: teach both forms in `interfaces.mdx` + `with-interfaces.architecture.json`; use freeform only in the conference signup.

3. **k8s-cluster node-type is `system`** — Confirmed per RESEARCH.md A1 and the FINOS `conference-signup.pattern.json` const assertion. The cluster is a controlled, operated environment, not an external ecosystem like AWS VPC. Used `system` consistently.

4. **description field reworded in with-interfaces.architecture.json** — The original description mentioned deprecated interface type names as negative examples. The plan's grep acceptance check flags any file containing those strings. Reworded to a positive statement: "This file uses only CALM 1.2 interface forms — no deprecated pre-1.1 interface types."

5. **Worktree started from pre-Wave-1 commit** — The worktree branch `worktree-agent-a0c0c06490ae86832` diverged from `main` at commit `5b9460b` (before Wave 1 content). At session start, merged main (fast-forward to `dd70b26`) to obtain Wave 1 code examples, chapters, and illustration stubs. No conflicts.

## Known Stubs

All 13 m02 SVG files in `illustrations/exported/` are placeholder files (~500-600 bytes each). The user must author the corresponding Excalidraw source files and run `bash scripts/export-excalidraw.sh <name>` to replace them with real diagrams. Placeholder SVGs are valid XML and render a labelled grey placeholder.

Files needing user Excalidraw authoring (7 new from this wave):
- `illustrations/source/m02-interface-anatomy.excalidraw`
- `illustrations/source/m02-control-anatomy.excalidraw`
- `illustrations/source/m02-decorator-external-overlay.excalidraw`
- `illustrations/source/m02-deployed-in-composed-of.excalidraw`
- `illustrations/source/m02-conference-signup-step1-nodes.excalidraw`
- `illustrations/source/m02-conference-signup-step2-relationships.excalidraw`
- `illustrations/source/m02-conference-signup-step3-complete.excalidraw`

Plus 6 stubs from Wave 1 (see 03-01-SUMMARY.md).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Deprecated interface type strings in with-interfaces description**

- **Found during:** Post-task-1 verification (plan acceptance criteria grep check)
- **Issue:** The `description` field of `with-interfaces.architecture.json` contained deprecated interface type name strings as anti-pattern documentation. The grep check flags any file containing these strings regardless of context.
- **Fix:** Reworded description to use a positive statement about CALM 1.2 compliance, removing the deprecated type names.
- **Files modified:** `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json`
- **Commit:** `88b3576`

**2. [Rule 1 - Bug] Chapter number prose cross-reference in building-your-first-architecture.mdx code block**

- **Found during:** Post-task-2 verification (chapter-number prose check)
- **Issue:** The conference-signup.architecture.json description field contained "Module 2 Chapter 2.7 and Lab 2" — meta-commentary that caused the prose-reference check to flag the file when embedded in the code block in building-your-first-architecture.mdx.
- **Fix:** Removed the meta-commentary from the description in both `conference-signup.architecture.json` and the inline code block in `building-your-first-architecture.mdx`. Description is now purely architectural.
- **Files modified:** `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`, `content/module-02-calm-fundamentals/building-your-first-architecture.mdx`
- **Commit:** `c3dab53`

## Threat Surface Scan

No new network endpoints, auth paths, or trust boundary changes introduced. All files are static content (JSON examples, MDX prose, SVG placeholders). The `example.com` URLs in controls are placeholder schemas used consistently throughout the course — no real internal URLs.

## Self-Check

### Files exist
- [x] `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json`
- [x] `code-examples/module-02-calm-fundamentals/with-controls.architecture.json`
- [x] `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`
- [x] `content/module-02-calm-fundamentals/interfaces.mdx`
- [x] `content/module-02-calm-fundamentals/controls.mdx`
- [x] `content/module-02-calm-fundamentals/decorators.mdx`
- [x] `content/module-02-calm-fundamentals/building-your-first-architecture.mdx`
- [x] 7 new `.excalidraw` stubs in `illustrations/source/`
- [x] 7 new `.svg` placeholders in `illustrations/exported/`
- [x] `illustrations/INVENTORY.md` has 13 m02 rows

### Commits exist
- [x] `6a157a2` — feat(module-02): add interfaces, controls, and conference-signup code examples
- [x] `c3dab53` — feat(module-02): author chapters 2.4-2.7
- [x] `7f99016` — feat(module-02): add 7 Excalidraw stubs + SVG placeholders + INVENTORY update
- [x] `88b3576` — fix(module-02): remove deprecated interface type strings from with-interfaces description

## Self-Check: PASSED
