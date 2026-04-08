
# 🌟 Raushni 🌟 - Educational & Social Welfare Trust

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.11-blue)](https://www.python.org/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5)](https://kubernetes.io/)

Welcome to the official repository for **Raushni**, a comprehensive digital platform designed to empower non-profit management. Our mission is to streamline operations, enhance transparency, and maximize the social impact of the Raushni Educational & Social Welfare Trust.

## ✨ Key Features

The platform is built with a robust set of features to manage every aspect of an NGO's workflow.

### 🆔 Core Document Generation
- **Member ID Card:** Generate printable digital ID cards for members with unique QR codes.
- **80G Donation Receipt:** Instantly issue tax-deductible receipts compliant with Section 80G of the Income Tax Act.
- **Appointment Letter:** Automate the creation of offer and appointment letters for new staff.
- **Achievement Certificate:** Recognize volunteers, donors, and community members with customizable certificates.

### 🏢 Complete NGO Management
- **Beneficiary Management** | **Crowd Funding Management** | **Internship Management**
- **Donation Management** | **Activity Post Management** | **Event Management**
- **Designation Management** | **Enquiry Management** | **News Management**
- **Project Management** | **Expense Management** | **Annual Audit Report**

## 🏗️ Architecture & Tech Stack

This project uses a modern, cloud-native microservices architecture for scalability and maintainability.

### Core Technologies
- **Frontend:** Next.js 14 (React) with Tailwind CSS for a dynamic, responsive user interface.
- **Backend API:** Node.js with Express, Prisma ORM, and Postgres for reliable data management.
- **Document Service:** Python 3.11 with FastAPI, ReportLab, and QR code generation for all PDF documents.
- **Infrastructure:** Docker containers orchestrated by Kubernetes (K8s) on cloud infrastructure provisioned with **Terraform**.
- **CMS & AI:** Headless CMS (Strapi/Sanity) for content, and **Deepgram** for potential voice/AI integrations.

### High-Level Architecture
## C4 Model Architecture for Raushni Platform
### Level 1: System Context Diagram
![Context](https://github.com/user-attachments/assets/74c8f514-0935-42ac-b30f-799f65398604)

### Level 2: Container Diagram
![RContainer](https://github.com/user-attachments/assets/8c54440c-6ae5-45a5-a855-36f35e67b86a)

### Level 3: Component Diagram (Backend)
![RComponant](https://github.com/user-attachments/assets/02a0369a-a0db-4a82-b77f-0f38602a66c7)

### Level 4: Kubernetes Deployment Diagram
![RKDeployment](https://github.com/user-attachments/assets/2781ef1c-426a-4611-82de-b3a463a0fd46)


**Data Flow:**
1. User requests → CDN → Load Balancer
2. Frontend pods handle UI rendering
3. API requests go to Node.js backend
4. Document generation requests go to Python service
5. PDFs are stored in S3
6. Database queries go through Redis cache

## 🚀 Getting Started (Local Development)

Follow these steps to get a development environment running.

### Prerequisites
- Node.js (v20+), Python (3.11+), Docker & Docker Compose
- Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/owais4u/raushni.git
    cd raushni
    
2. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your database, API keys, etc.
   
3. Run with Docker Compose (Recommended)
This will start the Postgres DB, Redis, Backend, Python service, and Frontend.
   ```bash 
   docker-compose up -d

4. Or run services individually

  Backend (Node.js):
 ```bash
       cd backend
       npm install
       npx prisma migrate dev --name init
       npm run dev

Python Service:
 ```bash
      cd services/document_generator
      python -m venv venv
      source venv/bin/activate # On Windows use `venv\Scripts\activate`
      pip install -r requirements.txt
      uvicorn main:app --reload --port 8000

