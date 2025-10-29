// src/app/checkout/page.tsx
import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-green-600 mb-6 border-b pb-2">
        Finalizar Compra
      </h1>
      <p className="text-base sm:text-lg text-gray-700">
        Esta es la página dedicada al proceso de pago.
      </p>

      <div className="mt-8 p-4 sm:p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Resumen del Pedido</h2>
        <p className="mt-4 text-gray-600">
          *Implementación futura: Aquí se mostrará el resumen final, la dirección de envío y los formularios de pago.*
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link
            href="/catalog"
            className="inline-block text-blue-600 hover:underline"
        >
          ← Volver al Catálogo
        </Link>
      </div>
    </div>
  );
}
