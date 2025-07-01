import React from "react";

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-pink-100 py-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-800">
          Welcome to ShopCenter
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Discover the latest products at unbeatable prices
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Shop Now
        </button>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Clothing", "Shoes", "Electronics", "Accessories"].map(
            (category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full mb-4"></div>
                <h3 className="text-lg font-medium text-gray-700">
                  {category}
                </h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((product) => (
            <div
              key={product}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-200 rounded-t-xl"></div>
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800">
                  Product {product}
                </h3>
                <p className="text-sm text-gray-500 mt-1">$49.99</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
