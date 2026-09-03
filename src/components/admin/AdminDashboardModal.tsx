import React, { useState } from 'react';
import { X, ShieldAlert, DollarSign, Package, TrendingUp, Clock, CheckCircle, RefreshCw, SlidersHorizontal, Trash2 } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { OrderStatus } from '../../types';
import { playSound } from '../../utils/audio';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdminOpen,
    setAdminOpen,
    orders,
    updateOrderStatus,
    menuList,
    toggleItemStock,
    updateItemPrice,
    soundEnabled,
  } = useOrderStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'analytics'>('orders');

  if (!isAdminOpen) return null;

  // Analytics computations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#101014] rounded-3xl border border-blaze/40 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)]">
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#15151c] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blaze text-black font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-street text-blaze uppercase tracking-widest font-bold">
                KITCHEN & STORE COMMAND
              </div>
              <h2 className="font-display text-3xl uppercase tracking-wider text-cream">
                BUN N BLAZE ADMIN PORTAL
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tabs */}
            <div className="flex p-1 rounded-xl bg-black/60 border border-white/10">
              {(['orders', 'menu', 'analytics'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    if (soundEnabled) playSound('click');
                    setActiveTab(tab);
                  }}
                  className={`px-4 py-2 rounded-lg font-street text-xs uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-blaze text-black font-bold shadow'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => setAdminOpen(false)}
              className="p-2 rounded-xl text-cream/60 hover:text-blaze border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Highlights Row */}
        <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#0d0d11] border-b border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[11px] font-street text-cream/50 uppercase">TOTAL REVENUE</div>
            <div className="font-display text-3xl text-blaze font-bold mt-1">
              ${totalRevenue.toFixed(2)}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[11px] font-street text-cream/50 uppercase">ACTIVE ORDERS</div>
            <div className="font-display text-3xl text-amber-400 font-bold mt-1">
              {activeOrdersCount}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[11px] font-street text-cream/50 uppercase">DELIVERED</div>
            <div className="font-display text-3xl text-green-400 font-bold mt-1">
              {completedOrdersCount}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[11px] font-street text-cream/50 uppercase">AVG COOK TIME</div>
            <div className="font-display text-3xl text-cream font-bold mt-1">
              9.4 MINS
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* TAB 1: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-xl uppercase tracking-wider text-cream">
                  LIVE INCOMING & COOKING TICKETS ({orders.length})
                </h3>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center text-cream/50 font-street">
                  NO RECENT ORDERS LOGGED.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl bg-[#16161d] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-xl text-blaze font-bold">
                            {ord.orderNumber}
                          </span>
                          <span className="font-street text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-cream/80 uppercase">
                            {ord.customer.deliveryType}
                          </span>
                          <span className="text-xs font-street text-cream/40">
                            {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="text-sm font-sans text-cream/90 font-medium">
                          {ord.customer.name} • {ord.customer.phone}
                        </div>
                        <div className="text-xs font-sans text-cream/60">
                          {ord.customer.address}
                        </div>

                        {/* Items line */}
                        <div className="text-xs font-street text-blaze/90 pt-1">
                          {ord.items.map((i) => `${i.quantity}x ${i.item.name}`).join(' • ')}
                        </div>
                      </div>

                      {/* Status controller & Total */}
                      <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
                        <div className="text-right">
                          <div className="text-[10px] font-street text-cream/50 uppercase">TOTAL</div>
                          <div className="font-display text-2xl text-cream font-bold">
                            ${ord.total.toFixed(2)}
                          </div>
                        </div>

                        {/* Status Select dropdown */}
                        <select
                          value={ord.status}
                          onChange={(e) => {
                            if (soundEnabled) playSound('click');
                            updateOrderStatus(ord.id, e.target.value as OrderStatus);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-black border border-white/20 text-xs font-street tracking-wider uppercase text-cream focus:border-blaze focus:outline-none"
                        >
                          <option value="received">01 // RECEIVED</option>
                          <option value="grilling">02 // GRILLING</option>
                          <option value="out_for_delivery">03 // DISPATCHED</option>
                          <option value="delivered">04 // DELIVERED</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MENU & INVENTORY MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <h3 className="font-display text-xl uppercase tracking-wider text-cream">
                MENU INVENTORY & AVAILABILITY
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#15151c] border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="font-display text-base uppercase text-cream leading-tight">
                          {item.name}
                        </div>
                        <div className="text-xs font-street text-blaze font-bold">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Price modifier */}
                      <button
                        onClick={() => {
                          const newP = prompt(`Update price for ${item.name}:`, item.price.toString());
                          if (newP && !isNaN(Number(newP))) {
                            updateItemPrice(item.id, Number(newP));
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-street text-cream/70 hover:text-cream"
                      >
                        EDIT PRICE
                      </button>

                      {/* Stock toggle button */}
                      <button
                        onClick={() => {
                          if (soundEnabled) playSound('click');
                          toggleItemStock(item.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-street text-xs uppercase font-bold transition-all ${
                          item.inStock
                            ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                        }`}
                      >
                        {item.inStock ? 'IN STOCK' : 'SOLD OUT'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PERFORMANCE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="font-display text-xl uppercase tracking-wider text-cream">
                KITCHEN VELOCITY & SALES INSIGHTS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-[#16161d] border border-white/10">
                  <div className="text-xs font-street text-blaze uppercase mb-1">#1 TOP SELLER</div>
                  <div className="font-display text-2xl text-cream">DOUBLE INFERNO</div>
                  <p className="text-xs text-cream/60 mt-1">42% of all orders include this item.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#16161d] border border-white/10">
                  <div className="text-xs font-street text-ember uppercase mb-1">POPULAR ADD-ON</div>
                  <div className="font-display text-2xl text-cream">CHARRED JALAPEÑOS</div>
                  <p className="text-xs text-cream/60 mt-1">Added to 68% of custom smash burgers.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#16161d] border border-white/10">
                  <div className="text-xs font-street text-green-400 uppercase mb-1">PEAK HOURS</div>
                  <div className="font-display text-2xl text-cream">8 PM — 1 AM</div>
                  <p className="text-xs text-cream/60 mt-1">Late night cravings spike delivery speed.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#15151c] flex justify-end">
          <button
            onClick={() => setAdminOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-blaze text-black font-display text-sm tracking-wider uppercase font-bold"
          >
            EXIT ADMIN PORTAL
          </button>
        </div>
      </div>
    </div>
  );
};
