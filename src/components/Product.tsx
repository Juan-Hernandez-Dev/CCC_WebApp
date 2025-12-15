"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import productsData from "./products.json";

const PRODUCTS_PER_PAGE = 12; // 4 columns x 3 rows

const getProxyUrl = (url?: string) => (url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : undefined);

export default function ProductPage() {
  const { t } = useTranslation('global');
  
  const categorias = productsData.categorias;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageStates, setImageStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (index: number | null) => {
    setSelectedCategoryIndex(index);
    setCurrentPage(1);
  };

  let displayedProducts = selectedCategoryIndex === null
    ? categorias.flatMap(cat => (cat.productos || []).map(p => ({ ...p, categoria: cat.nombre })))
    : (categorias[selectedCategoryIndex].productos || []).map(p => ({ ...p, categoria: categorias[selectedCategoryIndex].nombre }));

  const totalPages = Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = displayedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const onImgLoad = (key: string) => {
    setImageStates(prev => ({ ...prev, [key]: 'loaded' }));
  };
  const onImgError = (key: string) => {
    setImageStates(prev => ({ ...prev, [key]: 'error' }));
  };

  // Initialize image states for current products on page change
  React.useEffect(() => {
    const newStates: Record<string, 'loading' | 'loaded' | 'error'> = {};
    paginatedProducts.forEach((product, idx) => {
      const key = product.imagen || `noimg-${idx}`;
      newStates[key] = product.imagen ? 'loading' : 'error';
    });
    setImageStates(newStates);
  }, [currentPage, selectedCategoryIndex]);

  // After render, check <img> elements that may have already completed loading
  useEffect(() => {
    if (!gridRef.current) return;
    const imgs = Array.from(gridRef.current.querySelectorAll('img[data-image-key]')) as HTMLImageElement[];
    imgs.forEach((img) => {
      const key = img.dataset.imageKey ?? '';
      if (!key) return;
      if (img.complete) {
        // naturalWidth == 0 indicates a broken image
        if (img.naturalWidth && img.naturalWidth > 0) {
          setImageStates(prev => ({ ...prev, [key]: 'loaded' }));
        } else {
          setImageStates(prev => ({ ...prev, [key]: 'error' }));
        }
      }
    });
  }, [currentPage, selectedCategoryIndex]);

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

  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7; // Mostrar máximo 7 botones
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, idx) => {
      if (page === '...') return <span key={'ellipsis-' + idx} className="px-2 py-2 text-gray-500 select-none">...</span>;
      return (
        <button
          key={page}
          onClick={() => goToPage(page as number)}
          className={`px-3 py-2 rounded-md border ${
            currentPage === page 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >{page}</button>
      );
    });
  };

  // Fallback deterministic price generator (for products without precioOriginal)
  const computePrice = (nombre?: string) => {
    if (!nombre) return 25;
    const sum = Array.from(nombre).reduce((s, ch) => s + ch.charCodeAt(0), 0);
    return (sum % 90) + 10;
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <section className="py-1 px-4 text-gray-900">
            <div className="max-w-7xl mx-auto text-left">
              <div className="flex items-center justify-left mb-4 space-x-2">
                <div className="w-6 h-0.5 bg-blue-500"></div>
                <span className="text-base font-medium text-gray-700">{t('products.catalog_title')}</span>
              </div>
            </div>
          </section>

          {/* Category Selector */}
          <div className="w-full sm:w-48">
            {/* Category selector (Menú estilizable, ocupa todo el ancho) */}
            <div className="relative flex-1 max-w-full" ref={categoryMenuRef}>
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="relative flex items-center justify-center
                          bg-white text-gray-800 border border-blue-600
                          text-sm font-medium px-3 py-2 rounded-md shadow-sm min-h-[44px] w-full"
                aria-expanded={showCategoryMenu}
                aria-haspopup="true"
              >
                {selectedCategoryIndex === null ? "Todos" : categorias[selectedCategoryIndex].nombre}
                <span className="absolute right-2 text-gray-800">
                  {showCategoryMenu ? '▲' : '▼'}
                </span>
              </button>

              {/* Menú Desplegable (Fondo BLANCO) */}
              {showCategoryMenu && (
                <div className="absolute left-0 right-0 mt-2 z-10
                              bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150
                              ${selectedCategoryIndex === null
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'text-gray-800 hover:bg-blue-50' // Opciones inactivas en blanco/gris
                              }`}
                    role="menuitem"
                  >
                    Todos
                  </button>
                  {categorias.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategorySelect(idx)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150
                                ${selectedCategoryIndex === idx
                                  ? 'bg-blue-600 text-white font-semibold'
                                  : 'text-gray-800 hover:bg-blue-50' // Opciones inactivas en blanco/gris
                                }`}
                      role="menuitem"
                    >
                      {cat.nombre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-12">{t('products.no_products')}</p>
        ) : (
          <>
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10" style={{ gridAutoRows: '1fr' }}>
              {paginatedProducts.map((product, idx) => {
                const key = product.imagen || `noimg-${idx}`;
                const state = imageStates[key] || (product.imagen ? 'loading' : 'error');
                const proxySrc = getProxyUrl(product.imagen);

                const original = product.precioOriginal ?? computePrice(product.nombre);
                const discountAmount = (product as any).descuento ?? 0;
                const finalPrice = discountAmount > 0 ? Math.max(0, original - discountAmount) : original;
                const discountPercent = discountAmount > 0 && original > 0 ? Math.round((discountAmount / original) * 100) : 0;

                return (
                  <div key={idx} className="h-full max-h-96 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow">
                    {/* Image Container (fixed height to keep cards uniform) */}
                    <div className="w-full h-36 sm:h-44 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden relative border border-gray-200"
                         style={{
                           backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
                           backgroundSize: '16px 16px'
                         }}>
                      {product.imagen ? (
                        <>
                          {state === 'loading' && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                              <span className="text-gray-400 text-xs">{t('products.loading_image')}</span>
                            </div>
                          )}
                          <img
                            src={proxySrc}
                            alt={product.nombre}
                            data-image-key={key}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-contain transition-opacity duration-300 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => onImgLoad(key)}
                            onError={() => onImgError(key)}
                          />
                          {state === 'error' && (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-center px-4">
                              <div>
                                <div className="text-sm font-semibold text-gray-800">{product.nombre}</div>
                                <div className="text-xs text-gray-500 mt-1">{product.capacidad || t('products.no_image')}</div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center px-4">
                          <div className="text-sm font-semibold text-gray-800">{product.nombre}</div>
                          <div className="text-xs text-gray-500 mt-1">{product.capacidad || t('products.no_image')}</div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 flex-1">
                      {/* Product Name */}
                      <h3 className="text-xs font-semibold text-gray-900 line-clamp-2">{product.nombre}</h3>

                      {/* Description */}
                      {product.descripcion && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{product.descripcion}</p>
                      )}

                      {/* Price */}
                      <div className="flex items-baseline gap-2 justify-center">
                        <span className="text-sm font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
                        {original !== finalPrice && (
                          <span className="text-xs text-gray-400 line-through">${original.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {product.categoria ?? (selectedCategoryIndex !== null ? categorias[selectedCategoryIndex].nombre : 'TODOS')}
                        </span>
                        {discountAmount > 0 && (
                          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            {discountPercent}% {t('products.discount_text')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-1 mt-12">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded border text-sm font-medium transition ${
                  currentPage === 1
                    ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
                    : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >«</button>

              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded border text-sm font-medium transition ${
                  currentPage === 1
                    ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
                    : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >‹</button>

              {renderPaginationButtons()}

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
                    : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >›</button>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? 'text-gray-300 border-gray-200 bg-white cursor-not-allowed'
                    : 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >»</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
