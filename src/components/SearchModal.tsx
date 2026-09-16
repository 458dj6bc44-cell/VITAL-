import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/whatsapp';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openProductModal, addItem } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  // Global keydown handler for Esc and Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
        );
      })
    : PRODUCTS.slice(0, 4); // show 4 signatures when empty

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto animate-fade-in"
      onClick={closeSearch}
    >
      <div
        id="search-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0f1013] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden mt-6 sm:mt-12 flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950/80">
          <Search className="w-5 h-5 text-[#ccff00] shrink-0" />
          <input
            ref={inputRef}
            id="input-global-search"
            type="text"
            placeholder="Search VITALØ formulas (e.g. Whey, Creatine, Electrolytes)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-zinc-500 font-sans-clean text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1 text-xs font-tech"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-800/60 flex items-center gap-2 overflow-x-auto text-[11px] font-tech text-zinc-400">
          <span className="uppercase text-zinc-500 shrink-0">Popular:</span>
          {['Whey Protein', 'Creapure Creatine', 'Electrolytes', 'Pre-Workout', 'Magnesium'].map(
            (term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 hover:text-[#ccff00] border border-zinc-800 transition-colors shrink-0"
              >
                {term}
              </button>
            )
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-tech uppercase text-zinc-500 px-2 mb-1 flex items-center justify-between">
            <span>{query ? `Found ${filtered.length} matching formulas` : 'Featured Formulas'}</span>
            <span className="text-[10px]">Press Esc to close</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <p className="text-sm font-tech">No formulas found for "{query}"</p>
              <p className="text-xs font-sans-clean text-zinc-400">
                Try searching for protein, creatine, recovery, or hydration.
              </p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  closeSearch();
                  openProductModal(product);
                }}
                className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover bg-zinc-950 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-white group-hover:text-[#ccff00] transition-colors truncate">
                        {product.name}
                      </span>
                      {product.badge && (
                        <span className="text-[9px] font-tech font-bold uppercase bg-[#ccff00]/10 text-[#ccff00] px-1.5 py-0.5 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 font-sans-clean line-clamp-1">
                      {product.shortDesc}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-tech text-zinc-500">
                      <span className="text-zinc-400">{product.category}</span>
                      <span>•</span>
                      <span className="text-amber-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-current" /> {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-display font-bold text-sm text-white">
                    {formatEGP(product.price)}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-[#ccff00] group-hover:text-black transition-colors flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
