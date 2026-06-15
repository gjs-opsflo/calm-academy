# Phase 1: Module 0 — The 15-Minute On-Ramp — Research

**Researched:** 2026-06-15
**Domain:** CALM content authoring (MDX lessons, CALM JSON, Learnforge labs, YAML quizzes, Excalidraw illustrations)
**Confidence:** HIGH

---

## Summary

Phase 1 produces all four deliverables for Module 0 end-to-end: five MDX chapters, one lab (Lab 0), one YAML quiz, and 3–5 Excalidraw B&W illustrations. The module's purpose is a 15-minute demo hook — learner produces a validated `.calm.json` before learning a single spec rule. The entire design philosophy is "show the magic first, demystify second."

The project infrastructure (directory structure, authoring standards, formats) is fully specified and already exists in `docs-meta/`. The canonical CALM spec source is the local `architecture-as-code` repo at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code`. The CALM CLI is accessible via `npx @finos/calm-cli` (current version 1.44.1). The `calmstudio-mcp` package is available via `npx @calmstudio/mcp`. The `calm-arb-convert` skill in `~/.claude/skills/` provides the AI-driven workflow for CALM creation.

The planner must sequence work as: (1) MDX chapter text, (2) code example CALM JSON validated with the CLI, (3) quiz YAML, (4) lab LAB.md with solution, (5) illustration stubs for user. Slides are explicitly not in scope for Phase 1 (only required from Phase 2 onward per REQUIREMENTS.md).

**Primary recommendation:** Author all five chapters as MDX, create the Module 0 beginner CALM JSON example using calmstudio-mcp, wire the quiz per QUIZ-FORMAT.md, and scaffold Lab 0 with a Docker-free flow. Illustrations are authored by the user via the Excalidraw agentic skill — Claude Code delivers specification stubs and exports (SVGs populated after user authors in Excalidraw).

---

## Project Constraints (from CLAUDE.md)

### Spec discipline
- **9 core node types only:** `actor`, `ecosystem`, `system`, `service`, `database`, `network`, `ldap`, `webclient`, `data-asset` [VERIFIED: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/core.json`]
- **15 `ai:*` node types** available (but not used in Module 0 — beginner scope is core types only) [VERIFIED: `architecture-as-code/calm-suite/calm-studio/packages/calm-core/src/aigf/mappings.ts`]
- `container` and `component` DO NOT EXIST — any use is a critical error [VERIFIED: node-type-definition schema]
- CALM 1.2 is the pinned spec. 1.3 is in draft (2026-03) — use 1.2 `$schema` URL

### Production workflow (locked)
- Text-first. No illustrations before chapters drafted. No quiz before chapters drafted.
- All CALM JSON examples must be real validated files in `code-examples/` [CITED: CLAUDE.md]
- No `...` truncation in code examples — copy-paste must work

### Commit conventions
- Conventional Commits, scopes: `module-NN`, `lab-NN`, `curriculum`, etc.
- No DCO sign-off, no Co-Authored-By (private repo, pre-FINOS transfer)

### Content
- Illustrations: Excalidraw B&W only, user authors, Claude Code provides stubs + export hooks
- Lab 0: Docker-free (no `docker-compose.yml` needed for this specific lab)
- YAML quizzes: per QUIZ-FORMAT.md schema

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOD-01 | Module 0 has 5 fully-authored MDX chapters covering three paths, live demo, why it works, setup, hands-on exercise | All chapter content mapped in CURRICULUM.md Chapters 0.1–0.5; STYLE-GUIDE.md governs structure |
| LAB-01 | Docker-free 15-min on-ramp lab: describe system in 3 sentences → .calm.json → calm validate → CALM Studio visualize | LAB-FORMAT.md governs format; calm validate command confirmed working via npx; no Docker required |
| QUIZ-01 | Module 0 quiz (YAML format) testing: setup completed, first CALM doc produced, three AI paths understood | QUIZ-FORMAT.md schema fully specified; 3 topic areas map to testable quiz questions |
| ILL-01 | 3–5 Excalidraw B&W illustrations: three paths diagram, CALM Studio screenshot mock, architecture-as-the-prompt concept | ILLUSTRATION-STANDARDS.md governs style; Claude Code provides stubs; user authors in Excalidraw |
</phase_requirements>

---

## Architectural Responsibility Map

Module 0 is a content authoring phase. The "architecture" is the production workflow, not a running system.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MDX chapter authoring | Content (file system) | Docusaurus (rendering) | Text lives in `content/module-00-on-ramp/`; Docusaurus renders it but is not bootstrapped in Phase 1 |
| CALM JSON code example | CALM CLI (validate) | calmstudio-mcp (author) | Example must pass `calm validate` before commit; authoring via MCP enforces correct types |
| Quiz YAML | Content (file system) | Quiz MDX component (Phase 5) | Quiz data file lives in `quizzes/`; MDX component built in Phase 5; data format must be correct now |
| Lab (LAB.md + starter + solution) | Lab filesystem | Learnforge (future) | Lab runs locally with CALM CLI; Learnforge integration is Phase 11; Docker-free for Lab 0 |
| Illustrations | User (Excalidraw) | Export script | User is the author; Claude Code stubs + scripts/export-excalidraw.sh handles SVG export |

