'use client';


import React, { useState } from 'react';
import Image from 'next/image';
import productsData from '../products.json';

interface Product {
  nombre: string;
  capacidad?: string;
  imageUrl?: string;
}

interface Categoria {
  nombre: string;
  productos: Product[];
}

export default function ProductPage() {
  const categorias: Categoria[] = productsData.categorias;

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 12; // 4 columns x 3 rows

  // Handler to select category
  const handleCategorySelect = (index: number | null) => {
    setSelectedCategoryIndex(index);
    setCurrentPage(1); // reset pagination
  };

  // Get products to display based on selected category
  let displayedProducts: Product[] = [];

  if (selectedCategoryIndex === null) {
    // Show all products from all categories
    displayedProducts = categorias.flatMap(cat => cat.productos);
  } else {
    displayedProducts = categorias[selectedCategoryIndex].productos;
  }

  // Pagination logic
  const totalPages = Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = displayedProducts.slice(startIndex, endIndex);

  // Pagination control handlers
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Catálogo de Productos</h1>

      <div className="flex flex-col md:flex-row gap-x-8">
        {/* Catalog menu */}
        <nav className="mb-6 md:mb-0 md:w-64">
          <h2 className="text-xl font-semibold mb-4">Categorías</h2>
          <select
            className="w-full px-4 py-2 rounded border border-gray-300"
            value={selectedCategoryIndex !== null ? selectedCategoryIndex : ''}
            onChange={(e) => {
              const index = e.target.value === '' ? null : parseInt(e.target.value);
              handleCategorySelect(index === null ? null : index);
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

        {/* Products */}
        <main className="flex-1">
          {paginatedProducts.length === 0 ? (
            <p className="text-gray-500">No hay productos para mostrar.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100 bg-dots flex items-center justify-center relative">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.nombre}
                          fill
                          className="object-contain"
                          unoptimized
                        />
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
                ))}
              </div>

              {/* Pagination Controls */}
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

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 rounded-md border border-gray-300 ${
                        currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

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
