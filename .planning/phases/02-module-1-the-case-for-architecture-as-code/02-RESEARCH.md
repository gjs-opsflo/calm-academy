# Phase 2: Module 1 — The Case for Architecture as Code — Research

**Researched:** 2026-06-15
**Domain:** Content authoring — persuasive/conceptual module (MDX chapters, Excalidraw illustrations, Marp slide deck, YAML quiz)
**Confidence:** HIGH

---

## Summary

Phase 2 produces Module 1 end-to-end: five MDX chapters making the case for Architecture as Code, a YAML quiz, 8–10 Excalidraw B&W illustration stubs, and the first slide deck (SLIDE-01, Marp format, 20–30 slides). Module 1 is the conceptual spine of the course — it must earn learner buy-in before the spec deep-dive in Module 2. Unlike Module 0 (which showed the magic) and Module 2 (which teaches the vocabulary), Module 1 answers "why does this matter?" It is persuasive and narrative in tone, not reference-grade or procedural.

The five chapters map directly to CURRICULUM.md: Architecture Debt Crisis (1.1), Lessons from Adjacent Disciplines (1.2), What AaC Enables (1.3), Governance Frameworks (1.4), and Introducing CALM (1.5). The IaC analogy is the structural spine of Chapter 1.2 and echoes across the entire module. Gemara enters in Chapter 1.4 — at Module 1 depth only (overview, not the full 7-layer treatment of Module 4). AIGF and SAIF are mentioned but not taught deeply here. The FINOS ecosystem map illustration is the flagship visual for this module.

No lab is in scope for Module 1. The only hands-on component is an in-lesson reflection exercise in Chapter 1.5 (sketch a familiar system from memory and identify gaps). The slide deck is the new production artifact type introduced in this phase and requires Marp Markdown format stored in `slides/module-01-case-for-aac.md`. No CALM JSON code examples are required for this module — it is entirely concept-driven.

**Primary recommendation:** Sequence work as text (5 chapters) → illustration stubs (8–10 specs) → quiz YAML → slide deck. Illustrations and slide deck are derived from text; text is the source of truth. Marp is the correct slide format — it is actively maintained, aligns with the project's Markdown-first philosophy, and slides can be stored as a single `.md` file that renders via `npx @marp-team/marp-cli`.

---

## Project Constraints (from CLAUDE.md)

### Spec discipline
- 9 core CALM node types only (not deeply used in Module 1 — conceptual intro only) [VERIFIED: architecture-as-code/calm/release/1.2/meta/core.json]
- No invented node types — any CALM references in Module 1 must use correct types
- CALM 1.2 is the pinned spec

### Production workflow (locked)
- **Text-first:** Never produce slide deck before text chapters exist. Never produce quiz before text chapters exist.
- No CALM JSON code examples required in Module 1 (conceptual module — no hands-on artifacts)
- Cross-reference Module 0 chapters by permalink slug, not chapter number [CITED: CLAUDE.md]

### Authoring standards
- MDX chapter structure: frontmatter → TL;DR → Why it matters → Concept → Inline diagrams → Common mistakes → Knowledge check → Further reading [CITED: docs-meta/STYLE-GUIDE.md]
- Module 1 tone is **persuasive, narrative, IaC-historical** — not reference-grade [CITED: docs-meta/STYLE-GUIDE.md tone calibration table]
- Illustrations: Excalidraw, B&W only, user authors, Claude Code provides stubs + INVENTORY.md entries [CITED: docs-meta/ILLUSTRATION-STANDARDS.md]
- No DCO sign-off, no Co-Authored-By [CITED: CLAUDE.md commit conventions]

### Lab: not in scope
- Module 1 has no dedicated interactive lab. There is a reflection exercise in Chapter 1.5 embedded in the lesson text (not a LAB.md file). [CITED: CURRICULUM.md Chapter 1.5]

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MOD-02 | Module 1 has 5 fully-authored MDX chapters covering architecture debt crisis, lessons from IaC adoption, CALM introduction and positioning, FINOS ecosystem overview, and governance landscape | Chapter structure mapped in CURRICULUM.md Chapters 1.1–1.5; STYLE-GUIDE.md governs structure and tone |
| QUIZ-02 | Module 1 quiz tests: AaC value proposition, CALM vs static diagrams, FINOS ecosystem relationships, Gemara/AIGF/SAIF at a glance | QUIZ-FORMAT.md schema; topic areas map to chapters 1.1–1.5; 4–6 questions per chapter |
| ILL-02 | Module 1 has 8–10 Excalidraw B&W illustrations: architecture drift timeline, IaC analogy diagram, FINOS ecosystem map, Gemara 7-layer overview, CALM as Layer 4 | ILLUSTRATION-STANDARDS.md governs style; 5 flagship concepts identified; remainder fill chapter needs |
| SLIDE-01 | Module 1 slide deck (Marp format) — 20–30 slides covering module chapters, inline illustrations, speaker notes matching text chapters | Marp @marp-team/marp-cli confirmed at 4.4.0; slides/module-01-case-for-aac.md is the target file |
</phase_requirements>

---

## Architectural Responsibility Map

Module 1 is a content authoring phase. No running system. The "architecture" is the production workflow.

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| MDX chapter authoring (5 chapters) | Content filesystem | Docusaurus (rendering, Phase 5) | Text lives in `content/module-01-case-for-aac/`; Docusaurus not yet bootstrapped |
| Quiz YAML | Content filesystem | Quiz MDX component (Phase 5) | Data file format must be correct now; rendering built in Phase 5 |
| Excalidraw illustration stubs | Claude Code (spec + stub files) | User (Excalidraw authoring) | Claude Code provides spec + placeholder SVG; user authors actual drawings |
| Slide deck (Marp) | Content filesystem | Marp CLI (rendering) | `slides/module-01-case-for-aac.md` is source; Marp CLI converts to PDF/HTML |
| INVENTORY.md updates | Content filesystem | — | Illustration index updated each phase |

---

## Standard Stack

### Core — What This Phase Uses

