# Phase 6: Polish + Milestone Close — Research

**Researched:** 2026-06-18
**Domain:** Content quality audit, cross-reference hygiene, CI gap closure, WCAG accessibility, PROPOSAL.md currency
**Confidence:** HIGH (all findings verified by direct file inspection, command output, or verification report evidence)

---

## Summary

This is a pure-audit phase. Phases 1–5 have shipped all Milestone 1 content: 24 MDX chapters across 4 modules, 4 labs, 4 quizzes, 34 illustration stubs, 3 slide decks, a cheatsheet, and a live Docusaurus site at `https://gjs-opsflo.github.io/calm-academy/`. The site builds and deploys cleanly.

Phase 6 is not a content production phase. It is a gap-closure and sign-off phase. The primary work is: (1) updating the 21-requirement traceability table in REQUIREMENTS.md to reflect actual completion status, (2) wiring the CI to also validate `*.architecture.json` files (the existing ci.yml omits these 6 files), (3) creating a glossary, (4) fixing 62 broken quiz links (static `.yaml` file references that 404 on the site), (5) fixing 10 lab links that 404 on the deployed site, (6) adding the live site URL to PROPOSAL.md, and (7) running an axe-core accessibility spot check on two modules.

The illustration authoring gap (34 placeholder SVGs, all below 1KB, all displaying as grey rectangles on the live site) has been explicitly deferred by the user across all four content phases. Phase 6 must decide: accept this as a known deferred item, or close it. The ROADMAP's Phase 8 (Polish + Site Launch) was the originally planned home for glossary, cross-reference audit, and illustration completion — this is an early collapse of that work into Phase 6.

**Primary recommendation:** Sequence Phase 6 as: (Wave 1) fix CI + REQUIREMENTS.md traceability; (Wave 2) fix broken links (quiz + lab links on live site); (Wave 3) create glossary; (Wave 4) accessibility spot check + PROPOSAL.md update; (Wave 5) human sign-off checklist.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Requirements traceability update | Planning docs | — | REQUIREMENTS.md is the source of truth; must match actual artifact state |
| CI gap (architecture.json) | CI workflow (.github/workflows/ci.yml) | scripts/validate-calm.sh | CI is the enforcement layer; script already works locally |
| Broken quiz links | Content MDX (20 chapters) | — | Static .yaml links in Further reading sections 404 on deployed site |
| Broken lab links | Content MDX (7 chapters) | site/static/ | Lab files are not served by Docusaurus; links point to repo-relative paths |
| Glossary | docs-meta/ or content/glossary/ | Docusaurus sidebar | New file; follows docs-meta authoring standards |
| Cross-reference audit | Content MDX | — | Chapter-number prose refs (76 occurrences) vs slug-based hyperlinks (separate issue) |
| Accessibility audit | Site (Docusaurus build) | Quiz.tsx component | axe-core in dev mode; two modules spot-checked |
| PROPOSAL.md update | Root document | — | Add live site URL, update status from Draft |
| REQUIREMENTS.md sign-off | Planning docs | — | Update 21 requirements to actual current status |

---

## Requirements Coverage Table

Verified by direct file inspection against artifact state. Status as of 2026-06-18.

