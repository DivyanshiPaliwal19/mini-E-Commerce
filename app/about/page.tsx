import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About E-Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your ultimate shopping destination for quality products at amazing prices. 
            We bring you the finest beauty essentials, electronics, fashion, and lifestyle products 
            from top brands around the world.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded with a passion for bringing you the finest products from around the world, 
                  E-Shop has grown from a small startup to a trusted online destination for millions of customers.
                </p>
                <p>
                  We believe that everyone deserves access to high-quality products that enhance their 
                  lifestyle. Whether you're looking for the latest beauty essentials to glow up your routine, 
                  cutting-edge electronics, trendy fashion pieces, or everyday necessities for your home.
                </p>
                <p>
                  Our commitment to excellence drives us to continuously curate the best products 
                  and provide an exceptional shopping experience for our valued customers.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl p-12">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">500K+</div>
                  <div className="text-gray-600 font-medium">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Quality Products</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">100+</div>
                  <div className="text-gray-600 font-medium">Top Brands</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">4.9★</div>
                  <div className="text-gray-600 font-medium">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

 

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
            Why Choose E-Shop?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Quality Products', description: 'Curated selection from top brands worldwide', emoji: '⭐' },
              { title: 'Fast Delivery', description: 'Quick and reliable shipping to your doorstep', emoji: '🚚' },
              { title: 'Secure Shopping', description: '100% secure payment and data protection', emoji: '🛡️' },
              { title: '24/7 Support', description: 'Round-the-clock customer service support', emoji: '💬' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-blue-50 p-12 rounded-2xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To make high-quality products accessible to everyone by providing an exceptional 
                online shopping experience. We strive to connect customers with the brands and 
                products they love while maintaining the highest standards of service and satisfaction.
              </p>
            </div>
            <div className="bg-purple-50 p-12 rounded-2xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become the world's most trusted e-commerce platform, where customers can 
                discover, explore, and purchase products that enhance their lives. We envision 
                a future where shopping is seamless, enjoyable, and rewarding for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AboutPage;