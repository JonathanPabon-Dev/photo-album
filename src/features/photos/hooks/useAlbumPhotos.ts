import { useEffect, useState } from "react";
import type { Photo } from "../types/photo";
import { getAlbumPhotos } from "../services/photoService";

export function useAlbumPhotos(albumId: string | undefined) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(Boolean(albumId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) {
      return;
    }

    const currentAlbumId: string = albumId;
    let cancelled = false;

    async function loadPhotos() {
      try {
        const data = await getAlbumPhotos(currentAlbumId);

        if (cancelled) {
          return;
        }

        setPhotos(data);
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "No fue posible cargar las fotos.";

        setError(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPhotos();

    return () => {
      cancelled = true;
    };
  }, [albumId]);

  return {
    photos,
    loading,
    error,
    addPhoto: (photo: Photo) => {
      setPhotos((currentPhotos) => [photo, ...currentPhotos]);
    },
  };
}
