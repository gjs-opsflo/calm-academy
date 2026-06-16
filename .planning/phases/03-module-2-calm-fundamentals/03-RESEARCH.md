# Phase 3: Module 2 — CALM Fundamentals — Research

**Researched:** 2026-06-16
**Domain:** CALM 1.2 Specification authoring, educational content production
**Confidence:** HIGH

---

## Summary

Phase 3 produces Module 2: the CALM spec vocabulary module. It is the most technically precise module in the course — learners must be able to read and write valid CALM 1.2 JSON after completing it. This research phase established the authoritative answers to the core technical questions (node types, relationship types, interface shapes, control structure, decorator schema) by reading the canonical schema files directly from the local `architecture-as-code` repo.

The CALM 1.2 spec (at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/`) defines exactly 9 core node types in an `anyOf` enum (the second branch is an open `"type": "string"` extension hook — not for learners to use freely), exactly 5 relationship types via `oneOf`, an extensible interface system based on `definition-url` + `config` pattern with example reference implementations in `/calm/interfaces/example/`, and a controls schema using keyed objects with `description` + `requirements[]`. Decorators (new in 1.2) attach cross-cutting metadata via `unique-id`, `type`, `target`, `applies-to`, and free-form `data`. The trading-system example in the docs confirms the exact JSON structure learners must produce.

The conference signup system is ALREADY the canonical tutorial in the CALM getting-started directory — as a pattern (`.pattern.json`). Lab 2 should generate an architecture FROM this pattern (using `calm generate -p conference-signup.pattern.json`) and then the learner hand-writes an architecture file that satisfies it. This is the cleanest Lab 2 design: the pattern is the spec, the learner produces the conforming architecture.

**Primary recommendation:** Author 7 MDX chapters strictly from the 1.2 schema files (not from memory). Every code example must validate against the schema. Lab 2 uses conference-signup as a build-up exercise — introduce nodes one at a time, then add relationships, then interfaces, then controls. The cheatsheet is the single-page distillation of core.json + control.json + decorators.json.

---

## Project Constraints (from CLAUDE.md)

### Spec precision
- CALM has exactly 9 core node types: `actor`, `ecosystem`, `system`, `service`, `database`, `network`, `ldap`, `webclient`, `data-asset`. NO `container`, NO `component`. [VERIFIED: /calm/release/1.2/meta/core.json]
- 15 `ai:*` types are for Module 5 only — do not introduce in Module 2.
- Every `.architecture.json` must validate with `npx @finos/calm-cli validate` before commit.
- Use `calmstudio-mcp` (local `.cjs`) — NOT `npx @calmstudio/mcp` (not on npm).

### Authoring conventions
- Text lessons: `content/module-NN-<slug>/<chapter>.mdx` (kebab-case)
- Code examples: `code-examples/<module>/` — `.architecture.json` naming
- Illustrations: `illustrations/source/m02-*.excalidraw` + `illustrations/exported/m02-*.svg`
- Quiz: `quizzes/module-02-calm-fundamentals.yaml`
- Slides: `slides/module-02-calm-fundamentals.md` (Marp format)
- Commit convention: `feat(module-02):`, `docs(module-02):` — no Co-Authored-By
- Text-first: never produce slides before illustrations exist; never produce video script before text exists.

### Production workflow
1. Author text lesson (MDX)
2. Create Excalidraw stubs (user authors illustrations)
3. Generate slide deck from text + illustrations
4. (Video deferred to future phase)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOD-03 | Module 2 has 7 fully-authored MDX chapters covering all CALM language constructs: nodes (9 core types), relationships, interfaces, controls, decorators, metadata, and building a first full architecture | Chapters mapped to schema sections; 7-chapter structure confirmed from CURRICULUM.md |
| LAB-02 | Lab 2 (conference signup architecture) — learner writes complete valid CALM JSON by hand from a spec description, passes `calm validate`, reviews in Studio | Conference-signup pattern file exists in getting-started; architecture must satisfy it; calm validate available via npx |
| QUIZ-03 | Module 2 quiz — comprehensive vocabulary coverage: all 9 core node types, relationship types, interface shapes, control patterns, decorator syntax | 7 chapters = 7 chapter groups, 2–3 questions each = 16–21 questions target |
| ILL-03 | Module 2 has 10–15 Excalidraw B&W illustrations: all 9 node types, relationship types, interface patterns, control decorator flow, sample architecture build-up sequence | 13 illustration stubs planned — see Architecture Patterns section |
| SLIDE-02 | Module 2 slide deck — 30–40 slides with all node types and relationship visual examples | Derives from 7 chapter text + 13 illustrations; node type gallery = ~9 slides |
| CODE-01 | Every `.calm.json` file in `code-examples/` passes `calm validate` — enforced by CI check | Validated via `npx @finos/calm-cli validate -a <file>` |
| CODE-02 | Module 2 cheatsheet published — 1-page printable covering all node types, relationship types, and key metadata fields | Cheatsheet content derived directly from core.json enum values |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| CALM JSON authoring | Content (MDX text) | Code Examples (validated .json) | Text teaches the spec; code examples prove it works |
| Spec validation (calm validate) | CI layer | Lab execution | CI enforces on every PR; lab teaches learner to run locally |
| Illustration authoring | User (Excalidraw manual) | Code (export script) | User owns illustration authoring; code handles SVG export |
| Quiz auto-grading | YAML data file | MDX quiz component | Quiz data is static YAML; rendering is Docusaurus component |
| Slide deck generation | Content author | Marp renderer | Text is source; slides are derived artifact |
| Lab verification | Learner CLI execution | CI (automated) | Learner runs `calm validate` locally; CI gates the solution branch |

---

## CALM 1.2 Specification — Authoritative Findings

All claims in this section are `[VERIFIED: /Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/]`.

### Node Types

The 9 core node types are defined as an `anyOf` in `core.json#/defs/node-type-definition`:

```json
"anyOf": [
  {
    "enum": [
      "actor", "ecosystem", "system", "service", "database",
      "network", "ldap", "webclient", "data-asset"
    ]
  },
  { "type": "string" }
]
```

The second branch (`"type": "string"`) is an extension hook — it allows future extension packs (AWS node types, etc.) but is NOT a license for learners to invent types. The validator will accept arbitrary strings here; spec discipline (and course teaching) is what prevents `container`/`component` abuse.

**Node required fields:** `unique-id`, `node-type`, `name`, `description`

**Node optional fields:** `details` (with `detailed-architecture`, `required-pattern`), `interfaces[]`, `controls`, `metadata`

### Relationship Types

Exactly 5 relationship types defined via `oneOf` in `core.json#/defs/relationship`:

| Type | Required sub-fields | Semantic meaning |
|------|---------------------|------------------|
| `connects` | `source.node`, `destination.node` | Point-to-point communication — optionally with `protocol` |
| `interacts` | `actor` (string), `nodes[]` | Actor or agent interacting with one or more nodes |
| `deployed-in` | `container` (string), `nodes[]` | Runtime deployment (nodes live inside the container node) |
| `composed-of` | `container` (string), `nodes[]` | Structural containment (system/service boundary) |
| `options` | array of `decision` objects | Architectural decision branches (ADR-in-spec) |

The `options` type takes an array of `decision` objects, each with `description`, `nodes[]`, and `relationships[]` (controls optional). This is the most complex type — rarely used in beginner architectures.

**Relationship required fields:** `unique-id`, `relationship-type`

**Protocol enum (on `connects` relationship, at top level):**
```
HTTP, HTTPS, FTP, SFTP, JDBC, WebSocket, SocketIO, LDAP, AMQP, TLS, mTLS, TCP
```

### Interface Schema (CALM 1.2)

In CALM 1.2, `interface.json` defines two forms:

**Form 1: `interface-definition`** (formal, machine-readable)
- Required: `unique-id`, `definition-url` (URI to external schema), `config` (inline JSON conforming to that schema)
- `additionalProperties: false` — must be exact match

**Form 2: `interface-type`** (informal, freeform)
- Required: `unique-id` only
- `additionalProperties: true` — any fields allowed
- This is what the trading-system example uses (e.g., `"protocol": "HTTPS"`, `"port": 18092`, `"schema": {...}`)

The example interface definitions at `/calm/interfaces/example/` are:
- `url.json` — `{ url: string }` — for webclient-style URL interfaces
- `tcp-host-port.json` — `{ host: hostname, port: integer }` — for TCP services
- `tcp-port.json` — `{ port: integer }` — port only
- `container-image.json` — for Docker image references

In practice (per trading-system and conference-signup), the `interface-type` (Form 2) is used with free-form properties like `name`, `description`, `protocol`, `port`, `schema` (with sub-properties `specification`, `operations[]`). The `definition-url` pattern is the newer, more formal approach.

**Teaching strategy:** Introduce Form 2 (freeform) first for simplicity. Show Form 1 (definition-url) as the formal pattern for organization-wide standards.

### Control Schema

Controls are keyed objects at `core.json` level (or per node/relationship/flow):

```json
"controls": {
  "<control-key>": {
    "description": "string — how this control applies here",
    "requirements": [
      {
        "requirement-url": "URI to control requirement schema",
        "config": { ... }  // OR "config-url": "URI"
      }
    ]
  }
}
```

Key rules:
- Control key must match `^[a-zA-Z0-9-]+$`
- `requirement-url` is required; either `config` (inline) or `config-url` (external) is required (oneOf)
- Controls can attach to: top-level architecture, individual nodes, individual relationships, flows
- The `requirement-url` points to a JSON Schema defining what the control expects (e.g. `micro-segmentation.requirement.json`)
- The `config` satisfies that schema (e.g. `{ "permit-ingress": true, "permit-egress": false }`)

**Example from trading-system (top-level control):**
```json
"controls": {
  "encryption-in-transit": {
    "description": "All data transmitted between system components must be encrypted...",
    "requirements": [{
      "requirement-url": "https://example.com/security/encryption-in-transit.json",
      "config": { "protocol": "TLS", "minimumVersion": "1.3" }
    }]
  }
}
```

### Decorator Schema (new in CALM 1.2)

Decorators are NOT part of the core architecture document — they are separate documents that reference it. Schema at `decorators.json`:

```json
{
  "unique-id": "string",
  "type": "string — free-form decorator category",
  "target": ["file paths or URLs to CALM documents this decorator targets"],
  "applies-to": ["unique-ids of nodes/relationships/flows this applies to"],
  "data": { "minProperties": 1 }  // free-form JSON
}
```

**Important pedagogical point:** Decorators are not embedded inside an architecture document — they are separate JSON files that point at it. This enables post-hoc enrichment (governance overlays, threat models, deployment metadata) without modifying the core architecture. AIGF and threat model decorators follow this pattern.

### Metadata Schema

Metadata is flexible — either an array of objects OR a single object with `additionalProperties: true`:

```json
"metadata": {
  "oneOf": [
    { "type": "array", "items": { "type": "object" } },
    { "type": "object", "additionalProperties": true }
  ]
}
```

The trading-system uses metadata as an array: `[{ "name": "...", "version": "0.1.0", "created-by": "..." }]`. Individual node metadata is often an object: `{ "data-classification": "PII" }`.

### Flow Schema

Flows model business processes as ordered sequences of relationship traversals:

```json
{
  "unique-id": "string",
  "name": "string",
  "description": "string",
  "transitions": [
    {
      "relationship-unique-id": "reference to a relationship",
      "sequence-number": 1,
      "description": "what happens in this step",
      "direction": "source-to-destination | destination-to-source"
    }
  ]
}
```

Flows are OPTIONAL in Module 2 — the trading-system example uses them extensively, but for Lab 2 (conference signup) they add complexity. Introduce flows as a bonus concept in Chapter 2.7.

### Timeline Schema (new in CALM 1.2)

Timelines are separate documents (not embedded in architecture). Structure:
- `moments[]` — each moment is a `node` with `node-type: "moment"`, plus `valid-from` (date) and `details.detailed-architecture` (link to architecture file for that snapshot)
- `current-moment` — string reference to which moment is current

Timelines are a Module 4 topic — do NOT cover in Module 2 beyond a single mention.

### ADRs (Architecture Decision Records)

Top-level `adrs` field: just an array of strings (URLs or references). This is the simplest feature in the spec. Mention briefly in Chapter 2.1.

---

## The Conference Signup System — Lab 2 Design

### Source Pattern

The conference signup pattern is the canonical FINOS getting-started example, at:
`/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/getting-started/conference-signup.pattern.json`

It defines a 5-node architecture:

| Node | Type | Purpose |
|------|------|---------|
| `conference-website` | `webclient` | The signup portal |
| `load-balancer` | `network` | Traffic routing |
| `attendees` | `service` | Attendees backend service |
| `attendees-store` | `database` | Persistent attendee storage |
| `k8s-cluster` | `system` | Kubernetes deployment environment |

**Note:** The pattern uses `"node-type": "system"` for the k8s cluster (not `"network"`), though the complex example also shows `network` for load balancers. Both are spec-valid. The pattern is the authority here.

Relationships:
- `conference-website` **connects** `load-balancer` (HTTPS)
- `load-balancer` **connects** `attendees` (mTLS)
- `attendees` **connects** `attendees-store` (JDBC)
- `deployed-in` k8s-cluster: load-balancer, attendees, attendees-store

### Lab 2 Structure

**Goal:** Write a conference signup architecture by hand that validates against the CALM schema.

**Lab approach (not generate-from-pattern):** The pattern file uses `const` assertions appropriate for a pattern (not an architecture). Lab 2 should have learners write a fresh `conference-signup.architecture.json` from the chapter's step-by-step instructions. They validate with `npx @finos/calm-cli validate -a conference-signup.architecture.json`.

**Step-by-step build-up:**
1. Create the skeleton with `$schema` pointing to CALM 1.2
2. Add the 5 nodes one at a time (actor → webclient → network → service → database, then system)
3. Add relationships in order: interacts, connects (3 variations), deployed-in
4. Add one interface to the service node (freeform style: `unique-id`, `name`, `protocol`, `port`)
5. Add one control to the architecture or a relationship
6. Run `npx @finos/calm-cli validate -a` — should pass
7. Visualize in CALM Studio web

**Why not `calm generate`:** `calm generate` instantiates from a pattern by filling in blanks. That's a Module 3 concept (CLI toolchain). Module 2 Lab is about learning the JSON structure by writing it.

**Actor node addition:** The pattern does not include an actor (user/attendee who visits the site). Lab 2 should ADD a `conference-attendee` actor node with an `interacts` relationship to the webclient. This gives learners all 5 node types used in the system.

### Conference Signup Architecture — Code Example Plan

`code-examples/module-02-calm-fundamentals/conference-signup.architecture.json`

This is the MODULE 2 anchor code example — the complete, working, validated architecture that Lab 2 builds toward. It covers:
- 6 nodes (5 from pattern + actor)
- 5 relationships (interacts, connects x3, deployed-in)
- 1 interface on the service node
- 1 control on a relationship
- metadata block

---

## Code Examples Plan (MODULE-02 code-examples)

**Required code examples (CODE-01: all must pass `calm validate`):**

| File | Nodes | Purpose | Concepts demonstrated |
|------|-------|---------|----------------------|
| `conference-signup.architecture.json` | 6 | Lab 2 anchor + Chapter 2.7 | All 5 relationship types (starter set), interface, control, metadata |
| `node-types-reference.architecture.json` | 9 | Chapter 2.2 reference | All 9 core node types with realistic names + descriptions |
| `relationship-types-reference.architecture.json` | ~8 | Chapter 2.3 reference | All 5 relationship types demonstrated |
| `with-interfaces.architecture.json` | 4 | Chapter 2.4 | Both interface forms (freeform + definition-url) |
| `with-controls.architecture.json` | 4 | Chapter 2.5 | Top-level + node-level + relationship-level controls |

**Total: 5 code examples.** The existing `todo-api.architecture.json` in module-00 already demonstrates the simplest 4-node pattern — don't re-create it.

All examples in subdirectory: `code-examples/module-02-calm-fundamentals/`

---

## Standard Stack

### Content Production Tools

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| `@finos/calm-cli` | 1.44.1 (npx) | Validate `.architecture.json` files | Official FINOS CALM validator — confirmed available via `npx @finos/calm-cli` |
| `calmstudio-mcp` | local .cjs | AI-driven CALM JSON authoring | Only way to create/validate CALM JSON with AI assistance; NOT on npm |
| Docusaurus | (existing site) | Render MDX text lessons | Already in use; Module 2 files slot into `content/module-02-calm-fundamentals/` |
| Marp | (existing) | Slide deck from Markdown | Already used for SLIDE-01; same toolchain for SLIDE-02 |
| Excalidraw | (manual) | Illustration authoring | User-owned agentic skill; stubs created by code |
| `jq` | system | Validate JSON files (quiz stubs, excalidraw) | Already used in `lint-quizzes.sh` |
| `bash scripts/lint-quizzes.sh` | (existing) | Validate YAML quiz format | Existing validation script; Module 2 quiz must pass it |

[VERIFIED: `npx @finos/calm-cli --version` returns `1.44.1`]
[VERIFIED: `calmstudio-mcp` installed at `/Users/gshah/.local/share/calmstudio-mcp/calmstudio-mcp.cjs`]

### Package Legitimacy Audit

This phase installs no new npm packages. `@finos/calm-cli` is used via `npx` (already verified working in Phase 1). No new package installs required.

---

## Architecture Patterns

### Content Flow

```
CURRICULUM.md (Module 2 spec)
       ↓
7 MDX chapters (content/module-02-calm-fundamentals/)
       ↓
5 code examples (code-examples/module-02-calm-fundamentals/)  ←→  calm validate (npx)
       ↓
13 Excalidraw illustration stubs (illustrations/source/m02-*)
       ↓
YAML quiz (quizzes/module-02-calm-fundamentals.yaml)
       ↓
Marp slide deck (slides/module-02-calm-fundamentals.md)
       ↓
Lab 2 (labs/lab-02-conference-signup/LAB.md + starter/ + solution/)
       ↓
Cheatsheet (docs-meta/cheatsheets/module-02-cheatsheet.md)
```

### Recommended Project Structure (new files)

```
content/
└── module-02-calm-fundamentals/
    ├── calm-specification.mdx           # Ch 2.1 — The CALM Specification
    ├── nodes.mdx                        # Ch 2.2 — Nodes: Modeling System Components
    ├── relationships.mdx                # Ch 2.3 — Relationships: Connecting the Dots
    ├── interfaces.mdx                   # Ch 2.4 — Interfaces: Describing Communication Contracts
    ├── controls.mdx                     # Ch 2.5 — Controls: Encoding Non-Functional Requirements
    ├── decorators.mdx                   # Ch 2.6 — Decorators: Cross-Cutting Concerns
    └── building-your-first-architecture.mdx  # Ch 2.7 — Building a First Architecture

code-examples/
└── module-02-calm-fundamentals/
    ├── conference-signup.architecture.json
    ├── node-types-reference.architecture.json
    ├── relationship-types-reference.architecture.json
    ├── with-interfaces.architecture.json
    └── with-controls.architecture.json

illustrations/
├── source/
│   ├── m02-node-types-gallery.excalidraw
│   ├── m02-actor-node.excalidraw
│   ├── m02-system-vs-service-vs-ecosystem.excalidraw
│   ├── m02-relationship-types.excalidraw
│   ├── m02-connects-vs-interacts.excalidraw
│   ├── m02-deployed-in-composed-of.excalidraw
│   ├── m02-interface-anatomy.excalidraw
│   ├── m02-control-anatomy.excalidraw
│   ├── m02-decorator-external-overlay.excalidraw
│   ├── m02-conference-signup-step1-nodes.excalidraw
│   ├── m02-conference-signup-step2-relationships.excalidraw
│   ├── m02-conference-signup-step3-complete.excalidraw
│   └── m02-calm-document-structure.excalidraw
└── exported/
    └── m02-*.svg (13 placeholders)

quizzes/
└── module-02-calm-fundamentals.yaml   # ~18 questions, 2–3 per chapter

slides/
└── module-02-calm-fundamentals.md     # 30–40 Marp slides

labs/
└── lab-02-conference-signup/
    ├── LAB.md
    ├── starter/
    │   └── conference-signup.architecture.json  # skeleton, incomplete
    └── solution/
        └── conference-signup.architecture.json  # complete, validates

docs-meta/cheatsheets/
└── module-02-cheatsheet.md            # 1-page printable — CODE-02
```

### Module 2 Chapter Structure (7 chapters)

**Ch 2.1 — The CALM Specification** (~1800 words)
- JSON Schema as the foundation — why JSON over YAML/DSL
- Spec structure: `$schema`, `unique-id`, `name`, `description`, `nodes`, `relationships`, `metadata`, `controls`, `flows`, `adrs`
- Spec versioning (`https://calm.finos.org/release/1.2/meta/calm.json`)
- The governance process: Draft → RC → Release
- What validation means: schema conformance vs pattern conformance
- Anti-pattern: `additionalProperties: true` on node means validator accepts extra fields — spec discipline is cultural, not just technical

**Ch 2.2 — Nodes: Modeling System Components** (~2500 words)
- Each of the 9 types with: real-world examples, what it maps to, when to choose it vs. an alternative
- `actor`: initiating entity (human or external system) — does NOT own infrastructure
- `ecosystem`: runtime environment (K8s cluster, agent sandbox, AWS VPC) — things that OTHER nodes are `deployed-in`
- `system`: logical boundary / domain (the system-of-systems wrapper) — things that `compose-of` other nodes
- `service`: a running process exposing capabilities — microservice, API, batch job
- `database`: any persistence (SQL, NoSQL, in-memory cache, object store)
- `network`: L3/L4 infrastructure between nodes (load balancer, firewall, VPN, CDN) — not the same as `ecosystem`
- `webclient`: any browser/mobile/desktop UI
- `ldap`: identity provider, directory service — narrow use case
- `data-asset`: files, datasets, S3 buckets, Kafka topics, streams
- Common mistakes table: when architects reach for `container`/`component` — and what to use instead
- Node `unique-id` conventions: kebab-case, system-scoped

**Ch 2.3 — Relationships: Connecting the Dots** (~2200 words)
- Why relationship TYPES carry semantic meaning (not just arrows)
- All 5 types with examples:
  - `connects`: the workhorse. ALWAYS between two SPECIFIC nodes. Add `protocol` (HTTPS, JDBC, etc.)
  - `interacts`: actor-initiated. The `actor` field is a string (unique-id of an actor node)
  - `deployed-in`: runtime. The `container` must be an `ecosystem` (usually). `nodes[]` are what's inside.
  - `composed-of`: structural. The `container` is usually a `system`. Models logical grouping.
  - `options`: decision points. Rarely used; models "this could be A OR B". Each option has nodes[] and relationships[]
- Protocol taxonomy: when to use HTTPS vs mTLS vs AMQP vs JDBC vs TCP
- Direction: `connects` has `source` and `destination`; `interacts` has `actor` and `nodes[]`
- `interacts` can point to multiple nodes: `"nodes": ["portal", "mobile-app"]`

**Ch 2.4 — Interfaces: Describing Communication Contracts** (~1800 words)
- What an interface is: the formal technical contract on a node (not the relationship)
- Relationship = logical connectivity; Interface = technical API spec
- Two forms: freeform (`unique-id` + any properties) vs formal (`definition-url` + `config`)
- Freeform example: `{ "unique-id": "...", "name": "REST API", "protocol": "HTTPS", "port": 8080 }`
- The `connects` relationship references interfaces via `source.interfaces[]` and `destination.interfaces[]`
- Interface schemas in `/calm/interfaces/example/`: url, tcp-host-port, tcp-port, container-image
- Why interfaces enable automated security scanning: tools can introspect port/protocol/auth
- Common mistake: confusing `protocol` on the relationship vs `protocol` on the interface

**Ch 2.5 — Controls: Encoding Non-Functional Requirements** (~2000 words)
- What controls are: testable compliance requirements, not prose policies
- Control anatomy: `<key>: { description, requirements: [{ requirement-url, config }] }`
- Where controls attach: top-level architecture, individual nodes, relationships, flows
- The `requirement-url` → `config` pattern: requirement is the SCHEMA, config is the IMPLEMENTATION
- Walking through the micro-segmentation example from getting-started
- FINOS CCC: what it is (Layer 2 Gemara asset); how it provides requirement schemas (briefly — full treatment in Module 4)
- Control domains: security, availability, performance, resilience
- Common mistake: describing a control in prose but not encoding it (`"requirements": []` is invalid)

**Ch 2.6 — Decorators: Cross-Cutting Concerns** (~1800 words)
- What decorators are (new in CALM 1.2): SEPARATE documents that point AT architecture documents
- They do NOT modify the core architecture — they enrich it from outside
- Decorator anatomy: `unique-id`, `type`, `target[]` (file paths to arch docs), `applies-to[]` (node/rel unique-ids), `data` (free-form)
- Decorator `type` examples: `"threat"`, `"governance"`, `"deployment-info"`, `"aigf"`, `"saif"`
- Threat model decorators: attaching STRIDE categories to architectural components
- Pattern decorators: marking nodes as instances of known patterns
- The AIGF decorator: auto-attaches when `ai:*` nodes detected (brief mention — full in Module 5)
- Why external: enables governance overlays from different teams/tools without touching the canonical architecture file

**Ch 2.7 — Your First Architecture in CALM** (~2000 words)
- Chapter purpose: synthesis — build the conference signup system step by step
- Tools introduction: `npx @finos/calm-cli validate`, CALM Studio web
- Step 1: Create the skeleton (`$schema`, `unique-id`, `name`, `description`)
- Step 2: Add nodes one at a time (actor, webclient, network, service, database, system)
- Step 3: Add relationships (`interacts`, `connects` x3, `deployed-in`)
- Step 4: Add an interface to the service
- Step 5: Add a control
- Step 6: Run `npx @finos/calm-cli validate -a conference-signup.architecture.json`
- Step 7: Open CALM Studio web, import the JSON, explore the canvas
- Common errors and what the validator says
- Link to Lab 2 — learner now does this themselves

### Anti-Patterns to Avoid in Teaching

- **Invented node types:** The spec's `anyOf` second branch (`"type": "string"`) is an extension hook, not an invitation. The validator accepts `"node-type": "container"` — the course teaches why this destroys interoperability.
- **Skipping `description`:** Required field on nodes. Many learners skip it. Validator will reject.
- **Protocol on wrong object:** `protocol` belongs on the RELATIONSHIP (top level), not inside the `connects` type object.
- **Confusing `deployed-in` vs `composed-of`:** `deployed-in` = runtime. `composed-of` = logical structure. A K8s cluster is typically `deployed-in`; a system boundary is `composed-of`.
- **Decorators inside the architecture:** Decorators are separate documents with a `target` array. Embedding decorator data inside a node's `metadata` is not wrong but loses the cross-architecture enrichment benefit.
- **Missing `requirement-url` in controls:** Learners may try to write a control with only `description` — the schema requires at least one requirement with a `requirement-url`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CALM JSON validation | Custom JSON Schema validator | `npx @finos/calm-cli validate -a` | Official tool — handles $ref resolution, schema registry, pattern validation |
| CALM JSON authoring in AI sessions | Manual JSON typing | `calmstudio-mcp` tools | MCP tools enforce spec correctness at creation time; `read_calm_guide` + `finalize_architecture` guarantee valid output |
| Interface schema definitions | Custom per-project interface objects | FINOS official interfaces at `/calm/interfaces/example/` | Reusable schemas; `definition-url` pattern enables cross-org standardization |
| Control requirement schemas | Custom YAML control definitions | FINOS CCC (Common Controls Catalog) | CCC is Gemara Layer 2; reuse ensures audit-recognizable control IDs |
| Slide rendering from Markdown | Custom tooling | Marp (already in use) | Already established in Phase 2 for SLIDE-01 |
| Quiz linting | Manual YAML review | `bash scripts/lint-quizzes.sh` | Already exists and enforced — Module 2 quiz must pass this |

---

## Common Pitfalls

### Pitfall 1: The `anyOf` Extension Trap
**What goes wrong:** Learner or content author tests `"node-type": "microservice"` in the validator — it passes. Incorrectly concludes that arbitrary node types are allowed.
**Why it happens:** The schema's `anyOf` allows any string as a second branch (extension hook for future extension packs). The validator cannot enforce the 9-type discipline — only course teaching and tooling conventions can.
**How to avoid:** Explicitly teach this in Chapter 2.2. Show the schema. Explain the difference between "schema allows" and "spec intends." Use calmstudio-mcp which enforces the 9 types via `read_calm_guide`.
**Warning signs:** Learner quiz answers or code submissions using `container`, `component`, `microservice`, `pod`.

### Pitfall 2: Protocol Placement Confusion
**What goes wrong:** Learner puts `"protocol": "HTTPS"` inside the `connects` object instead of at the relationship top level.
**Why it happens:** Intuitively, protocol seems like it belongs to the connect action. In CALM JSON, `protocol` is a sibling of `relationship-type`, not a child of `connects`.
**How to avoid:** Show the diff explicitly in a code callout in Chapter 2.3. Make Chapter 2.7 step 3 explicitly demonstrate correct protocol placement.
**Warning signs:** `calm validate` error: `protocol must be at top level of relationship`.

### Pitfall 3: Decorator Scope Confusion
**What goes wrong:** Learner embeds `threat-model` data inside the architecture JSON instead of creating a separate decorator document.
**Why it happens:** The metadata field accepts free-form data, so arbitrary threat model data "works" syntactically.
**How to avoid:** Emphasize in Chapter 2.6 that decorators are SEPARATE files. Show the `target` array pointing at the architecture file path. Show the `applies-to` array pointing at node unique-ids.
**Warning signs:** Chapter 2.6 exercises showing architecture files with embedded threat data.

### Pitfall 4: `deployed-in` Container Must Be a Declared Node
**What goes wrong:** Learner writes `"deployed-in": { "container": "prod-cluster", "nodes": [...] }` but `prod-cluster` is not declared in the nodes array.
**Why it happens:** The container field is just a string (unique-id reference) — the validator does not always catch forward references depending on how strict mode is configured.
**How to avoid:** Always declare the ecosystem/system node BEFORE writing the relationship that references it.
**Warning signs:** Lab 2 solutions where `calm validate` passes but CALM Studio renders disconnected nodes.

### Pitfall 5: Large vs. Small Schemas — Which $schema URL?
**What goes wrong:** Learner uses `https://calm.finos.org/release/1.1/meta/calm.json` (older version) in Module 2 examples, missing decorators/timelines or using deprecated interface types.
**Why it happens:** Training data, Stack Overflow, older blog posts reference older versions.
**How to avoid:** ALWAYS use `"$schema": "https://calm.finos.org/release/1.2/meta/calm.json"` in all Module 2 code examples. Verify this in CI.
**Warning signs:** Code examples with `1.0`, `1.0-rc1`, `1.1` in the schema URL.

### Pitfall 6: `interacts` Requires an Actor Node Type
**What goes wrong:** Learner uses `"interacts"` with a `service` node as the `actor` field.
**Why it happens:** The word "actor" in common usage means "anything that acts" — but in CALM, `interacts` means an `actor`-type node initiating contact, not just any node.
**How to avoid:** Explicitly teach in Chapter 2.3 that the `actor` field in an `interacts` relationship must reference a node with `node-type: "actor"`. Service-to-service communication uses `connects`.
**Warning signs:** Architecture files where the `actor` field in `interacts` references a `service` or `system` node.

---

## Illustration Plan (ILL-03: 10–15 Excalidraw B&W)

13 illustrations planned:

| Stub name | Chapter | What it shows |
|-----------|---------|---------------|
| `m02-calm-document-structure` | 2.1 | Top-level JSON structure: nodes, relationships, metadata, controls, flows — document anatomy |
| `m02-node-types-gallery` | 2.2 | All 9 node types in a grid — CALM Studio canvas shapes with labels |
| `m02-actor-node` | 2.2 | Close-up: actor initiating interaction — "who pulls the trigger" |
| `m02-system-vs-service-vs-ecosystem` | 2.2 | Three-panel: system (boundary), service (process), ecosystem (runtime env) — most confusing distinctions |
| `m02-relationship-types` | 2.3 | All 5 relationship types: icon + label + one-line meaning |
| `m02-connects-vs-interacts` | 2.3 | Side-by-side: connects (node-to-node with protocol), interacts (actor-initiates-to-node) |
| `m02-deployed-in-composed-of` | 2.3 | Side-by-side: deployed-in (runtime containment), composed-of (structural boundary) |
| `m02-interface-anatomy` | 2.4 | Callout diagram: node with interface showing unique-id, protocol, port relationship to connects |
| `m02-control-anatomy` | 2.5 | Callout: control key → description → requirements → requirement-url → config chain |
| `m02-decorator-external-overlay` | 2.6 | Architecture file + Decorator file (separate docs with arrows pointing target/applies-to) |
| `m02-conference-signup-step1-nodes` | 2.7 | 6 nodes laid out with labels — pre-relationships |
| `m02-conference-signup-step2-relationships` | 2.7 | Same nodes with all 4 relationship types drawn |
| `m02-conference-signup-step3-complete` | 2.7 | Full diagram with interface callout and control badge |

---

## Quiz Design (QUIZ-03: Largest Quiz in the Course)

**Target: 18–21 questions** (2–3 per chapter = 14–21; aim for 3 per chapter = 21)

**Distribution by chapter:**

| Chapter | Questions | Types | Key concepts tested |
|---------|-----------|-------|---------------------|
| 2.1 — The Spec | 3 | MC (2) + short_answer (1) | `$schema` URL, required top-level fields, why JSON over YAML |
| 2.2 — Nodes | 4 | MC (3) + short_answer (1) | Node type identification, `actor` vs `system` distinction, `data-asset` use case, unique-id required |
| 2.3 — Relationships | 4 | MC (2) + code_completion (1) + short_answer (1) | `connects` vs `interacts`, protocol enum values, `deployed-in` container field, `options` type purpose |
| 2.4 — Interfaces | 3 | MC (2) + short_answer (1) | Interface vs relationship distinction, freeform vs formal form, what `definition-url` points to |
| 2.5 — Controls | 3 | MC (2) + short_answer (1) | Control anatomy (requirement-url), where controls attach, FINOS CCC relationship |
| 2.6 — Decorators | 3 | MC (2) + short_answer (1) | Decorator as separate doc, `target` vs `applies-to`, use case for threat model decorator |
| 2.7 — First Arch | 3 | MC (1) + code_completion (2) | `calm validate` command, $schema field, step order |

**Quiz question ID format:** `q2.N.N` (e.g., `q2.2.1` = Chapter 2.2, first question)

---

## Slide Deck Design (SLIDE-02: 30–40 slides)

**Marp format at:** `slides/module-02-calm-fundamentals.md`

**Slide structure:**
- Slide 1: Title + Module 2 overview (30 min concept, 3h total)
- Slides 2–4: Chapter 2.1 — Spec structure, $schema URL, document anatomy
- Slides 5–13: Chapter 2.2 — NODE TYPE GALLERY (9 slides, one per type with Studio canvas shape)
- Slides 14–18: Chapter 2.3 — 5 relationship types + protocol taxonomy
- Slides 19–21: Chapter 2.4 — Interfaces: freeform vs formal, anatomy
- Slides 22–24: Chapter 2.5 — Controls: anatomy, where they attach
- Slides 25–27: Chapter 2.6 — Decorators: the separate-doc pattern
- Slides 28–35: Chapter 2.7 — Conference signup build-up (8 steps = ~8 slides)
- Slides 36–38: Lab 2 intro + cheatsheet preview + Module summary
- Total: ~38 slides

The **node type gallery** (slides 5–13) is the visual signature of this deck — each type gets its own slide with: Studio canvas shape, icon, name, 3-line description, 2 real-world examples.

---

## Cheatsheet Design (CODE-02)

**File:** `docs-meta/cheatsheets/module-02-cheatsheet.md` (or `static/cheatsheets/` for Docusaurus download)

**1-page A4 printable. Sections:**

1. **Node Types (9)** — table: name | icon | use for | never use for
2. **Relationship Types (5)** — table: type | fields | example use
3. **Protocol Enum** — comma-separated list: HTTP, HTTPS, FTP, SFTP, JDBC, WebSocket, SocketIO, LDAP, AMQP, TLS, mTLS, TCP
4. **Node Required Fields** — `unique-id`, `node-type`, `name`, `description`
5. **Relationship Required Fields** — `unique-id`, `relationship-type`
6. **Interface Quick Ref** — two forms: freeform syntax vs definition-url syntax
7. **Control Quick Ref** — key structure skeleton
8. **$schema URL** — `https://calm.finos.org/release/1.2/meta/calm.json`
9. **CLI Quick Ref** — `npx @finos/calm-cli validate -a <file>`

---

## Validation Strategy (CODE-01: CI Gate)

The CI script must run `npx @finos/calm-cli validate -a <file>` on all files in `code-examples/module-02-calm-fundamentals/*.architecture.json`.

**Approach:**
1. Create `scripts/validate-examples.sh` (if not already existing — check from Module 0 setup)
2. Script uses `npx @finos/calm-cli validate -a` for each `*.architecture.json` file
3. Fail if any returns non-zero exit code
4. Wire into CI (GitHub Actions if `.github/workflows/` exists; otherwise note for Phase 5 CI setup)

**Lab solution validation:** The `labs/lab-02-conference-signup/solution/conference-signup.architecture.json` must also pass `calm validate`.

---

## Wave Structure

### Wave 1 (must complete before Wave 2)
- Chapter 2.1 (spec overview) — anchors all other chapters
- Chapter 2.2 (nodes) — required before Lab 2 can be written
- Chapter 2.3 (relationships) — required before Lab 2
- Illustration stubs for chapters 2.1–2.3 (6 stubs)
- Code examples: `node-types-reference.architecture.json`, `relationship-types-reference.architecture.json`

### Wave 2 (blocked on Wave 1 completion — can parallelize internally)

Parallel tracks within Wave 2:

**Track A (chapters + examples):**
- Chapter 2.4 (interfaces)
- Chapter 2.5 (controls)
- Chapter 2.6 (decorators)
- Chapter 2.7 (building first architecture)
- Remaining 7 illustration stubs
- Code examples: `with-interfaces.architecture.json`, `with-controls.architecture.json`, `conference-signup.architecture.json`
- Lab 2 (LAB.md + starter/ + solution/)

**Track B (metadata deliverables — can write while Track A runs):**
- Module 2 quiz YAML (all 7 chapters mapped — write after Wave 1 chapters are stable)
- Cheatsheet (content is pure schema — can be derived from core.json at any time)
- Slide deck (Marp — derives from all 7 chapters + all 13 illustration SVGs)

**Wave 3 (gate: all Wave 2 content exists):**
- Validate all 5 code examples with `npx @finos/calm-cli validate`
- Lint quiz with `bash scripts/lint-quizzes.sh`
- Final INVENTORY.md update for all 13 m02-* illustration stubs

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `npx @finos/calm-cli` | CODE-01, LAB-02, CI validation | Yes | 1.44.1 | None — required |
| `calmstudio-mcp` (local .cjs) | Code example authoring with AI | Yes | v0.0.0 (PR build) | Hand-write JSON carefully |
| Docusaurus site | MDX rendering (Phase 5) | Not validated yet | — | MDX renders in any compatible framework |
| Marp CLI | Slide deck rendering | Not verified | — | Markdown slides readable as plaintext |
| `jq` | Excalidraw stub validation | System | — | `python3 -m json.tool` fallback |
| `bash scripts/lint-quizzes.sh` | Quiz validation | Yes (existing) | — | None needed |
| CALM Studio web | LAB-02 visualization step | Yes (web app) | — | CALM Studio desktop |

**Missing dependencies with no fallback:**
- `npx @finos/calm-cli` — must remain available via npx; confirmed at 1.44.1

**Missing dependencies with fallback:**
- Marp CLI — slides are readable as Markdown even without rendering
- CALM Studio web — always available at calm.studio (no install required)

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Embedded interface types in `interface.json` (url-interface, host-port-interface) | External `definition-url` + `config` pattern | CALM 1.1 | Interface definitions are now reusable external schemas, not built-in types. The old types (url-interface, host-port-interface) were in 1.0-rc1 only. Teach the `definition-url` pattern as the modern approach. |
| No decorators | Decorator schema added | CALM 1.2 | Threat model and governance overlays are now first-class spec features |
| No timelines | Timeline schema added | CALM 1.2 | Architecture snapshots over time are now expressible |
| Top-level `$id` optional | `$schema` required for validation | Consistent since 1.0 | Always include `$schema` pointing to the release URL |

**Deprecated/outdated:**
- `interface.json#/defs/url-interface`: Defined in 1.0-rc1, NOT present in 1.2. Do not reference in Module 2 content.
- `interface.json#/defs/host-port-interface`: Same — 1.0-rc1 only. The `conference-signup.pattern.json` still references this (it was written against 1.0-rc2). Do NOT use this form in Module 2 examples — use the `definition-url` or freeform pattern instead.
- `calm/release/1.0-rc1/meta/core.json` in `$schema`: The conference-signup pattern uses older schema versions. Module 2 examples must ALL use `https://calm.finos.org/release/1.2/meta/calm.json`.

---

## Validation Architecture (nyquist_validation: true)

### Test Framework

| Property | Value |
|----------|-------|
| Framework | `npx @finos/calm-cli validate` (JSON Schema validation) + `bash scripts/lint-quizzes.sh` (YAML lint) |
| Config file | None — validator is stateless; quiz linter is in `scripts/lint-quizzes.sh` |
| Quick run command | `npx @finos/calm-cli validate -a code-examples/module-02-calm-fundamentals/<file>.architecture.json` |
| Full suite command | `for f in code-examples/module-02-calm-fundamentals/*.architecture.json; do npx @finos/calm-cli validate -a "$f"; done && bash scripts/lint-quizzes.sh` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CODE-01 | All `.architecture.json` pass `calm validate` | validation | `for f in code-examples/module-02-calm-fundamentals/*.architecture.json; do npx @finos/calm-cli validate -a "$f" || exit 1; done` | No — Wave 2 creates them |
| LAB-02 | Lab solution validates | validation | `npx @finos/calm-cli validate -a labs/lab-02-conference-signup/solution/conference-signup.architecture.json` | No — Wave 2 |
| QUIZ-03 | Quiz YAML passes linter | YAML lint | `bash scripts/lint-quizzes.sh` | No — Wave 2 |
| MOD-03 | 7 chapters exist with required frontmatter | file_state | `ls content/module-02-calm-fundamentals/*.mdx \| wc -l` returns 7 | No — Wave 1+2 |
| ILL-03 | 13 Excalidraw stubs exist and are valid JSON | file_state + JSON check | `jq . illustrations/source/m02-*.excalidraw > /dev/null` | No — Wave 1+2 |

### Wave 0 Gaps (items needed before execution can start)

- `code-examples/module-02-calm-fundamentals/` directory (create in Wave 1)
- `content/module-02-calm-fundamentals/` directory (create in Wave 1)
- `labs/lab-02-conference-signup/` directory (create in Wave 2)
- Verify `scripts/validate-examples.sh` exists or note it needs creation

---

## Open Questions

1. **Conference signup actor node: include or omit?**
   - What we know: The original pattern has no actor — it starts at the webclient. Real learners need to see an actor.
   - What's unclear: Adding an actor means the lab architecture doesn't match the pattern exactly (extra node outside pattern scope).
   - Recommendation: Add `conference-attendee` (actor) to the MODULE 2 code example and Lab 2, with a note that patterns define minimum structure and architectures can extend them.

2. **`with-interfaces.architecture.json` — should it use definition-url form or freeform?**
   - What we know: The 1.2 schema supports both. The trading-system uses freeform. The 1.0-rc1 pattern references now-removed built-in types.
   - What's unclear: Whether definition-url example requires pointing at an actual resolvable URL or can use a local file.
   - Recommendation: Use freeform form as primary (simpler, matches real-world examples); show definition-url form as secondary in the chapter prose only.

3. **Should `flows` be in Lab 2 or deferred?**
   - What we know: Flows exist in 1.2 and the trading-system example uses them extensively. The conference signup is simple enough that flows add complexity without much value.
   - What's unclear: Whether learners need to understand flows to use `calm validate` successfully.
   - Recommendation: Flows are optional in Lab 2. Introduce flows conceptually in Chapter 2.7 as a "bonus" section. Full flow authoring is Module 3 (CLI chapter: `calm docify` generates flow diagrams).

4. **Does the `options` relationship type need a code example?**
   - What we know: `options` is rarely used in practice. It requires an array of `decision` objects.
   - What's unclear: Whether omitting it from code examples creates a gap in QUIZ-03.
   - Recommendation: Cover `options` in Chapter 2.3 prose and one quiz question, but do NOT include it in Lab 2 or the code examples. A learner who understands the other 4 relationship types can infer `options`.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The conference-signup pattern's `k8s-cluster` node is `node-type: "system"` (not `ecosystem`) — Lab 2 should use `system` for the cluster | Lab 2 Design | If `ecosystem` is more correct, Lab 2 and code example are inconsistent with curriculum intent. **Resolution:** Pattern file explicitly sets `"node-type": "const": "system"` [VERIFIED]. Use `system` for the cluster. |
| A2 | The old interface types (`url-interface`, `host-port-interface`) from 1.0-rc1 are NOT present in 1.2 | State of the Art | If they still exist in 1.2, teaching the definition-url pattern misses an easier on-ramp. [VERIFIED: 1.2 interface.json has no built-in type definitions beyond `interface-definition` and `interface-type`]. No old types. |
| A3 | `npx @finos/calm-cli validate -a <file>` correctly validates against 1.2 schema when the file specifies `"$schema": "https://calm.finos.org/release/1.2/meta/calm.json"` | Validation Strategy | If the CLI does not resolve remote $schema URLs, validation may fail or silently skip. Mitigation: use `--schema-directory` flag pointing to local schema dir if needed. [ASSUMED — not tested in this session] |
| A4 | Marp is the correct slide format for SLIDE-02 (same as SLIDE-01 established in Phase 2) | Slide Deck Design | If the user prefers Reveal.js or another tool, the slide format changes. [ASSUMED from CLAUDE.md: `slides/module-NN-<slug>.md (Marp/Reveal.js format)` and Phase 2 used Marp]. |
| A5 | The `scripts/lint-quizzes.sh` script validates all quiz files in `quizzes/` directory automatically | Validation Architecture | If the script only validates specific files, it must be updated to include `module-02-calm-fundamentals.yaml`. [ASSUMED — not read in this session; Phase 2 summary confirms it was used successfully]. |

**If this table is empty:** Not applicable — 5 assumptions logged above.

---

## Sources

### Primary (HIGH confidence)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/core.json` — node types, relationship types, metadata schema
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/interface.json` — interface definitions
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/control.json` — controls schema
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/decorators.json` — decorator schema (new in 1.2)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/flow.json` — flow/transition schema
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/meta/timeline.json` — timeline schema (new in 1.2)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/release/1.2/RELEASE_NOTES.md` — confirms what's new in 1.2
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/docs/static/calm-example/trading-system.architecture.json` — canonical complex example
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/getting-started/conference-signup.pattern.json` — canonical tutorial pattern
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm/interfaces/example/` — official FINOS interface type examples
- `CURRICULUM.md` — Module 2 chapter structure and pedagogical intent
- `CLAUDE.md` — project conventions and constraints

### Secondary (MEDIUM confidence)
- `/Users/gshah/work/opsflow-sh/calm/architecture-as-code/calm-plugins/vscode/test_fixtures/architecture/complex.architecture.json` — large enterprise trading platform example demonstrating all relationship types
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/phases/02-module-1-the-case-for-architecture-as-code/02-01-SUMMARY.md` — Phase 2 output patterns (quiz format, illustration stub format, SVG placeholder format)
- `quizzes/module-01-case-for-aac.yaml` — quiz format reference (11 questions, distribution pattern, accepted_answers structure)

### Tertiary (LOW confidence — none)
No WebSearch was needed. All technical findings are from the authoritative local repository.

---

## Metadata

**Confidence breakdown:**
- CALM 1.2 spec (node types, relationship types, schema): HIGH — read directly from canonical schema files
- Interface taxonomy: HIGH — read from 1.2 interface.json and /interfaces/example/; important caveat that 1.0-rc1 built-in types are gone
- Control schema: HIGH — read from control.json + getting-started examples
- Decorator schema: HIGH — read from decorators.json + release notes confirm new in 1.2
- Lab 2 design (conference signup): HIGH — pattern file read directly
- Quiz question count and distribution: MEDIUM — based on CURRICULUM.md intent and prior phase patterns
- Slide deck slide count: MEDIUM — based on chapter structure analysis
- Wave structure: MEDIUM — logical dependency analysis; user may reorder

**Research date:** 2026-06-16
**Valid until:** 2026-09-16 (stable spec — CALM 1.2 is a release, not a draft; no expected spec changes)

**Key insight for planner:** Module 2 is spec-documentation work, not creative content work. Every claim in every chapter should be traceable to a schema file or official example. The planner should create tasks that enforce this traceability — e.g., "Chapter 2.2 must include the exact enum values from core.json, verified by rg against the file."