---

## Standard Stack

### Core — What This Phase Uses

| Tool | Version/Location | Purpose | Why Standard |
|------|--------------------|---------|--------------|
| `@finos/calm-cli` | 1.44.1 (via `npx`) | Validate `.calm.json` files | Official FINOS CLI; only authoritative validator |
| `calmstudio-mcp` | `npx @calmstudio/mcp` | Author CALM JSON via AI tool calls | Enforces correct types via `read_calm_guide`; the spec-enforcing authoring workflow |
| Docusaurus | Not yet initialized (Phase 5) | Site rendering | Locked by project; MDX format must be compatible |
| Excalidraw | Desktop / agentic skill | B&W illustrations | Locked by project; user skill already exists |
| MDX | Compatible with Docusaurus 3.x | Chapter format | Frontmatter + content rendering on site |
| YAML | Standard | Quiz data file | QUIZ-FORMAT.md schema |

[VERIFIED: npm registry] — `@finos/calm-cli@1.44.1` confirmed via `npm view @finos/calm-cli version`
[ASSUMED] — `@calmstudio/mcp` not resolvable from local npm registry at research time; confirm availability via `npx @calmstudio/mcp --version` before authoring code examples

### CALM CLI Invocation (confirmed working)

```bash
# Install globally (optional — npx works without install)
npm install -g @finos/calm-cli

# Validate a CALM architecture file
npx @finos/calm-cli validate -a my-system.architecture.json

# Validate with pretty output (human-readable)
npx @finos/calm-cli validate -a my-system.architecture.json -f pretty

# Alias if installed globally
calm validate -a my-system.architecture.json
```

[VERIFIED: architecture-as-code/calm-ai/tools/calm-cli-instructions.md]

### calmstudio-mcp Installation (for Module 0 Chapter 0.4 setup instructions)

```bash
# Claude Code CLI installation (covered in Chapter 0.4)
claude mcp add --scope user calmstudio-mcp -- npx @calmstudio/mcp

# Claude Desktop / Cursor / Windsurf — drop in mcpServers block
# No-install option: CALM Studio web browser canvas
```

[CITED: CURRICULUM.md Chapter 0.4]

---

## Package Legitimacy Audit

This phase installs no new external packages. It uses:
- `@finos/calm-cli` — already validated FINOS project, Apache-2.0, npm registry confirmed
- `@calmstudio/mcp` — FINOS ecosystem project, used via `npx` (no persistent install); [ASSUMED] — not resolvable from this environment's npm registry; verify before use

**Packages removed due to slopcheck:** None

**Packages flagged suspicious:** `@calmstudio/mcp` is [ASSUMED] — planner should add a verification step before including it in any executable task.

---

## Architecture Patterns

### Content File Layout (canonical)

```
content/
└── module-00-on-ramp/
    ├── three-paths-to-first-calm-doc.mdx          # Chapter 0.1
    ├── live-demo-diagram-to-calm-in-five-minutes.mdx  # Chapter 0.2
    ├── why-this-works-and-when-it-doesnt.mdx      # Chapter 0.3
    ├── get-set-up-in-sixty-seconds.mdx            # Chapter 0.4
    └── your-first-calm-document.mdx               # Chapter 0.5

code-examples/
└── module-00-on-ramp/
    └── conference-signup.architecture.json        # The beginner demo example

quizzes/
└── module-00-on-ramp.yaml                        # QUIZ-01

labs/
└── lab-00-on-ramp/
    ├── LAB.md                                     # LAB-01 (Learnforge-compatible)
    ├── starter/                                   # Empty (learner describes their system)
    └── solution/                                  # Reference .calm.json that validates

illustrations/
├── source/
│   ├── m00-three-paths.excalidraw                # ILL-01 (user authors)
│   ├── m00-calm-studio-mock.excalidraw           # ILL-01 (user authors)
│   └── m00-architecture-as-prompt.excalidraw     # ILL-01 (user authors)
└── exported/
    ├── m00-three-paths.svg
    ├── m00-calm-studio-mock.svg
    └── m00-architecture-as-prompt.svg
```

### MDX Chapter Frontmatter Pattern

Every chapter MUST include this frontmatter (from STYLE-GUIDE.md): [CITED: docs-meta/STYLE-GUIDE.md]

```mdx
---
title: Three Paths to Your First CALM Document
slug: three-paths-to-first-calm-doc
module: 0
chapter: 0.1
estimated_minutes: 5
prerequisites: []
---

## TL;DR
- Bullet 1 ...

## Why it matters
...

## The concept
...

## Code/CALM examples
...

## Common mistakes
...

## Knowledge check
See [Module 0 quiz](../../quizzes/module-00-on-ramp.yaml)

## Lab
See [Lab 0: Your first CALM document](../../labs/lab-00-on-ramp/LAB.md)

## Further reading
...
```

