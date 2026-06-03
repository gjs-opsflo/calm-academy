# Illustration Standards

## Style

**Black and white only.** No color. No fills. House style enforced by user's existing Excalidraw agentic skill.

## Tool

Excalidraw. Authored by user (manual or via agentic skill). Source files committed alongside exports.

## File structure

```
illustrations/
├── source/                          .excalidraw files (editable source)
│   ├── gemara-7-layers-overview.excalidraw
│   ├── calm-9-core-node-types.excalidraw
│   └── ...
└── exported/                        .svg files (referenced from text)
    ├── gemara-7-layers-overview.svg
    ├── calm-9-core-node-types.svg
    └── ...
```

Filename rules:
- kebab-case, descriptive
- No spaces, no underscores, no caps
- Source `.excalidraw` matches exported `.svg` name exactly
- Prefix with topic when ambiguous (`module-04-` for Gemara-only diagrams that need scoping)

## Export workflow

`scripts/export-excalidraw.sh <name>` reads `illustrations/source/<name>.excalidraw` and writes `illustrations/exported/<name>.svg`. Run on commit (pre-commit hook) and validated by CI (warns if `.excalidraw` is newer than `.svg`).

User authors illustration interactively in Excalidraw. Save source to `illustrations/source/`. Script (or user agentic skill) handles export.

## Visual language

### CALM node shapes (consistent across all diagrams)
Match CALM Studio canvas exactly — when a learner sees a shape in a lesson diagram, it should be the same shape they see in Studio.

| CALM type | Shape suggestion |
|---|---|
| `actor` | Stick figure or person icon |
| `system` | Large rounded rectangle (container shape) |
| `service` | Hexagon |
| `database` | Cylinder |
| `network` | Cloud or pipe |
| `webclient` | Browser window |
| `ecosystem` | Dashed-border container |
| `ldap` | Tree/directory icon |
| `data-asset` | Document icon |
| `ai:*` types | Distinct icons per type — formalize per the Studio roadmap |

### Relationships
| Relationship | Line style |
|---|---|
| `connects` | Solid arrow |
| `interacts` | Solid arrow with different arrowhead (open) |
| `composed-of` | Diamond endpoint (containment) |
| `deployed-in` | Dashed line |
| `options` | Multiple branching arrows from decision point |

### Gemara layer colors
Even in B&W, use **shading/patterns** consistently to indicate Gemara layers (since color is unavailable):
- Lighter shading (thin lines) = Definition layers (L1–L3)
- Medium shading = Pivot point (L4)
- Heavier shading (thick borders/cross-hatching) = Measurement layers (L5–L7)

## Composition rules

- **One concept per diagram.** Don't try to show the whole architecture in one drawing.
- **Label everything.** No unlabeled arrows, no unnamed boxes.
- **Top-to-bottom or left-to-right flow.** Pick one per diagram. Don't mix.
- **Whitespace matters.** Crowded diagrams are unreadable.
- **Text size readable at 600px width** (mobile rendering).
- **Annotations welcome.** Small explanatory notes alongside the diagram are fine (Excalidraw arrows + text).

## Reuse

Illustrations live once, referenced everywhere:
- Inline in text lessons (`![alt](../illustrations/exported/diagram.svg)`)
- Embedded in slide decks (same source SVG)
- Used as B-roll in narrated videos (Variant B)

**Never recreate.** If a similar diagram exists, extend or fork the existing source file (`cp source/orig.excalidraw source/orig-variant.excalidraw`).

## Inventory

A living index at `illustrations/INVENTORY.md` (to be created in Phase 2) lists every illustration with:
- File name
- Topic
- Module(s) referencing it
- Author / date
- Status (draft / final)

Updated whenever illustrations are added or changed.

## Accessibility

- Every image referenced in text MUST have a meaningful `alt` attribute (not "diagram" or "image1")
- Alt text describes what the diagram shows, not just names it
- Example: `![Gemara 7-layer model showing definition layers 1–3 above the sensitive-activities pivot at layer 4, with measurement layers 5–7 below](../illustrations/exported/gemara-7-layers-overview.svg)`

## Don'ts

- ❌ Color (B&W only)
- ❌ Photographic backgrounds
- ❌ Animated GIFs (use SVG)
- ❌ Stock vector icons (Excalidraw native shapes only)
- ❌ Recreating diagrams that already exist — extend instead
