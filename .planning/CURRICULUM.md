# Architecture as Code: From Concept to Enterprise Governance
## FINOS Official Certification Program — Curriculum Design

---

## Program Overview

**Tagline:** *"Terraform transformed infrastructure. CALM transforms architecture."*

**Mission:** Establish Architecture as Code as the missing discipline in modern software engineering — bridging the gap between static diagrams and living, validated, AI-consumable system specifications.

**Positioning for FINOS:**
This program positions FINOS as the steward of the industry standard for Architecture as Code, the same way the Linux Foundation owns cloud-native education (CKA/CKAD) and HashiCorp owns Terraform certification. CALM becomes the open-source standard; this course becomes the on-ramp for global adoption.

**Target Audiences:**
| Persona | Why They Enroll |
|---|---|
| Software / Enterprise Architects | Replace Visio/PowerPoint with versionable, testable specs |
| Platform / DevOps Engineers | Extend IaC pipelines with architecture validation gates |
| Security Architects | Encode threat models and compliance controls into code |
| AI/ML Engineers | Use CALM specs as grounding context for AI code generation |
| Engineering Managers | Enforce architectural standards across teams automatically |
| Financial Services technologists | Regulatory compliance (SOX, PCI-DSS, DORA) via CALM Guard |

---

## Certification Tracks

```
┌─────────────────────────────────────────────────────────────┐
│  CALM Associate         Modules 1–3   ~8 hrs   Entry level  │
│  CALM Practitioner      Modules 1–5   ~16 hrs  Mid level    │
│  CALM Architect         All + Capstone ~24 hrs  Expert      │
└─────────────────────────────────────────────────────────────┘
```

Each level builds on the previous. Labs are cumulative — by the end of Architect track, learners have built a complete governed, AI-native, compliance-verified enterprise architecture.

---

## MODULE 0: The 15-Minute On-Ramp — CALM Without Learning CALM
**Level:** All tracks (mandatory pre-read for Associate) | **Duration:** ~30 min hands-on, no setup
**Audience:** Architects, PMs, students who want immediate value before committing to learning the spec

### The Problem This Module Solves
Most people who need architecture documentation will never read a JSON Schema. They have a diagram, a Confluence page, or a head full of mental model — and they need it in CALM yesterday. This module gets them to a valid `.calm.json` in their hands in under 15 minutes, before they've learned a single spec rule.

**The teaching gamble:** show the magic first, demystify second. Hooks the learner. Earns the right to teach Module 1+.

### Chapter 0.1 — Three Paths to Your First CALM Document
| Path | What you bring | What you do | Output |
|---|---|---|---|
| **A. Talk** | A description in plain English | Open Claude/Cursor with calmstudio-mcp, describe your system | Valid CALM JSON |
| **B. Sketch** | A diagram (Lucidchart, PowerPoint, whiteboard photo) | Drop into Claude/Cursor with the `calm-arb-convert` skill | Valid CALM JSON |
| **C. Markdown doc** | An existing architecture markdown (e.g. an ARB doc, an RFC) | Same — point the skill at the URL or file | Valid CALM JSON + threat model decorators |

All three paths produce the same artifact. The learner doesn't need to know what `ai:orchestrator` means — the skill enforces the mapping.

### Chapter 0.2 — Live Demo: Diagram → CALM in 5 Minutes
- Watch instructor convert the FINOS Multi-Agent Reference Architecture from a markdown URL to validated CALM JSON, on screen, end to end
- The `calm-arb-convert` skill enforces: read spec → fetch doc → fetch threat model → write mapping plan → create → decorate → finalize → export
- Show the AIGF governance overlay auto-attaching when `ai:*` nodes are detected
- No JSON typed by hand. No node-type guessing. Zero spec knowledge required.

### Chapter 0.3 — Why This Works (and When It Doesn't)
- The MCP server bakes in the spec — every tool call validates
- The skill bakes in the workflow — the AI can't skip steps
- The `read_calm_guide` tool is the spec, read by the AI before generation
- **Limitation:** the AI generates a draft. You still need spec knowledge to refine, validate edge cases, and write organizational patterns. That's what Module 1+ teaches.
- This is **architecture as the prompt** — CALM becomes the contract between human intent and AI output

### Chapter 0.4 — Get Set Up in 60 Seconds
Three flavours, learner picks one:

**Claude Code CLI:**
```bash
claude mcp add --scope user calmstudio-mcp -- npx @calmstudio/mcp
```

**Claude Desktop / Cursor / Windsurf** — drop in `mcpServers` block (covered in the repo-level skill at `calm-ai/skills/calm-arb-convert.md`)

**No install, browser only:** CALM Studio web (zero-config visual canvas)

### Chapter 0.5 — Your First CALM Document (Hands-on, 10 min)
**Exercise:** Describe a system you actually work on in 3 sentences to the AI. Get a `.calm.json`. Validate it with `calm validate`. Visualize it in CALM Studio. Save the screenshot for Module 1, Lab 1.

**The hook:** "You just produced a versionable, AI-consumable, validated architecture document. You'll spend the rest of this course learning *why* that document is structured the way it is — and what you can do with it that you couldn't do with a diagram."

---

## MODULE 1: The Case for Architecture as Code
**Level:** All tracks | **Duration:** ~2 hours

### The Problem This Module Solves
Architecture lives in PowerPoint. It drifts from reality. New engineers can't read it. AI can't consume it. It has no version history, no tests, no CI/CD gate. This module makes the case for why that has to change.

### Chapter 1.1 — The Architecture Debt Crisis
- Architecture as documentation vs. architecture as code
- The "architecture drift" problem — when diagrams lie
- Case study: Production incident caused by undocumented dependency
- How architecture debt compounds like technical debt
- Why regulated industries (finance, healthcare) feel this pain most acutely

### Chapter 1.2 — Lessons from Adjacent Disciplines
**"We've solved this before. Twice."**
- **Configuration as Code**: From hand-configured servers to Ansible/Chef
- **Infrastructure as Code**: From ClickOps to Terraform — what changed?
  - IaC made infra versionable, testable, reviewable, automatable
  - Key insight: the artifact (HCL) became the source of truth
- **Policy as Code**: OPA/Rego for security gates
- **Now: Architecture as Code** — the missing layer between infra and application
- The AaC stack: `Terraform (infra) → CALM (architecture) → Policy (compliance)`

### Chapter 1.3 — What Architecture as Code Enables
- **Version control**: `git diff` between architecture versions
- **Automated validation**: CI/CD gate before any deployment
- **Pattern reuse**: Approved blueprints as organizational standards
- **AI consumption**: LLMs can reason over structured JSON specs
- **Compliance automation**: Controls encoded, evidence generated automatically
- **Living documentation**: Generated docs stay in sync with code

### Chapter 1.4 — Governance Frameworks and Why They Need AaC
- **Gemara (OpenSSF)** — the GRC Engineering Model: 7-layer OSI-inspired framework that explicitly calls for machine-optimized architecture documentation with MCP. CALM is the answer it describes but doesn't implement.
- **FINOS AIGF** (AI Governance Framework) — AI system governance; auto-attaches to CALM `ai:*` architectures
- **Google SAIF** (Secure AI Framework) — AI security posture; mapped to CALM node types and decorators
- **NIST AI RMF** — Risk management for AI systems
- **DORA** (Digital Operational Resilience Act) — EU financial services
- **SOX / PCI-DSS** — Financial compliance
- **OpenSSF OSPS Baseline** — open source supply chain security, Gemara Layer 2 controls
- The shared problem: every framework requires architecture documentation that is current, complete, machine-readable, and auditable. CALM is the machine-optimized schema all of them need.

### Chapter 1.5 — Introducing CALM
- FINOS as the open-standard home for AaC
- CALM 1.2 specification overview
- The CALM ecosystem: CLI, Hub, Studio, Guard, MCP
- Community and governance model
- Real-world adoption stories

**Lab 1:** Map a familiar system (e-commerce checkout) from memory as a diagram. Identify what's missing, ambiguous, or already out of date. This becomes the "before" artifact for the course.

---

## MODULE 2: CALM Fundamentals
**Level:** All tracks | **Duration:** ~3 hours

### Chapter 2.1 — The CALM Specification
- JSON Schema as the foundation — why JSON over YAML/DSL
- Spec versioning and governance process (Draft → RC → Release)
- The core vocabulary: nodes, relationships, interfaces, controls, decorators, metadata

### Chapter 2.2 — Nodes: Modeling System Components
**The 9 core node types:**
| Type | Real-world mapping |
|---|---|
| `actor` | Users, external systems, anything that initiates |
| `system` | Logical bounded contexts, architectural layers |
| `service` | Microservices, APIs, stateful components |
| `database` | Any data persistence (SQL, NoSQL, cache) |
| `network` | Load balancers, firewalls, VPNs, CDNs |
| `webclient` | Browser, mobile app, any frontend |
| `ecosystem` | Runtime environments (K8s cluster, agent sandbox) |
| `ldap` | Identity providers, directory services |
| `data-asset` | Files, datasets, S3 buckets, streams |

- Node properties: unique-id, name, node-type, description, tags, metadata
- The rule: every component in your system maps to exactly one node type
- Anti-pattern: the temptation to invent types (`container`, `component`) — why spec discipline matters

### Chapter 2.3 — Relationships: Connecting the Dots
**5 relationship types — each carries semantic meaning:**
| Type | Meaning |
|---|---|
| `connects` | Point-to-point communication (add `protocol`) |
| `interacts` | Actor or agent interacting with a node |
| `deployed-in` | Runtime deployment (node lives inside ecosystem) |
| `composed-of` | Structural containment (layer contains components) |
| `options` | Decision points — alternative architecture branches |

- Why relationship types matter for automated analysis
- Protocol taxonomy: HTTP, HTTPS, JDBC, AMQP, mTLS, WebSocket, LDAP, TCP
- Direction and bidirectionality
- `options` as architectural decision records in the spec itself

### Chapter 2.4 — Interfaces: Describing Communication Contracts
- Interface as the formal API between nodes
- Port, protocol, authentication, transport properties
- Why interfaces enable automated security scanning
- Difference between relationship (logical) and interface (technical contract)

### Chapter 2.5 — Controls: Encoding Non-Functional Requirements
- What controls are: testable compliance requirements
- Control domains: security, availability, performance, resilience
- Mapping controls to nodes and relationships
- The FINOS Common Controls Catalog (FINOS CCC)
- Controls as CI/CD gates — "deploy only if architecture is compliant"

### Chapter 2.6 — Decorators: Cross-Cutting Concerns
- Threat model decorators — attach STRIDE threats to architecture nodes
- Pattern decorators — mark nodes as instances of known patterns
- Governance decorators — AIGF, SAIF overlays
- How decorators enable post-hoc enrichment without modifying core architecture
- The AIGF decorator: auto-attaches when `ai:*` nodes detected

