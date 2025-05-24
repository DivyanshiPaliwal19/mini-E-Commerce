'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroBanner from './components/HeroBanner';
import FeaturedCategories from './components/FeaturedCategories';
import ProductCard from './components/ProductCard';
import { Product, ProductsResponse } from './../app/types/product';
import { useRouter } from 'next/navigation';



const HomePage: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=8');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: ProductsResponse = await response.json();
      // Sort by rating to get "trending" products
      const sortedProducts = data.products.sort((a, b) => b.rating - a.rating);
      setTrendingProducts(sortedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    // This will be connected to Redux later
    console.log('Adding to cart:', product);
    // For now, just show an alert
    // alert(`${product.title} added to cart!`);
  };

  return (
    <>
    
      <Head>
        <title>E-Shop - Your Ultimate Shopping Destination</title>
        <meta name="description" content="Discover amazing products at unbeatable prices. Shop electronics, fashion, beauty, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">


        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Featured Categories */}
          <FeaturedCategories />

          {/* Trending Products Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Trending Products</h2>
              <button className="text-blue-600 hover:text-blue-800 font-semibold" onClick={() => router.push('./products')}>
                View All Products →
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Failed to load products: {error}</p>
                <button
                  onClick={fetchTrendingProducts}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </section>
        </main>


      </div>
    </>
  );
};

export default HomePage;