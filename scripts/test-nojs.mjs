import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

const CHECKS = [
  { route: '/', text: 'What You Will Find Here' },
  { route: '/articles', text: 'Articles are where ideas are worked through in plain language.' },
  { route: '/library', text: 'Library Discovery Paths' },
  { route: '/creative', text: 'Creative and Media Essays' },
  { route: '/resources', text: 'Tools and Recommendations' },
];

function routeToFile(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\/+/, ''), 'index.html');
}

function main() {
  for (const check of CHECKS) {
    const file = routeToFile(check.route);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing prerendered route file: ${path.relative(ROOT, file)}`);
    }
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes(check.text)) {
      throw new Error(`JS-disabled visibility failed for ${check.route}: missing "${check.text}"`);
    }
  }

  // eslint-disable-next-line no-console
  console.log('js-disabled rendering checks passed');
}

main();