| Tool | Version/Location | Purpose | Why Standard |
|------|--------------------|---------|--------------|
| MDX (Docusaurus 3.x compatible) | Compatible with Docusaurus 3.x | Chapter format | Locked by project; all content in MDX |
| YAML | Standard | Quiz data file | QUIZ-FORMAT.md schema; same as Module 0 quiz |
| Excalidraw | Desktop / agentic skill | B&W illustrations | Locked by project; user skill already exists |
| `@marp-team/marp-cli` | 4.4.0 (via `npx`) | Slide deck conversion (MD → PDF/HTML) | Actively maintained; Markdown-first; single `.md` source file matches project conventions |

[VERIFIED: npm registry] — `@marp-team/marp-cli@4.4.0` confirmed via `npm view @marp-team/marp-cli version`, last modified 2026-05-06.

### Marp Slide Format

The slide deck lives at `slides/module-01-case-for-aac.md`. Marp syntax uses `---` as slide separator; `<!-- slide comment -->` for speaker notes via `<!--  -->` or `<!-- _class: ... -->`:

```markdown
---
marp: true
theme: default
paginate: true
---

# Module 1: The Case for Architecture as Code
## *"Terraform transformed infrastructure. CALM transforms architecture."*

---

## Architecture lives in PowerPoint

- Diagrams lie
- Nobody updates them
- AI cannot read them
- CI/CD cannot validate them

<!--
Speaker note: Open with the real-world problem. Ask the audience: when did your architecture diagram last perfectly match production?
-->

---
```

Marp renders via `npx @marp-team/marp-cli slides/module-01-case-for-aac.md --output slides/module-01-case-for-aac.pdf`. [VERIFIED: marp.app documentation]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Marp (chosen) | Reveal.js | Reveal.js requires HTML boilerplate and a build step; Marp keeps slides as pure Markdown — better fit for the project's text-first philosophy |
| `npx @marp-team/marp-cli` | `@marp-team/marp-core` (library) | marp-core is a library for embedding; marp-cli is the right tool for generating standalone slide files |

---

## Package Legitimacy Audit

Only one new package is introduced in this phase for slide rendering.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---------|----------|-----|-----------|-------------|-----------|-------------|
| `@marp-team/marp-cli` | npm | ~6 yrs (active) | High (FOSS presentation tool) | github.com/marp-team/marp-cli | [ASSUMED — slopcheck unavailable] | Approved — well-established FOSS project, official marp.app ecosystem |

**Packages removed due to slopcheck [SLOP] verdict:** none

**Packages flagged as suspicious [SUS]:** none — `@marp-team/marp-cli` is the official CLI for the Marp presentation ecosystem, scoped under the `@marp-team` GitHub organization, actively maintained (last published 2026-05-06).

*slopcheck was unavailable at research time. Package is tagged [ASSUMED] above. The planner should add a `checkpoint:human-verify` step before the slide rendering task that confirms `npm view @marp-team/marp-cli` returns a valid result.*

---

## Architecture Patterns

### Content File Layout (canonical)

```
content/
└── module-01-case-for-aac/
    ├── architecture-debt-crisis.mdx           # Chapter 1.1
    ├── lessons-from-adjacent-disciplines.mdx  # Chapter 1.2
    ├── what-architecture-as-code-enables.mdx  # Chapter 1.3
    ├── governance-frameworks-and-aac.mdx      # Chapter 1.4
    └── introducing-calm.mdx                   # Chapter 1.5

illustrations/
├── source/
│   ├── m01-architecture-drift-timeline.excalidraw
│   ├── m01-iac-analogy.excalidraw
│   ├── m01-finos-ecosystem-map.excalidraw
│   ├── m01-gemara-7-layers-overview.excalidraw
│   ├── m01-calm-as-layer-4.excalidraw
│   ├── m01-aac-stack.excalidraw          # Terraform → CALM → Policy stack
│   ├── m01-architecture-debt-compound.excalidraw
│   ├── m01-calm-ecosystem-flywheel.excalidraw
│   └── m01-governance-landscape.excalidraw    # optional 9th
└── exported/
    └── (matching .svg files)

quizzes/
└── module-01-case-for-aac.yaml            # QUIZ-02

slides/
└── module-01-case-for-aac.md             # SLIDE-01
```

### MDX Chapter Frontmatter Pattern (Module 1)

```mdx
---
title: "The Architecture Debt Crisis"
slug: architecture-debt-crisis
module: 1
chapter: 1.1
estimated_minutes: 20
prerequisites:
  - three-paths-to-first-calm-doc
---
```

Note the `prerequisites` field references Module 0 slugs, not chapter numbers. [CITED: docs-meta/STYLE-GUIDE.md cross-references section]

### Module 0 Slugs (for cross-referencing)

The following slugs exist from Phase 1 and can be used as `prerequisites` or inline links:

| Chapter | Slug | File |
|---------|------|------|
| 0.1 | `three-paths-to-first-calm-doc` | `content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx` |
| 0.2 | `live-demo-diagram-to-calm-in-five-minutes` | `content/module-00-on-ramp/live-demo-diagram-to-calm-in-five-minutes.mdx` |
| 0.3 | `why-this-works-and-when-it-doesnt` | `content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx` |
| 0.4 | `get-set-up-in-sixty-seconds` | `content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx` |
| 0.5 | `your-first-calm-document` | `content/module-00-on-ramp/your-first-calm-document.mdx` |

Cross-reference format: `[Three Paths to Your First CALM Document](../module-00-on-ramp/three-paths-to-first-calm-doc.mdx)` [CITED: STYLE-GUIDE.md]

---

## Chapter Content Deep-Dive

This section gives the planner enough content guidance to instruct the executor on what each chapter covers, the key arguments, and the narrative arc.

### Chapter 1.1 — Architecture Debt Crisis

**Slug:** `architecture-debt-crisis`
**Tone:** Persuasive, opens with real-world stakes
**Estimated words:** 1800–2200
**Key illustration:** `m01-architecture-drift-timeline.excalidraw`

