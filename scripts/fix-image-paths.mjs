// fix-image-paths.mjs
// Rewrites relative illustration paths to Docusaurus-canonical /img/<file>.svg absolute paths.
// Handles both depth variants:
//   ../../illustrations/exported/<file>.svg  (modules 00, 01)
//   ../illustrations/exported/<file>.svg     (modules 02, 03)
// Run: node scripts/fix-image-paths.mjs (from repo root)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

/**
 * Recursively find all .mdx files under a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function findMdxFiles(dir) {
  const results = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (extname(entry) === '.mdx') {
      results.push(fullPath);
    }
  }
  return results;
}

const contentDir = 'content';
// Regex: matches one-or-more ../ sequences followed by illustrations/exported/<filename>
// Captures just the filename (with extension) after the last /
const PATTERN = /(?:\.\.\/)+illustrations\/exported\/([^)"'\s]+)/g;

let totalFiles = 0;
let totalOccurrences = 0;

const mdxFiles = findMdxFiles(contentDir);

for (const filePath of mdxFiles) {
  const original = readFileSync(filePath, 'utf8');
  let occurrences = 0;
  const updated = original.replace(PATTERN, (match, filename) => {
    occurrences++;
    return `/img/${filename}`;
  });
  if (updated !== original) {
    writeFileSync(filePath, updated, 'utf8');
    totalFiles++;
    totalOccurrences += occurrences;
    console.log(`Fixed ${occurrences} path(s) in ${filePath}`);
  }
}

console.log(`\nFixed ${totalFiles} files, replaced ${totalOccurrences} occurrences.`);
