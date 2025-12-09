"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import data from "../components/products.json";

type Producto = {
  nombre: string;
  capacidad?: string;
  clave?: string;
  grupo?: string;
  imagen?: string;
  categoria: string;
  descripcion?: string;
};

type ProductImageState = {
  [key: string]: 'loading' | 'loaded' | 'error';
};

const getProxyUrl = (url?: string) => (url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : undefined);

export default function ProductsMobile() {
  const categorias = useMemo(() => ["ALL", ...data.categorias.map((c) => c.nombre)], []);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [imageStates, setImageStates] = useState<ProductImageState>({});
  const categoryMenuRef = useRef<HTMLDivElement>(null); 
  const PAGE_SIZE = 12;

  // Productos filtrados por categoría seleccionada
  const allProducts: Producto[] = useMemo(() => {
    return data.categorias.flatMap((c) => (c.productos || []).map(p => ({ ...p, categoria: c.nombre })));
  }, []);

  const productsByCategory: Producto[] = useMemo(() => {
    if (selectedCategoria === "ALL") return allProducts;
    const cat = data.categorias.find((c) => c.nombre === selectedCategoria);
    return cat ? (cat.productos || []).map(p => ({ ...p, categoria: cat.nombre })) : [];
  }, [selectedCategoria, allProducts]);

  const pageCount = Math.max(1, Math.ceil(productsByCategory.length / PAGE_SIZE));
  if (page > pageCount) setPage(1);

  const visibleProducts = productsByCategory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Lógica para cerrar el menú de categorías al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryMenuRef]);

  // Manejador para seleccionar categoría desde el nuevo menú
  const handleSelectCategory = (category: string) => {
    setSelectedCategoria(category);
    setPage(1);
    setShowCategoryMenu(false);
  };

  // Fallback deterministic price generator (for products without precioOriginal)
  const computePrice = (nombre?: string) => {
    if (!nombre) return 25;
    const sum = Array.from(nombre).reduce((s, ch) => s + ch.charCodeAt(0), 0);
    return (sum % 90) + 10;
  };

  // Helpers para paginación (simples cambios de página)
  const goPreviousPage = () => setPage((prev: number) => Math.max(prev - 1, 1));
  const goNextPage = () => setPage((prev: number) => Math.min(prev + 1, pageCount));

  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Mostrar máximo 7 botones
    
    if (pageCount <= maxVisible) {
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      
      const start = Math.max(2, page - 1);
      const end = Math.min(pageCount - 1, page + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (page < pageCount - 2) pages.push('...');
      pages.push(pageCount);
    }

    return pages.map((p, idx) => {
      if (p === '...') return <span key={'ellipsis-' + idx} className="px-2 py-2 text-gray-500 select-none">...</span>;
      return (
        <button
          key={p}
          onClick={() => setPage(p as number)}
          className={`px-3 py-2 rounded-md border ${
            page === p 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >{p}</button>
      );
    });
  };

  return (
    <section className="px-2 sm:px-4 py-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 pt-8">
        {/* Contenedor del encabezado pequeño y línea azul */}
        <div className="flex items-center justify-left mb-6 space-x-2">
          {/* Línea decorativa azul (SUBRAYADO AZUL) */}
          <div className="w-6 h-0.5 bg-blue-500"></div>

          <h2 className="text-sm sm:text-base font-semibold text-gray-700">Catálogo Completo</h2>
        </div>

        {/* Category selector */}
        <div className="flex justify-start w-full">
            
            {/* 1. Category selector (Menú estilizable, ocupa todo el ancho) */}
            <div className="relative flex-1 max-w-full" ref={categoryMenuRef}>
                <button
                    onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    className="relative flex items-center justify-center
                                bg-white text-gray-800 border border-blue-600
                                text-xs sm:text-sm font-medium px-3 py-2 rounded-md shadow-sm min-h-[44px] w-full"
                    aria-expanded={showCategoryMenu}
                    aria-haspopup="true"
                >
                    {selectedCategoria === "ALL" ? "Todos" : selectedCategoria}
                    <span className="absolute right-2 text-gray-800">
                        {showCategoryMenu ? '▲' : '▼'}
                    </span>
                </button>

                {/* Menú Desplegable (Fondo BLANCO) */}
                {showCategoryMenu && (
                    <div className="absolute left-0 right-0 mt-2 z-10 
                                    bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                        {categorias.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleSelectCategory(c)}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150
                                            ${selectedCategoria === c 
                                                ? 'bg-blue-600 text-white font-semibold' 
                                                : 'text-gray-800 hover:bg-blue-50' // Opciones inactivas en blanco/gris
                                            }`}
                                role="menuitem"
                            >
                                {c === "ALL" ? "Todos" : c}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Lista de productos (cards) */}
      <div className="space-y-3 sm:space-y-4">
        {visibleProducts.map((p, idx) => {
          const imageKey = p.imagen || `noimg-${idx}`;
          const original = (p as any).precioOriginal ?? computePrice(p.nombre);
          const discountAmount = (p as any).descuento ?? 0;
          const finalPrice = discountAmount > 0 ? Math.max(0, original - discountAmount) : original;
          const discountPercent = discountAmount > 0 && original > 0 ? Math.round((discountAmount / original) * 100) : 0;

          return (
            <article
              key={`${p.nombre}-${idx}`}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col gap-3 active:bg-gray-50 transition-colors relative overflow-hidden"
            >
              
              {/* Contenido Principal (Imagen, Título, Descripción, Precio) - USAMOS FLEX-ROW */}
              <div className="flex gap-4 sm:gap-6 w-full">
                
                {/* 1. Columna de Imagen (Lado Izquierdo) */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative">
                  {p.imagen ? (
                    <>
                      {imageStates[imageKey] === 'loading' && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                          <span className="text-gray-400 text-xs">...</span>
                        </div>
                      )}
                      <img
                        src={getProxyUrl(p.imagen)}
                        alt={p.nombre}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-contain transition-opacity duration-300 ${imageStates[imageKey] === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageStates(prev => ({ ...prev, [imageKey]: 'loaded' }))}
                        onError={() => setImageStates(prev => ({ ...prev, [imageKey]: 'error' }))}
                      />
                      {imageStates[imageKey] === 'error' && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-400 text-xs">—</div>
                  )}
                </div>

                {/* 2. Columna de Contenido (Lado Derecho: Título, Descripción y Precio) */}
                <div className="flex-1 min-w-0 flex flex-col justify-start relative">
                  
                  {/* Título y Marca (TOP) */}
                  <div className="mb-2"> 
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
                      {p.nombre}
                    </h3>
                  </div>

                  {/* Descripción y Precio: FLEX-ROW */}
                  <div className="flex justify-between items-start gap-4"> 
                    {/* Descripción a la Izquierda */}
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 w-2/3">
                        {p.descripcion}
                    </p>
                    
                    {/* Precios a la Derecha */}
                    <div className="flex flex-col items-end shrink-0 w-1/3">
                        {/* Precio Original Tachado */}
                        {original !== finalPrice && (
                          <div className="text-sm sm:text-md text-gray-400 line-through leading-none">${original.toFixed(2)}</div>
                        )}
                        {/* Precio Final Destacado */}
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 leading-none">${finalPrice.toFixed(2)}</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer de Etiquetas (BOTTOM de la tarjeta) - Sin línea divisoria */}
              <div className="flex flex-row gap-2 -mx-4 px-4 -mb-4 pb-4"> 
                {/* Etiqueta de Categoría (Azul) */}
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {p.categoria ?? 'TODOS'}
                </span>
                {/* Etiqueta de Descuento (Naranja) */}
                {discountPercent > 0 && (
                  <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {discountPercent}% de Descuento
                  </span>
                )}
              </div>
            </article>
          );
        })}

        {/* cuando no hay productos */}
        {visibleProducts.length === 0 && (
          <div className="py-8 text-center text-gray-500 text-sm sm:text-base">No hay productos en esta categoría.</div>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-1 mt-12">
        <button
          onClick={goPreviousPage}
          disabled={page === 1}
          className={`px-3 py-2 rounded border text-sm font-medium transition ${
            page === 1
              ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
              : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >«</button>

        <button
          onClick={goPreviousPage}
          disabled={page === 1}
          className={`px-3 py-2 rounded border text-sm font-medium transition ${
            page === 1
              ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
              : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >‹</button>

        {renderPaginationButtons()}

        <button
          onClick={goNextPage}
          disabled={page === pageCount}
          className={`px-3 py-2 rounded border text-sm font-medium transition ${
            page === pageCount
              ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
              : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >›</button>

        <button
          onClick={goNextPage}
          disabled={page === pageCount}
          className={`px-3 py-2 rounded border text-sm font-medium transition ${
            page === pageCount
              ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
              : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
          }`}
        >»</button>
      </div>
    </section>
  ); 
}