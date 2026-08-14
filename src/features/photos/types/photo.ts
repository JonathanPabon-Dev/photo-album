export interface Photo {
  id: string;
  album_id: string;
  owner_id: string;
  file_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}
