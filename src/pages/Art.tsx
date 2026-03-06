import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { ProtectedArtwork } from '@/components/art/ProtectedArtwork';
import { artworks } from '@/data/artworks';
import brandSymbol from '@/assets/brand-symbol.png';

const Art = () => {
  // Global right-click disable for the art page
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <PageLayout>
      <PageHeader
        title="Art"
        subtitle="Visual Transmissions"
        orientationText="Original visual work with story, symbolism, and collectible print editions."
      />

      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="font-cormorant text-xl text-muted-foreground">
            Visual collections created to communicate ideas beyond language.
            Available as archival prints and gallery-ready formats.
          </p>
        </div>

        {/* Protected gallery grid - 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {artworks.map((artwork) => (
            <ProtectedArtwork key={artwork.slug} artwork={artwork} />
          ))}
        </div>
      </SectionContainer>

      {/* Shop Prints CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* Divider with brand symbol */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <img src={brandSymbol} alt="" className="h-6 w-auto opacity-70" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <div className="text-center">
            <p className="font-cormorant text-lg text-muted-foreground mb-6">
              Original prints available on canvas
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-cinzel text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Shop Prints
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Copyright Footer */}
      <p className="text-center text-xs text-muted-foreground/60 py-8 border-t border-border">
        © 2026 Pharaoh B. All artwork is protected. Unauthorized reproduction prohibited.
      </p>
    </PageLayout>
  );
};

export default Art;
