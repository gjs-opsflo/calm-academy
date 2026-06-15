---
phase: 01-module-0-on-ramp
verified: 2026-06-15T12:00:00Z
status: human_needed
score: 8/9 must-haves verified
overrides_applied: 0
gaps:
deferred:
human_verification:
  - test: "One learner (internal tester) completes Module 0 end-to-end in under 30 minutes with no hand-holding"
    expected: "Learner reads chapters 0.1 → 0.4 → 0.2 → 0.3 → 0.5, completes Lab 0, takes the quiz — total time under 30 minutes, no questions needing clarification from course author"
    why_human: "Cannot be automated — requires a real person unfamiliar with CALM to attempt the module on a fresh machine and confirm the 15-minute on-ramp claim in the goal"
  - test: "ILL-01 illustrations authored in Excalidraw and exported as SVGs"
    expected: "All 3 SVG files (m00-three-paths.svg, m00-calm-studio-mock.svg, m00-architecture-as-prompt.svg) exceed 1KB and contain real diagram content, not placeholder text"
    why_human: "User has explicitly deferred illustration authoring. Excalidraw stubs exist with embedded specs. SVGs are currently placeholder files (890, 905, 930 bytes respectively — all below the 1KB phase gate). User must open each .excalidraw stub in Excalidraw, author the diagram per the embedded spec, and export. Then run bash scripts/export-excalidraw.sh <name> for each. The chapters reference the SVG paths correctly — they will render once real SVGs replace the placeholders."
---

# Phase 1: Module 0 — The 15-Minute On-Ramp Verification Report

**Phase Goal:** Author and publish Module 0 (the demo hook) end-to-end — proves the production workflow and hooks early learners with immediate value before they've learned the spec.
**Verified:** 2026-06-15T12:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A student can read Chapter 0.1 and understand there are exactly three input paths to a CALM doc | VERIFIED | `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` exists (2311 words); contains H3 subheadings for Path A: Talk, Path B: Sketch, Path C: Markdown; full todo-api JSON embedded without truncation |
| 2 | A student can read Chapter 0.4 and pick one of three setup flavours and be ready to generate CALM | VERIFIED | `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` exists (1151 words); H3s for Option 1, Option 2, Option 3; `claude mcp list` check-first pattern correct; no `npx @calmstudio/mcp` install command; zero-install CALM Studio web path included |
| 3 | A student can read Chapter 0.2 and follow the live demo walkthrough step by step | VERIFIED | `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` (2564 words); all 6 tool call types narrated in sequence (read_calm_guide, create_architecture, add_node ×4, add_relationship ×3, finalize_architecture, export_calm); full todo-api JSON present; both illustration references wired |
| 4 | A student can read Chapter 0.3 and understand why the AI path works and when it breaks down | VERIFIED | `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` (2373 words); read_calm_guide mechanism explained; 9-node-type reference table; container/component called out as non-spec; 5 limitation scenarios; architecture-as-the-prompt concept present |
| 5 | The todo-api.architecture.json validates cleanly | VERIFIED | `scripts/validate-calm.sh` exits 0: "Validation summary: 1 passed, 0 failed"; all 4 nodes use valid core CALM types (actor, webclient, service, database) confirmed by Python parse |
| 6 | A student can open labs/lab-00-on-ramp/LAB.md and follow all 4 steps end-to-end | VERIFIED | LAB.md exists with Learnforge YAML frontmatter; 4 steps (ai_judge, file_state, command_regex, ai_judge); `requires_docker: false` set; step-3 pattern "No issues found" matches actual calm validate output; `scripts/test-lab.sh` exits 0 (3/3 checks pass) |
| 7 | The solution file validates with calm validate | VERIFIED | `labs/lab-00-on-ramp/solution/my-system.architecture.json` (simple-blog, 4 nodes, 3 relationships); `test-lab.sh` runs calm validate on it and exits 0; all node types valid (actor, webclient, service, database) |
| 8 | Module 0 quiz YAML has questions covering all 3 QUIZ-01 topic areas and validates | VERIFIED | `quizzes/module-00-on-ramp.yaml` contains 9 questions across 5 chapters; covers setup (q0.4.1), first CALM doc produced (q0.5.1, q0.5.2, q0.5.3), three AI paths (q0.1.1, q0.1.2); plus bonus coverage of demo (q0.2.1) and why-it-works (q0.3.1, q0.3.2); `scripts/lint-quizzes.sh` exits 0 with 28/28 checks passed |
| 9 | 3 Excalidraw B&W illustrations exported as SVG and inline-referenced in lessons | UNCERTAIN — known deferred | Stubs exist in `illustrations/source/m00-*.excalidraw` (3 files, valid JSON with embedded authoring specs); SVGs exist in `illustrations/exported/` (3 files) but are placeholder stubs: 890, 905, and 930 bytes — all below the 1KB phase gate; chapters reference correct SVG paths (wired), but content is placeholder text not real diagrams; user has explicitly deferred authoring |

