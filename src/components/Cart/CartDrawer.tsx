// src/components/Cart/CartDrawer.tsx
'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartDrawer: React.FC = () => {
    const { isCartOpen, toggleCart, items, updateQuantity, removeItem, cartTotal, cartCount } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    return (
        <>
            {/* Overlay Oscuro */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
                    onClick={toggleCart}
                ></div>
            )}

            {/* Panel Lateral del Carrito */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ maxWidth: '90vw' }}
            >
                <div className="p-6 h-full flex flex-col">
                    
                    {/* Encabezado del Drawer */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                            <ShoppingCart size={24} className="text-blue-600" />
                            <span>Carrito ({cartCount})</span>
                        </h2>
                        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Cerrar Carrito">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Lista de Items */}
                    <div className="flex-grow overflow-y-auto py-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="text-center p-8 text-gray-500">
                                <p>Tu carrito está vacío.</p>
                                <p className="mt-2 text-blue-500 hover:underline cursor-pointer" onClick={toggleCart}>
                                    ¡Empieza a comprar!
                                </p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-3 border-b border-gray-100 pb-4">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={60}
                                        height={60}
                                        className="rounded-lg object-contain bg-gray-50"
                                    />
                                    <div className="flex-grow">
                                        <p className="font-medium text-gray-800 truncate">{item.name}</p>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                    </div>

                                    {/* Controles de Cantidad (Quantity controls - US-WEB-F03) */}
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                                            className="p-1 text-blue-600 hover:bg-gray-100 rounded-l-full disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                            className="p-1 text-blue-600 hover:bg-gray-100 rounded-r-full"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors" aria-label="Eliminar Ítem">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer y Total */}
                    {items.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center text-xl font-bold mb-4">
                                <span>Total:</span>
                                <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-400/50"
                            >
                                Proceder al Pago
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;