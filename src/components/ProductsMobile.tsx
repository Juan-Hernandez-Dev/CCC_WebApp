"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import data from "./products.json";

type Producto = {
  nombre: string;
  capacidad?: string;
  clave?: string;
  grupo?: string;
  imagen?: string;
  descripcion?: string;
  precioDescuento?: number;
  precioOriginal?: number;
  enDescuento?: boolean;
  descuento?: number;
  categoria?: string;
};

type ProductImageState = {
  [key: string]: 'loading' | 'loaded' | 'error';
};

const getProxyUrl = (url?: string) => (url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : undefined);

export default function ProductsMobile() {
  const categorias = useMemo(() => data.categorias.map((c) => c.nombre), []);
  const [selectedCategoria, setSelectedCategoria] = useState<string>(categorias[0] ?? "ALL");
  const [page, setPage] = useState(1);
  const [showPageMenu, setShowPageMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [imageStates, setImageStates] = useState<ProductImageState>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 12;

  // Productos filtrados por categoría seleccionada
  const allProducts: Producto[] = useMemo(() => {
    return data.categorias.flatMap((c) => (c.productos || []).map(p => ({ ...p, categoria: c.nombre })));
  }, []);

  const productsByCategory: Producto[] = useMemo(() => {
    if (!selectedCategoria || selectedCategoria === "ALL") return allProducts;
    const cat = data.categorias.find((c) => c.nombre === selectedCategoria);
    return cat ? (cat.productos || []) : [];
  }, [selectedCategoria, allProducts]);

  const pageCount = Math.max(1, Math.ceil(productsByCategory.length / PAGE_SIZE));

  // Ensure page stays within range when pageCount changes
  useEffect(() => {
    if (page > pageCount) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mostrar todos si showAll es true, sino paginar normalmente (memoized)
  const visibleProducts = useMemo(() => {
    return showAll ? productsByCategory : productsByCategory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [showAll, productsByCategory, page]);

  // cierra el menú si se selecciona una página (evita que queden "..." duplicados)
  useEffect(() => {
    if (showPageMenu) setShowPageMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize image states for current products on page/category change
  useEffect(() => {
    const newStates: ProductImageState = {};
    visibleProducts.forEach((p, idx) => {
      const imageKey = p.imagen || `noimg-${idx}`;
      newStates[imageKey] = p.imagen ? 'loading' : 'error';
    });
    setImageStates(newStates);
  }, [visibleProducts]);

  // Detect images that have already loaded (e.g., from cache) and update state
  useEffect(() => {
    if (!listRef.current) return;
    const imgs = Array.from(listRef.current.querySelectorAll('img[data-image-key]')) as HTMLImageElement[];
    imgs.forEach((img) => {
      const key = img.dataset.imageKey ?? '';
      if (!key) return;
      if (img.complete) {
        if (img.naturalWidth && img.naturalWidth > 0) {
          setImageStates(prev => ({ ...prev, [key]: 'loaded' }));
        } else {
          setImageStates(prev => ({ ...prev, [key]: 'error' }));
        }
      }
    });
  }, [visibleProducts]);

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
    <div className="px-2 sm:px-4 py-4 bg-gray-50 min-h-screen">
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
                setShowAll(false); // volver a paginado al cambiar categoría
              }}
              className="appearance-none bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md pr-8 shadow-sm min-h-[44px] w-full"
              aria-label="Seleccionar categoría"
            >
              <option value="ALL">Todos</option>
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
          const fallback = computePrice(p.nombre);
          const imageKey = p.imagen || `noimg-${idx}`;
          const original = p.precioOriginal ?? fallback;
          const discountAmount = (p as any).descuento ?? 0;
          const finalPrice = discountAmount > 0 ? Math.max(0, original - discountAmount) : original;
          const discountPercent = discountAmount > 0 && original > 0 ? Math.round((discountAmount / original) * 100) : 0;

          return (
            <article
              key={`${p.nombre}-${idx}`}
              className="h-32 max-h-32 bg-white rounded-lg p-3 sm:p-4 flex gap-3 sm:gap-4 shadow-sm border border-gray-100 transition-shadow hover:shadow-md overflow-hidden"
            >
              {/* imagen */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative border border-gray-200"
                style={{
                  backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
                  backgroundSize: '12px 12px'
                }}
              >
                {p.imagen ? (
                  <>
                    <img
                      key={imageKey}
                      data-image-key={imageKey}
                      src={getProxyUrl(p.imagen)}
                      alt={p.nombre}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-contain`}
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

              {/* Non-blocking loading indicator for mobile list */}
              {imageStates[imageKey] === 'loading' && (
                <div className="mt-1">
                  <span className="inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" aria-hidden />
                </div>
              )}

              {/* contenido */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">{p.nombre}</h3>
                
                {p.descripcion && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1 sm:line-clamp-2">{p.descripcion}</p>
                )}

                <div className="flex flex-col items-center justify-center gap-1 mt-2 sm:mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-bold text-blue-600">${finalPrice.toFixed(2)}</span>
                    {original !== finalPrice && (
                      <span className="text-xs text-gray-400 line-through">${original.toFixed(2)}</span>
                    )}
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex flex-col gap-1 w-full items-center">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {p.categoria ?? selectedCategoria}
                      </span>
                      <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {discountPercent}% Descuento
                      </span>
                    </div>
                  )}
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
                  onClick={() => {
                    setShowAll(false);
                    setPage(num);
                  }}
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

            {/* Botón para ver todos / volver al paginado */}
            <div className="p-2 border-b">
              <button
                onClick={() => {
                  setShowAll((s) => !s);
                  setPage(1);
                  setShowPageMenu(false);
                }}
                className="w-full py-2 rounded text-sm bg-white border border-gray-200"
              >
                {showAll ? "Usar paginado" : "Ver todos"}
              </button>
            </div>

            <div className="p-2 grid grid-cols-3 gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={`menu-page-${pNum}`}
                  onClick={() => {
                    setPage(pNum);
                    setShowAll(false);
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
    </div>
  );
}
