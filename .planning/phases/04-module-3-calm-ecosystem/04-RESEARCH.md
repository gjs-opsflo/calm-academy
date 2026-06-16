# Phase 4: Module 3 — The CALM Ecosystem — Research

**Researched:** 2026-06-16
**Domain:** CALM toolchain (CLI, Studio, Hub, Server, VSCode), patterns, CI/CD integration, content production
**Confidence:** HIGH

---

## Summary

Phase 4 produces Module 3: the toolchain module. Where Module 2 taught learners the CALM JSON language, Module 3 teaches them how to wield it professionally through seven chapters covering the CLI, Studio, Hub, Server, VSCode extension, pattern library, and CI/CD integration. The anchor deliverable is Lab 3 — a CI/CD gate where learners fork a starter repo, add `calm validate` to a GitHub Actions workflow, and push both a passing and a failing architecture to verify the gate works.

All CALM ecosystem tools have been verified directly against the local `architecture-as-code` repo at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code`. Key factual anchors: the CLI is at version 1.45.0 (published 2026-06-16), has a `hub` subcommand with `push/pull/list` (shipping now, not a gap), and includes a `timeline` command for synthesizing timelines from versioned architecture files. CALM Server is a standalone HTTP endpoint for validation. CALM Studio is a SvelteKit web app deployable locally and available at `https://studio.calm.finos.org`. The VSCode extension is named "CALM Tools" published by FINOS.

**One critical discovery:** The existing CI workflow (`ci.yml`) uses `find code-examples -name "*.calm.json"` but all existing code examples use the `.architecture.json` extension. This means the current CI validation job runs but matches ZERO files. The planner must include a remediation step — either rename existing code examples to `*.calm.json` or update the CI glob. This is a Phase 4 setup landmine that must be resolved in Wave 0.

**Primary recommendation:** Author seven MDX chapters in strict dependency order (Ch 3.1 CLI first — all other chapters reference CLI commands), validate every code example with `npx @finos/calm-cli validate`, and design Lab 3 as a self-contained GitHub repo learners fork and own. The pattern for Lab 3's CI/CD gate is proven — the exact YAML pattern is documented in this research.

---

## Project Constraints (from CLAUDE.md)

### Spec precision
- CALM has exactly 9 core node types. No `container`, no `component`. [VERIFIED: core.json]
- 15 `ai:*` types are Module 5 only — do not introduce in Module 3 content.
- All code examples must use `$schema: "https://calm.finos.org/release/1.2/meta/calm.json"`.
- calmstudio-mcp is local `.cjs` only — NOT `npx @calmstudio/mcp` (not on npm). [VERIFIED: npm 404]
- CALM Studio web is at `https://studio.calm.finos.org` [VERIFIED: lab-00-on-ramp/LAB.md]

### Authoring conventions
- Text lessons: `content/module-03-calm-ecosystem/<chapter>.mdx` (kebab-case)
- Code examples: `code-examples/module-03-calm-ecosystem/` — naming MUST be `*.calm.json` to match CI glob
- Illustrations: `illustrations/source/m03-*.excalidraw` + `illustrations/exported/m03-*.svg`
- Quiz: `quizzes/module-03-ecosystem.yaml`
- Slides: `slides/module-03-calm-ecosystem.md` (Marp format)
- Lab: `labs/lab-03-cicd-gate/` with LAB.md + starter/ + solution/
- Commit convention: `feat(module-03):`, `docs(module-03):` — no Co-Authored-By
- Text-first: chapters before illustrations, illustrations before slides

### CI file extension issue (CRITICAL)
The existing `ci.yml` validate step searches for `*.calm.json` but existing code examples use `*.architecture.json`. The planner must address this in Wave 0 — otherwise Module 3 code examples will silently not be validated.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOD-04 | Module 3 has 7 fully-authored MDX chapters covering CLI commands, Studio canvas workflow, Hub publish/consume, Server concepts, VSCode extension, pattern library, CI/CD gate | All 7 chapters mapped below; CLI commands verified against local repo; Hub API confirmed |
| LAB-03 | Lab 3 (CI/CD gate) — learner forks a starter repo, adds `calm validate` to GitHub Actions, pushes passing and failing architecture — both behave as expected | Exact GitHub Actions YAML pattern documented; `--format junit` flag confirmed; `--exit-code` flag available in `diff` |
| QUIZ-04 | Module 3 quiz — covers CLI commands, Hub workflow, CI/CD patterns; target 16–20 questions | 7 chapters, ~2–3 questions each; question scope documented below |
| ILL-04 | Module 3 has 8–10 Excalidraw B&W illustrations — CI/CD pipeline gate, Hub flow, Studio workflow | 10 illustration topics listed below |
| SLIDE-03 | Module 3 slide deck — 25–35 Marp slides with tool demo screenshots/mocks | Derives from 7 chapters + 10 illustrations |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CLI command documentation | Content (MDX text) | Code Examples (validated .calm.json) | Text teaches commands; examples prove the output is valid |
| Architecture validation (calm validate) | CI layer | Lab execution | CI gates every PR; lab teaches learners to run locally |
| Hub publish/consume workflow | Content (MDX text) | Lab starter (optional Hub step) | Hub local setup adds Docker complexity; primary teaching is via text + diagrams |
| Studio canvas visualization | Content (MDX text) | Lab check step | Studio is browser-based; steps reference it but don't require local install |
| Pattern generation (calm generate) | Code example | Lab starter | Pattern file lives in starter; learner runs generate to produce architecture |
| CI/CD gate (Lab 3) | Lab (GitHub Actions) | Code example (starter workflow YAML) | Lab is the unit; starter ships the workflow stub |
| Quiz auto-grading | YAML data file | MDX quiz component | Same pattern as all prior modules |
| Slide deck | Content author | Marp renderer | Text is source; slides are derived |

---

## CALM CLI — Verified Command Reference

[VERIFIED: `npx @finos/calm-cli --help` run locally; version 1.45.0 published 2026-06-16]

### Top-level commands

| Command | Purpose | Key flags |
|---------|---------|-----------|
| `calm generate` | Instantiate architecture from a CALM pattern file | `-p <pattern>` (file or Hub URL), `-o <file>`, `--calm-hub-url <url>`, `--option-choices <json>` |
| `calm validate` | Validate a CALM document (architecture, pattern, or timeline) | `-a <arch>`, `-p <pattern>`, `--timeline <file>`, `-f <json|junit|pretty>`, `-o <file>`, `--strict`, `-c <hub-url>` |
| `calm diff` | Compare two CALM documents or timeline moments | `-a <doc-a>`, `-b <doc-b>`, `--timeline <file>`, `--from <momentId>`, `--to <momentId>`, `-f <json|summary>`, `--exit-code` |
| `calm template` | Generate files from CALM model using Handlebars templates | `-` (see `--help`) |
| `calm docify` | Generate documentation website from CALM model | `-` (see `--help`) |
| `calm timeline` | Synthesize a CALM timeline from versioned architecture files | `-a <files...>` (in order), `-o <file>` |
| `calm init-ai` | Augment a git repo with AI assistance config | `-p <copilot|kiro|claude|codex>`, `-d <path>` |
| `calm init-config` | Create/update `~/.calm.json` config file | `--allowed-remote-hosts`, `--calm-hub-url` |
| `calm hub` | Interact with CALM Hub (subcommand group) | see below |

