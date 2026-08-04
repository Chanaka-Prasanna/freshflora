import React from 'react';
import { Flower, FilterState } from '../types';
import { FlowerCard } from '../components/FlowerCard';
import { FilterSection } from '../components/FilterSection';
import { Flower2, Sparkles } from 'lucide-react';

interface FlowersPageProps {
  flowers: Flower[];
  isLoading?: boolean;
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
  isLoading = false,
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

      {/* Filter Component */}
      <FilterSection
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={filteredFlowers.length}
      />

      {/* Grid of Results */}
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 mx-auto border-4 border-[#FCE8EF] border-t-[#C83863] rounded-full animate-spin"></div>
          <p className="mt-4 text-sm font-bold text-[#3D1E28]">Fetching Collection...</p>
        </div>
      ) : filteredFlowers.length === 0 ? (
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
