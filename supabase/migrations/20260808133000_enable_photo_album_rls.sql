-- Enable Row Level Security
alter table photo_album.albums enable row level security;

alter table photo_album.photos enable row level security;

alter table photo_album.tags enable row level security;

alter table photo_album.photo_tags enable row level security;

alter table photo_album.album_members enable row level security;