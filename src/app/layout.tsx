// src/app/layout.tsx (Versión Corregida)

import type { Metadata } from 'next'
import '../styles/globals.scss'
import './styles.css'
import Header from '../components/header'
import Footer from '../components/footer'
import I18nProviderWrapper from '../components/I18nProviderWrapper'; 



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
            <body>
                <I18nProviderWrapper>
                    <Header />
                    {children}
                    <Footer />
                </I18nProviderWrapper>
            </body>
        </html>
    );
}