### Chapter 2.7 — Your First Architecture in CALM
- Tools setup: CALM CLI, VSCode extension
- Step-by-step: Conference signup system (the canonical tutorial)
- Creating nodes, adding relationships, attaching interfaces
- Running `calm validate` — reading and fixing errors
- Generating documentation with `calm docify`

**Lab 2:** Convert the diagram from Lab 1 into valid CALM 1.2 JSON. Validate it. Generate a documentation page from it.

---

## MODULE 3: The CALM Ecosystem
**Level:** All tracks | **Duration:** ~3 hours

### Chapter 3.1 — CALM CLI: Your Architecture Toolbox
```
calm generate    → Instantiate architecture from pattern
calm validate    → Check architecture against pattern + schema
calm diff        → Compare two architecture versions
calm template    → Generate files from Handlebars templates
calm docify      → Generate documentation website
calm init-ai     → Wire up AI assistant integration
```
- Integration into build pipelines (`--format junit` for CI)
- The `~/.calm.json` config file
- Remote schema loading and auth plugins

### Chapter 3.2 — CALM Studio: Visual-First Architecture Design
- The canvas: 9 node shapes, 5 edge types, containment
- Bidirectional sync: edit diagram ↔ edit JSON
- ELK auto-layout for large architectures
- Import existing CALM JSON, export as JSON/SVG/PNG
- When to use Studio vs. CLI vs. direct JSON editing
- **Demo:** Import the multi-agent reference architecture and explore it

### Chapter 3.3 — CALM Hub: The Architecture Registry
**"If CALM is your Terraform, Hub is your Terraform Cloud / Artifactory"**

- Architecture as a managed artifact — why files on disk aren't enough at scale
- Hub as the **versioned source of truth**: every pattern, architecture, control set, and decorator has a version, an owner, and a namespace
- REST API: namespaces, patterns, architectures, controls, decorators — full CRUD
- **Version control workflow**:
  1. Architect creates/updates architecture locally (CLI or Studio)
  2. Pushes to Hub via REST API or `calm hub push` (planned)
  3. Hub stores version history — diff any two versions
  4. Teams reference Hub artifacts by namespace + version in CI/CD
  5. Breaking changes require a new version — old consumers continue to work
- **Namespaces** — organizational isolation: `org.mybank/payments`, `org.mybank/trading`
- Storage modes: MongoDB (production, clusterable) vs. NitriteDB (standalone dev)
- **MCP endpoint on Hub** — AI agents query the live registry: "what patterns exist for secure API services?"
- Hub as discovery layer: product teams browse approved patterns before building
- CALM Guard pulls architectures directly from Hub for continuous validation
- Access control: who can publish patterns, who can read, who can approve

### Chapter 3.4 — CALM Server: Validation as a Service
- HTTP endpoint for architecture validation
- CI/CD integration without CLI installation
- Rate limiting, health checks, schema overrides
- Use case: platform team exposes a validation API that all teams must pass

### Chapter 3.5 — VSCode Extension
- Live preview panel — see your architecture as you type
- Real-time validation in the Problems panel
- Tree view: navigate nodes, relationships, flows
- Timeline navigation — visualize architecture evolution
- When the extension catches errors before CI does

### Chapter 3.6 — Patterns and Standards: The Blueprint System
- **Patterns**: Reusable architecture templates (the CALM "module" equivalent)
- `calm generate -p <pattern>` → produce conforming architecture shell
- `calm validate -p <pattern> -a <arch>` → enforce pattern conformance
- **Standards**: Organization-specific extensions of the CALM spec
- Standards enforcement: "no internet-facing service without a WAF node"
- Multi-pattern validation — one architecture, multiple compliance checks
- Building your organization's pattern library

### Chapter 3.7 — CI/CD Integration: Architecture Gates
- Architecture validation as a required pipeline stage
- GitHub Actions workflow: validate on PR, block merge on failure
- JUnit XML output — test reports in CI dashboards
- `calm diff` as PR review automation — visualize what changed
- **Hub-integrated pipeline**:
  ```
  PR opened
    → calm validate (architecture vs. pattern pulled from Hub)
    → calm diff (against last Hub-published version)
    → tests pass
  PR merged
    → calm push to Hub (new version published)
    → CALM Guard picks up new version, runs compliance check
    → Terraform/IaC applies (infra matches architecture)
  ```
- The full stack: `IaC plan → Architecture validate → Hub publish → Guard compliance → Deploy`
- Blocking on Hub: "cannot deploy if architecture not published and validated"

**Lab 3:** Set up a complete CALM pipeline. Create a pattern for a "secure API service" (requires HTTPS, auth, WAF). Generate an architecture from it. Add a GitHub Actions workflow that validates the architecture on every PR.

---

## MODULE 4: Governance, Compliance, and CALM Guard
**Level:** Practitioner + Architect | **Duration:** ~4 hours

### Chapter 4.1 — Architecture Governance at Scale
- The governance gap: patterns exist but nobody checks them
- Manual compliance reviews don't scale
- Introducing CALM Guard: AI-driven continuous compliance
- The six-agent architecture: Scout, Ranger, Arsenal, Sniper, Oracle, HQ
- From architecture snapshot to CI/CD pipeline — end to end

### Chapter 4.2 — Compliance Frameworks in CALM
**The Gemara layer map — taught explicitly:**
- Gemara Layer 1 (Vectors & Guidance): NIST CSF, MITRE ATT&CK, OWASP → CALM Standards
- Gemara Layer 2 (Threats & Controls): FINOS CCC, CIS Benchmarks, OSPS Baseline → CALM controls + threat decorators
- Gemara Layer 3 (Risks & Policy): org risk appetite → CALM Patterns (enforced by Guard)
- Gemara Layer 4 (Sensitive Activities): **the CALM architecture document itself**
- Gemara Layers 5–7 (Evaluation, Enforcement, Audit): CALM Guard
- **FINOS CCC** — the shared Layer 2 control catalog cited by both Gemara and CALM
- **OpenSSF OSPS Baseline** — open source security controls, map to CALM supply chain patterns
- SOX, PCI-DSS, SOC2: mapping to CALM controls
- DORA (EU financial resilience): how CALM satisfies documentation requirements
- Evidence collection: auto-generating audit artifacts from CALM → Gemara-compliant audit logs

### Chapter 4.3 — Threat Modeling as Code
- STRIDE mapped to CALM threat decorators
- The FINOS Multi-Agent Threat Model (Apr 2026) — case study
- Attaching threats to architectural layers, not individual components
- 43 threats, 36 controls, 8 layers — modeled in CALM JSON
- **Demo:** The multi-agent reference architecture with full threat model
- Automated threat coverage gap analysis

### Chapter 4.4 — CALM Guard Deep Dive
- Oracle agent: deterministic rules that don't need an LLM
- Learning intelligence: promoting patterns to deterministic rules after 3 observations
- Risk scoring and heat maps
- Auto-generating GitHub Actions pipelines from CALM signals
- Security toolchain: Semgrep (SAST), Trivy (SCA), Gitleaks (secrets), Syft (SBOM)
- Terraform IaC generation with security controls from CALM

### Chapter 4.5 — Timelines: Architecture Evolution
- Modeling architecture change over time
- Milestones, moments, and the timeline schema
- "Architecture should reflect what you had, what you have, and what you plan"
- ADR (Architecture Decision Record) integration
- Using timelines for regulatory audit trails

### Chapter 4.6 — Enterprise Rollout Patterns
- Team structure: Platform Architect, Product Developer, Security SME roles (from Advent Day 21–23)
- Hub as organizational source of truth
- Standards as guardrails for product teams
- The governance flywheel: validate → detect drift → enforce → improve patterns

**Lab 4A:** Run CALM Guard on the multi-agent reference architecture. Review the compliance report. Fix one failing control. Generate the CI/CD pipeline. Export Gemara-layer-annotated audit trail.

**Lab 4B (FSI track):** Attach SR 11-7 controls to the credit scoring architecture skeleton. Run CALM Guard SR 11-7 skill. Identify which of the three SR 11-7 requirements (documentation, independent validation, ongoing monitoring) are unmet. Fix by adding the missing nodes (`challenger-model`, `model-committee-gate`). Re-run Guard — all green.

---

## MODULE 5: AI-Native Architecture — The Frontier
**Level:** Practitioner + Architect | **Duration:** ~4 hours

### Chapter 5.1 — Why AI Needs Structured Architecture
- LLMs hallucinate architecture — they fill gaps with plausible fiction
- CALM as grounding context for AI code generation
- The spec-driven development workflow:
  ```
  Architecture (CALM) → AI generates code → Code tested against spec
  ```
- Architecture as the "contract" between human intent and machine execution
- How CALM enables AI agents to reason about system topology

### Chapter 5.2 — AI/Agentic Node Types (`ai:*`)
**15 agentic node types for modeling AI systems:**
| Type | Models |
|---|---|
| `ai:orchestrator` | Supervisor/coordinator agents |
| `ai:agent` | Worker/specialist agents |
| `ai:llm` | LLM inference endpoints |
| `ai:api-gateway` | Agent API routing layer |
| `ai:guardrail` | Safety filters, policy enforcers |
| `ai:vector-store` | Semantic/vector databases |
| `ai:knowledge-base` | Document stores, RAG sources |
| `ai:rag-pipeline` | Retrieval-augmented generation |
| `ai:embedding-model` | Embedding endpoints |
| `ai:memory` | Short/long-term agent memory |
| `ai:tool` | Callable tools (shell, web, MCP) |
| `ai:mcp-server` | MCP server endpoints |
| `ai:eval-monitor` | Evaluation and feedback loops |
| `ai:observability` | Logs, traces, metrics |
| `ai:human-in-the-loop` | Human approval checkpoints |

- Why dedicated node types? — enables automated AI governance
- The AIGF decorator auto-attachment: any `ai:*` node triggers governance overlay

### Chapter 5.3 — Modeling the FINOS Multi-Agent Reference Architecture
**Flagship use case: converting a real-world AI architecture to CALM**
- The 8-layer ARB architecture:
  1. User Interaction Layer
  2. Agent Gateway Layer (guardrails, routing)
  3. Agent Layer (orchestrators, workers, tools)
  4. Knowledge Layer (RAG, vector stores, embeddings)
  5. LLM Layer (inference)
  6. MCP Layer (tool servers)
  7. Evaluation Layer (monitors, feedback)
  8. Observability Layer (logs, traces, metrics)
- 50 nodes, 30 relationships, 11 threat decorators, 43 threats
- AIGF auto-attachment on 28 `ai:*` nodes
- **Live demo:** Full conversion using calmstudio-mcp
- Before (diagram) vs. After (validated CALM JSON with threat model)

### Chapter 5.4 — calmstudio-mcp: AI-Driven Architecture Creation
- What the MCP protocol enables: AI agents calling architecture tools
- The 21 calmstudio-mcp tools:
  - `create_architecture`, `add_node`, `add_relationship`
  - `add_threat_decorator`, `finalize_architecture`, `export_calm`
  - `read_calm_guide`, `render_diagram`, `validate_architecture`
