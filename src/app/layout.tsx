// src/app/layout.tsx (Versión Corregida)

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.scss'
import './styles.css'
import Header from '../components/header'
import Footer from '../components/footer'
import I18nProviderWrapper from '../components/I18nProviderWrapper'; 



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
        <html lang="es"> 
            <body className={inter.className}>
                <I18nProviderWrapper>
                    <Header />
                    {children}
                    <Footer />
                </I18nProviderWrapper>
            </body>
        </html>
    );
}