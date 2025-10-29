// src/app/catalog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCart';
import { Product, mockProducts } from '@/types/index';

export default function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(mockProducts);
            setIsLoading(false);
        }, 1500); // 1.5 segundos de carga simulada

        return () => clearTimeout(timer);
    }, []);

    const loadingSlots = 6; 

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 border-b pb-2">Catálogo de Productos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {isLoading ? (
                    Array.from({ length: loadingSlots }).map((_, index) => (
                        <ProductCard key={index} product={{} as Product} isLoading={true} /> 
                    ))
                ) : (
                    products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            isLoading={false} 
                        />
                    ))
                )}
            </div>
            
            {!isLoading && products.length === 0 && (
                <div className="text-center p-10 text-gray-500">
                    No hay productos disponibles en este momento.
                </div>
            )}
        </div>
    );
}