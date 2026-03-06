import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import brandSymbol from '@/assets/brand-symbol.png';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import { useEffect } from 'react';
import { inferNeedPathFromText } from '@/data/discoveryPaths';
import { writings } from '@/data/writings';
import { books } from '@/data/books';

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getPostBySlug(slug || '');

  // Redirect to 404 if article not found
  useEffect(() => {
    if (slug && !article) {
      navigate('/articles', { replace: true });
    }
  }, [slug, article, navigate]);

  if (!article) {
    return null;
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = blogPosts
    .filter(post => post.category === article.category && post.slug !== article.slug)
    .slice(0, 2);
  const relatedPath = inferNeedPathFromText(`${article.title} ${article.excerpt} ${article.tags.join(' ')}`);
  const relatedWritings = writings
    .filter((writing) =>
      `${writing.title} ${writing.excerpt}`.toLowerCase().includes(relatedPath.key.split('-')[0])
    )
    .slice(0, 2);
  const fallbackWritings = relatedWritings.length > 0 ? relatedWritings : writings.slice(0, 2);
  const relatedBooks = books
    .filter((book) =>
      `${book.title} ${book.subtitle} ${book.description}`.toLowerCase().includes(relatedPath.key.split('-')[0])
    )
    .slice(0, 2);
  const fallbackBooks = relatedBooks.length > 0 ? relatedBooks : books.slice(0, 2);

  return (
    <PageLayout>
      {/* SEO: These would typically be handled by react-helmet */}
      {/* <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://pharaohb.com/articles/${article.slug}`} />
      </Helmet> */}

      <SectionContainer className="pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 font-cinzel text-sm text-muted-foreground hover:text-primary transition-colors mb-8 py-2 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <span className="font-cinzel text-xs tracking-widest text-primary/60 uppercase">
              {article.category}
            </span>
            <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-gold-gradient mt-3 mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap mb-4">
              <span className="font-cormorant text-muted-foreground italic">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary/80 font-cinzel tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Egyptian divider */}
            <div className="egyptian-divider max-w-xs">
              <img src={brandSymbol} alt="Pharaoh B. Symbol" className="w-8 h-8 object-contain" />
            </div>
          </header>

          {/* Featured YouTube Video */}
          {article.youtubeEmbed && (
            <div className="mb-12">
              <div className="aspect-video bg-black/50 border border-border overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${article.youtubeEmbed}`}
                  title="Related Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="font-cormorant text-sm text-muted-foreground italic mt-2 text-center">
                Watch the related transmission above
              </p>
            </div>
          )}

          {/* Article Content */}
          <article
            className="prose prose-invert prose-gold max-w-none font-cormorant text-lg leading-relaxed
              prose-headings:font-cinzel prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:mb-6 prose-p:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-primary/80
              prose-ul:my-6 prose-ul:text-muted-foreground
              prose-ol:my-6 prose-ol:text-muted-foreground
              prose-li:mb-2
              prose-table:border-border prose-th:font-cinzel prose-th:text-foreground
              [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Related YouTube Links */}
          {article.youtubeLinks && article.youtubeLinks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-cinzel text-lg text-foreground mb-6">Related Transmissions</h3>
              <div className="grid gap-4">
                {article.youtubeLinks.map(video => (
                  <a
                    key={video.id}
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <span className="font-cinzel text-sm text-foreground group-hover:text-primary transition-colors">
                        {video.title}
                      </span>
                      <span className="block font-cormorant text-xs text-muted-foreground mt-1">
                        Watch on YouTube
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-cinzel text-lg text-foreground mb-6">Continue Reading</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedArticles.map(post => (
                  <Link
                    key={post.slug}
                    to={`/articles/${post.slug}`}
                    className="p-4 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300 group"
                  >
                    <span className="font-cinzel text-xs tracking-widest text-primary/60 uppercase">
                      {post.category}
                    </span>
                    <h4 className="font-cinzel text-sm text-foreground group-hover:text-primary transition-colors mt-2">
                      {post.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="font-cinzel text-lg text-foreground mb-3">Explore This Path</h3>
            <p className="font-cormorant text-muted-foreground mb-5">
              Best-fit path for this article: <span className="text-foreground">{relatedPath.label}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link to={relatedPath.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
                <p className="font-cormorant text-base text-foreground mt-1">{relatedPath.label}</p>
              </Link>
              <Link to="/search" className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Search</p>
                <p className="font-cormorant text-base text-foreground mt-1">Find related ideas</p>
              </Link>
            </div>

            <h4 className="font-cinzel text-sm text-primary/80 tracking-widest uppercase mb-3">Related Writings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fallbackWritings.map((writing) => (
                <Link key={writing.slug} to={`/writings/${writing.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-sm text-foreground">{writing.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{writing.excerpt}</p>
                </Link>
              ))}
            </div>

            <h4 className="font-cinzel text-sm text-primary/80 tracking-widest uppercase mb-3">Related Books</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fallbackBooks.map((book) => (
                <Link key={book.slug} to={`/library/${book.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cinzel text-sm text-foreground">{book.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{book.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer navigation */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 font-cinzel text-sm text-muted-foreground hover:text-primary transition-colors py-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to all articles
            </Link>
          </footer>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default NewsArticle;
