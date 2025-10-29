// src/app/page.tsx
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="bg-blue-500 text-white rounded-2xl shadow-xl p-6 sm:p-10 md:p-20 text-center flex flex-col items-center justify-center h-[40vh] sm:h-[50vh] transition-all duration-500">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4">
          The Future of Clean is Crystalim™
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90">
          Discover high-efficiency cleaning solutions for your home and business.
        </p>
        <Link
            href="/catalog"
            className="bg-white text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300"
        >
          Explore Catalog →
        </Link>
      </div>

      <section className="mt-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Our Commitments</h2>
        <div className="flex flex-col sm:flex-row justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-8">
            <p className="text-gray-600">Eco-Friendly</p>
            <p className="text-gray-600">Concentrated Power</p>
            <p className="text-gray-600">Fast Shipping</p>
        </div>
      </section>
    </div>
  );
}