- Installing locally: Claude Code, Claude Desktop, Windsurf, Cursor, VS Code
- Prompt engineering for architecture generation
- The `read_calm_guide` workflow — making AI follow the spec
- **Demo:** Build the conference architecture by talking to Claude

### Chapter 5.5 — AIGF and Google SAIF Integration
**FINOS AI Governance Framework (AIGF):**
- What AIGF governs: AI system lifecycle, data usage, model accountability
- AIGF as a CALM decorator — auto-attaches to `ai:*` architectures
- AIGF dimensions: transparency, fairness, privacy, security, accountability
- Encoding AIGF requirements as CALM controls
- Audit trail: CALM JSON → AIGF evidence package

**Google Secure AI Framework (SAIF):**
- SAIF six principles: secure design, architecture, deployment, monitoring, testing, feedback
- Mapping SAIF principles to CALM node types and decorators
- `ai:guardrail` + `ai:human-in-the-loop` as SAIF "secure deployment" artifacts
- SAIF + AIGF + NIST AI RMF: the combined governance overlay in CALM

### Chapter 5.6 — Spec-Driven Development with CALM
**The CALM-as-spec workflow:**
```
1. Architect writes CALM spec (nodes, relationships, interfaces)
2. CLI generates skeleton code from spec (planned feature)
3. AI generates implementation from CALM context
4. Tests validate implementation against spec
5. CI validates architecture drift didn't occur
6. PR merge requires: tests green + architecture valid
```
- CALM as the "single source of truth" above code
- Architecture-first vs. code-first — when each applies
- Using CALM specs as AI system prompts (context injection)
- The future: `calm generate-code` — architecture to implementation

### Chapter 5.7 — Multi-Agent Systems: Architecture and Governance
- Why multi-agent systems are architecturally complex
- CALM as the coordination layer for agent teams
- Threat modeling for agentic systems (prompt injection, tool misuse, data exfiltration)
- The 36 controls from the FINOS Multi-Agent Threat Model
- Observability requirements encoded in CALM
- Human-in-the-loop as an architectural constraint, not an afterthought

**Lab 5A (General):** Model a real AI product you know or use in CALM using `ai:*` node types. Attach AIGF + SAIF governance decorators. Run CALM Guard compliance check. Generate threat decorator from the FINOS threat model.

**Lab 5B (FSI track — Wealth Management):** Build the Agent Gateway + Agent Layer from Capstone Scenario B. Wire `investment-guardrail` → `portfolio-orchestrator` → `trade-approval-gate`. Validate that no path exists from `rebalancing-agent` to `brokerage-mcp` without passing through the human gate. This is an architectural compliance test — CALM enforces it structurally.

**Lab 5C (FSI track — Credit Scoring):** Build the Scoring + Decision layer from Capstone Scenario C. Attach the `data-guardrail` (strips protected attributes) and validate that no direct path exists from `bureau-data` to `credit-scoring-model` without passing through it. Add the `adverse-action-agent` and verify it is `composed-of` the decision system. Run SR 11-7 control check via CALM Guard.

---

## MODULE 6: Enterprise Adoption and the CALM Vision
**Level:** Architect only | **Duration:** ~4 hours (includes Capstone)

### Chapter 6.1 — The Terraform Analogy: Why CALM Can Win
- What Terraform did: made infrastructure a first-class engineering artifact
  - Before Terraform: ClickOps, snowflake servers, no reproducibility
  - After Terraform: IaC is now default; AWS CDK, Pulumi, OpenTofu followed
- What CALM can do for architecture:
  - Before CALM: Visio diagrams, Confluence pages, nobody updates them
  - After CALM: Architecture is code, validated, versioned, AI-consumable
- The open standard advantage: FINOS stewardship vs. vendor lock-in
- Ecosystem flywheel: CLI → Hub → Studio → Guard → Community patterns

### Chapter 6.2 — Building an Organizational CALM Practice
- Adoption playbook (3 phases):
  1. **Seed**: One team, one service, prove value
  2. **Spread**: Platform team creates patterns, product teams adopt
  3. **Scale**: Hub as registry, Guard as compliance gate, all architectures in CALM
- Roles and responsibilities: Platform Architect, Product Developer, Security SME
- The "architecture platform team" concept
- Executive sell: compliance automation, audit readiness, onboarding acceleration

### Chapter 6.3 — CALM in Financial Services
- Why FSI adopted IaC later and harder: compliance, change management
- DORA Article 8: ICT risk management documentation requirements — CALM as the answer
- SOX IT general controls: change management via `calm diff` + PRs
- PCI-DSS scope reduction: CALM cardholder data environment mapping
- **SR 11-7 (Federal Reserve model risk management):** the CALM architecture IS the model documentation artifact — nodes map directly to SR 11-7's three requirements (documentation, independent validation, ongoing monitoring)
- **ECOA / Regulation B:** `adverse-action-agent` and `ai:human-in-the-loop` nodes are the fair lending compliance artifacts; CALM makes them auditable by regulators
- **MiFID II:** `ai:human-in-the-loop` at trade approval + `explanation-agent` rationale logging satisfies Art. 16 and Art. 27; `suitability-agent` satisfies Art. 25
- **HMDA / Fair Housing Act:** `bias-monitor` node as CALM's encoding of disparate impact testing requirement
- Case study walkthrough: Autonomous Wealth Management (Scenario B) — MiFID II compliance via CALM
- Case study walkthrough: Credit Risk Scoring (Scenario C) — SR 11-7 as CALM documentation
- FINOS as trusted steward: regulatory recognition potential; FINOS CCC as FSI-accepted control catalog

### Chapter 6.4 — The Future of Architecture as Code
- **calmscript**: Mermaid-like DSL for CALM (in development)
  ```
  actor User interacts webclient Dashboard
  Dashboard connects service API via HTTPS
  API deployed-in ecosystem KubernetesCluster
  ```
- **Extension packs**: AWS, GCP, Azure, K8s, AI/Agentic node type libraries
- **Desktop app**: CALM Studio as Tauri desktop application
- **`calm generate-code`**: Architecture → skeleton implementation
- **CALM + GitOps**: Architecture PR triggers infra + app deployment pipeline
- **Community patterns**: A public registry of approved architectures (like Terraform Registry)
- **AI-native IDE**: Architecture canvas embedded in VS Code, Cursor, Windsurf

### Chapter 6.5 — Contributing to CALM
- FINOS governance model
- Schema governance process: propose → draft → RC → release
- How to contribute patterns to the community library
- Building extensions and plugins
- The CALM working group and community meetings

### Capstone Selection Guide
Students pick ONE scenario. All three require the same CALM toolchain; regulatory depth varies.

| Scenario | Best for | Regulatory depth | Key CALM concepts exercised |
|---|---|---|---|
| **A** — FSI Modernisation | Generic architects, platform engineers | SOX, DORA, FINOS CCC | Timeline, patterns, CI/CD gate |
| **B** — Wealth Management | Wealth/investment tech, product architects | MiFID II, AIGF, SAIF | Full 8-layer ai:* architecture, human-in-loop as compliance node |
| **C** — Credit Risk Scoring | Risk tech, model governance teams, RegTech | SR 11-7, ECOA, FCRA | eval-monitor cluster, model governance pattern, SR 11-7 as CALM doc |

---

### Capstone Scenario A: Enterprise Architecture Modernization (Generic FSI)
**Scenario:** A financial services firm migrates from a monolith to a multi-agent AI-powered microservices architecture.

**Deliverables:**
1. **Current state**: Model the monolith in CALM (as-is architecture)
2. **Target state**: Model the target multi-agent architecture with `ai:*` types
3. **Timeline**: CALM timeline showing phased migration milestones
4. **Governance**: AIGF + SAIF decorators on all AI nodes
5. **Threat model**: Attach FINOS multi-agent threat model decorators
6. **Compliance**: CALM Guard report — SOX + DORA + FINOS CCC
7. **CI/CD gate**: GitHub Actions workflow validating the architecture
8. **Documentation**: Generated documentation site via `calm docify`
9. **Pattern**: Extract reusable pattern for "AI-augmented microservice"
10. **Presentation**: 5-minute walkthrough of CALM Studio visualization

---

### Capstone Scenario B: Autonomous Wealth Management Platform
**Difficulty:** Architect track | **Regulatory depth:** High

#### Context
A wealth management firm is building an AI-native portfolio management platform. Advisors currently manage portfolios manually using spreadsheets and Bloomberg terminals. The new system deploys a multi-agent AI stack that monitors markets, generates rebalancing recommendations, and executes trades within pre-approved risk limits — with mandatory human approval above configurable thresholds.

This system is live. It touches client money. Regulatory scrutiny is maximum.

**Regulators in scope:** MiFID II (suitability, best execution, audit trail), SEC/FINRA (fiduciary duty, trade surveillance), DORA (operational resilience), AIGF (AI decision accountability), SAIF (AI security), Gemara Layers 1–7 (full GRC Engineering stack).

#### Architecture — Required CALM Nodes

**User Interaction Layer**
| Node ID | Type | Description |
|---|---|---|
| `advisor-portal` | `webclient` | Advisor-facing dashboard (portfolio view, approvals) |
| `investor-portal` | `webclient` | Client self-service portal (read-only) |
| `human-advisor` | `actor` | Licensed financial advisor (initiates, approves) |
| `compliance-officer` | `actor` | Compliance review for flagged decisions |
| `trade-approval-gate` | `ai:human-in-the-loop` | Mandatory approval for trades above threshold — MiFID II Article 27 |

**Agent Gateway Layer**
| Node ID | Type | Description |
|---|---|---|
| `wealth-api-gateway` | `ai:api-gateway` | Routes advisor/client requests to agent layer |
| `investment-guardrail` | `ai:guardrail` | Enforces position limits, risk appetite, regulatory restrictions (e.g. short-selling bans) |
| `pii-filter` | `ai:guardrail` | Strips PII from LLM context — GDPR/CCPA compliance node |

**Agent Layer**
| Node ID | Type | Description |
|---|---|---|
| `portfolio-orchestrator` | `ai:orchestrator` | Coordinates research, rebalancing, tax agents; owns the decision lifecycle |
| `market-research-agent` | `ai:agent` | Ingests market signals, earnings, macro data; produces investment theses |
| `rebalancing-agent` | `ai:agent` | Calculates drift, generates trade instructions within guardrail constraints |
| `tax-optimization-agent` | `ai:agent` | Tax-loss harvesting, wash sale avoidance |
| `suitability-agent` | `ai:agent` | Validates proposed trades against client risk profile — MiFID II suitability |
| `explanation-agent` | `ai:agent` | Generates human-readable rationale for every recommendation (audit requirement) |

