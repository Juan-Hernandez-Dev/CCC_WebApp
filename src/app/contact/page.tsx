'use client';

import React, { useState } from 'react';
import '../../styles/globals.scss';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import Image from '../../assets/Contact/CCC.png';

// Función de ayuda para validar el formato de email
const validateEmail = (email: string): boolean => {
    // Expresión regular simple para verificar el formato email@dominio.com
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Interfaz para el estado de los datos del formulario
interface FormData {
    name: string;
    email: string;
    message: string;
}

// Interfaz para el estado de los errores de validación
interface Errors {
    name?: string;
    email?: string;
    message?: string;
}

const ContactPage: React.FC = () => {
    // ESTADO: Almacena los valores del formulario
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    // ESTADO: Almacena los errores de validación
    const [errors, setErrors] = useState<Errors>({});
    
    // ESTADO: Maneja el estado del envío para UX (idle, success, error, submitting)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Manejador genérico para actualizar el estado del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        
        // Limpiar errores cuando el usuario comienza a escribir
        if (errors[name as keyof Errors]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name as keyof Errors];
                return newErrors;
            });
        }
    };

    // Lógica de Validación (TOE)
    const validate = (): Errors => {
        let newErrors: Errors = {};
        const { name, email, message } = formData;

        // Obligatoriedad
        if (!name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!email.trim()) newErrors.email = 'El email es obligatorio.';
        if (!message.trim()) newErrors.message = 'El mensaje es obligatorio.';

        // Tipado/Estructura (solo si no está vacío)
        if (email.trim() && !validateEmail(email)) {
            newErrors.email = 'El formato del email no es válido.';
        }

        return newErrors;
    };

    // Manejador de Envío del Formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('idle'); // Resetear estado al intentar enviar

        const validationErrors = validate();
        setErrors(validationErrors);

        // Si hay errores, detiene el envío y marca como error
        if (Object.keys(validationErrors).length > 0) {
            setSubmitStatus('error');
            return;
        }

        // Si no hay errores, procede con la simulación de envío
        setSubmitStatus('submitting');
        
        // Simulación de llamada a API (2 segundos)
        setTimeout(() => {
            // Asumiendo que el envío fue exitoso
            setSubmitStatus('success');
            
            // Limpiar formulario
            setFormData({ name: '', email: '', message: '' });
            
        }, 2000);
    };

    // Definición de colores para UX
    const errorColor = '#E12923';
    const successColor = '#21A02E';

    // Estilos para el campo con error
    const inputErrorStyle = {
        borderColor: errorColor,
        '--tw-ring-color': errorColor,
    } as React.CSSProperties;

    // Determinar si el formulario se está enviando
    const isSubmitting = submitStatus === 'submitting';


    return (
        <>
            {/* Hero section para Contact */}
            <section className="py-16 px-4 bg-white text-gray-900">
                
                <div className="max-w-7xl mx-auto text-left">
                    <div className="flex items-center justify-left mb-4 space-x-2">
                        <div className="w-6 h-0.5" style={{ backgroundColor: '#2387e1' }}></div>
                        <span className="text-base font-medium" style={{ color: '#1E1E1E' }}>Contact</span>
                    </div>
                    <span className="text-4xl sm:text-5xl font-extrabold" style={{ color: '#1D3557' }}>¿Tienes alguna Pregunta? Contáctanos</span>
                    <p className="mt-4" style={{ color: '#1E1E1E' }}>En Crystalim, nos preocupamos por su experiencia y estamos aquí para ayudarle. Si tiene alguna pregunta sobre nuestros productos, necesita asesoramiento o desea enviarnos sus comentarios, nuestro equipo de atención al cliente estará encantado de escucharle y ofrecerle soluciones rápidas y eficaces. ¡Su satisfacción es nuestra prioridad!</p>
                </div>
            </section>

            <section className="py-16 px-4 bg-white text-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-4 font-sans" style={{ color: '#1D3557' }}>Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <MdLocationOn className="text-2xl mt-1 flex-shrink-0" style={{ color: '#1D3557' }} />
                                    <div>
                                        <h4 className="font-bold font-sans" style={{ color: '#1D3557' }}>Dirección</h4>
                                        <p className="font-sans" style={{ color: '#1E1E1E' }}>Comercializadora Castro Cervantes<br />Block A, Bodega 64, Central de Abastos.</p>
                                    </div>
                                </div>

                                {/* Logo de la empresa */}
                                <img
                                    src={Image.src}
                                    alt="Logo de Comercializadora Castro Cervantes"
                                    className="w-28 h-auto mb-6 rounded-md"
                                />

                                <div className="flex items-start space-x-3">
                                    <MdPhone className="text-2xl mt-1 flex-shrink-0" style={{ color: '#1D3557' }} />
                                    <div>
                                        <h4 className="font-bold font-sans" style={{ color: '#1D3557' }}>Teléfono</h4>
                                        <p className="font-sans" style={{ color: '#1E1E1E' }}>+52 (449) 137 3010</p>
                                    </div>
                                </div>
                                                                <div className="flex items-start space-x-3">
                                    <MdEmail className="text-2xl mt-1 flex-shrink-0" style={{ color: '#1D3557' }} />
                                    <div>
                                        <h4 className="font-bold font-sans" style={{ color: '#1D3557' }}>Email</h4>
                                        <p className="font-sans" style={{ color: '#1E1E1E' }}>crystalimadmon@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div>
                            <h3 className="text-2xl font-bold mb-4 font-sans" style={{ color: '#1D3557' }}>¡Envíanos un Mensaje!</h3>
                            {/* Agregado onSubmit y noValidate */}
                            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                                
                                {/* Campo Nombre */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium font-sans" style={{ color: '#1E1E1E' }}>Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        // Cambio de Enlace al Estado
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none font-sans ${errors.name ? 'border-red-500 ring-red-500' : ''}`}
                                        style={errors.name ? inputErrorStyle : { borderColor: '#bfdbfe', '--tw-ring-color': '#2387e1' } as React.CSSProperties}
                                        placeholder="Tu nombre"
                                        disabled={isSubmitting}
                                    />
                                    {/* Mostrar Error de Campos */}
                                    {errors.name && (<p className="mt-1 text-sm font-sans" style={{ color: errorColor }}>{errors.name}</p>)}
                                </div>

                                {/* Campo Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium font-sans" style={{ color: '#1E1E1E' }}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        // Cambio de Enlace al Estado
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none font-sans ${errors.email ? 'border-red-500 ring-red-500' : ''}`}
                                        style={errors.email ? inputErrorStyle : { borderColor: '#bfdbfe', '--tw-ring-color': '#2387e1' } as React.CSSProperties}
                                        placeholder="tu@email.com"
                                        disabled={isSubmitting}
                                    />
                                    {/* Mostrar Error */}
                                    {errors.email && (<p className="mt-1 text-sm font-sans" style={{ color: errorColor }}>{errors.email}</p>)}
                                </div>

                                {/* Campo Mensaje */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium font-sans" style={{ color: '#1E1E1E' }}>Mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        // Cambio de Enlace al Estado
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-1 focus:outline-none font-sans max-h-24 resize-none ${errors.message ? 'border-red-500 ring-red-500' : ''}`}
                                        style={errors.message ? inputErrorStyle : { borderColor: '#bfdbfe', '--tw-ring-color': '#2387e1' } as React.CSSProperties}
                                        placeholder="Tu mensaje aquí..."
                                        disabled={isSubmitting}
                                    ></textarea>
                                    {/* Mostrar Error */}
                                    {errors.message && (<p className="mt-1 text-sm font-sans" style={{ color: errorColor }}>{errors.message}</p>)}
                                </div>
                                
                                {/* Mensaje de Éxito o de Carga */}
                                {submitStatus === 'submitting' && (
                                    <p className="text-center font-sans font-bold" style={{ color: '#2387E1' }}>
                                        Cargando...
                                    </p>
                                )}
                                {submitStatus === 'success' && (
                                    <p className="text-center font-sans font-bold" style={{ color: successColor }}>
                                        ¡Mensaje enviado con éxito! Gracias por su preferencia.
                                    </p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-center font-sans font-bold" style={{ color: errorColor }}>
                                        Verifica los campos marcados antes de enviar.
                                    </p>
                                )}

                                {/* Botón de Envío */}
                                <button
                                    type="submit"
                                    className="w-full text-white font-bold py-2 px-4 rounded-full hover:transition-colors font-sans disabled:opacity-50"
                                    style={{
                                        backgroundColor: '#2387E1'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0D4F8B')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2387E1')}
                                    // Deshabilita el botón mientras se envía
                                    disabled={isSubmitting}
                                >
                                    {/* Texto de Enviando */}
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function Contact() {
    return (
        <div className="min-h-screen">
            <ContactPage />
        </div>
    );
}