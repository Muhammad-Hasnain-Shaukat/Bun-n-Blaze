import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Flame } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { playSound } from '../../utils/audio';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
  } = useCartStore();

  const { setCheckoutOpen, soundEnabled } = useOrderStore();

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  const handleCheckout = () => {
    if (soundEnabled) playSound('flame');
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111116] dark:bg-[#111116] light:bg-[#f8f6f0] border-l border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blaze" />
              <h2 className="font-display text-2xl uppercase tracking-wider text-cream dark:text-cream light:text-[#121216]">
                YOUR ORDER BAG
              </h2>
              <span className="text-xs font-street px-2 py-0.5 rounded-full bg-blaze/15 text-blaze font-bold">
                {items.length}
              </span>
            </div>

            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-full text-cream/70 hover:text-blaze hover:bg-white/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-blaze">
                  <Flame className="w-8 h-8 opacity-40" />
                </div>
                <div className="font-display text-2xl uppercase text-cream/80 dark:text-cream/80 light:text-black/80">
                  YOUR BAG IS COLD
                </div>
                <p className="text-sm font-sans text-cream/60 dark:text-cream/60 light:text-black/60 max-w-xs">
                  Add some Double Inferno patties or loaded fries to light up the grill.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-6 py-3 rounded-xl bg-blaze text-black font-display tracking-wider text-sm font-bold"
                >
                  EXPLORE MENU
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-4 rounded-2xl bg-zinc-900/70 dark:bg-zinc-900/70 light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 flex gap-4"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display text-lg uppercase leading-tight text-cream dark:text-cream light:text-[#121216]">
                          {cartItem.item.name}
                        </h4>
                        <span className="font-street text-xs text-blaze font-bold">
                          ${cartItem.itemTotal.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          if (soundEnabled) playSound('click');
                          removeFromCart(cartItem.cartItemId);
                        }}
                        className="text-cream/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customization pills */}
                    {cartItem.customization && (
                      <div className="text-[11px] font-street text-cream/60 dark:text-cream/60 light:text-black/60 space-y-0.5 mt-1">
                        <div>
                          {cartItem.customization.pattyCount}x Patty • {cartItem.customization.cheeseType.replace('_', ' ')}
                        </div>
                        <div className="text-blaze">
                          Heat: {cartItem.customization.sauceLevel.toUpperCase()}
                        </div>
                        {cartItem.customization.addOns.length > 0 && (
                          <div className="text-[10px] text-cream/50 dark:text-cream/50 light:text-black/50">
                            +{cartItem.customization.addOns.join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center border border-white/15 dark:border-white/15 light:border-black/15 rounded-lg bg-black/40">
                        <button
                          onClick={() => {
                            if (soundEnabled) playSound('click');
                            updateQuantity(cartItem.cartItemId, -1);
                          }}
                          className="p-1 px-2 text-cream/70 hover:text-blaze text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display text-sm w-5 text-center text-cream dark:text-cream light:text-black">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => {
                            if (soundEnabled) playSound('click');
                            updateQuantity(cartItem.cartItemId, 1);
                          }}
                          className="p-1 px-2 text-cream/70 hover:text-blaze text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 dark:border-white/10 light:border-black/10 bg-[#16161c] dark:bg-[#16161c] light:bg-[#eae6d8] space-y-4">
              <div className="space-y-1.5 text-sm font-sans">
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <span className="text-green-400 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 dark:border-white/10 light:border-black/10 flex justify-between font-display text-2xl text-cream dark:text-cream light:text-[#121216]">
                  <span>TOTAL</span>
                  <span className="text-blaze">${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 35 && (
                <div className="p-2.5 rounded-xl bg-blaze/10 border border-blaze/20 text-center text-xs font-street text-blaze">
                  Add ${(35 - subtotal).toFixed(2)} more for FREE delivery! 🚀
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-display text-lg tracking-wider bg-gradient-to-r from-blaze to-ember text-black font-bold shadow-xl shadow-blaze/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>CHECKOUT</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
