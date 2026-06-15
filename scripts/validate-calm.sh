#!/usr/bin/env bash
# validate-calm.sh
# Finds all CALM architecture JSON files under code-examples/ and validates them
# with the official FINOS CALM CLI. Exits 1 if any file fails validation.
#
# Usage: bash scripts/validate-calm.sh
# Requires: Node.js + npm/npx (npx @finos/calm-cli)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

PASS_COUNT=0
FAIL_COUNT=0
FAIL_FILES=()

# Find all .architecture.json files under code-examples/
while IFS= read -r -d '' FILE; do
  echo "Validating: $FILE"
  # Capture output and exit code
  if OUTPUT=$(npx @finos/calm-cli validate -a "$FILE" 2>&1); then
    echo "  PASS: $FILE"
    PASS_COUNT=$((PASS_COUNT + 1))
  else
    echo "  FAIL: $FILE"
    echo "  Output: $OUTPUT"
    FAIL_FILES+=("$FILE")
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done < <(find "${REPO_ROOT}/code-examples" -name "*.architecture.json" -print0 2>/dev/null)

echo ""
echo "Validation summary: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ ${#FAIL_FILES[@]} -gt 0 ]; then
  echo "Failed files:"
  for F in "${FAIL_FILES[@]}"; do
    echo "  - $F"
  done
  exit 1
fi

if [ "$PASS_COUNT" -eq 0 ]; then
  echo "No .architecture.json files found under ${REPO_ROOT}/code-examples/ — nothing to validate"
fi

exit 0
