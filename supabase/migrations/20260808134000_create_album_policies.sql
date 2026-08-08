-- ============================================================
-- Photo Album
-- Albums RLS policies
-- ============================================================
create policy "Users can view their own albums" on photo_album.albums for
select
    to authenticated using (owner_id = auth.uid ());

create policy "Users can create their own albums" on photo_album.albums for insert to authenticated
with
    check (owner_id = auth.uid ());

create policy "Users can update their own albums" on photo_album.albums for
update to authenticated using (owner_id = auth.uid ())
with
    check (owner_id = auth.uid ());

create policy "Users can delete their own albums" on photo_album.albums for delete to authenticated using (owner_id = auth.uid ());