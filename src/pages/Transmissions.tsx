import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { VideoCard } from '@/components/transmissions/VideoCard';
import { ShortCard } from '@/components/transmissions/ShortCard';
import { 
  transmissions, 
  shorts, 
  categories,
  getTransmissionsByCategory,
  type CategoryId 
} from '@/data/transmissions';
import brandSymbol from '@/assets/brand-symbol.png';

const Transmissions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as CategoryId) || 'all';
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    categories.some((cat) => cat.id === initialCategory) ? initialCategory : 'all'
  );
  
  const filteredTransmissions = getTransmissionsByCategory(activeCategory);

  const setCategory = (category: CategoryId) => {
    setActiveCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Transmissions"
        subtitle="Audio & Video"
        orientationText="Short and long-form media for clarity, execution, and personal growth."
      />

      <SectionContainer>
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-6 py-2 font-cinzel text-xs tracking-widest uppercase border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Long-form Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTransmissions.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTransmissions.length === 0 && (
          <div className="text-center py-16">
            <p className="font-cormorant text-lg text-muted-foreground">
              No transmissions in this category yet.
            </p>
          </div>
        )}
      </SectionContainer>

      {/* Shorts Section - Only show if there are shorts */}
      {shorts.length > 0 && (
        <>
          {/* Divider with brand symbol */}
          <div className="flex items-center justify-center gap-4 py-12">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <img src={brandSymbol} alt="" className="w-8 h-8 object-contain opacity-70" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <SectionContainer>
            {/* Section Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-primary" />
                <span className="font-cinzel text-xs tracking-widest uppercase text-primary">
                  Shorts
                </span>
                <div className="w-12 h-px bg-primary" />
              </div>
              <p className="font-cormorant text-lg text-muted-foreground">
                Quick transmissions. Under 60 seconds.
              </p>
            </div>

            {/* Shorts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {shorts.map((short) => (
                <ShortCard key={short.id} short={short} />
              ))}
            </div>

            {/* Link to YouTube Shorts */}
            <div className="text-center mt-8">
              <a
                href="https://www.youtube.com/@PharaohB-1111/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-cinzel text-sm tracking-widest text-primary hover:opacity-70 transition-opacity"
              >
                View All Shorts on YouTube
                <span>→</span>
              </a>
            </div>
          </SectionContainer>
        </>
      )}
    </PageLayout>
  );
};

export default Transmissions;
