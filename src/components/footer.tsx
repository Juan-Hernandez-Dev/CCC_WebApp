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
      <div className="mx-auto max-w-screen-xl px-4 py-3 md:py-4">
        
        {/* FILA SUPERIOR*/}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-4 text-[13px] sm:text-sm">
            <span className="font-semibold">Barra de Navegación</span>

            <a href="#products" className="transition-all hover:text-white/80 hover:-translate-y-0.5">
              Productos
            </a>
            <a href="#about" className="transition-all hover:text-white/80 hover:-translate-y-0.5">
              About Us
            </a>
            <a href="#contact" className="transition-all hover:text-white/80 hover:-translate-y-0.5">
              Contacto
            </a>
          </nav>

          <div className="flex items-center gap-4 text-lg mt-1 sm:mt-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:-translate-y-0.5"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.instagram.com/crystalim_0190/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110 hover:-translate-y-0.5"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Línea */}
        <hr className="mt-5 border-white/40" />

        {/* FILA INFERIOR */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] sm:text-xs">
          
          {/* LOGO*/}
          <div className="flex items-center gap-2">
            <Image
              src={crystalimLogo}
              alt="Crystalim Logo"
              width={85}
              height={45}
              className="h-7 w-auto transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5"
            />
          </div>

          <p className="text-center sm:text-right text-white/90">
            © {year} {companyName}. Todos los Derechos Reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
