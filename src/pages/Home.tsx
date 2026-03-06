import { PageLayout } from '@/components/layout/PageLayout';
import { HeroSection } from '@/components/HeroSection';
import { WhatYoullFindSection } from '@/components/home/WhatYoullFindSection';
import { HomeFaqSection } from '@/components/home/HomeFaqSection';
import { ValueProofSection } from '@/components/home/ValueProofSection';
import { ExploreTilesSection } from '@/components/home/ExploreTilesSection';
import { RecentWorksSection } from '@/components/home/RecentWorksSection';
import { AvailableNowSection } from '@/components/home/AvailableNowSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

const Home = () => {
  return (
    <PageLayout showTorus>
      <HeroSection />
      <WhatYoullFindSection />
      <ValueProofSection />
      <HomeFaqSection />
      <ExploreTilesSection />
      <RecentWorksSection />
      <AvailableNowSection />
      <FinalCtaSection />
    </PageLayout>
  );
};

export default Home;
