import type { ReactNode } from "react";
import "../styles/globals.scss";        // 👈 LA RUTA CORRECTA
import Footer from "@/components/footer";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}