| Req ID | Description (abridged) | Artifact Location | Status | Evidence |
|--------|------------------------|-------------------|--------|----------|
| **MOD-01** | Module 0 — 5 MDX chapters | `content/module-00-on-ramp/` | COMPLETE | 5 .mdx files; verified in 01-VERIFICATION.md as 8/9 truths satisfied |
| **MOD-02** | Module 1 — 5 MDX chapters | `content/module-01-case-for-aac/` | COMPLETE | 5 .mdx files; verified in 02-VERIFICATION.md |
| **MOD-03** | Module 2 — 7 MDX chapters | `content/module-02-calm-fundamentals/` | COMPLETE | 7 .mdx files; verified in 03-VERIFICATION.md as 7/7 truths |
| **MOD-04** | Module 3 — 7 MDX chapters | `content/module-03-calm-ecosystem/` | COMPLETE | 7 .mdx files; verified in 04-VERIFICATION.md as 10/10 truths |
| **LAB-01** | Lab 0 — Docker-free 15-min on-ramp | `labs/lab-00-on-ramp/` | COMPLETE | LAB.md + starter + solution; `test-lab.sh` exits 0 |
| **LAB-02** | Lab 2 — conference signup by hand | `labs/lab-02-conference-signup/` | COMPLETE | LAB.md + starter + solution; solution validates |
| **LAB-03** | Lab 3 — CI/CD gate | `labs/lab-03-cicd-gate/` | COMPLETE | LAB.md + starter (valid+broken) + solution workflow |
| **QUIZ-01** | Module 0 quiz | `quizzes/module-00-on-ramp.yaml` | COMPLETE | 9 questions; lint passes |
| **QUIZ-02** | Module 1 quiz | `quizzes/module-01-case-for-aac.yaml` | COMPLETE | 11 questions; lint passes |
| **QUIZ-03** | Module 2 quiz | `quizzes/module-02-calm-fundamentals.yaml` | COMPLETE | 21 questions; largest quiz; lint passes |
| **QUIZ-04** | Module 3 quiz | `quizzes/module-03-ecosystem.yaml` | COMPLETE | 18 questions; lint passes |
| **ILL-01** | Module 0 — 3–5 Excalidraw B&W illustrations | `illustrations/source/m00-*.excalidraw` | PARTIAL — deferred | 3 stubs exist (2.0–2.1KB); 3 SVG placeholders (890–930 bytes, all < 1KB threshold); user explicitly deferred across 3 phase verifications |
| **ILL-02** | Module 1 — 8–10 illustrations | `illustrations/source/m01-*.excalidraw` | PARTIAL — deferred | 8 stubs; 8 SVG placeholders (904–951 bytes); deferred |
| **ILL-03** | Module 2 — 10–15 illustrations | `illustrations/source/m02-*.excalidraw` | PARTIAL — deferred | 13 stubs; 13 SVG placeholders (911–998 bytes); deferred |
| **ILL-04** | Module 3 — 8–10 illustrations | `illustrations/source/m03-*.excalidraw` | PARTIAL — deferred | 10 stubs; 10 SVG placeholders (881–968 bytes); deferred |
| **SLIDE-01** | Module 1 slide deck (20–30 slides) | `slides/module-01-case-for-aac.md` | COMPLETE | 26 slides; `marp: true`; 362 lines. File confirmed present — not visible in REQUIREMENTS.md traceability (shows Pending) because the traceability table was never updated after execution. |
| **SLIDE-02** | Module 2 slide deck (30–40 slides) | `slides/module-02-calm-fundamentals.md` | COMPLETE | 40 slides; `marp: true`; 848 lines. Same traceability gap — table says Pending. |
| **SLIDE-03** | Module 3 slide deck (25–35 slides) | `slides/module-03-calm-ecosystem.md` | COMPLETE | 28 slides; `marp: true`; 456 lines. Table correctly shows Complete. |
| **CODE-01** | Every `.calm.json` passes `calm validate` in CI | `.github/workflows/ci.yml` | PARTIAL — CI gap | CI validates 4 `*.calm.json` files (module-03 only). Does NOT validate 6 `*.architecture.json` files (module-00: 1, module-02: 5). These pass `scripts/validate-calm.sh` locally but are absent from CI. |
| **CODE-02** | Module 2 cheatsheet published | `docs-meta/cheatsheets/module-02-cheatsheet.md` | COMPLETE | 198 lines; all 9 node types, 5 relationship types, CLI reference; verified in 03-VERIFICATION.md |
| **SITE-01** | Docusaurus site production-ready | `https://gjs-opsflo.github.io/calm-academy/` | COMPLETE | Verified in 05-VERIFICATION.md as 13/13 truths (4 overrides); live HTTP 200 confirmed |

**Summary:**
- COMPLETE: 15/21
- PARTIAL — deferred: 4/21 (all illustration requirements ILL-01 through ILL-04)
- PARTIAL — CI gap: 1/21 (CODE-01: `*.architecture.json` not in CI)
- REQUIREMENTS.md traceability table: 14 requirements still show "Pending" — must be updated

---

## Critical Findings

These MUST be fixed before milestone close:

### Critical-1: REQUIREMENTS.md traceability table is stale (14 requirements show "Pending")

**Evidence:** The traceability table in `.planning/REQUIREMENTS.md` shows all Phase 1–4 requirements as "Pending" and only Phase 5 requirements (MOD-04, LAB-03, QUIZ-04, ILL-04, SLIDE-03, SITE-01) as "Complete." All other 14 requirements were completed in phases 1–4 but the table was never updated.

**Fix:** Update the traceability table to reflect verified completion status. SLIDE-01, SLIDE-02, and SLIDE-03 all exist (confirmed). MOD-01 through MOD-04, LAB-01 through LAB-03, QUIZ-01 through QUIZ-04 are all verified complete. CODE-02 is verified complete. CODE-01 is partial (CI gap). ILL-01 through ILL-04 are partial (deferred). SITE-01 is complete.

### Critical-2: CODE-01 partial — 6 `*.architecture.json` files not validated by CI

**Evidence:** `ci.yml` validate-calm-examples job uses: `find code-examples -name "*.calm.json" -type f`. This matches 4 files in module-03 only. It does NOT match:
- `code-examples/module-00-on-ramp/todo-api.architecture.json`
- `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`
- `code-examples/module-02-calm-fundamentals/node-types-reference.architecture.json`
- `code-examples/module-02-calm-fundamentals/relationship-types-reference.architecture.json`
- `code-examples/module-02-calm-fundamentals/with-controls.architecture.json`
- `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json`

