import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CCCervantes', 
  description: 'Creado con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-white`}
      >
        {/* - flex: Activa Flexbox
          - flex-col: Pone los hijos en columna (contenido arriba, footer abajo)
          - min-h-screen: Altura mínima = 100% de la pantalla
        */}

        {/* 3. "children" es el contenido de tu página (page.tsx) */}
        {children}

        {/* 4. El Footer va AFUERA de children, al final del body */}
        <Footer />
      </body>
    </html>
  );
}