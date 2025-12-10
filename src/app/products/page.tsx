"use client"; // <--- ¡Esta es la solución!

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsMobile from '../../components/ProductsMobile';
import Product from '../../components/Product'; // Asumo que Product es el componente de escritorio

// Define el punto de quiebre (por ejemplo, 768px)
const MOBILE_BREAKPOINT = 768;

export default function ProductsPage() {
  const { t } = useTranslation('global');
  
  // 1. Hook para rastrear si es móvil
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 2. Hook para manejar el evento de redimensionamiento y detectar cliente
  useEffect(() => {
    // Marcar que estamos en el cliente y obtener el tamaño inicial
    setIsClient(true);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3. No renderizar nada hasta que el cliente esté listo (evita hydration mismatch)
  if (!isClient) {
    return null;
  }

  // 4. Renderizado condicional
  return isMobile ? <ProductsMobile /> : <Product />;
}