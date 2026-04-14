-- Clean up old data (run as cron job)
\c raushni_backend;

-- Delete old logs (older than 30 days)
DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '30 days';

-- Archive old donations (older than 1 year)
-- This assumes an archive table exists
INSERT INTO donations_archive SELECT * FROM donations WHERE donation_date < NOW() - INTERVAL '1 year';
DELETE FROM donations WHERE donation_date < NOW() - INTERVAL '1 year';