#!/usr/bin/env bash
# Export a single .excalidraw source file to SVG.
# Usage: scripts/export-excalidraw.sh <name>
#   <name> = filename without extension, e.g. gemara-7-layers-overview
#
# Requires: @excalidraw/excalidraw or equivalent CLI.
# Placeholder implementation — user's existing agentic skill produces the SVG.
# This script exists to document the contract; replace with actual export
# command once the toolchain is wired.

set -euo pipefail

NAME="${1:-}"
if [[ -z "$NAME" ]]; then
  echo "Usage: $0 <name-without-extension>"
  echo "Example: $0 gemara-7-layers-overview"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/illustrations/source/${NAME}.excalidraw"
DEST="$ROOT/illustrations/exported/${NAME}.svg"

if [[ ! -f "$SRC" ]]; then
  echo "Source not found: $SRC"
  exit 1
fi

echo "Source: $SRC"
echo "Dest:   $DEST"
echo ""
echo "TODO: wire up actual Excalidraw → SVG export here."
echo "Until then, export manually from Excalidraw and save to $DEST"
