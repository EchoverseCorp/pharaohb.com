#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inferType(relativePath, title) {
  const hay = `${relativePath} ${title}`.toLowerCase();
  if (/\b(poem|poetry|rant|quote|scroll|essays?)\b/.test(hay)) return 'writing';
  if (/\b(book|books|audiobook|library)\b/.test(hay)) return 'book';
  if (/\b(music|frequency|frequencies|song|audio|podcast|meditation|affirmation)\b/.test(hay)) return 'media';
  if (/\b(art|image|images|visual|sigil|canvas|design|illustration)\b/.test(hay)) return 'art';
  return 'article';
}

function inferFormat(text, type) {
  const hay = text.toLowerCase();
  if (type === 'art') return 'art';
  if (/\b(audiobook)\b/.test(hay)) return 'audiobook';
  if (/\b(poem|poetry)\b/.test(hay)) return 'poetry';
  if (/\b(spoken word|spoken-word)\b/.test(hay)) return 'spoken-word';
  if (/\b(frequency|frequencies|hz|binaural|solfeggio)\b/.test(hay)) return 'frequency';
  if (/\b(meditation|affirmation|subliminal|breathwork)\b/.test(hay)) return 'meditation';
  if (/\b(song|songs|album|music|track|instrumental)\b/.test(hay)) return 'music';
  if (/\b(teaching|guide|how to|framework|system)\b/.test(hay)) return 'teaching';
  if (type === 'book') return 'book';
  if (type === 'writing') return 'essay';
  if (type === 'media') return 'other';
  return 'essay';
}

function inferNeed(text) {
  const hay = text.toLowerCase();
  if (/(overthink|clarity|focus|anxiety|mind)/.test(hay)) return 'think-clearly';
  if (/(discipline|habit|execute|procrast|consisten)/.test(hay)) return 'build-discipline';
  if (/(direction|purpose|meaning|vision|path)/.test(hay)) return 'find-direction';
  if (/(creative|poem|music|art|expression|story)/.test(hay)) return 'creative-expression';
  return 'books-and-tools';
}

function inferHref(type, slug) {
  if (type === 'writing') return `/writings/${slug}`;
  if (type === 'book') return `/library/${slug}`;
  if (type === 'art') return `/art/${slug}`;
  if (type === 'media') return '/media';
  return `/articles/${slug}`;
}

function cleanContent(raw) {
  return raw
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/\r/g, '')
    .trim();
}

function extractTitle(raw, fileName) {
  const heading = raw.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading;
  return fileName
    .replace(/\.md$/i, '')
    .replace(/[_-]+/g, ' ')
    .trim();
}

function extractSnippet(raw) {
  const text = raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .join(' ');
  return text.slice(0, 240);
}

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdown(full, out);
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = 'true';
      } else {
        args[key] = next;
        i += 1;
      }
    }
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  const inputDir = args.input;
  const outputPath = args.output || path.join(process.cwd(), 'public/content/pharaohb-index.json');

  if (!inputDir) {
    console.error('Missing required --input <directory>');
    process.exit(1);
  }
  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  const files = walkMarkdown(inputDir);
  const items = files.map((filePath, idx) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const cleaned = cleanContent(raw);
    const title = extractTitle(cleaned, path.basename(filePath));
    const snippet = extractSnippet(cleaned);
    const relativePath = path.relative(inputDir, filePath);
    const type = inferType(relativePath, title);
    const format = inferFormat(`${title} ${snippet} ${relativePath}`, type);
    const slug = slugify(path.basename(filePath, '.md')) || `item-${idx + 1}`;
    const need = inferNeed(`${title} ${snippet} ${relativePath}`);
    return {
      id: `ext:${type}:${slug}`,
      title,
      snippet,
      type,
      format,
      href: inferHref(type, slug),
      need,
      tags: [],
      source_path: filePath,
    };
  });

  const payload = {
    generated_at: new Date().toISOString(),
    source_dir: inputDir,
    item_count: items.length,
    items,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${items.length} items to ${outputPath}`);
}

main();
