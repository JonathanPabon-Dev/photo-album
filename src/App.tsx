import AppHeader from "./components/AppHeader";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Bienvenido a Photo Albums
        </h2>

        <p className="mt-2 text-slate-600">
          Tu colección de recuerdos, organizada en un solo lugar.
        </p>
      </main>
    </div>
  );
}

export default App;
