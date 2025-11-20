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
        <div className="footer-row">
          {/* Columna 1 */}
          <div className="footer-col">
            <h4 className="footer-title">{companyName}</h4>
            <ul className="footer-list">
              <li>
                <a href="#home" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="footer-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div className="footer-col">
            <h4 className="footer-title">Products</h4>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  Brooms
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Mops
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Soaps
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes */}
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