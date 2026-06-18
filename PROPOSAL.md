# CALM Academy
## A Proposal to FINOS and the Linux Foundation for the Official Architecture as Code Educational Program

**Submitted by:** Gourav Shah (`@gjs-opsflo`)
**Status:** Live demo available — ready for FINOS Working Group review
**Repository:** https://github.com/gjs-opsflo/calm-academy
**Live site:** https://gjs-opsflo.github.io/calm-academy/
**Target program tier:** FINOS Working Group sponsored + Linux Foundation Training (LF EdX) co-delivered

---

## Current Status (as of 2026-06-18)

Modules 0–3 are complete and live:

| Deliverable | Status |
|-------------|--------|
| Module 0 — 15-Minute On-Ramp | Live |
| Module 1 — The Case for AaC | Live |
| Module 2 — CALM Language Fundamentals | Live |
| Module 3 — The CALM Ecosystem | Live |
| Lab 0 — Docker-free on-ramp | Complete |
| Lab 2 — Conference signup architecture | Complete |
| Lab 3 — CI/CD gate | Complete |
| Quizzes (Modules 0–3) | Live — interactive, auto-graded |
| Slide decks (Modules 1–3) | Complete |
| Module 2 cheatsheet | Complete |
| Docusaurus site — CI/CD auto-deploy | Live |

**Live demo:** https://gjs-opsflo.github.io/calm-academy/

Next: Modules 4–6 (Governance, AI-native architecture, Enterprise capstones), illustration
authoring, and Learnforge integration — scoped to Milestone 2.

---

## 1. Executive Summary

**Architecture as Code (AaC)** is the missing engineering discipline between Infrastructure as Code and application code. It solves for architecture what Terraform solved for infrastructure: versioning, testing, automation, reviewability, and machine-readability.

FINOS has built the open standard for AaC — the **Common Architecture Language Model (CALM 1.2)** — along with a complete ecosystem: CALM Hub, CALM Studio, CALM Guard, calmstudio-mcp, and the FINOS Architectural Reference Board (ARB) reference architectures. The technology is production-ready. **What's missing is the educational on-ramp that turns CALM from a FINOS-internal project into an industry standard with global adoption.**

This proposal positions **CALM Academy** as that on-ramp — a comprehensive, multi-modal educational program (text + video + interactive labs + slides + capstones) covering the complete CALM ecosystem and its cross-foundation integrations with **OpenSSF Gemara**, **Google SAIF**, **NIST AI RMF**, and the full **FINOS portfolio** (CCC, AIGF, ARB, GRIS, FluxNova, Hub, Studio, Guard).

**Three certification tracks** (Associate / Practitioner / Architect) make CALM Academy the educational analogue of:
- HashiCorp Terraform Associate (for IaC)
- CNCF Certified Kubernetes Administrator (for container orchestration)
- AWS Solutions Architect (for cloud architecture)

**The ask:** FINOS endorses CALM Academy as the official educational program for Architecture as Code, with delivery through Linux Foundation Training (LF EdX). The course is delivered under joint FINOS + LF branding, with content licensed CC BY-SA 4.0 and lab code Apache 2.0, ensuring perpetual open access aligned with FINOS governance principles.

---

## 2. Why FINOS Should Own This Category

### 2.1 The Terraform Analogy

| Era | Problem | Solution | Standard owner |
|---|---|---|---|
| 2010s | ClickOps, snowflake servers, no reproducibility | **Infrastructure as Code** (Terraform) | HashiCorp |
| 2020s | Service architecture drift, untestable diagrams, AI can't consume PowerPoint | **Architecture as Code** (CALM) | **FINOS** |

HashiCorp built Terraform under an open license but kept stewardship. The result: a $5B+ category, a thriving cert ecosystem, a default in every modern stack. FINOS is in the equivalent position with CALM today — except FINOS has the advantage of being **vendor-neutral from day one**.

### 2.2 The Regulatory Tailwind

Multiple regulations now require machine-readable architectural documentation:

| Regulation | Geography | Requirement satisfied by CALM |
|---|---|---|
| **DORA Article 8** | EU | ICT risk management documentation; architecture inventory |
| **SR 11-7** | US (Federal Reserve) | Model risk management — model architecture documentation, independent validation, ongoing monitoring |
| **ECOA / Regulation B** | US | Fair lending adverse action notice generation |
| **MiFID II Articles 16, 25, 27** | EU | Trade audit trail, suitability assessment, best execution |
| **HMDA / Fair Housing Act** | US | Disparate impact analysis on lending models |
| **NIST AI RMF** | US (federal) | AI risk management |
| **FCA Consumer Duty** | UK | Consumer outcome monitoring |

