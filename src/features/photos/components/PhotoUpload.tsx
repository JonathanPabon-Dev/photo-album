import { useState } from "react";

interface PhotoUploadProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

function PhotoUpload({ onFileSelected, disabled = false }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onFileSelected(file);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    if (!file) {
      return;
    }

    onFileSelected(file);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
        isDragging ? "border-slate-500 bg-slate-50" : "border-slate-300"
      }`}
    >
      <p className="text-slate-600">Arrastra una foto aquí</p>

      <p className="my-2 text-sm text-slate-400">o</p>

      <label
        className={`inline-block rounded-md px-4 py-2 text-sm font-medium text-white ${
          disabled
            ? "cursor-not-allowed bg-slate-400"
            : "cursor-pointer bg-slate-900 hover:bg-slate-800"
        }`}
      >
        Seleccionar archivo
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default PhotoUpload;
