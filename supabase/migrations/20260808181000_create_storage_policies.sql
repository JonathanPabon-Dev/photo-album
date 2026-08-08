-- ============================================================
-- Photo Album
-- Storage RLS policies
-- ============================================================

create policy "Users can upload files to their own folders"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'photo_album'
    and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can view their own files"
on storage.objects
for select
to authenticated
using (
    bucket_id = 'photo_album'
    and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can update their own files"
on storage.objects
for update
to authenticated
using (
    bucket_id = 'photo_album'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'photo_album'
    and (storage.foldername(name))[1] = auth.uid()::text
);


create policy "Users can delete their own files"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'photo_album'
    and (storage.foldername(name))[1] = auth.uid()::text
);