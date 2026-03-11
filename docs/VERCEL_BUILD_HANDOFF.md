# Vercel Build Handoff

## Issue Summary

Vercel was not failing on the currently live site. It was failing on newer production deployments that never became the active alias.

As of March 11, 2026:

- live production alias was still serving the successful March 6, 2026 deployment
- newer deployments from March 6, 2026 failed during the build step

## Root Cause

`main` used a Playwright-based prerender script:

- `package.json` ran `npm run prerender` as part of `npm run build`
- `scripts/prerender-routes.mjs` started `vite preview`
- the script launched headless Chromium with Playwright
- rendered route HTML was written back into `dist/`

This was brittle on Vercel. Build logs showed two concrete failure modes:

1. Playwright browser executable missing in the Vercel build environment
2. After adding browser install, Chromium still failed to start because `libnspr4.so` was missing

## Verified Fix

The Playwright prerender path was replaced with `vite-react-ssg`.

Minimal functional changes:

- switch build script to `vite-react-ssg build`
- remove `scripts/prerender-routes.mjs`
- convert `src/main.tsx` to `ViteReactSSG(...)`
- export route objects from `src/App.tsx` instead of using `BrowserRouter` directly
- add `ssgOptions.includedRoutes` in `vite.config.ts`

## Verification Status

Verified in a clean worktree created from `origin/main`:

- branch: `codex/vercel-ssg-fix`
- commit: `31fa64f`
- `npm run build`: passed
- `vercel build`: passed

PR URL:

- https://github.com/EchoverseCorp/pharaohb.com/pull/new/codex/vercel-ssg-fix

## Important Context

- The main workspace at `/Users/will/Development/pharaohb.com` has unrelated in-progress changes and was intentionally not used for deployment.
- The clean verification worktree was created at `/tmp/pharaohb-vercel-fix`.
- If another developer picks this up, they should start from `codex/vercel-ssg-fix` or port that exact diff onto the deploy branch.
