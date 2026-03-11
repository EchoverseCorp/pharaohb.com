# SEO Rendering Strategy

## Current Strategy
PharaohB.com now ships with **build-time prerendering** (SSG-style snapshots) on top of the React + Vite app:

1. `vite build` produces static assets.
2. `scripts/prerender-routes.mjs` starts `vite preview`, opens required public routes in headless Chromium, and writes fully rendered HTML into `dist/<route>/index.html`.

The default build command now includes prerendering:

- `npm run build` -> `npm run build:client && npm run prerender`

## Pre-rendered Routes

- `/`
- `/start`
- `/articles`
- `/library`
- `/creative`
- `/resources`
- `/study-guides`
- `/music`
- `/art`
- `/shop`
- `/about`

## What Is Present In Raw HTML

For pre-rendered pages, the HTML source includes:

- `<h1>` content
- page text/body content
- article links/titles on listing pages
- internal links as real anchors (`<a href="...">`)
- `<meta name="description">`
- OpenGraph tags (`og:title`, `og:description`, `og:url`)
- JSON-LD scripts (`application/ld+json`)

## Example Raw HTML Output

From `dist/articles/index.html`:

```html
<title>Articles | Pharaoh B</title>
<meta name="description" content="Problem-first essays on overthinking, discipline, direction, and creative expression written in plain language.">
<meta property="og:title" content="Articles | Pharaoh B">
<script id="route-webpage-jsonld" type="application/ld+json">...</script>
<h1 class="...">Articles</h1>
<a href="/articles/how-to-stop-overthinking-guide">...</a>
```

From `dist/index.html`:

```html
<h1 class="...">
  <span>Think Clearly.</span>
  <span>Build a Meaningful Life.</span>
</h1>
<a href="/start">Start Here</a>
<a href="/library">Explore the Library</a>
```

## Verification Commands

- Build + prerender:
  - `npm run build`
- Raw HTML checks (H1/meta/OG/JSON-LD/internal anchors):
  - `npm run render:verify`
- JS-disabled visibility check (file-level, pre-hydration):
  - `npm run render:test:nojs`

## Robots/Crawler Access

`public/robots.txt` allows all major crawlers and does not block CSS/JS paths:

- `User-agent: *`
- `Allow: /`
- `Sitemap: https://pharaohb.com/sitemap.xml`

## Notes

- Homepage torus effect is disabled automatically when `navigator.webdriver` is true, preventing prerender failures in headless mode while preserving normal browser behavior.

## Vercel Build Notes

- The Playwright-based prerender approach described above is the reason recent Vercel deployments failed on March 6, 2026.
- Vercel build logs showed two concrete failure modes:
  - missing Playwright browser executable
  - missing shared library `libnspr4.so` after browser install
- The verified fix is to remove Playwright from the build entirely and use `vite-react-ssg` instead.
- Verified clean fix branch:
  - branch: `codex/vercel-ssg-fix`
  - commit: `31fa64f`
  - result: `npm run build` passed and `vercel build` passed
