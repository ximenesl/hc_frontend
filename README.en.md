# SENAC HC: Complementary Hours Management

A web platform for managing and validating complementary hours for undergraduate students, connecting students, coordinators, and administrators in real-time. Developed as a Capstone Project (Projeto Integrador) for the Systems Analysis and Development Program at Senac College.

[License](https://img.shields.io/badge/license-MIT-green)
[Institution](https://img.shields.io/badge/Institution-Senac%20College-blue)
[LGPD Compliance](https://img.shields.io/badge/Compliance-LGPD%20Ready-blueviolet)

---

## Project Overview

SENAC HC is a digital ecosystem designed to optimize the workflow of submitting, validating, and monitoring complementary hours (academic, scientific, and cultural activities). The platform allows students to upload digitalized certificates, choose the appropriate category, and track their progress in real-time against the total hours required by their curriculum. Coordinators and administrators are provided with a centralized validation dashboard to evaluate, approve, or reject certificates, entering the final validated hours.

### Key Features

* Student Dashboard: Graphical overview of completed and pending hours with a dynamic progress bar.
* Certificate Submission: Form to upload files (PDF/images) with category selection and requested hours.
* Coordinator Validation Panel: Interface to review pending certificates, view the uploaded file, and register the validation decision along with approved hours.
* System Management: Creation and maintenance of students, coordinators, courses, classes, and rules for computing hours per course.

---

## LGPD & Data Privacy Compliance (Lei Geral de Protecao de Dados)

Because this application processes personal registration data (such as name, academic record/RA, email, and course enrollment) and documents containing personal details of students and third parties (certificates), privacy by design was a core development guideline, in compliance with Brazilian Federal Law n. 13.709/2018 (LGPD).

### Implemented Privacy Standards:

* Legal Basis for Processing (Art. 7, V & XI): The processing of registration data and certificate storage is grounded on the performance of a contract or preliminary procedures (educational services agreement between the student and the educational institution), being indispensable for graduation auditing and academic validation.
* Data Minimization & Security: Only information strictly necessary for validation is requested. Uploaded certificate files are stored in a restricted and secure manner, ensuring only authorized coordinators and administrators can access them for audit and verification purposes.
* User Rights Panel (Art. 18): The system provides features that guarantee students:
  * Access and confirmation of the existence of data processing regarding their progress and profile.
  * Correction of incomplete, inaccurate, or outdated records.
  * Portability of personal records through direct tracking on the dashboard interface.
* Security (Art. 46): All API communication is secured using JWT (JSON Web Tokens). User passwords are encrypted in the database using secure hashing algorithms (bcrypt), preventing plaintext visibility even to database administrators.

---

## Tech Stack

### Frontend
* React.js (v19.2.5) - Main library for building declarative, component-based user interfaces.
* Ant Design (antd v6.3.5) - UI component library used for the design system, forms, and tables.
* React Router DOM (v7.14.0) - Route manager for SPA navigation.
* Axios (v1.15.1) - HTTP client for integration and consumption of API endpoints.
* Recharts (v3.8.1) - Chart library used for graphical statistics and student hours tracking.

### Backend
* Java 17 - Primary programming language for the backend ecosystem.
* Spring Boot (v3.2.4) - Base framework for developing the RESTful API.
* Spring Security & JWT - Robust authentication mechanism and role-based authorization (ADMIN, COORDENADOR, ALUNO).
* Spring Data JPA & Hibernate - Database abstraction and object-relational mapping.
* Spring Boot Mail & Resend Java (v3.1.0) - Email delivery services for password recovery.

### Database & Testing
* PostgreSQL - Relational database for production persistence.
* H2 Database - In-memory database for fast execution in local development and testing.
* React Testing Library & Jest - Component validation in the frontend.
* Spring Boot Test & Spring Security Test - Integration and security testing of API endpoints.

---

## Getting Started (Local Development)

Follow the steps below to configure and run the frontend and backend environments locally.

### 1. Prerequisites
Ensure you have installed on your machine:
* Git
* Node.js (v18.0.0 or higher)
* Java JDK 17
* Maven (or use the Maven wrapper included in the backend)
* PostgreSQL instance running locally (optional, if you do not want to use H2 in-memory)

### 2. Environment Variables Configuration

#### Backend (hc_backend)
The backend can be configured via the `src/main/resources/application.yml` file. By default, if no variables are provided, it will run with an H2 in-memory database on port 8080. For customization, you can set the following environment variables:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/db_name
SPRING_DATASOURCE_USERNAME=postgres_user
SPRING_DATASOURCE_PASSWORD=postgres_password
RESEND_API_KEY=your_resend_api_key_for_emails
```

#### Frontend (hc_frontend)
Create a `.env` file in the root directory of the frontend to point to the API server:
```env
REACT_APP_API_URL=http://localhost:8080
```

### 3. Setup and Execution

#### Running the Backend
Open a terminal in the backend folder:
```bash
cd hc_backend
mvn clean install
mvn spring-boot:run
```
The H2 console will be available at `http://localhost:8080/h2-console` (using JDBC URL `jdbc:h2:mem:certificado_db` and user `sa`).

#### Running the Frontend (Open a new terminal window)
Navigate to the frontend folder:
```bash
cd hc_frontend
npm install
npm start
```
The frontend will be accessible in your web browser at `http://localhost:3000`.

---

## Core API Endpoints

| Method | Endpoint | Description | LGPD Scope / Control |
|---|---|---|---|
| POST | /api/auth/login | Authenticates users and generates JWT token | Secure Access Control |
| POST | /api/auth/forgot-password | Sends password reset email with token | Credential Recovery |
| POST | /api/auth/change-password | Securely updates user password | Data Security (Art. 46) |
| POST | /api/certificates | Uploads a new certificate (multipart/form-data) | Processing of Personal Data |
| GET | /api/certificates/me/{alunoId} | Retrieves all certificates uploaded by a specific student | Right to Access (Art. 18, II) |
| PUT | /api/certificates/{id}/status | Updates certificate status and sets validated hours | Audit and Rectification |
| GET | /api/certificates/{id}/file | Downloads or views the certificate file | Document Access Rights |
| GET | /api/users/me | Returns currently logged-in user profile data | Profile Data Access Rights |
| PUT | /api/users/{id} | Updates user profile information | Right to Rectify (Art. 18, III) |
| DELETE | /api/users/{id} | Permanently deletes a user and associated data | Right to Erasure (Art. 18, VI) |
| GET | /api/cursos | Lists all courses registered in the institution | Institutional Information |
| GET | /api/regras/curso/{cursoId} | Lists rule limits and hour validation types for a course | Rule Transparency |

---

## Future Improvements

* OCR (Optical Character Recognition) Integration: Automatically extract issuing institution, student name, workload, and date upon PDF certificate upload to expedite validation.
* Action Audit Trail: Keep detailed log history of certificate approval/rejection actions taken by coordinators for audit transparency.
* Push & In-App Notifications: Real-time alerts on the student dashboard when a certificate changes state (approved, rejected, or needing correction).
* Consolidated Reports: Automatic generation of signed PDF summaries containing the student's entire validated activity history.

---

## Authors & Project Team

* Homero Flavio
* Joelson Jose
* Kallyne Melo
* Lucas Ximenes
* Marcelly Arcanjo
* Nicollas Abrao
* Thayanne Rodrigues

### Academic Advisors & Professors

* Academic Advisor / Professor: Prof. ____________
* Technical English Course Professor: Prof. Leonardo Trevas
