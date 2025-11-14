import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header>
        <h1 className="text-2xl font-bold">Área Pública</h1>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Outlet />
      </main>
      <footer className="row-start-3">
        <p>Footer público</p>
      </footer>
    </div>
  );
}
