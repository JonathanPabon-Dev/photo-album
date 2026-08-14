import { supabase } from "../../../services/supabase";
import type { Photo } from "../types/photo";

const BUCKET_NAME = "photo_album";

export async function uploadPhotoFile(
  file: File,
  userId: string,
  albumId: string,
  photoId: string,
) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension) {
    throw new Error("El archivo no tiene una extensión válida.");
  }

  const filePath = `${userId}/${albumId}/${photoId}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  return {
    filePath,
  };
}

export async function createPhoto(photo: {
  id: string;
  albumId: string;
  ownerId: string;
  filePath: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  description?: string | null;
}) {
  const { data, error } = await supabase
    .schema("photo_album")
    .from("photos")
    .insert({
      id: photo.id,
      album_id: photo.albumId,
      owner_id: photo.ownerId,
      file_path: photo.filePath,
      file_name: photo.fileName,
      mime_type: photo.mimeType,
      file_size: photo.fileSize,
      description: photo.description ?? null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadPhoto(
  file: File,
  userId: string,
  albumId: string,
  description?: string | null,
) {
  const photoId = crypto.randomUUID();

  const { filePath } = await uploadPhotoFile(file, userId, albumId, photoId);

  try {
    const photo = await createPhoto({
      id: photoId,
      albumId,
      ownerId: userId,
      filePath,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      description,
    });

    return photo;
  } catch (error) {
    // Si PostgreSQL falla, eliminamos el archivo
    // que acabamos de subir a Storage.
    await supabase.storage.from(BUCKET_NAME).remove([filePath]);

    throw error;
  }
}

export async function getAlbumPhotos(albumId: string): Promise<Photo[]> {
  const { data, error } = await supabase
    .schema("photo_album")
    .from("photos")
    .select("*")
    .eq("album_id", albumId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getPhotoUrl(filePath: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}
