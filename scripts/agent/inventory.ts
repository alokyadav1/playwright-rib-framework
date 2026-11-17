/**
 * Ground-truth inventory for agents: what already exists in the framework.
 * Prints keys and names only, never values (data files may contain encrypted secrets).
 *
 * Usage: tsx scripts/agent/inventory.ts [all|steps|pages|locators|network|labels|data|policies|pending]
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const section = process.argv[2] ?? 'all';
const PLACEHOLDER = '__REQUIRED__';

/**
 * Recursively finds files with the requested extension when the directory exists.
 * @param dir Directory to scan.
 * @param ext File extension to match.
 * @returns Matching file paths.
 */
function* walk(dir: string, ext: string): Generator<string> {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p, ext);
    else if (p.endsWith(ext)) yield p;
  }
}

/**
 * Flattens JSON leaves into paths while retaining values for placeholder checks.
 * @param node JSON value to traverse.
 * @param prefix Path accumulated from parent keys.
 * @returns Leaf paths paired with their values.
 */
function entries(node: unknown, prefix = ''): [string, unknown][] {
  if (node !== null && typeof node === 'object' && !Array.isArray(node)) {
    return Object.entries(node).flatMap(([k, v]) => entries(v, prefix ? `${prefix}.${k}` : k));
  }
  if (Array.isArray(node)) {
    return node.flatMap((value, index) => entries(value, prefix ? `${prefix}.${index}` : String(index)));
  }
  return [[prefix, node]];
}

/**
 * Prints an inventory section containing names and paths only.
 * @param title Section heading.
 * @param rows Inventory rows without data values.
 */
function print(title: string, rows: string[]): void {
  console.log(`\n## ${title} (${rows.length})`);
  for (const r of rows) console.log(`- ${r}`);
}

/** Lists step expressions found in test step files as a discovery aid. */
function steps(): void {
  const re = /\b(Given|When|Then)\(\s*(['"`])((?:\\.|(?!\2).)*)\2/g;
  const rows: string[] = [];
  for (const f of walk(join(root, 'tests', 'steps'), '.ts')) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(re)) rows.push(`${m[1]} ${m[3]}   [${relative(root, f)}]`);
  }
  print('Step definitions (use `npx bddgen export` as the authoritative list)', rows.sort());
}

/** Lists page, component, and verification methods using a best-effort source scan. */
function pages(): void {
  const rows: string[] = [];
  for (const dir of ['pages', 'components', 'verifications']) {
    for (const f of walk(join(root, 'src', dir), '.ts')) {
      const src = readFileSync(f, 'utf8');
      const methods = [...src.matchAll(/^ {2,4}(?:async\s+)?([a-zA-Z]\w*)\s*\([^)]*\)\s*(?::[^{]+)?\{/gm)]
        .map((m) => m[1])
        .filter((n) => n !== 'constructor');
      rows.push(`${relative(root, f)}: ${methods.join(', ') || '(no public methods found)'}`);
    }
  }
  print('Pages, components, verifications (best-effort method list)', rows);
}

/**
 * Lists JSON key paths without printing their values.
 * @param title Section heading.
 * @param dir Directory containing JSON files.
 * @param topLevelOnly Whether to list only root keys.
 */
function keys(title: string, dir: string, topLevelOnly = false): void {
  const rows: string[] = [];
  for (const f of walk(dir, '.json')) {
    const parsed: unknown = JSON.parse(readFileSync(f, 'utf8'));
    const ks = topLevelOnly ? Object.keys(parsed as object) : entries(parsed).map(([k]) => k);
    rows.push(`${relative(root, f)}: ${ks.join(', ')}`);
  }
  print(title, rows);
}

/** Lists unresolved placeholder paths across framework configuration and data. */
function pending(): void {
  const rows: string[] = [];
  for (const dir of ['data', 'labels', 'locators', 'config/banks']) {
    for (const f of walk(join(root, 'src', dir), '.json')) {
      for (const [k, v] of entries(JSON.parse(readFileSync(f, 'utf8')))) {
        if (v === PLACEHOLDER) rows.push(`${relative(root, f)}: ${k}`);
      }
    }
  }
  print(`Keys waiting for a value (${PLACEHOLDER})`, rows);
}

const all = section === 'all';
if (all || section === 'steps') steps();
if (all || section === 'pages') pages();
if (all || section === 'locators') keys('Locator keys', join(root, 'src', 'locators'));
if (all || section === 'network') keys('Network registry keys', join(root, 'src', 'network'), true);
if (all || section === 'labels') keys('Label keys', join(root, 'src', 'labels'));
if (all || section === 'data') keys('Data keys', join(root, 'src', 'data'));
if (all || section === 'policies') keys('Bank settings and policy keys', join(root, 'src', 'config', 'banks'));
if (all || section === 'pending') pending();
