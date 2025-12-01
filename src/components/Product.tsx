'use client';

import React, { useState, useEffect, useRef } from 'react';
import productsData from './products.json';
import Image from 'next/image';

type ProductImageState = {
  [key: string]: 'loading' | 'loaded' | 'error';
};

interface CacheEntry {
  timestamp: number;
  status: 'loaded' | 'error';
}

const CACHE_KEY = 'product_images_cache';

// Inicializar caché
const getImageCache = (): Record<string, CacheEntry> => {
  if (typeof window === 'undefined') return {};
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveImageCache = (cache: Record<string, CacheEntry>) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Silenciosamente ignorar errores de localStorage
  }
};

// Función para optimizar URL de Google Fotos con fallbacks
const optimizeGooglePhotosUrl = (url: string, attempt: number = 0): string => {
  // Intento 0: w400-h400 (sin aspectratio)
  // Intento 1: w600-h600 (resolución más alta)
  // Intento 2: URL original sin cambios
  
  if (attempt === 0) {
    return url.replace(/=s\d+/, '=w400-h400');
  } else if (attempt === 1) {
    return url.replace(/=s\d+/, '=w600-h600');
  } else {
    // Fallback: URL original pero con tamaño más grande
    return url.replace(/=s\d+/, '=s800');
  }
};

