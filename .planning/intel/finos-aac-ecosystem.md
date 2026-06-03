# FINOS architecture-as-code Repository — Intel

Snapshot of the FINOS monorepo at `/Users/gshah/work/opsflow-sh/calm/architecture-as-code` as relevant to course content production.

## Repo location
`/Users/gshah/work/opsflow-sh/calm/architecture-as-code`

## Spec sources

| Path | Purpose |
|---|---|
| `calm/release/1.2/meta/core.json` | Core schema (nodes, relationships) — CALM 1.2 stable |
| `calm/release/1.2/meta/control.json` | Control schema |
| `calm/release/1.2/meta/decorators.json` | Decorator schema (threat-model, etc.) |
| `calm/release/1.2/meta/interface.json` | Interface schema |
| `calm/release/1.2/meta/flow.json` | Flow schema |
| `calm/release/1.2/meta/timeline.json` | Timeline schema |
| `calm/release/1.2/meta/adr-types.json` | ADR types |
| `calm/release/1.2/meta/units.json` | Measurement units |
| `calm/release/1.2/meta/evidence.json` | Evidence schema |
| `calm/draft/` | In-progress spec changes (1.3 work) |

## Reference architectures + examples

| Path | What it is |
|---|---|
| `calm/architecture/calm-1.json` | Reference architecture (core features demo) |
| `calm/architecture/calm-2.json` | Complex multi-node example |
| `calm/architecture/calm.timeline.json` | Timeline example |
| `calm/getting-started/conference-signup.pattern.json` | Tutorial pattern (used in M2) |
| `conferences/osff-ln-2025/workshop/conference-signup.pattern.json` | OSFF workshop pattern |
| `conferences/osff-ln-2025/workshop/conference-secure-signup.pattern.json` | OSFF workshop secure variant |

## Tools to use during content production

| Path | Use |
|---|---|
| `cli/` | `@finos/calm-cli` — validate, generate, diff, docify, init-ai |
| `calm-suite/calm-studio/packages/mcp-server/dist/index.js` | calmstudio-mcp (already installed via Claude Code) |
| `calm-suite/calm-studio/apps/studio` | Visual editor (SvelteKit) |
| `calm-hub/` | REST API + MCP endpoint (Java/Quarkus) |
| `calm-server/` | Standalone validation HTTP server |
| `calm-ai/tools/*.md` | 14 tool prompts (architecture-creation, node-creation, etc.) |
| `calm-ai/ai-assistants/*.json` | Provider configs (Copilot, Kiro, Claude, Codex) |

## CALM 1.2 node types — canonical list

**9 core:**
- `actor`, `system`, `service`, `database`, `network`, `webclient`, `ecosystem`, `ldap`, `data-asset`

**15 `ai:*` (for AI/agentic systems):**
- `ai:api-gateway`, `ai:guardrail`, `ai:orchestrator`, `ai:agent`
- `ai:vector-store`, `ai:knowledge-base`, `ai:rag-pipeline`
- `ai:llm`, `ai:embedding-model`, `ai:memory`
- `ai:tool`, `ai:mcp-server`
- `ai:eval-monitor`, `ai:observability`, `ai:human-in-the-loop`

**Critical reminder:** `container` and `component` DO NOT EXIST. Common AI hallucination — enforce in lessons.

## CALM 1.2 relationship types

- `connects` — point-to-point communication (carries `protocol`)
- `interacts` — actor or agent interaction
- `deployed-in` — runtime deployment (inside ecosystem)
- `composed-of` — structural containment
- `options` — decision point with alternatives

## Protocols supported
HTTP, HTTPS, FTP, SFTP, JDBC, WebSocket, SocketIO, LDAP, AMQP, TLS, mTLS, TCP

## Advent of CALM (24-day tutorial)

`advent-of-calm/` contains 24 daily tutorials covering progression from basics to advanced (multi-pattern validation, AI-assisted design, team challenges). Reference material for chapter sequencing and difficulty calibration.

Day-by-day topics: install → first node → relationships → VSCode → interfaces → metadata → microservices → controls → flows → ADR → docs → widgets → templates → AI advisor → ops advisor → docify → patterns → standards → enforcing → multi-pattern → arch role → dev role → security role → graduation.

## Docs site (calm.finos.org)

`docs/` contains the Docusaurus site. Sections:
- Introduction (what is, why use, key features)
- Core concepts (nodes, relationships, interfaces, controls, decorators, metadata, patterns, standards, timelines, widgets)
- Working with CALM (cli, vscode-extension, calm-hub, calm-ai-tools, validation-server, voice-mode)
- Tutorials (beginner, intermediate, advanced)
- CALM Studio docs

CALM Academy site (Docusaurus too) will eventually be merged/cross-linked.

## Working configurations on this machine

- **calmstudio-mcp** installed at user scope in Claude Code (`claude mcp list` confirms)
- **calmstudio-mcp** installed in Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`)
- **`calm-arb-convert` skill** at `~/.claude/skills/calm-arb-convert/SKILL.md` (enforces ARB → CALM workflow)

When producing course CALM JSON examples, USE these tools — don't hand-write JSON.

## Recent work in this repo (relevant context)

- Branch `docs/calm-arb-mcp-fixes` — current work in calm-suite/calm-studio adding ARB documentation
- PR #2533 — CalmHub MCP default off
- PR #2472 — extended hub commands with patterns, standards, domains, controls, decorators, auth plugin
- The multi-agent reference architecture conversion to CALM (sandbox/course-design captures the work, now migrated here)

## When you need spec answers

1. First: `~/.claude/skills/calm-arb-convert/SKILL.md` (workflow + mapping table)
2. Then: calmstudio-mcp `read_calm_guide` tool with topic
3. Then: `calm/release/1.2/meta/*.json` for authoritative schema
4. Then: `docs/core-concepts/*.md` for prose explanation
5. Last resort: `calm-ai/tools/*.md` for tool-specific prompts
