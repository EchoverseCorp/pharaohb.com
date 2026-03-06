import { writings } from '@/data/writings';
import { blogPosts } from '@/data/blogPosts';
import { books } from '@/data/books';
import { artworks } from '@/data/artworks';
import { transmissions } from '@/data/transmissions';
import { inferNeedPathFromText, NeedPathKey } from '@/data/discoveryPaths';
import { first100Entries, First100SectionKey } from '@/data/first100Content';

export type ContentType = 'article' | 'writing' | 'book' | 'art' | 'media';
export type ContentFormat =
  | 'essay'
  | 'poetry'
  | 'music'
  | 'frequency'
  | 'meditation'
  | 'audiobook'
  | 'spoken-word'
  | 'teaching'
  | 'book'
  | 'art'
  | 'other';

export interface ContentIndexItem {
  id: string;
  title: string;
  snippet: string;
  type: ContentType;
  format: ContentFormat;
  href: string;
  need: NeedPathKey;
  priority?: number;
  tags?: string[];
  sourcePath?: string;
}

const BLOCKED_SEARCH_TERMS = ['suno'];

function isBlockedSearchItem(item: Pick<ContentIndexItem, 'title' | 'snippet' | 'href' | 'sourcePath'>): boolean {
  const hay = `${item.title} ${item.snippet} ${item.href} ${item.sourcePath || ''}`.toLowerCase();
  return BLOCKED_SEARCH_TERMS.some((term) => hay.includes(term));
}

function needFromFirst100Section(section: First100SectionKey): NeedPathKey {
  if (section === 'think-clearly') return 'think-clearly';
  if (section === 'build-discipline') return 'build-discipline';
  if (section === 'find-direction') return 'find-direction';
  if (section === 'creative-expression' || section === 'creative-media') return 'creative-expression';
  return 'books-and-tools';
}

function formatFromFirst100Section(section: First100SectionKey, title: string): ContentFormat {
  const hay = title.toLowerCase();
  if (section === 'creative-media') {
    if (/\bfrequency|sound\b/.test(hay)) return 'frequency';
    if (/\bmusic\b/.test(hay)) return 'music';
    return 'teaching';
  }
  if (section === 'study-guides') return 'teaching';
  return inferFormatFromText(title, 'article');
}

type RawContentPack = {
  items?: Partial<ContentIndexItem>[];
};

type ContentOverrideSet = Partial<
  Pick<ContentIndexItem, 'title' | 'snippet' | 'type' | 'format' | 'href' | 'need' | 'priority' | 'tags'>
>;

type ContentRewriteRule = {
  contains?: string;
  source_path_contains?: string;
  type?: ContentType;
  set: ContentOverrideSet;
};

type RawContentOverrides = {
  exclude_ids?: string[];
  exclude_contains?: string[];
  item_overrides?: Record<string, ContentOverrideSet>;
  rewrite_rules?: ContentRewriteRule[];
};

function mapTransmissionCategoryToFormat(category: string): ContentFormat {
  if (category === 'frequency') return 'frequency';
  if (category === 'audiobook') return 'audiobook';
  if (category === 'spoken-word') return 'spoken-word';
  if (category === 'teaching') return 'teaching';
  if (category === 'affirmation') return 'meditation';
  if (category === 'music') return 'music';
  return 'other';
}

