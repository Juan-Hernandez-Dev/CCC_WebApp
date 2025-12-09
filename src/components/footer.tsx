'use client'; // <-- 1. ¡IMPORTANTE! Debe ser un Client Component para usar hooks

import React from "react";
// 2. Importar useTranslation de react-i18next
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa"; // FaGlobe para el ícono de idioma
import Image from "next/image";
import crystalimLogo from "../assets/footer/Crystalim blanco.png";
import Link from 'next/link';

type FooterProps = {
  companyName?: string;
  year?: number;
};

const Footer: React.FC<FooterProps> = ({
  companyName = "Crystalim",
  year = 2025,
}) => {
  const { i18n, t } = useTranslation('global');  // Función para cambiar el idioma
  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    
    // Opcional: Para cambiar el atributo lang en el tag <html> de Next.js.
    // Esto es solo un parche simple, la implementación correcta requiere
    // manejar el estado del idioma en el layout o usar un middleware.
    document.documentElement.lang = newLang; 
  };

  const whatsappNumber = "524494263984";
  // Si utilizas i18next en el futuro, podrías traducir este mensaje
  const whatsappMessage = encodeURIComponent(
    "Hola Crystalim, me gustaría más información."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-auto bg-[#2387e1] text-white">
      <div className="mx-auto w-full px-8 py-6 md:px-16 md:py-8">
        
        {/* CONTENEDOR PRINCIPAL: Logotipo, Navegación y Redes Sociales */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          {/* 1. IZQUIERDA: LOGO */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src={crystalimLogo}
              alt="Crystalim Logo"
              width={140}
              height={56}
              className="h-8 w-auto md:h-12"
            />
          </div>

          {/* 2. CENTRO: navegación centrada con título y enlaces */}
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-6 text-white">
              <span className="pr-3 md:pr-4 border-r border-white/60 text-sm md:text-base font-semibold">{t('footer.navbar_title')}</span>
              <nav className="flex gap-3 md:gap-6">
                <Link href="/products" className="px-3 py-1 text-sm md:text-base transition-colors hover:text-white/90" aria-label="Productos">{t('footer.products')}</Link>
                <Link href="/aboutus" className="px-3 py-1 text-sm md:text-base transition-colors hover:text-white/90" aria-label="About Us">{t('footer.aboutus')}</Link>
                <Link href="/contact" className="px-3 py-1 text-sm md:text-base transition-colors hover:text-white/90" aria-label="Contacto">{t('footer.contact')}</Link>
              </nav>
            </div>

            {/* línea blanca fina debajo de la navegación, ocupando la mayor parte del ancho central */}
            <div className="w-full mt-3">
              
            </div>
          </div>

          {/* 3. DERECHA: iconos sociales y botón de idioma */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="p-2 bg-white/10 rounded-full transition-all hover:bg-white hover:text-[#2387e1] hover:-translate-y-1"
              title={`Cambiar a ${i18n.language === 'es' ? 'English' : 'Español'}`}
              aria-label="Cambiar idioma"
            >
              <FaGlobe size={16} />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full transition-all hover:bg-white hover:text-[#2387e1] hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>

            <a
              href="https://www.instagram.com/crystalim_0190/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full transition-all hover:bg-white hover:text-[#E1306C] hover:-translate-y-1"
              aria-label="Instagram"
            >
                <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
        

        {/* LÍNEA DIVISORIA SUTIL */}
        <hr className="my-6 border-white/25" />

        {/* COPYRIGHT (Centrado y debajo de la línea) */}
        <div className="text-center text-[12px] text-white/90 sm:text-sm">
          <p className="font-medium">
            &copy; {year} {companyName}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;