**Score:** 8/9 truths verified (Truth 9 is UNCERTAIN — user-deferred illustration authoring)

### Deferred Items

Items not yet met but explicitly deferred by the user per the `checkpoint:human-action` gate in Plan 01-02 Task 2.

| # | Item | Status | Evidence |
|---|------|--------|----------|
| 1 | ILL-01: Three Excalidraw illustrations authored and exported as SVGs >1KB | Deferred — user action required | INVENTORY.md shows all 3 as "stub — needs Excalidraw authoring"; SVG files are valid placeholders that inline in MDX without broken links; Excalidraw stubs contain full authoring specifications; chapters reference correct paths and will render correctly once real SVGs replace placeholders |

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` | Chapter 0.1 — Three Paths | VERIFIED | 2311 words, 8 H2 sections, 3 path H3s, full JSON embedded |
| `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` | Chapter 0.4 — Setup | VERIFIED | 1151 words, 7 H2 sections (note: no Code/CALM examples section — consistent with plan action spec for this procedural chapter) |
| `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` | Chapter 0.2 — Live Demo | VERIFIED | 2564 words, 8 H2 sections, 6 tool call types narrated, both SVG illustration references wired |
| `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` | Chapter 0.3 — Why it Works | VERIFIED | 2373 words, 7 H2 sections (no Code/CALM examples section — consistent with plan action spec); read_calm_guide mechanism, 9-type table, 5 limitations, illustration reference wired |
| `content/module-00-on-ramp/your-first-calm-document.mdx` | Chapter 0.5 — Lab wrapper | VERIFIED | 1452 words, 8 H2 sections, prominent lab link present, hook closing paragraph present |
| `code-examples/module-00-on-ramp/todo-api.architecture.json` | Validated CALM 1.2 anchor example | VERIFIED | 4 nodes (actor/webclient/service/database), 3 relationships, validates exit 0 |
| `labs/lab-00-on-ramp/LAB.md` | Lab 0 — Learnforge-compatible | VERIFIED | YAML frontmatter with all required fields; 4 steps; step-1 ai_judge not exit_code; requires_docker: false |
| `labs/lab-00-on-ramp/solution/my-system.architecture.json` | Lab 0 reference solution | VERIFIED | simple-blog 4-node architecture validates with calm CLI exit 0 |
| `labs/lab-00-on-ramp/starter/README.md` | Lab starter explanation | VERIFIED | Exists (727 bytes), explains empty starter pattern |
| `quizzes/module-00-on-ramp.yaml` | Module 0 quiz — 5+ questions | VERIFIED | 9 questions across 5 chapters; all QUIZ-01 topic areas covered; lint passes 28/28 |
| `scripts/validate-calm.sh` | CALM JSON validation gate | VERIFIED | Executable, exits 0, finds and validates all code-examples/*.architecture.json |
| `scripts/lint-quizzes.sh` | Quiz schema linter | VERIFIED | Executable, exits 0 with 28 schema checks passing on module-00-on-ramp.yaml |
| `scripts/test-lab.sh` | Lab end-to-end verification | VERIFIED | Executable, exits 0, validates solution CALM file + LAB.md existence + requires_docker check |
| `illustrations/source/m00-three-paths.excalidraw` | ILL-01-A stub | VERIFIED (stub) | Valid JSON, contains authoring specification; user still needs to author actual diagram |
| `illustrations/source/m00-calm-studio-mock.excalidraw` | ILL-01-B stub | VERIFIED (stub) | Valid JSON, contains authoring specification; user still needs to author actual diagram |
| `illustrations/source/m00-architecture-as-prompt.excalidraw` | ILL-01-C stub | VERIFIED (stub) | Valid JSON, contains authoring specification; user still needs to author actual diagram |
| `illustrations/exported/m00-three-paths.svg` | ILL-01-A SVG (>1KB required) | UNCERTAIN — placeholder | 890 bytes — below 1KB phase gate; placeholder text only |
| `illustrations/exported/m00-calm-studio-mock.svg` | ILL-01-B SVG (>1KB required) | UNCERTAIN — placeholder | 905 bytes — below 1KB phase gate; placeholder text only |
| `illustrations/exported/m00-architecture-as-prompt.svg` | ILL-01-C SVG (>1KB required) | UNCERTAIN — placeholder | 930 bytes — below 1KB phase gate; placeholder text only |
| `illustrations/INVENTORY.md` | Living illustration index | VERIFIED | Exists with all 3 entries; status correctly shows "stub — needs Excalidraw authoring" for all 3 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `three-paths-to-first-calm-doc.mdx` | `code-examples/module-00-on-ramp/todo-api.architecture.json` | Code block reference comment | WIRED | `// from code-examples/module-00-on-ramp/todo-api.architecture.json` present; full JSON embedded at line 45 |
| `three-paths-to-first-calm-doc.mdx` | `get-set-up-in-sixty-seconds.mdx` | Markdown link in Further reading | WIRED | `./get-set-up-in-sixty-seconds.mdx` linked |
| `get-set-up-in-sixty-seconds.mdx` | `claude mcp list` verification step | Bash code block | WIRED | Present at line 38-40; check-before-install pattern confirmed |
| `live-demo-diagram-to-calm-in-five-minutes.mdx` | `code-examples/module-00-on-ramp/todo-api.architecture.json` | Inline JSON code block reference | WIRED | 5 references to todo-api.architecture.json including embedded full JSON |
| `live-demo-diagram-to-calm-in-five-minutes.mdx` | `illustrations/exported/m00-three-paths.svg` | Markdown image reference | WIRED | `![...](../../illustrations/exported/m00-three-paths.svg)` at line 36 |
| `live-demo-diagram-to-calm-in-five-minutes.mdx` | `illustrations/exported/m00-calm-studio-mock.svg` | Markdown image reference | WIRED | `![...](../../illustrations/exported/m00-calm-studio-mock.svg)` at line 290 |
| `why-this-works-and-when-it-doesnt.mdx` | `illustrations/exported/m00-architecture-as-prompt.svg` | Markdown image reference | WIRED | `![...](../../illustrations/exported/m00-architecture-as-prompt.svg)` at line 39 |
| `your-first-calm-document.mdx` | `labs/lab-00-on-ramp/LAB.md` | Markdown link | WIRED | `[Lab 0: Your First CALM Document in 15 Minutes](../../labs/lab-00-on-ramp/LAB.md)` at line 147 |
| `labs/lab-00-on-ramp/LAB.md` | `labs/lab-00-on-ramp/solution/my-system.architecture.json` | Solution reference in body | WIRED | `solution/my-system.architecture.json` referenced in Stretch goals and Solution sections |
| `quizzes/module-00-on-ramp.yaml` | `content/module-00-on-ramp/*.mdx` | reference_section paths in questions | WIRED | All 9 questions have reference_section pointing to correct MDX files under `../content/module-00-on-ramp/` |
| `scripts/test-lab.sh` | `labs/lab-00-on-ramp/solution/my-system.architecture.json` | `npx @finos/calm-cli validate -a` | WIRED | script finds and validates `solution/*.architecture.json`; exits 0 |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| CALM JSON validates (todo-api) | `bash scripts/validate-calm.sh` | exit 0; "1 passed, 0 failed" | PASS |
| Lab solution validates | `bash scripts/test-lab.sh` | exit 0; "3/3 checks passed" | PASS |
| Quiz linter passes | `bash scripts/lint-quizzes.sh` | exit 0; "28/28 checks passed" | PASS |
| calm validate output matches step-3 pattern | `npx @finos/calm-cli validate -a labs/lab-00-on-ramp/solution/my-system.architecture.json -f pretty` | Output contains "No issues found" — matches pattern in LAB.md step-3 | PASS |
| SVG illustration size gate (ILL-01) | `wc -c illustrations/exported/m00-*.svg` | 890, 905, 930 bytes — all below 1KB phase gate | FAIL (deferred) |

