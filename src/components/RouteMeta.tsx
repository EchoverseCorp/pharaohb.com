import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type MetaConfig = {
  title: string;
  description: string;
  noindex?: boolean;
};

const SITE_NAME = 'Pharaoh B';
const DEFAULT_TITLE = 'Pharaoh B | Think Clearly. Build a Meaningful Life.';
const DEFAULT_DESCRIPTION =
  'Practical books, articles, writing, music, and tools to help you stop overthinking, build discipline, find direction, and create meaningful progress.';

const metaByRoute: Array<{ test: (p: string) => boolean; meta: MetaConfig }> = [
  {
    test: (p) => p === '/',
    meta: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
  },
  {
    test: (p) => p.startsWith('/start'),
    meta: {
      title: 'Start Here | Pharaoh B',
      description: 'New here? Start with a clear plan for focus, discipline, confidence, and purpose.',
    },
  },
  {
    test: (p) => p === '/about',
    meta: {
      title: 'About | Pharaoh B',
      description: 'Learn the mission and approach behind Pharaoh B: practical frameworks for clearer thinking and meaningful work.',
    },
  },
  {
    test: (p) => p.startsWith('/articles'),
    meta: {
      title: 'Articles | Pharaoh B',
      description: 'Problem-first articles on overthinking, discipline, direction, creativity, and practical personal growth.',
    },
  },
  {
    test: (p) => p.startsWith('/books'),
    meta: {
      title: 'Books | Pharaoh B',
      description: 'Books on mindset, discipline, focus, and personal growth with practical frameworks you can use daily.',
    },
  },
  {
    test: (p) => p.startsWith('/writings'),
    meta: {
      title: 'Writings | Pharaoh B',
      description: 'Essays and poems for overthinking, motivation, discipline, and building a meaningful life.',
    },
  },
  {
    test: (p) => p.startsWith('/music'),
    meta: {
      title: 'Music | Pharaoh B',
      description: 'Music, frequencies, and spoken-word releases designed for focus, reset, and creative momentum.',
    },
  },
  {
    test: (p) => p.startsWith('/art'),
    meta: {
      title: 'Art | Pharaoh B',
      description: 'Original visual collections and print editions from Pharaoh B.',
    },
  },
  {
    test: (p) => p.startsWith('/library'),
    meta: {
      title: 'Library | Pharaoh B',
      description: 'Library of core books and long-form frameworks for clarity, decision-making, and execution.',
    },
  },
  {
    test: (p) => p.startsWith('/media'),
    meta: {
      title: 'Media | Pharaoh B',
      description: 'Audio and video for focus, confidence, consistency, and real-world growth.',
    },
  },
  {
    test: (p) => p.startsWith('/creative'),
    meta: {
      title: 'Creative | Pharaoh B',
      description: 'Explore poetry, music, art, and media in one creative discovery hub.',
    },
  },
  {
    test: (p) => p.startsWith('/resources'),
    meta: {
      title: 'Resources | Pharaoh B',
      description: 'Curated books, references, thinking tools, and practical resources for creators and builders.',
    },
  },
  {
    test: (p) => p.startsWith('/search'),
    meta: {
      title: 'Search | Pharaoh B',
      description: 'Search the library across articles, books, writings, media, and creative work.',
    },
  },
  {
    test: (p) => p.startsWith('/think-clearly'),
    meta: {
      title: 'Think Clearly | Pharaoh B',
      description: 'Reduce overthinking, improve decisions, and move from mental loops to clear execution.',
    },
  },
  {
    test: (p) => p.startsWith('/build-discipline'),
    meta: {
      title: 'Build Discipline | Pharaoh B',
      description: 'Create consistency and follow-through with practical systems for discipline and action.',
    },
  },
  {
    test: (p) => p.startsWith('/find-direction'),
    meta: {
      title: 'Find Direction | Pharaoh B',
      description: 'Clarify your path, reset priorities, and move toward meaningful work with confidence.',
    },
  },
  {
    test: (p) => p.startsWith('/creative-expression'),
    meta: {
      title: 'Creative Expression | Pharaoh B',
      description: 'Use writing, music, and art to turn insight into expression and output.',
    },
  },
  {
    test: (p) => p.startsWith('/study-guides'),
    meta: {
      title: 'Study Guides | Pharaoh B',
      description: 'Study guides with summaries, key ideas, exercises, and practical implementation notes.',
    },
  },
  {
    test: (p) => p.startsWith('/first-100'),
    meta: {
      title: 'First 100 Pages | Pharaoh B',
      description: 'Browse the first 100-page architecture across clarity, discipline, direction, books, and creative work.',
    },
  },
  {
    test: (p) => p.startsWith('/books-and-tools'),
    meta: {
      title: 'Books and Tools | Pharaoh B',
      description: 'Discover curated books, references, and practical tools for thinking and creating.',
    },
  },
  {
    test: (p) => p.startsWith('/shop'),
    meta: {
      title: 'Shop | Pharaoh B',
      description: 'Browse books, prints, and curated products from Pharaoh B.',
    },
  },
  {
    test: (p) => p.startsWith('/news'),
    meta: {
      title: 'Legacy Articles URL | Pharaoh B',
      description: 'Legacy articles route. Use /articles for canonical indexing.',
      noindex: true,
    },
  },
  {
    test: (p) => p.startsWith('/contact'),
    meta: {
      title: 'Contact | Pharaoh B',
      description: 'Contact Pharaoh B for collaborations, inquiries, and opportunities.',
    },
  },
  {
    test: (p) => p.startsWith('/privacy'),
    meta: {
      title: 'Privacy Policy | Pharaoh B',
      description: 'Privacy policy for PharaohB.com.',
      noindex: true,
    },
  },
  {
    test: (p) => p.startsWith('/terms'),
    meta: {
      title: 'Terms of Service | Pharaoh B',
      description: 'Terms of service for PharaohB.com.',
      noindex: true,
    },
  },
];

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function toTitleCase(segment: string): string {
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function routeLabel(pathname: string): string {
  if (pathname === '/') return 'Home';
  const map: Record<string, string> = {
    start: 'Start Here',
    articles: 'Articles',
    books: 'Books',
    writings: 'Writings',
    music: 'Music',
    art: 'Art',
    library: 'Library',
    media: 'Media',
    creative: 'Creative',
    resources: 'Resources',
    search: 'Search',
    'think-clearly': 'Think Clearly',
    'build-discipline': 'Build Discipline',
    'find-direction': 'Find Direction',
    'creative-expression': 'Creative Expression',
    'books-and-tools': 'Books and Tools',
    shop: 'Shop',
    contact: 'Contact',
    news: 'News',
    privacy: 'Privacy',
    terms: 'Terms',
  };
  const parts = pathname.split('/').filter(Boolean);
  const segment = parts[parts.length - 1] || '';
  return map[segment] ?? toTitleCase(segment);
}

function upsertJsonLd(id: string, payload: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(payload);
}

export function RouteMeta() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const meta =
      metaByRoute.find((item) => item.test(pathname))?.meta ?? {
        title: `${routeLabel(pathname)} | ${SITE_NAME}`,
        description: DEFAULT_DESCRIPTION,
      };

    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname}`;

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);

    upsertLink('canonical', canonicalUrl);

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: routeLabel(pathname),
      url: canonicalUrl,
      description: meta.description,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: origin,
      },
    };
    upsertJsonLd('route-webpage-jsonld', webPageSchema);

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      ...segments.map((seg, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: routeLabel('/' + segments.slice(0, idx + 1).join('/')),
        item: `${origin}/${segments.slice(0, idx + 1).join('/')}`,
      })),
    ];
    upsertJsonLd('route-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });
  }, [location.pathname]);

  return null;
}

export default RouteMeta;
