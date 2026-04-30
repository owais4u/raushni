\set ON_ERROR_STOP on
\c raushni_backend;

-- Test 1: required core tables exist
DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_count
  FROM (
    SELECT 'users' AS t UNION ALL
    SELECT 'members' UNION ALL
    SELECT 'designations' UNION ALL
    SELECT 'activities' UNION ALL
    SELECT 'enquiries' UNION ALL
    SELECT 'news' UNION ALL
    SELECT 'projects' UNION ALL
    SELECT 'donations'
  ) req
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = req.t
  );

  IF missing_count > 0 THEN
    RAISE EXCEPTION 'Missing required tables: %', missing_count;
  END IF;
END $$;

-- Test 2: expected columns exist on members table
DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_count
  FROM (
    SELECT 'id' AS c UNION ALL
    SELECT 'member_id' UNION ALL
    SELECT 'name' UNION ALL
    SELECT 'email' UNION ALL
    SELECT 'phone' UNION ALL
    SELECT 'status'
  ) req
  WHERE NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'members'
      AND column_name = req.c
  );

  IF missing_count > 0 THEN
    RAISE EXCEPTION 'members table missing required columns: %', missing_count;
  END IF;
END $$;

-- Test 3: expected indexes exist
DO $$
DECLARE
  missing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_count
  FROM (
    SELECT 'idx_members_email' AS i UNION ALL
    SELECT 'idx_members_member_id' UNION ALL
    SELECT 'idx_donations_donation_id' UNION ALL
    SELECT 'idx_projects_status'
  ) req
  WHERE NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND indexname = req.i
  );

  IF missing_count > 0 THEN
    RAISE EXCEPTION 'Missing required indexes: %', missing_count;
  END IF;
END $$;

-- Test 4: dashboard view exists (optional in init, but expected after full init)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.views
    WHERE table_schema = 'public' AND table_name = 'dashboard_stats'
  ) THEN
    RAISE EXCEPTION 'dashboard_stats view is missing';
  END IF;
END $$;

SELECT 'schema tests passed' AS result;