`scripts/validate-calm.sh` validates all `*.architecture.json` files locally and passes (confirmed in 01-VERIFICATION.md and 03-VERIFICATION.md). But CI never calls this script.

**Fix:** Add a second step to the `validate-calm-examples` CI job that runs `bash scripts/validate-calm.sh`. Or extend the find pattern to cover both file types.

### Critical-3: 62 broken quiz links in MDX content (`.yaml` file references 404 on deployed site)

**Evidence:** `rg "quizzes/" content/` returns 62 matches across 24 files. Of these, only 4 chapters use the correct pattern (MDX import + `<Quiz />` component). The remaining 20 chapters contain static markdown links like `[Take the Module 0 quiz](../../quizzes/module-00-on-ramp.yaml)` that generate `href="/calm-academy/quizzes/module-00-on-ramp.yaml"` on the deployed site. Docusaurus does not serve files from the `quizzes/` directory — these links 404.

**Distribution by module:**
- Module 0: 4 chapters with broken quiz links (all four non-final chapters)
- Module 1: 4 chapters with broken quiz links
- Module 2: 5 chapters with broken quiz links
- Module 3: 5 chapters with broken quiz links (except `cicd-integration.mdx` which has the proper import)

**Fix option A:** Remove broken quiz links from all 20 chapters. The interactive quiz is embedded in the final chapter of each module — cross-links are not strictly necessary.
**Fix option B:** Replace with GitHub repo raw URL to the YAML file (readable, not interactive).
**Fix option C:** Add quiz YAML files to `site/static/quizzes/` so they are served. Learners see raw YAML not the interactive quiz, but at least the link doesn't 404.

### Critical-4: 10 broken lab links in MDX content (`.md` file references 404 on deployed site)

**Evidence:** `rg "labs/lab-" content/` returns 10 matches across 7 files. These resolve to paths like `href="/calm-academy/labs/lab-00-on-ramp/LAB.md"` on the deployed site. Labs are not in `site/static/` and not served by Docusaurus.

The 05-VERIFICATION.md initially flagged this as "theoretical risk" and later accepted an override after stating "no actual lab links found in any MDX content files." This was incorrect — the rg search above confirms 10 lab links exist in 7 content files. The 05-VERIFICATION relied on a grep that didn't match the pattern.

**Files with lab links:**
- `module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` — Lab 0
- `module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` — Lab 0
- `module-00-on-ramp/three-paths-to-first-calm-doc.mdx` — Lab 0
- `module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` — Lab 0
- `module-00-on-ramp/your-first-calm-document.mdx` — Lab 0 (2 references)
- `module-02-calm-fundamentals/building-your-first-architecture.mdx` — Lab 2 (2 references)
- `module-03-calm-ecosystem/cicd-integration.mdx` — Lab 3 (2 references)

**Fix option A:** Change all lab links to point to the GitHub repo: `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-NN-slug/LAB.md`
**Fix option B:** Copy `labs/` into `site/static/labs/` and serve as static files (binary size concern: labs contain JSON, markdown, YAML — total is modest)

---

## Cross-Reference Audit Results

### Slug-based hyperlinks (links in Further Reading / breadcrumbs): PASS

All 50 relative MDX links found (`rg "\]\(\.\/" content/`) use filename-based relative paths (`.mdx` extension), not chapter numbers. Examples:
- `[Your First CALM Document](../module-00-on-ramp/your-first-calm-document.mdx)` — CORRECT
- `[Lessons from Adjacent Disciplines](./lessons-from-adjacent-disciplines.mdx)` — CORRECT

Zero occurrences of `[text](Chapter N.N)` or `[text](#chapter-N)` link patterns found.

### In-prose chapter number references: 76 occurrences — STYLE ISSUE, NOT A BLOCKER

`rg "Chapter [0-9]+\.[0-9]" content/` returns 76 matches across 16 files. These are **prose references**, not hyperlinks — sentences like "Chapter 0.2 showed you what happens step by step" or "The file lives in code-examples/module-00-on-ramp/todo-api.architecture.json" within body text. These are not broken links.

STYLE-GUIDE.md states: "Always use slug-based relative links" (under Cross-references). However, the style guide rule applies to hyperlinks, not prose text. Authors wrote prose like "see Chapter 0.5" as natural language, not as navigation links.

**Assessment:** These 76 instances do not break navigation. They are a minor style deviation but they do not violate the Milestone 1 success criterion ("All cross-references between lessons use permalink slugs"). That criterion applies to hyperlinks, which are all correct. No fix required for milestone close; note as tech debt.

**Distribution of in-prose refs by module:**
- Module 0: ~12 instances (within-module self-references — "Chapter 0.2", "Chapter 0.4", "Chapter 0.5")
- Module 1: ~15 instances (mostly cross-references to Chapter 1.x from within Module 1)
- Module 2: ~10 instances
- Module 3: ~10 instances

---

## Glossary Status

**Finding:** No glossary file exists anywhere in the repository.

