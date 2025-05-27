'use client'
import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import { Product, ProductsResponse } from '../types/product';
import { FilterState, SortOption } from '../types/filters';

const ProductListingPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('relevance');

  const sortOptions: SortOption[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: ProductsResponse = await response.json();
      setAllProducts(data.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const matchesSearch = 
          product?.title?.toLowerCase()?.includes(searchLower) ||
          product?.description?.toLowerCase()?.includes(searchLower) ||
          product?.brand?.toLowerCase()?.includes(searchLower) ||
          product?.category?.toLowerCase()?.includes(searchLower) ||
          product?.tags?.some(tag => tag?.toLowerCase()?.includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters?.categories?.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime());
        break;
      default:
        // Relevance - keep original order or sort by a combination of factors
        filtered.sort((a, b) => {
          const scoreA = a.rating * 0.4 + (a.stock > 0 ? 10 : 0) + (5 - a.discountPercentage * 0.1);
          const scoreB = b.rating * 0.4 + (b.stock > 0 ? 10 : 0) + (5 - b.discountPercentage * 0.1);
          return scoreB - scoreA;
        });
    }

    return filtered;
  }, [allProducts, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    // alert(`${product.title} added to cart!`);
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <>
      <Head>
        <title>Products - E-Shop</title>
        <meta name="description" content="Browse our extensive collection of products with advanced filtering options." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex">
            {/* Filter Sidebar */}
            <FilterSidebar
              products={allProducts}
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 lg:ml-8">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                    </svg>
                    Filters
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    {loading ? 'Loading...' : `${filteredAndSortedProducts.length} products found`}
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md text-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value} >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Error State */}
              {error && (
                <div className="text-center py-12">
                  <p className="text-red-600 mb-4">Error: {error}</p>
                  <button
                    onClick={fetchProducts}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Product Grid */}
              <ProductGrid
                products={currentProducts}
                loading={loading}
                onAddToCart={handleAddToCart}
              />

              {/* Pagination */}
              {!loading && filteredAndSortedProducts.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;