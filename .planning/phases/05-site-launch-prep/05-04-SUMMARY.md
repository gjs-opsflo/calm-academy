---
phase: 05-site-launch-prep
plan: "04"
subsystem: ci
tags: [github-actions, github-pages, docusaurus, deploy, ci-cd]
dependency_graph:
  requires: ["05-01", "05-02", "05-03"]
  provides: ["site-deploy.yml", "live GitHub Pages deployment"]
  affects: [".github/workflows"]
tech_stack:
  added: [actions/configure-pages@v4, actions/upload-pages-artifact@v4, actions/deploy-pages@v4]
  patterns: [native GitHub Pages OIDC workflow, split build/deploy jobs, build-on-PR deploy-on-push]
key_files:
  created:
    - .github/workflows/site-deploy.yml
  modified: []
decisions:
  - "Node 22 used instead of CONTEXT.md D10's Node 20 — Node 20 reached EOL April 2026; ci.yml is the canonical reference and already uses 22"
  - "fetch-depth: 1 (shallow clone) — full history unnecessary for static site builds; saves ~10s on large repos"
  - "cancel-in-progress: false — prevents simultaneous deploys but does not cancel in-progress runs (Pages best practice to avoid partial deploys)"
  - "npm ci runs before convert-quiz-yaml.mjs — js-yaml is a devDependency in site/package.json and must be installed before the prebuild script runs"
  - "actions/configure-pages@v4 precedes actions/upload-pages-artifact@v4 — sets baseUrl injection context that the upload step depends on"
metrics:
  duration_minutes: 17
  tasks_completed: 3
  files_created: 1
  files_modified: 0
  completed_date: "2026-06-17"
---

# Phase 5 Plan 04: GitHub Actions Deploy Summary

**One-liner:** Native GitHub Pages OIDC workflow deploying Docusaurus via configure-pages + upload-artifact + deploy-pages, with build-on-PR and deploy-on-push-to-main separation.

## What Was Built

A single GitHub Actions workflow at `.github/workflows/site-deploy.yml` that:

- Triggers on `push` to `main` (full build + deploy) and `pull_request` to `main` (build-only — no deploy)
- Uses OIDC token permissions (`pages: write`, `id-token: write`) — the native GitHub Pages approach, not legacy `peaceiris/actions-gh-pages` or `gh-pages` npm
- Runs a `build` job (always) and a `deploy` job (main branch only, needs build)
- The `build` job sequence: checkout (fetch-depth 1) → setup Node 22 → `npm ci` → quiz YAML→JSON conversion → `npm run build` → configure-pages → upload artifact
- The `deploy` job: `actions/deploy-pages@v4` under the `github-pages` environment

## Task 1 — Human Checkpoint: GitHub Pages Enabled

**Action requested:** Enable GitHub Pages with source "GitHub Actions" at https://github.com/gjs-opsflo/calm-academy/settings/pages

**User confirmation received:** "approved — Pages enabled. GitHub Pages is now configured with source 'GitHub Actions' in the repo settings."

**Note:** This is a one-time blocking prerequisite. The native GitHub Actions Pages deployment requires the repository source to be set to "GitHub Actions" (not the legacy branch-based approach) before the workflow's `deploy-pages` action can request the OIDC token needed for deployment.

## Task 2 — Workflow File Creation and First Deploy

### Workflow structure (step-by-step)

**build job:**
1. `actions/checkout@v4` with `fetch-depth: 1` — shallow clone (full history not needed for static builds)
2. `actions/setup-node@v4` with `node-version: 22`, `cache: npm`, `cache-dependency-path: site/package-lock.json` — matches ci.yml pattern; caches node_modules scoped to site lockfile
3. `cd site && npm ci` — installs all site dependencies including `js-yaml` (devDependency required by prebuild script)
4. `node scripts/convert-quiz-yaml.mjs` — converts `quizzes/*.yaml` to `site/src/quizzes/*.json`; runs AFTER npm ci because js-yaml must be installed first
5. `cd site && npm run build` — Docusaurus production build outputs to `site/build/`
6. `actions/configure-pages@v4` (conditional: main only) — sets GitHub Pages baseUrl context; must precede upload step
7. `actions/upload-pages-artifact@v4` with `path: site/build` (conditional: main only) — packages build dir as Pages artifact

