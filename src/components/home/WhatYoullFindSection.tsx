import { Link } from 'react-router-dom';

const intents = [
  {
    search: 'How to stop overthinking',
    value: 'Clear frameworks for understanding overthinking, mental noise, and better decisions.',
    link: '/think-clearly',
  },
  {
    search: 'How to build discipline',
    value: 'Practical systems for consistency, follow-through, and steady effort.',
    link: '/build-discipline',
  },
  {
    search: 'How to find direction in life',
    value: 'Reflective writing and useful questions for choosing what matters and where to go next.',
    link: '/find-direction',
  },
  {
    search: 'Books and tools for self-development',
    value: 'Curated books, tools, and guides worth returning to.',
    link: '/books-and-tools',
  },
];

export function WhatYoullFindSection() {
  return (
    <section className="py-16 md:py-20 border-b border-primary/10 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-3">What You Will Find Here</h2>
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground">
            Start with a question, then follow the essays, study guides, and resources that help you think it through.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {intents.map((item) => (
            <Link
              key={item.search}
              to={item.link}
              className="border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <p className="font-cinzel text-[11px] tracking-wider uppercase text-primary/75 mb-2">People Search</p>
              <h3 className="font-cormorant text-xl text-foreground mb-2">{item.search}</h3>
              <p className="font-cormorant text-base text-muted-foreground">{item.value}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatYoullFindSection;
