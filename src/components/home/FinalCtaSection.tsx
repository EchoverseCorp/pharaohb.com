import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center border border-primary/30 bg-card p-8 md:p-12">
          <h2 className="font-cinzel text-2xl md:text-4xl text-gold-gradient mb-4">
            Keep Exploring at Your Pace
          </h2>
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use search when you know what you need, or use Start Here for a guided path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="font-cinzel text-xs tracking-wider bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/search">Search the Library</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/start">Start Here</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/creative">Explore Creative Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