CALM is the natural artifact for these requirements. **No other open standard satisfies them in machine-readable form.**

### 2.3 The Cross-Foundation Story (FINOS + OpenSSF)

In March 2026, OpenSSF (Linux Foundation) published the **Gemara whitepaper** — a 7-layer GRC Engineering Model. Section 8 of that whitepaper explicitly calls for *"machine-optimized documentation standards"* with MCP as the foundation. CALM is exactly that standard, and CALM Hub is exactly that database.

**The integration is structural, not cosmetic:**

```
Gemara L1 (Vectors & Guidance)     → CALM Standards (NIST/MITRE/OWASP)
Gemara L2 (Threats & Controls)     → CALM threat decorators + FINOS CCC + OSPS Baseline
Gemara L3 (Risks & Policy)         → CALM Patterns
─────────────────────────────────────────────────────────────────
Gemara L4 (Sensitive Activities)   → The CALM architecture document
─────────────────────────────────────────────────────────────────
Gemara L5 (Evaluation)             → CALM Guard agents
Gemara L6 (Enforcement)            → CALM Guard CI/CD pipeline generation
Gemara L7 (Audit + Monitoring)     → CALM Guard continuous monitoring + Hub evidence
```

**No other ecosystem has this end-to-end AI governance + architecture documentation + automated compliance story.** FINOS + OpenSSF together deliver what no vendor can.

CALM Academy teaches this entire stack as a unified program — making FINOS the educational home for the joint FINOS + OpenSSF GRC Engineering discipline.

### 2.4 Why Now

- **CALM 1.2 is stable.** Production-ready spec with widespread tooling.
- **calmstudio-mcp ships** — AI-driven architecture creation is real, today.
- **CALM Guard is in beta** — automated compliance is shipping.
- **FINOS ARB reference architectures exist** — flagship content is available.
- **OpenSSF Gemara is published** — cross-foundation integration is timely.
- **Regulators are asking** — DORA enforcement begins, SR 11-7 model risk scrutiny intensifies with AI adoption.
- **FSI member firms need this** — DTCC, major banks, custodians have direct, immediate use cases.

The window is open. A FINOS-stewarded educational program now establishes CALM as the category-defining standard before any vendor tries to fork the discipline.

---

## 3. Program Overview

### 3.1 What CALM Academy Is

A complete, multi-modal educational program teaching software architects, platform engineers, security architects, AI/ML engineers, and compliance teams how to model, validate, govern, and automate system architectures using FINOS CALM and the broader FINOS + OpenSSF ecosystem.

**Tagline:** *"Terraform transformed infrastructure. CALM transforms architecture."*

### 3.2 Curriculum Structure

**7 modules, ~20 hours of instruction, 3 certification tracks:**

| Module | Topic | Duration |
|---|---|---|
| **0** | The 15-Minute On-Ramp — CALM without learning CALM (AI-assisted generation) | 0.5h |
| **1** | The Case for Architecture as Code (IaC lessons, Gemara, AIGF, governance) | 2h |
| **2** | CALM Fundamentals (9 + 15 node types, relationships, interfaces, controls, decorators) | 3h |
| **3** | The CALM Ecosystem (CLI, Studio, Hub, Server, VSCode, patterns, CI/CD) | 3h |
| **4** | Governance, Compliance, Gemara, CALM Guard | 4h |
| **5** | AI-Native Architecture — `ai:*` types, AIGF, SAIF, spec-driven dev | 4h |
| **6** | Enterprise Adoption + Capstone | 4h |

**Certification tracks:**
- **CALM Associate** — Modules 0–3, entry level (~8h)
- **CALM Practitioner** — Modules 0–5, mid level (~16h)
- **CALM Architect** — All modules + capstone (~24h)

Full detail: [`CURRICULUM.md`](CURRICULUM.md) (1400+ lines).

### 3.3 Three Capstone Scenarios

Students choose one scenario for the Architect-track capstone. All three are real-world FSI architectures with full regulatory context:

| Capstone | Domain | Regulatory depth |
|---|---|---|
| **A. Enterprise Modernization** | Monolith → multi-agent microservices migration | SOX, DORA, FINOS CCC |
| **B. Autonomous Wealth Management** | Multi-agent portfolio management with trade approval gates | MiFID II Articles 16/25/27, AIGF, SAIF, fiduciary duty |
| **C. AI Credit Risk Scoring** | ML credit decision system with fair lending controls | SR 11-7, ECOA / Regulation B, HMDA, FCRA, GDPR Art. 22 |

