import React, { useState } from 'react';
import { ShoppingBag, Star, Flame, Eye, CreditCard, Heart, Check, Sparkles } from 'lucide-react';
import { Flower } from '../types';

interface FlowerCardProps {
  flower: Flower;
  onAddToCart: (flower: Flower) => void;
  onBuyNow: (flower: Flower) => void;
  onQuickView: (flower: Flower) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({
  flower,
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(flower);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNow(flower);
  };

  // Availability badge styling
  const getAvailabilityBadge = () => {
    switch (flower.availability) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-ping" />
            In Stock
          </span>
        );
      case 'Pre-Order':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FFF8E1] text-[#F57F17] border border-[#FFE082] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            Pre-Order
          </span>
        );
      case 'Limited Season':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FDE2E4] text-[#E86F80] border border-[#FAD2D4] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-[#E86F80]" />
            Limited Season
          </span>
        );
    }
  };

  return (
    <div 
      onClick={() => onQuickView(flower)}
      className="group bg-white p-3.5 rounded-xl border border-[#FDE2E4] hover:border-[#E86F80] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Toast alert on add to cart */}
      {addedToast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-[#4A3B3B] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-[#86EFAC]" />
          Added to cart!
        </div>
      )}

      {/* Top Photograph Container */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#FFF0F1] rounded-lg">
        <img
          src={flower.imageUrl}
          alt={flower.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Hot / Featured Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {flower.isHot && (
            <span className="bg-[#E86F80] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current text-yellow-300" />
              Hot Product
            </span>
          )}
          {flower.originalPrice && (
            <span className="bg-[#4A3B3B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Save Rs. { (flower.originalPrice - flower.price).toFixed(0) }
            </span>
          )}
        </div>

        {/* Wishlist Heart & Quick View buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isLiked 
                ? 'bg-[#E86F80] text-white' 
                : 'bg-white/80 text-[#4A3B3B] hover:text-[#E86F80] hover:bg-white'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(flower);
            }}
            className="p-2 rounded-full bg-white/80 text-[#4A3B3B] hover:text-[#E86F80] hover:bg-white backdrop-blur-md transition-colors"
            title="Quick view details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Photograph Overlay Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Card Content Details */}
      <div className="pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Availability Status & Rating Row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            {getAvailabilityBadge()}

            <div className="flex items-center gap-1 text-xs text-[#4A3B3B]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-[#4A3B3B]">{flower.rating.toFixed(1)}</span>
              <span className="text-[10px] text-gray-400">{flower.ordersCount} Orders</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-bold text-[#4A3B3B] group-hover:text-[#E86F80] transition-colors leading-snug line-clamp-1 mb-0.5">
            {flower.title}
          </h3>

          {/* STRICT ONE LINE SMALL DESCRIPTION */}
          <p className="text-[11px] text-gray-500 line-clamp-1 mb-2 leading-tight" title={flower.description}>
            {flower.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-1 pt-2 border-t border-[#FDE2E4] flex flex-col gap-2">
          
          {/* Price display */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold font-serif text-[#E86F80]">
                Rs. {flower.price.toFixed(2)}
              </span>
              {flower.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  Rs. {flower.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#4A3B3B]/70 font-medium bg-[#FFF0F1] px-2 py-0.5 rounded">
              {flower.stemCount} stems
            </span>
          </div>

          {/* Dual Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={handleAddToCartClick}
              className="w-full py-1.5 px-2 rounded bg-[#FDE2E4] hover:bg-[#E86F80] hover:text-white text-[#E86F80] font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <ShoppingBag className="w-3 h-3" />
              ADD TO CART
            </button>

            <button
              onClick={handleBuyNowClick}
              className="w-full py-1.5 px-2 rounded bg-[#E86F80] hover:bg-[#d65f70] text-white font-bold text-[10px] uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <CreditCard className="w-3 h-3" />
              BUY NOW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
