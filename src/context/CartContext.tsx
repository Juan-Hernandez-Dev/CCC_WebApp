// src/context/CartContext.tsx
'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { CartItem, Product } from '@/types/index';

// --- Definición del Contexto ---
interface CartContextType {
    isCartOpen: boolean;
    items: CartItem[];
    cartCount: number;
    cartTotal: number;
    addToCart: (product: Product) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el carrito
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// --- Componente Proveedor (Provider) ---
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);

    const { cartTotal, cartCount } = useMemo(() => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        return { cartTotal: total, cartCount: count };
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeItem(id);
            return;
        }
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const value = {
        isCartOpen,
        items,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeItem,
        toggleCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};