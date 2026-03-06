import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const labels: Record<string, string> = {
  start: 'Start Here',
  articles: 'Articles',
  books: 'Books',
  writings: 'Writings',
  music: 'Music',
  art: 'Art',
  library: 'Library',
  media: 'Media',
  creative: 'Creative',
  resources: 'Resources',
  search: 'Search',
  'think-clearly': 'Think Clearly',
  'build-discipline': 'Build Discipline',
  'find-direction': 'Find Direction',
  'creative-expression': 'Creative Expression',
  'books-and-tools': 'Books and Tools',
  shop: 'Shop',
  about: 'About',
  contact: 'Contact',
  news: 'News',
  privacy: 'Privacy',
  terms: 'Terms',
};

function labelFor(segment: string): string {
  if (labels[segment]) return labels[segment];
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function AppBreadcrumbs() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, idx) => ({
      label: labelFor(seg),
      href: '/' + segments.slice(0, idx + 1).join('/'),
    })),
  ];

  return (
    <div className="relative z-20 border-b border-primary/10 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-foreground/90">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default AppBreadcrumbs;