These are not invented use cases. They are problems FINOS member firms (DTCC, major banks, custodians, wealth platforms) are solving today.

### 3.4 Multi-Modal Delivery

CALM Academy ships as **text-first, derivative everything else**:

1. **Text lessons** (Markdown/MDX) — canonical source, ~150K words
2. **Illustrations** (Excalidraw, B&W house style) — ~70 SVGs
3. **Slide decks** (derived from text + illustrations) — 7 module decks
4. **Video lessons** (derived from text + slides) — ~45 videos, 6–8h runtime
5. **Interactive labs** (Docker Compose locally; Learnforge integration planned) — ~15 labs
6. **YAML quizzes** — ~40 chapter-level quizzes, auto-graded
7. **Capstone briefs** — 3 detailed deliverable kits

**Production sequence:** text → illustrations → slides → video. Course site launches with text-only on day one; videos roll out chapter-by-chapter. Translation pipeline becomes trivial — translate text once, narrate per language.

### 3.5 Delivery Formats (Same Assets, Many Channels)

| Format | Duration | Audience |
|---|---|---|
| **Self-paced async** (text + video + labs) — **primary** | ~25h | Anyone |
| 5-day instructor-led workshop | 5 × 4h | Mixed FSI cohorts |
| 3-day intensive | 3 × 6h | Senior architects |
| 1-day executive briefing | 6h | CTOs, VPs |
| OSFF conference workshop | 4h | Conference attendees |
| University 13-week course | 13 × 1.5h | CS/SE undergraduates |
| Enterprise in-house custom | 3–10 days | Internal bank/insurer teams |

One curriculum. Seven delivery channels. All reuse the same text + illustration source.

---

## 4. FINOS + OpenSSF Ecosystem Integration

CALM Academy is not a CALM-only course. It teaches CALM as **connective tissue across the full FINOS + OpenSSF + industry framework landscape**:

### 4.1 FINOS Projects Integrated

| Project | Course module touch |
|---|---|
| **CALM** (spec) | All modules |
| **CALM Hub** (registry) | M3.3, M3.7, M4.6 |
| **CALM Studio** (visual editor) | M3.2, M5.4 |
| **CALM Guard** (compliance automation) | M4.4 |
| **calmstudio-mcp** (MCP server) | M0, M5.4 |
| **FINOS CCC** (Common Controls Catalog) | M4.2 |
| **AIGF** (AI Governance Framework) | M5.5 |
| **ARB** (Architectural Reference Board) | M5.3 — Multi-Agent ARB is the flagship use case |
| **GRIS** (Generative Regulatory Intelligence) | M4.2, M5.5 |
| **FluxNova** (event-driven architecture) | M3.6 Lab |

### 4.2 Cross-Foundation + Industry Frameworks

| Framework | Owner | Course relevance |
|---|---|---|
| **OpenSSF Gemara** | Linux Foundation / OpenSSF | CALM = Gemara Layer 4 schema (Module 4 spine) |
| **OpenSSF OSPS Baseline** | OpenSSF | Open source supply-chain security controls |
| **Google SAIF** | Google | Secure AI Framework — mapped to CALM `ai:*` types |
| **NIST AI RMF / CSF** | NIST | Risk frameworks → CALM controls |
| **MITRE ATT&CK** | MITRE | Threat vectors → CALM threat decorators |
| **SR 11-7** | US Federal Reserve | Model risk management — CALM as model documentation |
| **MiFID II, DORA, ECOA, HMDA, FCRA** | EU / US regulators | Encoded as CALM controls + decorators |

### 4.3 The Ecosystem Story the Course Tells

```
ARB (reference architectures)
  → CALM patterns (machine-optimized schema; Gemara Layer 4)
  → CALM Hub (versioned, namespaced registry)
  → AIGF decorator auto-attaches on ai:* nodes
  → GRIS maps regulations → CALM controls → stored in Hub
  → FluxNova event topologies modeled as CALM interfaces
  → CALM Guard pulls from Hub, validates everything (Gemara L5–L7)
  → audit evidence package exported, archived in Hub
```

No vendor can tell this story. FINOS + OpenSSF can.

---

## 5. Delivery Plan and Timeline

### 5.1 Phased Delivery

