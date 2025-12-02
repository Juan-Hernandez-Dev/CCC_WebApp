'use client';

import React from 'react';
import '../../styles/globals.scss';

const ContactPage: React.FC = () => (
  <>
    {/* Hero section para Contact */}
    <section className="py-16 px-4 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto text-left">
        {/* Contenedor del encabezado pequeño y línea azul */}
        <div className="flex items-center justify-left mb-4 space-x-2">
          {/* Línea decorativa azul */}
          <div className="w-6 h-0.5" style={{backgroundColor: '#2387e1'}}></div>
          
          <span className="text-base font-medium" style={{color: '#1E1E1E'}}>
            Contact
          </span>
        </div>
        <span className="text-4xl sm:text-5xl font-extrabold" style={{color: '#1D3557'}}>
          ¿Tienes alguna Pregunta? Contáctanos
        </span>
        <p className="mt-4" style={{color: '#1E1E1E'}}>
          En Crystalim, nos preocupamos por su experiencia y estamos aquí para ayudarle. Si tiene alguna pregunta sobre nuestros productos, necesita asesoramiento o desea enviarnos sus comentarios, nuestro equipo de atención al cliente estará encantado de escucharle y ofrecerle soluciones rápidas y eficaces. ¡Su satisfacción es nuestra prioridad!
        </p>
      </div>
    </section>

    <section className="py-16 px-4 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna de información de contacto */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-4 font-sans" style={{color: '#1D3557'}}>Get in Touch</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold font-sans" style={{color: '#1D3557'}}>Dirección</h4>
              <p className="font-sans" style={{color: '#1E1E1E'}}>Comercializadora Castro Cervantes<br />Block A, Bodega 64, Central de Abastos.</p>
            </div>
            <div>
              <h4 className="font-bold font-sans" style={{color: '#1D3557'}}>Teléfono</h4>
              <p className="font-sans" style={{color: '#1E1E1E'}}>+52 (449) 137 3010</p>
            </div>
            <div>
              <h4 className="font-bold font-sans" style={{color: '#1D3557'}}>Email</h4>
              <p className="font-sans" style={{color: '#1E1E1E'}}>crystalimadmon@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Columna de formulario de contacto */}
        <div>
          <h3 className="text-2xl font-bold mb-4 font-sans" style={{color: '#1D3557'}}>¡Envíanos un Mensaje!</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium font-sans" style={{color: '#1E1E1E'}}>Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-sans"
                style={{
                  borderColor: '#bfdbfe',
                  '--tw-ring-color': '#2387e1'
                } as React.CSSProperties}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium font-sans" style={{color: '#1E1E1E'}}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-sans"
                style={{
                  borderColor: '#bfdbfe',
                  '--tw-ring-color': '#2387e1'
                } as React.CSSProperties}
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium font-sans" style={{color: '#1E1E1E'}}>Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none font-sans max-h-24 resize-none"
                style={{
                  borderColor: '#bfdbfe',
                  '--tw-ring-color': '#2387e1'
                } as React.CSSProperties}
                placeholder="Tu mensaje aquí..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded-full hover:transition-colors font-sans"
              style={{
                backgroundColor: '#2387E1'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0219ab')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1452c7')}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  </>
);

export default function Contact() {
  return (
    <div className="min-h-screen">
      <ContactPage />
    </div>
  );
}