import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import brandSymbol from '@/assets/brand-symbol.png';

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Symbol */}
          <div className="mb-8">
            <img 
              src={brandSymbol} 
              alt="Pharaoh B. Symbol" 
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-4">
            Pharaoh B.
          </h1>

          {/* Tagline */}
          <p className="font-cinzel text-sm tracking-[0.2em] uppercase text-primary mb-12">
            Writer. Builder. Systems Thinker.
          </p>

          {/* Main Content */}
          <div className="space-y-6 font-cormorant text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>
              Pharaoh B is the body of work focused on clarity, cause and effect,
              personal responsibility, and practical growth. The goal is simple:
              help people think better, decide faster, and build lives they actually respect.
            </p>

            <p className="text-foreground italic">
              This is not about belief. It is about results.
            </p>

            <p>
              The early years included deep study across religion, esoteric texts,
              philosophy, and human behavior. Over time, that evolved into practical
              frameworks, books, music, and media people can apply in everyday life.
            </p>

            <p>
              This site is Pharaoh B only. Other projects like Humanity Imagined
              and EchoVerse are separate initiatives with separate missions.
            </p>

            <p className="text-foreground">
              If something here helps you move forward, use it and make it real.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-12">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <img src={brandSymbol} alt="" className="w-8 h-8 object-contain" />
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cinzel text-2xl text-gold-gradient text-center mb-6">Start By Need</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <Link to="/think-clearly" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Think Clearly</p>
            </Link>
            <Link to="/build-discipline" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Build Discipline</p>
            </Link>
            <Link to="/find-direction" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Find Direction</p>
            </Link>
            <Link to="/creative-expression" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Creative Expression</p>
            </Link>
            <Link to="/books-and-tools" className="border border-primary/30 bg-card p-4 text-center hover:border-primary transition-colors">
              <p className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-primary/70">Need</p>
              <p className="font-cormorant text-base text-foreground mt-1">Books and Tools</p>
            </Link>
          </div>
        </div>
      </section>

      {/* The Work Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-px bg-primary mx-auto mb-6" />
            <h2 className="font-cinzel text-2xl md:text-3xl text-foreground">
              The Work
            </h2>
            <div className="w-12 h-px bg-primary mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="font-cinzel text-lg text-primary mb-3">Transmissions</h3>
              <p className="font-cormorant text-muted-foreground leading-relaxed">
                Long-form video, spoken word, and audio built to turn insight
                into action.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-cinzel text-lg text-primary mb-3">Writings</h3>
              <p className="font-cormorant text-muted-foreground leading-relaxed">
                Essays, poems, and frameworks focused on mindset, execution,
                purpose, and growth.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-cinzel text-lg text-primary mb-3">Art</h3>
              <p className="font-cormorant text-muted-foreground leading-relaxed">
                Visual storytelling and collectible prints that extend the ideas
                beyond words.
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-cinzel text-lg text-primary mb-3">Books</h3>
              <p className="font-cormorant text-muted-foreground leading-relaxed">
                Structured systems you can study, revisit, and apply over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 py-12">
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <img src={brandSymbol} alt="" className="w-8 h-8 object-contain" />
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Connect Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cinzel text-xl md:text-2xl text-foreground mb-8">
            Connect
          </h2>

          <div className="flex items-center justify-center gap-8 md:gap-12 mb-12">
            <a
              href="https://youtube.com/@PharaohB-1111"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://tiktok.com/@awmoive"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              TikTok
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cinzel text-sm tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary font-cinzel text-sm tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer space */}
      <div className="h-16" />
    </PageLayout>
  );
};

export default About;