Checked:
- `find . -name "glossary*" -o -name "GLOSSARY*"` — 0 results
- `docs-meta/` — no glossary file
- `site/src/pages/` — no glossary page
- `site/docusaurus.config.js` — no `glossary` route or plugin configured

**Terms that appear throughout the content without a single-source definition:**

| Term | Usage count (rg) | Where first defined |
|------|-----------------|---------------------|
| Architecture as Code | 42 in content | Module 1 Chapter 1.2 (implied) |
| CALM 1.2 | 70 in content | Module 0 (referenced as "the spec") |
| ARB | ~8 in content | Module 1 Chapter 1.4 (mentioned, not defined) |
| AIGF | ~6 in content | Module 1 Chapter 1.4 (overview only) |
| SAIF | ~4 in content | Module 1 Chapter 1.4 (overview only) |
| Gemara | ~38 in content | Module 1 Chapter 1.4 (overview depth only) |
| calmstudio-mcp | ~10 in content | Module 0 Chapter 0.4 (referenced as tool) |
| CALM Guard | ~5 in content | Module 1 (mentioned, full treatment in v2) |
| FINOS CCC | ~4 in content | Module 1 (mentioned, full treatment in v2) |
| GRIS | ~2 in content | Module 1 (mentioned in ecosystem map) |
| node types (9 core) | 9 in nodes.mdx | Module 2 Chapter 2.2 (full treatment) |
| decorators | ~20 in content | Module 2 Chapter 2.6 (full treatment) |
| controls | ~25 in content | Module 2 Chapter 2.5 (full treatment) |
| CALM Hub | ~30 in content | Module 3 Chapter 3.3 (full treatment) |
| CALM Studio | ~40 in content | Module 0/Module 3 |
| pattern (CALM) | ~20 in content | Module 3 Chapter 3.6 |

**Recommended glossary scope for Phase 6:**
High-priority terms are those taught at overview depth in Modules 0–1 but whose full treatment is deferred to Modules 4–5 (v2 scope). A learner finishing Module 1 encounters ARB, AIGF, SAIF, Gemara, CALM Guard, GRIS, FINOS CCC without complete definitions. A glossary bridges this gap.

**Recommended format:** Markdown file following the `docs-meta/` authoring standard (same headings, same kebab-case naming). Place at `docs-meta/GLOSSARY.md` for reference use. A learner-facing version could go at `content/glossary.mdx` and appear in the Docusaurus sidebar.

**Existing doc format to follow:** `docs-meta/cheatsheets/module-02-cheatsheet.md` — tables with term/definition/cross-reference column. 198 lines for a single module's vocabulary. A cross-cutting glossary would be 60–120 lines covering the 15–20 key ecosystem terms.

---

## CODE-01 Status (Detailed)

**Current CI coverage:**

| File | Extension | CI validates? | Local script validates? |
|------|-----------|---------------|------------------------|
| `code-examples/module-00-on-ramp/todo-api.architecture.json` | `.architecture.json` | NO | YES (`validate-calm.sh` exits 0) |
| `code-examples/module-02-calm-fundamentals/conference-signup.architecture.json` | `.architecture.json` | NO | YES |
| `code-examples/module-02-calm-fundamentals/node-types-reference.architecture.json` | `.architecture.json` | NO | YES |
| `code-examples/module-02-calm-fundamentals/relationship-types-reference.architecture.json` | `.architecture.json` | NO | YES |
| `code-examples/module-02-calm-fundamentals/with-controls.architecture.json` | `.architecture.json` | NO | YES |
| `code-examples/module-02-calm-fundamentals/with-interfaces.architecture.json` | `.architecture.json` | NO | YES |
| `code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json` | `.calm.json` | YES | N/A (script only finds `.architecture.json`) |
| `code-examples/module-03-calm-ecosystem/timeline-moment-v1.calm.json` | `.calm.json` | YES | N/A |
| `code-examples/module-03-calm-ecosystem/timeline-moment-v2.calm.json` | `.calm.json` | YES | N/A |
| `code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json` | `.calm.json` | YES | N/A |

**Known limitation to document:** `relationship-types-reference.architecture.json` excludes the `options` relationship type due to a confirmed CALM CLI 1.44.1 runtime crash when validating `options`. This is an accepted deviation documented in 03-VERIFICATION.md. The CI fix must not regress this — the file already passes `calm validate -a` with the `options` exclusion in place.

**CI fix options:**

Option A (minimal, recommended): Add a second run step to the existing `validate-calm-examples` job:
```yaml
- name: Validate legacy architecture.json examples
  run: bash scripts/validate-calm.sh
```
This reuses the existing working script and adds no new logic.

Option B (unified): Modify the find command to cover both patterns:
```bash
find code-examples \( -name "*.calm.json" -o -name "*.architecture.json" \) -type f | while read f; do
  calm validate -a "$f" || exit 1
done
```
This is cleaner but bypasses the local script. Same end result.

---

## PROPOSAL.md Freshness

