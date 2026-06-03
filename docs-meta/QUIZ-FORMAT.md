# Quiz Format

YAML data file per module, rendered by a custom MDX component on the docs site.

## File layout

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

One quiz file per module. Each file contains all chapter-level quizzes for that module, grouped by chapter.

## Schema

```yaml
module: 4
title: "Module 4: Governance & Compliance"

chapters:
  - chapter: 4.2
    slug: gemara-and-compliance-frameworks
    title: "Compliance Frameworks in CALM"
    questions:

      - id: q4.2.1
        type: multiple_choice
        prompt: |
          Which Gemara layer does a CALM architecture document map to?
        options:
          - label: "Layer 2 (Threats & Controls)"
            correct: false
            explanation: "Layer 2 is for technology-specific Threats and Controls (e.g. FINOS CCC). The CALM architecture is the sensitive activity those controls protect."
          - label: "Layer 4 (Sensitive Activities)"
            correct: true
            explanation: "Correct. Layer 4 is Gemara's pivot point — the actual system that introduces risk. CALM is the machine-optimized representation of this layer."
          - label: "Layer 5 (Intent & Behavioral Evaluation)"
            correct: false
            explanation: "Layer 5 is for evaluation tools like SAST/SCA that inspect the activity. CALM is the activity itself, not the inspection."
          - label: "Layer 7 (Audit & Continuous Monitoring)"
            correct: false
            explanation: "Layer 7 is for audit and continuous monitoring (e.g. CCM). CALM Guard's continuous mode operates at L7; CALM the architecture is the L4 input it monitors."
        reference_section: "../content/module-04-governance/gemara-layers.mdx#layer-4"

      - id: q4.2.2
        type: short_answer
        prompt: |
          Name the FINOS control catalog that Gemara explicitly cites
          as a canonical Layer 2 asset.
        accepted_answers:
          - "FINOS CCC"
          - "FINOS Common Controls Catalog"
          - "Common Controls Catalog"
        case_sensitive: false
        explanation: "FINOS CCC (Common Controls Catalog) is cited by the Gemara whitepaper as a canonical Layer 2 (Threats & Controls) asset."
        reference_section: "../content/module-04-governance/finos-ccc.mdx"

  - chapter: 4.3
    slug: threat-modeling-as-code
    title: "Threat Modeling as Code"
    questions:
      - id: q4.3.1
        type: multiple_choice
        # ... etc
```

## Question types

### `multiple_choice`
- 3–5 options
- Exactly one option has `correct: true` (unless `multiple_correct: true` is set)
- Every option has an `explanation` shown after submission
- `reference_section` links back to the specific text section

### `multiple_correct` (multi-select)
- Like multiple_choice but multiple options may be `correct: true`
- Scoring: all-or-nothing OR partial credit (set `partial_credit: true`)

### `short_answer`
- `accepted_answers:` array of strings
- `case_sensitive: false` by default
- Optional `regex_match: true` to treat answers as regex
- Optional `accepted_patterns:` for regex patterns alongside plain answers

### `code_completion`
- Show CALM JSON snippet with `<BLANK>` marker
- `accepted_answers:` lists valid completions
- Used for "what node type would you use here?"

```yaml
- id: q2.2.5
  type: code_completion
  prompt: |
    Complete the missing `node-type` field. The node represents a vector
    database used by a RAG pipeline.
  snippet: |
    {
      "unique-id": "knowledge-vectors",
      "name": "Knowledge Vector Store",
      "node-type": "<BLANK>",
      "description": "Semantic store for retrieval"
    }
  accepted_answers:
    - "ai:vector-store"
  explanation: "ai:vector-store is the dedicated type for semantic/vector databases in AI architectures."
  reference_section: "../content/module-05-ai-native/ai-node-types.mdx#ai-vector-store"
```

## Authoring rules

- 4–6 questions per chapter
- Mix question types (not all multiple choice)
- Every wrong answer has a correction explanation (turns mistakes into learning)
- Every question links to the specific text section that teaches the concept
- No trick questions — test understanding, not vocabulary trivia
- Real-world framing where possible ("you're modeling X — which type?")

## MDX rendering

Custom `<Quiz />` component (built in Phase 2) reads the YAML file and renders:
- Question prompt
- Options/input
- Submit button
- Per-option/per-answer feedback on submit
- Score tally
- "Review the relevant section" link

## Validation

`scripts/lint-quizzes.sh` runs on CI:
- Every question has `id` matching `qNN.N.N` format
- Every `multiple_choice` has exactly one (or, with flag, multiple) `correct: true`
- Every option has `explanation`
- Every question has `reference_section` pointing to a real file
- No duplicate IDs within a module