**deploy job:**
- `needs: build`, `if: github.ref == 'refs/heads/main'`
- environment `github-pages` with URL output from deployment step
- `actions/deploy-pages@v4` — exchanges OIDC token for deployment credentials, publishes artifact

### Critical ordering checks (all passed)

| Check | Result |
|-------|--------|
| YAML valid (`yq '.' site-deploy.yml`) | exit 0 |
| `npm ci` line (35) before `convert-quiz-yaml` line (38) | PASSED |
| `configure-pages` line (45) before `upload-pages-artifact` line (49) | PASSED |
| `fetch-depth: 1` (not 0) | PASSED |
| `node-version: 22` (not 20) | PASSED |
| `peaceiris` not present | PASSED (0 occurrences) |

### Commit and push

- Commit: `3813ca8` — `ci(site): add GitHub Actions deploy workflow for GitHub Pages`
- Pushed to `main` at 2026-06-17T11:20:26Z

### First deploy run

| Field | Value |
|-------|-------|
| Run ID | 27685240553 |
| Workflow | Deploy to GitHub Pages |
| Branch | main |
| Trigger | push |
| build job | completed in 1m6s |
| deploy job | completed in 11s |
| Conclusion | **success** |

All build steps passed in sequence:
- Set up job
- Checkout
- Setup Node.js
- Install site dependencies
- Convert quiz YAML to JSON
- Build site
- Configure GitHub Pages
- Upload artifact

Deploy step: "Deploy to GitHub Pages" — passed.

### Live URL HTTP status checks

| URL | HTTP Status |
|-----|-------------|
| `https://gjs-opsflo.github.io/calm-academy/` | **200** |
| `https://gjs-opsflo.github.io/calm-academy/docs/module-00-on-ramp/your-first-calm-document` | **200** |
| `https://gjs-opsflo.github.io/calm-academy/docs/module-03-calm-ecosystem/cicd-integration` | **200** |

Note: The acceptance criteria referenced `/docs/your-first-calm-document` and `/docs/cicd-integration` directly, but the Docusaurus site builds paths with the module folder prefix (`/docs/module-00-on-ramp/...` and `/docs/module-03-calm-ecosystem/...`). Both canonical paths return 200.

## Task 3 — Human Checkpoint: Live Site Verification

**User confirmation received:** "approved — live site verified end-to-end. User confirmed: mobile rendering, quiz interaction (select → submit → score badge), Module 3 quiz renders, search returns Module 2 results. All checks pass."

**Verification narrative:**
- Mobile: homepage loaded, "Start Learning" navigable, text and illustration rendering confirmed
- Desktop quiz: navigated to Module 0 final chapter, selected answer, clicked "Submit Quiz", score badge `You scored N / T` appeared correctly
- Module 3 quiz: `cicd-integration` page loaded with quiz component rendering
- Search: typed "node" in search bar, Module 2 results appeared in results

## Deviations from Plan

### Note: Node version

**Decision:** Node 22 used instead of CONTEXT.md D10 (which specified Node 20).

Node 20 reached end-of-life in April 2026. The `ci.yml` workflow already uses Node 22 as the canonical reference for this repository. Using a different Node version in the deploy workflow would introduce inconsistency. This is documented as a known deviation in the plan itself — the plan text explicitly calls this out in the Output spec: "Note: Node 22 used (D10 says Node 20 but Node 20 is EOL April 2026; ci.yml uses 22)."

No other deviations. Plan executed exactly as written.

## Acceptance Criteria Verification

```
yq '.' .github/workflows/site-deploy.yml       → exit 0 (valid YAML)
npm ci line (35) < convert-quiz-yaml line (38)  → PASSED
gh run conclusion                               → success
curl homepage                                  → 200
live site end-to-end                           → human verified
```

## Known Stubs

None. This plan creates only a CI/CD workflow file — no UI components, no data rendering, no stubs.

## Threat Flags

None. The workflow uses pinned action versions (`@v4`), OIDC (not long-lived tokens), and minimal permissions (`contents: read`, `pages: write`, `id-token: write`). No new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- [x] `.github/workflows/site-deploy.yml` exists
- [x] Commit `3813ca8` exists in git log
- [x] `gh run list` shows run 27685240553 with conclusion `success`
- [x] Live site returns HTTP 200
- [x] Human verification confirmed end-to-end
