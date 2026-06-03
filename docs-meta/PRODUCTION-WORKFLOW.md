# Production Workflow

## Core principle

**Text-first. Everything else derives.**

```
Author text (Markdown)
    → Create/select illustrations (Excalidraw)
    → Generate slide deck from text + illustrations
    → Record video using slides + text as script
    → Publish: text on Docusaurus site, video on platform, slides in repo
```

## Why text-first

| Benefit | Why it matters |
|---|---|
| Cheap to review | Catch errors before expensive video production |
| Translation-ready | Translate text once, narrate per language |
| Updates are cheap | Edit text + re-narrate changed section only |
| Day-one shippable | Site launches with text; videos roll out chapter-by-chapter |
| Instructor-ready | Workshop instructors use text as teaching script |
| AI-pipeline ready | Text + illustrations can drive AI-generated video drafts later |

## Per-chapter production sequence

### Step 1 — Outline
- Use the chapter template (`docs-meta/templates/chapter-outline.md`)
- Confirm TL;DR (3-5 bullets)
- List illustrations needed
- List code examples needed
- List lab connection (if any)

### Step 2 — Draft text
- Write the full text lesson per `docs-meta/STYLE-GUIDE.md`
- Include placeholder image links (`![alt](../illustrations/exported/placeholder.svg)`)
- Include real, validated CALM JSON examples (no fabricated artifacts)
- Cross-reference other chapters by permalink slug

### Step 3 — Create illustrations
- Excalidraw, black & white house style
- User authors via existing agentic skill
- Save source to `illustrations/source/<chapter-slug>-<diagram-name>.excalidraw`
- Export SVG to `illustrations/exported/<same-name>.svg` via `scripts/export-excalidraw.sh`
- Replace placeholder links in text

### Step 4 — Code examples
- Author CALM JSON examples in `code-examples/<topic>/<example>.calm.json`
- Validate with `calm validate` (enforced by CI)
- Reference from text via relative path

### Step 5 — Quiz
- 4–6 questions covering the chapter
- YAML format per `docs-meta/QUIZ-FORMAT.md`
- Wrong answers reference specific text section anchors

### Step 6 — Lab (if chapter has one)
- LAB.md + starter/ + solution/ + (optional) docker-compose.yml
- Format per `docs-meta/LAB-FORMAT.md`
- Test end-to-end on clean Docker

### Step 7 — Slide deck (per module, not per chapter)
- Marp or Reveal.js format under `slides/module-NN-<slug>.md`
- Built from module's text + illustrations
- One deck per module, not per chapter

### Step 8 — Video (later phase)
- Use text as script, slides as visuals
- Two valid variants:
  - **A** (talking-head + slides) for demo-heavy / tooling-changing content
  - **B** (narrated voice-over + animated illustrations) for stable / concept-heavy content
- Captions required, auto-generated then human-reviewed
- Per-chapter video, 5–12 min max

## Asset interdependencies

```
Text lesson (canonical)
    ├── Illustrations (referenced inline)
    ├── Code examples (referenced inline)
    ├── Lab (linked at end)
    └── Quiz (linked at end)

Module slide deck (one per module)
    ├── Pulls from all text lessons in module
    └── Pulls from all illustrations in module

Video lesson (one per text lesson, later phase)
    ├── Script: text lesson
    └── Visuals: module slide deck slices + screencasts where needed
```

## What NOT to do

- ❌ Author slides before text lesson exists
- ❌ Record video before slides + text exist
- ❌ Reference CALM JSON inline without a real file in `code-examples/`
- ❌ Use color in illustrations (house style is B&W only)
- ❌ Cross-reference by chapter number (slugs only — chapters reorder)
- ❌ Truncate code with `...` (must be copy-paste ready)
- ❌ Skip TL;DR (every text lesson opens with it)

## Tooling

| Step | Tool |
|---|---|
| Text | VS Code / any editor + Markdown |
| Illustrations | Excalidraw (desktop or Obsidian) + user's agentic skill |
| Code examples | calmstudio-mcp (via Claude Code) |
| Lab compose | Docker + Docker Compose |
| Quizzes | YAML + custom MDX component (custom build) |
| Slides | Marp (CLI) or Reveal.js (browser) |
| Video | Screen Studio / Loom / OBS — chosen at recording phase |
| Site preview | Docusaurus dev server (`npm run start` in `site/`) |

## CI enforcement

GitHub Actions runs on every PR:
- Markdown lints (`markdownlint`)
- Link checker (`lychee`)
- CALM JSON validator (uses `@finos/calm-cli`)
- Excalidraw → SVG freshness check (warns if `.excalidraw` newer than `.svg`)
- Docusaurus site builds clean
- Lab Docker Compose syntax check
