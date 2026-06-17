#!/usr/bin/env node
// Run from repo root: node scripts/convert-quiz-yaml.mjs
// Converts all quizzes/*.yaml files to site/src/quizzes/*.json (build artifacts)
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Resolve js-yaml from site/node_modules since js-yaml is a site dependency
const require = createRequire(pathToFileURL(join(repoRoot, 'site', 'package.json')));
const { load } = require('js-yaml');

const quizDir = join(repoRoot, 'quizzes');
const outputDir = join(repoRoot, 'site', 'src', 'quizzes');

mkdirSync(outputDir, { recursive: true });

let count = 0;
for (const file of readdirSync(quizDir).sort()) {
  if (!file.endsWith('.yaml')) continue;
  const inputPath = join(quizDir, file);
  const outputFile = file.replace('.yaml', '.json');
  const outputPath = join(outputDir, outputFile);
  const data = load(readFileSync(inputPath, 'utf8'));
  writeFileSync(outputPath, JSON.stringify(data, null, 2) + '\n');
  console.log(`  ${file} -> site/src/quizzes/${outputFile}`);
  count++;
}
console.log(`\nQuiz YAML -> JSON conversion complete: ${count} file(s) written.`);
