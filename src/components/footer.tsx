import React from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

type FooterProps = {
  companyName?: string;
  year?: number;
};

const Footer: React.FC<FooterProps> = ({
  companyName = "Crystalim",
  year = 2025,
}) => {
  // Número de WhatsApp 
  const whatsappNumber = "524491373010";
  const whatsappMessage = encodeURIComponent(
    "Hola Crystalim, me gustaría más información."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="mt-auto bg-[#2387e1] text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-4 md:py-5 text-center space-y-3">
        {/* Título */}
        <h4 className="text-sm font-semibold tracking-wide">Sections</h4>

        {/* Links (Home, Products, About Us, Contact) */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm">
          <a
            href="#home"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            Home
          </a>
          <a
            href="#products"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            Products
          </a>
          <a
            href="#about"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            Contact
          </a>
        </nav>

        {/* Iconos sociales */}
        <div className="flex items-center justify-center gap-4 text-lg">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            <FaWhatsapp />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/crystalim_0190/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-all hover:text-white/80 hover:-translate-y-0.5"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[11px] md:text-xs text-white/90">
          &copy; {year} {companyName}. All rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
