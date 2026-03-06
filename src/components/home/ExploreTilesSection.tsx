import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const exploreTiles = [
  {
    title: 'Articles',
    description: 'Focused essays that make useful ideas easier to understand and apply.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    link: '/articles'
  },
  {
    title: 'Library',
    description: 'Long-form writing, study guides, and foundational texts gathered in one place.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&q=80',
    link: '/library'
  },
  {
    title: 'Creative',
    description: 'Poetry, music, reflections, and visual work from the more expressive side of the project.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
    link: '/creative'
  },
  {
    title: 'Resources',
    description: 'Curated books, tools, podcasts, and references for deeper study.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    link: '/resources'
  }
];

export function ExploreTilesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-3xl md:text-4xl text-gold-gradient mb-4">
            Explore by Format
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse by format and follow what helps most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {exploreTiles.map((tile, index) => (
            <Link
              key={index}
              to={tile.link}
              className="group relative block overflow-hidden border border-primary/15 h-60"
            >
              <img
                src={tile.image}
                alt={tile.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/65 to-background/45 group-hover:from-background/90 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end justify-between px-6 pb-6">
                <div>
                  <h3 className="font-cinzel text-2xl md:text-3xl text-foreground group-hover:text-gold-gradient transition-colors mb-2">
                    {tile.title}
                  </h3>
                  <p className="font-cormorant text-lg text-muted-foreground max-w-md">
                    {tile.description}
                  </p>
                </div>
                <ArrowRight className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
