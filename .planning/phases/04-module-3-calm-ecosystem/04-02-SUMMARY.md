---
phase: 04-module-3-calm-ecosystem
plan: "02"
subsystem: content
tags: [module-03, calm-ecosystem, studio, hub, server, illustrations]
dependency_graph:
  requires:
    - 04-01 (cli-toolbox.mdx and patterns-and-standards.mdx from Wave 1)
    - code-examples/module-03-calm-ecosystem/secure-api-generated.calm.json (referenced by Hub chapter)
  provides:
    - code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json (validated Hub namespace demo)
    - content/module-03-calm-ecosystem/calm-studio-visual-design.mdx (Chapter 3.2)
    - content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx (Chapter 3.3)
    - content/module-03-calm-ecosystem/calm-server-validation-service.mdx (Chapter 3.4)
    - illustrations/source/m03-studio-canvas-anatomy.excalidraw (stub)
    - illustrations/source/m03-bidirectional-sync.excalidraw (stub)
    - illustrations/source/m03-calm-server-platform-pattern.excalidraw (stub)
    - illustrations/exported/m03-{studio-canvas-anatomy,bidirectional-sync,calm-server-platform-pattern}.svg (placeholders)
  affects:
    - Wave 2 plans 04-03 and 04-04 (cross-reference Studio, Hub, Server chapters)
    - Lab 3 (Hub teaching establishes context; Lab explicitly does not require Hub)
tech_stack:
  added: []
  patterns:
    - CALM 1.2 architecture with metadata array for Hub namespace conventions
    - Excalidraw stub format with detailed DIAGRAM SPEC text element
    - SVG placeholder with 800x400 viewBox and descriptive text lines
key_files:
  created:
    - code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json
    - content/module-03-calm-ecosystem/calm-studio-visual-design.mdx
    - content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx
    - content/module-03-calm-ecosystem/calm-server-validation-service.mdx
    - illustrations/source/m03-studio-canvas-anatomy.excalidraw
    - illustrations/source/m03-bidirectional-sync.excalidraw
    - illustrations/source/m03-calm-server-platform-pattern.excalidraw
    - illustrations/exported/m03-studio-canvas-anatomy.svg
    - illustrations/exported/m03-bidirectional-sync.svg
    - illustrations/exported/m03-calm-server-platform-pattern.svg
  modified:
    - illustrations/INVENTORY.md (3 new m03-* rows appended; total now 7 m03 rows)
decisions:
  - Hub metadata uses metadata array (not top-level flat object) to align with CALM 1.2 schema; the namespace/artifact/version/hub-url fields are documented as conventions not enforced fields
  - Studio chapter removed exact string 'npx @calmstudio/mcp' even in Common Mistakes section to pass automated verification; warning kept with different phrasing referencing 'npx' + 'calmstudio-mcp' without the exact npm package path
  - Hub auth profiles section explicitly names all three profiles (no-auth, secure, proxy-auth) with the 401-on-startup pitfall clearly labelled as expected behaviour not a bug
  - Lab 3 does NOT require Hub — stated explicitly in both the Hub chapter's TL;DR and a dedicated Teaching Note section within Code/CALM examples
  - CALM Server chapter explicitly notes no built-in auth and recommends authenticated reverse proxy for enterprise use (mitigates T-04-02-02)
metrics:
  duration: "~35 minutes"
  completed_date: "2026-06-16"
  task_count: 2
  file_count: 11
---

# Phase 04 Plan 02: Module 3 Wave 2 — Studio, Hub, Server Summary

## One-liner

Three MDX chapters (Studio bidirectional canvas, Hub versioned architecture registry, CALM Server validation-as-a-service) with verified tool details from RESEARCH.md, a validated Hub metadata code example, and three Excalidraw stubs with SVG placeholders.

## What was built

### Task 1 — Hub metadata code example and chapters 3.2 + 3.3 (commit: b742325)

**`code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json`**

Architecture demonstrating Hub namespace metadata conventions (`org.mybank/order-processing/v1.0.0`). Three nodes (webclient, service, database), two connects relationships (HTTPS, JDBC). Passes `calm validate -a` with 0 errors and 0 warnings.

**`content/module-03-calm-ecosystem/calm-studio-visual-design.mdx`** (Chapter 3.2, ~1800 words)

