# Illustration Inventory

Stubs are replaced when user authors in Excalidraw and runs `bash scripts/export-excalidraw.sh <name>`. SVG placeholder files are valid until replaced. Phase gate requires non-placeholder SVGs (each >1KB).

## All Illustrations

| File | Topic | Module | Status | Author | Date |
|------|-------|--------|--------|--------|------|
| m00-three-paths | Three Paths to First CALM Doc | Module 0 (Ch 0.1, 0.2) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m00-calm-studio-mock | CALM Studio Canvas Mock | Module 0 (Ch 0.2) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m00-architecture-as-prompt | Architecture as the Prompt concept | Module 0 (Ch 0.3) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-architecture-drift-timeline | Architecture Drift Timeline | Module 1 (Ch 1.1) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-iac-analogy | IaC vs AaC Comparison | Module 1 (Ch 1.2, slide deck) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-finos-ecosystem-map | FINOS Ecosystem Map | Module 1 (Ch 1.5, slide deck) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-gemara-7-layers-overview | Gemara 7-Layer Model | Module 1 (Ch 1.4, slide deck) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-calm-as-layer-4 | CALM at Gemara Layer 4 | Module 1 (Ch 1.4) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-aac-stack | The AaC Stack | Module 1 (Ch 1.2, 1.3, slide deck) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-architecture-debt-compound | Architecture Debt Compound Curve | Module 1 (Ch 1.1) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m01-calm-ecosystem-flywheel | The Governance Flywheel | Module 1 (Ch 1.3) | stub — needs Excalidraw authoring | user | 2026-06-15 |

## Updating This File

When you complete an illustration in Excalidraw and export the SVG:
1. Change the `Status` column from `stub — needs Excalidraw authoring` to `authored`
2. Verify the exported SVG is >1KB (`wc -c < illustrations/exported/<name>.svg`)
3. Commit the updated `.excalidraw` source, the new `.svg` export, and this `INVENTORY.md` together
