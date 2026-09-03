import React from 'react';
import { X, Flame, CheckCircle, Clock, Truck, Utensils, MapPin, ChevronRight } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { OrderStatus } from '../../types';
import { playSound } from '../../utils/audio';

export const OrderTrackerModal: React.FC = () => {
  const {
    activeOrder,
    isOrderTrackerOpen,
    setOrderTrackerOpen,
    updateOrderStatus,
    soundEnabled,
  } = useOrderStore();

  if (!isOrderTrackerOpen || !activeOrder) return null;

  const stages: { key: OrderStatus; label: string; desc: string; icon: any }[] = [
    { key: 'received', label: 'ORDER LOGGED', desc: 'Ticket printed at grill station', icon: Clock },
    { key: 'grilling', label: 'FLAME GRILLING', desc: 'Smashed on 750°F cast iron plates', icon: Utensils },
    { key: 'out_for_delivery', label: 'OUT FOR DELIVERY', desc: 'Hot bag sealed & courier en route', icon: Truck },
    { key: 'delivered', label: 'DELIVERED', desc: 'Unbox the blaze & devour', icon: CheckCircle },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === activeOrder.status);

  const advanceNextStatus = () => {
    if (soundEnabled) playSound('flame');
    const nextStatuses: OrderStatus[] = ['received', 'grilling', 'out_for_delivery', 'delivered'];
    const nextIdx = (currentStageIndex + 1) % nextStatuses.length;
    updateOrderStatus(activeOrder.id, nextStatuses[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121216] dark:bg-[#121216] light:bg-[#f8f6f0] rounded-3xl border border-blaze/40 shadow-2xl shadow-blaze/20 overflow-hidden my-auto max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)] flex flex-col">
        {/* Top Flame Celebration Banner */}
        <div className="p-8 bg-gradient-to-b from-blaze/20 to-transparent border-b border-white/10 dark:border-white/10 light:border-black/10 relative shrink-0">
          <button
            onClick={() => setOrderTrackerOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-cream/70 hover:text-blaze border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blaze text-black font-street text-xs font-black uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 fill-black" />
            <span>ORDER CONFIRMED</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-cream dark:text-cream light:text-[#121216]">
            YOUR BLAZE IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blaze via-ember to-orange-400">
              ON THE WAY. 🔥
            </span>
          </h2>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-4 text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70">
            <div>
              <span className="text-cream/40 dark:text-cream/40 light:text-black/40 uppercase block">ORDER ID</span>
              <span className="font-display text-lg text-blaze font-bold">{activeOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-cream/40 dark:text-cream/40 light:text-black/40 uppercase block">ESTIMATED ARRIVAL</span>
              <span className="font-display text-lg text-cream dark:text-cream light:text-black font-bold">~{activeOrder.estimatedMinutes} MINS</span>
            </div>
            <div>
              <span className="text-cream/40 dark:text-cream/40 light:text-black/40 uppercase block">DELIVERY TYPE</span>
              <span className="font-display text-lg text-green-400 font-bold uppercase">{activeOrder.customer.deliveryType}</span>
            </div>
          </div>
        </div>

        {/* Live Progress Bar Flow */}
        <div className="p-6 sm:p-8 border-b border-white/10 dark:border-white/10 light:border-black/10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-street text-cream/60 dark:text-cream/60 light:text-black/60 uppercase tracking-widest">
              LIVE KITCHEN & DISPATCH STATUS
            </span>

            {/* Simulation button */}
            <button
              onClick={advanceNextStatus}
              className="px-3 py-1.5 rounded-lg border border-blaze/40 bg-blaze/10 text-blaze hover:bg-blaze/20 transition-all text-xs font-street tracking-wider flex items-center gap-1.5"
            >
              <span>ADVANCE STAGE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {stages.map((stg, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const Icon = stg.icon;

              return (
                <div
                  key={stg.key}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-blaze bg-blaze/15 shadow-lg shadow-blaze/20 ring-1 ring-blaze'
                      : isPassed
                      ? 'border-green-500/40 bg-green-500/5 text-cream/90'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/40 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${
                      isCurrent ? 'bg-blaze text-black' : isPassed ? 'bg-green-500 text-black' : 'bg-white/5 text-cream/40'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-street text-[10px] uppercase font-bold text-cream/50">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="font-display text-base uppercase tracking-wide text-cream dark:text-cream light:text-[#121216]">
                    {stg.label}
                  </div>
                  <p className="text-[11px] font-sans text-cream/60 dark:text-cream/60 light:text-black/60 mt-1 leading-tight">
                    {stg.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details & Items Summary */}
        <div className="p-6 sm:p-8 space-y-4 max-h-56 overflow-y-auto">
          <div className="text-xs font-street text-cream/60 dark:text-cream/60 light:text-black/60 uppercase tracking-widest">
            ORDER SUMMARY
          </div>

          <div className="space-y-3">
            {activeOrder.items.map((it) => (
              <div key={it.cartItemId} className="flex justify-between items-center text-sm font-sans">
                <div className="flex items-center gap-3">
                  <span className="font-display text-base text-blaze font-bold">
                    {it.quantity}x
                  </span>
                  <div>
                    <span className="text-cream dark:text-cream light:text-black font-semibold uppercase">
                      {it.item.name}
                    </span>
                    {it.customization && (
                      <span className="block text-xs font-street text-cream/60 dark:text-cream/60 light:text-black/60">
                        {it.customization.pattyCount}x Patty • {it.customization.sauceLevel.toUpperCase()} Sauce
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-street text-cream dark:text-cream light:text-black font-bold">
                  ${it.itemTotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between font-display text-xl text-cream dark:text-cream light:text-[#121216]">
            <span>TOTAL PAID</span>
            <span className="text-blaze font-bold">${activeOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-white/10 bg-[#17171d] dark:bg-[#17171d] light:bg-[#f0ede4] flex justify-end">
          <button
            onClick={() => setOrderTrackerOpen(false)}
            className="px-6 py-3 rounded-xl bg-white/10 text-cream dark:text-cream light:text-black hover:bg-blaze hover:text-black font-display text-sm tracking-wider uppercase transition-colors"
          >
            DISMISS TRACKER
          </button>
        </div>
      </div>
    </div>
  );
};