**Knowledge Layer**
| Node ID | Type | Description |
|---|---|---|
| `client-profile-kb` | `ai:knowledge-base` | Client risk profiles, mandates, restrictions, ESG preferences |
| `regulatory-rules-kb` | `ai:knowledge-base` | MiFID II rules, jurisdiction-specific restrictions, firm policies |
| `market-data-store` | `ai:vector-store` | Real-time and historical market data, semantic search |
| `research-pipeline` | `ai:rag-pipeline` | Retrieves relevant research, filings, news for agent context |
| `embedding-model` | `ai:embedding-model` | Encodes market signals and research into vector space |
| `portfolio-memory` | `ai:memory` | Short-term: current session state. Long-term: portfolio history, prior decisions |

**LLM Layer**
| Node ID | Type | Description |
|---|---|---|
| `analysis-llm` | `ai:llm` | Market analysis and thesis generation |
| `compliance-llm` | `ai:llm` | Regulatory interpretation and suitability assessment (separate model, isolated) |

**MCP Layer**
| Node ID | Type | Description |
|---|---|---|
| `market-data-mcp` | `ai:mcp-server` | Bloomberg/Refinitiv feed as MCP tool |
| `brokerage-mcp` | `ai:mcp-server` | Order management system (OMS) integration — executes approved trades |
| `custodian-mcp` | `ai:mcp-server` | Custodian APIs for position/settlement data |

**Evaluation Layer**
| Node ID | Type | Description |
|---|---|---|
| `portfolio-eval-monitor` | `ai:eval-monitor` | Portfolio attribution, benchmark tracking, model drift detection |
| `bias-monitor` | `ai:eval-monitor` | Monitors for systematic bias in recommendations across client segments |
| `challenger-model` | `ai:eval-monitor` | Shadow model validating primary model — SR 11-7 model risk requirement |

**Observability Layer**
| Node ID | Type | Description |
|---|---|---|
| `trade-audit-trail` | `ai:observability` | Immutable log of every decision, recommendation, approval — MiFID II Article 16 |
| `model-telemetry` | `ai:observability` | LLM token counts, latency, confidence scores, refusals |
| `compliance-dashboard` | `service` | Real-time compliance monitoring for the compliance officer |

**Infrastructure**
| Node ID | Type | Description |
|---|---|---|
| `agent-runtime` | `ecosystem` | Kubernetes cluster running all agent workloads |
| `firm-idp` | `ldap` | Enterprise identity provider — advisor/client authentication |
| `market-db` | `database` | Time-series database for market data history |
| `portfolio-db` | `database` | Portfolio positions, transactions, P&L |
| `trade-firewall` | `network` | Network isolation between agent runtime and OMS — prevents unauthorised trade execution |

#### Required Relationships
- `human-advisor` **interacts** `advisor-portal`
- `advisor-portal` **connects** `wealth-api-gateway` (HTTPS)
- `wealth-api-gateway` **connects** `investment-guardrail` (HTTPS)
- `investment-guardrail` **connects** `portfolio-orchestrator` (HTTPS)
- `portfolio-orchestrator` **interacts** `trade-approval-gate` (for trades above threshold)
- `portfolio-orchestrator` **interacts** `market-research-agent`, `rebalancing-agent`, `tax-optimization-agent`, `suitability-agent`
- All agents **deployed-in** `agent-runtime`
- `rebalancing-agent` **connects** `brokerage-mcp` (only after `trade-approval-gate` approval — encode as control)
- `portfolio-orchestrator` **composed-of** all agent nodes

#### Required Controls
| Control ID | Requirement | Regulatory mandate |
|---|---|---|
| `C-WM-01` | No trade execution without `trade-approval-gate` clearance above threshold | MiFID II Art. 27, fiduciary duty |
| `C-WM-02` | `suitability-agent` must validate every recommendation against client profile before `rebalancing-agent` receives instruction | MiFID II Art. 25 |
| `C-WM-03` | All LLM context must pass through `pii-filter` before processing — no raw PII to model | GDPR Art. 25 (privacy by design) |
| `C-WM-04` | `explanation-agent` must produce rationale for every recommendation logged to `trade-audit-trail` | MiFID II Art. 16, fiduciary duty |
| `C-WM-05` | `challenger-model` must run in shadow mode on 100% of recommendations | SR 11-7 independent model validation |
| `C-WM-06` | `investment-guardrail` must enforce position limits defined in `regulatory-rules-kb` | Firm risk policy, MiFID II |
| `C-WM-07` | `trade-audit-trail` must be immutable, retained 7 years | MiFID II Art. 16(6) |
| `C-WM-08` | `bias-monitor` must alert if recommendation variance across client segments exceeds threshold | FCA Consumer Duty, equal treatment |

#### Threat Model Decorators (key threats — attach via `add_threat_decorator`)
| Threat ID | Layer | Threat | Mitigation |
|---|---|---|---|
| `T-WM-01` | Agent Gateway | Prompt injection via malicious market data causing guardrail bypass | `investment-guardrail` input validation, C1 |
| `T-WM-02` | Agent | Orchestrator manipulation: adversarial input causes `portfolio-orchestrator` to approve trades violating risk limits | `ai:human-in-the-loop` mandatory gate, C3 |
| `T-WM-03` | Knowledge | Market data poisoning: corrupted time-series causes systematically bad recommendations | `market-data-store` integrity validation, C-WM-05 challenger model |
| `T-WM-04` | LLM | Model inversion: LLM leaks client PII from training data or context | `pii-filter` guardrail, context isolation, C-WM-03 |
| `T-WM-05` | MCP | Unauthorised trade execution via direct OMS API bypass | `trade-firewall` network isolation, brokerage-mcp auth controls |
| `T-WM-06` | Evaluation | Model drift goes undetected — recommendations degrade silently | `portfolio-eval-monitor` + `challenger-model` continuous comparison |

#### Deliverables
1. Complete CALM JSON with all nodes, relationships, and interfaces
2. 3 threat decorators (Gateway, Agent, Knowledge layers minimum)
3. All 8 controls attached to relevant nodes
4. AIGF governance overlay (verify `aigf.decoratorAttached: true`)
5. SAIF mapping: annotate which SAIF principle each `ai:guardrail` and `ai:human-in-the-loop` satisfies
6. Gemara layer map: a written table mapping every CALM node to its Gemara layer (L1–L7)
7. `finalize_architecture` output: 0 errors, 0 warnings
8. CALM Guard compliance report: MiFID II + FINOS CCC + AIGF
9. CALM timeline: current state (manual advisors) → Phase 1 (shadow AI) → Phase 2 (AI with human gate) → Phase 3 (autonomous within limits)
10. Pattern extraction: publish `autonomous-wealth-management` pattern to CALM Hub

---

### Capstone Scenario C: AI-Powered Credit Risk Scoring
**Difficulty:** Architect track | **Regulatory depth:** Maximum (SR 11-7)

#### Context
A retail bank is deploying an AI-based credit risk scoring system to replace its legacy scorecard model for personal loan decisions. The AI system ingests applicant data, bureau data, and alternative data sources to produce a risk score and a credit decision (approve/decline/refer). When declining, it must provide an adverse action notice with specific reasons.

The existing model governance team (model risk management, or MRM) requires full SR 11-7 compliance. Legal requires fair lending documentation. The CALM architecture IS the model risk documentation.

**Regulators in scope:** SR 11-7 (Federal Reserve model risk management), ECOA/Regulation B (adverse action, fair lending), FCRA (credit bureau data), GDPR/CCPA (data subject rights), Basel III/IV (credit risk capital), DORA.

#### Why this is different from Scenario B
Credit scoring is not a multi-agent orchestration problem — it's a **model governance and explainability** problem. The architecture is simpler in topology but deeper in control requirements. The `ai:eval-monitor` nodes and `ai:human-in-the-loop` nodes are the story, not the agent layer. SR 11-7 makes the CALM architecture the model documentation artifact itself.

#### Architecture — Required CALM Nodes

**Data Ingestion**
| Node ID | Type | Description |
|---|---|---|
| `loan-application` | `webclient` | Applicant self-service application portal |
| `applicant` | `actor` | Loan applicant |
| `bureau-data` | `data-asset` | Credit bureau feeds (Experian, Equifax, TransUnion) — FCRA-governed |
| `bank-transaction-data` | `data-asset` | Internal account history (open banking) |
| `alternative-data` | `data-asset` | Rental, utility, payroll data (alternative credit signals) |
| `application-db` | `database` | Raw application store |

**Processing Pipeline**
| Node ID | Type | Description |
|---|---|---|
| `data-pipeline` | `service` | Ingestion, cleansing, normalisation |
| `pii-vault` | `database` | PII stored separately from model features — data minimisation |
| `feature-store` | `database` | Engineered features (no PII) used for scoring |
| `embedding-model` | `ai:embedding-model` | Encodes textual/categorical features into model-ready vectors |
| `data-guardrail` | `ai:guardrail` | Strips protected class attributes before scoring — fair lending compliance |

**Scoring Layer**
| Node ID | Type | Description |
|---|---|---|
| `credit-scoring-model` | `ai:llm` | Primary credit risk model (LLM-based or ML model exposed as LLM API) |
| `challenger-model` | `ai:eval-monitor` | Parallel shadow model — SR 11-7 requires independent challenger |
| `score-api` | `ai:api-gateway` | Routes scoring requests, enforces rate limits, logs all calls |

**Decision & Explainability**
| Node ID | Type | Description |
|---|---|---|
| `decision-engine` | `ai:agent` | Applies score thresholds, policy rules, produces approve/decline/refer |
| `adverse-action-agent` | `ai:agent` | Generates ECOA-compliant adverse action reasons from model features — mandatory for declines |
| `refer-queue` | `ai:human-in-the-loop` | Referred applications routed to human underwriter — mandatory for edge cases |
| `model-explainer` | `ai:agent` | SHAP/LIME-based feature attribution — provides explanation for any decision on demand |

**Model Governance (SR 11-7)**
| Node ID | Type | Description |
|---|---|---|
| `model-validator` | `ai:eval-monitor` | Independent model validation: accuracy, stability, Gini, KS statistic |
| `bias-monitor` | `ai:eval-monitor` | HMDA/fair lending: disparate impact analysis across protected classes |
| `drift-monitor` | `ai:eval-monitor` | Population stability index (PSI), characteristic stability — detects data drift |
| `model-committee-gate` | `ai:human-in-the-loop` | Model Committee approval required before deployment and annual revalidation |
| `mrm-dashboard` | `service` | Model Risk Management team's monitoring dashboard |

**Observability & Audit**
| Node ID | Type | Description |
|---|---|---|
| `decision-audit-log` | `ai:observability` | Every decision: input features (no PII), score, threshold, outcome — ECOA retention |
| `model-telemetry` | `ai:observability` | Model performance metrics, score distribution, override rates |
| `data-lineage` | `ai:observability` | Tracks data provenance from bureau feed to feature to decision — FCRA compliance |

