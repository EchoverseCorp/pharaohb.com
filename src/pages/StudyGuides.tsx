import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { JsonLd } from '@/components/shared/JsonLd';
import { getFirst100Section } from '@/data/first100Content';

const section = getFirst100Section('study-guides');

export default function StudyGuides() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Study Guides',
    description: 'Study guides with summaries, key ideas, exercises, and implementation notes.',
    url: '/study-guides',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="Study Guides"
        subtitle="Read, understand, and apply"
        orientationText="Use these guides to convert reading into structured action."
      />

      <SectionContainer>
        <div className="max-w-5xl mx-auto">
          <div className="border border-primary/20 bg-card p-6 mb-8">
            <p className="font-cormorant text-lg text-muted-foreground">
              Each guide is structured around summary, key ideas, exercises, and practical implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(section?.entries || []).map((entry) => (
              <Link
                key={entry.slug}
                to={entry.href}
                className="border border-border bg-card p-5 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-cinzel text-lg text-foreground mb-2">{entry.title}</h3>
                <p className="font-cormorant text-muted-foreground">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