**Narrative arc:**
1. Open with the production incident caused by an undocumented dependency. Make it real and FSI-relevant (a payment system with an undocumented dependency on a legacy authentication service; the legacy service is decommissioned; payments fail at 3am).
2. Name the pattern: architecture drift — the gap between the diagram and reality, which widens every day.
3. Show how architecture debt compounds like technical debt. Quantify the cost: onboarding time, incident time, compliance audit time.
4. Connect to FSI specifically: regulated industries require architecture documentation for SOX, DORA, PCI-DSS audits — and the documentation is always out of date.
5. End with the question: what if the architecture document could NOT drift from reality?

**Key concepts:**
- Architecture as documentation vs. architecture as code
- Architecture drift (the canonical Module 1 problem)
- Architecture debt compounding
- Regulatory documentation requirements (FSI pain point)

**Cross-references:**
- Chapter 0.5 slug (`your-first-calm-document`) — the learner's CALM doc from Module 0 is the start of a solution
- Forward reference to Chapter 1.3 (what AaC enables)

**No code examples in this chapter.** Narrative-only.

---

### Chapter 1.2 — Lessons from Adjacent Disciplines

**Slug:** `lessons-from-adjacent-disciplines`
**Tone:** Historical narrative, analogical — the "we solved this before, twice" chapter
**Estimated words:** 2000–2500
**Key illustration:** `m01-iac-analogy.excalidraw`

**Narrative arc — "We've solved this before. Twice."**

1. **Configuration as Code** — Before Ansible/Chef, sysadmins hand-configured servers. Configuration drift was the norm. The fix: config files in version control, applied by automated tools. The insight: make configuration a first-class artifact.

2. **Infrastructure as Code** — Before Terraform, infra was ClickOps. Snowflake servers, no reproducibility, nobody knew what was actually deployed. Terraform made infra versionable, testable, reviewable, automatable. The HCL file became the source of truth. Result: IaC is now the default; AWS CDK, Pulumi, OpenTofu followed. The whole ecosystem standardized.

3. **Policy as Code** — OPA/Rego. Security gates enforced as code rather than manual review checklists.

4. **Now: Architecture as Code** — The missing layer between infra and application. Terraform tells you what's deployed. CALM tells you what it means, how it connects, and what rules it must follow.

The AaC stack: `Terraform (infra) → CALM (architecture) → OPA/Policy (compliance)` — CALM is the **missing middle layer**.

**The IaC analogy (central teaching device):**

| What changed | Infrastructure (Terraform) | Architecture (CALM) |
|---|---|---|
| Before | ClickOps, snowflake servers | Visio diagrams, Confluence pages |
| After | HCL files, version-controlled, automatable | JSON schema, version-controlled, AI-consumable |
| Key artifact | `.tf` file | `.architecture.json` file |
| Source of truth | Terraform state | CALM Hub |
| Validation | `terraform plan` | `calm validate` |
| CI gate | Terraform CI check | CALM Guard |

This table is the illustration spec for `m01-iac-analogy.excalidraw`.

**Cross-references:**
- Chapter 1.3 forward reference — "what you can DO with CALM because it IS code"
- Chapter 0.1 slug — learner already produced `.architecture.json` (the CALM artifact) in Module 0

---

### Chapter 1.3 — What Architecture as Code Enables

**Slug:** `what-architecture-as-code-enables`
**Tone:** Enabling, optimistic — the payoff chapter
**Estimated words:** 1800–2200
**Key illustration:** `m01-aac-stack.excalidraw` (the Terraform → CALM → Policy stack)

**Six capabilities (each 2–4 paragraphs):**

1. **Version control** — `git diff` between architecture versions. See what changed, when, and why. Architecture change reviews as PRs. History as audit trail.

2. **Automated validation** — CI/CD gate before any deployment. The architecture must pass `calm validate` before code can be merged. Schema violations and pattern violations caught in the pipeline, not in production.

3. **Pattern reuse** — Approved blueprints as organizational standards. The platform team publishes a "secure API service" pattern; product teams instantiate from it. Every new service starts compliant.

4. **AI consumption** — LLMs can reason over structured JSON specs. When CALM is the system context, AI-generated code is grounded in the actual architecture. "Build me a payment service" with a CALM spec attached produces better code than without. (Cross-reference to Module 5 for the full spec-driven development workflow.)

5. **Compliance automation** — Controls encoded into the architecture document itself. Evidence generated automatically by CALM Guard. Auditors get a structured artifact, not a slide deck.

6. **Living documentation** — Generated docs stay in sync because they are derived from the same source-of-truth file. `calm docify` generates documentation from CALM JSON. When architecture changes, docs regenerate.

---

### Chapter 1.4 — Governance Frameworks and Why They Need AaC

**Slug:** `governance-frameworks-and-aac`
**Tone:** Authoritative but accessible — introduces serious frameworks without overwhelming
**Estimated words:** 2000–2500
**Key illustrations:** `m01-gemara-7-layers-overview.excalidraw`, `m01-calm-as-layer-4.excalidraw`, `m01-governance-landscape.excalidraw`

**Teaching strategy for Gemara:** Module 1 introduces the 7-layer model at overview depth only. The full layer-by-layer treatment with CALM Guard at Layers 5–7 is Module 4. In Module 1, the learner needs to understand: (a) Gemara is the GRC Engineering Model that explicitly calls for machine-optimized architecture documentation, (b) CALM is the answer it describes, (c) CALM sits at Layer 4 — the pivot point. That is the complete Module 1 treatment. Do not dive deeper.

**Governance landscape (all frameworks covered in Module 1):**

| Framework | What it is | Why CALM matters |
|---|---|---|
| **Gemara (OpenSSF)** | 7-layer GRC Engineering Model — OSI-inspired; explicitly calls for machine-optimized architecture documentation with MCP | CALM is the Layer 4 schema Gemara describes but doesn't implement; CALM Hub is the GRC database; CALM Guard implements Layers 5–7 |
| **FINOS AIGF** | AI Governance Framework — governance overlay for AI systems | Auto-attaches as a CALM decorator when `ai:*` nodes detected; touched in Module 1, taught deeply in Module 5 |
| **Google SAIF** | Secure AI Framework — 6 principles for AI security | Maps to CALM `ai:*` node types and decorators; mentioned here, taught in Module 5 |
| **NIST AI RMF** | Risk management framework for AI systems | Mappable to CALM controls; mentioned for completeness |
| **DORA** | EU Digital Operational Resilience Act — FSI operational resilience | Requires architecture documentation; CALM satisfies Article 8 ICT risk management documentation |
| **SOX / PCI-DSS** | Financial compliance standards | Architecture documentation is an audit requirement; CALM makes it machine-readable and current |
| **OpenSSF OSPS Baseline** | Open source project security controls; Gemara Layer 2 asset | Maps to CALM controls for supply chain security; mentioned in Module 1, taught in Module 4 |

