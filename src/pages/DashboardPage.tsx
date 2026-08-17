import { useState } from "react";
import { useAlbums } from "../features/albums/hooks/useAlbums";
import AlbumForm from "../features/albums/components/AlbumForm";
import AlbumCard from "../features/albums/components/AlbumCard";
import EditAlbumForm from "../features/albums/components/EditAlbumForm";
import Modal from "../components/Modal";
import type { Album } from "../features/albums/types/album";

function DashboardPage() {
  const {
    albums,
    loading,
    error,
    reload,
    updateAlbum,
    updating,
    updateError,
    deleteAlbum,
    deleting,
    deleteError,
  } = useAlbums();

  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);

  function handleEditAlbum(album: Album) {
    setSelectedAlbum(album);
    setModal("edit");
  }

  function handleDeleteAlbum(album: Album) {
    setSelectedAlbum(album);
    setModal("delete");
  }

  function handleCloseModal() {
    setSelectedAlbum(null);
    setModal(null);
  }

  async function handleUpdateAlbum(data: {
    name: string;
    description: string;
  }) {
    if (!selectedAlbum) {
      return;
    }

    await updateAlbum(selectedAlbum.id, data);

    handleCloseModal();
  }

  async function handleDeleteAlbumConfirm() {
    if (!selectedAlbum) {
      return;
    }

    await deleteAlbum(selectedAlbum.id);

    handleCloseModal();
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Mis álbumes</h2>

        <p className="mt-2 text-slate-600">Aquí aparecerán tus álbumes.</p>

        <div className="mt-6">
          <AlbumForm onCreated={reload} />
        </div>

        {loading && <p className="mt-6 text-slate-600">Cargando álbumes...</p>}

        {error && (
          <p className="mt-6 text-red-600">
            No fue posible cargar los álbumes.
          </p>
        )}

        {!loading && !error && albums.length === 0 && (
          <p className="mt-6 text-slate-600">Aún no tienes álbumes.</p>
        )}

        {!loading && !error && albums.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onEdit={handleEditAlbum}
                onDelete={handleDeleteAlbum}
              />
            ))}
          </div>
        )}
      </div>

      {selectedAlbum && modal === "edit" && (
        <Modal open={true} title="Editar álbum" onClose={handleCloseModal}>
          <EditAlbumForm
            initialName={selectedAlbum.name}
            initialDescription={selectedAlbum.description ?? ""}
            loading={updating}
            error={updateError}
            onSubmit={handleUpdateAlbum}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}

      {selectedAlbum && modal === "delete" && (
        <Modal open={true} title="Eliminar álbum" onClose={handleCloseModal}>
          <p className="text-sm text-slate-600">
            ¿Estás seguro de que deseas eliminar{" "}
            <strong>{selectedAlbum.name}</strong>?
          </p>

          {deleteError && (
            <p className="mt-4 text-sm text-red-600">{deleteError}</p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={deleting}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => void handleDeleteAlbumConfirm()}
              disabled={deleting}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DashboardPage;
