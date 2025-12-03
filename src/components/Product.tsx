"use client";

import React, { useState, useRef, useEffect } from "react";
import productsData from "./products.json";

const PRODUCTS_PER_PAGE = 12; // 4 columns x 3 rows

const getProxyUrl = (url?: string) => (url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : undefined);

export default function ProductPage() {
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
    ? categorias.flatMap(cat => cat.productos)
    : categorias[selectedCategoryIndex].productos;

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
  }, [paginatedProducts, currentPage, selectedCategoryIndex]);

  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    pages.push(1);
    for (let i = 2; i <= 4 && i < totalPages - 4; i++) pages.push(i);
    let startMiddle = Math.max(5, currentPage - 1);
    let endMiddle = Math.min(totalPages - 4, currentPage + 1);
    if (startMiddle > 5) pages.push('...'); else if (startMiddle === 5) pages.push(5);
    for (let i = startMiddle; i <= endMiddle; i++) if (i > 4 && i < totalPages - 3) pages.push(i);
    if (endMiddle < totalPages - 4) pages.push('...'); else if (endMiddle === totalPages - 4) pages.push(totalPages - 4);
    for (let i = totalPages - 3; i <= totalPages; i++) if (i > 4) pages.push(i);
    const uniquePages = pages.filter((item, pos) => pages.indexOf(item) === pos);

    return uniquePages.map((page, idx) => {
      if (page === '...') return <span key={'ellipsis-' + idx} className="px-3 py-1 text-gray-500 select-none">...</span>;
      return (
        <button
          key={page}
          onClick={() => goToPage(page as number)}
          className={`px-3 py-1 rounded-md border border-gray-300 ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        >{page}</button>
      );
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col">
      <h1 className="text-2xl font-bold $color-text-body mb-6 border-b pb-3">Catálogo de Productos</h1>
      <div className="flex flex-col md:flex-row gap-x-8">
        <nav className="mb-6 md:mb-0 md:w-64">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <select
            className="w-full px-4 py-2 rounded border border-gray-300"
            value={selectedCategoryIndex !== null ? selectedCategoryIndex : ''}
            onChange={(e) => {
              const index = e.target.value === '' ? null : parseInt(e.target.value);
              handleCategorySelect(index);
            }}
          >
            <option value="">Todos</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={idx}>{cat.nombre}</option>
            ))}
          </select>
        </nav>

        <main className="flex-1">
          {paginatedProducts.length === 0 ? (
            <p className="text-gray-500">No hay productos para mostrar.</p>
          ) : (
            <>
                  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product, idx) => {
                  const key = product.imagen || `noimg-${idx}`;
                  const state = imageStates[key] || (product.imagen ? 'loading' : 'error');
                  const proxySrc = getProxyUrl(product.imagen);

                  return (
                    <div key={idx} className="group relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                        {product.imagen ? (
                          <>
                            <img
                              key={key}
                              data-image-key={key}
                              src={proxySrc}
                              alt={product.nombre}
                              loading="lazy"
                              decoding="async"
                              className={`w-full h-full object-contain`}
                              onLoad={() => onImgLoad(key)}
                              onError={() => onImgError(key)}
                            />

                            {state === 'error' && (
                              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <div className="text-gray-400 text-xs text-center px-2">Imagen no disponible</div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-gray-400 text-xs">Sin imagen</div>
                        )}

                      </div>

                      {/* Small non-blocking loading indicator */}
                      {state === 'loading' && (
                        <div className="mt-2 flex items-center" aria-hidden>
                          <span className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                          <span className="text-xs text-gray-500">Cargando imagen...</span>
                        </div>
                      )}

                      <div className="p-2 flex flex-col">
                        <span className="inline-block bg-blue-600 text-white text-xs font-semibold rounded-full px-2 py-0.5 mb-1 select-none truncate max-w-full">
                          {selectedCategoryIndex !== null ? categorias[selectedCategoryIndex].nombre : 'Todas'}
                        </span>
                        <h3 className="text-xs sm:text-sm font-semibold text-black text-left truncate">{product.nombre}</h3>
                        {product.capacidad && <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">{product.capacidad}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center items-center space-x-3 mt-8">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border border-gray-300 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >Anterior</button>

                {renderPaginationButtons()}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border border-gray-300 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >Siguiente</button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
