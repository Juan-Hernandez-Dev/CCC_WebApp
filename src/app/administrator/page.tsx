"use client";

import { useState, useEffect } from "react";

// Componente de tabla de administración de productos
export default function Administrator() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ajuste para mostrar más productos por página como en el diseño
    const [mostrarForm, setMostrarForm] = useState(false);
    const [formNombre, setFormNombre] = useState("");
    const [formImagen, setFormImagen] = useState("");
    const [formCapacidad, setFormCapacidad] = useState("");
    const [formDescripcion, setFormDescripcion] = useState("");
    const [formPrecioOriginal, setFormPrecioOriginal] = useState(0);
    const [formDescuento, setFormDescuento] = useState(0);
    const [formEnDescuento, setFormEnDescuento] = useState(false);
    const [formCategoryName, setFormCategoryName] = useState("");
    const [formMessage, setFormMessage] = useState<string | null>(null);
    const [editingOriginalNombre, setEditingOriginalNombre] = useState<string | null>(null);

    // Productos cargados desde JSON via API
    const [products, setProducts] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            // Transformar en lista plana con campo category
            const list: Array<any> = [];
            if (data?.categorias && Array.isArray(data.categorias)) {
                for (const c of data.categorias) {
                    if (Array.isArray(c.productos)) {
                        for (const p of c.productos) {
                            list.push({ ...p, category: c.nombre });
                        }
                    }
                }
            }
            setProducts(list);
        } catch (err) {
            console.error('Failed to load products', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Cargar productos al montar
    useEffect(() => {
        loadProducts();
    }, []);

    // Abrir modal en modo edición con datos del producto
    const openEdit = (p: any) => {
        setFormNombre(p.nombre || '');
        setFormImagen(p.imagen || '');
        setFormCapacidad(p.capacidad || '');
        setFormDescripcion(p.descripcion || '');
        setFormPrecioOriginal(Number(p.precioOriginal ?? 0));
        setFormDescuento(Number(p.descuento ?? 0));
        setFormEnDescuento(Boolean(p.enDescuento));
        setFormCategoryName(p.category || '');
        setEditingOriginalNombre(p.nombre || null);
        setMostrarForm(true);
    };

    // Lógica de PAGINACIÓN
    // Filtrar por búsqueda
    const filtered = products.filter((p) =>
        (p.nombre || p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.descripcion || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const indexStart = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filtered.slice(indexStart, indexStart + itemsPerPage);

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
                            <span className="text-sm font-medium text-gray-600">Admin</span>
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
                                    placeholder="Search"
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
                            <span className="text-sm text-gray-700">Category</span>
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                            </svg>
                        </button>

                        {/* Status Dropdown */}
                        <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm flex items-center gap-2 active:scale-95 transition hover:bg-gray-100">
                            <span className="text-sm text-gray-700">Status</span>
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
                            </svg>
                        </button>
                    </div>
                </div>

            {/* ADD PRODUCT Button */}
            <button
                onClick={() => setMostrarForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow-md active:scale-95 transition mb-6"
            >
                Add Product
            </button>

            {/* MODAL */}
            {mostrarForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    
                    {/* Caja del modal */}
                    <div className="bg-white p-6 rounded-xl w-96 shadow-lg space-y-3 relative">

                        {/* Botón cerrar */}
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={() => setMostrarForm(false)}
                        >
                            ✕
                        </button>

                    
                        {/* Formulario controlado para enviar al JSON */}
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={formNombre}
                            onChange={(e) => setFormNombre(e.target.value)}
                            className="block w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Imagen (URL)"
                            value={formImagen}
                            onChange={(e) => setFormImagen(e.target.value)}
                            className="block w-full border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Capacidad (ej. 250ml)"
                            value={formCapacidad}
                            onChange={(e) => setFormCapacidad(e.target.value)}
                            className="block w-full border p-2 rounded"
                        />

                        <textarea
                            placeholder="Descripción"
                            value={formDescripcion}
                            onChange={(e) => setFormDescripcion(e.target.value)}
                            className="block w-full border p-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Precio Original"
                            min="0"
                            step="0.01"
                            value={formPrecioOriginal}
                            onChange={(e) => setFormPrecioOriginal(Number(e.target.value))}
                            className="block w-full border p-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Descuento"
                            min="0"
                            step="0.01"
                            value={formDescuento}
                            onChange={(e) => setFormDescuento(Number(e.target.value))}
                            className="block w-full border p-2 rounded"
                        />

                        <label className="inline-flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formEnDescuento}
                                onChange={(e) => setFormEnDescuento(e.target.checked)}
                            />
                            <span className="text-sm">En Descuento</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Categoria (tal como aparece en products.json)"
                            value={formCategoryName}
                            onChange={(e) => setFormCategoryName(e.target.value)}
                            className="block w-full border p-2 rounded"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    // Validación básica en cliente
                                    setFormMessage(null);
                                    if (!formNombre.trim()) {
                                        setFormMessage('El nombre es requerido');
                                        return;
                                    }
                                    if (formPrecioOriginal === null || Number.isNaN(formPrecioOriginal) || formPrecioOriginal < 0) {
                                        setFormMessage('Precio original inválido');
                                        return;
                                    }
                                    if (formDescuento === null || Number.isNaN(formDescuento) || formDescuento < 0) {
                                        setFormMessage('Descuento inválido');
                                        return;
                                    }
                                    if (!formCategoryName.trim()) {
                                        setFormMessage('La categoría es requerida');
                                        return;
                                    }

                                    const payload = {
                                        categoryName: formCategoryName,
                                        product: {
                                            nombre: formNombre,
                                            imagen: formImagen || '',
                                            capacidad: formCapacidad || '',
                                            descripcion: formDescripcion || '',
                                            precioOriginal: formPrecioOriginal,
                                            descuento: formDescuento,
                                            enDescuento: formEnDescuento,
                                        },
                                    };

                                    try {
                                        let res;
                                        if (editingOriginalNombre) {
                                            // Update existing product
                                            res = await fetch('/api/products', {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ categoryName: formCategoryName, originalNombre: editingOriginalNombre, product: payload.product }),
                                            });
                                        } else {
                                            // Create new
                                            res = await fetch('/api/products', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify(payload),
                                            });
                                        }

                                        const data = await res.json();
                                        if (!res.ok) {
                                            setFormMessage(data?.error || 'Error al guardar');
                                        } else {
                                            setFormMessage(editingOriginalNombre ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
                                            // limpiar formulario
                                            setFormNombre('');
                                            setFormImagen('');
                                            setFormCapacidad('');
                                            setFormDescripcion('');
                                            setFormPrecioOriginal(0);
                                            setFormDescuento(0);
                                            setFormEnDescuento(false);
                                            setFormCategoryName('');
                                            setEditingOriginalNombre(null);
                                            // recargar lista
                                            await loadProducts();
                                            // opcional: cerrar modal
                                            setTimeout(() => setMostrarForm(false), 800);
                                        }
                                    } catch (err: any) {
                                        setFormMessage(String(err));
                                    }
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                            >
                                {editingOriginalNombre ? 'Actualizar' : 'Guardar en JSON'}
                            </button>

                            <button
                                onClick={() => { setMostrarForm(false); setEditingOriginalNombre(null); }}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded w-full"
                            >
                                Cancelar
                            </button>
                        </div>

                        {formMessage && <p className="text-sm mt-2">{formMessage}</p>}
                    </div>
                </div>
            )}

                {/* TITLE */}
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">All the Products</h2>

                {/* TABLE - SIN LÍNEAS DIVISORIAS Y FILAS ALTERNADAS */}
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y-0">
                        {/* Encabezado con fondo azul */}
                        <thead className="bg-blue-600 text-white text-sm font-medium tracking-wider">
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

                        {/* Cuerpo de la tabla */}
                        <tbody className="bg-white divide-y-0 text-sm text-gray-700">
                            {loading ? (
                                <tr><td className="p-4">Cargando productos...</td></tr>
                            ) : displayedProducts.map((p, i) => (
                                <tr
                                    key={`${p.nombre}-${i}`}
                                    // Filas alternadas para diferenciar sin usar bordes
                                    className={`${i % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-150`}
                                >
                                    <td className="p-3 whitespace-nowrap">{p.sku}</td>
                                    <td className="p-3 whitespace-nowrap font-medium text-gray-900">{p.nombre}</td>
                                    <td className="p-3 whitespace-nowrap">{p.precioOriginal ? `$${p.precioOriginal.toFixed(2)}` : ''}</td>
                                    <td className="p-3 whitespace-nowrap text-gray-600">{p.category}</td>

                                    {/* STATUS (Usando el componente de icono) */}
                                    <td className="p-3 whitespace-nowrap">
                                        {statusIcon(p.status)}
                                    </td>

                                    <td className="p-3 whitespace-nowrap">{p.stock ?? '-'}</td>

                                    {/* ACTIONS */}
                                    <td className="p-3 flex gap-2">
                                        {/* Edit Button */}
                                        <button onClick={() => openEdit(p)} className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-md shadow-sm active:scale-95 transition flex items-center justify-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.39.242l-4 1a1 1 0 01-1.213-1.213l1-4a1 1 0 01.242-.39l9.9-9.9a2 2 0 012.828 0z" />
                                            </svg>
                                        </button>

                                        {/* Delete Button */}
                                            <button
                                                onClick={async () => {
                                                    if (!confirm(`Eliminar ${p.nombre} de ${p.category}?`)) return;
                                                    try {
                                                        const res = await fetch('/api/products', {
                                                            method: 'DELETE',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ categoryName: p.category, nombre: p.nombre }),
                                                        });
                                                        const d = await res.json();
                                                        if (!res.ok) {
                                                            alert(d?.error || 'Error al eliminar');
                                                        } else {
                                                            // recargar lista
                                                            await loadProducts();
                                                        }
                                                    } catch (err) {
                                                        alert(String(err));
                                                    }
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-md shadow-sm active:scale-95 transition flex items-center justify-center"
                                            >
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
