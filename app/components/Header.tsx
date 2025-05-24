'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/app/hooks/redux';
 
const Header: React.FC = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);
  

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
 
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 text-gray-600 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 onClick={() => router.push('/')} className=" cursor-pointer text-2xl font-bold text-blue-600">E-Shop</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              <a onClick={() => router.push("/")} className="text-gray-700 hover:text-blue-600">Home</a>
              <a onClick={() => router.push("/products")} className="text-gray-700 hover:text-blue-600">Products</a>
              <a onClick={() => router.push("/categories")} className="text-gray-700 hover:text-blue-600">Categories</a>
            </nav>
            <button
              onClick={() => router.push('/cart')}
              className="relative text-gray-700 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
 
export default Header;