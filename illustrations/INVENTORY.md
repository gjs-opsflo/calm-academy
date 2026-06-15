# Illustration Inventory

Stubs are replaced when user authors in Excalidraw and runs `bash scripts/export-excalidraw.sh <name>`. SVG placeholder files are valid until replaced. Phase gate requires non-placeholder SVGs (each >1KB).

## All Illustrations

| File | Topic | Module | Status | Author | Date |
|------|-------|--------|--------|--------|------|
| m00-three-paths | Three Paths to First CALM Doc | Module 0 (Ch 0.1, 0.2) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m00-calm-studio-mock | CALM Studio Canvas Mock | Module 0 (Ch 0.2) | stub — needs Excalidraw authoring | user | 2026-06-15 |
| m00-architecture-as-prompt | Architecture as the Prompt concept | Module 0 (Ch 0.3) | stub — needs Excalidraw authoring | user | 2026-06-15 |

## Updating This File

When you complete an illustration in Excalidraw and export the SVG:
1. Change the `Status` column from `stub — needs Excalidraw authoring` to `authored`
2. Verify the exported SVG is >1KB (`wc -c < illustrations/exported/<name>.svg`)
3. Commit the updated `.excalidraw` source, the new `.svg` export, and this `INVENTORY.md` together
