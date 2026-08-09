import { signOut } from "../features/auth/services/authService";

function AppHeader() {
  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <h1 className="text-xl font-bold text-slate-900">Photo Albums 📸</h1>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          {" "}
          Cerrar sesión{" "}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