export default function ProductPage() {
  const categorias = productsData.categorias;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageStates, setImageStates] = useState<ProductImageState>({});
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const imageCacheRef = useRef<Record<string, CacheEntry>>(getImageCache());
  const pendingLoadsRef = useRef<Set<string>>(new Set());
  const retryCountRef = useRef<Map<string, number>>(new Map());
  const retryTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const PRODUCTS_PER_PAGE = 12; // 4 columns x 3 rows

  const handleCategorySelect = (index: number | null) => {
    setSelectedCategoryIndex(index);
    setCurrentPage(1); // reset pagination
  };

  let displayedProducts = selectedCategoryIndex === null
    ? categorias.flatMap(cat => cat.productos)
    : categorias[selectedCategoryIndex].productos;

  const totalPages = Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = displayedProducts.slice(startIndex, endIndex);

  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Función para cargar imagen con reintentos infinitos (delays largos)
  const loadImage = (imageUrl: string, retryCount = 0) => {
    // Verificar si ya está en caché
    const cached = imageCacheRef.current[imageUrl];
    if (cached && cached.status === 'loaded') {
      setImageStates(prev => ({
        ...prev,
        [imageUrl]: 'loaded'
      }));
      return;
    }

    // Evitar cargas duplicadas simultáneas
    if (pendingLoadsRef.current.has(imageUrl)) return;
    pendingLoadsRef.current.add(imageUrl);

    setImageStates(prev => ({
      ...prev,
      [imageUrl]: 'loading'
    }));

    const img = new window.Image();
    
    img.onload = () => {
      // Guardar en caché
      imageCacheRef.current[imageUrl] = {
        timestamp: Date.now(),
        status: 'loaded'
      };
      saveImageCache(imageCacheRef.current);

      setImageStates(prev => ({
        ...prev,
        [imageUrl]: 'loaded'
      }));
      
      pendingLoadsRef.current.delete(imageUrl);
      retryCountRef.current.delete(imageUrl);
    };
    
    img.onerror = () => {
      pendingLoadsRef.current.delete(imageUrl);
      
      const newRetryCount = (retryCountRef.current.get(imageUrl) || 0) + 1;
      retryCountRef.current.set(imageUrl, newRetryCount);
      
      // Cambiar formato de URL cada 5 intentos (más espaciado)
      const urlAttempt = Math.floor((newRetryCount - 1) / 5);
      
      // Delays mucho más largos para evitar 429
      let delayMs: number;
      if (newRetryCount <= 1) {
        delayMs = 10000; // 10 segundos primer reintento
      } else if (newRetryCount <= 3) {
        delayMs = 15000; // 15 segundos
      } else if (newRetryCount <= 6) {
        delayMs = 20000; // 20 segundos
      } else {
        delayMs = 30000; // 30 segundos para reintentos posteriores
      }
      
      // Agregar jitter aleatorio (±5 segundos) para evitar sincronización
      const jitter = Math.random() * 10000 - 5000;
      delayMs = Math.max(5000, delayMs + jitter); // Mínimo 5 segundos
      
      // Limpiar timeout anterior si existe
      const oldTimeout = retryTimeoutsRef.current.get(imageUrl);
      if (oldTimeout) clearTimeout(oldTimeout);
      
      // Programar reintento infinito
      const newTimeout = setTimeout(() => {
        loadImage(imageUrl, newRetryCount);
      }, delayMs);
      
      retryTimeoutsRef.current.set(imageUrl, newTimeout);
      
      // Mantener estado en "loading" indefinidamente
      setImageStates(prev => ({
        ...prev,
        [imageUrl]: 'loading'
      }));
    };
    
    // Usar URL optimizada con fallbacks
    const urlAttempt = Math.floor((retryCount) / 5);
    img.src = optimizeGooglePhotosUrl(imageUrl, urlAttempt);
  };

  // Usar Intersection Observer para lazy loading verdadero
  useEffect(() => {
    intersectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageUrl = entry.target.getAttribute('data-image-url');
            if (imageUrl) {
              loadImage(imageUrl);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      // Limpiar todos los timeouts de reintentos al desmontar
      retryTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      retryTimeoutsRef.current.clear();
    };
  }, []);

  // Custom pagination: show first 4, last 4 pages plus pages around current with ellipsis
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];

    // Always include first page
    pages.push(1);

    // Add pages 2-4 if totalPages allow
    for (let i = 2; i <= 4 && i < totalPages - 4; i++) {
      pages.push(i);
    }

    // Calculate middle pages around currentPage
    let startMiddle = Math.max(5, currentPage - 1);
    let endMiddle = Math.min(totalPages - 4, currentPage + 1);

    if (startMiddle > 5) {
      pages.push('...');
    } else if (startMiddle === 5) {
      pages.push(5);
    }

    for (let i = startMiddle; i <= endMiddle; i++) {
      if (i > 4 && i < totalPages - 3) pages.push(i);
    }

    if (endMiddle < totalPages - 4) {
      pages.push('...');
    } else if (endMiddle === totalPages - 4) {
      pages.push(totalPages - 4);
    }

    // Last 4 pages
    for (let i = totalPages - 3; i <= totalPages; i++) {
      if (i > 4) pages.push(i);
    }

    // Remove duplicates and preserve order
    const uniquePages = pages.filter((item, pos) => pages.indexOf(item) === pos);

    return uniquePages.map((page, idx) => {
      if (page === '...') {
        return (
          <span key={'ellipsis-' + idx} className="px-3 py-1 text-gray-500 select-none">
            ...
          </span>
        );
      }
      return (
        <button
          key={page}
          onClick={() => goToPage(page as number)}
          className={`px-3 py-1 rounded-md border border-gray-300 ${
            currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
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
              <option key={idx} value={idx}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </nav>

        <main className="flex-1">
          {paginatedProducts.length === 0 ? (
            <p className="text-gray-500">No hay productos para mostrar.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product, idx) => {
                  const imageKey = product.imagen;
                  const imageState = imageKey ? imageStates[imageKey] : 'error';
                  
                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <div 
                        className="aspect-[3/2] w-full overflow-hidden bg-gray-100 flex items-center justify-center relative"
                        ref={(el) => {
                          if (el && product.imagen && intersectionObserverRef.current) {
                            el.setAttribute('data-image-url', product.imagen);
                            intersectionObserverRef.current.observe(el);
                          }
                        }}
                      >
                        {product.imagen ? (
                          <>
                            {imageState === 'loading' && (
                              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Cargando...</span>
                              </div>
                            )}
                            <img
                              src={optimizeGooglePhotosUrl(product.imagen)}
                              alt={product.nombre}
                              className={`w-full h-full object-contain transition-opacity duration-300 ${
                                imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                              }`}
                              onLoad={() => {
                                if (imageKey) {
                                  setImageStates(prev => ({
                                    ...prev,
                                    [imageKey]: 'loaded'
                                  }));
                                }
                              }}
                              onError={() => {
                                if (imageKey) {
                                  setImageStates(prev => ({
                                    ...prev,
                                    [imageKey]: 'error'
                                  }));
                                }
                              }}
                            />
                            {imageState === 'error' && (
                              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                <div className="text-gray-400 text-xs text-center px-2">Imagen no disponible</div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-gray-400 text-xs">Sin imagen</div>
                        )}
                      </div>
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
                  className={`px-3 py-1 rounded-md border border-gray-300 ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Anterior
                </button>

                {renderPaginationButtons()}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border border-gray-300 ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
