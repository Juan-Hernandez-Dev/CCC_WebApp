import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/globals.scss";              
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crystalim - Cleaning with a Purpose",
  description: "High-quality cleaning solutions for home and business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