**Gemara 7-layer diagram spec (for `m01-gemara-7-layers-overview.excalidraw`):**

Show 7 horizontal rows, bottom to top (OSI-style), with labels:
```
L7 — Audit & Continuous Monitoring
L6 — Preventive & Remediative Enforcement
L5 — Intent & Behavioral Evaluation
─── PIVOT POINT ───
L4 — Sensitive Activities   ← CALM LIVES HERE
─────────────────────────────
L3 — Risks & Policy
L2 — Threats & Controls     ← FINOS CCC cited
L1 — Vectors & Guidance
```

Use heavier border/shading for L4 (the pivot), lighter for L1–L3 (definition layers), medium for L5–L7 (measurement layers). B&W only — use shading patterns per ILLUSTRATION-STANDARDS.md.

**Key teaching claim (defensible, based on Gemara whitepaper):** Gemara Section 8 explicitly calls for "machine-optimized documentation standards" with MCP as the foundation. The whitepaper states: "Achieving an opinionated, standardized schema for each activity type will allow rapid industry-wide acceleration of automated Risk Assessments." CALM is that schema. This is not a marketing claim — it is a structural observation grounded in the Gemara whitepaper text. [CITED: .planning/research/gemara-analysis.md]

---

### Chapter 1.5 — Introducing CALM

**Slug:** `introducing-calm`
**Tone:** Inviting, community-oriented — closes the persuasion arc and opens the door to Module 2
**Estimated words:** 1600–2000
**Key illustration:** `m01-finos-ecosystem-map.excalidraw`

**Structure:**
1. FINOS as the open-standard home for AaC — why an open standard matters (no vendor lock-in, foundation governance, community patterns)
2. CALM 1.2 overview — what the spec covers at the highest level: nodes, relationships, interfaces, controls, decorators. No deep dive — that is Module 2.
3. The CALM ecosystem at a glance: CLI (validate, diff, docify), Hub (versioned registry), Studio (visual canvas), Guard (compliance automation), MCP (AI integration). One paragraph per tool.
4. Community and governance model — FINOS Working Group, how the spec evolves, how to contribute
5. Real-world adoption angle — referenced without making unverifiable claims; frame as "teams at FINOS member organizations" or cite the FINOS CALM working group

**In-lesson reflection exercise (embedded, not a LAB.md):**
> "Before moving to Module 2, sketch the architecture of a system you work on from memory. Don't look anything up. Label the components and the connections. Note: what's missing? What are you uncertain about? What would you not be able to explain to a new team member? Save this sketch — it becomes your Module 2 starting point."

This is deliberately simple. No tools. Just a reflection that primes the learner for Module 2's hands-on work.

**FINOS ecosystem map illustration spec (for `m01-finos-ecosystem-map.excalidraw`):**

Show a central box labeled "CALM Architecture (.architecture.json)". Surrounding boxes:
- Left: ARB → (arrow "encodes as") → CALM
- Right: CALM Hub (versioned registry)
- Bottom-left: CALM Guard (compliance, pulls from Hub)
- Bottom-right: CALM Studio (visual canvas, bidirectional sync)
- Bottom-center: CALM CLI (validate/diff/docify)
- Top: calmstudio-mcp (AI-driven creation)
- Top-right: AIGF (governance overlay, auto-attaches)
- Far right: OpenSSF Gemara (layer model — CALM at L4)

Keep it readable: 6–8 boxes maximum, clear directional arrows, no more than 2 annotation labels per arrow.

---

## Illustration Plan (ILL-02)

8–10 B&W Excalidraw illustrations, one concept per diagram. Planner must create stubs + INVENTORY.md entries for all items. User authors actual content in Excalidraw.

| # | File (source) | Concept | Used in | Priority |
|---|---------------|---------|---------|----------|
| 1 | `m01-architecture-drift-timeline.excalidraw` | Architecture diagram drifts from reality over time (before/after/now comparison) | Ch 1.1 | P0 — flagship visual for the crisis argument |
| 2 | `m01-iac-analogy.excalidraw` | IaC vs AaC: before/after comparison table as diagram | Ch 1.2 + slide deck | P0 — the central analogy |
| 3 | `m01-finos-ecosystem-map.excalidraw` | FINOS ecosystem overview (CALM + Hub + Studio + Guard + ARB + AIGF + Gemara) | Ch 1.5 + slide deck | P0 — flagship ecosystem visual |
| 4 | `m01-gemara-7-layers-overview.excalidraw` | Gemara 7-layer model with layer labels and shading | Ch 1.4 + slide deck | P0 — required for Gemara introduction |
| 5 | `m01-calm-as-layer-4.excalidraw` | CALM architecture as Gemara Layer 4 pivot point with CALM Guard at L5–L7 | Ch 1.4 | P0 — explains why CALM matters for GRC |
| 6 | `m01-aac-stack.excalidraw` | The AaC stack: Terraform (infra) → CALM (architecture) → Policy (compliance) | Ch 1.2, 1.3 + slide deck | P1 |
| 7 | `m01-architecture-debt-compound.excalidraw` | Architecture debt compounding over time (similar to technical debt curve) | Ch 1.1 | P1 |
| 8 | `m01-calm-ecosystem-flywheel.excalidraw` | The governance flywheel: validate → detect drift → enforce → improve patterns | Ch 1.3 | P1 |
| 9 | `m01-governance-landscape.excalidraw` | Governance frameworks landscape (Gemara, AIGF, SAIF, NIST, DORA, SOX, OSPS) mapped to CALM | Ch 1.4 | P2 — useful if 8 illustrations targeted; skip if bandwidth tight |

