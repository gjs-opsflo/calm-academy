# CALM Academy — Project Context for Claude

> **Read this first.** Then `CURRICULUM.md` (canonical course design) and `ROADMAP.md` (delivery plan).

## What this repository is

CALM Academy is a comprehensive course on **Architecture as Code (AaC)** built on FINOS CALM 1.2. Positioned as the proposed official FINOS educational program — analogous to what HashiCorp's Terraform Associate is for IaC, or what CKA is for Kubernetes.

This repo produces:
- Text lessons (Markdown/MDX) — canonical source
- Excalidraw illustrations — visual support
- Slide decks — derived from text + illustrations
- Video lessons — derived from text + slides (later phase)
- Interactive labs — Docker Compose locally, Learnforge integration planned
- YAML quizzes — auto-graded knowledge checks
- Capstone projects — multi-scenario real-world deliverables

## Strategic positioning

| Aspect | Position |
|---|---|
| **Target adopter** | FINOS / Linux Foundation Training (LF EdX) |
| **Domain hook** | Financial Services Industry (FSI) — DTCC, major banks, custodians |
| **Differentiator** | Only course teaching the full FINOS + OpenSSF AI governance stack end-to-end |
| **Tagline** | *"Terraform transformed infrastructure. CALM transforms architecture."* |
| **Audience** | Architects, platform engineers, security architects, AI/ML engineers, RegTech |

## Curriculum at a glance

7 modules, ~20 hours, 3 certification levels (Associate / Practitioner / Architect):

```
M0: 15-min on-ramp (zero spec knowledge → first CALM doc via AI)
M1: Why AaC matters (IaC lessons, Gemara, AIGF, governance landscape)
M2: CALM language (nodes, relationships, interfaces, controls, decorators)
M3: CALM ecosystem (CLI, Studio, Hub, Server, VSCode, patterns, CI/CD)
M4: Governance & compliance (Gemara layers, CALM Guard, threat models)
M5: AI-native architecture (ai:* types, ARB, AIGF, SAIF, spec-driven dev)
M6: Enterprise adoption + Capstone (3 scenarios — A, B, C)
```

**Capstones:**
- **A**: Generic FSI monolith → multi-agent migration
- **B**: Autonomous Wealth Management (MiFID II, AIGF, full 8-layer ARB)
- **C**: AI Credit Risk Scoring (SR 11-7, ECOA, model governance)

Full detail: [`CURRICULUM.md`](CURRICULUM.md).

## Ecosystem context — critical to internalize

The course teaches CALM as **connective tissue across these ecosystems:**

| Project | Relationship |
|---|---|
| **FINOS CALM** | The spec we teach (1.2) |
| **FINOS CCC** (Common Controls Catalog) | The Layer 2 control catalog used throughout |
| **FINOS AIGF** (AI Governance Framework) | Auto-attaching decorator for `ai:*` architectures |
| **FINOS ARB** (Architectural Reference Board) | Source of reference architectures (e.g. Multi-Agent ARB) — converted to CALM patterns |
| **FINOS GRIS** (Generative Regulatory Intelligence System) | Produces regulatory mappings → CALM controls |
| **FINOS FluxNova** | Event-driven architecture framework — modeled in CALM as interfaces |
| **CALM Hub** | Versioned registry of CALM artifacts (the "npm registry" for architectures) |
| **CALM Studio** | Visual canvas + bidirectional sync |
| **CALM Guard** | AI-driven compliance automation (6-agent squad) |
| **calmstudio-mcp** | MCP server enabling AI-driven architecture creation |
| **OpenSSF Gemara** | 7-layer GRC Engineering Model — CALM is its Layer 4 (Sensitive Activities) and the machine-optimized schema Gemara explicitly calls for |
| **OpenSSF OSPS Baseline** | Supply-chain security controls (Gemara Layer 2) |
| **Google SAIF** | Secure AI Framework — mapped to CALM `ai:*` node types and decorators |
| **NIST AI RMF** | Risk framework — mappable to CALM controls |
| **MITRE ATT&CK** | Threat vectors (Gemara Layer 1) — referenced by CALM threat decorators |

**The big-picture story for the course:**

```
ARB (reference architectures)
  → CALM (machine-optimized schema; Gemara Layer 4)
  → AIGF auto-attaches (governance overlay)
  → GRIS maps regulations → CALM controls (Gemara Layers 1–3)
  → CALM Hub (versioned registry)
  → CALM Guard validates (Gemara Layers 5–7)
  → Evidence package exported (audit-ready)
```

