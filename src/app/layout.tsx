// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import MainLayout from "@/components/Layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crystalim™ - Cleaning Solutions",
  description: "E-commerce platform for Crystalim™ products.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
            <MainLayout> 
                {children}
            </MainLayout>
        </CartProvider>
      </body>
    </html>
  );
}