#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

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

function scoreItem(item) {
  const src = String(item.source_path || item.sourcePath || '');
  const base = path.basename(src, '.md');
  const title = String(item.title || '');
  const hay = `${base} ${title}`.toLowerCase();

  const hardExclude = [
    /bellaire|urgent_care|medical|insurance|covid|flu|sepsis|thyroid|radiology|telemedicine|hospital|doctor|pharmacy|mva/i,
    /windows|powershell|dns|unifi|vps|firebase|api_|api-|python_|github_|server|registry|factory_reset|printer|resume|loan|stock|xrp/i,
    /toyota|tundra|maxima|nissan|mechanic|transmission_for_/i,
  ];
  if (hardExclude.some((r) => r.test(hay))) return -999;

  const softExclude = [
    /request|prompt|refinement|thumbnail|setup|roadmap|strategy|comparison|template|checklist|troubleshooting|fix|issue/i,
  ];

  const includeCore = [
    /pharaoh|light_within|thoth|scroll|master_key|think_and_grow|kybalion/i,
    /poem|poetry|spoken|rant|quote/i,
    /frequency|meditation|affirmation|audiobook|music|song|album|focus|healing|vibration|chakra/i,
    /humanity|unity|purpose|cause_and_effect/i,
  ];

  let score = 0;
  if (includeCore[0].test(hay)) score += 24;
  if (includeCore[1].test(hay)) score += 18;
  if (includeCore[2].test(hay)) score += 18;
  if (includeCore[3].test(hay)) score += 12;

  if (/_poem|poetry|spoken[-_ ]word/i.test(hay)) score += 8;
  if (/_frequency|frequency_|_meditation|meditation_|_affirmation|affirmation_/i.test(hay)) score += 8;
  if (/_audiobook|audiobook_/i.test(hay)) score += 8;
  if (/_song|song_|music_/i.test(hay)) score += 8;

  if (item.type === 'writing') score += 8;
  if (item.type === 'media') score += 8;
  if (item.type === 'book') score += 5;
  if (item.format === 'poetry' || item.format === 'spoken-word') score += 6;
  if (item.format === 'frequency' || item.format === 'meditation' || item.format === 'audiobook' || item.format === 'music')
    score += 6;

  if (softExclude.some((r) => r.test(hay))) score -= 12;

  // Penalize obvious LLM artifact titles.
  if (/^[*#`]|✅|🔥|⭐|📜|🔢|🎵|🔮|🌍|🧠/.test(title)) score -= 10;
  if (/^output:|^define |^create |^part\s*\d|^step\s*\d/i.test(title)) score -= 10;

  return score;
}

function inferFormat(item) {
  const hay = `${item.title || ''} ${item.source_path || item.sourcePath || ''} ${item.snippet || ''}`.toLowerCase();
  if (/\b(audiobook)\b/.test(hay)) return 'audiobook';
  if (/\b(poem|poetry)\b/.test(hay)) return 'poetry';
  if (/\b(spoken word|spoken-word)\b/.test(hay)) return 'spoken-word';
  if (/\b(frequency|frequencies|hz|binaural|solfeggio)\b/.test(hay)) return 'frequency';
  if (/\b(meditation|affirmation|subliminal|breathwork)\b/.test(hay)) return 'meditation';
  if (/\b(song|songs|album|music|track|instrumental|spotify|youtube)\b/.test(hay)) return 'music';
  if (/\b(teaching|guide|framework|system|discipline|clarity|direction)\b/.test(hay)) return 'teaching';
  if (item.type === 'book') return 'book';
  if (item.type === 'art') return 'art';
  if (item.type === 'writing' || item.type === 'article') return 'essay';
  return 'other';
}

function toKeywordArray(values) {
  if (!Array.isArray(values)) return [];
  return values.map((value) => String(value || '').toLowerCase()).filter(Boolean);
}

function toSet(values) {
  if (!Array.isArray(values)) return new Set();
  return new Set(values.map((value) => String(value || '')).filter(Boolean));
}

function readManifest(manifestPath) {
  if (!manifestPath || !fs.existsSync(manifestPath)) return null;
  try {
    const payload = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const sections = payload.sections && typeof payload.sections === 'object' ? payload.sections : {};
    return {
      max: Number(payload.max || 0) || null,
      sections,
      includeIds: payload.include_ids || [],
      excludeIds: payload.exclude_ids || [],
    };
  } catch (error) {
    console.error(`Invalid manifest JSON: ${manifestPath}`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function itemMatchesSection(item, section) {
  const hay = `${item.title || ''} ${item.src || ''} ${item.type || ''} ${item.format || ''}`.toLowerCase();
  const includeFormats = toKeywordArray(section.include_formats);
  const includeTypes = toKeywordArray(section.include_types);
  const includeKeywords = toKeywordArray(section.include_keywords);
  const excludeKeywords = toKeywordArray(section.exclude_keywords);

  if (includeFormats.length > 0 && !includeFormats.includes(String(item.format || '').toLowerCase())) return false;
  if (includeTypes.length > 0 && !includeTypes.includes(String(item.type || '').toLowerCase())) return false;
  if (includeKeywords.length > 0 && !includeKeywords.some((keyword) => hay.includes(keyword))) return false;
  if (excludeKeywords.length > 0 && excludeKeywords.some((keyword) => hay.includes(keyword))) return false;

  return true;
}

function addRowIfEligible({ row, chosen, seen, excluded, idToRow, max }) {
  if (!row) return false;
  if (chosen.length >= max) return false;
  if (!row.id || seen.has(row.id) || excluded.has(row.id)) return false;
  seen.add(row.id);
  chosen.push(row);
  idToRow.set(row.id, row);
  return true;
}

function main() {
  const args = parseArgs(process.argv);
  const input = args.input || path.join(process.cwd(), 'public/content/pharaohb-index.json');
  const output = args.output || path.join(process.cwd(), 'public/content/pharaohb-top100.json');
  const manifestPath = args.manifest || path.join(process.cwd(), 'public/content/pharaohb-curation-manifest.json');
  const manifest = readManifest(manifestPath);
  const max = Number(args.max || manifest?.max || 100);

  if (!fs.existsSync(input)) {
    console.error(`Input not found: ${input}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(input, 'utf8'));
  const items = data.items || [];

  const ranked = items
    .map((item) => ({
      id: item.id,
      title: item.title,
      score: scoreItem(item),
      type: item.type,
      format: item.format || inferFormat(item),
      src: item.source_path || item.sourcePath || '',
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const excluded = new Set(manifest?.excludeIds || []);
  const chosen = [];
  const seen = new Set();
  const idToRow = new Map();
  const sectionCounts = {};

  if (manifest && manifest.sections && typeof manifest.sections === 'object') {
    const entries = Object.entries(manifest.sections);
    for (const [sectionName, sectionConfig] of entries) {
      const section = sectionConfig && typeof sectionConfig === 'object' ? sectionConfig : {};
      const sectionMax = Number(section.max || 0) || 0;
      let sectionCount = 0;

      for (const id of section.ids || []) {
        const explicitRow = ranked.find((row) => row.id === id);
        if (addRowIfEligible({ row: explicitRow, chosen, seen, excluded, idToRow, max })) {
          sectionCount += 1;
          if (sectionMax > 0 && sectionCount >= sectionMax) break;
        }
      }

      if (!(sectionMax > 0 && sectionCount >= sectionMax)) {
        for (const row of ranked) {
          if (sectionMax > 0 && sectionCount >= sectionMax) break;
          if (!itemMatchesSection(row, section)) continue;
          if (addRowIfEligible({ row, chosen, seen, excluded, idToRow, max })) {
            sectionCount += 1;
          }
          if (chosen.length >= max) break;
        }
      }

      sectionCounts[sectionName] = sectionCount;
      if (chosen.length >= max) break;
    }
  }

  for (const id of manifest?.includeIds || []) {
    const row = ranked.find((candidate) => candidate.id === id);
    addRowIfEligible({ row, chosen, seen, excluded, idToRow, max });
    if (chosen.length >= max) break;
  }

  if (chosen.length < max) {
    for (const row of ranked) {
      addRowIfEligible({ row, chosen, seen, excluded, idToRow, max });
      if (chosen.length >= max) break;
    }
  }

  const payload = {
    generated_at: new Date().toISOString(),
    input,
    manifest: manifest ? manifestPath : null,
    count: chosen.length,
    ids: chosen.map((x) => x.id),
    section_counts: sectionCounts,
    preview: chosen.slice(0, 40),
  };

  fs.writeFileSync(output, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${chosen.length} ids to ${output}`);
}

main();
