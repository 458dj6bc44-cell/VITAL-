import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { AnimatedReveal } from './AnimatedReveal';

interface ProductCatalogProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');

  const categories: ProductCategory[] = ['All', 'Protein', 'Performance', 'Recovery', 'Hydration', 'Wellness'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (badgeFilter === 'bestsellers') {
      result = result.filter((p) => p.badge === 'BEST SELLER');
    } else if (badgeFilter === 'essentials') {
      result = result.filter((p) => p.badge === 'ESSENTIAL');
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, badgeFilter, sortOption]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#0b0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Animated Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] sm:text-xs font-tech text-[#ccff00] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>THE COMPLETE SYSTEM ({PRODUCTS.length} FORMULAS)</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
                PRECISION CATALOG
              </h2>
              <p className="text-zinc-400 font-sans-clean text-sm sm:text-base max-w-xl">
                Every formula is dosed with clinical intent. No filler carbohydrates, no hidden proprietary matrices, and no compromise.
              </p>
            </div>

            {/* Quick Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-tech text-zinc-400 uppercase">
                <ArrowUpDown className="w-4 h-4 text-[#ccff00]" />
                <span className="hidden sm:inline">Sort:</span>
              </div>
              <select
                id="select-catalog-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-xl px-3 py-2 text-xs font-tech uppercase tracking-wider focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                <option value="featured">Featured / Signatures</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </AnimatedReveal>

        {/* Category Pills & Filters with Smooth Active Pill Effect */}
        <AnimatedReveal animation="fade-in" delay={150} duration={600}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800/80">
            {/* Category Tabs (Scrollable on mobile) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {categories.map((category) => {
                const count =
                  category === 'All'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === category).length;
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    id={`cat-filter-${category.toLowerCase()}`}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer transform ${
                      isActive
                        ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-[1.03]'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-black text-[#ccff00]' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Secondary Filter Tags */}
            <div className="flex items-center gap-2 text-xs font-tech">
              <span className="text-zinc-500 uppercase hidden md:inline">Quick Filter:</span>
              <button
                onClick={() => setBadgeFilter(badgeFilter === 'bestsellers' ? 'all' : 'bestsellers')}
                className={`px-3 py-1.5 rounded-xl border text-xs uppercase transition-all cursor-pointer ${
                  badgeFilter === 'bestsellers'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 scale-105'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                ★ Best Sellers
              </button>
              <button
                onClick={() => setBadgeFilter(badgeFilter === 'essentials' ? 'all' : 'essentials')}
                className={`px-3 py-1.5 rounded-xl border text-xs uppercase transition-all cursor-pointer ${
                  badgeFilter === 'essentials'
                    ? 'bg-[#ccff00]/20 border-[#ccff00] text-[#ccff00] scale-105'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ Essentials
              </button>
            </div>
          </div>
        </AnimatedReveal>

        {/* Product Grid with Staggered Entrance */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/40 rounded-2xl border border-zinc-800">
            <p className="text-zinc-400 font-tech text-sm uppercase">No supplements found matching this filter.</p>
            <button
              onClick={() => {
                onSelectCategory('All');
                setBadgeFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 text-white rounded-lg text-xs font-tech uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <AnimatedReveal
                key={product.id}
                animation="fade-up"
                delay={Math.min(350, (idx % 4) * 90)}
                duration={600}
              >
                <ProductCard product={product} />
              </AnimatedReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