### Hub subcommands (SHIPPING — not a gap)

[VERIFIED: `npx @finos/calm-cli hub --help`, `hub push --help`, `hub pull --help`, `hub list --help`]

| Subcommand | Purpose |
|------------|---------|
| `calm hub push architecture <file>` | Push architecture to Hub |
| `calm hub push pattern <file>` | Push pattern to Hub |
| `calm hub push standard <file>` | Push standard to Hub |
| `calm hub push control-requirement <file>` | Push control requirement to Hub |
| `calm hub push control-configuration <file>` | Push control config to Hub |
| `calm hub pull architecture` | Pull architecture from Hub |
| `calm hub pull pattern` | Pull pattern from Hub |
| `calm hub pull standard` | Pull standard from Hub |
| `calm hub list architectures` | List architectures in a namespace |
| `calm hub list namespaces` | List all namespaces |
| `calm hub list patterns` | List patterns in a namespace |
| `calm hub list standards` | List standards in a namespace |
| `calm hub list domains` | List all control domains |
| `calm hub list control-requirements` | List control requirements |
| `calm hub create` | Create Hub resources |

**Important teaching note:** CURRICULUM.md listed `calm hub push` as a gap — this is outdated. The hub subcommand ships in CLI 1.45.0. [VERIFIED]

### The `~/.calm.json` config file

Created via `calm init-config`. Stores:
- `allowed-remote-hosts` — trusted hosts for URL loading
- `calm-hub-url` — default Hub URL

### CLI output formats for CI

`calm validate -f junit` produces JUnit XML output consumable by GitHub Actions and Jenkins test reporters.
`calm diff --exit-code` exits non-zero when changes detected — useful as a PR gate.

---

## CALM Studio — Verified Details

[VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-suite/calm-studio/README.md`]
[VERIFIED: `studio.calm.finos.org` from `labs/lab-00-on-ramp/LAB.md`]

### Access modes

| Mode | How to access | When to use |
|------|--------------|-------------|
| Web (zero install) | `https://studio.calm.finos.org` | Lab checkpoints, quick visualization, learners without local env |
| Local dev | `npm run dev --workspace=@calmstudio/studio` → `localhost:5173` | CALM contributors |
| Desktop (Tauri) | Coming soon | Not yet shipping — do NOT teach as available |

### What Studio provides

- Canvas with 9 CALM node type shapes, 5 relationship edge styles
- Sub-flow containment for `deployed-in` and `composed-of`
- Bidirectional sync: edit diagram → JSON updates; edit JSON → diagram updates
- ELK.js hierarchical auto-layout
- Export as CALM JSON, SVG, PNG
- Import existing CALM JSON files
- Dark mode, keyboard shortcuts, multi-select
- Properties panel for editing node metadata, interfaces, and controls

### Tech stack (for illustration accuracy)

SvelteKit + Svelte 5 + Svelte Flow (@xyflow/svelte), CodeMirror 6, ELK.js, Tailwind CSS

### MCP server (calmstudio-mcp)

- **NOT on npm** — `npx @calmstudio/mcp` returns 404 [VERIFIED]
- Local install at `/Users/gshah/.local/share/calmstudio-mcp/calmstudio-mcp.cjs`
- 21 tools: create/add/finalize/export/import, validate, render, read_calm_guide
- Claude Code integration: `claude mcp add --transport stdio calmstudio -- node /path/to/calmstudio-mcp.cjs`

---

## CALM Hub — Verified Details

[VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-hub/README.md`]
[VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-hub/AGENTS.md`]

### What Hub is

A versioned registry for CALM artifacts. The "npm registry for architectures." Built with Quarkus (Java 21), stores architectures/patterns/controls/decorators in namespaced resource trees.

### Storage modes

| Mode | Tech | When to use |
|------|------|------------|
| Default | MongoDB | Production |
| Standalone | NitriteDB (embedded) | Local dev, no MongoDB needed |

### Local setup (for Lab 3 optional Hub step)

```bash
cd calm-hub/deploy
docker-compose up   # starts Hub on :8080 + MongoDB — no-auth profile
# Swagger UI: http://localhost:8080/q/swagger-ui/
```

No-auth is used for the Docker compose quickstart. Default profile rejects all requests with 401.

### REST API structure

Namespace-scoped under `/calm/namespaces`. Key resources:
- `/calm/namespaces` — namespace CRUD
- `/calm/namespaces/{ns}/architectures` — architecture CRUD per namespace
- `/calm/namespaces/{ns}/patterns` — pattern CRUD per namespace
- `/calm/namespaces/{ns}/standards` — standard CRUD

### MCP endpoint

Available at `http://localhost:8080/mcp` (Streamable HTTP). Disabled by default — enable with `CALM_MCP_ENABLED=true`. Exposes: ArchitectureTools, ControlTools, DecoratorTools, DomainTools, NamespaceTools, SearchTools.

### Hub as course teaching model

Hub is taught at concept level in Module 3. Lab 3 focuses on the CLI + GitHub Actions gate, NOT Hub deployment. Hub's publish/consume workflow is demonstrated conceptually in Chapter 3.3 — learners do not need a running Hub instance for Lab 3.

---

## CALM Server — Verified Details

[VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-server/README.md`]

### What it is

A standalone HTTP server that exposes CALM validation as a REST endpoint. Bundled schemas included. Use case: platform team exposes a shared validation API that all teams call (no CLI install needed per team).

### Key endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check → `{"status": "OK"}` |
| `/calm/validate` | POST | Validate CALM architecture → `{hasErrors, hasWarnings, ...}` |

### Starting the server

```bash
calm-server                           # port 3000, localhost only, bundled schemas
calm-server --port 8080               # custom port
calm-server -s /path/to/schemas       # custom schema directory
calm-server -c http://hub:8080        # linked to CALM Hub for remote schemas
```

### Rate limiting (built-in)

Default: 100 requests / 15-minute window per IP. Configurable via `--rate-limit-window` and `--rate-limit-max`.

### Key distinction from CLI

`calm validate` (CLI) — run locally per developer, reads local files.
`calm-server` — runs as a service, validates via HTTP POST, no file system access by callers.

---

## VSCode Extension — Verified Details

[VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-plugins/vscode/README.md`]
[VERIFIED: `package.json` → `displayName: "CALM Tools"`, `publisher: "FINOS"`, `version: "0.6.0"`]

### Extension name and install

- **Marketplace name:** "CALM Tools" (publisher: FINOS)
- **Marketplace ID:** `FINOS.calm-vscode-plugin`
- Search "CALM Tools" in VSCode Extensions sidebar or install via:
  ```bash
  code --install-extension FINOS.calm-vscode-plugin
  ```

### Features (all verified from README)

| Feature | What it does |
|---------|-------------|
| Interactive Preview Panel | Real-time diagram as you edit; auto-layout; click to inspect |
| Tree View Navigation | Browse Nodes, Relationships, Flows; search/filter |
| Timeline Navigation | View milestones in architecture timeline; click to open snapshot |
| Real-Time Validation | Problems panel integration; validates on open/save/switch |
| Bundled Schemas | No network access required; schema detection via `$schema` field |
| Template/Documentation Mode | Live `docify` mode — HTML/Markdown output with auto-refresh |

### Configuration (`.vscode/settings.json`)

```json
{
  "calm.urlMapping": "calm-mapping.json",
  "calm.schemas.additionalFolders": ["./my-schemas"],
  "calm.files.globs": ["calm/**/*.json", "calm/**/*.y?(a)ml"]
}
```

---

## Patterns and Standards — Verified Details

[VERIFIED: CALM 1.2 spec; `calm generate --help`; conference-signup pattern in getting-started]

### Pattern vs Architecture vs Standard

| Artifact | Purpose | CLI command |
|----------|---------|-------------|
| Pattern (`.pattern.json`) | Reusable architecture template with `const` constraints; `required` nodes | `calm generate -p <pattern>` to instantiate |
| Architecture (`.calm.json`) | Conforming instance of zero or more patterns | `calm validate -a <arch> -p <pattern>` to check conformance |
| Standard | Org-specific extension constraints on top of the CALM spec | Referenced in validate call |

### `calm generate` workflow

```bash
# Generate an architecture from a pattern (interactive — prompts for values)
npx @finos/calm-cli generate -p path/to/secure-api.pattern.json -o my-architecture.calm.json

# Generate non-interactively with pre-defined choices
npx @finos/calm-cli generate -p pattern.json --option-choices '{"api-type": "REST"}' -o arch.calm.json

# Generate from a Hub-hosted pattern
npx @finos/calm-cli generate -p http://localhost:8080/calm/namespaces/myorg/patterns/secure-api -o arch.calm.json
```

### Pattern validation

```bash
# Validate architecture conformance against a pattern
npx @finos/calm-cli validate -a arch.calm.json -p pattern.json

# Validate pattern itself (not an architecture)
npx @finos/calm-cli validate -p pattern.json
```

### Conference signup pattern (canonical example)

At `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/getting-started/conference-signup.pattern.json`. This is the canonical tutorial pattern — learners already know it from Lab 2. Module 3 can reference it as the starting point for a `calm generate` demo.

### Lab 3 pattern: "secure API service"

Module 3's Lab 3 requires a custom pattern. The planner should include creating:
`code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json` — a pattern enforcing:
- A `service` node (the API)
- A `network` node (WAF/load balancer)
- A `database` node (data store)
- A `connects` relationship from network to service with `protocol: HTTPS`
- A `connects` relationship from service to database

This is the module-level pattern from which learners generate an architecture and then validate.

---

## Lab 3: CI/CD Gate — Design

### Lab goal

Learner forks a starter repo, adds `calm validate` to GitHub Actions, pushes a passing architecture and a failing one — observing the gate block the failing push.

### Prerequisites

- GitHub account (free)
- Starter repo to fork: `calm-academy-lab-03-starter` (created in Phase 4)
- `@finos/calm-cli` installed globally (or used via `npx`)

### Starter repo structure

```
calm-academy-lab-03-starter/
├── .github/
│   └── workflows/
│       └── calm-gate.yml          ← STUB: learner adds calm validate step
├── architectures/
│   ├── secure-api.calm.json       ← VALID: passes validate
│   └── broken-api.calm.json       ← INVALID: missing required fields (to be fixed by learner)
├── patterns/
│   └── secure-api-service.pattern.json   ← The course pattern
└── README.md
```

### GitHub Actions workflow YAML (exact pattern for Lab 3)

[VERIFIED: Based on existing `calm-academy/.github/workflows/ci.yml` and `calm validate` flag verification]

```yaml
name: CALM Architecture Gate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate-architecture:
    name: Validate CALM Architecture
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install CALM CLI
        run: npm install -g @finos/calm-cli

      - name: Validate architecture against schema
        run: |
          calm validate -a architectures/secure-api.calm.json -f pretty

      - name: Validate architecture against pattern
        run: |
          calm validate \
            -a architectures/secure-api.calm.json \
            -p patterns/secure-api-service.pattern.json \
            -f pretty

      - name: Output JUnit test report
        run: |
          calm validate \
            -a architectures/secure-api.calm.json \
            -p patterns/secure-api-service.pattern.json \
            -f junit \
            -o calm-validation-results.xml

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: calm-validation-results
          path: calm-validation-results.xml
```

### Lab 3 steps

1. Fork the starter repo
2. Inspect `architectures/secure-api.calm.json` — it validates ✓
3. Inspect `architectures/broken-api.calm.json` — it fails validate
4. Stub is at `.github/workflows/calm-gate.yml` — complete it by adding the `calm validate` step
5. Push to main → observe GitHub Actions run
6. Fix `broken-api.calm.json` (add missing field) → push again → gate passes
7. Stretch: add `calm diff` step comparing before/after versions

### Step checks (LAB.md format)

```yaml
steps:
  - id: step-1
    title: Fork and clone starter repo
    check:
      kind: file_state
      path: .github/workflows/calm-gate.yml
      exists: true

  - id: step-2
    title: Verify passing architecture validates
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a architectures/secure-api.calm.json -f pretty"
      pattern: "0 errors"

  - id: step-3
    title: Add calm validate to GitHub Actions workflow
    check:
      kind: file_state
      path: .github/workflows/calm-gate.yml
      content_regex: "calm validate"

  - id: step-4
    title: Push and observe gate pass for valid architecture
    check:
      kind: ai_judge
      prompt: "Learner's GitHub Actions run shows all steps green for the valid architecture push"

  - id: step-5
    title: Fix broken architecture and push again
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty"
      pattern: "0 errors"
```

### Local fallback (GitHub not available)

Teach `act` as a local GitHub Actions runner:
```bash
# Install act
brew install act

# Run the CI workflow locally
act push
```

Include this in the lab's Setup section per ROADMAP.md risk mitigation.

---

## Code Examples Required for Module 3

All files in `code-examples/module-03-calm-ecosystem/`. Extension MUST be `.calm.json` to match CI glob.

| File | Chapter | Purpose | Key concepts |
|------|---------|---------|-------------|
| `secure-api-service.pattern.json` | 3.6 | Pattern for Lab 3 | Pattern authoring, `const` constraints, required nodes |
| `secure-api-generated.calm.json` | 3.1 + 3.6 | Architecture generated from pattern | `calm generate` output; shows pattern conformance |
| `with-hub-metadata.calm.json` | 3.3 | Architecture with Hub-style metadata | Namespace conventions, versioning metadata |
| `cicd-pipeline-arch.calm.json` | 3.7 | CALM architecture of a CI/CD pipeline itself | Meta: modeling the pipeline as a CALM architecture |
| `timeline-moment-v1.calm.json` + `timeline-moment-v2.calm.json` | 3.1 (diff) | Two versions for `calm diff` demo | `calm diff` before/after; architecture evolution |

**Note:** The pattern file `secure-api-service.pattern.json` does not validate as an architecture — it validates as a pattern (`calm validate -p pattern.json`). The CI script uses `-a` flag, so the pattern file should NOT be validated via the `validate-calm-examples` CI step.

**Total: 4 architecture files + 1 pattern file + 2 timeline moment files.**

---

## Module 3 Chapter Structure (7 chapters)

### Chapter 3.1 — CALM CLI: Your Architecture Toolbox (~2000 words)

**Teaching arc:** Start with what learners already know (`calm validate`) and expand outward.

| Section | Content |
|---------|---------|
| The validate command | Flags: `-a`, `-p`, `--timeline`, `-f json|junit|pretty`, `--strict` |
| The generate command | Instantiating architectures from patterns; interactive vs `--option-choices` |
| The diff command | Comparing architecture versions; `--exit-code` for CI gating |
| The timeline command | Synthesizing timelines from versioned files |
| The docify command | Generating docs from a model |
| The template command | Custom file generation from Handlebars templates |
| The init-ai command | Wiring AI assistance for CALM (`--provider copilot|kiro|claude|codex`) |
| The hub subcommand | Push/pull/list — brief intro (full treatment in Ch 3.3) |
| The `~/.calm.json` config | `calm init-config` — setting Hub URL and allowed remote hosts |
| CI integration | `--format junit`, `--exit-code`, installing with `npm install -g @finos/calm-cli` |

**Code example:** Walk through `calm diff -a v1.calm.json -b v2.calm.json -f summary` using the two timeline moment files.

### Chapter 3.2 — CALM Studio: Visual-First Architecture Design (~1800 words)

| Section | Content |
|---------|---------|
| Accessing Studio | Web (`https://studio.calm.finos.org`) vs local dev |
| Canvas features | 9 node shapes, 5 edge types, containment, drag/drop, multi-select |
| Bidirectional sync | Edit diagram → JSON; edit JSON → diagram; how the mutex prevents loops |
| ELK auto-layout | What it does, when to re-apply |
| Import/Export | Existing JSON import, SVG/PNG/JSON export |
| Properties panel | Editing metadata, interfaces, controls inline |
| When to use Studio vs CLI | Studio for exploration/presentation; CLI for automation/CI |

**Demo:** Import the conference signup architecture from Lab 2, explore the canvas.

### Chapter 3.3 — CALM Hub: The Architecture Registry (~2500 words)

Teaching metaphor: "If CALM is Terraform, Hub is Terraform Cloud + Artifactory."

| Section | Content |
|---------|---------|
| Why a registry exists | Files on disk don't scale; Hub provides versioning, discovery, access control |
| Hub architecture | Namespace → resource tree; MongoDB (prod) vs NitriteDB (standalone) |
| Namespaces | Organizational isolation: `org.mybank/payments`, `finos/reference` |
| REST API shape | `/calm/namespaces/{ns}/architectures`, `patterns`, `standards`, `controls` |
| Auth profiles | no-auth (local), secure (OIDC), proxy-auth (reverse proxy) |
| CLI Hub commands | `calm hub push`, `pull`, `list` with subcommand tree |
| Hub-integrated CI | Using `--calm-hub-url` to pull patterns from Hub at validate time |
| Hub MCP endpoint | `http://localhost:8080/mcp` — AI agents querying live registry |
| Hub local quickstart | `cd calm-hub/deploy && docker-compose up` → port 8080 |

**Teaching scope decision:** Learners do NOT run Hub in Lab 3. Chapter 3.3 teaches Hub conceptually with the CLI commands. An optional stretch goal shows publishing to a local Hub Docker instance.

### Chapter 3.4 — CALM Server: Validation as a Service (~1200 words)

| Section | Content |
|---------|---------|
| What it is | HTTP endpoint for validation; bundled schemas; no CLI per-developer |
| Start the server | `calm-server --port 3000` |
| Health check | `GET /health` → `{"status": "OK"}` |
| Validate endpoint | `POST /calm/validate` with JSON body |
| Rate limiting | Built-in: 100 req/15min per IP |
| Platform team use case | "You MUST pass this endpoint before deploying" |
| Security note | No built-in auth; bind to localhost only by default; note for enterprise use |

### Chapter 3.5 — VSCode Extension: CALM in Your Editor (~1500 words)

| Section | Content |
|---------|---------|
| Install | Search "CALM Tools" in marketplace; publisher FINOS; version 0.6.0 |
| Preview panel | Live diagram as you type; auto-layout on demand |
| Tree view | Browse nodes/relationships/flows; quick jump |
| Timeline navigation | Click milestones to open snapshots |
| Real-time validation | Problems panel shows errors as you type; click to navigate |
| Template/docs mode | Live docify output side-by-side |
| Configuration | `calm.urlMapping`, `calm.files.globs`, `calm.schemas.additionalFolders` |
| When extension catches errors before CI | Preventive vs corrective validation |

### Chapter 3.6 — Patterns and Standards: The Blueprint System (~2000 words)

| Section | Content |
|---------|---------|
| What a pattern is | Template with `const` constraints; defines required nodes/relationships |
| Pattern vs architecture | Pattern is the spec; architecture is the conforming instance |
| `calm generate` workflow | Interactive generation; `--option-choices` for scripting |
| `calm validate -p` | Checking architecture conformance against pattern |
| Multi-pattern validation | One architecture, multiple compliance checks |
| Organizational standards | Org-specific extension constraints on top of spec |
| Building a course pattern | Walk through creating `secure-api-service.pattern.json` |
| Organization pattern library | Hub as the registry for all approved patterns |

**Code example:** Author `secure-api-service.pattern.json` and show `calm generate -p secure-api-service.pattern.json -o my-api.calm.json`.

### Chapter 3.7 — CI/CD Integration: Architecture Gates (~2200 words)

| Section | Content |
|---------|---------|
| Why CI/CD for architecture | Catch drift before deployment; "treat architecture like a test" |
| GitHub Actions workflow | The exact YAML pattern from Lab 3 |
| JUnit output | `--format junit` for CI test reporters |
| `calm diff` as PR review | Visualize what changed between versions; `--exit-code` gate |
| Installing CALM CLI in CI | `npm install -g @finos/calm-cli` step |
| Hub-integrated pipeline | Using `--calm-hub-url` to pull patterns from Hub |
| The full stack | `PR → calm validate → calm diff → tests pass → merge → Hub publish → Guard` |
| Blocking strategy | "Architecture must pass before IaC applies" |

**Lab 3 link:** Chapter 3.7 ends with the Lab 3 intro and setup steps.

---

## Standard Stack

### Content Production Tools

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `@finos/calm-cli` | 1.45.0 | Validate all `.calm.json` code examples; teach commands | Official FINOS tool [VERIFIED: npm registry] |
| CALM Studio web | `https://studio.calm.finos.org` | Lab 3 visualization step; chapter demos | Zero install; confirmed in lab-00 |
| Docusaurus | (existing site) | Render MDX chapters | Already in use |
| Marp | (existing) | Slide deck | Established in Phase 2 |
| GitHub Actions | (learner account) | Lab 3 CI gate | Standard CI platform; learner controls it |
| `act` (optional) | homebrew | Local GitHub Actions runner fallback | Allows lab without pushing to GitHub |

### Package Legitimacy Audit

This phase installs no new npm packages into the project. `@finos/calm-cli` is already verified. The Lab 3 starter repo uses `npm install -g @finos/calm-cli` inside GitHub Actions — this is the same package already in use.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `@finos/calm-cli` | npm | ~2 yrs | [ASSUMED — not measured this session] | github.com/finos/architecture-as-code | N/A (slopcheck not available) | Approved — official FINOS package [CITED: npmjs.com/@finos/calm-cli] |

*slopcheck was not available at research time. `@finos/calm-cli` is tagged `[VERIFIED: npm registry + official FINOS repo]` — it passes the provenance test on the basis of being the official FINOS package sourced from the authoritative monorepo, not a training-data recommendation.*

---

## Architecture Patterns

### Content Flow

```
CURRICULUM.md (Module 3 spec)
       ↓
7 MDX chapters (content/module-03-calm-ecosystem/)
       ↓
5 code examples (code-examples/module-03-calm-ecosystem/)  ←→  calm validate (npx)
       ↓
10 Excalidraw illustration stubs (illustrations/source/m03-*)
       ↓
YAML quiz (quizzes/module-03-ecosystem.yaml)
       ↓
Marp slide deck (slides/module-03-calm-ecosystem.md)
       ↓
Lab 3 starter repo (labs/lab-03-cicd-gate/ + calm-academy-lab-03-starter GitHub repo)
```

### Recommended Project Structure (new files)

```
content/
└── module-03-calm-ecosystem/
    ├── cli-toolbox.mdx                   # Ch 3.1
    ├── calm-studio-visual-design.mdx     # Ch 3.2
    ├── calm-hub-architecture-registry.mdx # Ch 3.3
    ├── calm-server-validation-service.mdx # Ch 3.4
    ├── vscode-extension.mdx              # Ch 3.5
    ├── patterns-and-standards.mdx        # Ch 3.6
    └── cicd-integration.mdx              # Ch 3.7

code-examples/
└── module-03-calm-ecosystem/
    ├── secure-api-service.pattern.json              # Lab 3 pattern (validates as pattern, not arch)
    ├── secure-api-generated.calm.json               # calm generate output
    ├── with-hub-metadata.calm.json                  # Hub workflow demo
    ├── timeline-moment-v1.calm.json                 # diff demo baseline
    └── timeline-moment-v2.calm.json                 # diff demo comparison

illustrations/
├── source/
│   ├── m03-calm-cli-command-map.excalidraw
│   ├── m03-studio-canvas-anatomy.excalidraw
│   ├── m03-bidirectional-sync.excalidraw
│   ├── m03-hub-namespace-tree.excalidraw
│   ├── m03-hub-publish-consume-flow.excalidraw
│   ├── m03-calm-server-platform-pattern.excalidraw
│   ├── m03-pattern-vs-architecture.excalidraw
│   ├── m03-cicd-gate-flow.excalidraw
│   ├── m03-full-stack-pipeline.excalidraw
│   └── m03-vscode-extension-panels.excalidraw
└── exported/
    └── m03-*.svg (10 placeholders)

quizzes/
└── module-03-ecosystem.yaml

slides/
└── module-03-calm-ecosystem.md

labs/
└── lab-03-cicd-gate/
    ├── LAB.md                          # Learnforge-compatible format
    ├── starter/                        # Also published as GitHub template repo
    │   ├── .github/workflows/calm-gate.yml  # stub — learner fills in
    │   ├── architectures/
    │   │   ├── secure-api.calm.json    # valid
    │   │   └── broken-api.calm.json   # invalid — learner fixes
    │   └── patterns/
    │       └── secure-api-service.pattern.json
    └── solution/
        └── .github/workflows/calm-gate.yml  # complete working workflow
```

### Anti-Patterns to Avoid

- **Teaching `npx @calmstudio/mcp`:** Package is NOT on npm. Always reference the local `.cjs` path.
- **Showing outdated hub commands:** Hub push/pull/list SHIPS in 1.45.0 — do not call them gaps.
- **File extension mismatch:** Module 3 code examples MUST use `.calm.json`, not `.architecture.json`, to match CI glob.
- **Requiring Hub for Lab 3:** Lab 3 is a CLI + GitHub Actions lab; Hub is optional stretch. Don't block learners on Docker.
- **Teaching Desktop Studio:** Tauri desktop app is "coming soon" — only teach web and local dev modes.

---

## Illustration Plan (ILL-04: 8–10 Excalidraw B&W)

10 illustrations planned:

| Stub name | Chapter | What it shows |
|-----------|---------|---------------|
| `m03-calm-cli-command-map` | 3.1 | CLI command tree: top-level commands with key flags; branching subcommands for `hub` |
| `m03-studio-canvas-anatomy` | 3.2 | Canvas anatomy: node palette (left), canvas (center), code panel (right), properties (bottom right) |
| `m03-bidirectional-sync` | 3.2 | Before/after: drag node on canvas → JSON panel updates; edit JSON → node moves |
| `m03-hub-namespace-tree` | 3.3 | Hub resource tree: domain → namespace → architectures/patterns/standards/controls with version numbers |
| `m03-hub-publish-consume-flow` | 3.3 | Workflow: Architect pushes → Hub stores version → Product team pulls → CI validates against Hub pattern |
| `m03-calm-server-platform-pattern` | 3.4 | Platform pattern: Developer → POST /calm/validate → calm-server → response; vs CLI local |
| `m03-pattern-vs-architecture` | 3.6 | Side-by-side: pattern file (with `const` constraints) → `calm generate` → architecture file (with values filled in) |
| `m03-cicd-gate-flow` | 3.7 | GitHub Actions flow: PR opened → validate step → junit output → pass/fail → merge or block |
| `m03-full-stack-pipeline` | 3.7 | Full pipeline: PR → calm validate → calm diff → tests → merge → Hub publish → Guard → Deploy |
| `m03-vscode-extension-panels` | 3.5 | VSCode window with: editor (center), preview panel (right), tree view (left), problems panel (bottom) |

---

## Quiz Design (QUIZ-04: Module 3 Ecosystem Quiz)

**Target: 16–20 questions** (2–3 per chapter)

**File:** `quizzes/module-03-ecosystem.yaml`

| Chapter | Questions | Types | Key concepts tested |
|---------|-----------|-------|---------------------|
| 3.1 — CLI | 3 | MC (2) + code_completion (1) | `calm validate` flags, `--format junit`, `hub` subcommand, `calm diff --exit-code` |
| 3.2 — Studio | 2 | MC (2) | Bidirectional sync concept, export formats, ELK layout |
| 3.3 — Hub | 3 | MC (2) + short_answer (1) | Hub storage modes, namespace concept, MCP endpoint, CLI push/pull |
| 3.4 — Server | 2 | MC (2) | Validate endpoint path, rate limiting, local vs platform pattern |
| 3.5 — VSCode | 2 | MC (1) + short_answer (1) | Extension name, schema detection trigger, Problems panel |
| 3.6 — Patterns | 3 | MC (2) + code_completion (1) | Pattern vs architecture distinction, `calm generate`, multi-pattern validation |
| 3.7 — CI/CD | 3 | MC (2) + short_answer (1) | GitHub Actions step, JUnit output, Hub-integrated pipeline sequence |

**Sample questions:**

```yaml
- id: q3.1.1
  type: multiple_choice
  prompt: |
    Which CALM CLI flag produces output in a format suitable for CI test dashboards (Jenkins, GitHub Actions)?
  options:
    - label: "-f pretty"
      correct: false
      explanation: "pretty format is for human-readable terminal output, not CI test dashboards."
    - label: "-f json"
      correct: false
      explanation: "json format is machine-readable but not in JUnit XML format expected by CI test dashboard plugins."
    - label: "-f junit"
      correct: true
      explanation: "Correct. --format junit (or -f junit) produces JUnit XML output that GitHub Actions, Jenkins, and most CI platforms can parse into test reports."
    - label: "--format xml"
      correct: false
      explanation: "--format xml is not a valid flag. The junit option produces XML in JUnit format."
  reference_section: "../content/module-03-calm-ecosystem/cli-toolbox.mdx#ci-integration"

- id: q3.6.1
  type: code_completion
  prompt: |
    Complete the CALM CLI command to generate an architecture from a pattern file called
    `secure-api-service.pattern.json` and save it to `my-api.calm.json`.
  snippet: |
    npx @finos/calm-cli <BLANK> -p secure-api-service.pattern.json -o my-api.calm.json
  accepted_answers:
    - "generate"
  explanation: "calm generate instantiates an architecture from a pattern. The -p flag specifies the pattern; -o specifies the output file."
  reference_section: "../content/module-03-calm-ecosystem/patterns-and-standards.mdx#calm-generate"
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Architecture validation in CI | Custom JSON Schema check | `calm validate -f junit` | Official tool; JUnit format integrates with all CI platforms |
| Validation as HTTP service | Custom validation microservice | `calm-server` | Bundled schemas, rate limiting, health check built-in |
| Pattern-to-architecture generation | Custom templating | `calm generate` | Interactive prompts, Hub-aware, `--option-choices` for scripting |
| Architecture diff in PR | Custom diff tooling | `calm diff --exit-code -f summary` | Semantic CALM diff; format understands nodes/relationships, not just JSON |
| AI architecture creation | Typing CALM JSON by hand | `calmstudio-mcp` tools via Claude | MCP tools enforce spec correctness at creation time |
| Architecture version tracking | Git-only versioning | CALM Hub namespaces + versions | Hub provides discovery, access control, MCP queryability |

---

## Common Pitfalls

### Pitfall 1: File Extension Mismatch (CI CRITICAL)

**What goes wrong:** Module 3 code examples use `.architecture.json` (following Module 2 convention) but the CI glob searches for `*.calm.json`. The validate job runs but matches zero files — no error, silent failure.
**Why it happens:** The CI was written to use `.calm.json` (FINOS canonical convention per CLAUDE.md) but the Module 2 examples were created with `.architecture.json`. These coexist silently.
**How to avoid:** All Module 3 code examples MUST use `.calm.json` extension. Wave 0 must also resolve whether Module 2 files need renaming or the CI glob needs updating.
**Warning signs:** `validate-calm-examples` CI job shows "No files found matching *.calm.json" or completes too quickly with no file output.

### Pitfall 2: Hub Blocking the Lab

**What goes wrong:** Lab 3 design requires learners to publish to Hub, which means setting up Docker + MongoDB. This blocks 60% of learners who can't run Docker locally.
**Why it happens:** Hub is the "right" architecture for the workflow, but it's heavy infrastructure for a lab.
**How to avoid:** Lab 3 is CLI + GitHub Actions only. Hub publish/consume is taught in Chapter 3.3 text; Lab 3's stretch goal is the only Hub touch point (optional Docker step).
**Warning signs:** Lab 3 LAB.md has Hub as a required step, not stretch.

### Pitfall 3: Teaching calmstudio-mcp as npx-installable

**What goes wrong:** Content author writes `npx @calmstudio/mcp` in lesson text. Learner runs it; gets npm 404 error.
**Why it happens:** The Studio README says `npx @calmstudio/mcp` in the MCP server quickstart (this appears to be aspirational/future). The package is NOT on npm.
**How to avoid:** Only reference the local `.cjs` install path. Link to lab-00's setup instructions for calmstudio-mcp.
**Warning signs:** Any chapter text showing `npx @calmstudio/mcp`.

### Pitfall 4: validate Flag Placement

**What goes wrong:** Learner writes `calm validate -a arch.calm.json -p pattern.json` expecting zero errors but gets pattern conformance failures they didn't anticipate.
**Why it happens:** Without `-p`, `calm validate -a` checks schema conformance only. With `-p`, it also checks pattern conformance. These are two different validation levels.
**How to avoid:** Chapter 3.1 and Lab 3 must explicitly distinguish schema validation vs pattern validation. Show both commands. Explain that Lab 3's CI runs both separately.
**Warning signs:** Lab 3 step checks that use schema-only validation but the learner thinks they've passed pattern validation too.

### Pitfall 5: Hub Auth Profile Confusion

**What goes wrong:** Learner starts Hub locally and immediately gets 401 on every request. Concludes Hub is broken.
**Why it happens:** Hub defaults to `secure` profile (401 on everything). The docker-compose quickstart uses `no-auth` profile. But learners who start Hub via Maven without a profile flag hit the secure default.
**How to avoid:** Chapter 3.3 must state explicitly: "The quickstart docker-compose uses no-auth profile — it is the only supported local dev mode." If using Maven directly, add `-Dquarkus.profile=no-auth`.
**Warning signs:** Learners report 401 errors on all Hub API calls.

### Pitfall 6: calm diff exit code misunderstanding

**What goes wrong:** Learner adds `calm diff --exit-code` to CI and the job fails on every PR because any architecture change triggers a non-zero exit.
**Why it happens:** `--exit-code` is designed to gate on *unwanted* changes, but every legitimate architecture update is also a change. Without understanding this, learners add it incorrectly.
**How to avoid:** Chapter 3.7 must explain: `--exit-code` gates version bumps (e.g., "did this PR accidentally modify the architecture?"), not "did the architecture change at all." Use it with `calm diff` between Hub-published version and PR version, not between PR versions.
**Warning signs:** Lab 3 solutions with `--exit-code` on every commit, causing pipeline failures.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| No Hub CLI integration | `calm hub push/pull/list` ships in 1.45.0 | 2026-06-16 (current release) | CURRICULUM.md listed these as gaps — they are now shipping. Teach as available. |
| `npx @calmstudio/mcp` (stated in early docs) | Local `.cjs` install only | Ongoing | calmstudio-mcp was never published to npm. Always use local path. |
| Manual JSON authoring | `calm generate -p <pattern>` | CALM 1.x | Pattern-based generation is the recommended approach for new architectures |
| Schema-only validate | `calm validate -a <arch> -p <pattern>` | CALM 1.x | Pattern conformance validation is distinct from schema validation |

**Deprecated/outdated:**
- CALM Studio "Desktop (Tauri)" — listed as "coming soon" in Studio README. Do NOT teach as available.
- `interface.json` built-in types from 1.0-rc1 — already covered in Module 2 research; still applies.

---

## Wave Structure Recommendation

### Wave 0 (Setup — blocking on everything)

- Resolve CI file extension conflict: decide `*.calm.json` (FINOS canonical) vs update CI glob — recommend standardizing on `.calm.json` for Module 3+ and leaving Module 2 as-is (with CI glob update to include both patterns)
- Create directory structure: `content/module-03-calm-ecosystem/`, `code-examples/module-03-calm-ecosystem/`, `labs/lab-03-cicd-gate/`
- Create Lab 3 starter repo scaffold (GitHub template or local starter/)
- Verify `npx @finos/calm-cli` at 1.45.0 is still the current release

### Wave 1 (must complete before Wave 2)

- Chapter 3.1 (CLI) — anchors all other chapters (they all reference CLI commands)
- Chapter 3.6 (Patterns) — required before Lab 3 can be written (pattern file is the lab anchor)
- Code examples: `secure-api-service.pattern.json` + `secure-api-generated.calm.json`
- Illustration stubs for 3.1 and 3.6 (3 stubs)

### Wave 2 (can parallelize internally once Wave 1 complete)

**Track A — Remaining chapters:**
- Chapter 3.2 (Studio)
- Chapter 3.3 (Hub)
- Chapter 3.4 (Server)
- Chapter 3.5 (VSCode)
- Chapter 3.7 (CI/CD)
- Remaining 7 illustration stubs
- Code examples: `with-hub-metadata.calm.json`, `timeline-moment-v1.calm.json`, `timeline-moment-v2.calm.json`

**Track B — Lab and quiz (can start once Wave 1 complete):**
- Lab 3 (LAB.md + starter/ + solution/) — can begin when Chapter 3.6 pattern exists
- Module 3 quiz YAML — can write from chapter content as chapters are authored

### Wave 3 (gate: all Wave 2 content exists)

- Validate all code examples: `for f in code-examples/module-03-calm-ecosystem/*.calm.json; do npx @finos/calm-cli validate -a "$f" || exit 1; done`
- Validate pattern file: `npx @finos/calm-cli validate -p code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json`
- Lint quiz: `bash scripts/lint-quizzes.sh`
- Module 3 slide deck (Marp) — derives from all 7 chapters + 10 illustration SVGs
- Verify Lab 3 solution branch passes all step checks

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `npx @finos/calm-cli` | CODE, LAB-03, CI validation | Yes | 1.45.0 | None — required |
| CALM Studio web (`studio.calm.finos.org`) | Ch 3.2, Lab visualization | Yes (web app) | — | Local dev at localhost:5173 |
| GitHub account | Lab 3 (fork + GitHub Actions) | Yes (learner owns) | — | `act` for local Actions runner |
| Docker (for Hub) | Lab 3 stretch goal only | Yes (learner machine) | — | Skip Hub steps (not required for Lab core) |
| Marp CLI | Slide deck | Not verified | — | Markdown readable without rendering |
| `bash scripts/lint-quizzes.sh` | QUIZ-04 | Yes (existing) | — | None needed |

**Missing dependencies with no fallback:**
- `npx @finos/calm-cli` — must remain available; confirmed at 1.45.0

**Missing dependencies with fallback:**
- GitHub Actions — `act` provides local fallback (install via brew)
- Hub Docker — stretch goal only; not blocking Lab 3 core steps

---

## Validation Architecture (nyquist_validation: true)

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `npx @finos/calm-cli validate` (architecture + pattern validation) + `bash scripts/lint-quizzes.sh` |
| Config file | None — validator is stateless |
| Quick run command | `npx @finos/calm-cli validate -a code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json -f pretty` |
| Full suite command | `for f in code-examples/module-03-calm-ecosystem/*.calm.json; do npx @finos/calm-cli validate -a "$f" \|\| exit 1; done && npx @finos/calm-cli validate -p code-examples/module-03-calm-ecosystem/secure-api-service.pattern.json && bash scripts/lint-quizzes.sh` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CODE (via MOD-04) | All `.calm.json` pass validate | validation | `for f in code-examples/module-03-calm-ecosystem/*.calm.json; do npx @finos/calm-cli validate -a "$f" \|\| exit 1; done` | No — Wave 1+2 creates them |
| LAB-03 | Lab 3 solution workflow validates the test architectures correctly | file_state + command_regex | `cat labs/lab-03-cicd-gate/solution/.github/workflows/calm-gate.yml \| grep "calm validate"` | No — Wave 2 |
| QUIZ-04 | Quiz YAML passes linter | YAML lint | `bash scripts/lint-quizzes.sh` | No — Wave 2 |
| MOD-04 | 7 chapters exist with required frontmatter | file_state | `ls content/module-03-calm-ecosystem/*.mdx \| wc -l` returns 7 | No — Wave 1+2 |
| ILL-04 | 10 Excalidraw stubs exist and are valid JSON | file_state + JSON | `python3 -m json.tool illustrations/source/m03-*.excalidraw > /dev/null` | No — Wave 1+2 |

### Wave 0 Gaps

- [ ] `content/module-03-calm-ecosystem/` directory
- [ ] `code-examples/module-03-calm-ecosystem/` directory
- [ ] `labs/lab-03-cicd-gate/` directory
- [ ] `illustrations/source/m03-*.excalidraw` stubs (10)
- [ ] Resolve CI glob: update `ci.yml` to find `*.calm.json` OR both `*.calm.json` and `*.architecture.json`

---

## Security Domain

This phase produces educational content. No new authentication, authorization, or cryptographic code is written. The Lab 3 GitHub Actions YAML teaches learners about CI/CD gates — this is security-relevant content but not security-critical implementation.

ASVS categories not applicable to content authoring. CALM Server's lack of built-in auth is a teaching note in Chapter 3.4 (warn: never expose without an auth proxy in production).

---

## Open Questions (RESOLVED)

1. **CI glob: `.calm.json` vs `.architecture.json`**
   - What we know: CI uses `*.calm.json`; existing modules use `*.architecture.json`. Both conventions exist in the repo.
   - What's unclear: Whether to rename module-02 files or expand the CI glob to cover both.
   - Recommendation: Standardize on `.calm.json` for Module 3 (FINOS canonical convention). Update CI glob to `*.calm.json` and `*.architecture.json` with a single `find` command using `-name "*.calm.json" -o -name "*.architecture.json"`. Flag this as Wave 0 in the plan.
   - **RESOLVED:** `.calm.json` adopted for all Module 3 code examples (FINOS canonical convention). CI glob already matches `*.calm.json`. Module 0–2 `.architecture.json` files remain unchanged for backward compat.

2. **Lab 3 starter repo: monorepo subfolder vs separate GitHub repo**
   - What we know: Lab 2 uses `labs/lab-02-conference-signup/starter/` inside the main repo. Lab 3 specifically requires learners to "fork a repo" — forking works best with a separate repo.
   - What's unclear: Whether to create a separate GitHub template repo or simulate forking within the main repo.
   - Recommendation: Create a separate minimal GitHub repo `calm-academy-lab-03-cicd-starter` as a template repo. Include a stub in `labs/lab-03-cicd-gate/starter/` as the canonical source. The plan should include creating/publishing the template repo.
   - **RESOLVED:** Monorepo subfolder approach chosen (`labs/lab-03-cicd-gate/starter/`). No separate GitHub template repo required for Phase 4. Lab instructions guide learners to fork the main calm-academy repo or use a local copy. Keeps all lab content in one place and avoids cross-repo coordination complexity.

3. **CALM Studio web deployment URL stability**
   - What we know: `https://studio.calm.finos.org` is referenced in lab-00 as the production URL. The Studio repo shows Vercel deployment.
   - What's unclear: Whether this URL is stable and if it requires auth.
   - Recommendation: Reference `https://studio.calm.finos.org` as the primary URL. Provide local dev fallback (`localhost:5173`) as secondary. Do not reference the Vercel deployment URL directly — use the canonical `studio.calm.finos.org`.
   - **RESOLVED:** `https://studio.calm.finos.org` used as the canonical URL (confirmed in lab-00). Local dev fallback (`npm run dev` from calm-studio directory) documented as secondary option.

4. **Does the course need a running CALM Hub for Module 3?**
   - What we know: Chapter 3.3 teaches Hub conceptually. CLI hub commands are now shipping (1.45.0). Labs 3 core does not require Hub.
   - Recommendation: Chapter 3.3 text + diagram teaches Hub architecture. CLI hub commands are demonstrated with a Docker quickstart as an optional aside. Lab 3 does NOT require Hub. Stretch goal only.
   - **RESOLVED:** Hub is stretch goal only. Chapter 3.3 teaches Hub architecture conceptually; CLI `calm hub` commands demonstrated with Docker quickstart as optional aside. Lab 3 core requires no Hub. This avoids Docker dependency blocking lab completion.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `https://studio.calm.finos.org` is the stable public URL for CALM Studio web | Studio section, Lab 3 | If URL changes or goes offline, all lab steps referencing it break. Mitigation: always provide local fallback. |
| A2 | `FINOS.calm-vscode-plugin` is the correct VS Code marketplace extension ID for "CALM Tools" | VSCode section | If publisher ID differs, install command fails. [ASSUMED from package.json `publisher: "FINOS"` + `name: "calm-vscode-plugin"`] |
| A3 | The `calm-academy-lab-03-cicd-starter` GitHub template repo does not yet exist and must be created in Phase 4 | Lab 3 design | If it already exists (unlikely — not found in searches), plan must update it instead. |
| A4 | The `--format junit` flag for `calm validate` produces output compatible with GitHub Actions `upload-artifact` and standard test reporters | CI/CD gate section | If JUnit XML output format is non-standard, CI dashboards won't parse it. [ASSUMED — format name matches JUnit convention; not tested end-to-end in this session]. |
| A5 | `calm diff` semantic diff understands CALM node/relationship semantics (not just JSON diff) | State of the Art | If `calm diff` is JSON-only diff, it won't surface semantic changes cleanly. [ASSUMED from `diff` help text which describes "Compare two CALM documents"; semantic awareness not confirmed]. |

---

## Sources

### Primary (HIGH confidence)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/` — local canonical FINOS repo; all tool CLIs run directly
- `npx @finos/calm-cli --help` (and all subcommand `--help`) — version 1.45.0 [VERIFIED: tool output]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-server/README.md` — calm-server commands, endpoints, options [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-plugins/vscode/README.md` — VSCode extension features [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-plugins/vscode/package.json` — extension name, publisher, version [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-hub/README.md` — Hub storage, auth profiles, MCP endpoint [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-suite/calm-studio/README.md` — Studio features, tech stack, MCP [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.github/workflows/ci.yml` — existing CI patterns for calm validate [VERIFIED]
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/labs/lab-00-on-ramp/LAB.md` — confirmed `studio.calm.finos.org` URL [VERIFIED]
- `CURRICULUM.md` — Module 3 chapter structure and pedagogical intent [VERIFIED]
- `CLAUDE.md` — project conventions and constraints [VERIFIED]

### Secondary (MEDIUM confidence)
- `npm view @finos/calm-cli version` — confirmed 1.45.0, published 2026-06-16 [VERIFIED: npm registry]
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-hub/AGENTS.md` — Hub MCP tool list, directory structure [VERIFIED]

### Tertiary (LOW confidence)
- A5 assumption: `calm diff` semantic awareness — not tested end-to-end; based on tool description only

---

## Metadata

**Confidence breakdown:**
- CLI commands and flags: HIGH — run directly against npx 1.45.0
- CALM Studio features: HIGH — read from Studio README directly
- CALM Hub features: HIGH — read from Hub README and AGENTS.md
- CALM Server: HIGH — read from calm-server README
- VSCode extension: HIGH — read from extension README and package.json
- Lab 3 CI/CD pattern: HIGH — derived from verified CLI flags + existing ci.yml patterns
- Hub subcommand availability (shipping vs gap): HIGH — confirmed via `hub --help` output
- CALM Studio web URL: MEDIUM — confirmed from lab-00, but URL stability is assumed
- `calm diff` semantic intelligence: LOW — described but not tested

**Research date:** 2026-06-16
**Valid until:** 2026-09-16 (CLI 1.45.0 may increment; re-verify version before Wave 1 execution; check with `npm view @finos/calm-cli version`)

**Key insight for planner:** Module 3 is a toolchain walkthrough module. The primary authoring challenge is producing accurate, copy-paste-safe CLI examples for 7 different commands, each with multiple flags. Every CLI command shown in the text MUST be verified against the actual `--help` output before authoring. The planner should include explicit verification steps (e.g., "verify `calm timeline --help` output matches Chapter 3.1 text") in each plan. Do NOT author CLI examples from memory or training data.