### CALM JSON Minimal Architecture (Module 0 demo example)

The canonical "conference signup" system is explicitly called out in CURRICULUM.md as the beginner example (Chapter 2.7) — but for Module 0, learners use their own system. The code example for Module 0 should be a simpler real-world system than the conference signup pattern (which already exists in the getting-started folder of the aac repo with Kubernetes complexity). A clean 3-node example works better as a teaching artifact.

**Recommended Module 0 demo architecture: "Simple Todo API"** — a 3-node system beginner architects can describe in 3 sentences. Uses only `actor`, `webclient`, `service`, `database` types.

```json
{
  "$schema": "https://calm.finos.org/release/1.2/meta/calm.json",
  "unique-id": "todo-api",
  "name": "Simple Todo API",
  "description": "A minimal web application for managing todo items — three sentences: a user accesses a web frontend, the frontend calls an API service, the API stores todos in a database.",
  "nodes": [
    {
      "unique-id": "user",
      "node-type": "actor",
      "name": "User",
      "description": "Person creating and viewing todo items"
    },
    {
      "unique-id": "todo-web",
      "node-type": "webclient",
      "name": "Todo Web App",
      "description": "Browser-based interface for managing todo items"
    },
    {
      "unique-id": "todo-api",
      "node-type": "service",
      "name": "Todo API",
      "description": "REST API handling todo item CRUD operations"
    },
    {
      "unique-id": "todo-db",
      "node-type": "database",
      "name": "Todo Database",
      "description": "Persistent storage for todo items"
    }
  ],
  "relationships": [
    {
      "unique-id": "user-interacts-web",
      "description": "User accesses the todo web application",
      "relationship-type": {
        "interacts": {
          "actor": "user",
          "nodes": ["todo-web"]
        }
      }
    },
    {
      "unique-id": "web-to-api",
      "description": "Web app calls the API to read and write todos",
      "relationship-type": {
        "connects": {
          "source": { "node": "todo-web" },
          "destination": { "node": "todo-api" }
        }
      },
      "protocol": "HTTPS"
    },
    {
      "unique-id": "api-to-db",
      "description": "API stores and retrieves todo items from the database",
      "relationship-type": {
        "connects": {
          "source": { "node": "todo-api" },
          "destination": { "node": "todo-db" }
        }
      },
      "protocol": "JDBC"
    }
  ]
}
```

**This must be saved as `code-examples/module-00-on-ramp/todo-api.architecture.json` and validated with `npx @finos/calm-cli validate -a` before commit.** [CITED: CLAUDE.md authoring standards; VERIFIED: core.json schema]

Note on the `conference-signup.pattern.json` in the aac repo: it uses the older 1.0-rc schema reference and includes Kubernetes complexity (ecosystem node, deployed-in relationships). Do not copy it as-is for Module 0. Derive a simpler example.

### Lab Format Pattern (LAB-01)

Lab 0 is Docker-free. The `requires_docker: false` flag must be set. The learning goal maps to 4 steps:

```yaml
---
id: lab-00-on-ramp
title: "Your First CALM Document in 15 Minutes"
module: 0
chapter: 0.5
estimated_minutes: 15
difficulty: 1
prerequisites: []

requires_docker: false

workspace:
  cumulative: false
  base_dir: lab-00-on-ramp
  creates:
    - my-system.architecture.json

objectives:
  - Describe a real system in 3 sentences
  - Generate a .calm.json using AI-assisted tooling
  - Validate the architecture with calm validate
  - Visualize the result in CALM Studio

steps:
  - id: step-1
    title: Install calmstudio-mcp (if not done in Chapter 0.4)
    check:
      kind: exit_code
      command: "npx @calmstudio/mcp --version"
      expected: 0
    hints:
      - "Run: claude mcp add --scope user calmstudio-mcp -- npx @calmstudio/mcp"

  - id: step-2
    title: Describe your system and generate .calm.json
    check:
      kind: file_state
      path: my-system.architecture.json
      exists: true
    hints:
      - "Open your AI client (Claude Code, Cursor, or Windsurf with calmstudio-mcp)"
      - "Describe your system in 3 sentences, ask for a CALM document"
      - "Save the output as my-system.architecture.json"

  - id: step-3
    title: Validate the architecture
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
      pattern: "(?i)has.*error.*false|0 error"
    hints:
      - "Run: npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
      - "Look for hasErrors: false in the output"
      - "Common error: invented node types like 'container' or 'component' — fix with a valid type"

  - id: step-4
    title: Visualize in CALM Studio
    check:
      kind: ai_judge
      prompt: "Did the learner open CALM Studio and import their architecture file? They should describe seeing nodes and relationships visualized."
    hints:
      - "Open https://studio.calm.finos.org"
      - "Import your my-system.architecture.json file"
      - "You should see boxes (nodes) connected by arrows (relationships)"
---
```

[CITED: docs-meta/LAB-FORMAT.md]

