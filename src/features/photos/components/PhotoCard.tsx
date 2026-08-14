import { useEffect, useState } from "react";
import type { Photo } from "../types/photo";
import { getPhotoUrl } from "../services/photoService";

interface PhotoCardProps {
  photo: Photo;
}

function PhotoCard({ photo }: PhotoCardProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUrl() {
      try {
        const signedUrl = await getPhotoUrl(photo.file_path);

        if (!cancelled) {
          setUrl(signedUrl);
        }
      } catch {
        if (!cancelled) {
          setError("No fue posible cargar la imagen.");
        }
      }
    }

    void loadUrl();

    return () => {
      cancelled = true;
    };
  }, [photo.file_path]);

  if (error) {
    return (
      <div className="flex aspect-square items-center justify-center bg-slate-100 p-4 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="flex aspect-square items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={photo.description ?? photo.file_name}
      className="aspect-square w-full object-cover"
    />
  );
}

export default PhotoCard;
