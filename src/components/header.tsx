"use client";
import React, { useEffect, useRef } from "react";
// import NavLink  from "next/NavLink ";
import Image from "next/image";
import CImage from "../app/assets/Navbar/C.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  const ref = useRef<HTMLElement | null>(null);

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

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200"
      role="banner"
    >
      <div className="max-w-[1180px] mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/">
          <a className="flex items-center gap-3 no-underline">
            <Image
              src={CImage}
              alt="brand"
              width={36}
              height={36}
              className="block"
            />
          </a>
        </NavLink >

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink to="/productos">
                <a className="group relative font-medium text-black hover:text-blue-500 hover:scale-105 transition-all duration-0 ease-in-out">
                  Productos
                  {/* marcar activo manualmente añadiendo la clase "active" al enlace si lo desea;
                      aquí dejo el subrayado ejemplo en Productos para la imagen */}
                  <span className="sr-only"> (active)</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
                </a>
              </NavLink >
            </li>

            <li>
              <NavLink to="/about">
                <a className="group relative font-medium text-black hover:text-blue-500 hover:scale-105 transition-all duration-0 ease-in-out">
                  About Us
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
                </a>
              </NavLink >
            </li>

            <li>
              <NavLink to="/contacto">
                <a className="group relative font-medium text-black hover:text-blue-500 hover:scale-105 transition-all duration-0 ease-in-out">
                  Contacto
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center" />
                </a>
              </NavLink >
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