**ILL-02 minimum viable:** P0 items (illustrations 1–5) = 5 illustrations. P1 items (6–8) = 3 more. Total 8 = meets requirement minimum. P2 item (9) is the optional 9th that brings it to the stated target of 8–10.

---

## Slide Deck Architecture (SLIDE-01)

**File:** `slides/module-01-case-for-aac.md`
**Format:** Marp Markdown
**Target:** 20–30 slides
**Tooling:** `npx @marp-team/marp-cli slides/module-01-case-for-aac.md` to render

### Recommended Slide Structure (26 slides)

```
[Cover — 1 slide]
1. Module 1: The Case for Architecture as Code

[Chapter 1.1 — 5 slides]
2. The architecture drift problem (opening hook)
3. Case study: the 3am incident
4. Architecture debt compounds (diagram: m01-architecture-debt-compound.svg)
5. Architecture drift timeline (diagram: m01-architecture-drift-timeline.svg)
6. The regulated industry lens (DORA, SOX, PCI-DSS)

[Chapter 1.2 — 5 slides]
7. "We've solved this before. Twice."
8. Config as Code: solved (Ansible, Chef)
9. Infrastructure as Code: solved (Terraform) 
10. The AaC stack (diagram: m01-aac-stack.svg)
11. IaC vs AaC comparison (diagram: m01-iac-analogy.svg)

[Chapter 1.3 — 5 slides]
12. What AaC enables: overview
13. Version control + Automated validation
14. Pattern reuse + AI consumption
15. Compliance automation + Living documentation
16. The value case in one sentence

[Chapter 1.4 — 5 slides]
17. Every governance framework needs the same thing
18. Gemara: the GRC Engineering Model (diagram: m01-gemara-7-layers-overview.svg)
19. CALM at Gemara Layer 4 (diagram: m01-calm-as-layer-4.svg)
20. AIGF + SAIF + DORA + SOX at a glance
21. The shared problem all frameworks share

[Chapter 1.5 — 4 slides]
22. Introducing FINOS CALM
23. The CALM ecosystem (diagram: m01-finos-ecosystem-map.svg)
24. Community, governance, and adoption
25. Module 1 summary: the case is made

[Closing — 1 slide]
26. What's next: Module 2 — CALM Fundamentals
```

### Marp Speaker Notes Pattern

Every slide with a matching text chapter section should include speaker notes:

```markdown
---

## Architecture drift timeline

![Architecture drift over time](../illustrations/exported/m01-architecture-drift-timeline.svg)

<!--
Speaker note: Walk the audience through the three panels.
Left: "The diagram when the system launched" — everything correct.
Center: "12 months later" — team added a Redis cache, skipped the diagram update.
Right: "Today" — three new services, two deprecated ones still in the diagram. The red arrow shows where the production incident happened.
Ask: "Who in this room has an architecture diagram that they know is wrong?"
-->
```

---

## Quiz Content Plan (QUIZ-02)

**File:** `quizzes/module-01-case-for-aac.yaml`

REQUIREMENTS.md specifies QUIZ-02 tests: AaC value proposition, CALM vs static diagrams, FINOS ecosystem relationships, Gemara/AIGF/SAIF at a glance.

### Recommended Question Map

| Chapter | Questions | Types | What to test |
|---------|-----------|-------|--------------|
| 1.1 | 2 | multiple_choice | Architecture drift definition; architecture debt vs technical debt analogy |
| 1.2 | 2 | multiple_choice + short_answer | IaC analogy; what was the "missing layer" between infra and application |
| 1.3 | 2 | multiple_choice + code_completion | Which capability enables CI/CD gates; which CLI command validates architecture |
| 1.4 | 3 | multiple_choice | Gemara Layer 4 = CALM; which project is Gemara Layer 2 citation; what AIGF does |
| 1.5 | 2 | multiple_choice + short_answer | FINOS as steward; name one CALM ecosystem tool |

**Total: 11 questions across 5 chapters.** That slightly exceeds the "4–6 per chapter" guidance from QUIZ-FORMAT.md for short chapters. For Ch 1.3 and 1.5 (shorter chapters), 2 questions is appropriate. Chapters 1.1, 1.2, and 1.4 merit 2–3 questions each. The overall quiz remains in the 10–15 question range, appropriate for a ~2-hour module.

**Example questions (to guide executor):**