## Production workflow — read carefully

**Text-first. Everything else derives.**

```
1. Author text lesson (Markdown)
       ↓
2. Create/select illustrations (Excalidraw, black & white house style)
       ↓
3. Generate slide deck from text + illustrations
       ↓
4. Record video using slides + text as script
       ↓
5. Publish: text on Docusaurus site, video on platform, slides in repo
```

**Why text-first:**
- Text reviewed and corrected before expensive video production
- Translation: translate text once, narrate per language
- Updates: edit text + re-narrate changed section only
- Site launches with text-only on day one; videos roll out later
- Workshop instructors use text as their teaching script

**Two valid video variants:**
- **A**: talking-head + slides (demos, instructor presence)
- **B**: narrated voice-over + animated illustrations (concept-heavy, stable, translatable)

## Authoring standards

### Text lessons
- Live under `content/module-NN-<slug>/<chapter>.mdx`
- Required structure: TL;DR (3-5 bullets) → Why it matters → Concept (1500-3000 words) → Inline diagrams → Code examples → Common mistakes → Knowledge check link → Lab link → Further reading
- Plain English, FSI-aware but not FSI-only
- All code snippets must work copy-paste (no `...` truncation)
- Every CALM JSON example is a real validated artifact in `code-examples/` referenced by relative path
- Cross-reference other lessons by permalink slug, not chapter number

### Illustrations
- Excalidraw, **black and white only** (house style — user has agentic skill for this)
- Source: `illustrations/source/<topic>.excalidraw`
- Exported SVG: `illustrations/exported/<topic>.svg`
- File naming: kebab-case, descriptive (e.g. `gemara-layers-overview.excalidraw`)
- Inline in text via standard Markdown image syntax
- Reused across slides + videos (single source of truth)

### Labs
- Live under `labs/lab-NN-<slug>/`
- Each lab: `LAB.md` + `starter/` + `solution/` + (optional) `docker-compose.yml`
- LAB.md uses YAML frontmatter (Learnforge-compatible format — see `docs-meta/LAB-FORMAT.md`)
- Step check kinds: `command_regex`, `exit_code`, `file_state`, `ai_judge`
- Cumulative-within-module workspace (matches Learnforge convention)
- Must be runnable end-to-end without external dependencies (Docker for any state)

### Code examples
- Live under `code-examples/`
- Every `.architecture.json` file validates with `calm validate` — enforced by CI
- Every example is referenced by at least one text lesson

### Quizzes
- Live under `quizzes/module-NN-<slug>.yaml`
- YAML schema documented in `docs-meta/QUIZ-FORMAT.md`
- Auto-graded, multiple choice + short answer
- Wrong answers reference back to specific text lesson section anchors

### Slide decks
- Live under `slides/module-NN-<slug>.md` (Marp/Reveal.js format)
- Generated from text + illustrations — keep in sync via convention not enforcement
- One deck per module

## GSD harness usage

This project uses Get Shit Done discipline:
- `CURRICULUM.md` (root) — canonical curriculum (source of truth)
- `ROADMAP.md` (root) — phased delivery plan
- `PROPOSAL.md` (root) — FINOS / Linux Foundation adoption proposal
- `.planning/research/` — research outputs (Gemara analysis, FINOS ecosystem, repo audits)
- `.planning/intel/` — codebase intelligence (FINOS architecture-as-code repo structure, etc.)
- `.planning/phases/` — per-phase planning artifacts

Each module = one GSD phase. Sub-deliverables (text lessons, labs, illustrations, quizzes) are tasks within the phase.

Use:
- `/gsd:new-project` to bootstrap roadmap (already done — see `ROADMAP.md`)
- `/gsd:plan-phase` per module
- `/gsd:execute-plan` for content production
- `/gsd:verify-phase` for module completion

## Claude Code vs Cowork — agent split

| Task type | Agent | Reason |
|---|---|---|
| Text lesson authoring | **Code** | File-heavy iterative editing, validation against CALM examples |
| CALM JSON code examples | **Code** | Uses calmstudio-mcp directly, validates as it goes |
| Lab content + Docker compose | **Code** | Tests commands locally as it documents |
| Bulk module drafting | **Cowork** | Long parallel sessions |
| Research expansion | **Cowork** | Web research, async |
| Excalidraw illustrations | **User (manual)** + Code for export scripts | Interactive authoring |
| GSD phase orchestration | **Code** | GSD harness lives in Code |
| Capstone narrative | **Cowork** | Long-form |
| Quiz authoring | **Either** | Batch (Cowork) or iterative (Code) |

