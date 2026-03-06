import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { JsonLd } from '@/components/shared/JsonLd';
import { needPaths, NeedPathKey } from '@/data/discoveryPaths';
import { buildDefaultContentIndex, ContentFormat, ContentIndexItem, loadContentIndex } from '@/data/contentGraph';

const Search = () => {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ContentIndexItem['type']>('all');
  const [needFilter, setNeedFilter] = useState<'all' | NeedPathKey>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | ContentFormat>('all');
  const [searchIndex, setSearchIndex] = useState<ContentIndexItem[]>(() => buildDefaultContentIndex());
  const [indexSource, setIndexSource] = useState<'external' | 'bundled'>('bundled');

  useEffect(() => {
    let cancelled = false;
    loadContentIndex().then(({ source, items }) => {
      if (!cancelled) {
        setIndexSource(source);
        setSearchIndex(items);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchIndex
      .filter((item) => {
        if (typeFilter !== 'all' && item.type !== typeFilter) return false;
        if (needFilter !== 'all' && item.need !== needFilter) return false;
        if (formatFilter !== 'all' && item.format !== formatFilter) return false;
        if (!q) return true;
        return `${item.title} ${item.snippet} ${item.need} ${item.format}`.toLowerCase().includes(q);
      })
      .sort((a, b) => {
        const priorityDelta = (b.priority || 0) - (a.priority || 0);
        if (!q) return priorityDelta;
        const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
        const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
        if (bTitle !== aTitle) return bTitle - aTitle;
        return priorityDelta;
      })
      .slice(0, 80);
  }, [formatFilter, needFilter, query, typeFilter, searchIndex]);

  const typeCounts = useMemo(() => {
    return searchIndex.reduce(
      (acc, item) => {
        acc[item.type] += 1;
        return acc;
      },
      { article: 0, writing: 0, book: 0, art: 0, media: 0 }
    );
  }, [searchIndex]);

  const formatCounts = useMemo(() => {
    return searchIndex.reduce<Record<ContentFormat, number>>(
      (acc, item) => {
        acc[item.format] += 1;
        return acc;
      },
      {
        essay: 0,
        poetry: 0,
        music: 0,
        frequency: 0,
        meditation: 0,
        audiobook: 0,
        'spoken-word': 0,
        teaching: 0,
        book: 0,
        art: 0,
        other: 0,
      }
    );
  }, [searchIndex]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: 'Search',
    description: 'Search across articles, books, writings, art, and media.',
    url: '/search',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="Search"
        subtitle="Find value fast"
        orientationText="Search across articles, library entries, writings, media, and creative work."
      />

      <SectionContainer>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: overthinking, discipline, purpose, focus, writing..."
              className="w-full bg-card border border-primary/30 px-4 py-3 text-foreground font-cormorant text-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-5">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                typeFilter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
              }`}
            >
              All Types
            </button>
            {(['article', 'writing', 'book', 'art', 'media'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                  typeFilter === type ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
                }`}
              >
                {type} ({typeCounts[type]})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setNeedFilter('all')}
              className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                needFilter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
              }`}
            >
              All Needs
            </button>
            {needPaths.map((path) => (
              <button
                key={path.key}
                onClick={() => setNeedFilter(path.key)}
                className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                  needFilter === path.key ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
                }`}
              >
                {path.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              onClick={() => setFormatFilter('all')}
              className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                formatFilter === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
              }`}
            >
              All Formats
            </button>
            {(['music', 'frequency', 'meditation', 'audiobook', 'poetry', 'spoken-word', 'teaching', 'essay', 'book', 'art'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setFormatFilter(format)}
                className={`px-3 py-2 font-cinzel text-[10px] tracking-[0.16em] uppercase border transition-colors ${
                  formatFilter === format ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/30 text-primary'
                }`}
              >
                {format.replace('-', ' ')} ({formatCounts[format]})
              </button>
            ))}
          </div>

          <p className="font-cormorant text-muted-foreground mb-6">
            Showing {results.length} result{results.length === 1 ? '' : 's'}
          </p>
          <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/60 mb-6">
            Index source: {indexSource === 'external' ? 'External content pack' : 'Bundled starter dataset'}
          </p>

          <div className="space-y-3 mb-10">
            {results.map((item) => (
              <Link key={`${item.type}-${item.href}-${item.title}`} to={item.href} className="block border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">{item.type}</span>
                  <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/50">•</span>
                  <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">{item.format.replace('-', ' ')}</span>
                  <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/50">•</span>
                  <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">
                    {needPaths.find((path) => path.key === item.need)?.label || 'Need'}
                  </span>
                </div>
                <h3 className="font-cinzel text-lg text-foreground mt-1">{item.title}</h3>
                <p className="font-cormorant text-muted-foreground line-clamp-2">{item.snippet}</p>
              </Link>
            ))}
            {results.length === 0 && (
              <div className="border border-primary/20 bg-card p-6">
                <h3 className="font-cinzel text-lg text-foreground mb-2">No direct matches found</h3>
                <p className="font-cormorant text-muted-foreground mb-4">
                  Try broader terms like overthinking, discipline, purpose, poetry, books, or frequencies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/start" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-[10px] tracking-[0.16em] uppercase">
                    Start Here
                  </Link>
                  <Link to="/articles" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-[10px] tracking-[0.16em] uppercase">
                    Articles
                  </Link>
                  <Link to="/library" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-[10px] tracking-[0.16em] uppercase">
                    Library
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="border border-primary/20 bg-card p-6">
            <h3 className="font-cinzel text-lg text-foreground mb-2">Need-Based Pathways</h3>
            <p className="font-cormorant text-muted-foreground mb-4">
              If you are not sure what to search next, choose the path that matches what you are trying to solve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {needPaths.map((path) => (
                <Link key={path.key} to={path.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
                  <p className="font-cormorant text-foreground text-base mt-1">{path.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Search;
