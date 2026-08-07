import { Outlet } from "react-router";
import AppHeader from "../components/AppHeader";

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
