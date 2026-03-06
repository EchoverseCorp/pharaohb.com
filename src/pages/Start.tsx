import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { JsonLd } from '@/components/shared/JsonLd';
import { pillars } from '@/data/pillars';
import { blogPosts } from '@/data/blogPosts';

const Start = () => {
  const starterArticles = blogPosts
    .slice()
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Start Here',
    description:
      'Problem-first onboarding to help visitors think clearly, build discipline, find direction, and discover books and tools.',
    url: '/start',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="Start Here"
        subtitle="Find value in under 10 minutes"
        orientationText="Choose one path, read one useful piece, and apply it this week."
      />

      <SectionContainer>
        <div className="max-w-6xl mx-auto space-y-14">
          <section>
            <h2 className="font-cinzel text-2xl text-gold-gradient text-center mb-3">Featured Paths</h2>
            <p className="font-cormorant text-lg text-muted-foreground text-center mb-6 max-w-3xl mx-auto">
              Start with the question you are carrying, then follow one path deeply before switching.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  to={`/${pillar.slug}`}
                  className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors"
                >
                  <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
                  <p className="font-cormorant text-base text-foreground mt-1">{pillar.title}</p>
                  <p className="font-cormorant text-sm text-muted-foreground mt-2 line-clamp-2">{pillar.subtitle}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="border border-primary/20 bg-card p-6 md:p-8">
            <h2 className="font-cinzel text-xl text-foreground mb-4">Use This Sequence</h2>
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <li className="border border-border p-4">
                <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 mb-2">Step 1</p>
                <p className="font-cormorant text-foreground">Choose one path that matches your current need.</p>
              </li>
              <li className="border border-border p-4">
                <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 mb-2">Step 2</p>
                <p className="font-cormorant text-foreground">Read one article and write down what you will apply.</p>
              </li>
              <li className="border border-border p-4">
                <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 mb-2">Step 3</p>
                <p className="font-cormorant text-foreground">Open one book or study guide for deeper context.</p>
              </li>
              <li className="border border-border p-4">
                <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 mb-2">Step 4</p>
                <p className="font-cormorant text-foreground">Apply for 7 days, review, then continue.</p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-gold-gradient text-center mb-6">Popular Starting Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {starterArticles.map((post) => (
                <Link
                  key={post.slug}
                  to={`/articles/${post.slug}`}
                  className="border border-border bg-card p-5 hover:border-primary/50 transition-colors"
                >
                  <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">{post.category}</p>
                  <h3 className="font-cinzel text-xl text-foreground mt-2 mb-2">{post.title}</h3>
                  <p className="font-cormorant text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  <p className="font-cinzel text-xs tracking-widest text-primary mt-4 uppercase">Read →</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cinzel text-2xl text-gold-gradient text-center mb-6">Explore The Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link to="/articles" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Read</p>
                <p className="font-cormorant text-base text-foreground mt-1">Articles</p>
              </Link>
              <Link to="/library" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Study</p>
                <p className="font-cormorant text-base text-foreground mt-1">Library</p>
              </Link>
              <Link to="/creative" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Create</p>
                <p className="font-cormorant text-base text-foreground mt-1">Creative</p>
              </Link>
              <Link to="/resources" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
                <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Use</p>
                <p className="font-cormorant text-base text-foreground mt-1">Books & Tools</p>
              </Link>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-cinzel text-xs tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Search Everything
                <span>→</span>
              </Link>
            </div>
          </section>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Start;
