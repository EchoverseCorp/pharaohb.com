import { Link } from 'react-router-dom';
import { books } from '@/data/books';
import { writings } from '@/data/writings';
import { blogPosts } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';

const mostUsefulFirst = [
  {
    need: 'Think Clearly',
    title: 'Decision Clarity Path',
    description: 'Start with core essays and tools that reduce noise and improve decisions.',
    link: '/think-clearly',
  },
  {
    need: 'Build Discipline',
    title: 'Discipline and Execution Path',
    description: 'Build consistency with practical frameworks, routines, and accountability.',
    link: '/build-discipline',
  },
  {
    need: 'Find Direction',
    title: 'Direction and Purpose Path',
    description: 'Move from confusion to momentum with guided writing and next-step prompts.',
    link: '/find-direction',
  },
  {
    need: 'Books and Tools',
    title: books[0].title,
    description: 'Core long-form work for personal responsibility, focus, and progress.',
    link: `/library/${books[0].slug}`,
  },
  {
    need: 'Creative Expression',
    title: writings[0].title,
    description: 'Poetry and reflective writing for perspective, emotional clarity, and fuel.',
    link: `/writings/${writings[0].slug}`,
  },
  {
    need: 'Resources',
    title: 'Curated Knowledge Library',
    description: 'Recommended books and references to support long-term growth.',
    link: '/resources',
  },
];

export function RecentWorksSection() {
  const latest = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 border-y border-primary/10 bg-gradient-to-b from-transparent via-muted/5 to-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-4">
            Most Useful First
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with curated paths and foundational pieces before exploring everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mostUsefulFirst.map((work, index) => (
            <Link
              key={index}
              to={work.link}
              className="group bg-card border border-border hover:border-primary/50 transition-all duration-300 p-6"
            >
              <span className="font-cinzel text-[11px] text-primary/80 uppercase tracking-widest mb-3 block">
                {work.need}
              </span>
              <h3 className="font-cinzel text-xl text-foreground group-hover:text-gold-gradient transition-colors mb-3">
                {work.title}
              </h3>
              <p className="font-cormorant text-base text-muted-foreground leading-relaxed">{work.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 max-w-6xl mx-auto border border-primary/20 bg-card/60 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <h3 className="font-cinzel text-2xl text-foreground">Latest Notes</h3>
            <Button asChild variant="outline" className="font-cinzel text-xs tracking-wider border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/articles">View All Articles</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latest.map((post) => (
              <Link
                key={post.slug}
                to={`/articles/${post.slug}`}
                className="border border-border hover:border-primary/45 transition-colors p-4"
              >
                <p className="font-cinzel text-[11px] tracking-wider text-primary/80 mb-2">{post.date}</p>
                <h4 className="font-cinzel text-lg text-foreground mb-2 line-clamp-2">{post.title}</h4>
                <p className="font-cormorant text-base text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
