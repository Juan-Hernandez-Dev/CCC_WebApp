import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section para Services */}
            <section className="bg-blue-500 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Línea decorativa azul */}
                    <div className="w-16 h-1 bg-white mx-auto mb-4"></div>

                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        Services
                    </h1>

                    <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
                        What We Offer for your Home and Business
                    </h2>
                </div>
            </section>

            {/* Sección de tarjetas de servicios */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                {/* Grid de tarjetas de servicios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tarjeta Brooms */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-square relative">
                            <Image
                                src="https://i.imgur.com/placeholder-brooms.jpg" // Placeholder para escobas
                                alt="Traditional brooms"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">Brooms</h3>
                            <p className="text-gray-600 mb-4">
                                Strong and durable brooms, designed to provide efficient cleaning for all your
                                sweeping needs. Perfect for homes and businesses alike.
                            </p>
                            <Link
                                href="/catalog"
                                className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                View Products →
                            </Link>
                        </div>
                    </div>

                    {/* Tarjeta Mops */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-square relative">
                            <Image
                                src="https://i.imgur.com/placeholder-mops.jpg" // Placeholder para trapeadores
                                alt="Cotton mops"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">Mops</h3>
                            <p className="text-gray-600 mb-4">
                                Highly absorbent and durable mops, ideal for keeping floors spotless and
                                maintaining a clean environment in any setting.
                            </p>
                            <Link
                                href="/catalog"
                                className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                View Products →
                            </Link>
                        </div>
                    </div>

                    {/* Tarjeta Soaps */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-square relative">
                            <Image
                                src="https://i.imgur.com/placeholder-soaps.jpg" // Placeholder para jabones
                                alt="Bar soaps"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">Soaps</h3>
                            <p className="text-gray-600 mb-4">
                                Liquid and bar soaps designed to provide deep cleansing without compromising
                                on gentleness or effectiveness.
                            </p>
                            <Link
                                href="/catalog"
                                className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                View Products →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de características adicionales */}
            <section className="py-16 px-4 bg-blue-50">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-12">
                        Why Choose Crystalim?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Característica 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">✓</span>
                            </div>
                            <h4 className="text-xl font-semibold text-blue-900 mb-2">Eco-Friendly</h4>
                            <p className="text-gray-600">
                                Our products are designed with the environment in mind, using sustainable materials
                                and biodegradable formulas.
                            </p>
                        </div>

                        {/* Característica 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">⚡</span>
                            </div>
                            <h4 className="text-xl font-semibold text-blue-900 mb-2">Concentrated Power</h4>
                            <p className="text-gray-600">
                                High-efficiency formulas that deliver powerful cleaning results with less product usage.
                            </p>
                        </div>

                        {/* Característica 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">🚚</span>
                            </div>
                            <h4 className="text-xl font-semibold text-blue-900 mb-2">Fast Shipping</h4>
                            <p className="text-gray-600">
                                Quick and reliable delivery to ensure you never run out of essential cleaning supplies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to action section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6">
                        Ready to Get Started?
                    </h3>
                    <p className="text-gray-700 mb-8">
                        Browse our complete catalog of cleaning solutions and find the perfect products for your needs.
                    </p>
                    {/* <Link
                        href="/catalog"
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        View Full Catalog →
                    </Link> */}
                </div>
            </section>
        </div>
    )
}

export default Home;
