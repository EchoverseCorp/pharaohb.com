import { ReactNode } from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className, id }: SectionContainerProps) {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section 
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("py-14 md:py-20", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-2"
        )}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default SectionContainer;
