import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const MobileCartBar: React.FC = () => {
  const { items, getTotal, getItemCount, setCartOpen } = useCartStore();
  const { soundEnabled } = useOrderStore();

  const count = getItemCount();
  if (count === 0) return null;

  const total = getTotal();

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-fade-in">
      <button
        onClick={() => {
          if (soundEnabled) playSound('click');
          setCartOpen(true);
        }}
        className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blaze to-ember text-black font-display text-base tracking-wider font-bold shadow-2xl shadow-blaze/50 flex items-center justify-between border border-white/20 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black text-blaze flex items-center justify-center font-bold text-xs">
            {count}
          </div>
          <span className="uppercase">{count === 1 ? 'ITEM' : 'ITEMS'} IN BAG</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg">${total.toFixed(2)}</span>
          <span className="font-street text-xs uppercase underline">VIEW</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
