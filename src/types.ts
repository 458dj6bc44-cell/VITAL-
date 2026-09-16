export type ProductCategory = 'All' | 'Protein' | 'Performance' | 'Recovery' | 'Hydration' | 'Wellness';

export interface SupplementFact {
  name: string;
  amount: string;
  dailyValue?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Protein' | 'Performance' | 'Recovery' | 'Hydration' | 'Wellness';
  price: number; // in EGP
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'BEST SELLER' | 'NEW' | 'POPULAR' | 'ESSENTIAL' | 'LIMITED';
  image: string;
  secondaryImage: string;
  gallery: string[];
  shortDesc: string;
  longDesc: string;
  servingSize: string;
  servingsPerContainer: number;
  flavors: string[];
  sizes: string[];
  benefits: string[];
  supplementFacts: SupplementFact[];
  ingredients: string;
  usageInstructions: string;
  timing: string; // e.g., 'Post-Workout', 'Pre-Workout', 'Morning', 'Before Bed'
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${selectedFlavor}-${selectedSize}`
  productId: string;
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedSize: string;
  unitPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  headline: string;
  quote: string;
  productUsed: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
