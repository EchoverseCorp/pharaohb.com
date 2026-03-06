import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { artworks } from '@/data/artworks';
import { albums } from '@/data/albums';
import { poems } from '@/data/poems';
import { transmissions } from '@/data/transmissions';
import { JsonLd } from '@/components/shared/JsonLd';
import { getFirst100Section } from '@/data/first100Content';

const lanes = [
  { title: 'Poetry', desc: 'Poems and lyrical writing.', href: '/writings' },
  { title: 'Music', desc: 'Songs and musical releases (YouTube + Spotify).', href: '/music' },
  { title: 'Frequencies', desc: 'Frequency sessions for focus, reset, and calm.', href: '/media?category=frequency' },
  { title: 'Meditations', desc: 'Affirmation and meditation audio sessions.', href: '/media?category=affirmation' },
  { title: 'Audiobooks', desc: 'Long-form audiobook and spoken teaching releases.', href: '/media?category=audiobook' },
  { title: 'Spoken Word', desc: 'Poetic spoken-word and message pieces.', href: '/media?category=spoken-word' },
  { title: 'Teachings', desc: 'Practical talks and mindset guidance.', href: '/media?category=teaching' },
  { title: 'Art Collections', desc: 'Visual works and print editions.', href: '/art' },
];

const Creative = () => {
  const mappedCreative = getFirst100Section('creative-media')?.entries || [];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Creative',
    description: 'Creative work across poems, music, media, and visual art.',
    url: '/creative',
  };

  return (
    <PageLayout>
      <JsonLd data={schema} />
      <PageHeader
        title="Creative"
        subtitle="Expression across words, sound, and image"
        orientationText="Use this hub to discover poetry, music, art, and media."
      />

      <SectionContainer>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {lanes.map((lane) => (
              <Link key={lane.title} to={lane.href} className="border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <h2 className="font-cinzel text-xl text-foreground mb-2">{lane.title}</h2>
                <p className="font-cormorant text-muted-foreground">{lane.desc}</p>
                <p className="font-cinzel text-xs tracking-widest text-primary mt-4 uppercase">Open →</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-primary/20 bg-card p-4 text-center">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Poems</p>
              <p className="font-cormorant text-2xl text-foreground mt-1">{poems.length}</p>
            </div>
            <div className="border border-primary/20 bg-card p-4 text-center">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Albums</p>
              <p className="font-cormorant text-2xl text-foreground mt-1">{albums.length}</p>
            </div>
            <div className="border border-primary/20 bg-card p-4 text-center">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Artworks</p>
              <p className="font-cormorant text-2xl text-foreground mt-1">{artworks.length}</p>
            </div>
            <div className="border border-primary/20 bg-card p-4 text-center">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Media Pieces</p>
              <p className="font-cormorant text-2xl text-foreground mt-1">{transmissions.length}</p>
            </div>
          </div>

          <div className="border border-primary/20 bg-card p-6 mt-8">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <h3 className="font-cinzel text-lg text-foreground">Creative and Media Essays</h3>
              <Link to="/first-100" className="font-cinzel text-xs tracking-wider uppercase text-primary">
                Open Full Map →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mappedCreative.map((entry) => (
                <Link key={entry.slug} to={entry.href} className="border border-border p-4 hover:border-primary/50 transition-colors">
                  <p className="font-cormorant text-foreground">{entry.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Creative;
