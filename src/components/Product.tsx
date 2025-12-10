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
  const gridRef = useRef<HTMLDivElement | null>(null);

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
  }, []);

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
  }, []);

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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-blue-500 rounded"></div>
            <h1 className="text-xl font-semibold text-gray-700">{t('products.catalog_title')}</h1>
          </div>

          {/* Category Selector */}
          <div className="w-full sm:w-48">
            <select
              className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold border-0 cursor-pointer hover:bg-blue-700 transition"
              value={selectedCategoryIndex !== null ? selectedCategoryIndex : ''}
              onChange={(e) => {
                const index = e.target.value === '' ? null : parseInt(e.target.value);
                handleCategorySelect(index);
              }}
            >
              <option value="">{t('products.all_categories')}</option>
              {categorias.map((cat, idx) => (
                <option key={idx} value={idx}>{cat.nombre}</option>
              ))}
            </select>
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
                      {/* Temporarily render text instead of images for clearer admin layout */}
                      <div className="text-center px-4">
                        <div className="text-sm font-semibold text-gray-800">{product.nombre}</div>
                        <div className="text-xs text-gray-500 mt-1">{product.capacidad || t('products.no_image')}</div>
                      </div>
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
