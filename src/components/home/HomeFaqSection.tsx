import { Link } from 'react-router-dom';
import { JsonLd } from '@/components/shared/JsonLd';

const faqs = [
  {
    question: 'How can I stop overthinking and make better decisions?',
    answer:
      'Start in Think Clearly. You will find practical frameworks and articles that help you move from mental loops to clear next steps.',
    link: '/think-clearly',
    linkLabel: 'Open Think Clearly',
  },
  {
    question: 'What should I read first if I need more discipline?',
    answer:
      'Use Build Discipline for structured routines, execution systems, and writing focused on consistency and follow-through.',
    link: '/build-discipline',
    linkLabel: 'Open Build Discipline',
  },
  {
    question: 'Where should I start if I feel stuck or directionless?',
    answer:
      'Start Here gives you a guided sequence and the Find Direction path for turning reflection into momentum.',
    link: '/start',
    linkLabel: 'Open Start Here',
  },
  {
    question: 'Does this site have books, music, poetry, and resources in one place?',
    answer:
      'Yes. The site is organized as a library: articles, books, creative work, and curated tools with clear discovery paths.',
    link: '/search',
    linkLabel: 'Search the Library',
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
            Quick answers for first-time visitors so you can find value fast.
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
