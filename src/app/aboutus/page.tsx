'use client';

import React from 'react';
import { useTranslation } from 'react-i18next'; 
import Image from 'next/image';
import Icon from "../../assets/aboutus/innovation.png";
import Icon2 from "../../assets/aboutus/responsability.png";
import Icon3 from "../../assets/aboutus/commitment.png";
import Icon4 from "../../assets/aboutus/loyalty.png";
import Icon5 from "../../assets/aboutus/teamwork.png";
import Icon6 from "../../assets/aboutus/respect.png";
import Icon7 from "../../assets/aboutus/honesty.png"; 

export default function Aboutus() {
    const { t, i18n } = useTranslation('global'); 

    return (
        <div className="min-h-screen bg-white">
            <section className="py-2 sm:py-12 px-4 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto text-left">
                    {/* Contenedor del encabezado pequeño y línea azul */}
                    <div className="flex items-center justify-left mb-4 space-x-2">
                        {/* Línea decorativa azul */}
                        <div className="w-6 h-0.5 bg-blue-500"></div>

                        <span className="text-base font-medium text-gray-700">
                            {/* Uso de la variable de traducción: t('aboutus.section_title') */}
                            {t('aboutus.section_title')}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-dark">
                        {/* Uso de la variable de traducción: t('aboutus.main_title') */}
                        {t('aboutus.main_title')}
                    </h1>
                </div>
            </section>

            {/* About Us Content */}
            <section className="py-10 sm:py-12 px-4 max-w-7xl bg-white mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Column */}
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            {/* Uso de la variable de traducción: t('aboutus.p1') */}
                            {t('aboutus.p1')}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            {/* Uso de la variable de traducción: t('aboutus.p2') */}
                            {t('aboutus.p2')}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            {/* Uso de la variable de traducción: t('aboutus.p3') */}
                            {t('aboutus.p3')}
                        </p>
                    </div>

                    {/* Image Column */}
                    <div className="flex justify-center">
                        <Image
                            src="https://i.ibb.co/8n3554gY/Whats-App-Image-2025-11-10-at-11-58-55-2a4677fe.jpg"
                            alt="Crystalim cleaning products composition"
                            width={400}
                            height={300}
                            className="rounded-lg shadow-md"
                            unoptimized
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-6 sm:py-14 px-4 max-w-7xl bg-white mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <div>
                        <h3 className="text-2xl font-bold text-primary-dark mb-4">
                            {/* Uso de la variable de traducción: t('aboutus.mission_title') */}
                            {t('aboutus.mission_title')}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {/* Uso de la variable de traducción: t('aboutus.mission_text') */}
                            {t('aboutus.mission_text')}
                        </p>
                    </div>

                    {/* Vision */}
                    <div>
                        <h3 className="text-2xl font-bold text-primary-dark mb-4">
                            {/* Uso de la variable de traducción: t('aboutus.vision_title') */}
                            {t('aboutus.vision_title')}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {/* Uso de la variable de traducción: t('aboutus.vision_text') */}
                            {t('aboutus.vision_text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de características adicionales */}
            <section className="py-6 sm:py-10 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center space-x-4 overflow-x-auto">

                        {/* Característica 1 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon}
                                alt="Innovation Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.innovation') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.innovation')}</p>
                        </div>

                        {/* Característica 2 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon2}
                                alt="Responsability Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.responsability') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.responsability')}</p>
                        </div>

                        {/* Característica 3 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon3}
                                alt="Commitment Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.commitment') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.commitment')}</p>
                        </div>

                        {/* Característica 4 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon4}
                                alt="Loyalty Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.loyalty') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.loyalty')}</p>
                        </div>

                        {/* Característica 5 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon5}
                                alt="Teamwork Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.teamwork') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.teamwork')}</p>
                        </div>

                        {/* Característica 6 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon6}
                                alt="Respect Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.respect') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.respect')}</p>
                        </div>

                        {/* Característica 7 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <Image
                                src={Icon7}
                                alt="Honesty Icon"
                                width={32}      // equivalente al texto de 2xl
                                height={32}
                                className="mb-2"
                            />
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                            {/* Uso de la variable de traducción: t('aboutus.honesty') */}
                            <p className="text-sm font-medium text-black mb-1">{t('aboutus.honesty')}</p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};