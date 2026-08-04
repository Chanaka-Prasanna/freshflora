import React, { useState } from 'react';
import { X, Star, Truck, ShieldCheck, Heart, Sparkles, Check, ShoppingBag, CreditCard, Gift, Flower2 } from 'lucide-react';
import { Flower } from '../types';

interface FlowerDetailModalProps {
  flower: Flower | null;
  onClose: () => void;
  onAddToCart: (flower: Flower, selectedVase: boolean, customNote?: string) => void;
  onBuyNow: (flower: Flower, selectedVase: boolean, customNote?: string) => void;
}

export const FlowerDetailModal: React.FC<FlowerDetailModalProps> = ({
  flower,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [includeVase, setIncludeVase] = useState(false);
  const [customGreetingNote, setCustomGreetingNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!flower) return null;

  const vasePrice = 14.00;
  const totalPrice = (flower.price + (includeVase ? vasePrice : 0)) * quantity;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(flower, includeVase, customGreetingNote);
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleBuy = () => {
    onBuyNow(flower, includeVase, customGreetingNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FFF9F9] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#F8D7E3] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-black flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image & Badges */}
          <div className="relative aspect-square md:aspect-auto bg-[#FFF0F5] overflow-hidden rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl">
            <img
              src={flower.imageUrl}
              alt={flower.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-[#C83863] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {flower.category}
              </span>
              <span className="bg-white/90 backdrop-blur-md text-[#3D1E28] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {flower.availability}
              </span>
            </div>
          </div>

          {/* Right Column: Information & Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header Info */}
              <div className="flex items-center gap-2 text-xs text-[#8C5A6A] mb-1 font-medium">
                <Flower2 className="w-3.5 h-3.5 text-[#C83863]" />
                <span>Hand-Arranged Fresh Florals</span>
                <span>•</span>
                <span>{flower.stemCount} Premium Stems</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D1E28] mb-2 leading-tight">
                {flower.title}
              </h2>

              {/* Rating & Orders */}
              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(flower.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#2D232E]">{flower.rating.toFixed(1)}</span>
                <span className="text-gray-400">({flower.reviewCount} customer reviews • {flower.ordersCount}+ sold)</span>
              </div>

              {/* Strict 1-Line Description */}
              <p className="text-sm text-[#5C4550] mb-5 bg-[#FFF0F5] p-3 rounded-xl border border-[#F8D7E3] italic">
                "{flower.description}"
              </p>

              {/* Price Calculation */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-bold text-[#8C1C40]">
                  ${totalPrice.toFixed(2)}
                </span>
                {flower.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${(flower.originalPrice * quantity).toFixed(2)}
                  </span>
                )}
                {includeVase && (
                  <span className="text-xs text-[#C83863] bg-[#FCE8EF] font-semibold px-2.5 py-1 rounded-full">
                    +$14.00 Crystal Vase
                  </span>
                )}
              </div>

              {/* Custom Add-On: Elegant Glass Vase */}
              <div className="mb-4">
                <label className="flex items-center justify-between p-3 rounded-xl border border-[#F8D7E3] bg-white cursor-pointer hover:border-[#E07A98] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FCE8EF] text-[#C83863] flex items-center justify-center font-bold text-xs">
                      🏺
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#3D1E28] block">Add Artisanal Glass Vase</span>
                      <span className="text-[11px] text-gray-500">Hand-blown fluted vase perfectly sized for this bouquet</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeVase}
                    onChange={(e) => setIncludeVase(e.target.checked)}
                    className="w-4 h-4 accent-[#C83863] rounded"
                  />
                </label>
              </div>

              {/* Custom Gift Message */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#3D1E28] flex items-center gap-1.5 mb-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#C83863]" />
                  Complimentary Gift Message (Optional)
                </label>
                <textarea
                  placeholder="Write a heartfelt card message to be handwritten on premium rose stationery..."
                  value={customGreetingNote}
                  onChange={(e) => setCustomGreetingNote(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-[#F8D7E3] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83863]/30 text-[#2D232E]"
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-[#3D1E28]">Bouquet Quantity:</span>
                <div className="flex items-center bg-white border border-[#F8D7E3] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-gray-600 hover:bg-[#FCE8EF] font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-[#2D232E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-gray-600 hover:bg-[#FCE8EF] font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Trust Guarantees */}
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#FDE2E4] text-[#E86F80] border border-[#E86F80] font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#2E7D32]" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E86F80]" />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="w-full py-2.5 px-4 rounded-full bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <CreditCard className="w-4 h-4" />
                  Instant Checkout
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#735A63] pt-3 border-t border-[#FCE8EF]">
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C83863]" />
                  <span>Next-Day Delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C83863]" />
                  <span>7-Day Freshness Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
