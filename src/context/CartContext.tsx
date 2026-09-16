import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CustomerDetails, Product } from '../types';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../utils/whatsapp';

export type CheckoutStep = 'cart' | 'customer' | 'review' | 'success';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, selectedFlavor?: string, selectedSize?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  freeShippingRemaining: number;
  isCartOpen: boolean;
  openCart: (step?: CheckoutStep) => void;
  closeCart: () => void;
  checkoutStep: CheckoutStep;
  setCheckoutStep: (step: CheckoutStep) => void;
  isCartBumping: boolean;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vitalo_cart_items_v1';
const CUSTOMER_STORAGE_KEY = 'vitalo_customer_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : { fullName: '', phone: '', city: 'Cairo', address: '', notes: '' };
    } catch {
      return { fullName: '', phone: '', city: 'Cairo', address: '', notes: '' };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [isCartBumping, setIsCartBumping] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.error('Failed to save customer details', e);
    }
  }, [customerDetails]);

  const triggerCartBump = () => {
    setIsCartBumping(true);
    setTimeout(() => {
      setIsCartBumping(false);
    }, 550);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const addItem = (
    product: Product,
    selectedFlavor = product.flavors[0] || 'Standard',
    selectedSize = product.sizes[0] || 'Standard',
    quantity = 1
  ) => {
    const compositeId = `${product.id}-${selectedFlavor}-${selectedSize}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === compositeId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }
      return [
        ...prev,
        {
          id: compositeId,
          productId: product.id,
          product,
          quantity,
          selectedFlavor,
          selectedSize,
          unitPrice: product.price
        }
      ];
    });

    triggerCartBump();
    showNotification(`Added ${product.name} to bag`);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const openCart = (step: CheckoutStep = 'cart') => {
    setCheckoutStep(step);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        total,
        freeShippingRemaining,
        isCartOpen,
        openCart,
        closeCart,
        checkoutStep,
        setCheckoutStep,
        isCartBumping,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        selectedProduct,
        openProductModal: (p) => setSelectedProduct(p),
        closeProductModal: () => setSelectedProduct(null),
        customerDetails,
        updateCustomerDetails,
        notification,
        showNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
