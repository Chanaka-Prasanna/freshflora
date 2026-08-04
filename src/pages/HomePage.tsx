import React from 'react';
import { Flower, FilterState } from '../types';
import { FlowerCard } from '../components/FlowerCard';
import { FilterSection } from '../components/FilterSection';
import { ReviewSection } from '../components/ReviewSection';
import { ContactSection } from '../components/ContactSection';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Heart, Flame, Gift, Star, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

interface HomePageProps {
  flowers: Flower[];
  isLoading?: boolean;
  onAddToCart: (flower: Flower) => void;
  onBuyNow: (flower: Flower) => void;
  onQuickView: (flower: Flower) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  filteredFlowers: Flower[];
  onNavigateToCatalog: () => void;
  onAddReview: (review: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  flowers,
  isLoading = false,
  onAddToCart,
  onBuyNow,
  onQuickView,
  filters,
  onFilterChange,
  onResetFilters,
  filteredFlowers,
  onNavigateToCatalog,
  onAddReview,
}) => {
  const hotProducts = flowers.filter((f) => f.isHot);

  return (
    <div className="space-y-12">
      
      {/* HERO SECTION - Geometric Balance Theme */}
      <section id="hero" className="relative pt-24 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-[#FDE2E4] rounded-2xl p-8 sm:p-12 flex items-center relative overflow-hidden min-h-[260px] border border-[#FAD2D4]">
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#E86F80] font-bold block">
                Spring Collection • Fresh Florist
              </span>

              <h1 className="text-3xl sm:text-5xl font-serif text-[#4A3B3B] font-bold leading-tight">
                Fresh Blooms Delivered to Your Doorstep
              </h1>

              <p className="text-xs sm:text-sm text-[#4A3B3B]/80 max-w-md">
                Hand-cut Ecuadorian roses, soft peonies, and crisp tulips wrapped in eco-friendly paper.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <button
                  onClick={onNavigateToCatalog}
                  className="bg-[#E86F80] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#d65f70] transition-colors flex items-center gap-2"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('hot-products');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/80 border border-[#E86F80] text-[#E86F80] px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-[#E86F80]" />
                  View Hot Products
                </button>
              </div>
            </div>

            {/* Background Decorative Floral Emblem */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 h-full w-1/3 sm:w-1/2 flex items-center justify-center opacity-30 text-[120px] sm:text-[160px] pointer-events-none">
              🌸
            </div>
          </div>

          {/* Quick Trust Bar */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3 rounded-xl border border-[#FDE2E4]">
              <span className="font-serif text-lg font-bold text-[#E86F80] block">7 Days</span>
              <span className="text-[10px] text-[#4A3B3B]/70">Freshness Guarantee</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#FDE2E4]">
              <span className="font-serif text-lg font-bold text-[#E86F80] block">100% Eco</span>
              <span className="text-[10px] text-[#4A3B3B]/70">Paper Artisanal Wrap</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#FDE2E4]">
              <span className="font-serif text-lg font-bold text-[#E86F80] block">Same-Day</span>
              <span className="text-[10px] text-[#4A3B3B]/70">Local Express Delivery</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#FDE2E4]">
              <span className="font-serif text-lg font-bold text-[#E86F80] block">4.9 ★</span>
              <span className="text-[10px] text-[#4A3B3B]/70">2,400+ Client Reviews</span>
            </div>
          </div>

        </div>
      </section>

      {/* HOT PRODUCTS SECTION */}
      <section id="hot-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FDE2E4] text-[#E86F80] text-xs font-bold px-3 py-1 rounded-full border border-[#FAD2D4] mb-1">
              <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Trending & Best Sellers</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#4A3B3B]">
              Hot Products
            </h2>
          </div>

          <div className="flex space-x-2 items-center">
            <span className="bg-white px-3 py-1 rounded-full text-[10px] border border-[#FAD2D4] text-[#4A3B3B]">Price: $15 - $150</span>
            <span className="bg-white px-3 py-1 rounded-full text-[10px] border border-[#FAD2D4] text-[#4A3B3B]">Status: In Stock</span>
            <button
              onClick={onNavigateToCatalog}
              className="text-xs font-bold text-[#E86F80] hover:underline ml-2"
            >
              See All →
            </button>
          </div>
        </div>

        {/* Hot Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotProducts.map((flower) => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION (CTA) SECTION */}
      <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#4A3B3B] rounded-2xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden border border-[#FAD2D4]">
          <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none text-9xl font-serif">
            🌸
          </div>

          <div className="max-w-xl relative z-10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86F80] bg-white/10 px-3.5 py-1 rounded-full border border-white/20 inline-block">
              Limited Floral Promotion
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
              Enjoy 10% Off Your First Fresh Bouquet Order
            </h2>

            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Use promo code <strong className="font-mono bg-white/20 px-2 py-0.5 rounded text-white border border-white/30 underline">BLOOM10</strong> during card checkout to unlock your discount!
            </p>

            <div className="pt-2">
              <button
                onClick={onNavigateToCatalog}
                className="py-2.5 px-6 rounded-full bg-[#E86F80] text-white hover:bg-[#d65f70] font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Gift className="w-4 h-4 text-white" />
                Claim Your Discount Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE FLOWERS SHOWCASE */}
      <section id="filters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FilterSection
          filters={filters}
          onFilterChange={onFilterChange}
          onResetFilters={onResetFilters}
          totalResults={filteredFlowers.length}
        />

        {/* Display filtered products */}
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="w-8 h-8 mx-auto border-4 border-[#FDE2E4] border-t-[#C83863] rounded-full animate-spin"></div>
            <p className="mt-4 text-xs font-bold text-[#4A3B3B]">Loading Fresh Blooms...</p>
          </div>
        ) : filteredFlowers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#FDE2E4] p-8">
            <div className="text-4xl mb-3">🌺</div>
            <h3 className="font-serif text-lg font-bold text-[#4A3B3B] mb-1">
              No Flowers Match Your Current Filters
            </h3>
            <p className="text-xs text-[#4A3B3B]/70 max-w-sm mx-auto mb-6">
              Try adjusting your max price slider or selecting "All" categories to see our full floral selection.
            </p>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-full bg-[#E86F80] text-white font-bold text-xs shadow-sm hover:bg-[#d65f70]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFlowers.map((flower) => (
              <FlowerCard
                key={flower.id}
                flower={flower}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </section>

      {/* REVIEWS SECTION */}
      <ReviewSection reviews={REVIEWS} onAddReview={onAddReview} />

      {/* CONTACT & BOUTIQUE LOCATION */}
      <ContactSection />

    </div>
  );
};
