import { useEffect, useState } from "react";
import type { Album } from "../types/album";
import { getAlbumById } from "../services/albumService";

export function useAlbum(id: string | undefined) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlbum() {
      if (!id) {
        setError("Álbum no especificado.");
        setLoading(false);
        return;
      }

      const { data, error } = await getAlbumById(id);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setAlbum(data);
      setLoading(false);
    }

    void loadAlbum();
  }, [id]);

  return {
    album,
    loading,
    error,
  };
}
