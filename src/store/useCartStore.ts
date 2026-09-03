import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem, CustomizationOptions } from '../types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, customization?: CustomizationOptions, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (item, customization, quantity = 1) => {
        // Calculate item base + extra add-on costs
        let unitPrice = item.price;
        if (customization) {
          // Extra patties: +$3.50 each beyond single
          if (customization.pattyCount > 1) {
            unitPrice += (customization.pattyCount - 1) * 3.50;
          }
          // Extra add-ons: +$1.25 each
          unitPrice += customization.addOns.length * 1.25;
        }

        const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

        set((state) => ({
          items: [
            ...state.items,
            {
              cartItemId,
              item,
              customization,
              quantity,
              itemTotal: unitPrice * quantity,
            },
          ],
          isCartOpen: true, // open drawer on add
        }));
      },

      removeFromCart: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, delta) => {
        set((state) => ({
          items: state.items
            .map((i) => {
              if (i.cartItemId === cartItemId) {
                const newQty = i.quantity + delta;
                if (newQty <= 0) return null;
                const unitPrice = i.itemTotal / i.quantity;
                return {
                  ...i,
                  quantity: newQty,
                  itemTotal: unitPrice * newQty,
                };
              }
              return i;
            })
            .filter(Boolean) as CartItem[],
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.itemTotal, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 35 ? 0 : 3.99; // Free delivery above $35
      },

      getTax: () => {
        return Number((get().getSubtotal() * 0.0825).toFixed(2));
      },

      getTotal: () => {
        const sub = get().getSubtotal();
        if (sub === 0) return 0;
        return Number((sub + get().getDeliveryFee() + get().getTax()).toFixed(2));
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'bun-n-blaze-cart',
    }
  )
);
