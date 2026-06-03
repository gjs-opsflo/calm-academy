# Gemara (OpenSSF) — Integration Analysis

> Source: OpenSSF Gemara Whitepaper, March 2026
> URL: https://openssf.org/wp-content/uploads/2026/03/04_OpenSSF_Gemara-Project_Whitepaper.pdf

## What Gemara is

Gemara is OpenSSF/Linux Foundation's **GRC Engineering Model for Automated Risk Assessment** — a 7-layer OSI-inspired model that structures Governance, Risk, and Compliance activities.

It defines:
- A common vocabulary for GRC activities
- A layered architecture (7 layers, OSI-inspired)
- A clear separation between "definition" activities (Layers 1–3) and "measurement" activities (Layers 5–7)
- A pivot point at Layer 4 (Sensitive Activities) — the actual systems that introduce risk
- An explicit call for machine-optimized documentation standards with MCP as the foundation

## The 7 layers

```
L7 — Audit & Continuous Monitoring         (efficacy review)
L6 — Preventive & Remediative Enforcement  (corrective actions)
L5 — Intent & Behavioral Evaluation        (inspection of activities)
──────────────────── PIVOT ────────────────────
L4 — Sensitive Activities                  (actions that introduce risk) ← CALM lives here
──────────────────────────────────────────────
L3 — Risks & Policy                        (organization-specific rules)
L2 — Threats & Controls                    (technology-specific objectives) ← FINOS CCC cited
L1 — Vectors & Guidance                    (foundational knowledge, regulations)
```

## Definitions extracted

| Term | Definition |
|---|---|
| **Assessment** | Process of determining whether an outcome meets the actor's intent |
| **Assessment Requirement** | Tightly scoped, verifiable condition |
| **Audit** | Formal, opinionated review at a point in time |
| **Behavior Evaluation** | Opinionated observation of simulated or real activities |
| **Capability** | Feature or function of a system; primary component of attack surface |
| **Catalog** | Structured set of related prose + metadata |
| **Continuous Monitoring** | Multi-system process collecting Evaluation + operational data on ongoing basis |
| **Control** | Org's ability to assert desired state; or a safeguard/countermeasure |
| **Compliance** | Adherence to a Rule or set of Rules |
| **Evaluation** | Manual/automated process forming opinion on state of Compliance |
| **Enforcement** | Action taken in response to non-compliance findings |
| **Evaluation Finding** | Evidence + opinionated result of an Assessment |
| **Guidance** | Prose intended to bring about a desired outcome |
| **Guideline** | Atomic element of a Guidance Catalog |
| **Intent Evaluation** | Evaluation ensuring resource is prepared in alignment with Policy |
| **Objective** | Unified statement of intent |
| **Policy** | Clearly-scoped set of rules based on Risk Appetite |
| **Preventive Enforcement** | Action that interrupts a non-compliance-causing process |
| **Remediative Enforcement** | Corrective action in response to deployed non-compliance |
| **Residual Risk** | Risk remaining after mitigation + enforcement |
| **Risk Appetite** | Level of Risk an org is willing to accept |
| **Rule** | Active, enforceable Policy, regulation, or law |
| **Sensitive Activity** | Type of action that introduces Risk |
| **Threat** | Circumstance/event where Vector applied to Capability causes negative impact |
| **Vector** | Opportunity for attacker to exploit a vulnerability |
| **Vulnerability** | Weakness in or associated with a Capability |

## Layer details

### Layer 1: Vectors & Guidance
Foundational knowledge. Vectors = attacker opportunities. Guidance = generic high-level recommendations.
**Examples cited**: MITRE ATT&CK (techniques), OWASP Top 10, NIST CSF, HIPAA, GDPR, CRA, PCI, ISO

### Layer 2: Threats & Controls
Technology-specific objectives. Threats = narrow, scenario-specific. Controls = mitigations with Assessment Requirements.
**Examples cited**: **CIS Benchmarks, FINOS CCC, OSPS Baseline** (OpenSSF)
**Key trend**: composability — agnostic Controls for information systems

