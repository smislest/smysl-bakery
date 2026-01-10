UPDATE directus_files SET storage='local' WHERE storage='supabase';
SELECT storage, COUNT(*) FROM directus_files GROUP BY storage;
