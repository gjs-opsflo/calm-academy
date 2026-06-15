#!/usr/bin/env bash
# lint-quizzes.sh
# Schema validator for quiz YAML files under quizzes/.
# Checks: valid YAML, question ID format (qNN.N.N), single correct answer per multiple_choice,
# reference_section present on every question.
#
# Usage: bash scripts/lint-quizzes.sh
# Requires: python3 with yaml module (or yq as fallback for YAML syntax check)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

QUIZ_DIR="${REPO_ROOT}/quizzes"
PASS=0
FAIL=0

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

# Check for python3 with yaml module
PYTHON_CMD=""
if python3 -c "import yaml" 2>/dev/null; then
  PYTHON_CMD="python3"
else
  echo "ERROR: python3 with yaml module is required for schema validation."
  echo "Install with: pip3 install pyyaml"
  exit 1
fi

# Lint each quiz file
for FILE in "${QUIZ_FILES[@]}"; do
  echo "--- Linting: $FILE ---"

  # Run schema validation via Python
  $PYTHON_CMD - "$FILE" <<'PYEOF'
import sys
import re
import yaml

filepath = sys.argv[1]
errors = []
passes = []

# Load and parse YAML
try:
    with open(filepath, 'r') as f:
        data = yaml.safe_load(f)
    passes.append(f"YAML is valid and parseable")
except yaml.YAMLError as e:
    print(f"FAIL: {filepath} — invalid YAML: {e}")
    sys.exit(1)
except Exception as e:
    print(f"FAIL: {filepath} — cannot read file: {e}")
    sys.exit(1)

if not isinstance(data, dict):
    print(f"FAIL: {filepath} — top-level must be a YAML mapping")
    sys.exit(1)

# Check top-level required fields
for field in ['module', 'title', 'chapters']:
    if field not in data:
        errors.append(f"Missing top-level field: '{field}'")

chapters = data.get('chapters', [])
if not isinstance(chapters, list):
    errors.append("'chapters' must be a list")
    chapters = []

# Track all question IDs for duplicate detection
all_ids = {}

for chapter in chapters:
    if not isinstance(chapter, dict):
        errors.append(f"Chapter entry must be a mapping, got: {type(chapter)}")
        continue

    chapter_num = chapter.get('chapter', '?')
    questions = chapter.get('questions', [])

    if not isinstance(questions, list):
        errors.append(f"Chapter {chapter_num}: 'questions' must be a list")
        continue

    for q in questions:
        if not isinstance(q, dict):
            errors.append(f"Chapter {chapter_num}: question must be a mapping")
            continue

        q_id = q.get('id', '')
        q_type = q.get('type', '')

        # Check: id present and matches qNN.N.N format
        if not q_id:
            errors.append(f"Chapter {chapter_num}: question missing 'id' field")
        else:
            if not re.match(r'^q\d+\.\d+\.\d+$', q_id):
                errors.append(f"Question '{q_id}': id does not match pattern q[0-9]+.[0-9]+.[0-9]+ (e.g. q0.1.1)")
            else:
                passes.append(f"Question '{q_id}': id format OK")

        # Check for duplicate IDs
        if q_id:
            if q_id in all_ids:
                errors.append(f"Duplicate question id '{q_id}' (also at chapter {all_ids[q_id]})")
            else:
                all_ids[q_id] = chapter_num

        # Check: reference_section present and non-empty
        ref = q.get('reference_section', '')
        if not ref or not str(ref).strip():
            errors.append(f"Question '{q_id or '?'}': missing or empty 'reference_section'")
        else:
            passes.append(f"Question '{q_id}': reference_section present")

        # Check: multiple_choice has exactly one correct: true
        if q_type == 'multiple_choice':
            options = q.get('options', [])
            if not isinstance(options, list):
                errors.append(f"Question '{q_id}': 'options' must be a list")
            else:
                correct_count = sum(1 for opt in options if isinstance(opt, dict) and opt.get('correct') is True)
                if correct_count == 0:
                    errors.append(f"Question '{q_id}' (multiple_choice): no option has 'correct: true'")
                elif correct_count > 1:
                    errors.append(f"Question '{q_id}' (multiple_choice): {correct_count} options have 'correct: true' — must be exactly 1")
                else:
                    passes.append(f"Question '{q_id}' (multiple_choice): exactly 1 correct answer")

                # Check each option has explanation
                for i, opt in enumerate(options):
                    if isinstance(opt, dict) and not opt.get('explanation'):
                        errors.append(f"Question '{q_id}' option {i+1}: missing 'explanation'")

        # Check: code_completion has accepted_answers
        if q_type == 'code_completion':
            if 'accepted_answers' not in q or not q['accepted_answers']:
                errors.append(f"Question '{q_id}' (code_completion): missing or empty 'accepted_answers'")
            else:
                passes.append(f"Question '{q_id}' (code_completion): accepted_answers present")

# Print results
for p in passes:
    print(f"PASS: {p}")
for e in errors:
    print(f"FAIL: {e}")

if errors:
    sys.exit(1)
else:
    print(f"All {len(passes)} checks passed for this file.")
    sys.exit(0)
PYEOF

  LINT_EXIT=$?
  if [ "$LINT_EXIT" -eq 0 ]; then
    PASS=$((PASS + 1))
    echo "PASS: $FILE — all schema checks passed"
  else
    FAIL=$((FAIL + 1))
    echo "FAIL: $FILE — schema violations found above"
  fi

  echo ""
done

# Summary
echo "=== lint-quizzes.sh summary ==="
echo "  Files passed: ${PASS}"
echo "  Files failed: ${FAIL}"

if [ "$FAIL" -eq 0 ]; then
  echo "All quiz files passed schema validation."
  exit 0
else
  echo "Some quiz files failed schema validation. See above for details."
  exit 1
fi