### Layer 3: Risks & Policy
Org-specific rules based on Risk Appetite. Policy = time-bound, references Threat-informed Controls, contains rollout plan. Risk Catalog defines org Risk Appetite.

### Layer 4: Sensitive Activities (the PIVOT)
Actions that introduce Risk. Software development lifecycles, infrastructure provisioning, system design. **This is where CALM architectures live.**

### Layer 5: Intent & Behavioral Evaluation
- Intent Evaluation = human-to-human interviews + automated config exams (SAST, SCA, cloud config scans)
- Behavior Evaluation = observed/simulated activity (DAST, IAST, pen testing, secret shoppers)

### Layer 6: Preventive & Remediative Enforcement
- Preventive = interrupts non-compliance before deployment (deployment gates)
- Remediative = corrective after deployment (isolate, replace, retrain)

### Layer 7: Audit & Continuous Monitoring
- Audit = formal, opinionated, point-in-time review
- CCM (Continuous Compliance Monitoring) = aggregates Evaluation results + operational metrics in real-time

## Section 8 — The Need for Machine-Optimized Documentation

**This is the section that defines CALM's positioning.**

Key quotes (paraphrased from whitepaper):
- "Immense value has come from OSCAL... but OSCAL has shortcomings"
- "Optimizing for machines when crafting machine-readable GRC documents" is the missing direction
- Specifications allowing "customized fields" cause "loss of structural clarity"
- "Achieving an opinionated, standardized schema for each activity type will allow rapid industry-wide acceleration of automated Risk Assessments"
- **"When a properly designed system such as MCP or AI-skills is overlaid on a machine-optimized GRC database, AI capabilities benefit from replacing vague, unstructured prose with unique technical identifiers and explicit resource mappings"**
- **"A2A (Agent2Agent) enabled system that allows GRC specialized systems to provide precisely contextualized information... AI systems will require dramatically fewer resources, security tools increase in accuracy"**

## CALM Academy interpretation

CALM is the machine-optimized schema Gemara explicitly calls for. The integration is not cosmetic — it is structural and reciprocal.

```
Gemara L1 (Vectors & Guidance)     → CALM Standards (NIST/MITRE/OWASP mappings in Hub)
Gemara L2 (Threats & Controls)     → CALM threat decorators + FINOS CCC + OSPS Baseline
Gemara L3 (Risks & Policy)         → CALM Patterns (org-specific rules)
─────────────────────────────────────────────────────────────────────────────
Gemara L4 (Sensitive Activities)   → CALM architecture document itself
─────────────────────────────────────────────────────────────────────────────
Gemara L5 (Evaluation)             → CALM Guard agents (Scout, Ranger, Arsenal, Sniper)
Gemara L6 (Enforcement)            → CALM Guard CI/CD pipeline generation + PR gates
Gemara L7 (Audit + Monitoring)     → CALM Guard continuous monitoring + CALM Hub evidence
```

## Why this matters for the course

1. **Module 1.4** — Gemara is introduced as the conceptual framework for the entire course
2. **Module 4** — Gemara is the spine of the governance module (every chapter mapped to Gemara layers)
3. **CALM Academy positioning** — "CALM is the schema for Gemara Layer 4" is a tightly-defensible technical claim
4. **FINOS + OpenSSF joint story** — two LF foundations with complementary, non-overlapping projects forming a complete GRC Engineering stack
5. **Partner pipeline** — Sonatype, Red Hat, CVS Health (Gemara founding maintainers) become natural co-instructors and enterprise adoption partners

## Notable contributors / authors

Authors: Eddie Knight, Jennifer Power
Founding maintainer orgs: Sonatype, Red Hat, CVS Health
Influences: Ian Miell, Michaela Iorga, Tara Houlden, Ben Cotton, Christopher Robinson, Evan Anderson, others

## Outstanding questions

- How will Gemara reference implementation schemas evolve? (current state: model is published, implementation SDKs forthcoming)
- Can FINOS + OpenSSF co-sponsor a joint module on the GRC Engineering stack?
- Is there formal MoU / collaboration agreement opportunity between FINOS CALM and OpenSSF Gemara teams?
