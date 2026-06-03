# Quizzes

YAML data files, one per module, rendered by custom MDX component on the docs site.

## Files

```
quizzes/
├── module-00-on-ramp.yaml
├── module-01-case-for-aac.yaml
├── module-02-fundamentals.yaml
├── module-03-ecosystem.yaml
├── module-04-governance.yaml
├── module-05-ai-native.yaml
└── module-06-enterprise.yaml
```

## Schema

Full spec: [`../docs-meta/QUIZ-FORMAT.md`](../docs-meta/QUIZ-FORMAT.md)

## Validation

`scripts/lint-quizzes.sh` runs on CI. Every question must have `id`, options (for MCQ), `correct` field, `explanation`, and `reference_section` linking to the text section that teaches the concept.