**Infrastructure**
| Node ID | Type | Description |
|---|---|---|
| `ml-runtime` | `ecosystem` | Model serving infrastructure (GPU cluster or managed ML platform) |
| `bank-idp` | `ldap` | Staff authentication for MRM, underwriters, compliance |
| `bureau-network` | `network` | Isolated network segment for bureau data — FCRA data handling |

#### Required Controls
| Control ID | Requirement | Regulatory mandate |
|---|---|---|
| `C-CR-01` | `data-guardrail` must strip race, gender, national origin, religion, marital status before model input | ECOA Reg B — no discriminatory inputs |
| `C-CR-02` | `adverse-action-agent` must produce ECOA-compliant adverse action notice for every decline within 30 days | ECOA §701(d), Reg B §202.9 |
| `C-CR-03` | `challenger-model` must run on 100% of applications; performance divergence >X% triggers MRM review | SR 11-7 §III independent validation |
| `C-CR-04` | `bias-monitor` must run HMDA disparate impact analysis monthly; adverse impact ratio <0.8 triggers mandatory review | Fair Housing Act, ECOA |
| `C-CR-05` | `model-committee-gate` approval required before initial deployment and at annual revalidation | SR 11-7 §IV model governance |
| `C-CR-06` | `drift-monitor` PSI >0.2 triggers automatic model freeze and MRM escalation | SR 11-7 ongoing monitoring |
| `C-CR-07` | `decision-audit-log` must retain all decision records for 25 months minimum, no PII in log | ECOA Reg B §202.12, FCRA |
| `C-CR-08` | `pii-vault` must be network-isolated from `feature-store` — no join path during scoring | GDPR Art. 5 (data minimisation), FCRA |
| `C-CR-09` | `refer-queue` human underwriter decision must override model — model is advisory only for referred cases | Fair lending, UDAP |
| `C-CR-10` | `model-explainer` must produce feature attribution for any decision on demand (within 30 days of request) | GDPR Art. 22 (right to explanation), CCPA |

#### Threat Model Decorators
| Threat ID | Layer | Threat | Mitigation |
|---|---|---|---|
| `T-CR-01` | Data Ingestion | Bureau data poisoning: corrupted tradeline data systematically distorts scores for a population | `data-lineage` provenance tracking, bureau data integrity validation |
| `T-CR-02` | Processing | Protected class inference: model learns to proxy discriminatory attributes from permitted features | `bias-monitor` disparate impact testing, C-CR-01 input stripping |
| `T-CR-03` | Scoring | Model inversion: adversary reverse-engineers scoring logic via repeated API queries | `score-api` rate limiting, query pattern detection |
| `T-CR-04` | Decision | Threshold manipulation: insider modifies decision engine thresholds to approve high-risk applicants | `model-committee-gate` change approval, audit log of threshold changes |
| `T-CR-05` | Governance | Silent model drift: population shift causes score inflation, credit losses go undetected | `drift-monitor` PSI monitoring, C-CR-06 automatic freeze |
| `T-CR-06` | Audit | Audit log tampering: decision records modified to conceal discriminatory pattern | Immutable audit store, cryptographic log integrity |

#### The SR 11-7 CALM Mapping
SR 11-7 has three core requirements. Each maps directly to CALM:

| SR 11-7 Requirement | CALM Implementation |
|---|---|
| Model documentation (purpose, design, assumptions) | CALM architecture JSON — nodes, relationships, interfaces |
| Independent model validation | `challenger-model` + `model-validator` nodes with `ai:eval-monitor` type; `model-committee-gate` human gate |
| Ongoing model monitoring | `drift-monitor` + `bias-monitor` + `decision-audit-log` nodes; CALM timeline for revalidation milestones |

**Teaching moment:** Hand the CALM JSON to the MRM team. They have their SR 11-7 model documentation. It's machine-readable, version-controlled, and validates automatically. This is the CALM value proposition for model risk teams.

#### Deliverables
1. Complete CALM JSON — all nodes, relationships, interfaces
2. 3 threat decorators (Data Ingestion, Scoring, Governance layers)
3. All 10 controls attached with assessment requirements
4. AIGF governance overlay verified
5. Gemara layer map: every node assigned to a Gemara layer — demonstrate L4 (the scoring system) connects to L2 (FINOS CCC controls) and feeds L5–L7 (CALM Guard evaluation + enforcement + audit)
6. SR 11-7 compliance table: map each SR 11-7 requirement to the specific CALM node(s) that satisfy it
7. `finalize_architecture` output: 0 errors, 0 warnings
8. CALM Guard report: SR 11-7 + ECOA + FINOS CCC + AIGF
9. CALM timeline: Legacy scorecard → Parallel run (shadow AI) → Champion/challenger → Full AI with human-in-loop
10. Adverse action pattern: extract `fair-lending-credit-decision` as a reusable CALM pattern for any bank deploying AI credit models
11. Presentation: 5-minute demo of CALM Studio + 2-minute walkthrough of SR 11-7 compliance table generated from CALM

---

## Teaching Materials and Labs Infrastructure

### Lab Environment Options
1. **Cloud sandbox** (recommended): Pre-configured VM with CLI, Studio, Hub
2. **Docker Compose**: Single command starts Hub + Studio + Guard
3. **Local install**: CLI + VSCode extension (minimum viable)
4. **CALM Studio web** (no install): Browser-based for Studio-only exercises

### Example Architectures (Progression)
| Level | System | Nodes | Complexity |
|---|---|---|---|
| Beginner | Conference signup | 4 | Simple 2-tier |
| Intermediate | E-commerce microservices | 12 | Multi-service |
| Advanced | Secure API platform | 18 | Controls + patterns |
| Expert | Multi-agent AI system | 50 | Full ARB + threat model |

### Assessment Strategy
- **Associate**: Multiple choice spec knowledge + one working CALM file
- **Practitioner**: Lab submissions (Labs 1–4) + pattern creation exercise
- **Architect**: Full capstone project + peer review + video walkthrough

---

## FINOS Program Positioning

### Why FINOS Should Own This
1. **CALM is already FINOS-stewarded** — natural extension to education
2. **Fills the "architecture" gap** in FINOS's tooling portfolio (Morphir, Legend are data; CALM is architecture)
3. **Regulation tailwind**: DORA, MiCA, Basel IV all create demand for architectural documentation
4. **AI governance alignment**: AIGF positions FINOS uniquely for AI governance education
5. **Foundation precedent**: Linux Foundation CKA, HashiCorp Terraform Associate — FINOS can be next

### Gemara (OpenSSF) + OpenSSF Integration

**Gemara** (OpenSSF/Linux Foundation) is a 7-layer GRC Engineering Model for Automated Risk Assessment — the OSI Model for governance. It explicitly calls for *"machine-optimized documentation standards"* with MCP as the foundation. **CALM is exactly that standard.** The integration is structural, not cosmetic.

**Gemara's 7 layers mapped to CALM artifacts:**

```
L1 Vectors & Guidance    → CALM Standards (NIST, OWASP, MITRE ATT&CK in Hub)
L2 Threats & Controls    → CALM threat decorators + FINOS CCC control catalog
L3 Risks & Policy        → CALM Patterns (org-specific rules enforced by Guard)
────────────────────────────────────────────────────────────────────────────
L4 Sensitive Activities  → THE CALM ARCHITECTURE ITSELF ← PIVOT POINT
────────────────────────────────────────────────────────────────────────────
L5 Evaluation            → CALM Guard agents (Scout, Ranger, Arsenal, Sniper)
L6 Enforcement           → CALM Guard CI/CD pipeline generation + PR gates
L7 Audit & Monitoring    → CALM Guard continuous monitoring + Hub evidence
```

CALM architecture sits at **Layer 4 — Gemara's pivot point**: the bridge between "what the rules say should exist" (Layers 1–3) and "did we build it correctly" (Layers 5–7). Gemara's entire model flows to and from that layer.

Gemara explicitly cites **FINOS CCC** as a canonical Layer 2 control catalog, and **MCP** as the database/API foundation for AI-GRC communication. CALM Hub's MCP endpoint is that foundation. calmstudio-mcp is the interface. These two projects describe the same vision from complementary angles.

**OpenSSF OSPS Baseline** (also cited by Gemara as a Layer 2 asset) maps to CALM controls for open source project security — teachable as a concrete Lab in Module 4.

**The unified pitch**: FINOS + OpenSSF together deliver the complete Gemara-compliant GRC Engineering stack:
- Gemara = the model and vocabulary
- CALM = the machine-optimized Layer 4 schema (what Gemara says is missing)
- CALM Guard = automated Layers 5–7 implementation
- CALM Hub + MCP = the GRC database Gemara envisions
- FINOS CCC = the Layer 2 control catalog both reference

### FINOS Ecosystem Integration (Full Picture)

The course teaches CALM as the connective tissue across the entire FINOS ecosystem:

```
ARB (reference architectures)
    → encoded as CALM patterns + ai:* node types
    → pushed to CALM Hub (versioned, namespaced registry)
    → AIGF decorator auto-attaches (governance overlay)
    → GRIS maps regulatory requirements → CALM controls → stored in Hub
    → FluxNova event topology modeled as CALM interfaces
    → CALM Guard pulls from Hub, validates all of the above
    → audit trail exported as evidence package, archived in Hub
```

**CALM Hub is the version control layer** — the Artifactory/npm registry for architecture artifacts. Every pattern, architecture, control set, and decorator lives in Hub, versioned and namespaced. CI/CD pulls from Hub; CALM Guard validates against Hub; teams discover approved patterns through Hub.

| FINOS Project | Role in Course | Module |
|---|---|---|
| **CALM Hub** | Architecture registry: versioned patterns, architectures, controls, decorators; REST API + MCP endpoint; the "npm registry" for CALM artifacts | 3.3, 3.6, 4.6 |
| **ARB** (Architectural Reference Board) | Flagship use case: convert ARB reference architectures to CALM patterns, publish to Hub | 5.3 |
| **AIGF** | Governance decorator: auto-attaches to any architecture with `ai:*` nodes | 5.5 |
| **GRIS** | Regulatory intelligence → CALM control mappings; GRIS findings become CALM controls stored in Hub | 4.2, 5.5 |
| **FluxNova** | Event-driven architecture modeling: topics as `data-asset`, producers/consumers as `service` nodes | 3.6 Lab |
| **CALM Guard** | AI-driven compliance automation; pulls architectures from Hub; grows into its own module as it matures | 4.4, future |
| **FINOS CCC** | Control requirements library: the source of truth for CALM controls, hosted in Hub (Gemara Layer 2 asset) | 4.2 |
| **Gemara (OpenSSF)** | GRC Engineering Model: CALM is the machine-optimized schema Gemara calls for; CALM Guard implements Gemara Layers 5–7; CALM Hub is the GRC database; FINOS + OpenSSF are co-authoring this stack | 4.2, 4.4, 5.5 |
| **OpenSSF OSPS Baseline** | Open source project security controls (Gemara Layer 2): maps to CALM controls for open source supply chain security | 4.2 Lab |

