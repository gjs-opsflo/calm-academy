# .planning

GSD harness project management directory.

## Files

**Canonical curriculum + roadmap live at repo root** (see [`../CURRICULUM.md`](../CURRICULUM.md), [`../ROADMAP.md`](../ROADMAP.md), [`../PROPOSAL.md`](../PROPOSAL.md)). This folder holds supporting research + GSD operational state.

| File | Purpose |
|---|---|
| `research/` | Research artifacts (Gemara, FINOS ecosystem, etc.) |
| `intel/` | Codebase intelligence (related repos like FINOS aac) |
| `phases/` | (Phase 2+) Per-module GSD phase plans |
| `execution-state/` | (Generated) GSD execution state — gitignored |
| `checkpoints/` | (Generated) GSD checkpoints — gitignored |

## Reading order

1. [`../CURRICULUM.md`](../CURRICULUM.md) — what we're building
2. [`../ROADMAP.md`](../ROADMAP.md) — when + in what order
3. [`../PROPOSAL.md`](../PROPOSAL.md) — FINOS adoption pitch
4. [`research/gemara-analysis.md`](research/gemara-analysis.md) — flagship conceptual integration
5. [`research/finos-ecosystem.md`](research/finos-ecosystem.md) — cross-project mapping
6. [`intel/finos-aac-ecosystem.md`](intel/finos-aac-ecosystem.md) — where to find spec/tools

## GSD usage

This project uses Get Shit Done discipline. Each module = one GSD phase.

When starting next phase: `/gsd:plan-phase`
When executing: `/gsd:execute-plan`
When verifying: `/gsd:verify-phase`
