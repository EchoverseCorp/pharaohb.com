import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    title: 'Overthinking',
    description: 'Decision frameworks and mental models for faster, cleaner choices.',
    link: '/think-clearly',
    cta: 'Open Think Clearly',
  },
  {
    title: 'Discipline',
    description: 'Routines and systems to build consistency and follow-through.',
    link: '/build-discipline',
    cta: 'Open Build Discipline',
  },
  {
    title: 'Direction',
    description: 'Writing and tools to move from uncertainty to meaningful action.',
    link: '/find-direction',
    cta: 'Open Find Direction',
  },
  {
    title: 'Creative Expression',
    description: 'Poetry, music, frequencies, and media for reflection and momentum.',
    link: '/creative-expression',
    cta: 'Open Creative Expression',
  },
  {
    title: 'Books and Tools',
    description: 'Curated books, resources, and references to keep learning practical.',
    link: '/books-and-tools',
    cta: 'Open Books and Tools',
  },
];

export function ValueProofSection() {
  return (
    <section className="py-16 md:py-20 border-y border-primary/10 bg-muted/5">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-2xl md:text-4xl text-gold-gradient mb-3">
            Start With Your Need
          </h2>
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Pick one path and get immediate value, then follow related writing and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-card border border-border p-6 flex flex-col min-h-[220px]">
              <h3 className="font-cinzel text-lg text-foreground mb-3">{pillar.title}</h3>
              <p className="font-cormorant text-muted-foreground leading-relaxed mb-6 flex-1">
                {pillar.description}
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full font-cinzel text-[11px] tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link to={pillar.link}>{pillar.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProofSection;