```yaml
- id: q1.4.1
  type: multiple_choice
  prompt: |
    Which Gemara layer does a CALM architecture document map to?
  options:
    - label: "Layer 4 (Sensitive Activities)"
      correct: true
      explanation: "Correct. Layer 4 is Gemara's pivot point — the actual system that introduces risk. CALM is the machine-optimized representation of this layer, specifically designed for the kind of machine-readable architecture documentation Gemara Section 8 calls for."
    - label: "Layer 2 (Threats & Controls)"
      correct: false
      explanation: "Layer 2 is for technology-specific Threats and Controls — e.g. FINOS CCC. The CALM architecture is the sensitive activity those controls protect, which maps to Layer 4."
    - label: "Layer 7 (Audit & Continuous Monitoring)"
      correct: false
      explanation: "Layer 7 is for audit and continuous monitoring. CALM Guard's continuous monitoring mode operates at Layer 7; CALM the architecture document is the Layer 4 input it monitors."
  reference_section: "../content/module-01-case-for-aac/governance-frameworks-and-aac.mdx#gemara-the-grc-engineering-model"

- id: q1.2.1
  type: multiple_choice
  prompt: |
    The chapter "Lessons from Adjacent Disciplines" argues that Architecture as Code
    fills a missing layer in the modern engineering stack. Which layer is it between?
  options:
    - label: "Infrastructure (Terraform) and application policy (OPA)"
      correct: true
      explanation: "Correct. The AaC stack is: Terraform (infra) → CALM (architecture) → OPA/Policy (compliance). CALM sits between the infra layer that tells you what is deployed and the policy layer that tells you what rules apply."
    - label: "Source code (Git) and containers (Docker)"
      correct: false
      explanation: "CALM is not between source control and containers. It operates at the architecture level — modeling the components and their communication patterns, not the code or the runtime packaging."
    - label: "Configuration management (Ansible) and monitoring (Prometheus)"
      correct: false
      explanation: "Config management and monitoring are operational concerns. CALM is an architectural concern — it describes system topology and governance, not operational configuration or metrics."
  reference_section: "../content/module-01-case-for-aac/lessons-from-adjacent-disciplines.mdx#now-architecture-as-code"
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Slide rendering | Custom HTML/CSS slide builder | `npx @marp-team/marp-cli` | Marp handles Markdown → PDF/HTML; single source file aligns with text-first workflow |
| Illustration SVGs | Manually create SVGs in code | Excalidraw → export-excalidraw.sh | Maintains single source of truth in `.excalidraw` format; SVG is a derivative |
| Quiz rendering component | Build new quiz component | Use QUIZ-FORMAT.md YAML schema (component in Phase 5) | Same pattern as Module 0 quiz — data file now, component later |
| Gemara layer visualization | Novel visualization framework | Excalidraw B&W with shading patterns per ILLUSTRATION-STANDARDS.md | Consistent house style; reused in slides and videos |

---

## Common Pitfalls

### Pitfall 1: Over-teaching Gemara in Chapter 1.4
**What goes wrong:** Chapter 1.4 turns into a full Gemara deep-dive with all 7 layers explained in detail, compliance requirements mapped, CALM Guard explored. The chapter becomes 4000+ words and overwhelms the learner.
**Why it happens:** Gemara is genuinely interesting and the research material is detailed. The temptation is to use all of it.
**How to avoid:** Chapter 1.4 has one job: establish that governance frameworks share a common problem (machine-readable architecture documentation) and CALM solves it. Gemara Layer 4 = CALM is the punchline. Stop there. Full layer treatment is Module 4.
**Warning signs:** Chapter draft exceeds 3000 words; reader must understand all 7 layers to follow the argument.

### Pitfall 2: Making the IaC Analogy the Whole Module
**What goes wrong:** Chapter 1.2 expands to cover the full history of IaC in detail (Mitchell Hashimoto origin story, HCL evolution, Pulumi vs CDK comparison). The module becomes an IaC history lesson rather than an AaC case.
**Why it happens:** The IaC analogy is compelling and the author knows IaC well.
**How to avoid:** The IaC analogy is a comparison tool, not the subject. Two or three paragraphs per prior discipline (CaC, IaC, Policy-as-Code), then pivot immediately to AaC. The IaC column in the comparison table is context; the CALM column is the point.
**Warning signs:** Chapter 1.2 draft mentions Terraform history before mentioning CALM.

### Pitfall 3: Slide deck created before chapters are done
**What goes wrong:** Slides are authored in parallel with chapters. Text changes; slides don't follow. The slide deck ends up out of sync with the canonical text at merge time.
**Why it happens:** The planner creates slide tasks in parallel with text tasks because both seem independent.
**How to avoid:** Slide deck is Wave 2 only, after all 5 chapters are complete and committed. Production workflow is locked: text → illustrations → slides. Planner must sequence wave 2 for slides after wave 1 for text.
**Warning signs:** Any slide task appears in the same wave as any chapter task.

### Pitfall 4: Chapter 1.5 invents CALM ecosystem claims
**What goes wrong:** Chapter 1.5 (Introducing CALM) makes specific claims about adoption numbers, production deployments, or tooling capabilities that are not verifiable.
**Why it happens:** Marketing instinct. The author wants to make CALM sound mature and widely adopted.
**How to avoid:** Frame adoption stories as "teams at FINOS member organizations" or reference the FINOS CALM Working Group. Do not make specific adoption claims without a verifiable source. For tool capabilities, stay at the level documented in CURRICULUM.md and the FINOS aac repo — do not describe features as "existing" if CURRICULUM.md marks them as GAP.
**Warning signs:** Chapter draft contains specific numbers ("1000 production architectures") or tool features not in CURRICULUM.md.

### Pitfall 5: Module 0 cross-references use chapter numbers not slugs
**What goes wrong:** "As we showed in Chapter 0.5..." appears in Module 1 text. When chapters are reordered or the site navigation changes, the reference breaks.
**Why it happens:** Chapter numbers are the intuitive reference.
**How to avoid:** Always use slug-based relative links: `[Your First CALM Document](../module-00-on-ramp/your-first-calm-document.mdx)`. The slug table in this research document lists all valid Module 0 slugs.
**Warning signs:** Any reference to "Chapter 0.N" in prose rather than a hyperlink.

### Pitfall 6: Illustration inventory not updated
**What goes wrong:** New illustration files are created for Module 1 but INVENTORY.md is not updated. The illustration index becomes stale; status tracking breaks.
**Why it happens:** INVENTORY.md update is forgotten as a separate task.
**How to avoid:** Planner must include an explicit INVENTORY.md update task in the same wave as illustration stub creation. Each new illustration requires an entry with: file name, topic, module(s), status, author, date.
**Warning signs:** Number of entries in INVENTORY.md does not match number of `.excalidraw` files in `illustrations/source/`.

---

## Suggested Wave Plan

Phase 2 splits into two waves. No lab means simpler sequencing than Phase 1.

### Wave 1: Text Chapters + Illustration Stubs (MVP vertical slice)

**Goal:** All 5 chapters authored, all illustration stubs created with embedded specs, INVENTORY.md updated, quiz YAML drafted. All text derivable and reviewable before any derived assets (slides) are produced.

**Plan objectives for Wave 1:**
1. Create all 5 MDX chapter files with correct frontmatter (slug, module, chapter, estimated_minutes, prerequisites)
2. Author Chapter 1.1 (Architecture Debt Crisis) — ~2000 words, persuasive narrative, FSI incident hook
3. Author Chapter 1.2 (Lessons from Adjacent Disciplines) — ~2200 words, IaC analogy, comparison table
4. Author Chapter 1.3 (What AaC Enables) — ~2000 words, 6 capabilities, enabling tone
5. Author Chapter 1.4 (Governance Frameworks) — ~2200 words, Gemara overview at correct depth, governance landscape table
6. Author Chapter 1.5 (Introducing CALM) — ~1800 words, ecosystem overview, reflection exercise
7. Create 8 Excalidraw stubs (source files + placeholder SVGs) for all P0 + P1 illustrations
8. Update INVENTORY.md with all 8 new entries
9. Author `quizzes/module-01-case-for-aac.yaml` with ~11 questions across 5 chapters
10. Human checkpoint: user authors Excalidraw illustrations (deferred; stubs are in place)

**Dependencies:** All 5 Module 0 chapters exist (confirmed from Phase 1).

### Wave 2: Slide Deck (derived from text + illustrations)

**Goal:** Produce SLIDE-01 — the 20–30 slide Marp deck for Module 1. Derived from Wave 1 text and illustration SVGs.

**Blocked on Wave 1:** Slides cannot be authored until all chapters are complete (text-first workflow). Illustration SVGs are referenced in slides — planner may choose to unblock slides using placeholder SVGs from Wave 1 stubs, with a note that SVG paths will render correctly when real illustrations replace stubs.

**Plan objectives for Wave 2:**
1. Verify `@marp-team/marp-cli` is available: `npm view @marp-team/marp-cli version`
2. Create `slides/module-01-case-for-aac.md` with correct Marp frontmatter (marp: true, theme: default, paginate: true)
3. Author all 26 slides following the structure in this research document
4. Include speaker notes for all chapter-level slides (using Marp HTML comment syntax)
5. Reference illustration SVGs by relative path `../illustrations/exported/<name>.svg`
6. Validate Marp renders: `npx @marp-team/marp-cli slides/module-01-case-for-aac.md --output /tmp/module-01-test.pdf`
7. Verify slide count: 20–30 slides (SLIDE-01 success criterion)

---

## Environment Availability

No external dependencies beyond what Phase 1 already confirmed.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Marp CLI, CALM CLI | Yes | v22.22.2 | — |
| npm / npx | Marp CLI, CALM CLI | Yes | bundled with Node | — |
| `@marp-team/marp-cli` (npx) | SLIDE-01 rendering | Yes (via npx) | 4.4.0 | Author Markdown slides without rendering if Marp fails; rendering is a nice-to-have for verification |
| Excalidraw | ILL-02 illustration authoring | User-managed | Desktop or agentic skill | User's existing agentic skill |
| No Docker required | — | — | — | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None for critical path. Marp rendering is used for verification only; the `.md` source file is the deliverable even if rendering step fails.

---

## Validation Architecture

nyquist_validation is enabled (config.json: `"nyquist_validation": true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | No automated test framework for MDX content; validation is CLI-based (same as Phase 1) |
| Quiz YAML validation | `scripts/lint-quizzes.sh` (upgraded in Phase 1 Plan 01-03 — now a full schema checker) |
| Slide validation | `npx @marp-team/marp-cli slides/module-01-case-for-aac.md --output /tmp/module-01-verify.pdf` exits 0 |
| Illustration presence | `ls illustrations/exported/m01-*.svg | wc -l` → 8 or more |
| Quick run command | `scripts/lint-quizzes.sh && ls content/module-01-case-for-aac/*.mdx | wc -l` |
| Full suite command | `scripts/lint-quizzes.sh && ls content/module-01-case-for-aac/*.mdx | wc -l && npx @marp-team/marp-cli slides/module-01-case-for-aac.md --output /tmp/verify.pdf` |

