import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus, CustomerDetails, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuItems';

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
  isCheckoutOpen: boolean;
  isOrderTrackerOpen: boolean;
  isAdminOpen: boolean;
  customizingItem: MenuItem | null;
  menuList: MenuItem[];
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  currentPage: 'home' | 'menu' | 'featured' | 'philosophy' | 'feed' | 'locations';

  // Actions
  setCurrentPage: (page: 'home' | 'menu' | 'featured' | 'philosophy' | 'feed' | 'locations') => void;
  setCheckoutOpen: (open: boolean) => void;
  setOrderTrackerOpen: (open: boolean) => void;
  setAdminOpen: (open: boolean) => void;
  setCustomizingItem: (item: MenuItem | null) => void;
  toggleSound: () => void;
  toggleTheme: () => void;
  createOrder: (customer: CustomerDetails, paymentMethod: 'card' | 'apple_pay' | 'cash', items: any[], subtotal: number, deliveryFee: number, tax: number, total: number) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setActiveOrder: (order: Order | null) => void;
  toggleItemStock: (itemId: string) => void;
  updateItemPrice: (itemId: string, newPrice: number) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [
        {
          id: 'ord-init-101',
          orderNumber: 'BLAZE-8942',
          createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
          customer: {
            name: 'Jordan Hayes',
            email: 'jordan@streetwear.io',
            phone: '+1 (555) 234-5678',
            address: '742 Evergreen Terrace, Apt 4B',
            deliveryType: 'delivery',
          },
          items: [
            {
              cartItemId: 'init-1',
              item: MENU_ITEMS[0],
              quantity: 2,
              itemTotal: 29.98,
              customization: {
                pattyCount: 2,
                cheeseType: 'smoked_cheddar',
                sauceLevel: 'inferno',
                bunType: 'toasted_brioche',
                addOns: ['Charred Jalapeños', 'Extra Bacon'],
              }
            },
            {
              cartItemId: 'init-2',
              item: MENU_ITEMS[2],
              quantity: 1,
              itemTotal: 8.99,
            }
          ],
          subtotal: 38.97,
          deliveryFee: 0,
          tax: 3.21,
          total: 42.18,
          status: 'out_for_delivery',
          estimatedMinutes: 12,
          paymentMethod: 'apple_pay',
        }
      ],
      activeOrder: null,
      isCheckoutOpen: false,
      isOrderTrackerOpen: false,
      isAdminOpen: false,
      customizingItem: null,
      menuList: MENU_ITEMS,
      soundEnabled: true,
      theme: 'dark',
      currentPage: 'home',

      setCurrentPage: (page) => {
        set({ currentPage: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
      setOrderTrackerOpen: (open) => set({ isOrderTrackerOpen: open }),
      setAdminOpen: (open) => set({ isAdminOpen: open }),
      setCustomizingItem: (item) => set({ customizingItem: item }),
      
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      
      toggleTheme: () => set((s) => {
        const next = s.theme === 'dark' ? 'light' : 'dark';
        if (next === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        }
        return { theme: next };
      }),

      createOrder: (customer, paymentMethod, items, subtotal, deliveryFee, tax, total) => {
        const newOrder: Order = {
          id: `ord-${Date.now()}`,
          orderNumber: `BLAZE-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          customer,
          items,
          subtotal,
          deliveryFee,
          tax,
          total,
          status: 'received',
          estimatedMinutes: customer.deliveryType === 'delivery' ? 25 : 12,
          paymentMethod,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
          activeOrder: newOrder,
          isCheckoutOpen: false,
          isOrderTrackerOpen: true,
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => {
          const updated = state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          );
          const currentActive = state.activeOrder?.id === orderId
            ? { ...state.activeOrder, status }
            : state.activeOrder;
          return {
            orders: updated,
            activeOrder: currentActive,
          };
        });
      },

      setActiveOrder: (order) => set({ activeOrder: order }),

      toggleItemStock: (itemId) => {
        set((state) => ({
          menuList: state.menuList.map((m) =>
            m.id === itemId ? { ...m, inStock: !m.inStock } : m
          ),
        }));
      },

      updateItemPrice: (itemId, newPrice) => {
        set((state) => ({
          menuList: state.menuList.map((m) =>
            m.id === itemId ? { ...m, price: newPrice } : m
          ),
        }));
      },
    }),
    {
      name: 'bun-n-blaze-orders',
      version: 3,
      migrate: (persistedState: any, version: number) => {
        if (version < 3) {
          return {
            ...persistedState,
            menuList: MENU_ITEMS,
          };
        }
        return persistedState;
      },
    }
  )
);
