import { cn } from '@/lib/utils';
import brandSymbol from '@/assets/brand-symbol.png';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  orientationText?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, orientationText, className }: PageHeaderProps) {
  return (
    <div className={cn("pt-28 pb-10 md:pt-32 md:pb-14 lg:pt-36 lg:pb-16", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Decorative ornament */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-4">
            {title}
          </h1>
          
          {subtitle && (
            <p className="font-cormorant text-xl md:text-2xl text-muted-foreground italic">
              {subtitle}
            </p>
          )}
          
          {orientationText && (
            <p className="font-cormorant text-base md:text-lg text-primary/60 mt-2 max-w-2xl mx-auto">
              {orientationText}
            </p>
          )}
          
          {/* Egyptian divider with brand symbol */}
          <div className="egyptian-divider max-w-md mx-auto mt-8">
            <img src={brandSymbol} alt="Pharaoh B. Symbol" className="w-12 h-12 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
