import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { FilterState } from '../types/filters';

interface FilterSidebarProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  products,
  filters,
  onFiltersChange,
  isOpen,
  onClose
}) => {
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    if (products.length > 0) {
      // Extract unique categories
      const categories = [...new Set(products.map(p => p.category))].sort();
      setAvailableCategories(categories);

      // Extract unique brands
      const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
      setAvailableBrands(brands);

      // Calculate price range
      const prices = products.map(p => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [products]);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    onFiltersChange({
      ...filters,
      brands: updatedBrands
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: { min, max }
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      priceRange: { min: priceRange.min, max: priceRange.max },
      rating: 0,
      searchQuery: filters.searchQuery
    });
  };

  const activeFiltersCount = filters.categories.length + filters.brands.length + 
    (filters.rating > 0 ? 1 : 0) + 
    (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max ? 1 : 0);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-16 lg:top-0 inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 overflow-y-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:h-screen lg:sticky
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <div className="flex items-center space-x-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All ({activeFiltersCount})
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Categories</h3>
            <div className="space-y-3">
              {availableCategories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 capitalize">{category}</span>
                  <span className="ml-auto text-sm text-gray-500">
                    ({products.filter(p => p.category === category).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Brands</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {availableBrands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">{brand}</span>
                  <span className="ml-auto text-sm text-gray-500">
                    ({products.filter(p => p.brand === brand).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), filters.priceRange.max)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange.min, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={priceRange.min}
                    max={priceRange.max}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Range: ${priceRange.min} - ${priceRange.max}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Minimum Rating</h3>
            <div className="space-y-3">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-700">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;