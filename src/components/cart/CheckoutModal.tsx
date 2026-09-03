import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, CreditCard, DollarSign, Smartphone, MapPin, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { CustomerDetails } from '../../types';
import { playSound } from '../../utils/audio';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setCheckoutOpen, createOrder, soundEnabled } = useOrderStore();
  const { items, getSubtotal, getDeliveryFee, getTax, getTotal, clearCart } = useCartStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CustomerDetails>({
    name: 'Devon Miles',
    email: 'devon@streetblaze.com',
    phone: '+1 (555) 782-9014',
    address: '420 Broadway St, Apt 6A, New York, NY',
    deliveryType: 'delivery',
    pickupLocation: 'Downtown Flagship',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('apple_pay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');

  if (!isCheckoutOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = formData.deliveryType === 'delivery' ? getDeliveryFee() : 0;
  const tax = getTax();
  const total = Number((subtotal + deliveryFee + tax).toFixed(2));

  const handleNextStep = () => {
    if (soundEnabled) playSound('click');
    if (step === 1 && (!formData.name || !formData.phone)) return;
    if (step === 2 && formData.deliveryType === 'delivery' && !formData.address) return;
    setStep((prev) => (prev < 3 ? ((prev + 1) as any) : prev));
  };

  const handlePrevStep = () => {
    if (soundEnabled) playSound('click');
    setStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playSound('success');

    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d00', '#ffaa00', '#ffffff', '#121216'],
    });

    // Create persistent order
    createOrder(
      formData,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      tax,
      total
    );

    // Empty cart
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#121217] dark:bg-[#121217] light:bg-[#f9f8f4] rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl overflow-hidden my-auto max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-street text-blaze tracking-widest uppercase font-bold">
              CHECKOUT // STEP {step} OF 3
            </span>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-cream dark:text-cream light:text-[#121216]">
              {step === 1 && 'CONTACT INFORMATION'}
              {step === 2 && 'DELIVERY PREFERENCES'}
              {step === 3 && 'PAYMENT & CONFIRMATION'}
            </h2>
          </div>

          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-2 rounded-full text-cream/70 hover:text-blaze border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex px-6 pt-4 gap-2 shrink-0">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-blaze shadow-sm shadow-blaze' : 'bg-white/10 dark:bg-white/10 light:bg-black/10'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto min-h-0">
          {/* STEP 1: CONTACT INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Miles"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black text-sm focus:border-blaze focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 uppercase tracking-wider mb-2">
                  Mobile Number (For live SMS tracking)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black text-sm focus:border-blaze focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black text-sm focus:border-blaze focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERY / PICKUP */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'delivery' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.deliveryType === 'delivery'
                      ? 'border-blaze bg-blaze/10 text-cream dark:text-cream light:text-black ring-1 ring-blaze'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/40 text-cream/70'
                  }`}
                >
                  <div className="font-display text-lg uppercase">RAPID DELIVERY</div>
                  <span className="font-street text-xs text-blaze">~25-30 Mins</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'pickup' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    formData.deliveryType === 'pickup'
                      ? 'border-blaze bg-blaze/10 text-cream dark:text-cream light:text-black ring-1 ring-blaze'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/40 text-cream/70'
                  }`}
                >
                  <div className="font-display text-lg uppercase">EXPRESS PICKUP</div>
                  <span className="font-street text-xs text-green-400">~12 Mins • $0 Fee</span>
                </button>
              </div>

              {formData.deliveryType === 'delivery' ? (
                <div>
                  <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 uppercase tracking-wider mb-2">
                    Street Address & Apartment
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 404 Broadway, Apt 4B, New York, NY 10013"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black text-sm focus:border-blaze focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 uppercase tracking-wider mb-2">
                    Choose Pickup Counter
                  </label>
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-cream dark:text-cream light:text-black text-sm focus:border-blaze focus:outline-none"
                  >
                    <option value="Downtown Flagship">Downtown Flagship (404 Neon Blvd)</option>
                    <option value="Drive-Thru Terminal">Drive-Thru Terminal (89 Westside Pkwy)</option>
                    <option value="Underground Smash Lab">Underground Smash Lab (12 Warehouse Row)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-2.5">
                {[
                  { id: 'apple_pay', label: 'Apple Pay / Google Pay', icon: Smartphone },
                  { id: 'card', label: 'Credit or Debit Card', icon: CreditCard },
                  { id: 'cash', label: 'Pay On Delivery / Counter', icon: DollarSign },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === m.id
                          ? 'border-blaze bg-blaze/10 text-cream dark:text-cream light:text-black'
                          : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/40 text-cream/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-blaze" />
                        <span className="font-sans text-sm font-semibold">{m.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === m.id ? 'border-blaze bg-blaze' : 'border-white/30'
                      }`}>
                        {paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order total review */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white border border-white/10 text-sm space-y-1">
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Items Total ({items.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-cream/70 dark:text-cream/70 light:text-black/70">
                  <span>Estimated Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-display text-xl text-cream dark:text-cream light:text-black">
                  <span>AMOUNT DUE</span>
                  <span className="text-blaze font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 rounded-xl border border-white/15 text-cream/80 hover:text-cream flex items-center gap-2 font-street text-xs uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3.5 rounded-xl bg-blaze text-black font-display text-base tracking-wider font-bold shadow-lg shadow-blaze/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blaze to-ember text-black font-display text-lg tracking-wider font-bold shadow-xl shadow-blaze/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>PLACE ORDER • ${total.toFixed(2)}</span>
                <Check className="w-5 h-5 stroke-[3]" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
