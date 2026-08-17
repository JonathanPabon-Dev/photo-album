import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAlbum } from "../features/albums/hooks/useAlbum";
import { useAuth } from "../features/auth/hooks/useAuth";
import PhotoUpload from "../features/photos/components/PhotoUpload";
import { uploadPhoto } from "../features/photos/services/photoService";
import PhotoGallery from "../features/photos/components/PhotoGallery";
import { useAlbumPhotos } from "../features/photos/hooks/useAlbumPhotos";

function AlbumDetailPage() {
  const { albumId } = useParams<{ albumId: string }>();

  const { album, loading, error } = useAlbum(albumId);
  const { user } = useAuth();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const {
    photos,
    loading: photosLoading,
    error: photosError,
    addPhoto,
  } = useAlbumPhotos(albumId);

  async function handleFileSelected(file: File) {
    if (!albumId || !user) {
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const photo = await uploadPhoto(file, user.id, albumId);

      addPhoto(photo);
      setUploadSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible subir la foto.";

      setUploadError(message);
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <p className="text-slate-600">Cargando álbum...</p>;
  }

  if (error) {
    return (
      <div className="flex justify-between items-center">
        <p className="text-red-600">{error}</p>

        <Link
          to="/dashboard"
          className="text-slate-400 px-2 border border-slate-400 rounded-lg hover:bg-slate-400 hover:text-slate-100"
        >
          ←
        </Link>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex justify-between items-center">
        <p className="text-slate-600">Álbum no encontrado.</p>

        <Link
          to="/dashboard"
          className="text-slate-400 px-2 border border-slate-400 rounded-lg hover:bg-slate-400 hover:text-slate-100"
        >
          ←
        </Link>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            {album.name}
          </h2>
          <Link
            to="/dashboard"
            className="text-slate-400 px-2 border border-slate-400 rounded-lg hover:bg-slate-400 hover:text-slate-100"
          >
            ←
          </Link>
        </div>

        {album.description && (
          <p className="mt-2 text-slate-600">{album.description}</p>
        )}

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Agregar fotos
          </h3>

          <PhotoUpload
            onFileSelected={handleFileSelected}
            disabled={uploading}
          />

          {uploading && (
            <p className="mt-4 text-sm text-slate-600">Subiendo foto...</p>
          )}

          {uploadSuccess && !uploading && (
            <p className="mt-4 text-sm text-green-600">
              Foto subida correctamente.
            </p>
          )}

          {uploadError && !uploading && (
            <p className="mt-4 text-sm text-red-600">{uploadError}</p>
          )}
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Fotos</h3>

          {photosLoading && (
            <p className="text-sm text-slate-500">Cargando fotos...</p>
          )}

          {photosError && <p className="text-sm text-red-600">{photosError}</p>}

          {!photosLoading && !photosError && <PhotoGallery photos={photos} />}
        </div>
      </div>
    </>
  );
}

export default AlbumDetailPage;
