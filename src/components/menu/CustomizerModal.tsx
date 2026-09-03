import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { CustomizationOptions } from '../../types';
import { useOrderStore } from '../../store/useOrderStore';
import { useCartStore } from '../../store/useCartStore';
import { playSound } from '../../utils/audio';

export const CustomizerModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, soundEnabled } = useOrderStore();
  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [pattyCount, setPattyCount] = useState<number>(2);
  const [cheeseType, setCheeseType] = useState<'american' | 'smoked_cheddar' | 'ghost_pepper'>('smoked_cheddar');
  const [sauceLevel, setSauceLevel] = useState<'mild' | 'blaze' | 'inferno'>('blaze');
  const [bunType, setBunType] = useState<'toasted_brioche' | 'charcoal_black' | 'lettuce_wrap'>('toasted_brioche');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Charred Jalapeños']);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!customizingItem) return null;

  const addOnOptions = [
    { name: 'Charred Jalapeños', price: 1.25 },
    { name: 'Crispy Fried Onions', price: 1.25 },
    { name: 'Applewood Smoked Bacon', price: 2.25 },
    { name: 'Truffle Garlic Aioli Dip', price: 1.50 },
    { name: 'Extra Melted Cheddar Drip', price: 1.75 },
  ];

  // Dynamic price calculation
  const extraPattiesCost = (pattyCount - 1) * 3.50;
  const addOnsCost = selectedAddOns.reduce((sum, name) => {
    const item = addOnOptions.find((a) => a.name === name);
    return sum + (item ? item.price : 0);
  }, 0);
  const unitPrice = customizingItem.price + extraPattiesCost + addOnsCost;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (name: string) => {
    if (soundEnabled) playSound('click');
    if (selectedAddOns.includes(name)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== name));
    } else {
      setSelectedAddOns([...selectedAddOns, name]);
    }
  };

  const handleAddToCart = () => {
    if (soundEnabled) playSound('flame');
    const customization: CustomizationOptions = {
      pattyCount,
      cheeseType,
      sauceLevel,
      bunType,
      addOns: selectedAddOns,
      specialInstructions: specialInstructions.trim() || undefined,
    };
    addToCart(customizingItem, customization, quantity);
    setCustomizingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#131317] dark:bg-[#131317] light:bg-[#f9f8f3] rounded-3xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl overflow-hidden my-auto max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)] flex flex-col">
        {/* Header with image banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black shrink-0">
          <img
            src={customizingItem.image}
            alt={customizingItem.name}
            className="w-full h-full object-cover object-center brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131317] dark:from-[#131317] light:from-[#f9f8f3] via-black/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={() => setCustomizingItem(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-cream hover:text-blaze border border-white/20 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-street text-blaze tracking-widest uppercase font-semibold">
              CUSTOMIZE YOUR FIRE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase text-cream dark:text-cream light:text-[#121216]">
              {customizingItem.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1 overflow-y-auto min-h-0">
          {/* 1. PATTY SELECTION */}
          <div>
            <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 tracking-widest uppercase mb-3">
              1. Patty Stacking
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { count: 1, label: 'Single Smash', cost: 'Included' },
                { count: 2, label: 'Double Patty', cost: '+$3.50' },
                { count: 3, label: 'Triple Beast', cost: '+$7.00' },
              ].map((p) => (
                <button
                  key={p.count}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) playSound('click');
                    setPattyCount(p.count);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    pattyCount === p.count
                      ? 'border-blaze bg-blaze/10 text-cream dark:text-cream light:text-black shadow-lg shadow-blaze/20'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-white text-cream/70 dark:text-cream/70 light:text-black/70'
                  }`}
                >
                  <div className="font-display text-lg uppercase tracking-wide flex justify-between items-center">
                    <span>{p.label}</span>
                    {pattyCount === p.count && <Check className="w-4 h-4 text-blaze" />}
                  </div>
                  <span className="font-street text-xs text-blaze">{p.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. CHEESE SELECTION */}
          <div>
            <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 tracking-widest uppercase mb-3">
              2. Molten Cheese
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'smoked_cheddar', label: 'Smoked Cheddar', sub: 'Deep & Sharp' },
                { id: 'american', label: 'American Slice', sub: 'Ultra Melty' },
                { id: 'ghost_pepper', label: 'Ghost Pepper Jack', sub: 'Spicy Kick' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) playSound('click');
                    setCheeseType(c.id as any);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    cheeseType === c.id
                      ? 'border-blaze bg-blaze/10 text-cream dark:text-cream light:text-black shadow-lg shadow-blaze/20'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-white text-cream/70 dark:text-cream/70 light:text-black/70'
                  }`}
                >
                  <div className="font-display text-base uppercase flex justify-between items-center">
                    <span>{c.label}</span>
                    {cheeseType === c.id && <Check className="w-4 h-4 text-blaze" />}
                  </div>
                  <span className="font-street text-[11px] opacity-60 block">{c.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. HEAT SAUCE LEVEL */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 tracking-widest uppercase">
                3. Blaze Heat Level
              </label>
              <div className="flex items-center gap-1 text-blaze">
                {[...Array(sauceLevel === 'mild' ? 1 : sauceLevel === 'blaze' ? 2 : 3)].map((_, i) => (
                  <Flame key={i} className="w-4 h-4 fill-blaze text-blaze animate-pulse" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'mild', label: 'MILD CRUNCH', desc: 'Smoky garlic & paprika' },
                { id: 'blaze', label: 'SIGNATURE BLAZE', desc: 'Habanero orange glaze' },
                { id: 'inferno', label: 'INFERNO 🔥🔥🔥', desc: 'Ghost pepper fire' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) playSound(s.id === 'inferno' ? 'flame' : 'click');
                    setSauceLevel(s.id as any);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    sauceLevel === s.id
                      ? 'border-blaze bg-blaze/15 text-cream dark:text-cream light:text-black ring-1 ring-blaze'
                      : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-white text-cream/70 dark:text-cream/70 light:text-black/70'
                  }`}
                >
                  <div className="font-display text-sm uppercase font-bold">{s.label}</div>
                  <span className="font-street text-[10px] opacity-60">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. ADD-ONS */}
          <div>
            <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 tracking-widest uppercase mb-3">
              4. Street Add-ons
            </label>
            <div className="space-y-2">
              {addOnOptions.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.name);
                return (
                  <div
                    key={addon.name}
                    onClick={() => toggleAddOn(addon.name)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blaze/70 bg-blaze/10 text-cream dark:text-cream light:text-black'
                        : 'border-white/10 dark:border-white/10 light:border-black/10 bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-white text-cream/70 dark:text-cream/70 light:text-black/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-blaze border-blaze text-black' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-sans text-sm font-medium">{addon.name}</span>
                    </div>
                    <span className="font-street text-xs text-blaze font-bold">+${addon.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-street text-cream/70 dark:text-cream/70 light:text-black/70 tracking-widest uppercase mb-2">
              Special Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra sauce on side, bun well toasted..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-white/15 dark:border-white/15 light:border-black/15 text-sm text-cream dark:text-cream light:text-black focus:outline-none focus:border-blaze"
            />
          </div>
        </div>

        {/* Footer with quantity and Add To Cart */}
        <div className="p-4 sm:p-6 border-t border-white/10 dark:border-white/10 light:border-black/10 bg-[#17171d] dark:bg-[#17171d] light:bg-[#f1ede2] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 bg-zinc-900 dark:bg-zinc-900 light:bg-white p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => {
                if (soundEnabled) playSound('click');
                setQuantity(Math.max(1, quantity - 1));
              }}
              className="p-2 rounded-lg text-cream/70 hover:text-blaze"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-display text-xl w-6 text-center text-cream dark:text-cream light:text-black">
              {quantity}
            </span>
            <button
              onClick={() => {
                if (soundEnabled) playSound('click');
                setQuantity(quantity + 1);
              }}
              className="p-2 rounded-lg text-cream/70 hover:text-blaze"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 px-6 rounded-2xl font-display text-lg tracking-wider bg-gradient-to-r from-blaze to-ember text-black font-bold shadow-xl shadow-blaze/25 hover:shadow-blaze/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between"
          >
            <span>ADD TO CART</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
