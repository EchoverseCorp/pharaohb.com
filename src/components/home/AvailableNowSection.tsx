import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const readingRecommendations = [
  {
    category: 'Thinking',
    title: 'The Art of Thinking Clearly',
    description: 'A practical reference for cognitive errors and better decision patterns.',
    link: 'https://www.amazon.com/s?k=The+Art+of+Thinking+Clearly',
  },
  {
    category: 'Discipline',
    title: 'Atomic Habits',
    description: 'A systems-first approach for behavior change and consistent action.',
    link: 'https://www.amazon.com/s?k=Atomic+Habits',
  },
  {
    category: 'Purpose',
    title: "Man's Search for Meaning",
    description: 'A foundational text for meaning, resilience, and direction under pressure.',
    link: 'https://www.amazon.com/s?k=Mans+Search+for+Meaning',
  },
];

export function AvailableNowSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-muted/5 to-transparent border-y border-primary/10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-4">
            Recommended Reading (Amazon)
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with trusted books aligned to clarity, discipline, and direction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {readingRecommendations.map((item, index) => (
            <div
              key={index}
              className="group bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              <div className="p-6 space-y-4">
                <span className="font-cinzel text-[11px] tracking-wider uppercase text-primary/80">{item.category}</span>
                <h3 className="font-cinzel text-lg text-foreground group-hover:text-gold-gradient transition-colors">
                  {item.title}
                </h3>
                <p className="font-cormorant text-base text-muted-foreground leading-relaxed min-h-[88px]">
                  {item.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    View on Amazon
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="font-cormorant text-sm text-muted-foreground">
            Some links may be affiliate links. Recommendations are selected for practical value.
          </p>
        </div>

        <div className="text-center mt-6">
          <Button
            asChild
            variant="outline"
            className="font-cinzel tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link to="/books-and-tools">Browse All Books and Tools</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