12 phases over ~18 months from program approval to certification launch:

| Phase | Deliverable | Duration |
|---|---|---|
| 1 | Bootstrap (✅ done) | — |
| 2 | Module 0 + Module 1 production | 3 weeks |
| 3 | Module 2 (CALM Fundamentals) | 3 weeks |
| 4 | Module 3 (Ecosystem) | 3 weeks |
| 5 | Module 4 (Governance + Gemara + Guard) | 4 weeks |
| 6 | Module 5 (AI-Native) | 4 weeks |
| 7 | Module 6 (Enterprise + Capstones) | 3 weeks |
| 8 | Polish + soft public launch | 3 weeks |
| 9 | FINOS proposal + governance vote | — |
| 10 | Workshop pilot at OSFF + video production | 3 months |
| 11 | Learnforge topic-pack integration | 1 month |
| 12 | Certification program launch (Associate / Practitioner / Architect) | 3 months |

**Full plan:** [`ROADMAP.md`](ROADMAP.md).

### 5.2 What's Already Done

- **Curriculum** — full 1400-line specification ([`CURRICULUM.md`](CURRICULUM.md))
- **Research foundation** — Gemara whitepaper analysis, FINOS ecosystem mapping ([`.planning/research/`](.planning/research/))
- **Repo bootstrap** — structure, CI, production workflow, style guide, lab format spec, illustration standards, project context for AI-assisted authoring ([`docs-meta/`](docs-meta/))
- **Capstone scenarios** — all three (FSI, Wealth, Credit) specified end-to-end with nodes, relationships, controls, threats, Gemara mappings
- **Product roadmap inputs** — features assumed by curriculum, gap analysis for CALM Guard, Studio, MCP, Hub, CLI, and spec (drives parallel product development)

### 5.3 What's Needed from FINOS

| Ask | Why |
|---|---|
| **Endorsement as official educational program** | Validates CALM Academy as the canonical AaC course |
| **FINOS Working Group sponsor** | Steers content alignment with CALM evolution |
| **Pattern library hosting** | CALM Hub hosts course-derived reference patterns |
| **OSFF workshop slot** | Pilot delivery to live FSI audience |
| **Working group introductions** | Connect to ARB, AIGF, GRIS teams for content review |
| **Member firm pilot cohort** | 1–2 FINOS member firms run cohort, provide feedback |

### 5.4 What's Needed from Linux Foundation

| Ask | Why |
|---|---|
| **LF EdX platform delivery** | Self-paced async distribution (the primary channel) |
| **Certification platform integration** | Cert exam delivery via LF Training infrastructure |
| **Joint FINOS + LF Training branding** | Signals official status |
| **Cross-foundation collaboration with OpenSSF** | Gemara co-authoring + joint module |
| **Marketing pipeline** | LF Training's existing FSI customer relationships |

### 5.5 Governance Model (Proposed)

- **Stewardship:** FINOS CALM Working Group
- **Maintenance:** Open contributor model, FINOS-standard EasyCLA
- **Content licensing:** CC BY-SA 4.0 (text, slides, illustrations)
- **Code licensing:** Apache 2.0 (labs, scripts, lab infrastructure)
- **Decision-making:** FINOS standard (lazy consensus, working-group vote for major changes)
- **Curriculum updates:** Tied to CALM spec releases; minor updates rolling, major updates per spec major version

---

## 6. Business Case

### 6.1 Direct Value

| Stakeholder | Value |
|---|---|
| **FINOS member firms** | Workforce development; reduced onboarding time; regulatory compliance via shared standard |
| **Linux Foundation** | New certification revenue stream; expansion into architecture training market |
| **OpenSSF** | Cross-foundation visibility; concrete demonstration of Gemara model |
| **FINOS** | Mainstreaming of CALM beyond founding community; broader contributor base |
| **Individual learners** | Marketable certification; career advancement in regulated industries |

### 6.2 Revenue Model (Suggested)

- **Community edition** — always free, GitHub-hosted, no certification
- **Certification fees** — Associate free, Practitioner $150, Architect $300 (LF Training rates)
- **Enterprise cohort licensing** — bulk seats for member firms
- **Pattern library marketplace** — open-source community patterns free; curated enterprise patterns paid (future)

### 6.3 Comparable Programs

