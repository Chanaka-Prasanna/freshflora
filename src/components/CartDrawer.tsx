import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Gift, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (flowerId: string, quantity: number) => void;
  onRemoveItem: (flowerId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Price calculations
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.flower.price + (item.selectedVase ? 1400 : 0);
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const freeShippingThreshold = 5000.00;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'BLOOM10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied to your order!');
    } else if (promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscountPercent(5);
      setPromoSuccess('Free shipping promo unlocked!');
    } else {
      setPromoError('Invalid code. Try "BLOOM10" for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#FFF9F9] border-l border-[#F8D7E3] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-[#FDE2E4] bg-[#FDE2E4]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E86F80] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-[#4A3B3B]">Your Flower Basket</h2>
                <span className="text-[11px] text-[#4A3B3B]/70">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFF9F9] px-4 py-2.5 border-b border-[#FDE2E4]">
            <div className="flex justify-between items-center text-xs font-semibold text-[#4A3B3B] mb-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#E86F80]" />
                {amountForFreeShipping === 0 ? (
                  <span className="text-[#2E7D32] font-bold">🎉 Free Next-Day Shipping Unlocked!</span>
                ) : (
                  <span>Add Rs. {amountForFreeShipping.toFixed(2)} for FREE Next-Day Delivery</span>
                )}
              </span>
            </div>
            <div className="w-full h-2 bg-[#FDE2E4] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E86F80] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FCE8EF] text-[#C83863] flex items-center justify-center mx-auto mb-4 text-2xl">
                  🌸
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3D1E28] mb-1">Your Basket is Empty</h3>
                <p className="text-xs text-[#735A63] max-w-xs mx-auto mb-6">
                  Explore our fresh handpicked bouquets to brighten someone's day or treat yourself.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#C83863] hover:bg-[#B02852] text-white font-bold text-xs shadow-sm transition-all"
                >
                  Browse Fresh Flowers
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemUnitPrice = item.flower.price + (item.selectedVase ? 1400 : 0);
                return (
                  <div 
                    key={item.flower.id}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-[#F8D7E3] shadow-sm relative group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 rounded-xl bg-[#FFF0F5] overflow-hidden flex-shrink-0 relative">
                      <img
                        src={item.flower.imageUrl}
                        alt={item.flower.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-serif text-sm font-bold text-[#3D1E28] truncate">
                            {item.flower.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.flower.id)}
                            className="text-gray-400 hover:text-[#C83863] p-0.5 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Strict 1-Line Description */}
                        <p className="text-[11px] text-[#735A63] line-clamp-1 mb-1">
                          {item.flower.description}
                        </p>

                        {item.selectedVase && (
                          <span className="inline-block text-[10px] font-semibold text-[#C83863] bg-[#FCE8EF] px-2 py-0.5 rounded-full mb-1">
                            + Artisanal Glass Vase (Rs. 1400.00)
                          </span>
                        )}

                        {item.customNote && (
                          <p className="text-[10px] text-gray-500 italic bg-[#FFF0F5] p-1 rounded truncate">
                            Note: "{item.customNote}"
                          </p>
                        )}
                      </div>

                      {/* Quantity & Unit Total */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FCE8EF]">
                        <div className="flex items-center bg-[#FFF0F5] border border-[#F8D7E3] rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.flower.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-[#FCE8EF] rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#2D232E]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.flower.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-[#FCE8EF] rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-sm text-[#8C1C40]">
                          Rs. {(itemUnitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-[#F8D7E3] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. BLOOM10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#F8D7E3] bg-[#FFF0F5] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30 uppercase font-semibold text-[#2D232E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#3D1E28] hover:bg-black text-white font-bold text-xs transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <p className="text-[11px] text-[#2E7D32] font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#C83863] font-semibold">{promoError}</p>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-[#5C4550] pt-2 border-t border-[#FCE8EF]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2D232E]">Rs. {subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32] font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-Rs. {discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#2E7D32]">FREE</strong> : `Rs. ${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between font-serif text-base font-bold text-[#3D1E28] pt-2 border-t border-[#F8D7E3]">
                  <span>Total Order</span>
                  <span className="text-[#8C1C40]">Rs. {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, promoCode)}
                className="w-full py-3 px-4 rounded-full bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 group"
              >
                <span>Proceed to Card Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
