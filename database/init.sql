-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create databases
CREATE DATABASE raushni_backend;
CREATE DATABASE raushni_cms;

-- Create users
CREATE USER raushni_user WITH PASSWORD 'raushni_password';
CREATE USER strapi_user WITH PASSWORD 'strapi_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE raushni_backend TO raushni_user;
GRANT ALL PRIVILEGES ON DATABASE raushni_cms TO strapi_user;

-- Connect to raushni_backend and create schemas
\c raushni_backend
CREATE SCHEMA IF NOT EXISTS raushni;
GRANT ALL ON SCHEMA raushni TO raushni_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA raushni GRANT ALL ON TABLES TO raushni_user;

-- Connect to raushni_cms and create schemas
\c raushni_cms
CREATE SCHEMA IF NOT EXISTS strapi;
GRANT ALL ON SCHEMA strapi TO strapi_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA strapi GRANT ALL ON TABLES TO strapi_user;

-- Create backup user for automated backups
CREATE USER backup_user WITH PASSWORD 'backup_password';
GRANT CONNECT ON DATABASE raushni_backend TO backup_user;
GRANT CONNECT ON DATABASE raushni_cms TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA raushni TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA strapi TO backup_user;

-- Enable pg_stat_statements for monitoring
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Create indexes for performance
\c raushni_backend
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_member_email ON members(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_donation_date ON donations(created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_project_status ON projects(status);

-- Create view for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM members WHERE is_active = true) as total_members,
    (SELECT COUNT(*) FROM donations WHERE status = 'COMPLETED') as total_donations,
    (SELECT COALESCE(SUM(amount), 0) FROM donations WHERE status = 'COMPLETED') as total_amount,
    (SELECT COUNT(*) FROM projects WHERE status = 'ACTIVE') as active_projects;