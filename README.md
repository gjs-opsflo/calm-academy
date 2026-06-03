# CALM Academy

**Status:** Private MVP. Will go public + propose to FINOS as official educational program.

The world's first comprehensive course on **Architecture as Code (AaC)** — built on FINOS CALM 1.2, integrated with OpenSSF Gemara, AIGF, SAIF, and the full FINOS ecosystem.

## What this is

A complete educational program for software architects, platform engineers, security architects, and AI/ML engineers to learn how to model, validate, govern, and automate system architectures using the FINOS Common Architecture Language Model (CALM).

**Tagline:** *"Terraform transformed infrastructure. CALM transforms architecture."*

## Why it exists

Architecture lives in PowerPoint. It drifts from reality. New engineers can't read it. AI can't consume it. It has no version history, no tests, no CI/CD gate.

The same problem was solved twice before — Configuration as Code, Infrastructure as Code. Architecture as Code is the missing layer. CALM is the open standard for it. This course is the on-ramp.

## What's in the curriculum

7 modules, ~20 hours, 3 certification tracks (Associate → Practitioner → Architect):

| Module | Topic | Duration |
|---|---|---|
| **0** | The 15-Minute On-Ramp — CALM Without Learning CALM | 0.5h |
| **1** | The Case for Architecture as Code | 2h |
| **2** | CALM Fundamentals | 3h |
| **3** | The CALM Ecosystem (CLI, Studio, Hub, Server, VSCode) | 3h |
| **4** | Governance, Compliance, Gemara, CALM Guard | 4h |
| **5** | AI-Native Architecture — ai:* types, AIGF, SAIF | 4h |
| **6** | Enterprise Adoption + Capstone | 4h |

Three capstone scenarios: FSI Modernization, Autonomous Wealth Management (MiFID II), AI Credit Risk Scoring (SR 11-7).

**Canonical curriculum:** [`.planning/CURRICULUM.md`](.planning/CURRICULUM.md)

## Delivery formats

Built once, ships in seven formats:

1. **Self-paced async** (text + video + labs) — primary
2. 5-day instructor-led workshop
3. 3-day intensive
4. 1-day executive briefing
5. OSFF conference 4h workshop
6. University 13-week course
7. Enterprise in-house custom

## Repo structure

```
calm-academy/
├── .planning/              GSD project management + curriculum + research
├── content/                Module text lessons (Markdown/MDX)
├── illustrations/          Excalidraw sources + exported SVGs
├── slides/                 Reveal.js / Marp decks
├── labs/                   Lab markdown + starter repos
├── code-examples/          Working CALM JSON artifacts
├── quizzes/                YAML quiz definitions
├── site/                   Docusaurus site
├── scripts/                Build, lint, export helpers
└── docs-meta/              Style guide, production workflow, asset standards
```

## Production workflow

**Text-first.** Text lessons are the canonical source. Video, slides, narration all derive from text + illustrations.

```
Author text (Markdown)
    → Create/select illustrations (Excalidraw)
    → Generate slide deck from text + illustrations
    → Record video using slides + text as script
    → Publish: text on docs site, video on platform, slides in repo
```

See [`docs-meta/PRODUCTION-WORKFLOW.md`](docs-meta/PRODUCTION-WORKFLOW.md).

## Built with

- **Course content**: Markdown, MDX
- **Site**: Docusaurus (matches FINOS calm.finos.org)
- **Illustrations**: Excalidraw (B&W house style)
- **Labs**: Docker Compose locally; [Learnforge](https://github.com/agentixgarage/learnforge) integration planned
- **Quizzes**: YAML + custom MDX component
- **Project management**: GSD harness (Get Shit Done)
- **CI**: GitHub Actions

## Quick start (contributors)

```bash
git clone git@github.com:gjs-opsflo/calm-academy.git
cd calm-academy

# Site preview
cd site && npm install && npm run start

# Lab environment
docker compose -f labs/docker-compose.yml up
```

## License

**TBD.** Targeting dual license:
- Code/labs: Apache 2.0
- Course content (text/slides/illustrations): CC BY-SA 4.0

Final licensing decided upon FINOS/Linux Foundation adoption.

## Status

Phase 1: Bootstrap (this commit)
Phase 2: Module 0 + Module 1 production
Phase 3: Modules 2–6 production
Phase 4: FINOS proposal submission
Phase 5: Public launch + workshop pilot at OSFF

See [`.planning/ROADMAP.md`](.planning/ROADMAP.md) for full project plan.

## Contact

Maintainer: Gourav Shah (gjs-opsflo)
