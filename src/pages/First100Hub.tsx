import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { JsonLd } from '@/components/shared/JsonLd';
import { first100Sections } from '@/data/first100Content';

export default function First100Hub() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'First 100 Pages',
    description: 'Pharaoh B content architecture for the first 100 pages across clarity, discipline, direction, creativity, books, and resources.',
    url: '/first-100',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="First 100 Pages"
        subtitle="A scalable knowledge architecture"
        orientationText="Browse every cluster and open any mapped page directly."
      />

      <SectionContainer>
        <div className="max-w-6xl mx-auto space-y-8">
          {first100Sections.map((section) => (
            <section key={section.key} className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-cinzel text-2xl text-foreground">{section.title}</h2>
                  <p className="font-cormorant text-muted-foreground">{section.description}</p>
                </div>
                <Link to={section.href} className="font-cinzel text-xs tracking-wider uppercase text-primary border border-primary/40 px-4 py-2">
                  Open Section
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {section.entries.slice(0, 9).map((entry) => (
                  <Link
                    key={entry.slug}
                    to={entry.href}
                    className="border border-border p-3 hover:border-primary/50 transition-colors"
                  >
                    <p className="font-cormorant text-foreground">{entry.title}</p>
                  </Link>
                ))}
              </div>
              {section.entries.length > 9 && (
                <p className="font-cormorant text-sm text-muted-foreground mt-3">
                  + {section.entries.length - 9} more pages in this section.
                </p>
              )}
            </section>
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
