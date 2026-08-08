-- ============================================================
-- Photo Album
-- Initial database schema
-- ============================================================
create table
    photo_album.albums (
        id uuid primary key default gen_random_uuid (),
        owner_id uuid not null references auth.users (id) on delete cascade,
        name text not null,
        description text,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now ()
    );

create table
    photo_album.photos (
        id uuid primary key default gen_random_uuid (),
        album_id uuid not null references photo_album.albums (id) on delete cascade,
        owner_id uuid not null references auth.users (id) on delete cascade,
        file_path text not null,
        file_name text not null,
        mime_type text not null,
        file_size bigint not null,
        description text,
        created_at timestamptz not null default now (),
        updated_at timestamptz not null default now ()
    );

create table
    photo_album.tags (
        id uuid primary key default gen_random_uuid (),
        name text not null unique,
        created_at timestamptz not null default now ()
    );

create table
    photo_album.photo_tags (
        photo_id uuid not null references photo_album.photos (id) on delete cascade,
        tag_id uuid not null references photo_album.tags (id) on delete cascade,
        primary key (photo_id, tag_id)
    );

create table
    photo_album.album_members (
        album_id uuid not null references photo_album.albums (id) on delete cascade,
        user_id uuid not null references auth.users (id) on delete cascade,
        role text not null default 'viewer',
        created_at timestamptz not null default now (),
        primary key (album_id, user_id),
        constraint album_members_role_check check (role in ('viewer', 'editor'))
    );