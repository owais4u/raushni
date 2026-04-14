# 🌟 Raushni CMS - Strapi Headless CMS

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/owais4u/raushni)
[![Strapi](https://img.shields.io/badge/Strapi-4.15.5-purple)](https://strapi.io)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED)](https://docker.com)

> **Headless Content Management System for Raushni Educational & Social Welfare Trust**  
> Manages NGO content, members, donations, projects, events, and more with a powerful admin panel.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Content Types](#content-types)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Backup & Recovery](#backup--recovery)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

Raushni CMS is a headless content management system built with Strapi v4. It provides a powerful admin interface for managing all NGO-related content and data, exposing a flexible RESTful API and GraphQL endpoint for the frontend application.

### Key Capabilities
- **Multi‑content type management** (Members, Donations, Projects, Events, News, etc.)
- **Role‑based access control** for admin users
- **Media library** with AWS S3 integration
- **SEO optimisation** out of the box
- **Email notifications** via SMTP
- **GraphQL playground** for advanced queries

---

## ✨ Features

| Module | Description |
|--------|-------------|
| **Member Management** | Create, update, and manage NGO members with custom fields, QR codes, and statuses |
| **Donation Tracking** | Record donations, generate receipts, track payment methods |
| **Project Management** | Manage projects, milestones, expenses, and progress |
| **Event Management** | Publish events, handle registrations, integrate with calendars |
| **News & Activities** | Share updates, success stories, and activity reports |
| **Beneficiary Management** | Track beneficiaries and aid distribution |
| **Crowdfunding Campaigns** | Launch and monitor fundraising campaigns |
| **Internship Management** | Post internship opportunities, manage applications |
| **SEO Components** | Built‑in SEO meta tags for all content types |
| **Media Optimisation** | Image upload, transformation, and CDN-ready URLs |

---

## 🛠 Tech Stack

- **Runtime**: Node.js 20.x
- **Framework**: Strapi v4.15.5
- **Database**: PostgreSQL 15 (primary), SQLite (development)
- **Object Storage**: AWS S3 (optional)
- **Email**: Nodemailer (SMTP)
- **API**: REST + GraphQL
- **Containerisation**: Docker & Docker Compose

---

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** 20.x or later
- **npm** 9.x or later
- **PostgreSQL** 15 (or Docker)
- **Git** (for cloning)
- **Docker & Docker Compose** (optional, for containerised setup)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/owais4u/raushni.git
cd raushni/cms