### Quiz Format Pattern (QUIZ-01)

Quiz file location: `quizzes/module-00-on-ramp.yaml`. Cover 3 topic areas from REQUIREMENTS.md: setup completed, first CALM doc produced, three AI paths understood.

```yaml
module: 0
title: "Module 0: The 15-Minute On-Ramp"

chapters:
  - chapter: 0.1
    slug: three-paths-to-first-calm-doc
    title: "Three Paths to Your First CALM Document"
    questions:
      - id: q0.1.1
        type: multiple_choice
        prompt: |
          Which three input types can the calmstudio-mcp skill convert to a valid CALM document?
        options:
          - label: "Plain English description, diagram/image, existing markdown doc"
            correct: true
            explanation: "These are the three paths: Talk (describe in English), Sketch (image or diagram), Markdown (existing architecture doc like an ARB)."
          - label: "YAML, JSON, XML"
            correct: false
            explanation: "CALM outputs JSON, but these are data formats, not input paths to the AI skill."
          - label: "PowerPoint, Visio, Lucidchart"
            correct: false
            explanation: "These are diagramming tools. You can upload a screenshot or export as image (Path B), but they aren't the three named paths."
        reference_section: "../content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx#the-three-paths"

  - chapter: 0.4
    slug: get-set-up-in-sixty-seconds
    title: "Get Set Up in 60 Seconds"
    questions:
      - id: q0.4.1
        type: short_answer
        prompt: |
          What is the Claude Code CLI command to add calmstudio-mcp as a user-scoped MCP server?
        accepted_answers:
          - "claude mcp add --scope user calmstudio-mcp -- npx @calmstudio/mcp"
        case_sensitive: false
        explanation: "This single command registers calmstudio-mcp as a persistent MCP server for all Claude Code sessions."
        reference_section: "../content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx#claude-code-cli"

  - chapter: 0.5
    slug: your-first-calm-document
    title: "Your First CALM Document"
    questions:
      - id: q0.5.1
        type: multiple_choice
        prompt: |
          After running `calm validate -a my-system.architecture.json`, what does a successful output look like?
        options:
          - label: "hasErrors: false in the JSON output (or 0 errors in pretty format)"
            correct: true
            explanation: "Correct. The validate command exits 0 and reports hasErrors: false when the architecture is valid."
          - label: "A green checkmark in the browser"
            correct: false
            explanation: "calm validate is a CLI command — there is no browser UI. Output is to your terminal."
          - label: "The output file is automatically saved"
            correct: false
            explanation: "calm validate only checks validity, it does not modify or save files."
        reference_section: "../content/module-00-on-ramp/your-first-calm-document.mdx#validation"

      - id: q0.5.2
        type: multiple_choice
        prompt: |
          Which of these is a valid CALM node type for a user of your system?
        options:
          - label: "actor"
            correct: true
            explanation: "Correct. actor is the CALM type for end users and external systems that initiate interactions."
          - label: "user"
            correct: false
            explanation: "'user' is not a CALM node type. Use actor for people and external initiators."
          - label: "person"
            correct: false
            explanation: "'person' is not a CALM node type. Use actor for people and external initiators."
          - label: "container"
            correct: false
            explanation: "'container' does not exist in the CALM spec. It is a common beginner mistake — never use it."
        reference_section: "../content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx#node-types"
```

[CITED: docs-meta/QUIZ-FORMAT.md]

### Illustration Specification (ILL-01)

Three required illustrations. These are authored by the user in Excalidraw. Claude Code provides specifications and the file stubs (`.excalidraw` source files with filenames confirmed, SVG export script).

**ILL-01-A: Three Paths Diagram** (`m00-three-paths.svg`)
- Show three parallel lanes: Talk / Sketch / Markdown
- Each lane: input icon → AI model (calmstudio-mcp) → output (.calm.json)
- Converging arrows to single output
- Labels: "Path A: Talk", "Path B: Sketch", "Path C: Markdown"
- B&W, Excalidraw house style

**ILL-01-B: CALM Studio Screenshot Mock** (`m00-calm-studio-mock.svg`)
- Abstracted browser window containing a node canvas
- Show 3–4 boxes (node shapes) connected by arrows
- Labels: "actor", "webclient", "service", "database"
- Caption area: "CALM Studio — your architecture visualized"
- B&W, Excalidraw house style

**ILL-01-C: Architecture as the Prompt** (`m00-architecture-as-prompt.svg`)
- Left side: human (stick figure) with speech bubble "My system has..."
- Arrow through: AI + calmstudio-mcp
- Right side: validated .calm.json file icon
- Optional bottom row: same .calm.json icon → arrows to "CI/CD gate", "CALM Guard", "CALM Hub"
- Concept: describing a system IS creating its spec
- B&W, Excalidraw house style

