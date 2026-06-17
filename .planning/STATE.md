---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 5
status: executing
last_updated: "2026-06-17T15:15:00Z"
progress:
  total_phases: 6
  completed_phases: 4
  total_plans: 18
  completed_plans: 16
  percent: 78
---

# Project State: CALM Academy

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-15)

**Core value:** A learner produces a validated `.calm.json` in under 15 minutes (Module 0) — before learning a single spec rule.
**Current milestone:** Milestone 1 — First Public Draft (Modules 0–3 + Site)
**Current phase:** 5
**Status:** Ready to execute

## Milestone Progress

**Milestone 1 — First Public Draft**

- Phase 1: Module 0 — On-Ramp → **planned (3 plans, 2 waves) — ready to execute**
- Phase 2: Module 1 — Case for AaC → not started
- Phase 3: Module 2 — CALM Fundamentals → not started
- Phase 4: Module 3 — Ecosystem → not started
- Phase 5: Site Launch Prep → not started
- Phase 6: Polish + Milestone Close → not started

## Key Decisions

| Decision | Date | Rationale |
|----------|------|-----------|
| Modules 0–3 only for v1 | 2026-06-15 | Ship and validate core workflow before producing advanced content |
| Vertical MVP delivery (module per phase) | 2026-06-15 | Each phase = shippable increment; early modules prove pipeline |
| Skip research phase | 2026-06-15 | Gemara + FINOS ecosystem research already exists in .planning/research/ |
| YOLO mode | 2026-06-15 | Auto-approve; user wants to move fast |
| Sidebar order verified via HTML not sitemap | 2026-06-17 | Docusaurus sitemap plugin sorts URLs alphabetically regardless of sidebar_position; menu__link HTML structure is the correct verification artifact |

## Blockers

(none)

## Notes

- Root-level `ROADMAP.md` contains the full 12-phase strategic roadmap (all milestones). `.planning/ROADMAP.md` tracks Milestone 1 execution.
- Existing research files: `.planning/research/gemara-analysis.md`, `.planning/research/finos-ecosystem.md`, `.planning/intel/finos-aac-ecosystem.md`
- calmstudio-mcp installed locally at `/Users/gshah/.local/share/calmstudio-mcp/calmstudio-mcp.cjs` (NOT on npm; PR build v0.0.0)
- CALM spec canonical source: `/Users/gshah/work/opsflow-sh/calm/architecture-as-code`

---
*Initialized: 2026-06-15*
*Last updated: 2026-06-17 after Phase 5 Plan 03 complete (Quiz component TDD — 15 tests RED/GREEN, prebuild script, embedded in 4 modules)*
