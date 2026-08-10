import { Link } from "react-router";
import { useAlbums } from "../features/albums/hooks/useAlbums";
import AlbumForm from "../features/albums/components/AlbumForm";

function DashboardPage() {
  const { albums, loading, error, reload } = useAlbums();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">Mis álbumes</h2>

      <p className="mt-2 text-slate-600">Aquí aparecerán tus álbumes.</p>

      <div className="mt-6">
        <AlbumForm onCreated={reload} />
      </div>

      {loading && <p className="mt-6 text-slate-600">Cargando álbumes...</p>}

      {error && (
        <p className="mt-6 text-red-600">No fue posible cargar los álbumes.</p>
      )}

      {!loading && !error && albums.length === 0 && (
        <p className="mt-6 text-slate-600">Aún no tienes álbumes.</p>
      )}

      {!loading && !error && albums.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.id}
              to={`/albums/${album.id}`}
              className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <h3 className="font-semibold text-slate-900">{album.name}</h3>

              {album.description && (
                <p className="mt-2 text-sm text-slate-600">
                  {album.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
