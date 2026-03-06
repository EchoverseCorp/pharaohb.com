import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroBackgroundUrl =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=80';

export function HeroSection() {
  return (
    <section className="relative min-h-[86vh] flex items-center justify-center overflow-hidden border-b border-primary/15">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${heroBackgroundUrl})` }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-24 pb-16">
        {/* Decorative ornament */}
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Main headline */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
          <span className="text-gold-gradient text-glow-gold">
            Think Clearly.
          </span>
          <br />
          <span className="text-foreground">
            Build a Meaningful Life.
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-cormorant text-xl md:text-2xl text-muted-foreground mb-4">
          A practical library of ideas, writing, and creative work.
        </p>

        {/* Subtitle */}
        <p className="font-cormorant text-lg text-foreground/80 mb-4 max-w-3xl mx-auto">
          If you are overthinking, lacking direction, or trying to stay disciplined,
          start with a clear path and move from reflection to action.
        </p>
        
        <p className="font-cormorant text-base text-primary/75 mb-12 max-w-2xl mx-auto">
          Start where you are. Build from there.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button
            asChild
            className="font-cinzel text-sm tracking-widest px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500"
          >
            <Link to="/start">Start Here</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="font-cinzel text-sm tracking-widest px-8 py-6 border-primary/50 text-foreground hover:bg-primary/15"
          >
            <Link to="/library">Explore the Library</Link>
          </Button>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <Link
            to="/think-clearly"
            className="border border-primary/25 bg-background/60 p-3 sm:p-4 hover:border-primary/55 transition-colors"
          >
            <p className="font-cinzel text-xs tracking-wider text-primary mb-1">NEED</p>
            <p className="font-cormorant text-lg text-foreground">Think Clearly</p>
          </Link>
          <Link
            to="/build-discipline"
            className="border border-primary/25 bg-background/60 p-3 sm:p-4 hover:border-primary/55 transition-colors"
          >
            <p className="font-cinzel text-xs tracking-wider text-primary mb-1">NEED</p>
            <p className="font-cormorant text-lg text-foreground">Build Discipline</p>
          </Link>
          <Link
            to="/find-direction"
            className="border border-primary/25 bg-background/60 p-3 sm:p-4 hover:border-primary/55 transition-colors"
          >
            <p className="font-cinzel text-xs tracking-wider text-primary mb-1">NEED</p>
            <p className="font-cormorant text-lg text-foreground">Find Direction</p>
          </Link>
        </div>
      </div>

      {/* Egyptian decorative corners - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="hidden md:block absolute top-20 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="hidden md:block absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="hidden md:block absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
}

export default HeroSection;
