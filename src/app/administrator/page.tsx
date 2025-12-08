"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

// Componente de tabla de administración de productos
export default function Administrator() {
    const { t } = useTranslation('global');
    
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ajuste para mostrar más productos por página como en el diseño

    // Datos de productos (ejemplo)
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

        { sku: "VEN-008", name: "Laminitas RAID C/10B + Aparato Gratis (Veneno)", price: "$230.00", category: "VENENO", status: "Available", stock: 25 },
        { sku: "DES-009", name: "Bote negro CHICO con tapa balancin", price: "$110.00", category: "DESPACHADORES", status: "Available", stock: 40 },
        { sku: "LML-008", name: "Jabon para Manos UVA 500ml (UMU500) JM500", price: "$22.00", category: "LIQ. 500 ML", status: "Available", stock: 33 },
        { sku: "TRA-017", name: "Trapeador HILUX Blanco #24 BG (H24)", price: "$42.00", category: "TRAPEADORES BG", status: "Available", stock: 35 },
        { sku: "DUL-019", name: "Espuma para fiesta 270ml. GD05 FUNNY SNOW", price: "$20.00", category: "DULCERIA", status: "Available", stock: 46 },
    ];

    // Lógica de PAGINACIÓN
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexStart = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(indexStart, indexStart + itemsPerPage);

    // Función auxiliar para el ícono de estado
    const statusIcon = (status: string) => {
        let colorClass = "";
        let text = "";
        switch (status) {
            case "Available":
                colorClass = "text-green-500";
                text = "Available";
                break;
            case "Restock Soon":
                colorClass = "text-yellow-500";
                text = "Restock Soon";
                break;
            case "Out of Stock":
                colorClass = "text-red-500";
                text = "Out of Stock";
                break;
            default:
                colorClass = "text-gray-500";
                text = status;
        }
        return (
            <div className="flex items-center">
                <span className={`text-xl leading-none ${colorClass}`}>
                    •
                </span>
                <span className={`ml-1 text-xs font-medium ${colorClass.replace('-500', '-700')}`}>
                    {text}
                </span>
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Contenedor principal con ancho limitado y centrado  */}
            <div className="p-6 max-w-7xl mx-auto">

                {/* Encabezado Admin */}
                <section className="py-4 text-gray-900">
                    <div className="text-left">
                        {/* Línea decorativa y texto */}
                        <div className="flex items-center mb-6 space-x-2">
                            <div className="flex w-6 h-0.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-600">{t('admin.section_label')}</span>
                        </div>
                    </div>
                </section>

                {/* TOP BAR: Barra de búsqueda, Filtros y Botón de Añadir */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    {/* Contenedor de Búsqueda y Filtros */}
                    <div className="flex flex-wrap items-center gap-4">

                        <div className="flex items-center w-full sm:w-80">

                            {/* Contenedor de búsqueda */}
                            <div className="flex items-center bg-white border border-gray-300 rounded-l-lg px-3 py-2 shadow-sm w-full">
                                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                                </svg>

                                <input
                                    className="focus:outline-none text-sm w-full"
                                    placeholder={t('admin.search_placeholder')}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Botón de filtro pegado al borde derecho */}
                            <button className="bg-blue-400 hover:bg-blue-900 text-white px-4 py-2 border border-blue-400 rounded-r-lg shadow-sm active:scale-95 transition">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 01.894 1.447L13 11.118V16a1 1 0 01-1.447.894l-2-1A1 1 0 019 15v-3.882L3.106 4.447A1 1 0 013 4z" />
                                </svg>
                            </button>
                        </div>



                        {/* Category Dropdown */}
                        <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2 active:scale-95 transition hover:bg-gray-100">
                            <span className="text-sm text-gray-700">{t('admin.category_filter')}</span>
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                            </svg>
                        </button>

                        {/* Status Dropdown */}
                        <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2 active:scale-95 transition hover:bg-gray-100">
                            <span className="text-sm text-gray-700">{t('admin.status_filter')}</span>
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ADD PRODUCT Button */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md active:scale-95 transition mb-6">
                    {t('admin.add_product_btn')}
                </button>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('admin.products_title')}</h2>

                {/* TABLE - SIN LÍNEAS DIVISORIAS Y FILAS ALTERNADAS */}
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y-0">
                        {/* Encabezado con fondo azul */}
                        <thead className="bg-blue-600 text-white text-sm font-medium tracking-wider">
                            <tr>
                                <th className="p-3 text-left">{t('admin.table.sku')}</th>
                                <th className="p-3 text-left">{t('admin.table.product')}</th>
                                <th className="p-3 text-left">{t('admin.table.price')}</th>
                                <th className="p-3 text-left">{t('admin.table.category')}</th>
                                <th className="p-3 text-left">{t('admin.table.status')}</th>
                                <th className="p-3 text-left">{t('admin.table.stock')}</th>
                                <th className="p-3 text-left">{t('admin.table.actions')}</th>
                            </tr>
                        </thead>

                        {/* Cuerpo de la tabla */}
                        <tbody className="bg-white divide-y-0 text-sm text-gray-700">
                            {displayedProducts.map((p, i) => (
                                <tr
                                    key={i}
                                    // Filas alternadas para diferenciar sin usar bordes
                                    className={`${i % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-150`}
                                >
                                    <td className="p-3 whitespace-nowrap">{p.sku}</td>
                                    <td className="p-3 whitespace-nowrap font-medium text-gray-900">{p.name}</td>
                                    <td className="p-3 whitespace-nowrap">{p.price}</td>
                                    <td className="p-3 whitespace-nowrap text-gray-600">{p.category}</td>

                                    {/* STATUS (Usando el componente de icono) */}
                                    <td className="p-3 whitespace-nowrap">
                                        {statusIcon(p.status)}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">{p.stock}</td>

                                    {/* ACTIONS */}
                                    <td className="p-3 flex gap-2">
                                        {/* Edit Button */}
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md shadow-sm active:scale-95 transition flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.39.242l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.242-.39l9.9-9.9a2 2 0 012.828 0z" />
                                            </svg>
                                        </button>

                                        {/* Delete Button */}
                                        <button className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md shadow-sm active:scale-95 transition flex items-center justify-center">
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

                {/* PAGINATION - Corrección del error de sintaxis usando literales de texto JSX */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded-lg bg-white shadow-sm active:scale-95 transition text-gray-600 hover:bg-gray-100"
                        onClick={() => setCurrentPage(1)}
                    >
                        {'<<'}
                    </button>

                    <button
                        className="px-3 py-1 border border-gray-300 rounded-lg bg-white shadow-sm active:scale-95 transition text-gray-600 hover:bg-gray-100"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                        {'<'}
                    </button>

                    {/* Botones de página */}
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`px-3 py-1 border rounded-lg shadow-sm font-medium active:scale-95 transition ${currentPage === idx + 1 ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                            onClick={() => setCurrentPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 border border-gray-300 rounded-lg bg-white shadow-sm active:scale-95 transition text-gray-600 hover:bg-gray-100"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                        {'>'}
                    </button>

                    <button
                        className="px-3 py-1 border border-gray-300 rounded-lg bg-white shadow-sm active:scale-95 transition text-gray-600 hover:bg-gray-100"
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    );
}