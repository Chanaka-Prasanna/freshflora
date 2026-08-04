import React from 'react';
import { Flower, FilterState } from '../types';
import { FlowerCard } from '../components/FlowerCard';
import { FilterSection } from '../components/FilterSection';
import { Flower2, Sparkles } from 'lucide-react';

interface FlowersPageProps {
  flowers: Flower[];
  onAddToCart: (flower: Flower) => void;
  onBuyNow: (flower: Flower) => void;
  onQuickView: (flower: Flower) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  filteredFlowers: Flower[];
}

export const FlowersPage: React.FC<FlowersPageProps> = ({
  flowers,
  onAddToCart,
  onBuyNow,
  onQuickView,
  filters,
  onFilterChange,
  onResetFilters,
  filteredFlowers,
}) => {
  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Banner Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FCE8EF] px-4 py-1.5 rounded-full border border-[#F8D7E3] mb-3">
          <Flower2 className="w-4 h-4 text-[#C83863]" />
          <span className="text-xs font-bold text-[#8C1C40] tracking-wide">
            Complete FloraCharm Boutique Shop
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D1E28] mb-3">
          All Fresh Flower Bouquets & Arrangements
        </h1>
        <p className="text-xs sm:text-sm text-[#735A63]">
          Browse our entire garden collection filtered by flower type, price, and availability. All stems are hand-picked at dawn and arranged with artisan care.
        </p>
      </div>

      {/* Filter Component */}
      <FilterSection
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={filteredFlowers.length}
      />

      {/* Grid of Results */}
      {filteredFlowers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#F8D7E3] p-8 shadow-sm">
          <div className="text-4xl mb-3">💐</div>
          <h3 className="font-serif text-xl font-bold text-[#3D1E28] mb-1">
            No Flowers Found
          </h3>
          <p className="text-xs text-[#735A63] max-w-sm mx-auto mb-6">
            We couldn't find any arrangements matching your search or price criteria.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#C83863] text-white font-bold text-xs shadow-sm hover:bg-[#B02852]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

    </div>
  );
};
