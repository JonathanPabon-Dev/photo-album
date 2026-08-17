import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

interface EditAlbumFormProps {
  initialName: string;
  initialDescription: string;
  loading: boolean;
  error: string | null;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  onCancel: () => void;
}

interface AlbumFormState {
  name: string;
  description: string;
}

function EditAlbumForm({
  initialName,
  initialDescription,
  loading,
  error,
  onSubmit,
  onCancel,
}: EditAlbumFormProps) {
  const [form, setForm] = useState<AlbumFormState>({
    name: initialName,
    description: initialDescription,
  });

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
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-slate-700"
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
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={loading}
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditAlbumForm;
