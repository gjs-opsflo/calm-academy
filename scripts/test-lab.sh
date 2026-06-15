#!/usr/bin/env bash
# test-lab.sh
# LAB-01 end-to-end verification script for lab-00-on-ramp.
# Validates the solution CALM file, checks LAB.md exists, and checks requires_docker: false.
#
# Usage: bash scripts/test-lab.sh
# Requires: npx with @finos/calm-cli available

set -euo pipefail

PASS=0
FAIL=0
LAB_DIR="labs/lab-00-on-ramp"
SOLUTION_DIR="${LAB_DIR}/solution"
LAB_FILE="${LAB_DIR}/LAB.md"

# ---- Check 1: Solution CALM files validate ----
SOLUTION_FILES=()
while IFS= read -r -d '' FILE; do
  SOLUTION_FILES+=("$FILE")
done < <(find "$SOLUTION_DIR" -name "*.architecture.json" -print0 2>/dev/null)

if [ ${#SOLUTION_FILES[@]} -eq 0 ]; then
  echo "FAIL: No *.architecture.json files found in ${SOLUTION_DIR}"
  FAIL=$((FAIL + 1))
else
  for FILE in "${SOLUTION_FILES[@]}"; do
    echo "Validating: $FILE"
    if npx @finos/calm-cli validate -a "$FILE" > /tmp/calm-validate-output.txt 2>&1; then
      echo "PASS: ${FILE} — validates with calm CLI (exit 0)"
      PASS=$((PASS + 1))
    else
      echo "FAIL: ${FILE} — calm validate returned non-zero exit code"
      cat /tmp/calm-validate-output.txt
      FAIL=$((FAIL + 1))
    fi
  done
fi

# ---- Check 2: LAB.md exists ----
if [ -f "$LAB_FILE" ]; then
  echo "PASS: ${LAB_FILE} exists"
  PASS=$((PASS + 1))
else
  echo "FAIL: ${LAB_FILE} not found"
  FAIL=$((FAIL + 1))
fi

# ---- Check 3: LAB.md has requires_docker: false ----
if [ -f "$LAB_FILE" ]; then
  if grep -q "requires_docker: false" "$LAB_FILE"; then
    echo "PASS: ${LAB_FILE} contains 'requires_docker: false'"
    PASS=$((PASS + 1))
  else
    echo "FAIL: ${LAB_FILE} does not contain 'requires_docker: false'"
    FAIL=$((FAIL + 1))
  fi
fi

# ---- Summary ----
echo ""
echo "=== test-lab.sh summary ==="
echo "  Passed: ${PASS}"
echo "  Failed: ${FAIL}"

if [ "$FAIL" -eq 0 ]; then
  echo "All checks passed."
  exit 0
else
  echo "Some checks failed. See above for details."
  exit 1
fi
