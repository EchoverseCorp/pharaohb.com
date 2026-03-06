import { ReactNode, Suspense, lazy } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { AppBreadcrumbs } from '@/components/shared/AppBreadcrumbs';

const GoldenTorus = lazy(() => import('@/components/GoldenTorus').then((mod) => ({ default: mod.GoldenTorus })));

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  showTorus?: boolean;
}

export function PageLayout({ children, showFooter = true, showTorus = false }: PageLayoutProps) {
  const scrollProgress = useScrollProgress();
  const disableTorusForPrerender =
    typeof navigator !== 'undefined' && Boolean(navigator.webdriver);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background visual effect (enabled per-page) */}
      {showTorus && !disableTorusForPrerender && (
        <Suspense fallback={null}>
          <GoldenTorus scrollProgress={scrollProgress} />
        </Suspense>
      )}
      
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