**CALM Guard roadmap in the course:**
- Current state: Chapter 4.4 — governance tool overview
- v1.0 milestone: promotes to full **Module 4.5** — "AI-Driven Compliance Automation"
  - Full 6-agent squad walkthrough (Scout, Ranger, Arsenal, Sniper, Oracle, HQ)
  - Learning intelligence: pattern → deterministic rule promotion
  - CI/CD pipeline auto-generation from CALM signals
  - Security toolchain integration (SAST, SCA, SBOM)

### Potential Program Partners
| Partner | Role |
|---|---|
| Linux Foundation | Platform and delivery (FINOS is LF project; Gemara is also LF/OpenSSF) |
| OpenSSF | Gemara co-development; CALM is the machine-optimized schema Gemara calls for; joint FINOS+OpenSSF module on GRC Engineering |
| Google | SAIF module co-development |
| DTCC / FINOS FinTech | Financial services case studies (CALM Guard originated here) |
| Major cloud providers | Extension packs for AWS/GCP/Azure node types |
| Sonatype / Red Hat / CVS Health | Gemara founding maintainers — natural co-instructors for supply chain + enterprise modules |

### Delivery Formats
- **Self-paced online**: Linux Foundation EdX platform (existing FINOS relationship)
- **Instructor-led**: FINOS conference workshops (already doing OSFF workshops)
- **University partnerships**: Architecture curriculum integration
- **Enterprise training**: In-house delivery for FSI firms

### Revenue and Adoption Model
- Certification exam fees (associate: free, practitioner: $150, architect: $300)
- Enterprise cohort licensing
- Community edition always free (GitHub, no exam)
- Pattern library marketplace (free open-source, paid curated enterprise)

---

## Quick Summary: Course Map

```
MODULE 0: The 15-Min On-Ramp (0.5h)     ← "Show the magic first"
  AI-assisted CALM generation, MCP + skill, zero spec knowledge

MODULE 1: The Case for AaC (2h)         ← "Why this matters"
  IaC lessons, governance frameworks, CALM intro

MODULE 2: CALM Fundamentals (3h)        ← "Learn the language"  
  Nodes, relationships, interfaces, controls, decorators

MODULE 3: The CALM Ecosystem (3h)       ← "Learn the tools"
  CLI, Studio, Hub, Server, VSCode, Patterns, CI/CD

MODULE 4: Governance & Compliance (4h)  ← "Enterprise scale"
  CALM Guard, Gemara layers, threat models, compliance frameworks, timelines

MODULE 5: AI-Native Architecture (4h)   ← "The frontier"
  ai:* types, ARB use case, MCP, AIGF, SAIF, spec-driven dev

MODULE 6: Enterprise Adoption (4h)      ← "Make it stick"
  Terraform analogy, FSI adoption, future roadmap, Capstone (A/B/C)

TOTAL: ~20.5 hours of instruction + labs
```

---

## Primary Delivery: Video + Text Lessons + Labs + Slides

**The course ships as an asynchronous, self-paced product first.** Every chapter has parallel video AND text — learners pick the modality that fits the moment. Workshop is a delivery option layered on top of the same content.

### Why multi-modal (video + text)
- **Video** — best for demos, walkthroughs, hooks, "watch me do this" learning
- **Text lessons** — best for reference, deep dives, search/jump, code snippets to copy, screen readers, async readers, low-bandwidth audiences
- **Labs** — where the actual skill transfer happens
- **Slides/illustrations** — instructor reuse + workshop delivery + visual learners + social media clips
- Learners pace themselves — replay, skim, search
- LF EdX / Coursera / Udemy / docs.calm.finos.org all compatible
- Workshops, in-house enterprise training, university adoption all reuse the same assets

### Asset Inventory (per module)

| Asset type | Per module | Total course | Notes |
|---|---|---|---|
| **Text lessons** (Markdown/MDX, web-rendered, ~1500–3000 words per chapter) | 6–8 lessons | ~45 lessons, ~150K words | The canonical written course — readable as a book |
| **Video lessons** (5–12 min each, chapter-aligned, mirror text) | 6–8 videos | ~45 videos, ~6–8h runtime | One per text lesson; same conceptual coverage, different modality |
| **Slide decks** (Keynote/Reveal.js, exported to PDF) | 1 deck, 40–60 slides | 7 decks | Instructor reuse + standalone study |
| **Illustrations** (architecture diagrams, Gemara layer maps, flow charts) | 8–12 diagrams | ~70 SVG illustrations | Embedded in text AND slides AND videos |
| **Interactive labs** (browser-based or local Docker) | 1–3 labs | ~15 labs | The actual skill-building |
| **Lab starter repos** (GitHub templates) | 1 per lab | 15 starter repos | Forkable, version-controlled |
| **Quizzes** (knowledge checks per chapter) | 4–6 quizzes | ~40 quizzes | Auto-graded |
| **Live coding demos** (screencast, no slides) | 2–3 per module | ~15 screencasts | Raw "watch me build" content |
| **Capstone briefs** (3 scenarios — A, B, C) | — | 3 detailed PDFs | Self-contained, week-long projects |
| **Reference cheatsheets** (1-page printable) | 1 per module | 7 cheatsheets | Desk reference |
| **Glossary** (Gemara + CALM + AIGF + SAIF + FINOS CCC terms) | — | 1 living document | Cross-linked from text lessons |
| **Per-chapter "TL;DR"** (3–5 bullets summarizing the lesson) | 1 per chapter | ~45 TL;DRs | Top of every text lesson |

### Text Lesson Format
Each text lesson is a Markdown/MDX file rendered on the course site (Docusaurus or similar). Standard structure:

```
1. TL;DR              — 3-5 bullets (the gist)
2. Why it matters     — 1 paragraph hook
3. The concept        — main content (1500-3000 words)
4. Inline diagrams    — SVGs from the illustration library
5. Code/CALM examples — copy-pasteable, syntax-highlighted
6. Common mistakes    — what to avoid
7. Knowledge check    — link to quiz
8. Lab                — link to hands-on exercise
9. Further reading    — links to spec, related lessons, external refs
```

**Style discipline:**
- Plain English, FSI-aware but not FSI-only
- Code snippets must work copy-paste (no `...` ellipsis truncation)
- Every CALM example is a real, validated `.calm.json` artifact (linked to its repo)
- Cross-reference other lessons via permalinks (not chapter numbers — they shift)
- Mobile-readable (Docusaurus default works)
- Searchable (Algolia search wired in)

### Text + Video Pairing
For each chapter, video and text are **parallel, not duplicates**:
- **Text** = canonical reference; deep, complete, searchable, copy-able
- **Video** = narrative walkthrough of same concepts; demos, voice-over of diagrams, instructor presence
- Learner can: read first, video as reinforcement, OR watch first, text as reference
- Both link to the same lab — the skill verification is shared

### Production Workflow: Text-First, Video Derived
**Text is the source of truth.** Video and slides are produced from text + illustrations. This means:

```
1. Author text lesson (Markdown)
       ↓
2. Create / select illustrations referenced in text
       ↓
3. Generate slide deck from text headings + illustrations
       ↓
4. Use text as video script + slide deck as video visuals
       ↓
5. Record video (talking-head + slides + screencast where needed)
       ↓
6. Publish: text on docs site, video on platform, slides in repo
```

**Two video variants from the same text:**
- **Variant A — "Talking-head + slides"**: instructor narrates text, slides advance with key points. Cheaper, faster, replaceable when content updates.
- **Variant B — "Reading content / narrated"**: voice-over of text + illustration animations, no instructor on camera. Best for: lessons that age slowly (spec fundamentals), accessibility (auto-translatable voice), low-budget production.