function inferFormatFromText(text: string, type: ContentType): ContentFormat {
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

export function buildDefaultContentIndex(): ContentIndexItem[] {
  const items: ContentIndexItem[] = [
    ...first100Entries.map((entry) => ({
      id: `map:${entry.section}:${entry.slug}`,
      title: entry.title,
      snippet: entry.summary,
      type: 'article' as const,
      format: formatFromFirst100Section(entry.section, entry.title),
      href: entry.href,
      need: needFromFirst100Section(entry.section),
      priority: 35,
      tags: ['mapped'],
      sourcePath: undefined,
    })),
    ...blogPosts.map((post) => ({
      id: `article:${post.slug}`,
      title: post.title,
      snippet: post.excerpt,
      type: 'article' as const,
      format: inferFormatFromText(`${post.title} ${post.excerpt} ${post.tags.join(' ')}`, 'article'),
      href: `/articles/${post.slug}`,
      need: inferNeedPathFromText(`${post.title} ${post.excerpt} ${post.tags.join(' ')}`).key,
      priority: 0,
      tags: post.tags,
      sourcePath: undefined,
    })),
    ...writings.map((writing) => ({
      id: `writing:${writing.slug}`,
      title: writing.title,
      snippet: writing.excerpt,
      type: 'writing' as const,
      format: inferFormatFromText(`${writing.title} ${writing.excerpt}`, 'writing'),
      href: `/writings/${writing.slug}`,
      need: inferNeedPathFromText(`${writing.title} ${writing.excerpt}`).key,
      priority: 0,
      sourcePath: undefined,
    })),
    ...books.map((book) => ({
      id: `book:${book.slug}`,
      title: book.title,
      snippet: book.description,
      type: 'book' as const,
      format: inferFormatFromText(`${book.title} ${book.subtitle} ${book.description}`, 'book'),
      href: `/library/${book.slug}`,
      need: inferNeedPathFromText(`${book.title} ${book.subtitle} ${book.description}`).key,
      priority: 0,
      sourcePath: undefined,
    })),
    ...artworks.slice(0, 120).map((artwork) => ({
      id: `art:${artwork.slug}`,
      title: artwork.title,
      snippet: artwork.description,
      type: 'art' as const,
      format: 'art',
      href: `/art/${artwork.slug}`,
      need: inferNeedPathFromText(`${artwork.title} ${artwork.description}`).key,
      priority: 0,
      sourcePath: undefined,
    })),
    ...transmissions.slice(0, 200).map((transmission) => ({
      id: `media:${transmission.id}`,
      title: transmission.title,
      snippet: transmission.description,
      type: 'media' as const,
      format: mapTransmissionCategoryToFormat((transmission as { category?: string }).category || ''),
      href: '/media',
      need: inferNeedPathFromText(`${transmission.title} ${transmission.description} ${transmission.category}`).key,
      priority: transmission.featured ? 25 : 0,
      sourcePath: undefined,
    })),
  ];

  return dedupeById(items).filter((item) => !isBlockedSearchItem(item));
}

function dedupeById(items: ContentIndexItem[]): ContentIndexItem[] {
  const map = new Map<string, ContentIndexItem>();
  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}

function normalizeItem(raw: Partial<ContentIndexItem>, idx: number): ContentIndexItem | null {
  if (!raw.title || !raw.snippet || !raw.href || !raw.type) return null;
  if (!['article', 'writing', 'book', 'art', 'media'].includes(raw.type)) return null;
  const text = `${raw.title} ${raw.snippet} ${(raw.tags || []).join(' ')}`;
  const need = raw.need || inferNeedPathFromText(text).key;
  const sourcePath = ((raw as unknown as { source_path?: string }).source_path || raw.sourcePath);
  const format = (raw.format || inferFormatFromText(text, raw.type)) as ContentFormat;
  return {
    id: raw.id || `external:${raw.type}:${idx}`,
    title: raw.title,
    snippet: raw.snippet,
    type: raw.type,
    format,
    href: raw.href,
    need,
    priority: raw.priority || 0,
    tags: raw.tags || [],
    sourcePath,
  };
}

function applySet(item: ContentIndexItem, set: ContentOverrideSet): ContentIndexItem {
  return {
    ...item,
    ...set,
    type: (set.type || item.type) as ContentType,
    format: (set.format || item.format) as ContentFormat,
    need: (set.need || item.need) as NeedPathKey,
    priority: set.priority ?? item.priority ?? 0,
    tags: set.tags || item.tags || [],
  };
}

function applyOverrides(items: ContentIndexItem[], raw: RawContentOverrides | null): ContentIndexItem[] {
  if (!raw) return items;

  const exclude = new Set(raw.exclude_ids || []);
  const excludeContains = (raw.exclude_contains || []).map((value) => value.toLowerCase());
  const itemOverrides = raw.item_overrides || {};
  const rules = raw.rewrite_rules || [];

  const rewritten = items
    .filter((item) => {
      if (exclude.has(item.id)) return false;
      if (excludeContains.length === 0) return true;
      const hay = `${item.title} ${item.snippet} ${item.href} ${item.sourcePath || ''}`.toLowerCase();
      return !excludeContains.some((needle) => hay.includes(needle));
    })
    .map((item) => {
      let next = item;

      if (itemOverrides[item.id]) {
        next = applySet(next, itemOverrides[item.id]);
      }

      for (const rule of rules) {
        const containsOk =
          !rule.contains ||
          `${next.title} ${next.snippet} ${next.href}`.toLowerCase().includes(rule.contains.toLowerCase());
        const sourceOk =
          !rule.source_path_contains ||
          (next.sourcePath || '').toLowerCase().includes(rule.source_path_contains.toLowerCase());
        const typeOk = !rule.type || next.type === rule.type;
        if (containsOk && sourceOk && typeOk) {
          next = applySet(next, rule.set);
        }
      }

      return next;
    });

    return dedupeById(rewritten).filter((item) => !isBlockedSearchItem(item));
}

function normalizeMediaItems(items: ContentIndexItem[]): ContentIndexItem[] {
  const mediaSignal = /\b(youtube|spotify|music|song|songs|frequency|frequencies|audiobook|affirmation|meditation)\b/i;
  const nonMusicSignal = /\b(toyota|tundra|nissan|transmission repair|mechanic|engine|mva)\b/i;
  const toArticleHref = (item: ContentIndexItem): string => {
    if (item.href !== '/media') return item.href;
    const mediaPrefix = 'ext:media:';
    if (item.id.startsWith(mediaPrefix)) {
      const slug = item.id.slice(mediaPrefix.length);
      if (slug) return `/articles/${slug}`;
    }
    return '/articles';
  };

  return items.map((item) => {
    if (item.type !== 'media') return item;
    const hay = `${item.title} ${item.snippet} ${item.sourcePath || ''}`;
    if (nonMusicSignal.test(hay)) {
      return {
        ...item,
        type: 'article',
        format: inferFormatFromText(`${item.title} ${item.snippet}`, 'article'),
        href: toArticleHref(item),
      };
    }
    if (!mediaSignal.test(hay)) {
      return {
        ...item,
        type: 'article',
        format: inferFormatFromText(`${item.title} ${item.snippet}`, 'article'),
        href: toArticleHref(item),
      };
    }
    const format = inferFormatFromText(`${item.title} ${item.snippet} ${item.sourcePath || ''}`, 'media');
    const mediaHrefByFormat: Partial<Record<ContentFormat, string>> = {
      frequency: '/media?category=frequency',
      meditation: '/media?category=affirmation',
      audiobook: '/media?category=audiobook',
      'spoken-word': '/media?category=spoken-word',
      teaching: '/media?category=teaching',
      music: '/media?category=music',
    };
    return {
      ...item,
      format,
      href: mediaHrefByFormat[format] || '/media',
    };
  });
}

export async function loadContentIndex(): Promise<{ source: 'external' | 'bundled'; items: ContentIndexItem[] }> {
  if (typeof window === 'undefined') {
    return { source: 'bundled', items: buildDefaultContentIndex() };
  }

  try {
    const response = await fetch('/content/pharaohb-index.json', { cache: 'no-store' });
    if (!response.ok) {
      return { source: 'bundled', items: buildDefaultContentIndex() };
    }
    const data = (await response.json()) as RawContentPack | Partial<ContentIndexItem>[];
    const rawItems = Array.isArray(data) ? data : data.items || [];
    const parsed = rawItems
      .map((item, idx) => normalizeItem(item, idx))
      .filter((item): item is ContentIndexItem => Boolean(item));
    if (parsed.length === 0) {
      return { source: 'bundled', items: buildDefaultContentIndex() };
    }
    let overrides: RawContentOverrides | null = null;
    try {
      const overrideResponse = await fetch('/content/pharaohb-overrides.json', { cache: 'no-store' });
      if (overrideResponse.ok) {
        overrides = (await overrideResponse.json()) as RawContentOverrides;
      }
    } catch {
      overrides = null;
    }

    const mapped = first100Entries.map((entry) => ({
      id: `map:${entry.section}:${entry.slug}`,
      title: entry.title,
      snippet: entry.summary,
      type: 'article' as const,
      format: formatFromFirst100Section(entry.section, entry.title),
      href: entry.href,
      need: needFromFirst100Section(entry.section),
      priority: 35,
      tags: ['mapped'],
      sourcePath: undefined,
    }));
    const normalized = normalizeMediaItems(dedupeById([...parsed, ...mapped]));
    let items = applyOverrides(normalized, overrides);
    try {
      const priorityResponse = await fetch('/content/pharaohb-top100.json', { cache: 'no-store' });
      if (priorityResponse.ok) {
        const payload = (await priorityResponse.json()) as { ids?: string[] };
        const ids = payload.ids || [];
        const idToScore = new Map(ids.map((id, idx) => [id, Math.max(1, 100 - idx)]));
        items = items.map((item) => ({ ...item, priority: Math.max(item.priority || 0, idToScore.get(item.id) || 0) }));
      }
    } catch {
      // no priority pack found; continue with overrides only
    }
    return { source: 'external', items };
  } catch {
    return { source: 'bundled', items: buildDefaultContentIndex() };
  }
}
