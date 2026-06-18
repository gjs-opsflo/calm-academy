# Phase 6: Polish + Milestone Close — Context

**Gathered:** 2026-06-18
**Status:** Ready for planning
**Source:** Research (06-RESEARCH.md) + user decisions captured 2026-06-18

---

## Phase Boundary

Phase 6 is the final quality gate before the FINOS pitch. No new content is authored. Work is entirely:
- Fix broken things (broken links, CI gap, stale traceability)
- Complete deferred items (glossary, PROPOSAL.md update)
- Author 3 Module 0 illustrations (user action, `autonomous: false`)
- Verify one end-to-end learner test
- Sign off milestone

**In scope:** Items listed below in locked decisions.
**Out of scope:** New module content, Lab 0/1/2 authoring (marked as Phase 2/3 items), full beta cohort (10 testers), video production, Algolia DocSearch, custom domain, FINOS transfer.

---

## Locked Decisions

### D1 — Illustration authoring: Author Module 0's 3 core SVGs

User decision (2026-06-18): author the 3 Module 0 illustrations before milestone close. These are the highest-impact illustrations for the FINOS demo (shown in chapters 0.1 and 0.2). All other module illustrations (Modules 1–3) remain as placeholder stubs for Milestone 2.

The 3 target illustrations:
- `m00-three-paths.svg` — Three paths to first CALM doc (referenced in chapter 0.1)
- `m00-calm-studio-mock.svg` — CALM Studio UI mock (referenced in chapter 0.2)
- `m00-architecture-as-prompt.svg` — Architecture as the prompt concept (referenced in chapter 0.2)

Implementation: user must author these in Excalidraw (B&W house style) and export as SVG. The SVG must be > 1KB (not a placeholder stub). This is an `autonomous: false` task — a human checkpoint with the user's Excalidraw skill.

### D2 — Broken links: Serve labs from site/static/labs/

User decision (2026-06-18): symlink `labs/` into `site/static/labs/` so lab files are served from the Docusaurus site at `/calm-academy/labs/...`. This keeps learners on the site and makes lab file links work.

Implementation:
- `site/static/labs` → symlink → `../../labs/` (analogous to `site/static/img` → `../../illustrations/exported/`)
- Verify git-tracked symlink (mode 120000)
- Test: `curl -fsS -o /dev/null -w "%{http_code}" https://gjs-opsflo.github.io/calm-academy/labs/lab-00-on-ramp/LAB.md` → 200 after deploy

Quiz YAML links (62 occurrences in lesson chapters) should be removed — the embedded `<Quiz />` component already serves this content interactively. Raw YAML links add no learner value.

### D3 — CI CODE-01 gap: Add .architecture.json to validate glob

6 legacy `.architecture.json` files in `code-examples/` (1 in module-00, 5 in module-02) are validated by `scripts/validate-calm.sh` locally but NOT by the `ci.yml` validate step (which only globs `*.calm.json`). Fix: extend the CI glob to include `*.architecture.json` as well, or update `scripts/validate-calm.sh` to be called from CI.

### D4 — REQUIREMENTS.md traceability: Update all 21 requirements

14 of 21 v1 requirements still show `[ ]` (Pending) in REQUIREMENTS.md despite being delivered in Phases 1–4. Phase 6 must audit each requirement against the shipped codebase and mark them `[x]` (or `[ ]` with a note if genuinely incomplete). This is a documentation task, not a code task.

Key items to audit:
- MOD-01 through MOD-04: all 4 modules authored (24 MDX files exist)
- LAB-01, LAB-02: check `labs/lab-00-on-ramp/`, `labs/lab-02-*/`
- QUIZ-01 through QUIZ-04: 4 YAML files in `quizzes/`
- ILL-01 through ILL-04: SVG counts per module (stubs count toward ILL-03/04 per deviation acceptance)
- SLIDE-01 through SLIDE-03: all 3 deck files exist in `slides/`
- CODE-01: depends on D3 fix above
- CODE-02: Module 2 cheatsheet — check if it exists; if not, create minimal version
- SITE-01: confirmed complete in Phase 5 VERIFICATION

