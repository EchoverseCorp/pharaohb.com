import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getArtworkBySlug } from '@/data/artworks';
import { cn } from '@/lib/utils';

const ArtDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const artwork = getArtworkBySlug(slug || '');
  const [selectedFormat, setSelectedFormat] = useState(0);

  if (!artwork) {
    return (
      <PageLayout>
        <SectionContainer className="pt-32">
          <div className="text-center">
            <h1 className="font-cinzel text-3xl text-foreground mb-4">Artwork Not Found</h1>
            <Link to="/art" className="text-primary hover:underline">
              Return to Gallery
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SectionContainer className="pt-32">
        <Link
          to="/art"
          className="inline-flex items-center gap-2 font-cinzel text-sm text-muted-foreground hover:text-primary transition-colors mb-8 py-2 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Artwork Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden border border-border">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Artwork Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-4">
                {artwork.title}
              </h1>
              <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <h3 className="font-cinzel text-sm tracking-widest text-foreground/70 uppercase">
                Select Format
              </h3>
              <div className="flex flex-wrap gap-3">
                {artwork.formats.map((format, index) => (
                  <button
                    key={format.type}
                    onClick={() => setSelectedFormat(index)}
                    className={cn(
                      "px-6 py-3 border transition-all duration-300 font-cinzel text-sm tracking-wider",
                      selectedFormat === index
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {format.type}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-6 border-y border-border">
              <span className="font-cinzel text-3xl text-primary">
                {artwork.formats[selectedFormat].price}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full font-cinzel tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add to Cart
            </Button>

            <div className="text-sm font-cormorant text-muted-foreground space-y-2">
              <p>• Archival-quality giclée printing</p>
              <p>• Ships within 5-7 business days</p>
              <p>• Certificate of authenticity included</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default ArtDetail;