**Current state:**
- Line 5: `**Status:** Draft — for FINOS Working Group review` — still says "Draft"
- Line 6: `**Repository:** https://github.com/gjs-opsflo/calm-academy` — correct GitHub URL
- No mention of the live site (`https://gjs-opsflo.github.io/calm-academy/`)
- No mention of completed modules (Module 0–3 with text, labs, quizzes, slides)
- PROPOSAL.md has 373 lines covering the full pitch but was written before any content existed

**What needs updating:**
1. Add `**Live site:** https://gjs-opsflo.github.io/calm-academy/` to the header metadata block (after line 6)
2. Add a "Current Status" section near the top with: modules 0–3 complete (text + labs + quizzes + slide decks), Docusaurus site live, CI green, 4 quizzes auto-grading
3. The "Phase 5 — Module 4" in ROADMAP.md vs Phase 4 of actual delivery — PROPOSAL.md uses a different phase numbering (ROADMAP calls current work "Phase 2", "Phase 3", "Phase 4"). PROPOSAL.md's ROADMAP references may need reconciling. Note: PROPOSAL.md's ROADMAP section was pre-written speculatively; current status is the more important update.

**Risk if not updated:** FINOS Working Group reviewer sees "Draft" and no live demo link. The site is the most compelling artifact — not linking it is a missed opportunity.

---

## Accessibility Scope

**Current state in Quiz.tsx:**
- `role="status"` and `aria-live="polite"` on results container (line 253) — correct ARIA pattern for live region updates
- `aria-label={COPY.shortAnswerAriaLabel}` on text input (line 389) — correct labeling

**No accessibility framework installed:** `@axe-core/react`, `jest-axe`, or `@axe-core/playwright` are absent from `site/package.json`. No WCAG-related config exists in `docusaurus.config.js`.

**Realistic WCAG 2.1 AA spot check for Phase 6:**

Phase 6 success criterion requires a spot check on Module 0 and Module 2. A pragmatic, non-tooled approach:

1. **Color contrast:** Docusaurus default theme uses `--ifm-color-primary` which is configurable. The Quiz.tsx uses `--ifm-color-*` CSS variables only (confirmed in 05-VERIFICATION.md). As long as the theme's primary colors meet 4.5:1 ratio, contrast is compliant. Docusaurus Classic theme is generally WCAG 2.1 AA compliant for text contrast. [ASSUMED — not verified against actual computed colors on live site]

2. **Alt text:** All 34 illustration SVGs use descriptive alt text in content MDX (format: `![Three paths to first CALM doc — three parallel lanes converging at .calm.json output](/img/m00-three-paths.svg)`). The placeholder SVGs themselves do not have their own alt text — the MDX img alt text is the accessible name.

3. **Keyboard navigation:** Docusaurus sidebar and nav are keyboard accessible by default. Quiz.tsx uses `<input type="radio">`, `<button>`, and `<input type="text">` — all natively focusable. No custom focus management needed.

4. **Screen reader:** The `aria-live="polite"` on quiz results is appropriate. The `role="status"` is correct. Short answer inputs have `aria-label`. Multiple-choice radio groups should be wrapped in `<fieldset>` with `<legend>` for full screen reader support — this was NOT verified in Quiz.tsx.

**Recommended Phase 6 accessibility scope:**
- Run `npx axe-cli https://gjs-opsflo.github.io/calm-academy/docs/module-00-on-ramp/three-paths-to-first-calm-doc` and `https://gjs-opsflo.github.io/calm-academy/docs/module-02-calm-fundamentals/nodes` — CLI-based, no install required beyond npx
- Fix any `critical` or `serious` violations returned
- Document `moderate` and `minor` as known tech debt
- The `<fieldset>`/`<legend>` gap in Quiz.tsx is the most likely actionable finding

**Package legitimacy note:** `axe-cli` by Deque Systems is a well-established tool. [ASSUMED — not verified via slopcheck in this session]

---

## Phases 1–4 Human-Needed Items (Outstanding)

These are actions from prior phase verifications that have NOT been resolved and carry forward to Phase 6:

### From Phase 1 (01-VERIFICATION.md) — status: human_needed

| # | Human Action | Status in Phase 6 |
|---|-------------|-------------------|
| 1 | End-to-end learner test: one person completes Module 0 in under 30 minutes | CARRY FORWARD — SC#7 deferred from Phase 5 covers this |
| 2 | ILL-01 illustration authoring (3 SVGs: m00-three-paths, m00-calm-studio-mock, m00-architecture-as-prompt) | USER DECISION: defer further or author now |

### From Phase 2 (02-VERIFICATION.md) — status: human_needed

| # | Human Action | Status in Phase 6 |
|---|-------------|-------------------|
| 1 | Read all 5 Module 1 chapters in sequence and confirm persuasion arc lands | CARRY FORWARD — quality review task |
| 2 | Render Module 1 Marp slide deck to PDF, confirm exit 0 | SHOULD BE DONE — can be verified by Claude in Phase 6 |
| 3 | ILL-02 illustration authoring (8 SVGs: m01-*) | USER DECISION |

