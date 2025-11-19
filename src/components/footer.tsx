import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

type FooterProps = {
  companyName?: string;
  year?: number;
};

const Footer: React.FC<FooterProps> = ({
  companyName = 'Crystalim',
  year = 2025,
}) => {
  return (
    <footer className="bg-[#2387E1] text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4 text-sm">
          &copy; {year} {companyName}. All rights Reserved.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="https://wa.me/TU_NUMERO"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-2xl transition-colors duration-300 hover:text-blue-200"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://www.instagram.com/crystalim_0190/L" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-2xl transition-colors duration-300 hover:text-blue-200"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;