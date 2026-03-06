import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { poems } from '@/data/poems';
import { writings } from '@/data/writings';
import brandSymbol from '@/assets/brand-symbol.png';

const Writings = () => {
  return (
    <PageLayout>
      <PageHeader
        title="Writings"
        subtitle="Essays, poems, and practical reflections"
        orientationText="Read by topic, apply what helps, return when needed."
      />

      <SectionContainer>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="font-cormorant text-xl text-muted-foreground">
            Writing focused on mindset, discipline, purpose, and the real
            decisions that shape everyday life.
          </p>
        </div>

        {/* Poems Section */}
        <div className="max-w-3xl mx-auto mb-20">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-primary" />
            <span className="font-cinzel text-xs tracking-widest uppercase text-primary">
              Poetry
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {poems.map((poem, index) => (
              <AccordionItem 
                key={poem.id} 
                value={poem.id}
                className="border border-border hover:border-primary/50 transition-colors duration-300 px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="py-6 hover:no-underline group">
                  <div className="flex items-start gap-6 text-left w-full">
                    <span className="font-cinzel text-sm text-primary/50 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-cinzel text-lg text-foreground group-hover:text-primary transition-colors">
                        {poem.title}
                      </h3>
                      {poem.source && (
                        <p className="font-cormorant text-sm text-muted-foreground italic mt-1">
                          {poem.source}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="pl-12 pr-4">
                    <div className="font-cormorant text-lg text-foreground/90 leading-relaxed whitespace-pre-line">
                      {poem.content}
                    </div>
                    <p className="font-cormorant text-sm text-primary italic mt-8">
                      — Pharaoh B.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Divider with brand symbol */}
        <div className="flex items-center justify-center gap-4 py-8 mb-12">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <img src={brandSymbol} alt="" className="h-6 w-auto opacity-70" />
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Essays Section */}
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-primary" />
            <span className="font-cinzel text-xs tracking-widest uppercase text-primary">
              Essays
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>

          {/* Writings list */}
          <div className="divide-y divide-border">
            {writings.map((writing) => (
              <Link
                key={writing.slug}
                to={`/writings/${writing.slug}`}
                className="group block py-6 sm:py-8 first:pt-0 last:pb-0 min-h-[44px]"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-cinzel text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                      {writing.title}
                    </h3>
                    <p className="font-cormorant text-muted-foreground leading-relaxed line-clamp-2">
                      {writing.excerpt}
                    </p>
                  </div>
                  <time className="font-cormorant text-sm text-primary/70 italic md:text-right whitespace-nowrap">
                    {writing.date}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Writings;
