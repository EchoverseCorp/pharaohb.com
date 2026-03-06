import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://pharaohb.com';
const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const CONTENT_INDEX = path.join(PUBLIC_DIR, 'content', 'pharaohb-index.json');
const SRC_DATA = path.join(ROOT, 'src', 'data');
const OUTPUT = path.join(PUBLIC_DIR, 'sitemap.xml');

const STATIC_ROUTES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/start', changefreq: 'monthly', priority: '0.9' },
  { loc: '/articles', changefreq: 'weekly', priority: '0.9' },
  { loc: '/library', changefreq: 'weekly', priority: '0.9' },
  { loc: '/creative', changefreq: 'weekly', priority: '0.8' },
  { loc: '/resources', changefreq: 'weekly', priority: '0.8' },
  { loc: '/search', changefreq: 'weekly', priority: '0.7' },
  { loc: '/art', changefreq: 'weekly', priority: '0.8' },
  { loc: '/music', changefreq: 'weekly', priority: '0.8' },
  { loc: '/media', changefreq: 'weekly', priority: '0.8' },
  { loc: '/writings', changefreq: 'weekly', priority: '0.8' },
  { loc: '/shop', changefreq: 'weekly', priority: '0.8' },
  { loc: '/think-clearly', changefreq: 'weekly', priority: '0.9' },
  { loc: '/build-discipline', changefreq: 'weekly', priority: '0.9' },
  { loc: '/find-direction', changefreq: 'weekly', priority: '0.9' },
  { loc: '/creative-expression', changefreq: 'weekly', priority: '0.8' },
  { loc: '/books-and-tools', changefreq: 'weekly', priority: '0.9' },
  { loc: '/study-guides', changefreq: 'weekly', priority: '0.8' },
  { loc: '/first-100', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
];

const BLOCKED_PREFIXES = ['/news', '/canon', '/transmissions', '/books'];
const BLOCKED_EXACT = new Set(['/privacy', '/terms']);

function normalizeHref(href) {
  if (!href || typeof href !== 'string') return null;
  if (!href.startsWith('/')) return null;
  const clean = href.split('?')[0].split('#')[0];
  if (!clean || BLOCKED_EXACT.has(clean)) return null;
  if (BLOCKED_PREFIXES.some((prefix) => clean === prefix || clean.startsWith(`${prefix}/`))) return null;
  return clean;
}

function readContentUrls() {
  if (!fs.existsSync(CONTENT_INDEX)) return [];
  try {
    const raw = fs.readFileSync(CONTENT_INDEX, 'utf8');
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed) ? parsed : parsed.items || [];
    const urls = new Set();
    for (const item of items) {
      const id = typeof item?.id === 'string' ? item.id : '';
      const includeById =
        id.startsWith('map:') ||
        id.startsWith('article:') ||
        id.startsWith('writing:') ||
        id.startsWith('book:') ||
        id.startsWith('art:') ||
        id.startsWith('media:');
      if (!includeById) continue;
      const href = normalizeHref(item?.href);
      if (href) urls.add(href);
    }
    return Array.from(urls);
  } catch {
    return [];
  }
}

function readFileSafe(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}

function extractSlugsFromTs(filePath) {
  const src = readFileSafe(filePath);
  if (!src) return [];
  const matches = [...src.matchAll(/slug:\s*'([^']+)'/g)];
  return matches.map((m) => m[1]);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractFirst100Urls() {
  const src = readFileSafe(path.join(SRC_DATA, 'first100Content.ts'));
  if (!src) return [];
  const groups = [
    { key: 'thinkClearlyTitles', base: '/think-clearly' },
    { key: 'disciplineTitles', base: '/build-discipline' },
    { key: 'directionTitles', base: '/find-direction' },
    { key: 'creativeExpressionTitles', base: '/creative-expression' },
    { key: 'booksAndToolsTitles', base: '/books-and-tools' },
    { key: 'studyGuideTitles', base: '/study-guides' },
    { key: 'resourceTitles', base: '/resources' },
    { key: 'creativeMediaTitles', base: '/creative' },
  ];
  const urls = [];
  for (const group of groups) {
    const block = src.match(new RegExp(`const\\s+${group.key}\\s*=\\s*\\[([\\s\\S]*?)\\];`));
    if (!block) continue;
    let items = [];
    try {
      items = Function(`"use strict"; return [${block[1]}];`)();
    } catch {
      items = [];
    }
    for (const title of items) {
      const slug = slugify(String(title || ''));
      if (!slug) continue;
      urls.push(`${group.base}/${slug}`);
    }
  }
  return urls;
}

function xmlUrl(loc, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${SITE}${loc}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function main() {
  const dynamicSet = new Set(readContentUrls());

  // Canonical route-safe URLs from source data files.
  const articleSlugs = extractSlugsFromTs(path.join(SRC_DATA, 'blogPosts.ts'));
  const writingSlugs = extractSlugsFromTs(path.join(SRC_DATA, 'writings.ts'));
  const bookSlugs = extractSlugsFromTs(path.join(SRC_DATA, 'books.ts'));
  const artSlugs = extractSlugsFromTs(path.join(SRC_DATA, 'artworks.ts'));
  for (const slug of articleSlugs) dynamicSet.add(`/articles/${slug}`);
  for (const slug of writingSlugs) dynamicSet.add(`/writings/${slug}`);
  for (const slug of bookSlugs) dynamicSet.add(`/library/${slug}`);
  for (const slug of artSlugs) dynamicSet.add(`/art/${slug}`);
  for (const mapped of extractFirst100Urls()) dynamicSet.add(mapped);

  // Avoid duplicates with static routes.
  for (const route of STATIC_ROUTES) dynamicSet.delete(route.loc);

  const staticXml = STATIC_ROUTES.map((route) => xmlUrl(route.loc, route.changefreq, route.priority));
  const dynamicXml = Array.from(dynamicSet)
    .sort((a, b) => a.localeCompare(b))
    .map((loc) => xmlUrl(loc, 'monthly', loc.startsWith('/articles/') ? '0.8' : '0.7'));

  const doc = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticXml,
    ...dynamicXml,
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(OUTPUT, doc, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`sitemap written: ${OUTPUT} (${STATIC_ROUTES.length + dynamicXml.length} urls)`);
}

main();
