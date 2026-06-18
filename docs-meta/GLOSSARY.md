# CALM Academy — Glossary

A reference for the 20 ecosystem terms used across Modules 0–3.
Terms are organized alphabetically. Each entry includes: definition,
example usage, and link to the lesson chapter where the term is taught.

This glossary bridges the gap for learners who encounter ARB, AIGF, SAIF, Gemara,
CALM Guard, and GRIS in Modules 0–1 before their full-chapter treatment in Modules 4–5.

---

## Terms

| Term | Definition | Example usage | Lesson |
|------|------------|---------------|--------|
| **AIGF** | FINOS AI Governance Framework — auto-attaches governance overlays to architectures containing `ai:*` node types | "The AIGF decorator set is automatically applied when a CALM doc contains an `ai:agent` node." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **ARB** | FINOS Architectural Reference Board — defines canonical architecture patterns used as CALM pattern sources | "The FINOS Multi-Agent ARB pattern provides a validated blueprint for `ai:agent` orchestration." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **Architecture as Code (AaC)** | The practice of expressing software architecture as versioned, machine-readable specification files rather than static diagrams | "We store our system topology as a `.calm.json` file in git, alongside the code that implements it." | [Introducing CALM](/docs/module-01-case-for-aac/introducing-calm) |
| **CALM** | Common Architecture Language Model — FINOS open standard (version 1.2) for expressing software architecture as a machine-readable JSON schema | "A valid CALM document passes `calm validate -a`." | [Introducing CALM](/docs/module-01-case-for-aac/introducing-calm) |
| **CALM Guard** | An AI-driven compliance automation system (6-agent squad) that validates CALM documents against governance controls | "CALM Guard checks each architecture against CCC controls before it can be promoted." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **CALM Hub** | The versioned registry of CALM artifacts (patterns, architectures, controls) — analogous to npm for architecture | "The team publishes their approved architecture to CALM Hub as version 1.3.0." | [CALM Hub: Architecture Registry](/docs/module-03-calm-ecosystem/calm-hub-architecture-registry) |
| **CALM Server** | A headless service that exposes CALM Hub functionality over HTTP | "The CI pipeline validates architecture changes against the team's CALM Server instance." | [CALM Server: Validation Service](/docs/module-03-calm-ecosystem/calm-server-validation-service) |
| **CALM Studio** | Browser-based visual canvas for CALM architecture authoring at studio.calm.finos.org | "Use CALM Studio to drag nodes onto the canvas and generate the JSON automatically." | [CALM Studio: Visual Design](/docs/module-03-calm-ecosystem/calm-studio-visual-design) |
| **calmstudio-mcp** | A Model Context Protocol server that enables AI assistants (Claude, Copilot) to create and validate CALM documents directly | "With calmstudio-mcp active, you describe your system in 3 sentences and Claude generates the `.calm.json`." | [Three Paths to Your First CALM Document](/docs/module-00-on-ramp/three-paths-to-first-calm-doc) |
| **control** | A governance constraint attached to a CALM node or relationship, mapping to a compliance framework requirement | "The database node has a control referencing CCC-DATA-003 requiring encryption at rest." | [Controls](/docs/module-02-calm-fundamentals/controls) |
| **decorator** | A CALM metadata extension that adds cross-cutting concerns (governance, compliance, AI attributes) without changing the structural schema | "An `ai:*` decorator on a service node signals it contains model inference logic subject to AIGF." | [Decorators](/docs/module-02-calm-fundamentals/decorators) |
| **FINOS CCC** | FINOS Common Cloud Controls — catalog of cloud control requirements used as the standard control vocabulary in CALM governance | "A CALM Guard validation run maps each control to a CCC identifier." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **Gemara** | OpenSSF 7-layer GRC Engineering Model; CALM is its Layer 4 (Sensitive Activities) | "The Gemara stack sits below the team's development workflow — CALM is the layer where architectural risk is captured." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **GRIS** | FINOS Generative Regulatory Intelligence System — maps regulatory text to CALM controls | "GRIS parsed the MiFID II text and generated the corresponding CALM control set." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **interface** | A CALM schema object that defines the transport and protocol contract between two connected nodes | "The HTTPS interface specifies TLS 1.3 and port 443 between the webclient and service nodes." | [Interfaces](/docs/module-02-calm-fundamentals/interfaces) |
| **node type** | One of the 9 core CALM types (actor, ecosystem, system, service, database, network, ldap, webclient, data-asset) that classify architectural components | "A PostgreSQL database maps to the `database` node type; a React SPA maps to `webclient`." | [Nodes](/docs/module-02-calm-fundamentals/nodes) |
| **pattern (CALM)** | A reusable, parameterized CALM architecture template stored in CALM Hub and instantiated for specific use cases | "The team forked the FINOS microservices pattern and set their own service names." | [Patterns and Standards](/docs/module-03-calm-ecosystem/patterns-and-standards) |
| **relationship** | A directed CALM link between two nodes representing a data flow, dependency, or communication path | "A `connects` relationship from the `webclient` node to the `api-gateway` service documents the REST API call flow." | [Relationships](/docs/module-02-calm-fundamentals/relationships) |
| **SAIF** | Google Secure AI Framework — security framework for AI systems, mappable to CALM `ai:*` node types and decorators | "The SAIF threat surface map is used to choose which `ai:*` decorators apply to each model node." | [Governance Frameworks and AaC](/docs/module-01-case-for-aac/governance-frameworks-and-aac) |
| **validation** | The process of checking a CALM JSON file against the 1.2 schema using `calm validate -a` | "`calm validate -a my-system.calm.json` exits 0 if the file is schema-valid." | [The CALM CLI: Your Architecture Toolbox](/docs/module-03-calm-ecosystem/cli-toolbox) |

---

## Abbreviation Reference

| Abbreviation | Expanded form |
|-------------|---------------|
| AaC | Architecture as Code |
| AIGF | AI Governance Framework |
| ARB | Architectural Reference Board |
| CALM | Common Architecture Language Model |
| CCC | Common Cloud Controls |
| GRIS | Generative Regulatory Intelligence System |
| MCP | Model Context Protocol |
| SAIF | Secure AI Framework |

---

## Term Coverage by Module

| Module | Terms first introduced |
|--------|----------------------|
| Module 0 — On-Ramp | CALM, CALM Studio, calmstudio-mcp, validation |
| Module 1 — Case for AaC | Architecture as Code, AIGF, ARB, CALM Guard, FINOS CCC, Gemara, GRIS, SAIF |
| Module 2 — CALM Fundamentals | control, decorator, interface, node type, relationship |
| Module 3 — CALM Ecosystem | CALM Hub, CALM Server, pattern |

Terms listed under "first introduced" are the module where the concept is covered.
For governance-focused terms (AIGF, Gemara, SAIF, CALM Guard, GRIS, CCC), the full
treatment is deferred to Modules 4–5 (v2 scope). This glossary provides the working
definition needed for Modules 0–3 context.

---

*20 terms. Last updated: 2026-06-18*
