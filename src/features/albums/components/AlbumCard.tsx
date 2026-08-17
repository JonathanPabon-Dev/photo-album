import { useNavigate } from "react-router";
import { useState } from "react";
import type { Album } from "../types/album";

interface AlbumCardProps {
  album: Album;
  onEdit: (album: Album) => void;
  onDelete: (album: Album) => void;
}

function AlbumCard({ album, onEdit, onDelete }: AlbumCardProps) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);

  function handleOpen() {
    navigate(`/albums/${album.id}`);
  }

  return (
    <article
      onClick={handleOpen}
      className="relative cursor-pointer rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{album.name}</h2>

          {album.description && (
            <p className="mt-1 text-sm text-slate-600">{album.description}</p>
          )}

          <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.409 2.409M3.75 19.5h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5ZM16.5 8.25h.008v.008H16.5V8.25Z"
              />
            </svg>

            <span>{album.photo_count}</span>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setShowActions((current) => !current);
            }}
            className="rounded-md py-1 px-3 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label={`Acciones de ${album.name}`}
            aria-expanded={showActions}
          >
            ⋮
          </button>

          {showActions && (
            <div
              className="absolute right-0 z-10 mt-1 w-36 rounded-md border border-slate-200 bg-white py-1 shadow-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  setShowActions(false);
                  onEdit(album);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowActions(false);
                  onDelete(album);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default AlbumCard;
