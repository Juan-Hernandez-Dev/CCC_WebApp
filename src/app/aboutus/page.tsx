import React from 'react';
import Image from 'next/image';

export default function Aboutus() {
    return (
        <div className="min-h-screen bg-white-50">
            <section className="py-16 px-4 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto text-left">
                    {/* Contenedor del encabezado pequeño y línea azul */}
                    <div className="flex items-center justify-left mb-4 space-x-2">
                        {/* Línea decorativa azul */}
                        <div className="w-6 h-0.5 bg-blue-500"></div>

                        <span className="text-base font-medium text-gray-700">
                            About Us
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900">
                        Cleaning with a Purpose
                    </h1>
                </div>
            </section>

            {/* About Us Content */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Column */}
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            At Crystalim, we are a company dedicated to providing high-quality cleaning solutions
                            that make a difference in people's lives. Our commitment goes beyond just products;
                            we strive to create sustainable and effective cleaning experiences.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Since our beginnings as Comercializadora Castro Cervantes, we have evolved into a
                            trusted brand in the cleaning industry, offering innovative products that combine
                            performance with environmental responsibility.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We believe that cleaning should be efficient, safe, and accessible to everyone.
                            That's why we continuously invest in research and development to bring you the
                            best cleaning technologies available.
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
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To market cleaning products that stand out for their quality, effectiveness, and
                            commitment to sustainability. We aim to provide comprehensive cleaning solutions
                            that meet the needs of both residential and commercial customers, ensuring
                            exceptional results in every application.
                        </p>
                    </div>

                    {/* Vision */}
                    <div>
                        <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To become a leading company in the marketing of cleaning products, recognized
                            for our innovation, quality, and dedication to customer satisfaction. We envision
                            a future where Crystalim is synonymous with excellence in cleaning solutions
                            worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Sección de características adicionales */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center space-x-4 overflow-x-auto">

                        {/* Característica 1 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">⚡</span>
                            <p className="text-sm font-medium text-black mb-1">Innovation</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 2 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">📋</span>
                            <p className="text-sm font-medium text-black mb-1">Responsibility</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 3 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">🚩</span>
                            <p className="text-sm font-medium text-black mb-1">Commitment</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 4 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">❤️</span>
                            <p className="text-sm font-medium text-black mb-1">Loyalty</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 5 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">👥</span>
                            <p className="text-sm font-medium text-black mb-1">Teamwork</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 6 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">👍</span>
                            <p className="text-sm font-medium text-black mb-1">Respect</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                        {/* Característica 7 */}
                        <div className="flex flex-col items-center min-w-[90px]">
                            <span className="text-2xl text-black mb-2">✅</span>
                            <p className="text-sm font-medium text-black mb-1">Honesty</p>
                            <div className="w-8 h-[2px] bg-blue-500 rounded"></div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

