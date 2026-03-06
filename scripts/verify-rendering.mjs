import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');

const ROUTES = [
  '/',
  '/start',
  '/articles',
  '/library',
  '/creative',
  '/resources',
  '/study-guides',
  '/music',
  '/art',
  '/shop',
  '/about',
];

const REQUIRED_HEAD_TOKENS = [
  '<meta name="description"',
  '<meta property="og:title"',
  '<meta property="og:description"',
];

function htmlPath(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, route.replace(/^\/+/, ''), 'index.html');
}

function assertIncludes(haystack, needle, message) {
  if (!haystack.includes(needle)) {
    throw new Error(`${message}: missing "${needle}"`);
  }
}

function main() {
  for (const route of ROUTES) {
    const file = htmlPath(route);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing prerendered file: ${path.relative(ROOT, file)}`);
    }
    const html = fs.readFileSync(file, 'utf8');
    assertIncludes(html, '<h1', `Route ${route} should include h1`);
    assertIncludes(html, '<a href="', `Route ${route} should include anchor links`);
    for (const token of REQUIRED_HEAD_TOKENS) {
      assertIncludes(html, token, `Route ${route} should include SEO tags`);
    }
  }

  const articlesHtml = fs.readFileSync(htmlPath('/articles'), 'utf8');
  assertIncludes(articlesHtml, '/articles/', '/articles should include article links');
  assertIncludes(articlesHtml, 'plain language', '/articles should include description text');
  assertIncludes(articlesHtml, 'application/ld+json', '/articles should include JSON-LD schema');

  // eslint-disable-next-line no-console
  console.log('render verification passed for prerendered routes');
}

main();
