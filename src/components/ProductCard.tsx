import React, { useState } from 'react';
import { Plus, Check, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, openProductModal } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, product.flavors[0], product.sizes[0], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => openProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-[#ccff00]/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden cursor-pointer backdrop-blur-sm active:scale-[0.99]"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/4.5] sm:aspect-[4/4.8] w-full overflow-hidden bg-gradient-to-b from-zinc-800/40 via-zinc-900/60 to-zinc-950">
        
        {/* Dual image hover transition */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/95 via-transparent to-black/25 pointer-events-none" />

        {/* Badges on top */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none z-10">
          {product.badge ? (
            <span className="px-2.5 py-1 text-[10px] font-tech font-extrabold uppercase tracking-wider rounded-md bg-[#ccff00] text-black shadow-lg shimmer-badge">
              {product.badge}
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[10px] font-tech font-bold uppercase tracking-wider rounded-md bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-md">
              {product.category}
            </span>
          )}

          {product.originalPrice && (
            <span className="px-2 py-0.5 text-[10px] font-tech font-semibold uppercase rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              SAVE {product.originalPrice - product.price} EGP
            </span>
          )}
        </div>

        {/* Quick View overlay hint on desktop hover */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>View Formula</span>
          </div>
        </div>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-[11px] font-tech text-zinc-300 tracking-wider uppercase bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-800">
            {product.servingSize}
          </span>
          <span className="text-[11px] font-tech text-zinc-300 tracking-wider uppercase bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-zinc-800">
            {product.timing}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-tech uppercase text-[11px] text-[#ccff00] tracking-wider font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-xs">{product.rating}</span>
              <span className="text-[10px] text-zinc-500 font-tech">({product.reviewCount})</span>
            </div>
          </div>

          <h2 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#ccff00] transition-colors leading-tight">
            {product.name}
          </h2>

          <p className="text-xs text-zinc-400 font-sans-clean line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-display font-black text-base sm:text-lg text-white">
              {formatEGP(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-zinc-500 line-through font-tech -mt-0.5">
                {formatEGP(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            id={`btn-quick-add-${product.id}`}
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl font-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              justAdded
                ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-105'
                : 'bg-zinc-800 hover:bg-[#ccff00] text-zinc-200 hover:text-black border border-zinc-700 hover:border-[#ccff00] active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