### From Phase 3 (03-VERIFICATION.md) — status: human_needed

| # | Human Action | Status in Phase 6 |
|---|-------------|-------------------|
| 1 | Lab 2 CALM Studio visualization (Step 7 — open browser, import, confirm 6 nodes render) | CARRY FORWARD — requires human with browser |
| 2 | Illustration stub adequacy check for m02-* Excalidraw specs | INFO — if deferring illustration authoring, this is moot |
| 3 | Slide deck speaker note accuracy (Module 2 chapters vs slide notes) | CARRY FORWARD — quality review |
| 4 | Lab 2 starter file pedagogical adequacy | CARRY FORWARD — UX judgment |

### From Phase 4 (04-VERIFICATION.md) — status: human_needed

| # | Human Action | Status in Phase 6 |
|---|-------------|-------------------|
| 1 | Lab 3 end-to-end execution (fork starter, push to GitHub Actions, observe pass + fail) | CARRY FORWARD — requires GitHub account + runner |
| 2 | Module 3 Marp slide deck visual rendering | CARRY FORWARD |
| 3 | Quiz auto-grade experience on live site (18 questions, confirm correct/incorrect scoring) | CLOSEABLE in Phase 6 — site is live |

### From Phase 5 (05-VERIFICATION.md) — deferred to Phase 6 explicitly

| # | Human Action | Status |
|---|-------------|--------|
| 1 | SC#7: 10 internal beta testers complete Modules 0–1 | ACTIVE — Phase 5 deferred to Phase 6; no evidence of recruitment yet |

---

## Broken Link Inventory

All links verified broken on the deployed site at `https://gjs-opsflo.github.io/calm-academy/`.

### Quiz links that 404 (20 chapters, 62 total occurrences)

Pattern: `[text](../../quizzes/module-NN-slug.yaml)` — generates path `/calm-academy/quizzes/module-NN-slug.yaml`

**Affected files:**
- `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` (line 133)
- `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` (line 329)
- `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` (line 211)
- `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` (line 115)
- All 5 Module 1 chapters (architecture-debt-crisis.mdx, governance-frameworks-and-aac.mdx via Further Reading, introducing-calm.mdx, lessons-from-adjacent-disciplines.mdx, what-architecture-as-code-enables.mdx)
- Module 2: calm-specification.mdx (line 147), controls.mdx (line 298), decorators.mdx (line 181), interfaces.mdx (line 279), nodes.mdx (line 331), relationships.mdx (line 359)
- Module 3: calm-hub-architecture-registry.mdx (line 309), calm-server-validation-service.mdx (line 178), calm-studio-visual-design.mdx (line 178), cli-toolbox.mdx (line 308), patterns-and-standards.mdx (line 324), vscode-extension.mdx (line 139)

Note: `vscode-extension.mdx` quiz link was flagged in the research prompt as broken — confirmed above. Same pattern as all others.

**Recommended fix (simplest):** Remove the broken links from all 20 chapters. Each module's final chapter already has the embedded interactive quiz via `<Quiz />` component. The "Take the quiz" links in non-final chapters are redundant navigation.

### Lab links that 404 (7 chapters, 10 occurrences)

Pattern: `[Lab N: text](../../labs/lab-NN-slug/LAB.md)` — generates path `/calm-academy/labs/lab-NN-slug/LAB.md`

**Affected files (with lines):**
- `module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` (line 137) — Lab 0
- `module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` (line 333) — Lab 0
- `module-00-on-ramp/three-paths-to-first-calm-doc.mdx` (line 215) — Lab 0
- `module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` (line 119) — Lab 0
- `module-00-on-ramp/your-first-calm-document.mdx` (line 149) — Lab 0
- `module-02-calm-fundamentals/building-your-first-architecture.mdx` (lines 437, 456) — Lab 2
- `module-03-calm-ecosystem/cicd-integration.mdx` (lines 252, 274) — Lab 3

**Recommended fix:** Replace with GitHub repo raw links pointing to the lab LAB.md files:
- Lab 0: `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-00-on-ramp/LAB.md`
- Lab 2: `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-02-conference-signup/LAB.md`
- Lab 3: `https://github.com/gjs-opsflo/calm-academy/blob/main/labs/lab-03-cicd-gate/LAB.md`

This is the cleanest fix — instructors using the site can navigate to the GitHub repo. Future work (Phase 10+) can serve labs from `site/static/`.

---

## Illustration Gap (Deferred Items)

All 34 SVG placeholder illustrations across Modules 0–3 are stub files with size 881–998 bytes (all below 1KB). They render as grey rectangles on the live site displaying text like "[Illustration placeholder: m00-three-paths]".

