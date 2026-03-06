import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getBookBySlug } from '@/data/books';
import { inferNeedPathFromText } from '@/data/discoveryPaths';
import { blogPosts } from '@/data/blogPosts';

const CanonDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = getBookBySlug(slug || '');

  if (!book) {
    return (
      <PageLayout>
        <SectionContainer className="pt-32">
          <div className="text-center">
            <h1 className="font-cinzel text-3xl text-foreground mb-4">Book Not Found</h1>
            <Link to="/library" className="text-primary hover:underline">
              Return to Library
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  const relatedPath = inferNeedPathFromText(`${book.title} ${book.subtitle} ${book.description}`);
  const relatedArticles = blogPosts
    .filter((post) =>
      `${post.title} ${post.excerpt} ${post.tags.join(' ')}`
        .toLowerCase()
        .includes(relatedPath.key.replace('-', ' '))
    )
    .slice(0, 2);

  const fallbackArticles = relatedArticles.length > 0 ? relatedArticles : blogPosts.slice(0, 2);

  return (
    <PageLayout>
      <SectionContainer className="pt-32">
        <Link
          to="/library"
          className="inline-flex items-center gap-2 font-cinzel text-sm text-muted-foreground hover:text-primary transition-colors mb-8 py-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Library
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Book Cover */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden border border-border">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative corners - hidden on mobile */}
            <div className="hidden sm:block absolute -top-3 -left-3 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-t-2 border-primary" />
            <div className="hidden sm:block absolute -top-3 -right-3 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-t-2 border-primary" />
            <div className="hidden sm:block absolute -bottom-3 -left-3 w-8 sm:w-12 h-8 sm:h-12 border-l-2 border-b-2 border-primary" />
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-8 sm:w-12 h-8 sm:h-12 border-r-2 border-b-2 border-primary" />
          </div>

          {/* Book Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-2">
                {book.title}
              </h1>
              <p className="font-cormorant text-xl text-primary italic">
                {book.subtitle}
              </p>
            </div>

            <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
              {book.description}
            </p>

            <div className="py-6 border-y border-border">
              <span className="font-cinzel text-3xl text-primary">{book.price}</span>
            </div>

            <Button
              size="lg"
              className="w-full font-cinzel tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Purchase Now
            </Button>
          </div>
        </div>

        {/* Excerpt Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="font-cinzel text-2xl text-gold-gradient mb-8 text-center">
            Excerpt
          </h2>
          <blockquote className="font-cormorant text-xl text-foreground/90 leading-relaxed italic border-l-2 border-primary pl-8">
            {book.excerpt}
          </blockquote>
        </div>

        <div className="max-w-6xl mx-auto mt-16 border border-primary/20 bg-card p-6">
          <h2 className="font-cinzel text-xl text-foreground mb-3">Continue This Path</h2>
          <p className="font-cormorant text-muted-foreground mb-5">
            Best matching path for this book: <span className="text-foreground">{relatedPath.label}</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to={relatedPath.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
              <p className="font-cormorant text-base text-foreground mt-1">{relatedPath.label}</p>
            </Link>
            <Link to="/resources" className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Next</p>
              <p className="font-cormorant text-base text-foreground mt-1">Open Resources Hub</p>
            </Link>
            <Link to="/search" className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Explore</p>
              <p className="font-cormorant text-base text-foreground mt-1">Search Related Content</p>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {fallbackArticles.map((article) => (
              <Link key={article.slug} to={`/articles/${article.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Article</p>
                <p className="font-cinzel text-sm text-foreground mt-1">{article.title}</p>
                <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default CanonDetail;