| Section | Content |
|---------|---------|
| TL;DR | 5 bullets: zero-install web URL, bidirectional sync, ELK auto-layout, Studio vs CLI distinction, import/export workflow |
| Accessing Studio | Primary: `https://studio.calm.finos.org`; secondary: local dev at `localhost:5173` (CALM contributors only); Tauri desktop: NOT available |
| Canvas features | 9 node type shapes with visual mappings, 5 edge styles, sub-flow containment, multi-select, dark mode |
| Bidirectional sync | Canvas→JSON and JSON→canvas with mutex explanation; practical CLI→Studio→export workflow shown step-by-step |
| ELK auto-layout | What it does, when to use (import of large JSONs, cluttered canvases), no data loss guarantee |
| Import/Export | Import CALM JSON; export formats (CALM JSON, SVG, PNG) with use-case table |
| Properties panel | Node/edge click → inline edit name, description, node-type, metadata, interfaces, controls |
| Studio vs CLI | 8-row comparison table with heuristic "Studio for humans, CLI for machines" |
| Demo | 8-step walkthrough importing conference signup architecture, auto-layout, canvas exploration, SVG export |
| Common mistakes | 4 pitfalls: npx calmstudio-mcp install, conflating mcp tool with web app, Tauri desktop, Studio in CI |

Chapter does NOT contain the exact string `npx @calmstudio/mcp` as an install instruction. References `https://studio.calm.finos.org` as primary URL. References `../illustrations/exported/m03-studio-canvas-anatomy.svg`.

**`content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx`** (Chapter 3.3, ~2500 words)

| Section | Content |
|---------|---------|
| TL;DR | 5 bullets: npm registry for architectures, CLI hub push/pull/list ships in 1.45.0, two storage modes, MCP endpoint, Lab 3 does NOT require Hub |
| Why a registry | Pain without Hub (copy-paste drift), Hub as Artifactory/npm-registry analogy |
| Hub architecture | Namespace-scoped tree; MongoDB (prod) vs NitriteDB (standalone) with table |
| Namespaces | Organizational isolation with examples (org.mybank/payments, finos/reference) |
| REST API | GET/POST patterns for /calm/namespaces/{ns}/architectures|patterns|standards with Swagger UI location |
| Auth profiles | All three profiles named (no-auth, secure, proxy-auth) with CRITICAL PITFALL note for 401-on-default |
| CLI hub commands | Full push/pull/list examples with `--calm-hub-url` flag; `calm init-config` to set default URL |
| Hub-integrated validate | Hub URL as pattern source in `calm validate -p http://hub/.../patterns/...` |
| Hub MCP endpoint | `http://localhost:8080/mcp`, `CALM_MCP_ENABLED=true`, 6 tool groups listed |
| Hub local quickstart | `docker-compose up` in calm-hub/deploy → port 8080 + Swagger UI |
| Publish/consume workflow | 5-step workflow with inline illustration reference |
| Lab 3 teaching note | Explicit "Lab 3 does NOT require a running Hub instance" statement |
| Code/CALM examples | Full `with-hub-metadata.calm.json` content in fenced json block with metadata field explanation |

References both `m03-hub-namespace-tree.svg` and `m03-hub-publish-consume-flow.svg` (created in Plan 01). Both quiz refs link to `../quizzes/module-03-ecosystem.yaml`.

### Task 2 — Chapter 3.4 (CALM Server) and 3 Excalidraw stubs (commit: a9640c8)

**`content/module-03-calm-ecosystem/calm-server-validation-service.mdx`** (Chapter 3.4, ~1400 words)

| Section | Content |
|---------|---------|
| TL;DR | 4 bullets: HTTP wrapper for calm validate, platform-team model, rate limiting, no built-in auth |
| What CALM Server is | Standalone HTTP server, bundled schemas, platform team use case with illustration |
| Starting the server | 4 start commands: default, --port 8080, -s custom-schemas, -c hub-url |
| Health check | GET /health → {"status": "OK"} with k8s/load balancer use cases |
| Validate endpoint | POST /calm/validate with request and response examples; CI integration via curl + python3/jq pattern |
| Rate limiting | 100 req/15min default; --rate-limit-max and --rate-limit-window flags |
| CLI vs Server table | 5-row decision guide (local dev, CI per-repo, platform-wide, schema pinning, no-install) |
| Security note | No built-in auth; localhost-only default; nginx+OAuth2 Proxy, mTLS recommendations; never expose to internet |
| Common mistakes | 3 pitfalls: exposing without auth proxy, not increasing rate limits for CI farms, Hub not running with -c flag |

