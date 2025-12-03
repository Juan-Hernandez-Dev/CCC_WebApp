"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CImage from "../assets/Navbar/C.png";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link';

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

    // Medida inicial en el siguiente frame (evita medir antes de layout final)
    let raf1: number | null = null;
    let raf2: number | null = null;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(applyPadding);
    });

    // Observador para cambios de tamaño del header (imagen, fuente, etc.)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => applyPadding());
      ro.observe(el);
      // Además recalcular cuando la página completa carga (CSS/imagenes) y cuando las fuentes se estabilizan
      window.addEventListener("load", applyPadding);
      if ((document as any).fonts && (document as any).fonts.ready) {
        (document as any).fonts.ready.then(applyPadding).catch(() => {});
      }
    } else {
      // Fallback: escucha resize de la ventana y load de la página
      window.addEventListener("resize", applyPadding);
      window.addEventListener("load", applyPadding);
    }

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
       if (ro) {
         ro.disconnect();
       } else {
         window.removeEventListener("resize", applyPadding);
         window.removeEventListener("load", applyPadding);
       }
      // remover listener de load si se añadió junto con ResizeObserver
      window.removeEventListener("load", applyPadding);
     };
   }, [pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200"
      role="banner"
    >
      <div className="max-w-330 mx-auto px-4 py-3 flex items-center justify-between h-14 sm:h-16">
        {/* Logo solo */}
        <Link href="/home" className="flex items-center gap-3 no-underline hover:opacity-90 transition-opacity">
           <Image
             src={CImage}
             alt="brand"
             width={36}
             height={36}
             className="block w-8 h-8 sm:w-9 sm:h-9"
           />
         </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-6">
            <li className="relative group">
              <Link
                href="/products"
                className={`relative font-medium px-1 ${isActive("/products") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/products") ? "page" : undefined}
              >
                Productos
              </Link>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/products") ? "w-full" : "group-hover:w-full"
                }`}
              />
            </li>

            <li className="relative group">
              <Link
                href="/aboutus"
                className={`relative font-medium px-1 ${isActive("/aboutus") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/aboutus") ? "page" : undefined}
              >
                About Us
              </Link>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/aboutus") ? "w-full" : "group-hover:w-full"
                }`}
              />
            </li>

            <li className="relative group">
              <Link
                href="/contact"
                className={`relative font-medium px-1 ${isActive("/contact") ? "text-blue-900" : "text-black hover:text-blue-500"}`}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contacto
              </Link>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-500 rounded transition-all duration-300 origin-center ${
                  isActive("/contact") ? "w-full" : "group-hover:w-full"
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
            <Link
              href="/products"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/products") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/products") ? "page" : undefined}
            >
              Productos
            </Link>

            <Link
              href="/aboutus"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/aboutus") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/aboutus") ? "page" : undefined}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`block py-2.5 px-3 rounded text-sm font-medium ${isActive("/contact") ? "text-blue-900 bg-blue-50 border-l-4 border-blue-500" : "text-black hover:bg-blue-50"}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isActive("/contact") ? "page" : undefined}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
