---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 6
status: complete
last_updated: "2026-06-18T14:00:00.000Z"
progress:
  total_phases: 6
  completed_phases: 6
  total_plans: 22
  completed_plans: 22
  percent: 100
---

# Project State: CALM Academy

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-15)

**Core value:** A learner produces a validated `.calm.json` in under 15 minutes (Module 0) — before learning a single spec rule.
**Current milestone:** Milestone 1 — COMPLETE
**Current phase:** 6 (complete)
**Status:** Ready for FINOS pitch

## Milestone 1 — Modules 0–3 Delivered

Status: COMPLETE
Date: 2026-06-18
Live site: https://gjs-opsflo.github.io/calm-academy/
Requirements: 21/21 v1 requirements Complete (ILL-02/03/04 authored post-milestone-1)
Next: Milestone 2 — Modules 4–6, full illustration authoring, Learnforge integration

## Milestone Progress

**Milestone 1 — First Public Draft**

- Phase 1: Module 0 — On-Ramp → **complete (3/3 plans)**
- Phase 2: Module 1 — Case for AaC → **complete (2/2 plans)**
- Phase 3: Module 2 — CALM Fundamentals → **complete (4/4 plans)**
- Phase 4: Module 3 — Ecosystem → **complete (5/5 plans)**
- Phase 5: Site Launch Prep → **complete (4/4 plans)**
- Phase 6: Polish + Milestone Close → **complete (4/4 plans) — 2026-06-18**

## Key Decisions

| Decision | Date | Rationale |
|----------|------|-----------|
| Modules 0–3 only for v1 | 2026-06-15 | Ship and validate core workflow before producing advanced content |
| Vertical MVP delivery (module per phase) | 2026-06-15 | Each phase = shippable increment; early modules prove pipeline |
| Skip research phase | 2026-06-15 | Gemara + FINOS ecosystem research already exists in .planning/research/ |
| YOLO mode | 2026-06-15 | Auto-approve; user wants to move fast |
| Sidebar order verified via HTML not sitemap | 2026-06-17 | Docusaurus sitemap plugin sorts URLs alphabetically regardless of sidebar_position; menu__link HTML structure is the correct verification artifact |
| Node 22 in deploy workflow (not Node 20) | 2026-06-18 | Node 20 EOL April 2026; ci.yml already uses 22 — deploy workflow matches |
| Native GitHub Pages OIDC (not peaceiris) | 2026-06-18 | actions/configure-pages + upload-pages-artifact + deploy-pages is the officially supported pattern; no long-lived tokens |

## Blockers

(none)

## Notes

- Root-level `ROADMAP.md` contains the full 12-phase strategic roadmap (all milestones). `.planning/ROADMAP.md` tracks Milestone 1 execution.
- Existing research files: `.planning/research/gemara-analysis.md`, `.planning/research/finos-ecosystem.md`, `.planning/intel/finos-aac-ecosystem.md`
- calmstudio-mcp installed locally at `/Users/gshah/.local/share/calmstudio-mcp/calmstudio-mcp.cjs` (NOT on npm; PR build v0.0.0)
- CALM spec canonical source: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code`

---
*Initialized: 2026-06-15*
*Last updated: 2026-06-18 — Milestone 1 COMPLETE. All 6 phases done, 21/21 v1 requirements verified. Live site at https://gjs-opsflo.github.io/calm-academy/ with 24 chapters, 4 quizzes, 3 Module 0 illustrations, search, CI/CD auto-deploy. FINOS pitch ready.*
