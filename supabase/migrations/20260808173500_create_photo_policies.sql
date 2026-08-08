-- ============================================================
-- Photo Album
-- Photo RLS policies
-- ============================================================
create policy "Users can view accessible photos" on photo_album.photos for
select
    to authenticated using (
        exists (
            select
                1
            from
                photo_album.albums
            where
                albums.id = photos.album_id
                and albums.owner_id = auth.uid ()
        )
        or exists (
            select
                1
            from
                photo_album.album_members
            where
                album_members.album_id = photos.album_id
                and album_members.user_id = auth.uid ()
        )
    );

create policy "Album owners can add photos" on photo_album.photos for insert to authenticated
with
    check (
        owner_id = auth.uid ()
        and exists (
            select
                1
            from
                photo_album.albums
            where
                albums.id = photos.album_id
                and albums.owner_id = auth.uid ()
        )
    );

create policy "Album owners can update photos" on photo_album.photos for
update to authenticated using (
    owner_id = auth.uid ()
    and exists (
        select
            1
        from
            photo_album.albums
        where
            albums.id = photos.album_id
            and albums.owner_id = auth.uid ()
    )
)
with
    check (owner_id = auth.uid ());

create policy "Album owners can delete photos" on photo_album.photos for delete to authenticated using (
    owner_id = auth.uid ()
    and exists (
        select
            1
        from
            photo_album.albums
        where
            albums.id = photos.album_id
            and albums.owner_id = auth.uid ()
    )
);