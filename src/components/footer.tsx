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
  const whatsappNumber = '5214491140796';
  const whatsappMessage = encodeURIComponent(
    'Hola Crystalim, me gustaría más información.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="footer mt-auto">
      <div className="footer-inner">

        <div className="footer-row" style={{ justifyContent: "space-between" }}>
          
          {/* Crystalim */}
          <div className="footer-col">
            <h4 className="footer-title">{companyName}</h4>

            {/* LINKS HORIZONTALES */}
            <div className="footer-links-horizontal">
              <a href="#home" className="footer-link">Home</a>
              <span className="footer-separator">|</span>

              <a href="#about" className="footer-link">About Us</a>
              <span className="footer-separator">|</span>

              <a href="#services" className="footer-link">Products</a>
              <span className="footer-separator">|</span>

              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="footer-col">
            <h4 className="footer-title">Follow Us</h4>

            <div className="social-links">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="social-icon"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://www.instagram.com/crystalim_0190/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          &copy; {year} {companyName}. All rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;