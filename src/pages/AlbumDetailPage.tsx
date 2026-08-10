import { Link, useParams } from "react-router";
import { useAlbum } from "../features/albums/hooks/useAlbum";

function AlbumDetailPage() {
  const { albumId } = useParams<{ albumId: string }>();

  const { album, loading, error } = useAlbum(albumId);

  if (loading) {
    return <p className="text-slate-600">Cargando álbum...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600">{error}</p>

        <Link
          to="/dashboard"
          className="mt-4 inline-block text-sm font-medium text-slate-700 hover:underline"
        >
          ← Volver al dashboard
        </Link>
      </div>
    );
  }

  if (!album) {
    return (
      <div>
        <p className="text-slate-600">Álbum no encontrado.</p>

        <Link
          to="/dashboard"
          className="mt-4 inline-block text-sm font-medium text-slate-700 hover:underline"
        >
          ← Volver al dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/dashboard"
        className="text-sm font-medium text-slate-600 hover:underline"
      >
        ← Volver al dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-bold text-slate-900">{album.name}</h2>

      {album.description && (
        <p className="mt-2 text-slate-600">{album.description}</p>
      )}
    </div>
  );
}

export default AlbumDetailPage;
