import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { pillars } from '@/data/pillars';
import { JsonLd } from '@/components/shared/JsonLd';
import { getFirst100Section } from '@/data/first100Content';

interface PillarPageProps {
  slug: 'think-clearly' | 'build-discipline' | 'find-direction' | 'creative-expression' | 'books-and-tools';
}

export function PillarPage({ slug }: PillarPageProps) {
  const pillar = pillars.find((item) => item.slug === slug);
  if (!pillar) return null;
  const section = getFirst100Section(slug);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pillar.title,
    description: pillar.intro,
    url: `/${pillar.slug}`,
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader title={pillar.title} subtitle={pillar.subtitle} orientationText={pillar.orientation} />

      <SectionContainer>
        <div className="max-w-5xl mx-auto">
          <p className="font-cormorant text-xl text-muted-foreground text-center mb-10">{pillar.intro}</p>

          <div className="border border-primary/20 bg-card p-6 mb-10">
            <h2 className="font-cinzel text-lg text-foreground mb-4">Who This Is For</h2>
            <ul className="space-y-2">
              {pillar.whoFor.map((item) => (
                <li key={item} className="font-cormorant text-muted-foreground leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="font-cinzel text-2xl text-gold-gradient mb-6 text-center">Start With These</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillar.starterCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className="border border-border bg-card p-5 hover:border-primary/50 transition-colors"
              >
                <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70">
                  {card.type}
                </span>
                <h3 className="font-cinzel text-xl text-foreground mt-2 mb-2">{card.title}</h3>
                <p className="font-cormorant text-muted-foreground">{card.description}</p>
                <p className="font-cinzel text-xs tracking-widest text-primary mt-4 uppercase">Open →</p>
              </Link>
            ))}
          </div>

          {section && (
            <div className="mt-10 border border-primary/20 bg-card p-6">
              <h3 className="font-cinzel text-xl text-foreground mb-3">Curated Pages in This Path</h3>
              <p className="font-cormorant text-muted-foreground mb-4">
                These mapped pages expand this pillar into a full searchable learning path.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.entries.slice(0, 10).map((entry) => (
                  <Link key={entry.slug} to={entry.href} className="border border-border p-3 hover:border-primary/50 transition-colors">
                    <p className="font-cormorant text-foreground">{entry.title}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  to="/first-100"
                  className="px-4 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider uppercase"
                >
                  Open Full Map
                </Link>
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8 text-center">
            <p className="font-cormorant text-lg text-muted-foreground mb-4">
              Keep going with related paths:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/articles" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Articles
              </Link>
              <Link to="/library" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Library
              </Link>
              <Link to="/resources" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Resources
              </Link>
              <Link to="/search" className="px-3 py-2 border border-primary/40 text-primary font-cinzel text-xs tracking-wider">
                Search
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
}

export default PillarPage;
