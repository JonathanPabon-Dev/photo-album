import { useEffect, useState } from "react";
import type { Album } from "../types/album";
import {
  getAlbums,
  updateAlbum as updateAlbumService,
  deleteAlbum as deleteAlbumService,
  type UpdateAlbumData,
} from "../services/albumService";
import { deleteAlbumPhotos } from "../../photos/services/photoService";

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  async function updateAlbum(albumId: string, data: UpdateAlbumData) {
    setUpdating(true);
    setUpdateError(null);

    try {
      const updatedAlbum = await updateAlbumService(albumId, data);

      setAlbums((currentAlbums) =>
        currentAlbums.map((album) =>
          album.id === updatedAlbum.id ? updatedAlbum : album,
        ),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible actualizar el álbum.";

      setUpdateError(message);

      throw error;
    } finally {
      setUpdating(false);
    }
  }

  async function deleteAlbum(albumId: string) {
    setDeleting(true);
    setDeleteError(null);

    try {
      await deleteAlbumPhotos(albumId);
      await deleteAlbumService(albumId);

      setAlbums((currentAlbums) =>
        currentAlbums.filter((album) => album.id !== albumId),
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible eliminar el álbum.";

      setDeleteError(message);

      throw error;
    } finally {
      setDeleting(false);
    }
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

    updateAlbum,
    updating,
    updateError,

    deleteAlbum,
    deleting,
    deleteError,
  };
}
