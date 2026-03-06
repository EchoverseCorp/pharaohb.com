import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const needLinks = [
  { href: '/start', label: 'Start Here' },
  { href: '/think-clearly', label: 'Think Clearly' },
  { href: '/build-discipline', label: 'Build Discipline' },
  { href: '/find-direction', label: 'Find Direction' },
];

const discoverLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/library', label: 'Library' },
  { href: '/creative', label: 'Creative' },
  { href: '/resources', label: 'Books & Tools' },
  { href: '/first-100', label: 'First 100' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-primary/20' 
          : 'bg-background/55 backdrop-blur-sm border-b border-primary/10'
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-cinzel text-lg sm:text-xl md:text-2xl font-semibold text-gold-gradient tracking-widest"
          >
            PHARAOH B
          </Link>

          {/* Desktop Navigation: Need-first then discovery */}
          <div className="hidden xl:flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-primary/70">Need</span>
              {needLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'font-cinzel text-xs tracking-wider transition-colors duration-300 relative group',
                    isActive(link.href) ? 'text-primary' : 'text-foreground/80 hover:text-primary',
                  )}
                >
                  {link.label}
                  <span className={cn('absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300', isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full')} />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-primary/70">Discover</span>
              {discoverLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'font-cinzel text-xs tracking-wider transition-colors duration-300 relative group',
                    isActive(link.href) ? 'text-primary' : 'text-foreground/80 hover:text-primary',
                  )}
                >
                  {link.label}
                  <span className={cn('absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300', isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full')} />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-foreground p-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={cn(
                "w-full h-0.5 bg-primary transition-all duration-300",
                isMobileMenuOpen && "rotate-45 translate-y-2"
              )} />
              <span className={cn(
                "w-full h-0.5 bg-primary transition-all duration-300",
                isMobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "w-full h-0.5 bg-primary transition-all duration-300",
                isMobileMenuOpen && "-rotate-45 -translate-y-2"
              )} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "xl:hidden overflow-hidden transition-all duration-500",
          isMobileMenuOpen ? "max-h-[620px] mt-4" : "max-h-0"
        )}>
          <div className="flex flex-col gap-1 py-4 border-t border-primary/20">
            <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 py-2">Need</p>
            {needLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-cinzel text-sm tracking-wider transition-colors text-left py-3 min-h-[44px] flex items-center",
                  isActive(link.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <p className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-primary/70 py-2 mt-1">Discover</p>
            {discoverLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-cinzel text-sm tracking-wider transition-colors text-left py-3 min-h-[44px] flex items-center",
                  isActive(link.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
