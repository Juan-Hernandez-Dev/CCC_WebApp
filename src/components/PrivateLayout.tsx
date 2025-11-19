import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-100">
      <header>
        <h1 className="text-2xl font-bold">Área Privada</h1>
        <p>Usuario autenticado</p>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Outlet />
      </main>
      <footer className="row-start-3">
        <p>Footer privado</p>
      </footer>
    </div>
  );
}