| Program | Provider | Annual revenue (est) | Adoption signal |
|---|---|---|---|
| HashiCorp Terraform Associate | HashiCorp | $20M+ | 200K+ certified |
| Certified Kubernetes Administrator | CNCF / LF | $25M+ | 100K+ certified |
| AWS Solutions Architect | AWS | $200M+ | 500K+ certified |
| **CALM Architect (projected Y2)** | FINOS + LF | $2–5M | 10K+ certified |

The architecture-discipline category is unclaimed. First mover advantage is real.

---

## 7. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| CALM spec evolves during course production | Pin to CALM 1.2; track 1.3 RC in parallel; rolling content refresh per release |
| CALM Guard / Studio roadmap items don't ship in time | Curriculum already gap-analyzes assumed features; deliver v1 against current state; expand v2 as features ship |
| FINOS adoption slower than projected | Course operates regardless under independent community model; FINOS adoption is upside, not gate |
| Workshop pilot reveals content gaps | Iterate based on Phase 10 feedback before Phase 12 cert launch |
| Cross-foundation collaboration friction (OpenSSF) | Direct working-group engagement with Gemara authors (Eddie Knight, Jennifer Power); Linux Foundation Cross-Project Council escalation if needed |
| Limited FSI domain expertise on author side | Module 6 + Capstones B/C reviewed by FINOS member firm SMEs before launch |

---

## 8. Next Steps

### Immediate (Week 1–2 after FINOS Working Group review)

1. **FINOS Working Group meeting** — present this proposal, gather feedback
2. **Author meeting with ARB / AIGF / Gemara teams** — content alignment
3. **Linux Foundation Training scoping call** — platform requirements, certification design
4. **Repo public release** — move from private MVP to public after Working Group endorsement
5. **Advisory board formation** — 3–5 architects from FINOS member firms

### Phase 2 start (Week 3–6)

6. **Begin content production** — Module 0 + Module 1 authored, illustrated, lab-ready
7. **First OSFF workshop pilot scheduled** — 4-hour slot for Module 0–1 hands-on

### Phase 9–10 (Month 6–12)

8. **Formal FINOS endorsement vote**
9. **LF EdX platform launch** — text + video + cert exam pipeline
10. **Workshop pilot at OSFF** — first live instructor-led delivery
11. **First certified cohort** — 50 students through Practitioner track

---

## 9. About the Author

**Gourav Shah** — Founder, Initcron / OpsFlow.sh. Long-standing contributor to CNCF and DevOps education ecosystem. Active FINOS contributor on the FINOS architecture-as-code monorepo, including recent work on calm-suite, calm-studio MCP server integrations, and the ARB documentation pipeline. Practitioner background spanning IaC, container orchestration, AI/ML platform engineering, and FSI architecture consulting.

**Affiliation for this proposal:** Independent contributor + FINOS community member. CALM Academy is offered to FINOS as a contribution, not a commercial product.

---

## 10. Appendices

| Appendix | Document |
|---|---|
| A | Full curriculum specification ([`CURRICULUM.md`](CURRICULUM.md), 1411 lines) |
| B | Phased delivery roadmap ([`ROADMAP.md`](ROADMAP.md)) |
| C | OpenSSF Gemara integration analysis ([`.planning/research/gemara-analysis.md`](.planning/research/gemara-analysis.md)) |
| D | FINOS ecosystem cross-project mapping ([`.planning/research/finos-ecosystem.md`](.planning/research/finos-ecosystem.md)) |
| E | Production workflow standards ([`docs-meta/PRODUCTION-WORKFLOW.md`](docs-meta/PRODUCTION-WORKFLOW.md)) |
| F | Style guide ([`docs-meta/STYLE-GUIDE.md`](docs-meta/STYLE-GUIDE.md)) |
| G | Lab format specification ([`docs-meta/LAB-FORMAT.md`](docs-meta/LAB-FORMAT.md)) |
| H | Quiz format specification ([`docs-meta/QUIZ-FORMAT.md`](docs-meta/QUIZ-FORMAT.md)) |
| I | Illustration standards ([`docs-meta/ILLUSTRATION-STANDARDS.md`](docs-meta/ILLUSTRATION-STANDARDS.md)) |
| J | FINOS architecture-as-code repo intel ([`.planning/intel/finos-aac-ecosystem.md`](.planning/intel/finos-aac-ecosystem.md)) |

---

## Contact

**Repository:** https://github.com/gjs-opsflo/calm-academy
**Author:** Gourav Shah — `@gjs-opsflo` on GitHub
**Email:** bean@initcron.org

For FINOS Working Group questions, scheduling, or collaboration discussions, please open an issue on the repository or reach out directly.
