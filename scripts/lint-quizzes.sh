#!/usr/bin/env bash
# lint-quizzes.sh
# Checks quiz YAML files under quizzes/ for existence and non-empty content.
# Full schema validation is added in Plan 01-03 once quiz YAML content exists.
#
# Usage: bash scripts/lint-quizzes.sh
# Requires: bash (no external dependencies for the stub)

set -euo pipefail

QUIZ_DIR="quizzes"
PASS_COUNT=0
FAIL_COUNT=0

# Check if quizzes directory exists
if [ ! -d "$QUIZ_DIR" ]; then
  echo "No quiz directory found at $QUIZ_DIR — skipping"
  exit 0
fi

# Find all .yaml files under quizzes/
QUIZ_FILES=()
while IFS= read -r -d '' FILE; do
  QUIZ_FILES+=("$FILE")
done < <(find "$QUIZ_DIR" -name "*.yaml" -print0 2>/dev/null)

if [ ${#QUIZ_FILES[@]} -eq 0 ]; then
  echo "No quiz files found under $QUIZ_DIR — skipping"
  exit 0
fi

# Check each file is non-empty and readable YAML (basic check: has content)
for FILE in "${QUIZ_FILES[@]}"; do
  if [ ! -s "$FILE" ]; then
    echo "FAIL: $FILE is empty"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  else
    echo "PASS: $FILE"
    PASS_COUNT=$((PASS_COUNT + 1))
  fi
done

echo ""
echo "Quiz lint summary: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  echo "Some quiz files failed basic checks. Full schema validation added in Plan 01-03."
  exit 1
fi

exit 0
