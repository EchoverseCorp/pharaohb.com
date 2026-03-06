import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { ArrowLeft } from 'lucide-react';
import { getWritingBySlug, writings } from '@/data/writings';
import { inferNeedPathFromText } from '@/data/discoveryPaths';
import { blogPosts } from '@/data/blogPosts';
import { books } from '@/data/books';

const WritingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const writing = getWritingBySlug(slug || '');

  if (!writing) {
    return (
      <PageLayout>
        <SectionContainer className="pt-32">
          <div className="text-center">
            <h1 className="font-cinzel text-3xl text-foreground mb-4">Writing Not Found</h1>
            <Link to="/writings" className="text-primary hover:underline">
              Return to Writings
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  const relatedPath = inferNeedPathFromText(`${writing.title} ${writing.excerpt} ${writing.content.join(' ')}`);
  const relatedArticles = blogPosts
    .filter((post) =>
      `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(relatedPath.key.split('-')[0])
    )
    .slice(0, 2);
  const fallbackArticles = relatedArticles.length > 0 ? relatedArticles : blogPosts.slice(0, 2);
  const relatedWritings = writings
    .filter((item) => item.slug !== writing.slug)
    .filter((item) =>
      `${item.title} ${item.excerpt}`.toLowerCase().includes(relatedPath.key.split('-')[0])
    )
    .slice(0, 2);
  const fallbackWritings = relatedWritings.length > 0 ? relatedWritings : writings.filter((item) => item.slug !== writing.slug).slice(0, 2);
  const relatedBooks = books
    .filter((book) =>
      `${book.title} ${book.subtitle} ${book.description}`.toLowerCase().includes(relatedPath.key.split('-')[0])
    )
    .slice(0, 2);
  const fallbackBooks = relatedBooks.length > 0 ? relatedBooks : books.slice(0, 2);

  return (
    <PageLayout>
      <SectionContainer className="pt-32">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/writings"
            className="inline-flex items-center gap-2 font-cinzel text-sm text-muted-foreground hover:text-primary transition-colors mb-12 py-2 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Writings
          </Link>

          {/* Header */}
          <header className="text-center mb-16">
            <time className="font-cormorant text-sm text-primary/70 italic block mb-4">
              {writing.date}
            </time>
            <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-gold-gradient leading-tight">
              {writing.title}
            </h1>
          </header>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-16 h-px bg-primary/30" />
            <span className="text-primary/50">◆</span>
            <div className="w-16 h-px bg-primary/30" />
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            {writing.content.map((paragraph, index) => (
              <p
                key={index}
                className="font-cormorant text-xl text-foreground/90 leading-relaxed mb-8"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Footer divider */}
          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="w-16 h-px bg-primary/30" />
            <span className="text-primary/50">◆</span>
            <div className="w-16 h-px bg-primary/30" />
          </div>

          <div className="mt-12 border border-primary/20 bg-card p-6">
            <h2 className="font-cinzel text-xl text-foreground mb-3">Explore This Path</h2>
            <p className="font-cormorant text-muted-foreground mb-5">
              Best-fit path for this writing: <span className="text-foreground">{relatedPath.label}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Link to={relatedPath.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
                <p className="font-cormorant text-base text-foreground mt-1">{relatedPath.label}</p>
              </Link>
              <Link to="/resources" className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Resources</p>
                <p className="font-cormorant text-base text-foreground mt-1">Open knowledge map</p>
              </Link>
              <Link to="/search" className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Search</p>
                <p className="font-cormorant text-base text-foreground mt-1">Find connected works</p>
              </Link>
            </div>

            <h3 className="font-cinzel text-sm tracking-widest uppercase text-primary/80 mb-3">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fallbackArticles.map((article) => (
                <Link key={article.slug} to={`/articles/${article.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-sm text-foreground">{article.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                </Link>
              ))}
            </div>

            <h3 className="font-cinzel text-sm tracking-widest uppercase text-primary/80 mb-3">Related Writings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fallbackWritings.map((item) => (
                <Link key={item.slug} to={`/writings/${item.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-sm text-foreground">{item.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>

            <h3 className="font-cinzel text-sm tracking-widest uppercase text-primary/80 mb-3">Related Books</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fallbackBooks.map((book) => (
                <Link key={book.slug} to={`/library/${book.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-sm text-foreground">{book.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{book.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default WritingDetail;
