import { Link } from 'react-router-dom';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';
import brandSymbol from '@/assets/brand-symbol.png';

export function Footer() {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-16 border-t border-primary/20 bg-background"
    >
      {/* Egyptian decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <Link to="/" className="font-cinzel text-xl text-gold-gradient">
                Pharaoh B.
              </Link>
              <p className="font-cormorant text-sm text-muted-foreground mt-2 italic">
                Think clearly. Build with intent.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="font-cinzel text-sm tracking-wider text-foreground/80 mb-4">
                Explore
              </h4>
              <div className="space-y-2">
                <Link to="/start" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Start Here
                </Link>
                <Link to="/think-clearly" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Think Clearly
                </Link>
                <Link to="/build-discipline" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Build Discipline
                </Link>
                <Link to="/find-direction" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Direction
                </Link>
                <Link to="/articles" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Articles
                </Link>
                <Link to="/library" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Library
                </Link>
                <Link to="/creative" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Creative
                </Link>
                <Link to="/resources" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Books & Tools
                </Link>
              </div>
            </div>

            {/* Connect */}
            <div className="text-center md:text-left">
              <h4 className="font-cinzel text-sm tracking-wider text-foreground/80 mb-4">
                Connect
              </h4>
              <div className="space-y-2">
                <a
                  href="https://youtube.com/@PharaohB-1111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://tiktok.com/@awmoive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
                <Link to="/contact" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/search" className="block font-cormorant text-sm text-muted-foreground hover:text-primary transition-colors">
                  Search
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Disclaimer */}
          <p className="font-cormorant text-xs text-muted-foreground/70 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
            PharaohB.com is the public home for Pharaoh B's books, writings, art, and media.
            Humanity Imagined and EchoVerse are separate projects with separate scopes.
          </p>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="font-cormorant text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-cormorant text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="font-cormorant text-xs text-muted-foreground">
              © 2026 Pharaoh B. All rights reserved.
            </p>
            <img src={brandSymbol} alt="Pharaoh B. Symbol" className="w-8 h-8 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