**This has been explicitly user-deferred across 4 consecutive phase verifications:**
- Phase 1 (01-VERIFICATION.md): "user has explicitly deferred illustration authoring"
- Phase 2 (02-VERIFICATION.md): "User explicitly deferred illustration authoring"
- Phase 3 (03-VERIFICATION.md): "explicitly accepted per success criteria #4"
- Phase 5 (05-VERIFICATION.md): accepted override "Real illustration authoring is tracked as a future Phase 6 task"

**Phase 6 decision point:** The user must decide:
1. **Author now** — open each `.excalidraw` stub in Excalidraw, draw the diagram per the embedded DIAGRAM SPEC, export as SVG. Each stub contains a full spec. Estimated effort: 1–2 hours per illustration x 34 = 34–68 hours of Excalidraw work.
2. **Defer further** — accept placeholder stubs as the site state for the FINOS pitch. The content is readable without illustrations; illustrations are enhancement not prerequisite.
3. **Partial** — author 3 Module 0 illustrations (the most visible, highest-impact module as the pitch hook) and defer the remaining 31.

**No agent can perform Excalidraw authoring.** This is a human-only task per CLAUDE.md. The Excalidraw stubs have `.excalidraw` source files at `illustrations/source/m00-*.excalidraw` through `m03-*.excalidraw`. After authoring, run:
```bash
bash scripts/export-excalidraw.sh <name>
```
Then verify SVG size > 1KB.

---

## Pattern Map

Mapping each Phase 6 task to the closest existing file/pattern in the repo:

| Phase 6 Task | Closest Existing Pattern | Location |
|-------------|--------------------------|----------|
| Update REQUIREMENTS.md traceability | REQUIREMENTS.md traceability table (existing format) | `.planning/REQUIREMENTS.md` lines 142–175 |
| Fix CI (add architecture.json validation) | `validate-calm-examples` job (existing) | `.github/workflows/ci.yml` lines 22–36 |
| Fix quiz links (remove 62 broken .yaml links) | "Knowledge check" section in STYLE-GUIDE.md | `docs-meta/STYLE-GUIDE.md` — STYLE-GUIDE shows the section template with quiz link pattern |
| Fix lab links (replace with GitHub URLs) | Lab section format in STYLE-GUIDE.md | `docs-meta/STYLE-GUIDE.md` — existing `## Lab` section pattern |
| Create glossary | `docs-meta/cheatsheets/module-02-cheatsheet.md` (table format) | `docs-meta/cheatsheets/module-02-cheatsheet.md` |
| Add to Docusaurus sidebar | `content/_category_.json` (existing pattern) | `content/module-*/​_category_.json` |
| Update PROPOSAL.md | PROPOSAL.md header block (lines 1–7) | `PROPOSAL.md` |
| Accessibility audit | `site/src/components/Quiz.test.tsx` (existing test format) | `site/src/components/Quiz.test.tsx` |
| Phase sign-off | `05-VERIFICATION.md` (existing verification format) | `.planning/phases/05-site-launch-prep/05-VERIFICATION.md` |

---

## Phase 6 Task Inventory (Derived from Research)

Ordered by urgency:

**Wave 1 — CI + Traceability (automated, fast)**
1. Update `.planning/REQUIREMENTS.md` traceability table: mark 14 requirements as Complete/Partial
2. Fix CI: add `bash scripts/validate-calm.sh` step to `validate-calm-examples` job (covers 6 `*.architecture.json` files)

**Wave 2 — Broken links (20 chapters + 7 chapters)**
3. Remove 62 broken quiz `.yaml` links from 20 non-final chapters (keep the `<Quiz />` component in final chapters)
4. Replace 10 broken lab links with GitHub repo URLs in 7 chapters

**Wave 3 — Glossary**
5. Create `docs-meta/GLOSSARY.md` with ~20 ecosystem terms (AaC, CALM 1.2, AIGF, ARB, CALM Guard, CALM Hub, CALM Studio, CCC, decorators, Gemara, GRIS, NIST AI RMF, node types, pattern, SAIF, CALM Server, calmstudio-mcp, controls, interfaces, relationships)
6. Optionally: create `content/glossary.mdx` as a Docusaurus page with `sidebar_position` for learner-facing access

**Wave 4 — Polish**
7. Update PROPOSAL.md: add live site URL, add "Current Status" section
8. Accessibility spot check: run `npx axe-cli` on two module pages; fix any `critical` or `serious` violations

