import React from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal, Sparkles } from 'lucide-react';
import { FlowerCategory, AvailabilityStatus, FilterState } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORIES: FlowerCategory[] = [
  'All',
  'Roses',
  'Peonies',
  'Tulips',
  'Lilies',
  'Orchids',
  'Hydrangeas',
  'Sunflowers',
  'Mixed Bouquets'
];

const AVAILABILITY_OPTIONS: Array<'All' | AvailabilityStatus> = [
  'All',
  'In Stock',
  'Pre-Order',
  'Limited Season'
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F8D7E3] shadow-rose-soft mb-8">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#FCE8EF]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C83863] bg-[#FCE8EF] px-3 py-1 rounded-full border border-[#F8D7E3]">
            Curated Flower Collection
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#3D1E28] mt-1">
            Filter Fresh Arrangements
          </h2>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8C5A6A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flower title or color..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-[#F8D7E3] bg-[#FFF0F5] text-[#2D232E] focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
          />
        </div>
      </div>

      {/* Main Filter Rows */}
      <div className="pt-6 space-y-6">
        
        {/* Row 1: Flower Type Chips */}
        <div>
          <label className="text-xs font-bold text-[#3D1E28] block mb-2.5">
            Flower Type & Floral Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#C83863] text-white shadow-sm scale-105'
                      : 'bg-[#FFF0F5] text-[#5C4550] hover:bg-[#FCE8EF] border border-[#F8D7E3]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Price Range & Availability Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Price Range Slider */}
          <div className="bg-[#FFF0F5] p-4 rounded-2xl border border-[#F8D7E3]">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-[#3D1E28]">
                Max Price Filter
              </label>
              <span className="font-serif font-bold text-sm text-[#8C1C40]">
                Up to Rs. {filters.maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={500}
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#C83863] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Rs. 500</span>
              <span>Rs. 5000</span>
              <span>Rs. 10000</span>
            </div>
          </div>

          {/* Availability Status Filter */}
          <div className="bg-[#FFF0F5] p-4 rounded-2xl border border-[#F8D7E3]">
            <label className="text-xs font-bold text-[#3D1E28] block mb-2">
              Availability Status
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABILITY_OPTIONS.map((status) => {
                const isSelected = filters.availability === status;
                return (
                  <button
                    key={status}
                    onClick={() => onFilterChange({ ...filters, availability: status })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#3D1E28] text-white'
                        : 'bg-white text-[#5C4550] hover:bg-[#FCE8EF] border border-[#F8D7E3]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="bg-[#FFF0F5] p-4 rounded-2xl border border-[#F8D7E3]">
            <label className="text-xs font-bold text-[#3D1E28] block mb-2">
              Sort Collection
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#F8D7E3] bg-white text-[#2D232E] font-medium focus:outline-none focus:ring-2 focus:ring-[#C83863]/30"
            >
              <option value="popular">Most Popular & Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Bottom Filter Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-[#FCE8EF]">
          <span className="text-xs font-semibold text-[#8C5A6A]">
            Showing <strong className="text-[#3D1E28]">{totalResults}</strong> fresh arrangements
          </span>

          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-[#C83863] font-bold hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>

      </div>
    </div>
  );
};
