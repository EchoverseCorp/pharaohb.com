# Navigation + URL Freeze (Section 0.5)

Date: 2026-03-05
Owner: Pharaoh B web build
Status: Frozen unless explicit approval

## Primary Navigation (Desktop/Mobile)
1. `Start Here` -> `/start`
2. `Articles` -> `/articles`
3. `Library` -> `/library`
4. `Creative` -> `/creative`
5. `Resources` -> `/resources`
6. `Shop` -> `/shop`
7. `Search` -> `/search`
8. `About` -> `/about`

## Canonical URL Taxonomy
- Home: `/`
- Start page: `/start`
- Articles hub: `/articles`
- Article detail: `/articles/:slug`
- Books hub: `/books`
- Book detail: `/library/:slug`
- Library hub: `/library`
- Creative hub: `/creative`
- Resources hub: `/resources`
- Search hub: `/search`
- Pillars:
  - `/think-clearly`
  - `/build-discipline`
  - `/find-direction`
  - `/creative-expression`
  - `/books-and-tools`
- Creative leaf routes:
  - `/writings`, `/writings/:slug`
  - `/music`
  - `/art`, `/art/:slug`
  - `/media`
- Shop hub: `/shop`
- Contact: `/contact`

## Legacy Redirects (Preserve SEO Equity)
- `/about` -> `/start`
- `/news` -> `/articles` (legacy alias remains available)
- `/canon` -> `/library`
- `/transmissions` -> `/media`

## Internal Linking Rules
- Every detail page links back to its hub.
- Home uses canonical links only (no legacy paths).
- Footer uses canonical links only.
- Product links to books use `/library/:slug`.

## SEO + AI Crawl Rules
- Route-based metadata is managed centrally in `src/components/RouteMeta.tsx`.
- Canonical link is set on every route.
- Breadcrumb JSON-LD is set on every route.
- `robots.txt` points to `https://pharaohb.com/sitemap.xml`.
- `sitemap.xml` should only contain canonical routes for hub pages.

## Change Control
- Any nav or URL change must update all:
  - `src/App.tsx`
  - `src/components/Navbar.tsx`
  - `src/components/Footer.tsx`
  - `public/sitemap.xml`
  - this file
