-- ============================================================
-- Photo Album
-- Grant permissions on albums
-- ============================================================
grant
select
,
    insert,
update,
delete on table photo_album.albums to authenticated;