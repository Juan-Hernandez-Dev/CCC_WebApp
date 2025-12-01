"use client"; // <--- ¡Esta es la solución!

import React, { useState, useEffect } from 'react';
import ProductsMobile from '../../components/ProductsMobile';
import Product from '../../components/Product'; // Asumo que Product es el componente de escritorio

// Define el punto de quiebre (por ejemplo, 768px)
const MOBILE_BREAKPOINT = 768;

export default function ProductsPage() {
  // 1. Hook para rastrear si es móvil
  const [isMobile, setIsMobile] = useState(() => {
    // Inicializa el estado solo en el cliente
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false; // Valor por defecto durante el renderizado inicial del servidor (si aplica)
  });

  // 2. Hook para manejar el evento de redimensionamiento
  useEffect(() => {
    const handleResize = () => {
      // Actualiza el estado basado en el nuevo ancho de la ventana
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Agregar el listener al montar el componente
    window.addEventListener('resize', handleResize);

    // Limpiar el listener al desmontar el componente (importante)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3. Renderizado condicional
  return isMobile ? <ProductsMobile /> : <Product />;
}