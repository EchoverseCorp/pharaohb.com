import { ReactNode } from 'react';
import { GoldenTorus } from '@/components/GoldenTorus';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { AppBreadcrumbs } from '@/components/shared/AppBreadcrumbs';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  showTorus?: boolean;
}

export function PageLayout({ children, showFooter = true, showTorus = false }: PageLayoutProps) {
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background visual effect (enabled per-page) */}
      {showTorus && <GoldenTorus scrollProgress={scrollProgress} />}
      
      {/* Navigation */}
      <Navbar />
      <AppBreadcrumbs />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

export default PageLayout;