[CITED: docs-meta/ILLUSTRATION-STANDARDS.md]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CALM JSON validation | Custom JSON schema validator | `npx @finos/calm-cli validate` | Official CLI handles schema + Spectral rules; hand-built validators miss Spectral linting |
| CALM JSON authoring | Type CALM JSON manually in chapter | `calmstudio-mcp` via AI | Skill enforces `read_calm_guide` before creation; prevents invented node types |
| Quiz rendering component | Build new Vue/React quiz component | Use QUIZ-FORMAT.md YAML schema (component in Phase 5) | Component built in Phase 5 (Site Launch); just need the data file correct now |
| Illustration SVG | Manually create SVGs | Excalidraw → export-excalidraw.sh | Maintains single source of truth in `.excalidraw` format; SVG is a derivative |
| Lab check scripting | Custom test scripts | LAB-FORMAT.md step checks (command_regex, file_state, ai_judge) | Learnforge-compatible format; `scripts/test-lab.sh` runs all checks |

---

## Common Pitfalls

### Pitfall 1: Invented CALM Node Types
**What goes wrong:** Author uses `container`, `component`, `microservice`, or any invented type in the demo CALM JSON. The CLI throws a validation error. Learners copy the broken pattern.
**Why it happens:** Common mental mapping from Docker/K8s terminology. The CALM spec allows custom strings (schema uses `anyOf`) but the AIGF tooling and CLI linting flag non-standard types.
**How to avoid:** Always validate the code example with `npx @finos/calm-cli validate -a` before committing to `code-examples/`. The node-type-definition enum in `core.json` is the authority: only `actor`, `ecosystem`, `system`, `service`, `database`, `network`, `ldap`, `webclient`, `data-asset`.
**Warning signs:** `calm validate` output contains `spectralSchemaValidationOutputs` with type-related warnings.

### Pitfall 2: Using the Conference Signup Pattern as the Module 0 Example
**What goes wrong:** The `conference-signup.pattern.json` in the aac repo uses 1.0-rc schema, includes a full Kubernetes ecosystem node, and is a Pattern (template), not an Architecture (instance). Module 0 learners need a simple architecture, not a pattern.
**Why it happens:** The file is labeled "getting-started" so it looks like the right starter.
**How to avoid:** Use the fresh Module 0 example (todo-api or similar simple system). Reference the conference signup only in Module 2 (Chapter 2.7) where it's explicitly designed for.

### Pitfall 3: MDX Chapters Without Real Code Examples
**What goes wrong:** Chapter 0.5 "Your First CALM Document" references CALM JSON inline (as a code block) but the file doesn't exist in `code-examples/`. CI fails or learners can't reference the file.
**Why it happens:** Author writes the chapter before running calmstudio-mcp to produce the code example.
**How to avoid:** Follow production workflow order: author text → create code example → validate → reference. Never use `// ...` truncation.

### Pitfall 4: Lab Requires Docker When It Shouldn't
**What goes wrong:** LAB-01 is specified as Docker-free (the requirement explicitly says "Docker-free 15-min on-ramp lab"). Adding a docker-compose.yml or docker-dependent step blocks learners without Docker.
**Why it happens:** Lab format template includes docker-compose.yml as an optional file; easy to add without checking the requirement.
**How to avoid:** Set `requires_docker: false` in LAB.md frontmatter. Use `npx @finos/calm-cli` (Node.js only dependency) and CALM Studio web (browser-only). No Docker.

### Pitfall 5: Quiz file_path format not matching QUIZ-FORMAT.md schema
**What goes wrong:** Quiz question `id` fields don't match `qNN.N.N` format, or `reference_section` paths point to non-existent files. CI lint fails.
**Why it happens:** Copy-paste from examples without updating IDs or paths.
**How to avoid:** Validate quiz YAML manually against QUIZ-FORMAT.md before commit. IDs must be `q0.1.1`, `q0.4.1`, `q0.5.1`, `q0.5.2`. Reference sections must point to real MDX file paths.

### Pitfall 6: Illustration SVG Mismatch (source newer than exported)
**What goes wrong:** CI warns "`.excalidraw` is newer than `.svg`" — export not regenerated after editing source.
**Why it happens:** User edits Excalidraw source but doesn't run export script.
**How to avoid:** Run `scripts/export-excalidraw.sh <name>` after each illustration edit. Alternatively, add pre-commit hook (documented in ILLUSTRATION-STANDARDS.md).

---

## Code Examples

### Minimal CALM 1.2 architecture (verified structure)
[VERIFIED: architecture-as-code/calm/release/1.2/meta/core.json + calm/architecture/calm-1.json]

```json
{
  "$schema": "https://calm.finos.org/release/1.2/meta/calm.json",
  "unique-id": "my-system",
  "name": "My System",
  "description": "A description of my system",
  "nodes": [
    {
      "unique-id": "user",
      "node-type": "actor",
      "name": "User",
      "description": "End user of the system"
    }
  ],
  "relationships": []
}
```

Required top-level properties for CALM 1.2 architecture: `$schema`, `unique-id`, `name`, `description`. [VERIFIED: calm-ai/tools/architecture-creation.md]

### CALM validate output format (validated CLI behavior)
[VERIFIED: calm-ai/tools/calm-cli-instructions.md]

