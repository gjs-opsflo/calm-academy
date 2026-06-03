# Lab Format

Labs are the skill-verification artifacts. Text teaches; labs prove.

## Structure

```
labs/
└── lab-NN-<slug>/
    ├── LAB.md                  Lab instructions (Learnforge-compatible)
    ├── starter/                Starter repo (forkable)
    ├── solution/               Reference solution
    ├── docker-compose.yml      (optional) ephemeral environment
    ├── check.sh                Automated verification script
    └── README.md               Lab overview (rendered on docs site)
```

## LAB.md format (Learnforge-compatible)

YAML frontmatter + Markdown body. Structured for both human reading and machine parsing (Learnforge consumes the YAML directly).

```yaml
---
id: lab-04-calm-guard-sr-11-7
title: Run CALM Guard on a Credit Scoring Architecture
module: 4
chapter: 4.2
estimated_minutes: 25
difficulty: 2
prerequisites:
  - lab-02-first-architecture
  - lab-03-calm-guard-intro

requires_docker: true

workspace:
  cumulative: true                # build on previous lab's files
  base_dir: lab-04-calm-guard-sr-11-7
  creates:
    - architecture.calm.json
    - guard-report.json

objectives:
  - Run CALM Guard SR 11-7 skill on an incomplete architecture
  - Identify which SR 11-7 requirements are unmet
  - Add missing nodes to satisfy SR 11-7
  - Re-run Guard and achieve green compliance

steps:
  - id: step-1
    title: Inspect starter architecture
    check:
      kind: file_state
      path: architecture.calm.json
      exists: true
    hints:
      - "The starter has a basic credit scoring architecture missing 2 SR 11-7 nodes"

  - id: step-2
    title: Run initial Guard report
    check:
      kind: command_regex
      command: "calm guard run --skill sr-11-7"
      pattern: "(?i)compliance.*(failed|fail|gap)"
    hints:
      - "Run: calm guard run --skill sr-11-7"
      - "You should see failures — that's expected at this step"

  - id: step-3
    title: Add challenger-model node
    check:
      kind: command_regex
      command: "calm validate"
      pattern: "0 errors"
    hints:
      - "Use calmstudio-mcp's add_node tool, type ai:eval-monitor"
      - "Name the node `challenger-model`"

  - id: step-4
    title: Add model-committee-gate node
    check:
      kind: command_regex
      command: "calm validate"
      pattern: "0 errors"

  - id: step-5
    title: Re-run Guard, achieve green
    check:
      kind: command_regex
      command: "calm guard run --skill sr-11-7"
      pattern: "(?i)compliance.*pass"
    hints:
      - "All three SR 11-7 requirements should now have at least one node satisfying them"

resources:
  - title: SR 11-7 chapter
    url: ../../content/module-04-governance/sr-11-7.mdx
  - title: CALM Guard reference
    url: ../../content/module-04-governance/calm-guard.mdx
---

# Lab N: <title>

## Goal

One sentence on what you're building and why it matters.

## Setup

```bash
cd labs/lab-NN-<slug>
docker compose up -d
```

## Walkthrough

Numbered steps that match the YAML `steps:` IDs above. Each step in human-readable form. Show expected output.

## Stretch goals (optional)
- Optional extensions for fast finishers

## Solution

See `solution/` branch — try the lab without peeking first.
```

## Step check kinds (Learnforge-compatible)

| Kind | What it checks |
|---|---|
| `command_regex` | Runs a shell command, matches output against regex pattern |
| `exit_code` | Runs a shell command, asserts exit code value |
| `file_state` | Asserts file exists / doesn't exist / matches regex content |
| `ai_judge` | LLM-graded open-ended check (use sparingly — budget-guarded) |

## Authoring rules

- Every lab must be runnable end-to-end without external accounts or paid services (Docker is fine)
- `solution/` must be a working reference — copy-paste from solution should pass all checks
- Hints are tiered: gentle nudge → partial answer → full solution (3 hints max per step)
- No lab takes more than 45 minutes (split into multiple labs if larger)
- Cumulative workspace: lab 2 may see lab 1's files (matches Learnforge convention)
- Workspace cleanup: `creates: []` lists what the lab produces; only those files reset on lab restart

## Verification

`scripts/test-lab.sh lab-NN-<slug>` runs:
1. `docker compose up -d` (if present)
2. Applies the `solution/` branch
3. Runs every step's check
4. Asserts all pass
5. `docker compose down -v`

CI runs this for every changed lab on PR.

## Learnforge integration (Phase 11)

When ready, each lab will be wrapped as a Learnforge topic-pack module entry. The LAB.md YAML frontmatter is already Learnforge-format-aware. The `pack.json` at repo root (added in Phase 11) will reference each lab as a `modules[]` entry with appropriate `exercise_types`.
