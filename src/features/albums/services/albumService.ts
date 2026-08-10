import { supabase } from "../../../services/supabase";

export async function getAlbums() {
  const { data, error } = await supabase
    .schema("photo_album")
    .from("albums")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data,
    error,
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
