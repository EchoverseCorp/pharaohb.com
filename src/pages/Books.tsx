import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionContainer } from '@/components/shared/SectionContainer';
import { BookCard } from '@/components/books/BookCard';
import { books, booksPageContent } from '@/data/booksData';
import brandSymbol from '@/assets/brand-symbol.png';
import { JsonLd } from '@/components/shared/JsonLd';

const Books = () => {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pharaoh B Books',
    itemListElement: books.map((book, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Book',
        name: book.title,
        description: book.description,
      },
    })),
  };

  return (
    <PageLayout>
      <JsonLd data={itemListSchema} />
      <PageHeader
        title={booksPageContent.title}
        subtitle={booksPageContent.subtitle}
        orientationText={booksPageContent.description}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <div className="border border-primary/20 bg-card p-4 text-center">
            <p className="font-cinzel text-xs tracking-[0.18em] uppercase text-primary/70">Collection</p>
            <p className="font-cormorant text-lg text-foreground mt-1">{books.length} Books</p>
          </div>
          <div className="border border-primary/20 bg-card p-4 text-center">
            <p className="font-cinzel text-xs tracking-[0.18em] uppercase text-primary/70">Best Entry</p>
            <p className="font-cormorant text-lg text-foreground mt-1">Echoes of Becoming</p>
          </div>
          <div className="border border-primary/20 bg-card p-4 text-center">
            <p className="font-cinzel text-xs tracking-[0.18em] uppercase text-primary/70">Next Step</p>
            <p className="font-cormorant text-lg text-foreground mt-1">Open Library</p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </SectionContainer>

      {/* Divider */}
      <div className="egyptian-divider max-w-md mx-auto my-16">
        <img src={brandSymbol} alt="Pharaoh B. Symbol" className="w-12 h-12 object-contain" />
      </div>

      {/* On the Horizon Section */}
      <SectionContainer>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-cinzel text-2xl md:text-3xl text-foreground mb-6">
            Next Releases
          </h2>
          <p className="font-cormorant text-lg text-muted-foreground leading-relaxed">
            Additional books and editions are in production. Use Contact for early access or release updates.
          </p>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default Books;
