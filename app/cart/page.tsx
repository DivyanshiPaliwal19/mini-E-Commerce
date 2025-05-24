'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyPromoCode, 
  removePromoCode 
} from '../store/cartSlice';
import type { CartItem } from '../store/cartSlice';

const CartPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, promoCode, promoDiscount } = useAppSelector((state) => state.cart);
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPercentage 
      ? item.price - (item.price * item.discountPercentage / 100)
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const promoDiscountAmount = (subtotal * promoDiscount) / 100;
  const taxRate = 0.08; // 8% tax
  const taxAmount = (subtotal - promoDiscountAmount) * taxRate;
  const total = subtotal - promoDiscountAmount + taxAmount;

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    dispatch(updateQuantity({
      id: item.id,
      color: item.color,
      size: item.size,
      quantity: newQuantity
    }));
  };

  const handleRemoveItem = (item: CartItem) => {
    dispatch(removeFromCart({
      id: item.id,
      color: item.color,
      size: item.size
    }));
  };

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.toUpperCase();
    const promoCodes: Record<string, number> = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'SUMMER15': 15,
      'FIRST25': 25,
    };

    if (promoCodes[code]) {
      dispatch(applyPromoCode(code));
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    dispatch(removePromoCode());
    setPromoError('');
  };

  const handleCheckout = () => {
    // alert('Proceeding to checkout...');
    // Here you would typically redirect to checkout page
  };

  if (items.length === 0) {
    return (
      <>
        <Head>
          <title>Shopping Cart - E-Shop</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className="min-h-screen bg-gray-50">


          {/* Empty Cart */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some products to get started!</p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart ({items.length}) - E-Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">


        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All Items
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemPrice = item.discountPercentage 
                  ? item.price - (item.price * item.discountPercentage / 100)
                  : item.price;

                return (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            {item.brand && (
                              <p className="text-sm text-gray-600">{item.brand}</p>
                            )}
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span>Color: {item.color}</span>
                              <span>Size: {item.size}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${itemPrice.toFixed(2)}
                            </span>
                            {item.discountPercentage && item.discountPercentage > 0 && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-12 text-center font-medium text-black">{item.quantity}</span>
                            
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Stock Warning */}
                        {item.quantity >= item.stock && (
                          <p className="text-sm text-orange-600 mt-2">
                            Only {item.stock} left in stock
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-3">
                      <span className="text-green-800 font-medium">{promoCode}</span>
                      <button
                        onClick={handleRemovePromo}
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-red-600 text-sm">{promoError}</p>
                      )}
                      <div className="text-xs text-gray-500">
                        Try: SAVE10, WELCOME20, SUMMER15, FIRST25
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount ({promoDiscount}%)</span>
                      <span>-${promoDiscountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => router.push('/products')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Checkout Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">
                Total ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </p>
              <p className="text-lg font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              Checkout
            </button>
          </div>
        </div>

        {/* Mobile spacing for sticky bar */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default CartPage;