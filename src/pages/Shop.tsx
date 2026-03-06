import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';
import brandSymbol from '@/assets/brand-symbol.png';
import { JsonLd } from '@/components/shared/JsonLd';

const categories = ['All', 'Books', 'Art', 'Objects', 'Apparel'] as const;
type Category = typeof categories[number];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pharaoh B Shop',
    itemListElement: filteredProducts.map((product, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        category: product.category,
        description: product.description,
      },
    })),
  };

  return (
    <PageLayout>
      <JsonLd data={itemListSchema} />
      <PageHeader 
        title="Shop"
        subtitle="Books, prints, and curated products"
        orientationText="A clean catalog of what is available now."
      />

      {/* Canvas Prints Section */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary" />
            <span className="font-cinzel text-xs tracking-widest uppercase text-primary">
              Canvas Prints
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>

          <p className="text-center font-cormorant text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Original artwork printed on museum-quality canvas with archival inks,
            made to order and ready to display.
          </p>

          <div className="text-center">
            <a
              href="https://printful.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-cinzel text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Browse All Prints
              <span>→</span>
            </a>
          </div>

          {/* Divider with brand symbol */}
          <div className="flex items-center justify-center gap-4 mt-16">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <img src={brandSymbol} alt="" className="h-6 w-auto opacity-70" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h2 className="font-cinzel text-2xl md:text-3xl text-gold-gradient mb-4">
            Catalog
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground">
            Browse by category and open each item for full details, pricing, and availability.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 sm:px-6 py-2 min-h-[44px] font-cinzel text-xs sm:text-sm tracking-wider border transition-all duration-300",
                activeCategory === category
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className={cn(
                "group relative bg-card border border-border hover:border-primary/50",
                "transition-all duration-500 overflow-hidden"
              )}
            >
              {/* Product image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Product info */}
              <div className="p-4 space-y-3">
                <span className="font-cinzel text-xs text-primary/70 uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="font-cinzel text-sm text-foreground group-hover:text-gold-gradient transition-colors">
                  {product.name}
                </h3>
                <p className="font-cormorant text-xs text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                <div className="pt-2">
                  <span className="font-cinzel text-lg text-primary">
                    {product.price}
                  </span>
                </div>
                <div className="pt-1">
                  {product.link ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link to={product.link}>Open Details</Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link to="/contact">Request Product</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Shop;