### Phase Requirements — Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MOD-02 | 5 MDX chapters present | file_state | `ls content/module-01-case-for-aac/*.mdx | wc -l` → 5 | No — Wave 1 |
| MOD-02 | MDX frontmatter valid (slug, module, chapter, estimated_minutes) | lint | `scripts/lint-quizzes.sh` (extends to MDX check if feasible) or manual review | No — Wave 1 |
| MOD-02 | Cross-references use slugs not chapter numbers | review | Manual review of all internal links in chapter files | No — Wave 1 |
| QUIZ-02 | Quiz YAML schema valid | lint | `scripts/lint-quizzes.sh` | No — Wave 1 |
| QUIZ-02 | Quiz covers all 4 topic areas per REQUIREMENTS.md | review | Manual mapping review | No — Wave 1 |
| ILL-02 | 8 SVG stub files present | file_state | `ls illustrations/exported/m01-*.svg | wc -l` → 8 | No — Wave 1 |
| ILL-02 | INVENTORY.md updated with all 8 entries | file_state | `grep -c "m01-" illustrations/INVENTORY.md` → 8 | No — Wave 1 |
| SLIDE-01 | Slide deck file exists | file_state | `ls slides/module-01-case-for-aac.md` | No — Wave 2 |
| SLIDE-01 | Slide deck renders with Marp (exit 0) | unit | `npx @marp-team/marp-cli slides/module-01-case-for-aac.md --output /tmp/verify.pdf` | No — Wave 2 |
| SLIDE-01 | Slide count 20–30 | unit | `grep -c "^---$" slides/module-01-case-for-aac.md` → between 20 and 30 | No — Wave 2 |

### Sampling Rate
- **Per task commit:** MDX frontmatter valid; no broken relative paths in cross-references
- **Per wave merge:** All file_state checks + quiz lint + Marp render (Wave 2 only)
- **Phase gate:** All checks above pass before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `slides/` directory exists (confirmed) but no `module-01-case-for-aac.md` yet — Wave 2 creates it
- [ ] `quizzes/module-01-case-for-aac.yaml` does not exist — Wave 1 creates it
- [ ] `content/module-01-case-for-aac/` directory is empty — Wave 1 creates all 5 chapters
- [ ] Illustration stubs for `m01-*` do not exist — Wave 1 creates all 8 stubs + placeholder SVGs

*(Existing infrastructure from Phase 1: scripts/lint-quizzes.sh, scripts/validate-calm.sh, scripts/test-lab.sh, illustrations/INVENTORY.md — all carry forward. No Wave 0 framework gaps.)*

---

## Security Domain