**Both variants are valid deliverables.** Mix per chapter based on:
- Conceptual + stable → Variant B (cheaper, ages well)
- Demo-heavy + tooling → Variant A (instructor adds value, demos can't be auto-narrated)
- Roadmap-dependent (e.g. CALM Studio features changing) → Variant B (easier to re-record when features ship)

**Benefits of text-first:**
- Content reviewed and corrected before expensive video production
- Translation pipeline: translate text once, narrate in target language, generate localized videos
- Updates: edit text + re-narrate only changed section, don't re-shoot full video
- AI-assisted: text + illustrations can drive AI-generated video drafts (later iteration)
- Workshop instructors use text as their teaching script
- Course site launches with text-only on day one; videos roll out chapter by chapter

### Video Production Plan
**Style:** Mix of talking-head + screen-recording + animated diagrams. ~70% screen content / 30% instructor.
**Length discipline:** No video over 12 minutes. Long chapters split into multiple videos.
**Production:** Loom/ScreenStudio for code demos, Keynote/After Effects for animated diagrams, OBS for hybrid.
**Captions:** Required (accessibility + non-English audience). Auto-generated then human-reviewed.
**Code on screen:** Minimum 14pt font, dark mode default, syntax-highlighted.

### Slide / Illustration Style Guide
- **Brand:** FINOS visual identity (primary)
- **Color palette:** Gemara layer colors (L1 yellow → L7 red) used consistently in any Gemara-related illustration
- **CALM node shapes:** Match Studio canvas shapes exactly (visual continuity between slides and tool)
- **AaC → IaC analogies:** dedicated recurring slide template (left column IaC/Terraform, right column AaC/CALM)
- **Layered diagrams:** standardize on the 8-layer ARB visualization for any AI architecture example
- **All diagrams as SVG** (zoom without pixelation, exportable to slides + docs site)

### Lab Infrastructure
**Browser-based labs** (preferred — zero setup friction):
- Embedded code editor + terminal (Killercoda, GitPod, or custom)
- Pre-configured with CALM CLI, Studio web, Hub instance, Guard
- Each lab is a self-contained scenario — load, do, verify

**Local Docker option** (for enterprise students behind firewalls):
- `docker compose up` brings up Hub + Studio + Guard + sample data
- Repo: `finos/calm-workshop-stack`

**Cloud sandbox** (paid tier — for enterprise cohorts):
- Per-student VM with full toolchain + private Hub namespace
- Persists between sessions

### Interactive Lab Format
Each lab is a `.md` with:
1. **Goal** — what you're building (1 sentence)
2. **Starter** — link to GitHub template repo
3. **Steps** — numbered, with command snippets that work copy-paste
4. **Checkpoint queries** — "run `calm validate` — you should see 0 errors" verifications
5. **Stretch goals** — optional extensions for fast finishers
6. **Solution branch** — `solution/` branch in the starter repo

### Quiz Style
- Knowledge checks after each chapter (4–6 questions)
- Multiple choice + short code-completion ("what node type would you use for X?")
- Auto-graded
- Wrong answers link back to the specific video timestamp explaining the concept

### Capstone Delivery (async cohort)
- Released after Module 6 completion
- 7-day deliverable window (1 week)
- Submission: GitHub repo with CALM JSON + writeup PDF + 5-min screencast
- Peer review: each student reviews 2 peer capstones (rubric provided)
- Final cert: passes peer review + 60-min online cert exam

---

## Optional Delivery Format: 5-Day Instructor-Led Workshop

**For organizations that want intensive, hands-on delivery with live instructor support.** Uses the same video assets as pre-class prep + reference, freeing class time for hands-on work and discussion.

**Format:** 5 days × 4 hours = 20 hours instruction. Capstone work continues post-workshop (1-week deliverable window) with peer review + certification on Day 5+7.

**Recommended block structure per day:**
```
0:00 – 1:45   Block A (concept + demo, instructor-led)        [105 min]
1:45 – 2:00   Break                                           [15 min]
2:00 – 3:45   Block B (hands-on lab, paired/group work)       [105 min]
3:45 – 4:00   Wrap, Q&A, preview next day                     [15 min]
```

### Day 1: Hook + Foundations
**Goal:** Every student walks away with a valid CALM doc on their machine and understands why it matters.

| Time | Block | Content |
|---|---|---|
| 0:00–0:30 | Welcome + Module 0 | 15-min wow demo (markdown ARB → CALM JSON, live, on screen) + 15-min hands-on setup (everyone installs calmstudio-mcp, produces their first CALM doc by describing a system) |
| 0:30–1:45 | Module 1 Block A | The Architecture Debt Crisis, IaC lessons, governance frameworks (Gemara, AIGF, SAIF, NIST, DORA), CALM intro |
| 1:45–2:00 | Break | |
| 2:00–3:45 | Module 2 Block B (lab) | Nodes + relationships hands-on: build conference signup architecture node by node in CLI + Studio. Validate. Visualize. |
| 3:45–4:00 | Day 1 wrap | Each student commits their Day 1 CALM doc to a workshop repo. Preview Day 2. |

**Day 1 takeaway:** "I can produce a CALM document. I know what AaC is and why my org needs it."

### Day 2: The CALM Language + Toolchain
**Goal:** Master the spec vocabulary and the toolchain that surrounds it.

| Time | Block | Content |
|---|---|---|
| 0:00–1:45 | Module 2 Block A | Interfaces, controls, decorators, metadata. Common pitfalls (no `container`, no `component`). The 9 + 15 node type discipline. |
| 1:45–2:00 | Break | |
| 2:00–3:45 | Module 3 Block B (lab) | CLI deep dive (validate, generate, diff, docify) + Studio canvas + Hub registry walkthrough + VSCode extension. Lab: extend Day 1 doc with interfaces, controls, decorators. Publish to a shared Hub instance. |
| 3:45–4:00 | Day 2 wrap | Hub-published architecture review by peer. |

**Day 2 takeaway:** "I can read and write the spec fluently. I know which tool fits which task."

### Day 3: Patterns + Governance + Compliance
**Goal:** Move from individual architecture to organizational governance.

| Time | Block | Content |
|---|---|---|
| 0:00–1:45 | Module 3.6/3.7 + Module 4 Block A | Patterns and standards. CI/CD integration. **Gemara 7-layer model walkthrough** (the conceptual spine for the whole day). Compliance frameworks: FINOS CCC, SOX, DORA, SR 11-7 intro. Threat modeling as code. |
| 1:45–2:00 | Break | |
| 2:00–3:45 | Module 4 Block B (lab) | Lab 4A: Run CALM Guard on the multi-agent reference architecture. Lab 4B: Add SR 11-7 controls to a credit scoring skeleton, fix failing controls. Lab: build one organizational pattern, push to Hub, validate an architecture against it. |
| 3:45–4:00 | Day 3 wrap | Map each student's architecture to Gemara layers — quick exercise. |

**Day 3 takeaway:** "I can enforce architecture standards at org scale. I understand where CALM fits in the Gemara GRC stack."

### Day 4: AI-Native Architecture
**Goal:** Master `ai:*` types, AI governance overlays, and the spec-driven development workflow.

| Time | Block | Content |
|---|---|---|
| 0:00–1:45 | Module 5 Block A | `ai:*` node types (all 15). FINOS Multi-Agent Reference Architecture deep dive — convert it live in class. calmstudio-mcp tools tour. AIGF + SAIF + Gemara as governance overlays. Spec-driven development workflow. |
| 1:45–2:00 | Break | |
| 2:00–3:45 | Module 5 Block B (lab) | Lab 5A (everyone): model a real AI product in CALM with `ai:*` types, attach AIGF + SAIF + FINOS Multi-Agent Threat Model decorators. **Split track:** Lab 5B (wealth) or Lab 5C (credit scoring) — students pick their FSI domain. |
| 3:45–4:00 | Day 4 wrap | Capstone selection: students pick Scenario A, B, or C. Receive capstone brief. |

**Day 4 takeaway:** "I can model AI/agentic systems. I know how CALM enables AI governance and spec-driven dev."

### Day 5: Enterprise Adoption + Capstone Sprint
**Goal:** Complete a capstone scaffold during workshop; ship full version within 1 week.

| Time | Block | Content |
|---|---|---|
| 0:00–1:30 | Module 6 Block A | Terraform analogy and adoption playbook. FSI deep dive (MiFID II, SR 11-7, ECOA, HMDA case walkthroughs). Future of CALM. Contributing to FINOS. |
| 1:30–1:45 | Break | |
| 1:45–3:30 | Capstone Sprint (lab) | Hands-on capstone scaffold: students start their chosen scenario (A/B/C) — at minimum produce: nodes + relationships + 3 controls + 1 threat decorator + Gemara layer map. Instructor circulates as mentor. |
| 3:30–4:00 | Workshop close | Each student demos their scaffold (90 seconds each). Certification path explained: full capstone due in 7 days, peer review, Architect cert awarded. Group photo. Next steps: contribute a pattern, join FINOS CALM Working Group. |

**Day 5 takeaway:** "I have a capstone in flight. I am part of the FINOS CALM community. I know how to bring this back to my org."

### Post-Workshop (Days 6–14)
- Capstone completion (self-paced, ~6–8 hours of work)
- Peer review window (~2 hours of reviewing 2 peer capstones)
- Final cert exam (60 min, multiple choice + one-shot architecture exercise)
- Architect certification awarded

---

### Workshop Format Variants

| Format | Duration | Audience | Modules covered |
|---|---|---|---|
| **Full Workshop** (this design) | 5 days × 4h | Mixed FSI architects, platform engineers, security | All modules + capstone |
| **3-Day Intensive** | 3 days × 6h | Senior architects, "I already get IaC" crowd | Module 0–5, skip Module 6, take-home capstone |
| **1-Day Executive Briefing** | 1 day × 6h | CTOs, VPs, decision-makers | Module 0 + Module 1 + Module 6 (the "why" + "what to expect" pitch) |
| **OSFF Conference Workshop** | 4 hours | Conference attendees | Module 0 + Module 1 + Module 5 demo (the wow track) |
| **University Course** | 13 weeks × 1.5h | CS / SE undergraduates | All modules, weekly labs, semester capstone |
| **Self-Paced Online** | ~25h asynchronous | Anyone | All modules with recorded videos + interactive labs (LF EdX) |
| **Enterprise In-House** | Customised 3–10 days | Bank/insurer internal team | All modules + custom org pattern library development + Hub setup |

### Instructor Requirements
**Lead instructor must:**
- Hold CALM Architect certification (or equivalent FINOS contributor status)
- Have shipped a CALM architecture in production OR contributed to the CALM spec/tooling
- Be able to demo Module 0 in 5 minutes with zero prep on any system the audience suggests

**Co-instructor / TA (recommended for >15 students):**
- CALM Practitioner certification
- Handles labs, debugging, individual help during lab blocks

### Pre-Workshop Prep (Student Side)
Sent 1 week before workshop:
- Laptop requirements: Node 22+, VSCode, git
- Optional: Claude Code CLI or Claude Desktop installed
- Read: 1-page CALM intro (homework)
- Bring: a real system from your work you want to model (informal — used for Day 1 lab)

### Pre-Workshop Prep (Instructor Side)
- Workshop GitHub repo with starter materials per day
- Shared CALM Hub instance (provisioned, accounts ready)
- Lab environment: Docker Compose with Hub + Studio + Guard
- Backup plan: cloud sandbox if local install fails
- Slack/Discord channel for the cohort

---

## Immediate Next Steps

1. **FINOS proposal**: Submit as a FINOS project proposal at the Working Group level
2. **Advisory board**: Invite 3–5 enterprise architects from FINOS member firms to validate curriculum
3. **Pilot cohort**: Run Module 0–3 as a free workshop at the next OSFF (Open Source in Finance Forum) — Module 0 is the wow demo
4. **Content production**: Record Module 0 as a 5-min teaser video for community feedback
5. **Pattern library seed**: Curate 10 reference patterns (3-tier web, microservices, multi-agent AI, wealth management, credit scoring) as course examples
6. **LF EdX partnership**: Engage Linux Foundation Training team (FINOS is already on the platform)

---

## Product Roadmap — Features Assumed by Curriculum

The curriculum assumes the features below exist. Items marked **EXISTS** are shipping today. Items marked **GAP** need to be added to roadmap for the course to teach as written.

### CALM Guard Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| Compliance skills: SOX, PCI-DSS, NIST-CSF, FINOS-CCC, SOC2 | **EXISTS** | Module 4.2 | — |
| 6-agent squad (Scout, Ranger, Arsenal, Sniper, Oracle, HQ) | **EXISTS** | Module 4.4 | — |
| Learning intelligence (pattern → deterministic rule promotion) | **EXISTS** | Module 4.4 | — |
| GitHub Actions pipeline generation | **EXISTS** | Module 4.4 | — |
| **SR 11-7 skill (model risk management)** | **GAP** | Module 4.2, Scenario C, Lab 4B | **P0** — required for credit-scoring capstone |
| **ECOA / Regulation B / fair lending skill** | **GAP** | Module 4.2, Scenario C | **P0** |
| **HMDA / disparate impact analysis skill** | **GAP** | Scenario C bias-monitor controls | **P0** |
| **FCRA skill (credit bureau data handling)** | **GAP** | Scenario C | **P1** |
| **MiFID II skill** | **GAP** | Module 6.3, Scenario B | **P0** — required for wealth management capstone |
| **DORA skill (EU operational resilience)** | **GAP** | Module 1.4, 6.3 | **P0** — EU FSI students |
| **AIGF compliance skill** | **GAP** | Module 5.5 | **P0** — flagship AI governance check |
| **SAIF compliance skill** | **GAP** | Module 5.5 | **P0** |
| **Gemara layer-annotated report output** | **GAP** | Module 4.2, all FSI capstones | **P0** — flagship OpenSSF integration |
| **OSPS Baseline skill (OpenSSF supply chain)** | **GAP** | Module 4.2 Lab | **P1** |
| **FINOS Multi-Agent Threat Model skill** | **GAP** | Module 4.3 | **P0** — currently we add decorators manually; Guard should detect missing threat coverage |
| **Bias / fairness analysis agent** (new agent role) | **GAP** | Scenario C `bias-monitor`, Scenario B `bias-monitor` | **P0** |
| **Architectural reachability validator** (no path from X to Y without passing through Z) | **GAP** | Lab 5B, Lab 5C structural controls | **P0** — turns CALM into static analysis tool |
| **Hub-integrated compliance** (Guard pulls architectures from Hub by namespace+version) | **GAP** | Module 3.7, 4.6 | **P1** |
| **Continuous monitoring mode** (Guard as long-running service vs. one-shot) | **GAP** | Module 4.4 Gemara Layer 7 | **P1** |
| **Evidence package export** (Gemara L7 audit format) | **GAP** | All capstones, Module 4.6 | **P0** |
| **Model committee gate workflow** (approval state tracked in Guard) | **GAP** | Scenario C C-CR-05 | **P2** |

### CALM Studio Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| 9 core node types with shapes | **EXISTS** | Module 2 | — |
| 5 relationship types with edge styles | **EXISTS** | Module 2 | — |
| Bidirectional code/canvas sync | **EXISTS** | Module 3.2 | — |
| ELK auto-layout | **EXISTS** | Module 3.2 | — |
| Export JSON/SVG/PNG | **EXISTS** | Module 3.2 | — |
| **`ai:*` node type rendering** (15 distinct shapes/icons) | **GAP** | Module 5.2, all AI labs | **P0** — currently render as generic |
| **Gemara layer overlay** (toggle to color-code nodes by L1–L7) | **GAP** | Module 4 Gemara lab | **P0** — visual aid for the most-taught concept |
| **AIGF / SAIF governance overlay** (toggle to highlight nodes with governance decorators) | **GAP** | Module 5.5 | **P1** |
| **Compliance coverage heatmap** (red/yellow/green per node based on control attachment) | **GAP** | Module 4.4 | **P1** |
| **Regulatory citation annotation** (right-click node → "show regulatory mandates") | **GAP** | Module 6.3, all capstones | **P2** |
| **Human-in-the-loop flow highlight** (special edge rendering for approval gates) | **GAP** | Scenario B trade-approval-gate visualization | **P1** |
| **Timeline view** (show architecture at past/current/future milestones) | **GAP** | Module 4.5, Capstone timelines | **P0** |
| **Pattern library browser** (browse Hub patterns from Studio) | **GAP** | Module 3.6, 6.2 | **P1** |
| **One-click "publish to Hub"** | **GAP** | Module 3.7 | **P0** — required for Hub-centric workflow |
| **Bulk import from Lucidchart / drawio / Visio** | **GAP** | Module 0 ease-of-entry | **P2** |
| **Diff view** (side-by-side architecture versions from Hub) | **GAP** | Module 3.7 | **P1** |

### calmstudio-mcp Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| 21 tools (create/add/finalize/export/render) | **EXISTS** | Module 0, 5.4 | — |
| `read_calm_guide` (general + arb-conversion topics) | **EXISTS** | Module 0 | — |
| `add_threat_decorator` | **EXISTS** | Module 4.3 | — |
| AIGF auto-attach on `ai:*` detection in `finalize_architecture` | **EXISTS** | Module 5.5 | — |
| Dual transport (stdio + streamable HTTP) | **EXISTS** | Module 0.4 | — |
| **`read_calm_guide` topic: `sr-11-7`** | **GAP** | Scenario C, Lab 5C | **P0** |
| **`read_calm_guide` topic: `mifid-ii`** | **GAP** | Scenario B, Lab 5B | **P0** |
| **`read_calm_guide` topic: `ecoa-fair-lending`** | **GAP** | Scenario C | **P0** |
| **`read_calm_guide` topic: `gemara-layers`** | **GAP** | Module 4.2 | **P0** — flagship integration |
| **`read_calm_guide` topic: `wealth-management`** | **GAP** | Scenario B onboarding | **P1** |
| **`read_calm_guide` topic: `credit-scoring`** | **GAP** | Scenario C onboarding | **P1** |
| **`apply_pattern` tool** (instantiate architecture from a Hub pattern by name+version) | **GAP** | Module 3.6, 6.2 | **P0** |
| **`publish_to_hub` tool** (push current architecture to Hub with namespace+version) | **GAP** | Module 3.7 | **P0** |
| **`pull_from_hub` tool** (load architecture or pattern from Hub) | **GAP** | Module 3.7 | **P0** |
| **`validate_reachability` tool** (assert no path from X to Y without passing through Z) | **GAP** | Lab 5B, Lab 5C structural controls | **P0** |
| **`add_aigf_mapping` tool** (map node to specific AIGF dimension explicitly) | **GAP** | Module 5.5 | **P1** |
| **`add_saif_mapping` tool** (map node to SAIF principle explicitly) | **GAP** | Module 5.5 | **P1** |
| **`gemara_layer_assign` tool** (annotate each node with its Gemara layer; surface in Studio overlay) | **GAP** | Module 4.2 | **P0** |
| **`import_from_diagram` tool** (image/URL → CALM draft via vision LLM) | **GAP** | Module 0 path B | **P0** — Module 0 onboarding magic |
| **`import_from_markdown` tool** (markdown ARB doc → CALM, baked-in `calm-arb-convert` workflow) | **GAP** | Module 0 path C | **P0** |
| **`generate_threat_decorator_from_framework` tool** (pull FINOS Multi-Agent Threat Model and auto-attach by layer) | **GAP** | Module 4.3 | **P0** — currently manual |
| **`finalize_architecture` returns Gemara coverage report** (which layers each node fills, gaps) | **GAP** | Module 4 flagship feature | **P0** |

### CALM Hub Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| Architecture, pattern, control CRUD | **EXISTS** | Module 3.3 | — |
| Namespaces | **EXISTS** | Module 3.3 | — |
| MCP endpoint | **EXISTS** | Module 5.4 | — |
| Storage modes (Mongo/Nitrite) | **EXISTS** | Module 3.3 | — |
| **Versioning with semver per artifact** | **GAP** (partial) | Module 3.3, 3.7 | **P0** — required for "pull by version" workflow |
| **`calm hub push/pull` CLI commands** | **GAP** | Module 3.3 demo | **P0** |
| **Hub-hosted ARB reference architectures** (the FINOS Multi-Agent ARB as a Hub-published pattern) | **GAP** | Module 5.3 | **P0** |
| **Hub-hosted SR 11-7 pattern** | **GAP** | Scenario C | **P0** |
| **Hub-hosted wealth management pattern** | **GAP** | Scenario B | **P0** |
| **Hub-hosted FINOS CCC control catalog as queryable artifact** | **GAP** | Module 4.2 | **P0** |
| **Hub-hosted Gemara layer ontology** | **GAP** | Module 4.2 | **P1** |
| **Hub-hosted AIGF + SAIF decorator templates** | **GAP** | Module 5.5 | **P0** |
| **Hub diff API** (compare two versions of same architecture) | **GAP** | Module 3.7 | **P1** |
| **Hub federation** (FINOS-hosted public Hub + private org Hubs) | **GAP** | Module 6.2 vision | **P2** |

### CALM CLI Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| `validate`, `generate`, `diff`, `template`, `docify`, `init-ai` | **EXISTS** | Module 3.1 | — |
| **`calm hub push/pull/list`** | **GAP** | Module 3.3, 3.7 | **P0** |
| **`calm guard run` (invoke Guard from CLI)** | **GAP** | Module 4 labs | **P1** |
| **`calm gemara map`** (output Gemara layer assignment per node) | **GAP** | Module 4.2 | **P1** |
| **`calm import diagram <image>`** (vision LLM → CALM) | **GAP** | Module 0 | **P1** |
| **`calm import markdown <url>`** (wraps `calm-arb-convert` workflow as a CLI command) | **GAP** | Module 0 | **P0** |

### CALM Spec Roadmap

| Feature | Status | Curriculum dependency | Priority |
|---|---|---|---|
| 9 core node types | **EXISTS** | Module 2.2 | — |
| 5 relationship types | **EXISTS** | Module 2.3 | — |
| Controls, decorators, interfaces, metadata, flows, timelines | **EXISTS** | Module 2 | — |
| 15 `ai:*` node types | **EXISTS** (in 1.2 draft) | Module 5.2 | — |
| **AIGF decorator schema (formal)** | **GAP** | Module 5.5 | **P0** |
| **SAIF decorator schema (formal)** | **GAP** | Module 5.5 | **P0** |
| **Gemara layer attribute on every node** (`gemara-layer: 4`) | **GAP** | Module 4.2 | **P0** |
| **SR 11-7 control schema (model governance fields)** | **GAP** | Scenario C | **P0** |
| **MiFID II suitability/best-execution control schema** | **GAP** | Scenario B | **P1** |
| **Reachability assertion schema** ("no path from A to B without C") | **GAP** | Lab 5B, 5C | **P0** |

---

## Roadmap Priorities — One-Page Summary

**P0 items (course-blocking — must ship before launch):**

CALM Guard:
- SR 11-7, ECOA, HMDA, MiFID II, DORA compliance skills
- AIGF + SAIF compliance skills
- Gemara layer-annotated report output
- FINOS Multi-Agent Threat Model skill
- Bias/fairness analysis agent
- Architectural reachability validator
- Evidence package export

CALM Studio:
- `ai:*` node type rendering (15 icons)
- Gemara layer overlay
- Timeline view
- One-click "publish to Hub"

calmstudio-mcp:
- `read_calm_guide` topics: sr-11-7, mifid-ii, ecoa-fair-lending, gemara-layers
- `apply_pattern`, `publish_to_hub`, `pull_from_hub`, `validate_reachability` tools
- `gemara_layer_assign` tool
- `import_from_diagram`, `import_from_markdown` tools
- `generate_threat_decorator_from_framework` tool
- `finalize_architecture` returns Gemara coverage report

CALM Hub:
- Semver versioning per artifact
- `calm hub push/pull` CLI
- Hosted FINOS ARB, SR 11-7, wealth management patterns
- Hosted FINOS CCC, AIGF, SAIF decorator templates

CALM CLI:
- `calm hub push/pull/list`
- `calm import markdown`

CALM Spec:
- AIGF, SAIF decorator schemas
- Gemara layer attribute
- SR 11-7 control schema
- Reachability assertion schema

**Suggested sequencing:**
1. **Q1**: Spec additions (AIGF/SAIF/Gemara/SR 11-7 schemas) + Hub versioning + CLI hub commands
2. **Q2**: calmstudio-mcp tools (apply_pattern, publish_to_hub, pull_from_hub, gemara_layer_assign, import_from_markdown)
3. **Q3**: CALM Guard skills (SR 11-7, ECOA, MiFID II, DORA, AIGF, SAIF, Gemara reporting)
4. **Q4**: CALM Studio AI rendering + Gemara overlay + timeline view; reachability validator across the stack
5. **Q1 next year**: Course pilot at OSFF