## Toolchain decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Site framework | **Docusaurus** | Matches calm.finos.org; FINOS-ready |
| Illustrations | **Excalidraw** (black & white only) | User has agentic skill |
| Labs | **Docker Compose** local; **Learnforge** integration later | Lowest friction now, scales later |
| Quizzes | **YAML + custom MDX component** | No vendor lock-in |
| Hosting | **GitHub Pages** initially | Publisher decides post-MVP |
| Languages | **English** at launch; text-first design enables translation pipeline |
| License (target) | Apache 2.0 (code) + CC BY-SA 4.0 (content) — TBD by FINOS |

## Conventions

### Commit messages
Conventional Commits (FINOS standard):
```
feat(module-04): add Gemara layer chapter
fix(lab-05): correct docker compose port mapping
docs(curriculum): update capstone B threat model
chore(deps): bump docusaurus to 3.x
```

Scopes: `module-NN`, `lab-NN`, `curriculum`, `roadmap`, `site`, `scripts`, `ci`, `deps`, `meta`.

**No DCO sign-off required yet** (private repo). When FINOS-transferred, DCO becomes mandatory.

**No Co-Authored-By** until license clarified (FINOS EasyCLA may prohibit, as in `architecture-as-code` repo).

### Branching
- `main` is the canonical branch
- Feature branches: `feat/module-NN-<slug>`, `fix/<scope>`, `docs/<scope>`
- PR template enforces: linked GSD task, lab tests pass, CALM JSON validates

### File naming
- All Markdown: kebab-case (`why-it-matters.mdx`, not `WhyItMatters.mdx`)
- CALM JSON: `<system-slug>.architecture.json` (e.g. `wealth-management.architecture.json`) — canonical FINOS convention per `architecture-as-code` repo
- Excalidraw: kebab-case (`gemara-7-layers.excalidraw`)

## Critical reminders for any agent session

1. **CALM is the spec. No invented node types.** `container` and `component` DO NOT EXIST. Use the 9 core + 15 `ai:*` types only. See FINOS architecture-as-code repo at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code` for canonical spec.

2. **Text-first.** Never produce video script before text lesson exists. Never produce slides before illustrations exist.

3. **calmstudio-mcp** is available globally — use it to create/validate CALM JSON for code examples (see `architecture-as-code` repo for MCP config).

4. **The `calm-arb-convert` skill** in `~/.claude/skills/` enforces correct ARB→CALM workflow — use it when converting any markdown architecture doc to CALM.

5. **Gemara is the conceptual spine of Module 4** — internalize the 7-layer model before writing any Module 4 content. Source: `.planning/research/gemara-analysis.md`.

6. **Memory notes from `~/.claude/projects/.../memory/MEMORY.md`** still apply (gjs-opsflo account, no Co-Authored-By, conventional commits).

## Where to find things

| Need | Location |
|---|---|
| Canonical curriculum | `CURRICULUM.md` (root) |
| Project roadmap | `ROADMAP.md` (root) |
| FINOS proposal | `PROPOSAL.md` (root) |
| Gemara research | `.planning/research/gemara-analysis.md` |
| FINOS ecosystem research | `.planning/research/finos-ecosystem.md` |
| FINOS aac repo intel | `.planning/intel/finos-aac-ecosystem.md` |
| Production workflow detail | `docs-meta/PRODUCTION-WORKFLOW.md` |
| Authoring style guide | `docs-meta/STYLE-GUIDE.md` |
| Lab format spec | `docs-meta/LAB-FORMAT.md` |
| Quiz format spec | `docs-meta/QUIZ-FORMAT.md` |
| Illustration standards | `docs-meta/ILLUSTRATION-STANDARDS.md` |

## When in doubt

The mission: ship a course FINOS would be proud to brand. Every decision should serve that mission. If uncertain, optimize for:
1. FINOS adoption-readiness (governance, standards alignment, FSI relevance)
2. Learner outcome (can they actually do the thing after the lesson?)
3. Production scalability (text-first, derivable assets)
4. Ecosystem coherence (CALM + Gemara + AIGF + SAIF + FINOS CCC + ARB story unified)
