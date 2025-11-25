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
  const whatsappNumber = "524491373010";
  const whatsappMessage = encodeURIComponent(
    "Hola Crystalim, me gustaría más información."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-auto bg-[#2387e1] text-white">
      <div className="mx-auto max-w-6xl px-6 py-4 md:py-5">
        {/* FILA SUPERIOR*/}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Barra de navegación horizontal */}
          <nav className="flex flex-wrap items-center gap-6 text-xs md:text-sm">
            <span className="font-semibold">Barra de Navegación</span>

            <a
              href="#products"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white/80"
            >
              Productos
            </a>

            <a
              href="#about"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white/80"
            >
              About Us
            </a>

            <a
              href="#contact"
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-white/80"
            >
              Contacto
            </a>
          </nav>

          {/* Iconos derecha */}
          <div className="flex items-center gap-4 text-lg">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-125 hover:text-white/80"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/crystalim_0190/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-125 hover:text-white/80"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Línea completa */}
        <hr className="mt-3 border-white/40" />

        {/* FILA INFERIOR*/}
        <div className="mt-3 flex flex-col gap-2 text-[11px] md:flex-row md:items-center md:justify-between">
          {/* Logo*/}
          <div className="flex items-center gap-3">
            <Image
              src={crystalimLogo}
              alt="Crystalim Logo"
              width={90}
              height={45}
              className="h-8 w-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Copyright */}
          <p className="text-center text-[10px] md:text-xs md:text-right text-white/90">
            © {year} {companyName}. Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