### D5 — Glossary: Create docs-meta/GLOSSARY.md

No glossary exists anywhere in the repo. The site teaches ~20 ecosystem terms used across all modules without single-source definitions. Create `docs-meta/GLOSSARY.md` with definitions for the core CALM + Gemara + FINOS ecosystem terms.

Required terms (minimum): CALM, node types (service, database, network, etc.), relationship, interface, control, decorator, Gemara (7-layer model), AIGF, SAIF, ARB, FINOS CCC, CALM Hub, CALM Studio, CALM Guard, GRIS, Architecture as Code.

Format: alphabetical, each term gets: 1-line definition, `*Example usage:*` sentence, link to the most relevant lesson chapter.

This is NOT added to the Docusaurus sidebar (it's a docs-meta reference file, not a content chapter). It can be linked from CLAUDE.md and CURRICULUM.md as a writing reference.

### D6 — PROPOSAL.md: Add live site URL and update status

PROPOSAL.md currently has no live URL reference. It needs:
- Live URL: `https://gjs-opsflo.github.io/calm-academy/`
- Status: "Live demo available at [URL]"
- Any other stale content updated to match current state

Check current PROPOSAL.md against current reality before editing.

### D7 — Accessibility spot check: axe-core on Module 0 + Module 2

Scope: WCAG 2.1 AA spot check on two pages of the live site:
- `https://gjs-opsflo.github.io/calm-academy/docs/module-00-on-ramp/three-paths-to-first-calm-doc`
- `https://gjs-opsflo.github.io/calm-academy/docs/module-02-calm-fundamentals/nodes`

Tool: `npx axe-cli` (CLI runner for axe-core). Violations classified:
- Critical/Serious: fix before milestone close
- Moderate/Minor: document and defer to Milestone 2

The Quiz component already has ARIA attributes from Phase 3 (`role="status"`, `role="alert"`, fieldset/legend). Images currently have placeholder SVGs — alt text comes from MDX image syntax. Focus on page structure, color contrast, and keyboard navigation.

### D8 — Beta bar: 1 internal tester, human checkpoint

User decision (2026-06-18): one end-to-end learner test (not the author) is sufficient for Milestone 1 close. The tester completes Module 0 → Module 1 using the live site only. Feedback items:
- Critical (broken functionality, wrong content): fix before close
- Non-critical (wording, pacing, style): track as Milestone 2

This is an `autonomous: false` human checkpoint task.

### D9 — Cross-reference audit: fix chapter-number refs in content

Current state (from research): 2 occurrences of chapter-number cross-references found in `content/module-01-case-for-aac/` files. All others use slugs. Fix the 2 occurrences to use `/docs/<slug>` permalink format per STYLE-GUIDE.md.

Also fix the quiz YAML link in `content/module-03-calm-ecosystem/vscode-extension.mdx` that causes an `onBrokenLinks: warn` warning at build time.

---

## Deferred (Out of Scope for Phase 6)

- Modules 1–3 illustration authoring (34 placeholder SVGs — Milestone 2)
- Full 10-tester beta cohort
- Algolia DocSearch (apply after deploy — deferred in Phase 5)
- Custom domain (post-FINOS transfer)
- Video production
- FINOS repo transfer
- Lab 0 end-to-end Docker test on fresh machine (not yet tracked as blocking)
- CODE-02 Module 2 cheatsheet — only if it doesn't already exist; if it exists, just verify

---

## Constraints

- No Co-Authored-By in commits (FINOS EasyCLA concern)
- No DCO sign-off (private repo)
- Conventional Commits: scope `site` for site changes, `ci` for workflow, `docs` for content/meta
- No new module content authored in Phase 6
- REQUIREMENTS.md updates are documentation only — never mark a requirement [x] without checking the artifact actually exists

---

*Phase: 06-polish-milestone-close*
*Context gathered: 2026-06-18*
