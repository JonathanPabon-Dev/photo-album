import type { Photo } from "../types/photo";
import PhotoCard from "./PhotoCard";

interface PhotoGalleryProps {
  photos: Photo[];
}

function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
        <p className="text-slate-500">Este álbum todavía no tiene fotos.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white"
        >
          <PhotoCard photo={photo} />
        </div>
      ))}
    </div>
  );
}

export default PhotoGallery;