Phase 2 is content authoring — no code deployed, no authentication, no user data. Same security posture as Phase 1.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static content |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No user roles |
| V5 Input Validation | No | No user input processed |
| V6 Cryptography | No | No secrets |

**Content security:**
- No CALM JSON code examples in Module 1 (conceptual module) — no risk of invalid examples entering the codebase
- Governance framework claims (Gemara, AIGF, etc.) must be attributed to the correct source; no invented compliance requirements
- No credentials or PII in any lesson text, illustration specs, or quiz questions

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@marp-team/marp-cli` at v4.4.0 is the correct package for Marp slide rendering — confirmed on npm but slopcheck unavailable | Standard Stack, Package Audit | Planner must add `npm view @marp-team/marp-cli` verification before slide rendering task |
| A2 | CALM Studio web URL (`https://studio.calm.finos.org`) referenced in Module 0 chapters is a valid placeholder | Chapter 1.5 (cross-reference) | Chapter 1.5 should not link to CALM Studio web directly; reference it descriptively and note `[verify URL before publication]` |
| A3 | The FINOS ecosystem projects listed in CURRICULUM.md and finos-ecosystem.md are all active projects at time of publication | Chapter 1.5, Chapter 1.4 | If a FINOS project listed (e.g. GRIS, FluxNova) is renamed or deprecated, Chapter 1.5 ecosystem map description would be inaccurate; annotate long-lived claims with `[verify FINOS project status before publication]` |
| A4 | Gemara whitepaper (March 2026, openssf.org) claims in gemara-analysis.md accurately represent the source document | Chapter 1.4 | Teaching incorrect Gemara layer structure would undermine credibility; planner should note that executor must cross-check claims in Ch 1.4 against the source analysis at `.planning/research/gemara-analysis.md` |

---

## Open Questions (RESOLVED)

1. **Which FINOS ecosystem tools are stable enough to describe as "available now" vs. "coming soon" in Chapter 1.5?**
   - What we know: CURRICULUM.md has a detailed roadmap section with GAP vs. EXISTS tags for each feature
   - What's unclear: Chapter 1.5 introduces the ecosystem briefly — should it mention tool gaps at all, or stick to what EXISTS?
   - Recommendation: Describe the ecosystem at the "what it does" level, not at the "current feature" level. Defer gap acknowledgment to Module 3 (where tools are taught deeply). Chapter 1.5 is persuasive, not a feature matrix.

2. **Should Chapter 1.4 reference DORA Article 8 specifically?**
   - What we know: CURRICULUM.md Chapter 6.3 lists DORA Article 8 explicitly. Module 1 (Chapter 1.4) mentions DORA generally.
   - What's unclear: Is the specific article citation appropriate at Module 1 level (overview), or is it too deep for a conceptual chapter?
   - Recommendation: Mention DORA by name and the general requirement ("ICT risk management documentation"). Save Article 8 citation for Module 6. Module 1 audience may not have FSI background; keep regulatory references high-level.

3. **How many words should the in-lesson reflection exercise in Chapter 1.5 consume?**
   - What we know: It is not a LAB.md file. It is an inline prompt in the chapter text.
   - Recommendation: Keep it to 100–150 words as a callout box (using the custom MDX callout component). Frame as "Before you move on" with a clear action. It is not assessed and should not feel like homework.

---

## Sources

### Primary (HIGH confidence)
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/CURRICULUM.md` — Module 1 chapter 1.1–1.5 content, IaC analogy, governance framework list, FINOS ecosystem detail
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/research/gemara-analysis.md` — Gemara 7-layer model, Layer 4 positioning, whitepaper quotes, Section 8 machine-optimized docs claim
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/research/finos-ecosystem.md` — FINOS ecosystem project list and cross-foundation integrations
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/STYLE-GUIDE.md` — MDX chapter structure, tone calibration (Module 1 = persuasive/narrative), cross-reference rules
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/ILLUSTRATION-STANDARDS.md` — Excalidraw B&W style, shading for Gemara layers, file naming, composition rules
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/docs-meta/QUIZ-FORMAT.md` — Quiz YAML schema, question types, authoring rules
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/REQUIREMENTS.md` — MOD-02, QUIZ-02, ILL-02, SLIDE-01 exact definitions
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/ROADMAP.md` — Phase 2 goal, success criteria, dependencies
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/CLAUDE.md` — Spec constraints, production workflow, commit conventions, no Co-Authored-By
- `npm view @marp-team/marp-cli version` — version 4.4.0, last modified 2026-05-06

### Secondary (MEDIUM confidence)
- `https://marp.app/` — Marp slide format: `---` as separator, Marp frontmatter, HTML comment speaker notes syntax
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/phases/01-module-0-on-ramp/01-01-SUMMARY.md` — Module 0 slug confirmations, MDX frontmatter patterns to reuse
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/.planning/phases/01-module-0-on-ramp/01-RESEARCH.md` — Established patterns (stub/placeholder SVG workflow, INVENTORY.md, MDX chapter structure)
- `/Users/gshah/work/opsflow-sh/calm/calm-academy/quizzes/module-00-on-ramp.yaml` — Quiz format reference: chapter grouping, question id format `qN.N.N`, types (multiple_choice, code_completion)

### Tertiary (LOW confidence / assumed)
- `@marp-team/marp-cli` slopcheck result — unavailable; package treated as [ASSUMED] pending verification step in planner

---

## Metadata

**Confidence breakdown:**
- Chapter content and structure: HIGH — derived directly from CURRICULUM.md with no inference required
- Gemara layer model: HIGH — sourced from gemara-analysis.md which cites the whitepaper
- Marp slide format: MEDIUM — confirmed from marp.app; slopcheck unavailable for package audit
- Illustration plan: HIGH — derived from ILL-02 requirement + ILLUSTRATION-STANDARDS.md conventions
- Quiz question examples: HIGH — follow validated QUIZ-FORMAT.md schema and Module 0 quiz patterns

**Research date:** 2026-06-15
**Valid until:** 2026-12-15 (stable content domain; refresh if FINOS ecosystem changes significantly or Gemara publishes v2)
