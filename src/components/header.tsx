"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CImage from "../app/assets/Navbar/C.png";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavLink } from "react-router-dom";

export default function Header() {
  const ref = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const applyPadding = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.querySelectorAll("main, .min-h-screen").forEach((node) => {
        (node as HTMLElement).style.paddingTop = `${h}px`;
      });
    };
    applyPadding();
    window.addEventListener("resize", applyPadding);
    return () => window.removeEventListener("resize", applyPadding);
  }, []);

  const isActive = (to: string) => {
    if (!pathname) return false;
    return pathname === to || pathname.startsWith(to + "/");
  };

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200"
      role="banner"
    >
      <div className="max-w-[1180px] mx-auto px-4 py-3 flex items-center justify-between h-14 sm:h-16">
        {/* Logo solo */}
        <NavLink to="/" className="flex items-center gap-3 no-underline hover:opacity-90 transition-opacity">
          <Image
            src={CImage}
            alt="brand"
            width={36}
            height={36}
            className="block w-8 h-8 sm:w-9 sm:h-9"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            <li className="relative group">
              <NavLink
                to="/productos"
                className={`relative font-medium px-1 ${isActive("/productos") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/productos") ? "page" : undefined}
              >
                Productos
              </NavLink>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/productos") ? "w-full" : "group-hover:w-full"
                }`}
              />
            </li>

            <li className="relative group">
              <NavLink
                to="/about"
                className={`relative font-medium px-1 ${isActive("/about") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About Us
              </NavLink>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/about") ? "w-full" : "group-hover:w-full"
                }`}
              />
            </li>

            <li className="relative group">
              <NavLink
                to="/contacto"
                className={`relative font-medium px-1 ${isActive("/contacto") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/contacto") ? "page" : undefined}
              >
                Contacto
              </NavLink>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/contacto") ? "w-full" : "group-hover:w-full"
                }`}
              />
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1.5 rounded text-black hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 shadow-lg">
          <nav className="px-4 py-2 space-y-1">
            <NavLink
              to="/productos"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/productos") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/productos") ? "page" : undefined}
            >
              Productos
            </NavLink>

            <NavLink
              to="/about"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/about") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About Us
            </NavLink>

            <NavLink
              to="/contacto"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/contacto") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/contacto") ? "page" : undefined}
            >
              Contacto
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
