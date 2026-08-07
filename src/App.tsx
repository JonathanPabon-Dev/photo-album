import AppHeader from "./components/AppHeader";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
