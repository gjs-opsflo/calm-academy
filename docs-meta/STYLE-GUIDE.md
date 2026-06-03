# Style Guide

## Voice
- Plain English. Direct. No filler.
- Speak to working architects and engineers — not students of architecture
- FSI-aware (financial services context) but never FSI-only
- Active voice. Present tense. Second person ("you") for instructions.

## Structure (every text lesson)

```markdown
---
title: <Chapter title>
slug: <kebab-case-slug>
module: <NN>
chapter: <N.N>
estimated_minutes: <int>
prerequisites:
  - <slug-of-required-chapter>
---

## TL;DR
- Bullet 1 (the single most important takeaway)
- Bullet 2
- Bullet 3
- Bullet 4 (optional)
- Bullet 5 (optional)

## Why it matters
One short paragraph. Hook the reader. Real-world stakes.

## The concept
Main content. 1500–3000 words. Use:
- H3 subheadings for major sub-topics
- Inline diagrams via `![alt](../illustrations/exported/diagram.svg)`
- Code blocks with language tags
- Tables for comparisons
- Callout boxes for warnings/notes (custom MDX component)

## Code/CALM examples
Use real, validated `.calm.json` files from `code-examples/`:

```json
// from code-examples/module-02/first-architecture.calm.json
{
  "$schema": "https://calm.finos.org/release/1.2/meta/calm.json",
  "nodes": [...]
}
```

## Common mistakes
- Mistake 1 + how to avoid
- Mistake 2 + how to avoid

## Knowledge check
👉 [Take the quiz](../quizzes/module-NN-<slug>.yaml)

## Lab
👉 [Lab N: <name>](../../labs/lab-NN-<slug>/LAB.md)

## Further reading
- [Related lesson](../<other-module>/<other-slug>.mdx)
- [CALM spec](https://calm.finos.org/...)
- External reference
```

## Diagrams
- Excalidraw, **black and white only**
- Single source of truth: `illustrations/source/<topic>.excalidraw`
- Exported SVG: `illustrations/exported/<topic>.svg`
- One diagram per concept. Don't pack 5 ideas into one drawing.
- Label everything. No "what does this arrow mean?" guesswork.
- Use a consistent visual language for CALM node types — same shapes as CALM Studio.

## Code blocks
- Always include language tag (` ```json `, ` ```bash `, ` ```typescript `)
- Code must work copy-paste — no `...` or `// rest of code` placeholders
- Commands shown with `$` prompt only when distinguishing input from output
- Long output truncated with explicit `# ...output truncated...` comment

## Tables vs prose
Use tables when:
- Comparing 3+ items across 2+ dimensions
- Listing options with attributes
- Showing mappings (e.g. Gemara layer → CALM artifact)

Use prose when:
- Explaining a concept
- Telling a story
- Building an argument

## Cross-references
Always use slug-based relative links:
- ✅ `[CALM nodes](../module-02-fundamentals/nodes.mdx)`
- ❌ `[CALM nodes](Chapter 2.2)`

## Headings
- H1 only for chapter title (handled by frontmatter)
- H2 for major sections in template
- H3 for subsections
- Don't skip levels (no H4 under H2 without H3)
- Sentence case for headings ("The CALM specification" not "The CALM Specification")

## Inclusive language
- Use "they" as default singular pronoun
- Avoid "obviously", "simply", "just" — what's obvious to author is rarely obvious to learner
- "Allowlist/denylist" not "whitelist/blacklist"
- "Main branch" not "master branch"

## Terminology consistency
| Use | Don't use |
|---|---|
| Architecture as Code (AaC) | Architecture-as-Code, Arch-as-Code |
| CALM | Calm, calm (except in code) |
| `ai:*` node types | AI node types (be precise) |
| `connects` relationship | "connection" |
| Gemara layer | Gemara level, Gemara tier |
| FINOS CCC | FINOS Common Controls (spell out once, abbreviate after) |
| AIGF | AI Governance Framework (spell out once) |
| SAIF | Secure AI Framework (spell out once) |

## File naming
- All Markdown: kebab-case (`why-it-matters.mdx`)
- Quizzes: `module-NN-<slug>.yaml`
- Labs: `lab-NN-<slug>/LAB.md`
- Code examples: `<system-slug>.calm.json`
- Illustrations: kebab-case, descriptive (`gemara-7-layers-overview.excalidraw`)

## Length targets
- TL;DR: ≤80 words total
- Why it matters: 50–150 words
- Main concept: 1500–3000 words per chapter
- Common mistakes: 3–7 items
- Cheatsheets: 1 printable page max

## Tone calibrations
| Module | Tone |
|---|---|
| M0 | Enthusiastic, hook-heavy, "watch this work" |
| M1 | Persuasive, narrative, IaC-historical |
| M2 | Reference-grade, precise, definitional |
| M3 | Operational, tool-by-tool, demo-heavy |
| M4 | Authoritative, regulation-aware, careful |
| M5 | Frontier, exciting but grounded |
| M6 | Strategic, executive-ready in adoption sections |
