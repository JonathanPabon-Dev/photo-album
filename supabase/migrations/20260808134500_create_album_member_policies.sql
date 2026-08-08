-- ============================================================
-- Photo Album
-- Album members RLS policies
-- ============================================================
create policy "Users can view album memberships" on photo_album.album_members for
select
    to authenticated using (
        user_id = auth.uid ()
        or exists (
            select
                1
            from
                photo_album.albums
            where
                albums.id = album_members.album_id
                and albums.owner_id = auth.uid ()
        )
    );

create policy "Album owners can add members" on photo_album.album_members for insert to authenticated
with
    check (
        exists (
            select
                1
            from
                photo_album.albums
            where
                albums.id = album_members.album_id
                and albums.owner_id = auth.uid ()
        )
    );

create policy "Album owners can update members" on photo_album.album_members for
update to authenticated using (
    exists (
        select
            1
        from
            photo_album.albums
        where
            albums.id = album_members.album_id
            and albums.owner_id = auth.uid ()
    )
)
with
    check (
        exists (
            select
                1
            from
                photo_album.albums
            where
                albums.id = album_members.album_id
                and albums.owner_id = auth.uid ()
        )
    );

create policy "Album owners can remove members" on photo_album.album_members for delete to authenticated using (
    exists (
        select
            1
        from
            photo_album.albums
        where
            albums.id = album_members.album_id
            and albums.owner_id = auth.uid ()
    )
);