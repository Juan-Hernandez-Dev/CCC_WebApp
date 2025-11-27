import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CImage from '../../assets/Home/Brooms.jpg'
import C2Image from '../../assets/Home/Mops.jpg'
import C3Image from '../../assets/Home/Soaps.jpg'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section para Services */}
            <section className="py-16 px-4 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto text-left">
                    {/* Contenedor del encabezado pequeño y línea azul */}
                    <div className="flex items-center justify-left mb-4 space-x-2">
                        {/* Línea decorativa azul */}
                        <div className="w-6 h-0.5 bg-blue-500"></div>

                        <span className="text-base font-medium text-gray-700">
                            Products
                        </span>
                    </div>
                    <span className="text-4xl sm:text-5xl font-extrabold text-base text-gray-700">
                        What we offer for your home and your business
                    </span>
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
                                src={CImage} // Placeholder para escobas
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
                                src={C2Image} // Placeholder para trapeadores
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
                                src={C3Image} // Placeholder para jabones
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


            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center">
                    {/* Columna de texto */}
                    <div className="space-y-4">
                        <p className="text-4xl font-bold text-gray-900 mb-15">
                            Are you looking for something else?
                        </p>
                        <p className="text-gray-700 w-full mb-15">
                            Explore our complete catalog and find a wide variety of products designed to meet the cleaning needs of any space.
                            At Crystalim, we offer reliable, effective solutions designed for your convenience.
                        </p>
                        <a
                            href="/catalog"
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                        >
                            View all Products →
                        </a>
                    </div>
                    {/* Columna vacía para mantener la estructura de dos columnas */}
                    <div></div>

                </div>
            </section>
        </div>
    )
}

export default Home;
