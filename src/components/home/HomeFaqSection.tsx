import { Link } from 'react-router-dom';
import { JsonLd } from '@/components/shared/JsonLd';

const faqs = [
  {
    question: 'How do I start if I tend to overthink everything?',
    answer:
      'Begin with Think Clearly. It gathers essays and frameworks that help you reduce mental noise, see the real problem, and make calmer decisions.',
    link: '/think-clearly',
    linkLabel: 'Open Think Clearly',
  },
  {
    question: 'What should I read first if I want more discipline?',
    answer:
      'Start with Build Discipline. The focus there is less on motivation and more on systems, routines, and principles that make consistency possible.',
    link: '/build-discipline',
    linkLabel: 'Open Build Discipline',
  },
  {
    question: 'Where should I begin if I feel directionless?',
    answer:
      'Visit Find Direction. That path is built around reflection, clarity, and choosing what is worth committing to.',
    link: '/find-direction',
    linkLabel: 'Open Find Direction',
  },
  {
    question: 'What kind of work lives here besides articles?',
    answer:
      'Alongside essays, you will find study guides, curated resources, and creative work including poetry, music, and visual pieces.',
    link: '/start',
    linkLabel: 'Open Start Here',
  },
];

export function HomeFaqSection() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-16 md:py-20 border-y border-primary/10 bg-muted/5">
      <JsonLd data={faqSchema} />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-3">Frequently Asked Questions</h2>
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground">
            A few quick answers to help you find a good place to begin.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item) => (
            <details key={item.question} className="group border border-border bg-card p-5 open:border-primary/45">
              <summary className="cursor-pointer list-none font-cinzel text-lg text-foreground flex items-center justify-between gap-4">
                {item.question}
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pt-4">
                <p className="font-cormorant text-lg text-muted-foreground mb-4">{item.answer}</p>
                <Link to={item.link} className="font-cinzel text-xs tracking-wider uppercase text-primary hover:text-primary/80">
                  {item.linkLabel} →
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFaqSection;
