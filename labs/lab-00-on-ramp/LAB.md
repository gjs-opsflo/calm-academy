---
id: lab-00-on-ramp
title: "Your First CALM Document in 15 Minutes"
module: 0
chapter: 0.5
estimated_minutes: 15
difficulty: 1
prerequisites: []
requires_docker: false
workspace:
  cumulative: false
  base_dir: lab-00-on-ramp
  creates:
    - my-system.architecture.json
objectives:
  - Choose your preferred CALM interaction method (Claude Code MCP, Claude Desktop MCP, or CALM Studio web)
  - Describe a real system you know in 3 sentences
  - Generate a .calm.json using AI-assisted tooling or CALM Studio
  - Validate the architecture with calm validate
  - Visualize the result in CALM Studio
steps:
  - id: step-1
    title: "Choose and verify your CALM interaction method"
    check:
      kind: ai_judge
      prompt: "Ask the learner which CALM interaction method they are using. Valid options: (A) Claude Code with calmstudio-mcp already configured (run 'claude mcp list' and confirm calmstudio-mcp is listed), (B) Claude Desktop/Cursor/Windsurf with mcpServers block configured, (C) CALM Studio web at https://studio.calm.finos.org. A passing answer names one of these three options and confirms it is accessible. A failing answer: the learner says they have not set up any option yet, or they mention 'npx @calmstudio/mcp' as the install method (this package is not on npm)."
    hints:
      - "Option A (Claude Code): run 'claude mcp list' — look for calmstudio-mcp in the output. If missing, install from https://github.com/finos/architecture-as-code/releases"
      - "Option B (Claude Desktop/Cursor/Windsurf): check your AI client's MCP config file for a calmstudio-mcp entry using 'node /path/to/calmstudio-mcp.cjs'"
      - "Option C (zero-install): open https://studio.calm.finos.org in your browser — no install needed for Lab 0 visualization"
      - "Note: @calmstudio/mcp is NOT available via npx — it must be installed from the FINOS aac releases page"
  - id: step-2
    title: "Describe your system and generate a .calm.json"
    check:
      kind: file_state
      path: my-system.architecture.json
      exists: true
    hints:
      - "Open your AI client (Claude Code, Cursor, or Windsurf with calmstudio-mcp active)"
      - "Describe a real system you know — 3 sentences: what it does, what talks to what, where data lives"
      - "Ask: 'Using calmstudio-mcp, create a CALM 1.2 architecture for the system I just described'"
      - "Save the output to my-system.architecture.json in your working directory"
  - id: step-3
    title: "Validate the architecture"
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
      pattern: "No issues found"
    hints:
      - "Run: npx @finos/calm-cli validate -a my-system.architecture.json -f pretty"
      - "Look for hasErrors: false or 'No issues found' in the output"
      - "If you see errors: common cause is an invented node type (container, component) — ask the AI to replace it with a valid type (actor, service, database, webclient, etc.)"
      - "Valid types: actor, ecosystem, system, service, database, network, ldap, webclient, data-asset"
  - id: step-4
    title: "Visualize in CALM Studio"
    check:
      kind: ai_judge
      prompt: "The learner opened CALM Studio and imported their my-system.architecture.json. They can describe seeing nodes (boxes) connected by arrows (relationships). Ask them: 'What node types can you see in your diagram?' — a correct answer names at least one of: actor, webclient, service, database, network, ecosystem, ldap, data-asset."
    hints:
      - "Open https://studio.calm.finos.org [verify URL before publication] or the current CALM Studio web URL"
      - "Import your my-system.architecture.json file using the import button"
      - "You should see boxes (nodes) connected by arrows (relationships)"
      - "If the URL has changed, check https://github.com/finos/architecture-as-code for the current Studio link"
resources:
  - title: "Chapter 0.1 — Three Paths to Your First CALM Document"
    url: "../../content/module-00-on-ramp/three-paths-to-first-calm-doc.mdx"
  - title: "Chapter 0.4 — Get Set Up in 60 Seconds"
    url: "../../content/module-00-on-ramp/get-set-up-in-sixty-seconds.mdx"
  - title: "Chapter 0.3 — Why This Works (and When It Doesn't)"
    url: "../../content/module-00-on-ramp/why-this-works-and-when-it-doesnt.mdx"
---

# Lab 0: Your First CALM Document in 15 Minutes

## Goal

Produce a validated CALM architecture document describing a real system you know or work on — using AI tooling or CALM Studio, in under 15 minutes, with no prior CALM knowledge required.

## Setup

No Docker required. Prerequisites:
- Node.js with npx available (`node --version` should show v18+)
- One of three CALM interaction paths (see Step 1 below)

## Walkthrough

### Step 1: Choose and verify your CALM interaction method

Choose one of three paths:

**Path A — Claude Code with calmstudio-mcp:**
Check if already configured:
```bash
claude mcp list
```
If `calmstudio-mcp` appears, you are ready. If not, install from https://github.com/finos/architecture-as-code/releases and register with:
```bash
claude mcp add --scope user calmstudio-mcp -- node /path/to/calmstudio-mcp.cjs
```

**Path B — Claude Desktop/Cursor/Windsurf:**
Check your AI client's MCP config for a `calmstudio-mcp` entry using `node /path/to/calmstudio-mcp.cjs`. See Chapter 0.4 for the full mcpServers block.

**Path C — CALM Studio web (zero install, recommended for this lab):**
Open https://studio.calm.finos.org in your browser. No install required. CALM Studio web is sufficient for Steps 2 and 4 of this lab.

**Important:** `@calmstudio/mcp` is NOT available via `npx @calmstudio/mcp`. If you see that instruction elsewhere, it is outdated — the package is not on npm.

### Step 2: Describe your system and generate .calm.json

Think of a real system you know — your team's API, a side project, a product you use daily. Write 3 sentences:
1. What the system does for users
2. What components talk to each other
3. Where data is stored or processed

Open your AI client and send a message like:
> "Using calmstudio-mcp, create a CALM 1.2 architecture for my system: [your 3 sentences here]"

The AI will make a sequence of tool calls (read_calm_guide, create_architecture, add_node, add_relationship, finalize_architecture, export_calm). Watch the tool calls appear — you saw these explained in Chapter 0.2.

Save the output to `my-system.architecture.json`.

### Step 3: Validate the architecture

```bash
npx @finos/calm-cli validate -a my-system.architecture.json -f pretty
```

Expected output (success):
```
No issues found.
```

Or in JSON output format: `hasErrors: false` and `hasWarnings: false`.

If you see errors, the most common cause is an invented node type. Ask the AI:
> "The validate command returned errors. Fix the invalid node types — only use types from: actor, ecosystem, system, service, database, network, ldap, webclient, data-asset"

Run validate again after the AI fixes the file.

### Step 4: Visualize in CALM Studio

Open CALM Studio in your browser: https://studio.calm.finos.org [verify URL before publication]

1. Click Import (or drag-and-drop)
2. Select your `my-system.architecture.json` file
3. Your architecture should render as boxes (nodes) connected by arrows (relationships)

What you're seeing is the same information as your JSON — expressed visually. Try clicking on a node to see its properties.

## Stretch goals

- Add a `network` node (load balancer, CDN, or API gateway) to your architecture and validate again
- Describe a second system (different from the first) and generate a separate CALM file
- Open the solution file in `solution/my-system.architecture.json` and compare its structure with yours

## Solution

A reference solution is available at `solution/my-system.architecture.json`. Try the lab without looking — then compare.

The solution models a "Simple Blog" (reader → blog-web → blog-api → posts-db). Your architecture will be different and that is correct — CALM captures your system, not ours.
