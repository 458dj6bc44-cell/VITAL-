import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Check, ShoppingBag, ArrowRight, Sparkles, Clock, Beaker, HelpCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatEGP, getWhatsAppDirectProductUrl } from '../utils/whatsapp';
import { PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'facts' | 'benefits' | 'ingredients' | 'usage'>('facts');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setSelectedImage(product.gallery[0] || product.image);
    setSelectedFlavor(product.flavors[0] || 'Standard');
    setSelectedSize(product.sizes[0] || 'Standard');
    setQuantity(1);
  }, [product]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product, selectedFlavor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      openCart('cart');
    }, 250);
  };

  const handleDirectOrder = () => {
    addItem(product, selectedFlavor, selectedSize, quantity);
    onClose();
    openCart('customer');
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        id="product-detail-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl my-auto rounded-2xl sm:rounded-3xl bg-[#0f1013] border border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar with Close Button */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800 bg-[#0f1013]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
              VITALØ // {product.category}
            </span>
          </div>

          <button
            id="btn-close-product-modal"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-700/80 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery & Product Visuals */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Featured Image */}
              <div className="relative aspect-[4/4.5] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 group">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-tech font-bold uppercase tracking-wider rounded-md bg-[#ccff00] text-black shadow-lg">
                    {product.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-tech text-zinc-300">
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-700">
                    {product.servingSize}
                  </span>
                  <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-700">
                    {product.servingsPerContainer} Servings
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img
                          ? 'border-[#ccff00] scale-95 shadow-md'
                          : 'border-zinc-800 hover:border-zinc-600 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Clean Science Assurances */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#ccff00] font-tech font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The VITALØ Clean Standard</span>
                </div>
                <p className="text-zinc-400 font-sans-clean leading-relaxed">
                  Third-party tested for banned substances, heavy metals, and microbiological purity. Manufactured in cGMP-certified facilities. No proprietary matrices.
                </p>
              </div>
            </div>

            {/* Right: Specifications, Variant Selectors, Pricing & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Product Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-xs">{product.rating}</span>
                  <span className="text-zinc-500 font-tech">({product.reviewCount} customer reviews)</span>
                </div>

                <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
                  {product.name}
                </h1>

                <p className="text-sm font-sans-clean text-[#ccff00] font-medium">
                  {product.tagline}
                </p>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans-clean leading-relaxed pt-1">
                  {product.longDesc}
                </p>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-tech uppercase text-zinc-400">Price in Egyptian Pounds</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white">
                      {formatEGP(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-zinc-400 line-through font-tech">
                        {formatEGP(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-tech font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    In Stock & Ready
                  </span>
                  <div className="text-[10px] text-zinc-400 font-tech mt-1">Direct WhatsApp Delivery</div>
                </div>
              </div>

              {/* Flavor Selector */}
              {product.flavors.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-tech">
                    <span className="uppercase text-zinc-400">Select Flavor / Formula</span>
                    <span className="text-[#ccff00] font-bold">{selectedFlavor}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`p-3 text-left rounded-xl text-xs font-tech uppercase tracking-wide border transition-all cursor-pointer ${
                          selectedFlavor === flavor
                            ? 'bg-[#ccff00]/10 border-[#ccff00] text-white shadow-sm'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 1 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-tech">
                    <span className="uppercase text-zinc-400">Select Size / Volume</span>
                    <span className="text-[#ccff00] font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-tech uppercase tracking-wide border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Dual Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-tech font-bold text-sm text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add to Cart */}
                  <button
                    id="btn-modal-add-to-cart"
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatEGP(product.price * quantity)}</span>
                  </button>
                </div>

                {/* Instant WhatsApp Order CTA -> Enters Customer Details */}
                <button
                  id="btn-modal-direct-whatsapp"
                  onClick={handleDirectOrder}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] cursor-pointer active:scale-98"
                >
                  <span>ORDER THIS ITEM ON WHATSAPP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-400 text-center font-tech">
                  ⚡ Same-day confirmation on WhatsApp (+20 155 538 0043) • Pay on delivery or via InstaPay
                </p>
              </div>

            </div>

          </div>

          {/* Deep Formula Breakdown Tabs */}
          <div className="pt-6 border-t border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab('facts')}
                className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'facts'
                    ? 'bg-[#ccff00] text-black'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Supplement Facts
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'benefits'
                    ? 'bg-[#ccff00] text-black'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Clinical Highlights
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'ingredients'
                    ? 'bg-[#ccff00] text-black'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Full Ingredient List
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`px-4 py-2 rounded-xl text-xs font-tech font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'usage'
                    ? 'bg-[#ccff00] text-black'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                Usage & Timing Protocol
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              {activeTab === 'facts' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="border-b-4 border-white pb-2">
                    <h3 className="font-display font-extrabold text-2xl text-white">Supplement Facts</h3>
                    <div className="text-xs text-zinc-400 font-tech">
                      Serving Size: {product.servingSize} • Servings Per Container: {product.servingsPerContainer}
                    </div>
                  </div>

                  <div className="divide-y divide-zinc-800 text-xs sm:text-sm font-tech">
                    {product.supplementFacts.map((fact, i) => (
                      <div key={i} className="py-2 flex items-center justify-between">
                        <span className="font-bold text-zinc-200">{fact.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-300">{fact.amount}</span>
                          {fact.dailyValue && (
                            <span className="text-[#ccff00] w-12 text-right">{fact.dailyValue}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 font-sans-clean pt-2">
                    * Percent Daily Values are based on a 2,000 calorie diet. ** Daily Value not established. Formulated strictly for dietary supplement use.
                  </p>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-zinc-200 font-sans-clean leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-tech text-[#ccff00] uppercase font-bold">
                    <Beaker className="w-4 h-4" />
                    <span>Complete Transparency Label</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-800">
                    {product.ingredients}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-sans-clean">
                    Free from banned artificial colors, chemical preservatives, heavy metal contaminants, and filler binders.
                  </p>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-tech text-[#ccff00] uppercase font-bold">
                    <Clock className="w-4 h-4" />
                    <span>Optimal Bioavailability Protocol</span>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                    <div className="text-xs font-tech text-white uppercase font-bold">Recommended Dosage</div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans-clean leading-relaxed">
                      {product.usageInstructions}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <div className="text-xs font-tech text-zinc-400 uppercase">Suggested Timing Window</div>
                    <div className="text-sm font-tech font-bold text-[#ccff00]">{product.timing}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Formulas Strip */}
          <div className="pt-6 border-t border-zinc-800 space-y-3">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Pair With For Maximum Synergy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    // switch modal to this product
                    setSelectedImage(rel.image);
                    setSelectedFlavor(rel.flavors[0] || 'Standard');
                    setSelectedSize(rel.sizes[0] || 'Standard');
                  }}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-[#ccff00]/40 transition-colors flex items-center gap-3 cursor-pointer group"
                >
                  <img src={rel.image} alt={rel.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-display font-bold text-xs text-white group-hover:text-[#ccff00] truncate">
                      {rel.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-tech">{rel.category}</span>
                    <span className="text-xs font-bold text-zinc-200 mt-1">{formatEGP(rel.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