### Probe Execution

No probes declared in PLAN.md or SUMMARY.md. Scripts used as behavioral spot-checks above.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| MOD-01 | 01-01, 01-02, 01-03 | Module 0 has 5 fully-authored MDX chapters | SATISFIED | All 5 chapters exist; Chapter 0.1 (2311w), 0.2 (2564w), 0.3 (2373w), 0.4 (1151w), 0.5 (1452w); all have required structure |
| LAB-01 | 01-03 | Lab 0 Docker-free 15-minute on-ramp | SATISFIED | LAB.md with 4 steps; requires_docker: false; solution validates; test-lab.sh exits 0 |
| QUIZ-01 | 01-03 | Module 0 quiz covering setup, first CALM doc, three AI paths | SATISFIED | 9 questions across 5 chapters; QUIZ-01 topic areas: setup (q0.4.1), first CALM doc (q0.5.x), three paths (q0.1.x); lint-quizzes.sh exits 0 |
| ILL-01 | 01-02 | Module 0 has 3-5 Excalidraw B&W illustrations exported as SVG | PARTIAL | 3 Excalidraw stubs exist with authoring specs; 3 SVG files exist but are placeholders (<1KB); chapters reference correct SVG paths; user has explicitly deferred illustration authoring |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `illustrations/exported/m00-three-paths.svg` | — | Placeholder SVG (890 bytes, below 1KB phase gate) | WARNING | Renders as a grey rectangle with text "[Illustration placeholder: m00-three-paths]" in lessons |
| `illustrations/exported/m00-calm-studio-mock.svg` | — | Placeholder SVG (905 bytes, below 1KB phase gate) | WARNING | Renders as a grey rectangle with text "[Illustration placeholder: m00-calm-studio-mock]" in lessons |
| `illustrations/exported/m00-architecture-as-prompt.svg` | — | Placeholder SVG (930 bytes, below 1KB phase gate) | WARNING | Renders as a grey rectangle with text "[Illustration placeholder: m00-architecture-as-prompt]" in lessons |
| `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` | All | Missing `## Code/CALM examples` section (STYLE-GUIDE requires it) | INFO | Plan action for this chapter only spec'd 7 sections; procedural chapter has no CALM JSON to embed; not blocking |
| `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` | All | Missing `## Code/CALM examples` section (STYLE-GUIDE requires it) | INFO | Plan action for this chapter only spec'd 7 sections; chapter teaches concepts not code examples; not blocking |

