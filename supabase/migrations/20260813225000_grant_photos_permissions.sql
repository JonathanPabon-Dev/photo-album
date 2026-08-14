-- ============================================================
-- Photo Album
-- Grant permissions on photos
-- ============================================================
grant
select
,
    insert,
update,
delete on table photo_album.photos to authenticated;