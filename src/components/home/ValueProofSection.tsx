import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    title: 'Overthinking',
    description: 'Understand why the mind loops, and learn how to return to clearer thinking.',
    link: '/think-clearly',
    cta: 'Open Think Clearly',
  },
  {
    title: 'Discipline',
    description: 'Build steadier habits, better systems, and the ability to follow through.',
    link: '/build-discipline',
    cta: 'Open Build Discipline',
  },
  {
    title: 'Direction',
    description: 'Find better questions for where you are, what matters, and where to go next.',
    link: '/find-direction',
    cta: 'Open Find Direction',
  },
  {
    title: 'Creative Expression',
    description: 'Poetry, music, reflections, and creative work that explore the same questions from another angle.',
    link: '/creative-expression',
    cta: 'Open Creative Expression',
  },
  {
    title: 'Books & Tools',
    description: 'Curated books, tools, and references to support deeper study and practical growth.',
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
            Choose the path that matches what you need most right now, then follow the related writing, guides, and resources.
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
