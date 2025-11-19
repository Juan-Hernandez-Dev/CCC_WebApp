import { Link } from "react-router-dom";

export default function Page1() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Página 1 (Pública)</h1>
      <p>Esta es la primera página de prueba en el área pública.</p>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Link
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          to="/private/page2"
        >
          Ir a Página 2 (Privada)
        </Link>
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          to="/private/page3"
        >
          Ir a Página 3 (Privada)
        </Link>
        <Link
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          to="/"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
