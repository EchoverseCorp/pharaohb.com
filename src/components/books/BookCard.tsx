import { Book } from '@/data/booksData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { books as libraryBooks } from '@/data/books';

interface BookCardProps {
  book: Book;
}

const formatLabels: Record<Book['format'], string> = {
  ebook: 'E-Book',
  paperback: 'Paperback',
  hardcover: 'Hardcover',
  audiobook: 'Audiobook',
};

export function BookCard({ book }: BookCardProps) {
  const hasLibraryEntry = libraryBooks.some((libraryBook) => libraryBook.slug === book.id);
  const hasPurchaseLink = !!book.purchaseLink;

  return (
    <div className="group bg-card border border-border p-5 md:p-6">
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-border">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/20 group-hover:bg-background/35 transition-colors duration-300" />
        
        {/* Format Badge */}
        <Badge 
          variant="secondary"
          className="absolute top-4 right-4 font-cinzel text-xs tracking-wider bg-background/90 text-foreground border-primary/30"
        >
          {formatLabels[book.format]}
        </Badge>
      </div>

      {/* Book Info */}
      <div className="space-y-3">
        <h3 className="font-cinzel text-xl text-foreground group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        
        {book.subtitle && (
          <p className="font-cormorant text-base text-primary/70 italic">
            {book.subtitle}
          </p>
        )}
        
        <p className="font-cormorant text-muted-foreground leading-relaxed line-clamp-3">
          {book.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="font-cinzel text-lg text-primary">
            ${book.price.toFixed(2)}
          </span>

          {hasPurchaseLink ? (
            <Button
              asChild
              variant="outline"
              className="font-cinzel text-xs tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <a 
                href={book.purchaseLink}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
            </Button>
          ) : hasLibraryEntry ? (
            <Button
              asChild
              variant="outline"
              className="font-cinzel text-xs tracking-wider border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to={`/library/${book.id}`}>View in Library</Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="font-cinzel text-xs tracking-wider border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/contact">Request Access</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
