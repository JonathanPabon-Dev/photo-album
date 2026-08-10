import { useEffect, useState } from "react";
import type { Album } from "../types/album";
import { getAlbums } from "../services/albumService";

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    setError(null);

    const { data, error } = await getAlbums();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setAlbums(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    async function loadInitialAlbums() {
      const { data, error } = await getAlbums();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setAlbums(data ?? []);
      setLoading(false);
    }

    void loadInitialAlbums();
  }, []);

  return {
    albums,
    loading,
    error,
    reload,
  };
}
