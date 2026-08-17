import { supabase } from "../../../services/supabase";

export async function getAlbums() {
  const { data, error } = await supabase
    .schema("photo_album")
    .from("albums")
    .select(
      `
      *,
      photos:photos(count)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return {
      data: null,
      error,
    };
  }

  const albums = data.map(({ photos, ...album }) => ({
    ...album,
    photo_count: photos[0]?.count ?? 0,
  }));

  return {
    data: albums,
    error: null,
  };
}

export async function createAlbum(name: string, description: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return {
      data: null,
      error: userError,
    };
  }

  if (!user) {
    return {
      data: null,
      error: new Error("Usuario no autenticado"),
    };
  }

  const { data, error } = await supabase
    .schema("photo_album")
    .from("albums")
    .insert({
      owner_id: user.id,
      name,
      description: description || null,
    })
    .select()
    .single();

  return {
    data,
    error,
  };
}

export async function getAlbumById(id: string) {
  const { data, error } = await supabase
    .schema("photo_album")
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  return {
    data,
    error,
  };
}

export interface UpdateAlbumData {
  name: string;
  description: string;
}

export async function updateAlbum(albumId: string, data: UpdateAlbumData) {
  const { data: album, error } = await supabase
    .schema("photo_album")
    .from("albums")
    .update({
      name: data.name,
      description: data.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", albumId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return album;
}

export async function deleteAlbum(albumId: string) {
  const { error } = await supabase
    .schema("photo_album")
    .from("albums")
    .delete()
    .eq("id", albumId);

  if (error) {
    throw error;
  }
}
