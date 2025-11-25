import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import crystalimLogo from "../../public/crystalim-logo.png";

type FooterProps = {
  companyName?: string;
  year?: number;
};

const Footer: React.FC<FooterProps> = ({
  companyName = "Crystalim",
  year = 2025,
}) => {
  const whatsappNumber = "524494263984";
  const whatsappMessage = encodeURIComponent(
    "Hola Crystalim, me gustaría más información."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-auto bg-[#2387e1] text-white">
      <div className="mx-auto w-full px-6 py-6 md:px-12 md:py-8">
        
        {/* CONTENEDOR PRINCIPAL*/}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Image
              src={crystalimLogo}
              alt="Crystalim Logo"
              width={100}
              height={50}
              className="h-8 w-auto md:h-10 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* CENTRO*/}
          {/* La navegación ahora es una sola fila */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium md:gap-8 md:flex-grow"> 
            
            
            <span className="font-semibold text-white text-sm md:text-base pr-4 border-r border-white/50">Barra de Navegación</span>
            
            <a href="#products" className="relative group transition-colors hover:text-white/90">
              Productos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="relative group transition-colors hover:text-white/90">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group transition-colors hover:text-white/90">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* SOCIAL */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full transition-all hover:bg-white hover:text-[#2387e1] hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>

            <a
              href="https://www.instagram.com/crystalim_0190/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full transition-all hover:bg-white hover:text-[#E1306C] hover:-translate-y-1"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* LÍNEA */}
        <hr className="my-6 border-white/20" />

        {/* COPYRIGHT*/}
        <div className="text-center text-[11px] text-white/80 sm:text-xs">
          <p>
            &copy; {year} {companyName}. Todos los Derechos Reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;