---
id: lab-03-cicd-gate
title: Build a CALM Architecture Gate in GitHub Actions
module: 3
chapter: 3.7
estimated_minutes: 35
difficulty: 2
prerequisites:
  - lab-02-conference-signup

requires_docker: false

workspace:
  cumulative: false
  base_dir: lab-03-cicd-gate
  creates:
    - starter/.github/workflows/calm-gate.yml
    - starter/architectures/secure-api.calm.json

objectives:
  - Fork the starter repo and clone it locally
  - Verify that the valid architecture (secure-api.calm.json) passes calm validate
  - Complete the stub GitHub Actions workflow to add calm validate
  - Push the completed workflow and observe the CI gate pass
  - Fix the broken architecture (broken-api.calm.json) and push again

steps:
  - id: step-1
    title: Fork and clone the starter
    check:
      kind: file_state
      path: .github/workflows/calm-gate.yml
      exists: true
    hints:
      - "Clone the lab starter: cd labs/lab-03-cicd-gate/starter"
      - "The starter/ directory contains the pre-built repo scaffold"
      - "In a real lab, you would fork this as a GitHub template repo"

  - id: step-2
    title: Verify the valid architecture passes calm validate
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a architectures/secure-api.calm.json -f pretty"
      pattern: "0 errors"
    hints:
      - "Run: npx @finos/calm-cli validate -a architectures/secure-api.calm.json -f pretty"
      - "You should see 0 errors — secure-api.calm.json is intentionally valid"
      - "Note: broken-api.calm.json will show errors — that is expected at this step"

  - id: step-3
    title: Add calm validate step to the GitHub Actions workflow stub
    check:
      kind: file_state
      path: .github/workflows/calm-gate.yml
      content_regex: "calm validate"
    hints:
      - "Open .github/workflows/calm-gate.yml — it has a stub with a TODO comment"
      - "Replace the TODO with the calm validate step from Chapter 3.7"
      - "Minimum: calm validate -a architectures/secure-api.calm.json -f pretty"
      - "Full solution: add the pattern validate step and JUnit output step too"

  - id: step-4
    title: Push the workflow and observe the gate pass for the valid architecture
    check:
      kind: ai_judge
      prompt: "The learner has pushed their completed calm-gate.yml to a GitHub repository. Their GitHub Actions run (or local 'act' run) shows all steps green for the valid secure-api.calm.json architecture. Evidence: screenshot, CI log, or 'act' output showing 'Job validate-architecture succeeded'."
    hints:
      - "Push to your forked GitHub repo: git push origin main"
      - "If you don't want to push to GitHub, use 'act' locally: brew install act && act push"
      - "Navigate to Actions tab in your GitHub repo to see the workflow run"
      - "All steps should be green for the valid secure-api.calm.json"

  - id: step-5
    title: Fix broken-api.calm.json so it passes calm validate
    check:
      kind: command_regex
      command: "npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty"
      pattern: "0 errors"
    hints:
      - "First, inspect what is wrong: npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty"
      - "The error will tell you which required field is missing"
      - "Add the missing field to the broken-api.calm.json file"
      - "Re-run validate until you see 0 errors"

resources:
  - title: "Chapter 3.7: CI/CD Integration"
    url: "../../content/module-03-calm-ecosystem/cicd-integration.mdx"
  - title: "CALM CLI reference"
    url: "../../content/module-03-calm-ecosystem/cli-toolbox.mdx"
  - title: "GitHub Actions documentation"
    url: "https://docs.github.com/en/actions"
---

# Lab 3: Build a CALM Architecture Gate in GitHub Actions

## Goal

Set up a complete CALM architecture validation gate in GitHub Actions. By the end of this lab, any PR to your repository will automatically validate the CALM architecture — passing architecture gets merged, failing architecture gets blocked.

## Setup

No Docker required. You need: a GitHub account (free), Node.js 22+, and the CALM CLI (installed automatically in the GitHub Actions step).

For a fully local workflow without GitHub, install `act`:

```bash
brew install act    # macOS
# or: https://github.com/nektos/act
act push            # runs the workflow locally
```

## Walkthrough

### Step 1: Set up the starter

The starter directory contains a pre-built repo scaffold. In a production setup, you would fork this as a GitHub template repository. For this lab, work directly in `labs/lab-03-cicd-gate/starter/`:

```bash
cd labs/lab-03-cicd-gate/starter
git init && git add . && git commit -m "initial commit"
```

If you have a GitHub account, create a new repo and push:

```bash
git remote add origin https://github.com/<your-username>/calm-lab-03
git push -u origin main
```

The check verifies that `.github/workflows/calm-gate.yml` exists — it does in the starter already. You just need to be in the right directory.

### Step 2: Verify the valid architecture

The starter contains two architecture files. The valid one should pass `calm validate`:

```bash
npx @finos/calm-cli validate -a architectures/secure-api.calm.json -f pretty
# Expected: 0 errors, 0 warnings
```

The broken one should fail:

```bash
npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty
# Expected: errors about missing required fields
```

This is intentional — `broken-api.calm.json` is missing a required `description` field on one node. You will fix this in Step 5.

### Step 3: Complete the workflow stub

Open `.github/workflows/calm-gate.yml`. You will see a stub with a `# TODO: add calm validate step here` comment. Replace it with the validation steps from Chapter 3.7. The minimum is:

```yaml
- name: Validate architecture against schema
  run: calm validate -a architectures/secure-api.calm.json -f pretty
```

The full solution (in `solution/`) adds pattern validation and JUnit output too.

After editing, the file must contain the string `calm validate` — the step-3 check verifies this with a content regex.

### Step 4: Push and observe the gate

Commit your workflow update and push:

```bash
git add .github/workflows/calm-gate.yml
git commit -m "feat: add CALM architecture gate"
git push origin main
```

In your GitHub repo, navigate to the **Actions** tab. You should see the "CALM Architecture Gate" workflow run. All steps should be green.

If using `act` locally: `act push` — watch the output for "Job validate-architecture succeeded."

### Step 5: Fix the broken architecture

The broken-api.calm.json file is intentionally missing a required field. Inspect what is wrong:

```bash
npx @finos/calm-cli validate -a architectures/broken-api.calm.json -f pretty
```

The validator will tell you exactly which field is missing and on which node. Add the missing `description` field to that node, re-validate, and push again. The gate should now pass for both architectures.

## Stretch goals

- Add `calm diff --exit-code` between the two architecture versions (v1 vs v2) to the workflow to gate on unexpected architecture changes
- Add a Hub publish step: install `calm hub push architecture` and push to a local Hub Docker instance (`cd calm-hub/deploy && docker-compose up`)
- Add the JUnit test report upload step and verify it appears in the Actions UI under the "Tests" tab

## Solution

See `solution/` for the complete working workflow. Try the lab without peeking first.
