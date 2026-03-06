import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, 'dist');
const PREVIEW_PORT = 4173;
const PREVIEW_BASE = `http://127.0.0.1:${PREVIEW_PORT}`;

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

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await delay(400);
  }
  throw new Error(`Timed out waiting for preview server: ${url}`);
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');
  const rel = route.replace(/^\/+/, '');
  return path.join(DIST_DIR, rel, 'index.html');
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function run() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('dist directory not found. Run `npm run build` first.');
  }

  const preview = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PREVIEW_PORT), '--strictPort'],
    { cwd: ROOT, stdio: 'inherit' }
  );

  try {
    await waitForServer(`${PREVIEW_BASE}/`);

    const browser = await chromium.launch({ headless: true });
    try {
      const context = await browser.newContext();
      const page = await context.newPage();

      for (const route of ROUTES) {
        const url = `${PREVIEW_BASE}${route}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        try {
          await page.waitForSelector('h1', { state: 'attached', timeout: 30_000 });
        } catch {
          // eslint-disable-next-line no-console
          console.warn(`warning: no h1 found during prerender for ${route}`);
        }
        const html = `<!doctype html>\n${await page.content()}\n`;
        const out = outputPathForRoute(route);
        ensureDir(out);
        fs.writeFileSync(out, html, 'utf8');
        // eslint-disable-next-line no-console
        console.log(`prerendered ${route} -> ${path.relative(ROOT, out)}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill('SIGTERM');
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
