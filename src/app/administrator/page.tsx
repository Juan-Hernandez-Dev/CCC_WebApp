"use client";

import { useState } from "react";

export default function Administrator() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Ajusta cuántos productos se muestran por página

    const products = [
        { sku: "BOL-012", name: "Bolsa negra 60 x 90 cm (B60)", price: "$45.00", category: "BOLSAS", status: "Available", stock: 35 },
        { sku: "FER-005", name: "Afloja Todo 172ml GD05", price: "$43.00", category: "FERRETERIA", status: "Available", stock: 27 },
        { sku: "PER-030", name: "Agua Oxigenada 125ml PROESA", price: "$10.00", category: "PERFUMERIA", status: "Available", stock: 42 },
        { sku: "LIS-013", name: "Almorol 5 litros. (ALS)", price: "$280.00", category: "LIQ. 5 LITROS", status: "Available", stock: 30 },
        { sku: "ESC-001", name: "Bastón Capuchon Madera Venta (BCV)", price: "$17.00", category: "ESCOBAS", status: "Available", stock: 35 },
        { sku: "FIB-002", name: "Fibra acero chica 30g. (FA30)", price: "$5.00", category: "FIBRAS", status: "Restock Soon", stock: 4 },
        { sku: "LII-012", name: "FRUTAL Limpiador Multiusos 1 litro (FR1) LM1", price: "$15.00", category: "LIQ. 1 LITRO", status: "Available", stock: 39 },
        { sku: "JAR-003", name: "Atomizador 250ml (A250)", price: "$13.00", category: "JARCERIA", status: "Available", stock: 23 },
        { sku: "ARO-016", name: "Aromatizante CANELA 400ml", price: "$15.00", category: "AROMA", status: "Out of Stock", stock: 0 },
        { sku: "PAP-011", name: "Rollo papel JUMBO 360m", price: "$77.00", category: "PAPEL", status: "Available", stock: 37 },
    ];

    // PAGINACIÓN REAL
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexStart = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(indexStart, indexStart + itemsPerPage);

    return (
        <div className="p-6">
            {/* Hero section para Contact */}
            <section className="py-10 px-4 bg-white-full text-gray-900">
                <div className="max-w-8xl mx-auto text-left">
                    {/* Contenedor del encabezado pequeño y línea azul */}
                    <div className="p-4 flex items-center justify-left mb-4 space-x-2">
                        {/* Línea decorativa azul */}
                        <div className= "flex w-8 h-0.5 bg-blue-500"></div>

                        <span className="py-2 text-base font-medium text-gray-700">
                            Admin
                        </span>
                    </div>
                </div>
            </section>
            {/* TOP BAR */}
            <div className="flex flex-wrap items-center gap-6 mb-8">

                {/* Search bar */}
                <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm w-full max-w-sm">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                    </svg>
                    <input
                        className="focus:outline-none text-sm w-full"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filter Button */}
                <button className="bg-blue-500 text-white p-2 rounded-full shadow-md active:scale-95 transition">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 01.894 1.447L13 11.118V16a1 1 0 01-1.447.894l-2-1A1 1 0 019 15v-3.882L3.106 4.447A1 1 0 013 4z" />
                    </svg>
                </button>

                {/* Category Dropdown */}
                <button className="bg-white border rounded-full px-4 py-2 shadow-sm flex items-center gap-2 active:scale-95 transition">
                    <span className="text-sm text-gray-700">Category</span>
                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                    </svg>
                </button>

                {/* Status Dropdown */}
                <button className="bg-white border rounded-full px-4 py-2 shadow-sm flex items-center gap-2 active:scale-95 transition">
                    <span className="text-sm text-gray-700">Status</span>
                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                    </svg>
                </button>
            </div>

            {/* ADD PRODUCT */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow active:scale-95 transition mb-4">
                Add Product
            </button>

            {/* TITLE */}
            <h2 className="text-2xl font-semibold mb-3">All the Products</h2>

            {/* TABLE */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse">
                    <thead className="bg-blue-600 text-white text-sm">
                        <tr>
                            <th className="p-3 text-left">SKU</th>
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {displayedProducts.map((p, i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
                            >
                                <td className="p-3">{p.sku}</td>
                                <td className="p-3">{p.name}</td>
                                <td className="p-3">{p.price}</td>
                                <td className="p-3">{p.category}</td>

                                {/* STATUS */}
                                <td className="p-3">
                                    {p.status === "Available" && (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            ● Available
                                        </span>
                                    )}
                                    {p.status === "Restock Soon" && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                            ● Restock Soon
                                        </span>
                                    )}
                                    {p.status === "Out of Stock" && (
                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                            ● Out of Stock
                                        </span>
                                    )}
                                </td>

                                <td className="p-3">{p.stock}</td>

                                {/* ACTIONS */}
                                <td className="p-3 flex gap-2">
                                    {/* Edit */}
                                    <button className="bg-blue-500 text-white p-1 rounded active:scale-95 transition">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.39.242l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.242-.39l9.9-9.9a2 2 0 012.828 0z" />
                                        </svg>
                                    </button>

                                    {/* Delete */}
                                    <button className="bg-red-500 text-white p-1 rounded active:scale-95 transition">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8zm3-3h-1.5l-.354-.354A2 2 0 009.586 4H8.414a2 2 0 00-1.414.586L6.646 5H5a1 1 0 000 2h10a1 1 0 100-2z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    className="px-3 py-1 border rounded bg-white shadow active:scale-95 transition"
                    onClick={() => setCurrentPage(1)}
                >
                    &lt;&lt;
                </button>

                <button
                    className="px-3 py-1 border rounded bg-white shadow active:scale-95 transition"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                    &lt;
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-3 py-1 border rounded shadow active:scale-95 transition ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white"
                            }`}
                        onClick={() => setCurrentPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}

                <button
                    className="px-3 py-1 border rounded bg-white shadow active:scale-95 transition"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                    &gt;
                </button>

                <button
                    className="px-3 py-1 border rounded bg-white shadow active:scale-95 transition"
                    onClick={() => setCurrentPage(totalPages)}
                >
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}