-- ============================================================
-- Photo Album
-- Tags RLS policies
-- ============================================================
create policy "Authenticated users can view tags" on photo_album.tags for
select
    to authenticated using (true);

create policy "Authenticated users can create tags" on photo_album.tags for insert to authenticated
with
    check (true);