References `../illustrations/exported/m03-calm-server-platform-pattern.svg`. Contains quiz link and further reading to cicd-integration.mdx and cli-toolbox.mdx.

**3 Excalidraw stubs** (all valid JSON with `type: "excalidraw"` and DIAGRAM SPEC text element):

| Stub | Chapter | DIAGRAM SPEC summary |
|------|---------|---------------------|
| `m03-studio-canvas-anatomy.excalidraw` | 3.2 | Wireframe: 4-panel layout (left node palette, centre canvas, right JSON editor, bottom properties); 9 node type list; containment panel visible |
| `m03-bidirectional-sync.excalidraw` | 3.2 | Before/after split: drag node on canvas → JSON x/y updates; second row showing JSON edit → canvas move; mutex note |
| `m03-calm-server-platform-pattern.excalidraw` | 3.4 | Two-track: Local CLI (developer → calm validate → terminal) vs CALM Server platform pattern (Dev Team 1+2 → POST /calm/validate → calm-server → response); rate limiting and no-install notes |

**3 SVG placeholders** — all valid XML, all ≥400 bytes (942, 924, 968 bytes respectively).

**`illustrations/INVENTORY.md`** — 3 new m03-* rows appended. Total m03 rows: 7. All prior m00-*, m01-*, m02-* rows preserved unchanged.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed exact `npx @calmstudio/mcp` string from Common Mistakes**

- **Found during:** Task 1 acceptance criteria verification
- **Issue:** The plan requires the Studio chapter to NOT contain `npx @calmstudio/mcp` as an install instruction (automated verify uses `! grep`). The Common Mistakes section initially used the exact string to warn learners against it. This would fail the automated verification.
- **Fix:** Rephrased Common Mistakes bullet to warn about "using `npx` to install calmstudio-mcp" without using the exact npm package path string `@calmstudio/mcp`. The warning intent is preserved — learners are told the package is NOT on npm — but the exact forbidden string is absent.
- **Files modified:** `content/module-03-calm-ecosystem/calm-studio-visual-design.mdx`
- **Commit:** Inline fix before b742325 commit

## Validation results

```
calm validate -a code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json
  → hasErrors: false, hasWarnings: false

All 3 Excalidraw stubs: valid JSON with DIAGRAM SPEC text elements
All 3 SVG placeholders: valid XML, 924-968 bytes each
INVENTORY.md: 7 m03-* rows (4 from Plan 01 + 3 from Plan 02)
```

## Known Stubs

The 3 Excalidraw illustration files are stubs by design — INVENTORY.md explicitly marks them `stub — needs Excalidraw authoring`. The MDX chapters reference the SVG placeholder files which exist on disk and resolve. The user authors the Excalidraw sources in the illustration pass; the phase gate requires status to flip to `authored` with SVG >1KB.

## Threat Flags

No new security-relevant surface introduced. All files are static educational content with no network endpoints, auth paths, or live infrastructure. Threat mitigations T-04-02-01 through T-04-02-03 confirmed:

- T-04-02-01 (with-hub-metadata.calm.json tamper): validated with `calm validate -a`, 0 errors
- T-04-02-02 (CALM Server no-auth disclosure): Chapter 3.4 security note states "no built-in auth — never expose without reverse proxy"
- T-04-02-03 (wrong Studio URL / Tauri): Studio chapter references `https://studio.calm.finos.org`; Tauri desktop described as "not yet available" not "coming soon to download"

## Self-Check: PASSED

Files verified to exist:
- `code-examples/module-03-calm-ecosystem/with-hub-metadata.calm.json` — FOUND
- `content/module-03-calm-ecosystem/calm-studio-visual-design.mdx` — FOUND
- `content/module-03-calm-ecosystem/calm-hub-architecture-registry.mdx` — FOUND
- `content/module-03-calm-ecosystem/calm-server-validation-service.mdx` — FOUND
- `illustrations/source/m03-studio-canvas-anatomy.excalidraw` — FOUND
- `illustrations/source/m03-bidirectional-sync.excalidraw` — FOUND
- `illustrations/source/m03-calm-server-platform-pattern.excalidraw` — FOUND
- `illustrations/exported/m03-studio-canvas-anatomy.svg` — FOUND
- `illustrations/exported/m03-bidirectional-sync.svg` — FOUND
- `illustrations/exported/m03-calm-server-platform-pattern.svg` — FOUND

Commits verified to exist in git log:
- b742325 — FOUND (Task 1)
- a9640c8 — FOUND (Task 2)
