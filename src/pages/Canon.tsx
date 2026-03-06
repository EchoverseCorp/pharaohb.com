import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { books } from '@/data/books';
import { cn } from '@/lib/utils';
import { JsonLd } from '@/components/shared/JsonLd';
import { useMemo, useState } from 'react';
import { inferNeedPathFromText, needPaths, NeedPathKey } from '@/data/discoveryPaths';

const Canon = () => {
  const [query, setQuery] = useState('');
  const [needFilter, setNeedFilter] = useState<'all' | NeedPathKey>('all');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pharaoh B Library',
    itemListElement: books.map((book, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Book',
        name: book.title,
        description: book.description,
        url: `/library/${book.slug}`,
      },
    })),
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const need = inferNeedPathFromText(`${book.title} ${book.subtitle} ${book.description}`).key;
      if (needFilter !== 'all' && needFilter !== need) return false;
      if (!query.trim()) return true;
      const hay = `${book.title} ${book.subtitle} ${book.description}`.toLowerCase();
      return hay.includes(query.trim().toLowerCase());
    });
  }, [needFilter, query]);

  return (
    <PageLayout>
      <JsonLd data={itemListSchema} />
      <PageHeader 
        title="Library"
        subtitle="Core books and long-form frameworks"
        orientationText="If you are new here, start with one book and apply it for 30 days."
      />

      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-cormorant text-xl text-muted-foreground">
            The Library gathers the deeper foundations of the project: long-form essays, study guides, and texts worth revisiting over time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-6">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the library: clarity, discipline, purpose..."
            className="w-full bg-card border border-primary/30 px-4 py-3 text-foreground font-cormorant text-lg focus:outline-none focus:border-primary"
          />
        </div>

        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setNeedFilter('all')}
            className={`px-3 py-2 border font-cinzel text-[10px] tracking-[0.18em] uppercase transition-colors ${
              needFilter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/30 text-primary'
            }`}
          >
            All Paths
          </button>
          {needPaths.map((path) => (
            <button
              key={path.key}
              onClick={() => setNeedFilter(path.key)}
              className={`px-3 py-2 border font-cinzel text-[10px] tracking-[0.18em] uppercase transition-colors ${
                needFilter === path.key ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/30 text-primary'
              }`}
            >
              {path.label}
            </button>
          ))}
        </div>

        <p className="max-w-5xl mx-auto font-cormorant text-muted-foreground mb-6">
          Showing {filteredBooks.length} book{filteredBooks.length === 1 ? '' : 's'}
        </p>
        {/* Books grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {filteredBooks.map((book) => {
            const path = inferNeedPathFromText(`${book.title} ${book.subtitle} ${book.description}`);
            return (
              <div
                key={book.slug}
                className={cn(
                  'group relative bg-card border border-border hover:border-primary/50 transition-all duration-500',
                  'transform hover:-translate-y-2'
                )}
              >
                {/* Book cover */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Book info */}
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">Book</span>
                    <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/50">•</span>
                    <Link
                      to={path.href}
                      className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/80 hover:text-primary"
                    >
                      {path.label}
                    </Link>
                  </div>
                  <h3 className="font-cinzel text-xl text-foreground group-hover:text-gold-gradient transition-colors">
                    {book.title}
                  </h3>
                  <p className="font-cormorant text-sm text-primary italic">{book.subtitle}</p>
                  <p className="font-cormorant text-muted-foreground text-sm leading-relaxed line-clamp-2">{book.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="font-cinzel text-xl text-primary">{book.price}</span>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link to={`/library/${book.slug}`}>Open Book</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto border border-primary/20 bg-card p-6 mt-10">
          <h2 className="font-cinzel text-lg text-foreground mb-2">Library Discovery Paths</h2>
          <p className="font-cormorant text-muted-foreground mb-4">
            Use these paths to move from a single book to related essays, media, and practical tools.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {needPaths.map((path) => (
              <Link key={path.key} to={path.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
                <p className="font-cormorant text-base text-foreground mt-1">{path.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Canon;