No TBD, FIXME, or XXX markers found in any phase-modified file. The `[verify URL before publication]` markers were present initially but were removed in commit `d493be1` (code review fix CR-03). The CALM Studio URL `https://studio.calm.finos.org` is now used directly without annotation.

### Human Verification Required

#### 1. End-to-End Learner Test (ROADMAP Success Criterion 5)

**Test:** Have one person who has never worked with CALM open the module and attempt it from zero. They should start at `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx`, follow through all 5 chapters in recommended reading order, complete Lab 0, and take the quiz.
**Expected:** Learner completes the full module — read all chapters, produced a valid `.calm.json` for a system they know, validated it, visualized in CALM Studio, answered quiz questions — in under 30 minutes with no prompting from the course author.
**Why human:** Automated checks verify all the structural pieces exist and work. The 30-minute time constraint and "no hand-holding" claim requires a real human attempting it on a real machine. Checks that: setup instructions work in practice, the 3-sentence prompt actually produces valid CALM from calmstudio-mcp, the lab flow is intuitive, and the quiz questions are at the right difficulty level.

#### 2. ILL-01 Illustration Authoring (Known Deferred — user-acknowledged)

**Test:** Open each Excalidraw stub in Excalidraw and author the diagram per the embedded specification. Export as SVG via `bash scripts/export-excalidraw.sh <name>`. Verify each SVG is >1KB.
**Expected:** Three authored B&W Excalidraw illustrations exported as SVG files each exceeding 1KB:
- `m00-three-paths.svg`: Three parallel vertical lanes (Path A: Talk, Path B: Sketch, Path C: Markdown) converging to single .calm.json output
- `m00-calm-studio-mock.svg`: Browser window frame with 4 CALM node shapes (actor/webclient/service/database) connected by arrows
- `m00-architecture-as-prompt.svg`: Left-to-right flow: architect → describes → calmstudio-mcp → produces → my-system.architecture.json
After authoring: update `illustrations/INVENTORY.md` status from "stub" to "authored" for each.
**Why human:** Excalidraw diagrams require a human to author interactively in the Excalidraw canvas. The stubs contain full authoring specifications as visible text elements — open each `.excalidraw` file in Excalidraw to see the spec. Run `for f in illustrations/exported/m00-*.svg; do echo "$f: $(wc -c < $f) bytes"; done` to confirm all >1KB after export.

### Gaps Summary

No blockers. All automated requirements (MOD-01, LAB-01, QUIZ-01) are SATISFIED. The only outstanding items are:

1. **ILL-01 illustrations**: Three placeholder SVGs that display as grey rectangles in the live site. The Excalidraw stubs are ready for authoring — this is a user action item that was explicitly deferred at the `checkpoint:human-action` gate in Plan 01-02 Task 2. Not a code gap; a content production gap.

2. **ROADMAP SC 5 (learner test)**: The "one learner completes in under 30 minutes" success criterion requires a real human tester. All technical prerequisites for that test are in place.

3. **Code/CALM examples section**: Chapters 0.3 and 0.4 have 7 H2 sections instead of the 8 specified in STYLE-GUIDE.md. The plan action sections for these chapters only spec'd 7 sections — the plan's acceptance criteria phrase "All 8 required sections" was slightly inaccurate relative to the plan action. Both chapters are appropriate for their content (Chapter 0.4 is procedural setup with no CALM JSON to embed; Chapter 0.3 is conceptual and its node type reference table appears inside "The concept" section). This is an INFO-level style deviation, not a blocker.

---

_Verified: 2026-06-15T12:00:00Z_
_Verifier: Claude (gsd-verifier)_
