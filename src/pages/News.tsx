import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Link } from 'react-router-dom';
import { blogPosts, getFeaturedPosts, getAllCategories } from '@/data/blogPosts';
import { useState } from 'react';
import { JsonLd } from '@/components/shared/JsonLd';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...getAllCategories()];

  const featuredPosts = getFeaturedPosts();
  const featuredPost = featuredPosts[0];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const articleListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pharaoh B Articles',
    itemListElement: filteredPosts.slice(0, 30).map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Article',
        name: post.title,
        description: post.excerpt,
        url: `/articles/${post.slug}`,
      },
    })),
  };

  return (
    <PageLayout>
      <JsonLd data={articleListSchema} />
      <PageHeader
        title="Articles"
        subtitle="Ideas you can apply in real life"
        orientationText="Explore by problem first, then go deeper by topic."
      />

      <SectionContainer>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
            <Link to="/think-clearly" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Problem</p>
              <p className="font-cormorant text-base text-foreground mt-1">Overthinking</p>
            </Link>
            <Link to="/build-discipline" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Problem</p>
              <p className="font-cormorant text-base text-foreground mt-1">Discipline</p>
            </Link>
            <Link to="/find-direction" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Problem</p>
              <p className="font-cormorant text-base text-foreground mt-1">Direction</p>
            </Link>
            <Link to="/creative-expression" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Problem</p>
              <p className="font-cormorant text-base text-foreground mt-1">Expression</p>
            </Link>
            <Link to="/books-and-tools" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Books & Tools</p>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-cinzel text-xs tracking-widest uppercase transition-all duration-300 min-h-[44px] ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === 'all' && (
            <div className="mb-16">
              <Link
                to={`/articles/${featuredPost.slug}`}
                className="group block p-8 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-cinzel text-xs tracking-widest text-primary uppercase">
                    Featured
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-cinzel text-xs tracking-widest text-primary/60 uppercase">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-cinzel text-2xl md:text-3xl text-foreground group-hover:text-gold-gradient mt-3 mb-4 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="font-cormorant text-lg text-muted-foreground mb-4">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-cormorant text-sm text-muted-foreground italic">
                    {new Date(featuredPost.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <div className="flex gap-2">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary/80 font-cinzel tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts
              .filter(post => selectedCategory !== 'all' || !post.featured || post !== featuredPost)
              .map((post) => (
              <Link
                key={post.slug}
                to={`/articles/${post.slug}`}
                className="group p-6 border border-border hover:border-primary/50 bg-card/50 transition-all duration-300"
              >
                <span className="font-cinzel text-xs tracking-widest text-primary/60 uppercase">
                  {post.category}
                </span>
                <h3 className="font-cinzel text-lg text-foreground group-hover:text-gold-gradient mt-2 mb-3 transition-colors">
                  {post.title}
                </h3>
                <p className="font-cormorant text-muted-foreground mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-sm text-muted-foreground italic">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-xs text-primary/60 font-cinzel tracking-wider">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* SEO Text */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="font-cormorant text-center text-muted-foreground italic max-w-2xl mx-auto">
              Start with the problem you are trying to solve. Then use related articles to
              build an operating system for better decisions, better habits, and better work.
            </p>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default News;
