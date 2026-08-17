import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { createAlbum } from "../services/albumService";

interface AlbumFormProps {
  onCreated: () => void;
}

function AlbumForm({ onCreated }: AlbumFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("El nombre del álbum es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await createAlbum(
      form.name.trim(),
      form.description.trim(),
    );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setForm({
      name: "",
      description: "",
    });

    setLoading(false);
    onCreated();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-slate-900">Crear álbum</h3>

      <div className="mt-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Nombre
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          placeholder="Ej. Viaje a Cartagena"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={loading}
          rows={3}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          placeholder="Descripción opcional"
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creando..." : "Crear álbum"}
      </button>
    </form>
  );
}

export default AlbumForm;
