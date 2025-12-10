"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CImage from '../../assets/Home/Brooms.jpg'
import C2Image from '../../assets/Home/Mops.jpg'
import C3Image from '../../assets/Home//Soaps.jpg'
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation('global');
    return (
        <div className="min-h-screen">
            {/* Hero section para Services */}
             <section className="py-1 px-4 text-gray-900">
        <div className="max-w-7xl mx-auto text-left">
            <div className="flex items-center justify-left mb-4 space-x-2">
                <div className="w-6 h-0.5 bg-blue-500"></div>
                <span className="text-base font-medium text-gray-700">{t('home.section_label')}</span>
                </div><h1 className="text-4xl sm:text-5xl font-extrabold">{t('home.hero_title')}</h1>
        </div>
      </section>
            {/* Sección de tarjetas de servicios */}
            <section className="py-9 px-4 max-w-7xl mx-auto">
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
                            <h3 className="text-xl font-bold text-black mb-3">{t('home.card.brooms_title')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('home.card.brooms_desc')}
                            </p>
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
                            <h3 className="text-xl font-bold text-black mb-3">{t('home.card.mops_title')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('home.card.mops_desc')}
                            </p>
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
                            <h3 className="text-xl font-bold text-black mb-3">{t('home.card.soaps_title')}</h3>
                            <p className="text-gray-600 mb-4">
                                {t('home.card.soaps_desc')}
                            </p>

                        </div>
                    </div>
                </div>
            </section>


            <section className="py-2 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center">
                    {/* Columna de texto */}
                    <div className="space-y-4">
                          <h1 className=" py-2 text-4xl sm:text-5xl font-extrabold">{t('home.cta_title')}</h1>
                        <p className="py-4 text-gray-600 mb-4">
                            {t('home.cta_desc')}
                        </p>
                        <a
                            href="/products"
                            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                        >
                            {t('home.cta_button')} →
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
