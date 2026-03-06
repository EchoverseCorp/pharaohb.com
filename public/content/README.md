# External Content Pack

Place `pharaohb-index.json` in this folder to override the bundled starter dataset used by `/search`.

## Generate from your curated markdown archive

From project root:

```bash
npm run content:build -- --input "/absolute/path/to/your/curated/markdown/folder" --output "public/content/pharaohb-index.json"
```

Then restart dev server:

```bash
npm run dev
```

If the file exists and is valid, Search will show:

`Index source: External content pack`

## Manual Curation Overrides (IA-5)

You can add `pharaohb-overrides.json` in this same folder to adjust classification and routing without rebuilding the whole project.

1. Copy template:

```bash
cp public/content/pharaohb-overrides.example.json public/content/pharaohb-overrides.json
```

2. Edit:

- `exclude_ids`: remove specific items by ID.
- `exclude_contains`: remove any item containing these terms (title/snippet/path).
- `item_overrides`: set exact fields for one item by ID.
- `rewrite_rules`: bulk updates by `source_path_contains` or text `contains`.

3. Refresh `/search`:

The app loads overrides at runtime and applies them on top of `pharaohb-index.json`.

## Top 100 Priority Pack

You can boost your best pieces with `pharaohb-top100.json`:

```json
{
  "ids": ["ext:writing:the-vibration-poem", "ext:media:chakra-frequency-activation"]
}
```

The search experience uses this list to prioritize those IDs first (while still honoring query relevance).

Generate or refresh automatically:

```bash
npm run content:top100 -- --input "public/content/pharaohb-index.json" --output "public/content/pharaohb-top100.json" --max 100
```

## Manual Top-100 Curation Manifest

Use `public/content/pharaohb-curation-manifest.json` to enforce category separation and explicit picks.

- `sections.<name>.max`: cap items from this bucket.
- `sections.<name>.ids`: explicit IDs added first (in order).
- `sections.<name>.include_formats`: allowed formats (e.g. `music`, `frequency`, `meditation`, `audiobook`, `poetry`).
- `sections.<name>.include_keywords`: text signals for auto-fill.
- `sections.<name>.exclude_keywords`: terms to block from that bucket.
- `exclude_ids` and `include_ids`: global remove/add controls.

Start by copying the template:

```bash
cp public/content/pharaohb-curation-manifest.example.json public/content/pharaohb-curation-manifest.json
```

Then regenerate with the manifest:

```bash
npm run content:top100 -- --input "public/content/pharaohb-index.json" --manifest "public/content/pharaohb-curation-manifest.json" --output "public/content/pharaohb-top100.json" --max 100
```
