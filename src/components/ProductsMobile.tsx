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
};

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

export default function ProductsMobile() {
  const categorias = useMemo(() => data.categorias.map((c) => c.nombre), []);
  const [selectedCategoria, setSelectedCategoria] = useState<string>(categorias[0] ?? "ALL");
  const [page, setPage] = useState(1);
  const [showPageMenu, setShowPageMenu] = useState(false);
  const [imageStates, setImageStates] = useState<ProductImageState>({});
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const imageCacheRef = useRef<Record<string, CacheEntry>>(getImageCache());
  const pendingLoadsRef = useRef<Set<string>>(new Set());
  const retryCountRef = useRef<Map<string, number>>(new Map());
  const retryTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const PAGE_SIZE = 12;

  // Productos filtrados por categoría seleccionada
  const allProducts: Producto[] = useMemo(() => {
    return data.categorias.flatMap((c) => c.productos || []);
  }, []);

  const productsByCategory: Producto[] = useMemo(() => {
    if (!selectedCategoria || selectedCategoria === "ALL") return allProducts;
    const cat = data.categorias.find((c) => c.nombre === selectedCategoria);
    return cat ? (cat.productos || []) : [];
  }, [selectedCategoria, allProducts]);

  const pageCount = Math.max(1, Math.ceil(productsByCategory.length / PAGE_SIZE));
  if (page > pageCount) setPage(1);

  const visibleProducts = productsByCategory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // cierra el menú si se selecciona una página (evita que queden "..." duplicados)
  useEffect(() => {
    if (showPageMenu) setShowPageMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Función para cargar imagen con reintentos infinitos (delays largos)
  const loadImage = (imageUrl: string, retryCount = 0) => {
    // Verificar si ya está en caché
    const cached = imageCacheRef.current[imageUrl];
    if (cached && cached.status === 'loaded') {
      setImageStates(prev => ({
        ...prev,
        [imageUrl]: cached.status
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

  // Precio determinístico basado en nombre (evita Math.random para SSR/CSR mismatch)
  const computePrice = (nombre?: string) => {
    if (!nombre) return 25;
    const sum = Array.from(nombre).reduce((s, ch) => s + ch.charCodeAt(0), 0);
    return (sum % 90) + 10;
  };

  // Helpers para paginación
  const goFirst = () => setPage(1);
  const goLast = () => setPage(pageCount);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(pageCount, p + 1));

  return (
    <section className="px-2 sm:px-4 py-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 pt-8">
        {/* Contenedor del encabezado pequeño y línea azul */}
        <div className="flex items-center justify-left mb-6 space-x-2">
          {/* Línea decorativa azul */}
          <div className="w-6 h-0.5 bg-blue-500"></div>

          <h2 className="text-sm sm:text-base font-semibold text-gray-700">Catálogo Completo</h2>
        </div>

        {/* Category selector */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xs">
            <select
              value={selectedCategoria}
              onChange={(e) => {
                setSelectedCategoria(e.target.value);
                setPage(1);
              }}
              className="appearance-none bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md pr-8 shadow-sm min-h-[44px] w-full"
              aria-label="Seleccionar categoría"
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white text-xs sm:text-sm">
              ▾
            </span>
          </div>
        </div>
      </div>

      {/* Lista de productos (cards) */}
      <div className="space-y-3 sm:space-y-4">
        {visibleProducts.map((p, idx) => {
          const price = computePrice(p.nombre);
          const imageKey = p.imagen || '';
          return (
            <article
              key={`${p.nombre}-${idx}`}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 flex gap-3 sm:gap-4 active:bg-gray-50 transition-colors"
            >
              {/* imagen */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0 relative"
                ref={(el) => {
                  if (el && p.imagen && intersectionObserverRef.current) {
                    el.setAttribute('data-image-url', p.imagen);
                    intersectionObserverRef.current.observe(el);
                  }
                }}
              >
                {p.imagen ? (
                  <>
                    {imageStates[imageKey] === 'loading' && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-400 text-xs">...</span>
                      </div>
                    )}
                    <img
                      src={optimizeGooglePhotosUrl(p.imagen)}
                      alt={p.nombre}
                      className={`w-full h-full object-contain transition-opacity duration-300 ${
                        imageStates[imageKey] === 'loaded' ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => {
                        setImageStates(prev => ({
                          ...prev,
                          [imageKey]: 'loaded'
                        }));
                      }}
                      onError={() => {
                        setImageStates(prev => ({
                          ...prev,
                          [imageKey]: 'error'
                        }));
                      }}
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

              {/* contenido */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 truncate">{p.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 sm:line-clamp-3">
                  {p.capacidad ? `${p.capacidad} • ` : ""}
                  {p.clave ? `Clave: ${p.clave} • ` : ""}
                  {p.grupo ? `Grupo: ${p.grupo}` : ""}
                </p>

                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {p.grupo ?? "CAT"}
                    </span>
                    <span className="inline-block bg-orange-100 text-orange-700 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      20% Descuento
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-400 line-through">${(price + 8).toFixed(0)}</div>
                    <div className="text-base sm:text-lg font-bold text-blue-600">${price.toFixed(0)}</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* cuando no hay productos */}
        {visibleProducts.length === 0 && (
          <div className="py-8 text-center text-gray-500 text-sm sm:text-base">No hay productos en esta categoría.</div>
        )}
      </div>

      {/* Paginación: items únicos + ellipsis dinámico sin duplicados (hueco=2 muestra el número intermedio) */}
      <div className="mt-6 relative flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={goFirst}
          disabled={page === 1}
          className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 min-h-[44px] active:bg-gray-50"
          title="Ir a la primera página"
        >
          &#x00AB;
        </button>

        <button
          onClick={goPrev}
          disabled={page === 1}
          className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 min-h-[44px] active:bg-gray-50"
          title="Regresar página"
        >
          &#x2039;
        </button>

        {(() => {
          const last = pageCount;
          const pagesSet = new Set<number>();

          // páginas relevantes
          pagesSet.add(1);
          if (last > 1) pagesSet.add(last);
          if (page > 1 && page < last) pagesSet.add(page);
          if (page - 1 > 1) pagesSet.add(page - 1);
          if (page + 1 < last) pagesSet.add(page + 1);

          const sorted = Array.from(pagesSet).sort((a, b) => a - b);

          // construir lista final insertando número intermedio cuando gap === 2
          const items: (number | "ellipsis")[] = [];
          for (let i = 0; i < sorted.length; i++) {
            const cur = sorted[i];
            items.push(cur);
            const next = sorted[i + 1];
            if (next !== undefined) {
              const gap = next - cur;
              if (gap === 2) {
                items.push(cur + 1);
              } else if (gap > 2) {
                items.push("ellipsis");
              }
            }
          }

          return items.map((it, idx) => {
            if (it === "ellipsis") {
              return (
                <button
                  key={`ellipsis-${idx}`}
                  onClick={() => setShowPageMenu(true)}
                  className="px-3 py-2 rounded border border-gray-200 bg-white text-sm text-gray-400 min-h-[44px] active:bg-gray-50"
                  aria-label="Mostrar menú de páginas"
                  title="Mostrar menú de páginas"
                >
                  ...
                </button>
              );
            } else {
              const num = it as number;
              const isActive = num === page;
              return (
                <button
                  key={`page-${num}-${idx}`}
                  onClick={() => setPage(num)}
                  className={`px-3 py-2 rounded text-sm min-h-[44px] ${isActive ? "bg-blue-600 text-white" : "bg-white border border-gray-200"}`}
                >
                  {num}
                </button>
              );
            }
          });
        })()}

        <button
          onClick={goNext}
          disabled={page === pageCount}
          className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 min-h-[44px] active:bg-gray-50"
          title="Siguiente página"
        >
          &#x203A;
        </button>

        <button
          onClick={goLast}
          disabled={page === pageCount}
          className="px-3 py-2 rounded border border-gray-200 bg-white text-sm disabled:opacity-50 min-h-[44px] active:bg-gray-50"
          title="Ir a la última página"
        >
          &#x00BB;
        </button>

        {/* menú desplegable asociado a '...' */}
        {showPageMenu && (
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-20">
            <div className="px-3 py-2 border-b border-gray-100 text-xs text-gray-600">Seleccionar página</div>
            <div className="p-2 grid grid-cols-3 gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={`menu-page-${pNum}`}
                  onClick={() => {
                    setPage(pNum);
                    setShowPageMenu(false);
                  }}
                  className={`py-2 rounded text-sm ${pNum === page ? "bg-blue-600 text-white" : "bg-white border border-gray-200"}`}
                >
                  {pNum}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}