-- Safe cleanup maintenance script
\c raushni_backend;

DO $$
BEGIN
  -- Delete old logs (older than 30 days) only if audit_logs exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='audit_logs') THEN
    EXECUTE 'DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL ''30 days''';
  END IF;

  -- Archive old donations only if archive table exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='donations_archive')
     AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='donations') THEN
    EXECUTE 'INSERT INTO donations_archive SELECT * FROM donations WHERE donation_date < NOW() - INTERVAL ''1 year''';
    EXECUTE 'DELETE FROM donations WHERE donation_date < NOW() - INTERVAL ''1 year''';
  END IF;
END $$;
