import { books } from './books';
import { artworks } from './artworks';

export interface Product {
  id: string;
  name: string;
  category: 'Books' | 'Art' | 'Objects' | 'Apparel';
  price: string;
  image: string;
  description: string;
  link?: string;
}

// Objects/Apparel products
const objectProducts: Product[] = [
  {
    id: 'obj-1',
    name: 'The Ankh Pendant',
    category: 'Objects',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    description: 'Hand-crafted gold pendant symbolizing eternal life. Sterling silver base with 18k gold plating.'
  },
  {
    id: 'obj-2',
    name: 'Sacred Incense Set',
    category: 'Objects',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
    description: 'Premium frankincense and myrrh blend for sacred ceremonies and meditation practice.'
  },
  {
    id: 'obj-3',
    name: 'Obsidian Meditation Stone',
    category: 'Objects',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&q=80',
    description: 'Polished volcanic obsidian for grounding and protection during deep meditation.'
  },
  {
    id: 'obj-4',
    name: 'Temple Candle Collection',
    category: 'Objects',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1602607667972-88a5d8c8e094?w=800&q=80',
    description: 'Set of three hand-poured soy candles with amber, sandalwood, and myrrh.'
  },
  {
    id: 'app-1',
    name: 'Pharaoh B. Signature Robe',
    category: 'Apparel',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    description: 'Luxurious black linen robe with gold embroidered sacred geometry. One size.'
  },
  {
    id: 'app-2',
    name: 'Golden Ratio Ring',
    category: 'Apparel',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    description: 'Sterling silver ring featuring the golden spiral. Available in sizes 6-12.'
  },
  {
    id: 'app-3',
    name: 'Threshold Scarf',
    category: 'Apparel',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80',
    description: 'Silk scarf with geometric patterns in black and gold.'
  },
  {
    id: 'app-4',
    name: 'Sacred Geometry Tee',
    category: 'Apparel',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    description: 'Premium black cotton tee with gold Metatron\'s Cube print.'
  }
];

// Convert books to products
const bookProducts: Product[] = books.map(book => ({
  id: `book-${book.slug}`,
  name: book.title,
  category: 'Books' as const,
  price: book.price,
  image: book.image,
  description: book.description.slice(0, 100) + '...',
  link: `/library/${book.slug}`
}));

// Convert select artworks to products
const artProducts: Product[] = artworks.slice(0, 4).map(art => ({
  id: `art-${art.slug}`,
  name: art.title,
  category: 'Art' as const,
  price: art.formats[0].price,
  image: art.image,
  description: art.description,
  link: `/art/${art.slug}`
}));

export const products: Product[] = [
  ...bookProducts,
  ...artProducts,
  ...objectProducts
];

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};
