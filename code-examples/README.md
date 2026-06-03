# Code Examples

Real, validated CALM JSON artifacts referenced from text lessons.

## Rule

**Every `.calm.json` file here MUST validate with `calm validate`.**

CI enforces this on every PR.

## Structure

```
code-examples/
├── module-02/
│   ├── conference-signup.calm.json
│   └── ...
├── module-04/
│   └── ...
├── module-05/
│   ├── multi-agent-arb.calm.json
│   ├── wealth-management.calm.json
│   └── credit-scoring.calm.json
└── ...
```

## Authoring

Use **calmstudio-mcp** to author and validate. See `~/.claude/skills/calm-arb-convert/SKILL.md` for the canonical workflow.

Never hand-write CALM JSON. Always use the MCP tools — they enforce spec correctness.
