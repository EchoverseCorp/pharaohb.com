import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { books as libraryBooks } from '@/data/books';
import { JsonLd } from '@/components/shared/JsonLd';
import { blogPosts } from '@/data/blogPosts';
import { needPaths } from '@/data/discoveryPaths';
import { getFirst100Section } from '@/data/first100Content';

const resources = [
  {
    title: 'Recommended Books',
    description: 'Influential reading for decision-making, discipline, and clarity.',
    cta: 'Browse Library',
    href: '/library',
  },
  {
    title: 'Thinking Tools',
    description: 'Frameworks and reference ideas to improve daily choices.',
    cta: 'Read Articles',
    href: '/articles',
  },
  {
    title: 'Creator Toolkit',
    description: 'Writing, media, and creative resources for publishing consistently.',
    cta: 'Open Creative',
    href: '/creative',
  },
  {
    title: 'Books and Product Extensions',
    description: 'Physical and digital offerings tied to the core ideas.',
    cta: 'Visit Shop',
    href: '/shop',
  },
];

const Resources = () => {
  const topArticles = blogPosts.slice(0, 6);
  const mappedResources = getFirst100Section('resources')?.entries || [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resources',
    description: 'Curated resources: books, thinking tools, creative systems, and recommendations.',
    url: '/resources',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="Resources"
        subtitle="Curated knowledge archive"
        orientationText="Books, frameworks, and practical tools for thinking and creating."
      />

      <SectionContainer>
        <div className="max-w-6xl mx-auto border border-primary/20 bg-card p-6 mb-8">
          <h2 className="font-cinzel text-xl text-foreground mb-2">Knowledge Map</h2>
          <p className="font-cormorant text-muted-foreground mb-5">
            Choose a path based on what you are trying to solve. Each path connects articles, library entries, and practical tools.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {needPaths.map((path) => (
              <Link key={path.key} to={path.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Path</p>
                <p className="font-cormorant text-base text-foreground mt-1">{path.label}</p>
                <p className="font-cormorant text-sm text-muted-foreground mt-2">{path.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.href}
              className="border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <h2 className="font-cinzel text-xl text-foreground mb-2">{resource.title}</h2>
              <p className="font-cormorant text-muted-foreground">{resource.description}</p>
              <p className="font-cinzel text-xs tracking-widest text-primary mt-4 uppercase">{resource.cta} →</p>
            </Link>
          ))}
        </div>

        <div className="max-w-6xl mx-auto border border-primary/20 bg-card p-6">
          <h3 className="font-cinzel text-lg text-foreground mb-4">Featured Library Entries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {libraryBooks.slice(0, 4).map((book) => (
              <Link key={book.slug} to={`/library/${book.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-sm text-foreground">{book.title}</p>
                <p className="font-cormorant text-sm text-muted-foreground mt-1 line-clamp-2">{book.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto border border-primary/20 bg-card p-6 mt-8">
          <h3 className="font-cinzel text-lg text-foreground mb-3">High-Intent Starting Articles</h3>
          <p className="font-cormorant text-muted-foreground mb-5">
            These pages answer common search intent, then lead readers deeper into books, media, and tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topArticles.map((post) => (
              <Link key={post.slug} to={`/articles/${post.slug}`} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">{post.category}</p>
                <p className="font-cinzel text-sm text-foreground mt-1">{post.title}</p>
                <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto border border-primary/20 bg-card p-6 mt-8">
          <h3 className="font-cinzel text-lg text-foreground mb-3">Tools and Recommendations</h3>
          <p className="font-cormorant text-muted-foreground mb-5">
            Commerce lives downstream of content. These recommendations are curated as practical extensions of the ideas on this site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/books-and-tools" className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-sm text-foreground">Books and Thinking Tools</p>
              <p className="font-cormorant text-sm text-muted-foreground mt-1">Curated references and practical systems.</p>
            </Link>
            <Link to="/shop" className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-sm text-foreground">Creative Products</p>
              <p className="font-cormorant text-sm text-muted-foreground mt-1">Art, apparel, and merchandise linked to core themes.</p>
            </Link>
            <Link to="/contact" className="border border-border p-4 hover:border-primary/50 transition-colors">
              <p className="font-cinzel text-sm text-foreground">Affiliate + Partner Resources</p>
              <p className="font-cormorant text-sm text-muted-foreground mt-1">Amazon Associates and external recommendations.</p>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border border-primary/20 bg-card p-6 mt-8">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h3 className="font-cinzel text-lg text-foreground">Mapped Resource Pages</h3>
            <Link to="/first-100" className="font-cinzel text-xs tracking-wider uppercase text-primary">
              Open Full Map →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mappedResources.slice(0, 10).map((entry) => (
              <Link key={entry.slug} to={entry.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                <p className="font-cormorant text-foreground">{entry.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Resources;
