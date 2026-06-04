# Contributing to CALM Academy

## Status

**Private MVP.** External contributions not yet accepted. Will open up post-FINOS adoption.

Internal contributors: see [`CLAUDE.md`](CLAUDE.md) for full project context and authoring standards.

## Quick links

- Canonical curriculum: [`CURRICULUM.md`](CURRICULUM.md)
- Project roadmap: [`ROADMAP.md`](ROADMAP.md)
- FINOS proposal: [`PROPOSAL.md`](PROPOSAL.md)
- Production workflow: [`docs-meta/PRODUCTION-WORKFLOW.md`](docs-meta/PRODUCTION-WORKFLOW.md)
- Style guide: [`docs-meta/STYLE-GUIDE.md`](docs-meta/STYLE-GUIDE.md)
- Lab format: [`docs-meta/LAB-FORMAT.md`](docs-meta/LAB-FORMAT.md)
- Quiz format: [`docs-meta/QUIZ-FORMAT.md`](docs-meta/QUIZ-FORMAT.md)
- Illustration standards: [`docs-meta/ILLUSTRATION-STANDARDS.md`](docs-meta/ILLUSTRATION-STANDARDS.md)

## Pre-commit checklist

Before opening a PR:

- [ ] Markdown lints clean (`npm run lint:md`)
- [ ] All CALM JSON examples validate (`npm run validate:calm`)
- [ ] All Excalidraw illustrations have exported SVG (`npm run export:excalidraw`)
- [ ] Cross-references use permalink slugs, not chapter numbers
- [ ] No `...` truncation in code snippets
- [ ] TL;DR present at top of every text lesson
- [ ] Lab tested end-to-end with `docker compose up`
- [ ] Linked GSD task ID in PR description

## Commit format

Conventional Commits (FINOS-standard):

```
feat(module-04): add Gemara layer chapter
fix(lab-05): correct docker compose port mapping
docs(curriculum): update capstone B threat model
chore(deps): bump docusaurus to 3.x
```

Scopes: `module-NN`, `lab-NN`, `curriculum`, `roadmap`, `site`, `scripts`, `ci`, `deps`, `meta`.

## License

TBD by FINOS / Linux Foundation. See [`LICENSE`](LICENSE).
