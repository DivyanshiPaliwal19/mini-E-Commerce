import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '120+ Products'
    },
    {
      id: 2,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '85+ Products'
    },
    {
      id: 3,
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '200+ Products'
    },
    {
      id: 4,
      name: 'Home & Garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '95+ Products'
    },
    {
      id: 5,
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '60+ Products'
    },
    {
      id: 6,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productCount: '150+ Products'
    }
  ];
  const router = useRouter();
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
        <button className="text-blue-600 hover:text-blue-800 font-semibold" onClick={() => router.push('./products')}>
          View All Categories →
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer"
          >
            <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-colors duration-300" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.productCount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;