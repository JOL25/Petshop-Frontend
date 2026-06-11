import { PawPrint, ShoppingBag } from "lucide-react";
import { Link, Route, Routes } from "react-router-dom";
import { useCartStore } from "./stores/cartStore";

function HomePage() {
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link className="flex items-center gap-2 text-xl font-bold" to="/">
          <PawPrint className="text-orange-600" />
          Triopi Petshop
        </Link>

        <button
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm"
          type="button"
        >
          <ShoppingBag size={18} />
          Carrito ({itemCount})
        </button>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2">
        <div>
          <span className="font-semibold text-orange-600">
            Frontend inicializado
          </span>
          <h1 className="mt-4 text-5xl font-black tracking-tight">
            Todo listo para construir la tienda.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            React, TypeScript, Tailwind, Router, React Query, formularios,
            validación, estado global y pruebas ya están configurados.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-orange-100">
          <h2 className="text-xl font-bold">Próximos módulos</h2>
          <ul className="mt-5 space-y-3 text-slate-600">
            <li>Catálogo y detalle de productos</li>
            <li>Carrito y checkout con Mercado Pago</li>
            <li>Autenticación y pedidos del cliente</li>
            <li>Panel administrativo</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
    </Routes>
  );
}

export default App;
