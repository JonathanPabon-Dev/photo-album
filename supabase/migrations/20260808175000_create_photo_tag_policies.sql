-- ============================================================
-- Photo Album
-- Photo tags RLS policies
-- ============================================================
create policy "Users can view tags from accessible photos" on photo_album.photo_tags for
select
    to authenticated using (
        exists (
            select
                1
            from
                photo_album.photos
            where
                photos.id = photo_tags.photo_id
                and (
                    photos.owner_id = auth.uid ()
                    or exists (
                        select
                            1
                        from
                            photo_album.album_members
                        where
                            album_members.album_id = photos.album_id
                            and album_members.user_id = auth.uid ()
                    )
                )
        )
    );

create policy "Photo owners can add tags" on photo_album.photo_tags for insert to authenticated
with
    check (
        exists (
            select
                1
            from
                photo_album.photos
            where
                photos.id = photo_tags.photo_id
                and photos.owner_id = auth.uid ()
        )
    );

create policy "Photo owners can remove tags" on photo_album.photo_tags for delete to authenticated using (
    exists (
        select
            1
        from
            photo_album.photos
        where
            photos.id = photo_tags.photo_id
            and photos.owner_id = auth.uid ()
    )
);