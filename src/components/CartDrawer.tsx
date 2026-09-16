import React, { useState } from 'react';
import {
  X,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ShoppingBag,
  Truck,
  AlertCircle,
  CheckCircle,
  Edit3,
  MessageCircle,
  User,
  Phone,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  Copy,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  formatEGP,
  getWhatsAppOrderUrl,
  generateWhatsAppOrderMessage,
  isMobileDevice,
  FREE_SHIPPING_THRESHOLD,
  WHATSAPP_PHONE_NUMBER
} from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    checkoutStep,
    setCheckoutStep,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingFee,
    total,
    freeShippingRemaining,
    customerDetails,
    updateCustomerDetails
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isCartOpen) return null;

  // Validation strictly checking required fields
  const validateCustomerForm = () => {
    const errors: { [key: string]: string } = {};

    if (!customerDetails.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    const cleanPhone = customerDetails.phone.replace(/[\s\-\(\)]/g, '');
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (cleanPhone.length < 8 || !/^[0-9+]+$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number (e.g. 01012345678)';
    }

    if (!customerDetails.city.trim()) {
      errors.city = 'City / Area is required';
    }

    if (!customerDetails.address.trim()) {
      errors.address = 'Full delivery address is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToCustomerForm = () => {
    if (items.length === 0) return;
    setFormErrors({});
    setCheckoutStep('customer');
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCustomerForm()) {
      return;
    }
    setCheckoutStep('review');
  };

  const handleConfirmAndOrderWhatsApp = (forceTarget?: 'desktop' | 'mobile') => {
    if (!validateCustomerForm() || items.length === 0) {
      setCheckoutStep('customer');
      return;
    }

    setIsSubmitting(true);

    const message = generateWhatsAppOrderMessage(
      items,
      customerDetails,
      subtotal,
      shippingFee,
      total
    );
    const encodedMessage = encodeURIComponent(message);

    // Desktop/PC: ALWAYS open WhatsApp Web URL in a new browser tab:
    // https://web.whatsapp.com/send?phone=201555380043&text=ENCODED_MESSAGE
    // (Strictly avoid deep links, desktop app protocols, or whatsapp://)
    // Mobile: Use standard wa.me HTTPS link:
    // https://wa.me/201555380043?text=ENCODED_MESSAGE
    let targetUrl: string;
    if (forceTarget === 'desktop') {
      targetUrl = `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedMessage}`;
    } else if (forceTarget === 'mobile') {
      targetUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
    } else {
      targetUrl = isMobileDevice()
        ? `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_NUMBER}&text=${encodedMessage}`;
    }

    // Open target in a new browser tab
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    // Move to success step
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep('success');
    }, 300);
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppOrderMessage(
      items,
      customerDetails,
      subtotal,
      shippingFee,
      total
    );
    navigator.clipboard.writeText(message);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2200);
  };

  const progressPercent = Math.min(
    100,
    Math.round(((FREE_SHIPPING_THRESHOLD - freeShippingRemaining) / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end transition-opacity duration-300 animate-fade-in"
      onClick={closeCart}
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0d0e11] border-l border-zinc-800 h-full flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300"
      >
        {/* Top Header Bar with Breadcrumb / Step Indicator */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-[#0d0e11]/95 backdrop-blur-md flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {checkoutStep === 'customer' && (
              <button
                id="btn-back-to-cart"
                onClick={() => setCheckoutStep('cart')}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="Back to Bag"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            {checkoutStep === 'review' && (
              <button
                id="btn-back-to-customer"
                onClick={() => setCheckoutStep('customer')}
                className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="Back to Customer Info"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-[#ccff00]">
                  {checkoutStep === 'cart' && 'STAGE 1 // BAG'}
                  {checkoutStep === 'customer' && 'STAGE 2 // CUSTOMER DETAILS'}
                  {checkoutStep === 'review' && 'STAGE 3 // ORDER REVIEW'}
                  {checkoutStep === 'success' && 'STAGE 4 // SUBMITTED'}
                </span>
              </div>
              <h2 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight">
                {checkoutStep === 'cart' && 'YOUR PERFORMANCE BAG'}
                {checkoutStep === 'customer' && 'DELIVERY INFORMATION'}
                {checkoutStep === 'review' && 'REVIEW YOUR ORDER'}
                {checkoutStep === 'success' && 'ORDER TRANSMITTED'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-cart-drawer"
            onClick={closeCart}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-700 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Visible in Cart & Customer stages) */}
        {checkoutStep !== 'success' && (
          <div className="bg-zinc-900/60 px-4 py-3 border-b border-zinc-800/80">
            <div className="flex items-center justify-between text-xs font-tech mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5 text-[#ccff00]" />
                {freeShippingRemaining > 0 ? (
                  <>Add <strong className="text-[#ccff00]">{formatEGP(freeShippingRemaining)}</strong> for FREE Shipping</>
                ) : (
                  <span className="text-[#ccff00] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> FREE NEXT-DAY SHIPPING UNLOCKED
                  </span>
                )}
              </span>
              <span className="text-[11px] text-zinc-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ccff00] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Step Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">

          {/* ========================================================================= */}
          {/* STEP 1: CART ITEMS LIST */}
          {/* ========================================================================= */}
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white">Your bag is empty</h3>
                    <p className="text-xs text-zinc-400 font-sans-clean max-w-xs mx-auto leading-relaxed">
                      Fuel your training with precision formulas. Choose Native Whey Isolate, Creapure® Creatine, or Cellular Electrolytes.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-tech font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#b8e600] transition-colors"
                  >
                    Browse Supplements
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-tech text-zinc-400 uppercase">
                    <span>Selected Formulas ({items.length})</span>
                    <button
                      onClick={clearCart}
                      className="text-zinc-500 hover:text-rose-400 transition-colors"
                    >
                      Clear Bag
                    </button>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex gap-3.5 items-center transition-all hover:border-zinc-700"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-white truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-zinc-400 font-tech truncate mt-0.5">
                            {[item.selectedFlavor, item.selectedSize].filter(Boolean).join(' • ')}
                          </div>
                          <div className="font-tech font-bold text-xs text-[#ccff00] mt-1.5">
                            {formatEGP(item.unitPrice)}
                          </div>
                        </div>

                        {/* Quantity & Delete Controls */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white rounded hover:bg-zinc-800 text-sm font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-tech font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white rounded hover:bg-zinc-800 text-sm font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust highlight */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-[11px] font-tech text-zinc-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>Pure cold-filtered formulas • Fresh stock guaranteed</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: CUSTOMER INFORMATION FORM */}
          {/* ========================================================================= */}
          {checkoutStep === 'customer' && (
            <form onSubmit={handleProceedToReview} className="space-y-4 animate-fade-in">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 font-sans-clean leading-relaxed flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                <p>
                  Please provide your dispatch information. This generates your WhatsApp order message for instant courier confirmation.
                </p>
              </div>

              {/* Full Name Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <label htmlFor="checkout-name" className="text-zinc-300 font-bold uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>Full Name *</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 uppercase">REQUIRED</span>
                </div>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="e.g. Ahmed Ali"
                  value={customerDetails.fullName}
                  onChange={(e) => {
                    updateCustomerDetails({ fullName: e.target.value });
                    if (formErrors.fullName) {
                      setFormErrors((prev) => ({ ...prev, fullName: '' }));
                    }
                  }}
                  className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors ${
                    formErrors.fullName ? 'border-rose-500 bg-rose-500/5' : 'border-zinc-800'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-rose-400 font-tech flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <label htmlFor="checkout-phone" className="text-zinc-300 font-bold uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>Phone Number *</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 uppercase">REQUIRED</span>
                </div>
                <input
                  id="checkout-phone"
                  type="tel"
                  placeholder="e.g. 01012345678"
                  value={customerDetails.phone}
                  onChange={(e) => {
                    updateCustomerDetails({ phone: e.target.value });
                    if (formErrors.phone) {
                      setFormErrors((prev) => ({ ...prev, phone: '' }));
                    }
                  }}
                  className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors ${
                    formErrors.phone ? 'border-rose-500 bg-rose-500/5' : 'border-zinc-800'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-rose-400 font-tech flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.phone}
                  </p>
                )}
              </div>

              {/* City / Area Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <label htmlFor="checkout-city" className="text-zinc-300 font-bold uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>City / Area *</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 uppercase">REQUIRED</span>
                </div>
                <input
                  id="checkout-city"
                  type="text"
                  placeholder="e.g. Cairo, New Cairo, Giza, Alexandria"
                  value={customerDetails.city}
                  onChange={(e) => {
                    updateCustomerDetails({ city: e.target.value });
                    if (formErrors.city) {
                      setFormErrors((prev) => ({ ...prev, city: '' }));
                    }
                  }}
                  className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors ${
                    formErrors.city ? 'border-rose-500 bg-rose-500/5' : 'border-zinc-800'
                  }`}
                />
                {formErrors.city && (
                  <p className="text-[11px] text-rose-400 font-tech flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.city}
                  </p>
                )}
              </div>

              {/* Full Delivery Address Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <label htmlFor="checkout-address" className="text-zinc-300 font-bold uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>Full Delivery Address *</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 uppercase">REQUIRED</span>
                </div>
                <textarea
                  id="checkout-address"
                  rows={2}
                  placeholder="e.g. 123 Example Street, Nasr City, Apt 4, Floor 2"
                  value={customerDetails.address}
                  onChange={(e) => {
                    updateCustomerDetails({ address: e.target.value });
                    if (formErrors.address) {
                      setFormErrors((prev) => ({ ...prev, address: '' }));
                    }
                  }}
                  className={`w-full bg-zinc-900/90 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors ${
                    formErrors.address ? 'border-rose-500 bg-rose-500/5' : 'border-zinc-800'
                  }`}
                />
                {formErrors.address && (
                  <p className="text-[11px] text-rose-400 font-tech flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.address}
                  </p>
                )}
              </div>

              {/* Additional Information / Notes (OPTIONAL) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-tech">
                  <label htmlFor="checkout-notes" className="text-zinc-300 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Additional Information / Notes</span>
                  </label>
                  <span className="text-[10px] text-zinc-500 uppercase">OPTIONAL</span>
                </div>
                <input
                  id="checkout-notes"
                  type="text"
                  placeholder="e.g. Please deliver after 6 PM, or call upon arrival"
                  value={customerDetails.notes || ''}
                  onChange={(e) => updateCustomerDetails({ notes: e.target.value })}
                  className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors"
                />
                <p className="text-[10px] text-zinc-500 font-sans-clean">
                  Preferred delivery time, building details, or special instructions.
                </p>
              </div>

              {/* Order total preview pill */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs font-tech">
                <span className="text-zinc-400">Order Total ({items.length} items):</span>
                <span className="text-[#ccff00] font-bold text-sm">{formatEGP(total)}</span>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: REVIEW ORDER SUMMARY */}
          {/* ========================================================================= */}
          {checkoutStep === 'review' && (
            <div className="space-y-5 animate-fade-in">
              {/* Customer Information Card */}
              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#ccff00]" />
                    <span className="font-display font-bold text-xs uppercase text-white tracking-wider">
                      Customer Information
                    </span>
                  </div>
                  <button
                    id="btn-review-edit-customer"
                    onClick={() => setCheckoutStep('customer')}
                    className="inline-flex items-center gap-1 text-[11px] font-tech text-[#ccff00] hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-1.5 text-xs font-sans-clean">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Name:</span>
                    <span className="text-white font-medium">{customerDetails.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Phone:</span>
                    <span className="text-white font-tech">{customerDetails.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">City / Area:</span>
                    <span className="text-white font-medium">{customerDetails.city}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-zinc-400 shrink-0">Address:</span>
                    <span className="text-white font-medium text-right">{customerDetails.address}</span>
                  </div>
                  {customerDetails.notes && customerDetails.notes.trim() && (
                    <div className="flex justify-between items-start gap-4 pt-1 border-t border-zinc-800/60">
                      <span className="text-zinc-400 shrink-0">Notes:</span>
                      <span className="text-[#ccff00] text-right font-medium italic">
                        "{customerDetails.notes.trim()}"
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items Review */}
              <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#ccff00]" />
                    <span className="font-display font-bold text-xs uppercase text-white tracking-wider">
                      Itemized Order ({items.length})
                    </span>
                  </div>
                  <button
                    id="btn-review-edit-cart"
                    onClick={() => setCheckoutStep('cart')}
                    className="inline-flex items-center gap-1 text-[11px] font-tech text-[#ccff00] hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {items.map((item, idx) => {
                    const variantStr = [item.selectedFlavor, item.selectedSize].filter(Boolean).join(' / ') || 'Standard';
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-800/40 last:border-b-0"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="font-bold text-white truncate">
                            {idx + 1}. {item.product.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 font-tech">
                            {variantStr} • Qty: {item.quantity}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-tech font-bold text-zinc-200">
                            {formatEGP(item.unitPrice * item.quantity)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-zinc-500 font-tech">
                              ({formatEGP(item.unitPrice)} ea)
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Calculations Breakdown */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs font-tech">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">{formatEGP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-[#ccff00] font-bold' : 'text-zinc-200'}>
                    {shippingFee === 0 ? 'FREE' : formatEGP(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Due</span>
                  <span className="font-display text-[#ccff00] text-xl">
                    {formatEGP(total)}
                  </span>
                </div>
              </div>

              {/* WhatsApp explanation notice */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#ccff00]/5 border border-[#ccff00]/20 text-[11px] text-zinc-300 font-sans-clean">
                <ShieldCheck className="w-4 h-4 text-[#ccff00] shrink-0" />
                <span>
                  {isMobileDevice() ? (
                    <>Clicking below transmits your order directly to <strong>WhatsApp (+{WHATSAPP_PHONE_NUMBER})</strong>.</>
                  ) : (
                    <>Clicking below launches <strong>WhatsApp Web in a new browser tab</strong> with your pre-filled order.</>
                  )}
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: ORDER SUCCESS / DISPATCHED */}
          {/* ========================================================================= */}
          {checkoutStep === 'success' && (
            <div className="py-8 px-2 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.15)]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  ORDER PREPARED FOR WHATSAPP!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans-clean max-w-sm mx-auto leading-relaxed">
                  {isMobileDevice()
                    ? 'Your order message was transmitted. If WhatsApp did not open automatically, tap below.'
                    : 'WhatsApp Web has opened in a new browser tab with your pre-filled order. If it didn’t open, click below.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3 max-w-sm mx-auto">
                <button
                  id="btn-reopen-whatsapp"
                  onClick={() => handleConfirmAndOrderWhatsApp()}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {isMobileDevice()
                      ? `OPEN IN WHATSAPP (+${WHATSAPP_PHONE_NUMBER})`
                      : `OPEN WHATSAPP WEB (+${WHATSAPP_PHONE_NUMBER})`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {/* Copy order text button */}
                <button
                  id="btn-copy-order-text"
                  onClick={handleCopyMessage}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 font-tech text-xs uppercase tracking-wider transition-colors border border-zinc-700/80 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#ccff00]" />
                      <span className="text-[#ccff00]">ORDER MESSAGE COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>COPY ORDER TEXT TO CLIPBOARD</span>
                    </>
                  )}
                </button>

                {/* Device-specific alternative fallback */}
                <div className="pt-1 flex items-center justify-center gap-3 text-[11px] font-tech text-zinc-400">
                  <button
                    onClick={() => handleConfirmAndOrderWhatsApp('desktop')}
                    className="hover:text-[#ccff00] underline flex items-center gap-1 cursor-pointer"
                    title="Launch browser-based WhatsApp Web"
                  >
                    <Laptop className="w-3 h-3" />
                    <span>WhatsApp Web</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => handleConfirmAndOrderWhatsApp('mobile')}
                    className="hover:text-[#ccff00] underline flex items-center gap-1 cursor-pointer"
                    title="Launch mobile WhatsApp link"
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile Link</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    closeCart();
                  }}
                  className="mt-2 w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white font-tech text-xs uppercase tracking-wider transition-colors border border-zinc-800 cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* DRAWER FOOTER / STEP ACTIONS */}
        {/* ========================================================================= */}
        {items.length > 0 && checkoutStep !== 'success' && (
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#0d0e11] space-y-3 z-10">
            {/* Step 1 Footer: Price breakdown + Proceed to Customer Form */}
            {checkoutStep === 'cart' && (
              <>
                <div className="space-y-1.5 text-xs font-tech">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-zinc-200">{formatEGP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated Shipping</span>
                    <span className={shippingFee === 0 ? 'text-[#ccff00] font-bold' : 'text-zinc-200'}>
                      {shippingFee === 0 ? 'FREE' : formatEGP(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                    <span>Estimated Total</span>
                    <span className="font-display text-[#ccff00] text-xl">
                      {formatEGP(total)}
                    </span>
                  </div>
                </div>

                <button
                  id="btn-cart-proceed-customer"
                  onClick={handleProceedToCustomerForm}
                  className="w-full py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(204,255,0,0.25)] cursor-pointer"
                >
                  <span>ORDER ON WHATSAPP • {formatEGP(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Step 2 Footer: Proceed to Review */}
            {checkoutStep === 'customer' && (
              <button
                id="btn-customer-proceed-review"
                onClick={handleProceedToReview}
                className="w-full py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(204,255,0,0.25)] cursor-pointer"
              >
                <span>CONTINUE TO REVIEW ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Step 3 Footer: CONFIRM & ORDER ON WHATSAPP */}
            {checkoutStep === 'review' && (
              <button
                id="btn-confirm-order-whatsapp"
                onClick={handleConfirmAndOrderWhatsApp}
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.35)] cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRM & ORDER ON WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* No payment gateway / social commerce reassurance */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-tech text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>No card required • Pay cash on delivery or InstaPay</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
