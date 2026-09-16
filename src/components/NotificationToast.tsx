import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { notification, openCart } = useCart();

  if (!notification) return null;

  return (
    <div
      id="notification-toast"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-zinc-900 border border-[#ccff00]/60 text-white text-xs font-tech shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-fade-in"
    >
      <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
      <span className="font-semibold">{notification}</span>
      <button
        onClick={openCart}
        className="px-2.5 py-1 rounded-lg bg-[#ccff00] text-black font-bold uppercase text-[10px] flex items-center gap-1 hover:bg-[#b8e600] transition-colors"
      >
        <span>View Bag</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
