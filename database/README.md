# 🐘 Raushni Database - PostgreSQL 15

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Production‑grade PostgreSQL database for Raushni Educational & Social Welfare Trust**  
> Handles backend operational data, CMS content storage, and supports high‑availability requirements.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Schema & Migrations](#schema--migrations)
- [Backup & Restore](#backup--restore)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Performance Tuning](#performance-tuning)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

This directory contains all database-related assets for the Raushni platform. It provides a **PostgreSQL 15** instance pre‑configured with:

- Optimised memory and I/O settings for NGO workloads
- Automated backups and point‑in‑time recovery scripts
- Migration management for schema evolution
- Monitoring via `pg_stat_statements`
- Support for spatial data (`PostGIS`)

The database is used by both the **FastAPI backend** (`raushni_backend`) and the **Strapi CMS** (`raushni_cms`).

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Dual Database** | Separate databases for backend (`raushni_backend`) and CMS (`raushni_cms`) |
| **Custom Configuration** | Tuned `postgresql.conf` for performance, logging, and autovacuum |
| **Migration System** | Versioned SQL migrations applied automatically on startup |
| **Backup Automation** | Scripts for full, incremental, and S3‑backed backups |
| **Monitoring** | `pg_stat_statements`, `pg_stat_activity`, and health check endpoints |
| **Security** | SCRAM‑SHA‑256 authentication, separate users per database |
| **PostGIS** | Geospatial capabilities for location‑based features |
| **Docker Ready** | Multi‑stage Dockerfile with health checks and entrypoint scripts |

---

## 📁 Directory Structure

---

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/owais4u/raushni.git
cd raushni/database

# Start the database with default settings
docker-compose up -d

# Verify it's running
docker exec -it raushni-postgres pg_isready

# Access psql
docker exec -it raushni-postgres psql -U postgres