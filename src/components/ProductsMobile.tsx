"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import data from "../../products1.json";

type Producto = {
  nombre: string;
  capacidad?: string;
  clave?: string;
  grupo?: string;
  imagen?: string;
};

export default function ProductsMobile() {
  const categorias = useMemo(() => data.categorias.map((c) => c.nombre), []);
  const [selectedCategoria, setSelectedCategoria] = useState<string>(categorias[0] ?? "ALL");
  const [page, setPage] = useState(1);
  const [showPageMenu, setShowPageMenu] = useState(false);
  const PAGE_SIZE = 12;

  // cierra el menú si se selecciona una página (evita que queden "..." duplicados)
  useEffect(() => {
    if (showPageMenu) setShowPageMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
          return (
            <article
              key={`${p.nombre}-${idx}`}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 flex gap-3 sm:gap-4 active:bg-gray-50 transition-colors"
            >
              {/* imagen */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
                {/* {p.imagen ? (
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // colocar placeholder en /public/images/placeholder-product.png
                      (e.currentTarget as HTMLImageElement).src = "/images/placeholder-product.png";
                    }}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src="/images/placeholder-product.png"
                    alt="placeholder"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                )} */}
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