```bash
# Default JSON output
npx @finos/calm-cli validate -a my-system.architecture.json
# → { "jsonSchemaValidationOutputs": [], "spectralSchemaValidationOutputs": [], "hasErrors": false, "hasWarnings": false }

# Pretty (human-readable) output
npx @finos/calm-cli validate -a my-system.architecture.json -f pretty
# → shows readable success/failure list

# JUnit (CI format)
npx @finos/calm-cli validate -a my-system.architecture.json -f junit -o results.xml
```

Exit code 1 = errors found. Exit code 0 = valid (warnings don't cause failure unless `--strict`).

### The 9 core CALM node types (exhaustive, no additions allowed)
[VERIFIED: architecture-as-code/calm/release/1.2/meta/core.json#/defs/node-type-definition]

| Type | Use for |
|------|---------|
| `actor` | End user, external system, anything that initiates |
| `ecosystem` | Runtime environment (K8s cluster, agent sandbox) |
| `system` | Logical bounded context, architectural layer |
| `service` | Microservice, API, stateful internal component |
| `database` | Any data persistence (SQL, NoSQL, cache) |
| `network` | Load balancer, firewall, VPN, CDN |
| `ldap` | Identity provider, directory service |
| `webclient` | Browser app, mobile app, any frontend |
| `data-asset` | Files, datasets, S3 buckets, data streams |

### The 5 CALM relationship types
[VERIFIED: architecture-as-code/calm/release/1.2/meta/core.json#/defs/relationship]

| Type | Structure | Use for |
|------|-----------|---------|
| `interacts` | `{ actor: string, nodes: string[] }` | Actor/human using a node |
| `connects` | `{ source: { node: string }, destination: { node: string } }` | Service-to-service calls (add `protocol`) |
| `deployed-in` | `{ container: string, nodes: string[] }` | Components inside an ecosystem/runtime |
| `composed-of` | `{ container: string, nodes: string[] }` | Structural containment |
| `options` | Array of decision objects | Architectural decision branches |

### Protocol enum (valid values only)
[VERIFIED: core.json#/defs/protocol]

`HTTP`, `HTTPS`, `FTP`, `SFTP`, `JDBC`, `WebSocket`, `SocketIO`, `LDAP`, `AMQP`, `TLS`, `mTLS`, `TCP`

### calmstudio-mcp workflow for a beginner (Module 0 Chapters 0.4/0.5)
[CITED: ~/.claude/skills/calm-arb-convert/SKILL.md + CURRICULUM.md Chapter 0.4]

For Module 0, the learner uses a simplified version of the MCP workflow (not the full calm-arb-convert ARB workflow):

1. Open AI client (Claude Code / Cursor / Windsurf) with calmstudio-mcp configured
2. Ask AI to describe their system using CALM — AI calls `read_calm_guide()` first
3. AI calls `create_architecture` with nodes + relationships
4. AI calls `finalize_architecture` (validates, auto-attaches AIGF if ai:* nodes present)
5. AI calls `export_calm` to produce the `.calm.json` file
6. Learner runs `npx @finos/calm-cli validate -a <file>.architecture.json` to confirm

---

## State of the Art

| Old Approach | Current Approach | Notes |
|--------------|-----------------|-------|
| CALM 1.0-rc patterns (conference-signup.pattern.json) | CALM 1.2 architectures | Pin to 1.2 `$schema`; 1.0-rc patterns exist in repo but are legacy |
| `container`/`component` types used in early examples | Only 9 core types + 15 `ai:*` types | Enforce via validate; these types were never in the spec |
| Install CALM CLI globally | `npx @finos/calm-cli` on demand | 1.44.1 latest; npx avoids version conflicts during learning |
| Manual CALM JSON authoring | calmstudio-mcp AI-driven tool calls | MCP workflow is the Module 0 hook; forces spec compliance |
| Marp for slides | Marp or Reveal.js | No slide deck in Phase 1; deferred to Phase 2 for Module 1 |

**Deprecated/outdated:**
- `$schema: https://calm.finos.org/release/1.0-rc1/meta/calm.json` — use 1.2
- `$schema: https://calm.finos.org/release/1.0-rc2/meta/calm.json` — use 1.2
- `node-type: "container"` — never existed in spec; always invalid

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@calmstudio/mcp` is available via `npx @calmstudio/mcp` as stated in CURRICULUM.md | Standard Stack, Code Examples | Chapter 0.4 setup instructions would be wrong; lab step-1 check would fail |
| A2 | CALM Studio web (browser-based, zero-config) is available at a public URL for lab visualization step | Lab Format Pattern | Lab step-4 (visualize in CALM Studio) cannot be tested without URL |
| A3 | calmstudio-mcp tools include `read_calm_guide`, `create_architecture`, `finalize_architecture`, `export_calm` as documented in CURRICULUM.md | calmstudio-mcp workflow | Chapters 0.3/0.4 would have inaccurate tool descriptions |
| A4 | `npx @finos/calm-cli validate` command is usable without global install in learner environment | Lab LAB.md step-3 | If npx is not available, lab fails; `npm install -g @finos/calm-cli` is the alternative |

---

## Open Questions (RESOLVED 2026-06-15)

1. **calmstudio-mcp npm package verification — RESOLVED**
   - **Finding:** `@calmstudio/mcp` is NOT published on npm registry (404). `calmstudio-mcp` (unscoped) also not found.
   - **Actual install:** Local `.cjs` file at `/Users/gshah/.local/share/calmstudio-mcp/calmstudio-mcp.cjs`, version 0.0.0 (PR build from `fix/calm-studio-mcp-relationship-1-2-nested @ a08390f`, Jun 4 2026). Registered in Claude via `~/.claude.json` mcpServers as `node <path>`.
   - **Resolution for Chapter 0.4 and Lab setup:** Three paths for learners:
     - **Path A (Claude Code users):** calmstudio-mcp must be installed locally; no npm package exists yet. Instruction: "Check if `calmstudio-mcp` is already configured: run `claude mcp list` and look for it. If missing, install from the FINOS aac repo releases page."
     - **Path B (Claude Desktop / Cursor / Windsurf):** Add mcpServers block pointing to local `.cjs` file.
     - **Path C (Zero-install):** Use CALM Studio web — no MCP needed for visualization. This is the recommended path for Lab 0.
   - **Lab step-1 fix:** Remove `npx @calmstudio/mcp --version` check. Use `file_state` check on `~/.claude.json` containing `calmstudio-mcp` OR instruct learner to use CALM Studio web path and skip MCP check entirely.
   - **CURRICULUM.md note:** The `npx @calmstudio/mcp` instruction in CURRICULUM.md is aspirational future state pending npm publication.

2. **CALM Studio web public URL — RESOLVED**
   - **Finding:** URL not publicly confirmed from this environment. The CURRICULUM.md states "CALM Studio web (zero-config visual canvas)" without a URL. The aac repo codebase exists but hosted URL is unknown.
   - **Resolution for Lab step-4:** Describe visualization as optional/aspirational. Lab solution validation uses `calm validate` (CLI) as the primary check, not Studio visualization. Chapter 0.2 and 0.5 reference Studio as "open in CALM Studio if available"; include a note that the URL will be provided by the course platform.
   - **Placeholder:** Use `https://studio.calm.finos.org` in content with a `[verify URL]` annotation for human review before publication.

3. **Excalidraw illustration authoring timing — RESOLVED**
   - **Resolution:** Illustrations are user-authored in Excalidraw using the agentic skill. Plans create `.excalidraw` stubs with embedded authoring specs. User authors actual illustrations before phase gate. This is a documented manual step, tracked in VALIDATION.md ILL-01 gate note.

3. **Excalidraw illustration authoring responsibility**
   - What we know: User has the Excalidraw agentic skill; ILLUSTRATION-STANDARDS.md says "user authors illustration interactively in Excalidraw"
   - What's unclear: When in Phase 1 do illustrations get authored — before or after text chapters?
   - Recommendation: Planner should create tasks for (a) Claude Code writes illustration *specifications* and file stubs, (b) user authors in Excalidraw, (c) Claude Code runs export script. Illustrations should not block text authoring tasks but should be completed before phase sign-off.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `npx @finos/calm-cli` | Yes | v22.22.2 | — |
| npm / npx | CALM CLI, calmstudio-mcp | Yes | npm bundled with Node | — |
| `@finos/calm-cli` (npx) | Lab step-3, CI | Yes | 1.44.1 | `npm install -g @finos/calm-cli` |
| `@calmstudio/mcp` (npx) | Chapters 0.4/0.5, Lab step-1 | [ASSUMED] | unknown | Claude Desktop with manual mcpServers block |
| Excalidraw | ILL-01 illustration authoring | User-managed | Desktop or agentic skill | User's existing skill |
| CALM Studio web | Lab step-4 visualization | [ASSUMED] | unknown | VSCode extension or local CALM Studio |
| Docker | Lab-00 | Not required | — | N/A — explicitly Docker-free |

**Missing dependencies with no fallback:**
- None — lab is Docker-free; CALM CLI is available via npx

**Missing dependencies with fallback:**
- `@calmstudio/mcp` — if not available as `npx @calmstudio/mcp`, use Claude Desktop manual mcpServers config (described as "no-install" path in Chapter 0.4)
- CALM Studio web — if public URL unavailable, use VSCode extension or local install for lab visualization

---

## Validation Architecture

nyquist_validation is enabled (config.json: `"nyquist_validation": true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | No automated test framework for MDX content; validation is CLI-based |
| CALM JSON validation | `npx @finos/calm-cli validate -a <file>.architecture.json` |
| Quiz YAML validation | `scripts/lint-quizzes.sh` (not yet built — Wave 0 gap) |
| Lab verification | `scripts/test-lab.sh lab-00-on-ramp` (not yet built — Wave 0 gap) |
| Quick run command | `npx @finos/calm-cli validate -a code-examples/module-00-on-ramp/todo-api.architecture.json` |

### Phase Requirements — Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| MOD-01 | 5 MDX chapters present and readable | file_state | `ls content/module-00-on-ramp/*.mdx \| wc -l` → 5 | No — Wave 0 |
| MOD-01 | MDX frontmatter valid (slug, module, chapter, estimated_minutes) | lint | `markdownlint content/module-00-on-ramp/*.mdx` | No — Wave 0 |
| LAB-01 | Lab validates end-to-end on clean machine | integration | `scripts/test-lab.sh lab-00-on-ramp` | No — Wave 0 |
| LAB-01 | `calm validate` on solution file exits 0 | unit | `npx @finos/calm-cli validate -a labs/lab-00-on-ramp/solution/*.architecture.json` | No — Wave 0 |
| QUIZ-01 | Quiz YAML schema valid | lint | `scripts/lint-quizzes.sh` | No — Wave 0 |
| QUIZ-01 | Quiz has exactly one correct answer per multiple_choice question | lint | (part of lint-quizzes.sh) | No — Wave 0 |
| ILL-01 | 3–5 SVG files exist in illustrations/exported/m00-* | file_state | `ls illustrations/exported/m00-*.svg \| wc -l` → 3 or more | No — Wave 0 |
| CODE-01 | `code-examples/module-00-on-ramp/*.architecture.json` validates | unit | `npx @finos/calm-cli validate -a code-examples/module-00-on-ramp/todo-api.architecture.json` | No — Wave 0 |

### Sampling Rate
- **Per task commit:** `npx @finos/calm-cli validate -a code-examples/module-00-on-ramp/*.architecture.json`
- **Per wave merge:** All file_state checks + CALM validation + markdownlint on chapters
- **Phase gate:** All checks above pass before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `scripts/lint-quizzes.sh` — covers QUIZ-01 schema validation
- [ ] `scripts/test-lab.sh` — covers LAB-01 end-to-end verification
- [ ] `scripts/validate-calm.sh` — covers CODE-01 (validates all code-examples/)
- [ ] `scripts/export-excalidraw.sh` — already stubbed in scripts/README.md, needs implementation

*(Note: markdownlint is standard npm package; no install gap for that tool)*

---

## Security Domain

Security enforcement is not explicitly set to false. However, Phase 1 is content authoring — no code deployed, no authentication, no user data. Standard content security applies:

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static content site; no auth in Phase 1 |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No user roles |
| V5 Input Validation | No | No user input processed |
| V6 Cryptography | No | No secrets or cryptographic material |

**Applicable content security concerns:**
- All CALM JSON code examples must be fictional/tutorial systems, not real production architectures from any organization
- No credentials, API keys, or PII should appear in any lab starter files or solution files
- Quiz YAML files must not contain answers that reveal internal architecture of real systems

---

## Sources

### Primary (HIGH confidence)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/core.json` — CALM 1.2 node types, relationship types, protocol enum, schema structure
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-ai/tools/node-creation.md` — node type reference, required properties
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-ai/tools/calm-cli-instructions.md` — CLI commands, validate output format, options
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-ai/tools/architecture-creation.md` — mandatory architecture top-level fields
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/LAB-FORMAT.md` — Learnforge lab YAML frontmatter, step check kinds
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/QUIZ-FORMAT.md` — quiz YAML schema, question types
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/STYLE-GUIDE.md` — MDX chapter structure, frontmatter fields, tone for M0
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/ILLUSTRATION-STANDARDS.md` — B&W style, shape language, file naming
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/PRODUCTION-WORKFLOW.md` — text-first sequence, phase ordering
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/CLAUDE.md` — spec constraints, no invented types, commit conventions
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/CURRICULUM.md` — chapter content, three paths, calmstudio-mcp setup, demo flow
- `~/.claude/skills/calm-arb-convert/SKILL.md` — complete MCP tool workflow, node type mapping table

### Secondary (MEDIUM confidence)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/architecture/calm-1.json` — working real-world CALM 1.2 architecture example
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-suite/calm-studio/packages/calm-core/src/aigf/mappings.ts` — complete `ai:*` node type list (15 types confirmed)
- `npm view @finos/calm-cli` — version 1.44.1 confirmed on npm registry

### Tertiary (LOW confidence / assumed)
- `@calmstudio/mcp` availability on npm registry — referenced in project docs but not confirmed from this environment
- CALM Studio public web URL — referenced in CURRICULUM.md but not confirmed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — CALM CLI confirmed at 1.44.1; node types verified from source schema
- Architecture (content layout): HIGH — all format specs exist in docs-meta/
- Pitfalls: HIGH — derived from enforced spec constraints and project authoring rules
- calmstudio-mcp availability: LOW — package name not resolvable from research environment

**Research date:** 2026-06-15
**Valid until:** 2026-12-15 (stable spec + toolchain; refresh if CALM 1.3 releases or calmstudio-mcp changes API)
