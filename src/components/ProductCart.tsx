// src/components/ProductCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/index';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    isLoading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading }) => {
    const { addToCart } = useCart();

    if (isLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse p-4">
                <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
                <div className="mt-4 h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="mt-4 h-10 bg-gray-300 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="group relative flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-square w-full overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 flex-grow mt-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        aria-label={`Añadir ${product.name} al carrito`}
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;