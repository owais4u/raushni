-- Basic health signals for application database
SELECT NOW() AS checked_at;
SELECT current_database() AS db_name, current_user AS db_user;
SELECT COUNT(*) AS active_connections FROM pg_stat_activity WHERE datname = current_database();

-- Table presence checks
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'members', 'donations', 'projects')
ORDER BY table_name;