**Wave 5 — Human sign-off**
9. User decision on illustration authoring (author, defer further, or partial)
10. Final learner test (SC#7): one person completes Module 0 end-to-end using the live site
11. Confirm quiz auto-grading UX on live site (from Phase 4 carry-forward)
12. Update REQUIREMENTS.md with final status

---

## Open Questions (RESOLVED — see CONTEXT.md decisions D1, D2, D8)

1. **Illustrations decision** — RESOLVED: D1
   - What we know: 34 placeholder SVGs; user has deferred 4 times; each requires 1–2 hours Excalidraw work
   - What's unclear: Is the FINOS pitch acceptable with grey placeholder boxes, or do at least the Module 0 illustrations (the hook) need to be real?
   - Recommendation: Author the 3 Module 0 illustrations before the pitch (these are in the most-seen module) and defer the remaining 31
   - **RESOLVED (D1):** Author the 3 Module 0 SVGs (m00-three-paths, m00-calm-studio-mock, m00-architecture-as-prompt) before milestone close. Remaining 31 deferred to Milestone 2.

2. **Quiz link fix strategy** — RESOLVED: D2
   - What we know: 74 links 404; 20 chapters affected; removing links is simplest
   - What's unclear: Do learners following non-final chapters expect a quiz link, or is the final-chapter quiz sufficient?
   - Recommendation: Remove broken links, replace with text "Complete the module quiz in the final chapter of each module"
   - **RESOLVED (D2):** Remove all broken quiz YAML links from non-final chapters. Replace with prose redirect to final chapter.

3. **Lab link fix strategy** — RESOLVED: D2
   - What we know: 10 links 404; 7 chapters affected; GitHub URL replacement is clean
   - What's unclear: Does the user want to serve labs from the site (more work) or link to GitHub (simpler)?
   - Recommendation: GitHub URL links — lower effort, gets the pitch done
   - **RESOLVED (D2):** Serve labs from site via `site/static/labs` symlink (same pattern as `site/static/img`). Replace relative lab links with symlink-based paths.

4. **SC#7 beta testing** — RESOLVED: D8
   - What we know: No recruitment or feedback collection has happened; Phase 5 deferred to Phase 6
   - What's unclear: Is SC#7 a hard gate for milestone close, or can it be waived for FINOS pitch?
   - Recommendation: Treat as a post-pitch activity; do a single internal end-to-end test (the learner test from Phase 1) as a minimum bar
   - **RESOLVED (D8):** 1 internal tester completing Module 0 end-to-end on live site is the minimum bar for Milestone 1 close. Full 10-tester cohort deferred to Milestone 2.

---

## Sources

### Primary (HIGH confidence — direct file inspection)
- `/.../REQUIREMENTS.md` — read directly; all 21 requirements and traceability table
- `/.../01-VERIFICATION.md` through `05-VERIFICATION.md` — read directly; human_needed items and verified artifact state
- `/.../content/module-*/​*.mdx` — grep/rg for cross-references, quiz links, lab links
- `/.../illustrations/exported/*.svg` — size-checked (all 34 files); confirmed placeholder stubs
- `/.../code-examples/**/*.{calm.json,architecture.json}` — enumerated; 10 total files
- `/.../​.github/workflows/ci.yml` — read directly; validate-calm-examples job covers only `*.calm.json`
- `/.../scripts/validate-calm.sh` — read directly; covers only `*.architecture.json`
- `/.../PROPOSAL.md` — read directly; header block and appendix; no live site URL
- `/.../slides/module-01-case-for-aac.md` — confirmed present; 26 slides (SLIDE-01 complete)
- `/.../site/src/components/Quiz.tsx` — checked ARIA attributes
- `/.../site/docusaurus.config.js` — confirmed live site URL `https://gjs-opsflo.github.io/calm-academy/`

### Secondary (MEDIUM confidence — verified by cross-referencing two sources)
- SLIDE-01 status: file exists + 02-VERIFICATION.md confirms execution; REQUIREMENTS.md traceability says "Pending" — this is a traceability document error, not a missing artifact
- Lab links 404 finding: contradicts the 05-VERIFICATION.md override ("no actual lab links found") — rg search above found 10 lab links in 7 files; the Phase 5 verifier used a different pattern that didn't match

---

## Metadata

**Confidence breakdown:**
- Requirements coverage table: HIGH — direct file inspection + cross-reference with verification reports
- Critical findings (CI gap, broken links): HIGH — grep evidence, CI file read
- Cross-reference audit: HIGH — rg searches with exact counts
- Glossary gap: HIGH — verified no glossary exists; term frequency from rg
- Accessibility scope: MEDIUM — Quiz.tsx ARIA attributes verified; full WCAG test not run
- PROPOSAL.md: HIGH — file read directly; no live URL present

**Research date:** 2026-06-18
**Valid until:** Indefinite (all findings are repo-state facts, not ecosystem knowledge that expires)

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Docusaurus Classic theme passes WCAG 2.1 AA text contrast without custom theming | Accessibility Scope | If wrong, site fails WCAG 2.1 AA on color contrast — needs theme color audit |
| A2 | `axe-cli` from Deque Systems is the `axe-cli` npm package | Accessibility Scope | Slopcheck not run; package may not exist under that name |
| A3 | 76 in-prose "Chapter N.N" references are not hyperlinks and do not violate the success criterion | Cross-Reference Audit | If success criterion is interpreted as "no chapter number references of any kind," 16 files need edits |

**All other findings in this document are VERIFIED by direct tool output or file inspection.**
