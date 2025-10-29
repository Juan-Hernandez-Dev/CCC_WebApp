// src/components/Layout/MainLayout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import CartDrawer from '@/components/Cart/CartDrawer';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, User } from 'lucide-react';
import Image from 'next/image';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { toggleCart, cartCount } = useCart();

  const CustomHeader: React.FC = () => (
    <header className="sticky top-0 z-10 w-full bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
            <div className='bg-white p-1 rounded-md'>
                 <Image src="https://i.imgur.com/LPN1L4L.png" alt="Crystalim Logo" width={80} height={30} unoptimized className="sm:w-[120px] sm:h-[40px]"/>
            </div>
          </Link>

          <div className="hidden sm:block">
            <Image src="https://i.imgur.com/9v1v1Jj.png" alt="Comercializadora Logo" width={100} height={35} unoptimized className="sm:w-[150px] sm:h-[50px]"/>
          </div>
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
          <Link href="/catalog" className="text-white font-medium hover:text-blue-200 transition-colors hidden sm:block">
            Catálogo
          </Link>

          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
            aria-label="Abrir Carrito de Compras"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <button className="text-white hover:text-blue-200 p-2 rounded-full hover:bg-blue-600 transition-colors">
            <User size={24} />
          </button>
        </nav>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CustomHeader />
      <main className="flex-grow"> 
        {children}
      </main>
      <CartDrawer />
    </div>
  );
};

export default MainLayout;