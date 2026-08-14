-- ============================================================
-- Photo Album
-- Grant permissions on album_members
-- ============================================================
grant
select
    on table photo_album.album_members to authenticated;