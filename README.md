# ⚡ TaskFlow

TaskFlow is a high-performance, full-stack task management application. It features a secure **Spring Boot** backend with **JWT Authentication** and a modern **Next.js** frontend.

## 🏗️ Project Structure
* **/backend**: Spring Boot 4 API (Java, Spring Security, Hibernate, PostgreSQL/H2).
* **/frontend**: Next.js 16 Web Application (TypeScript, Tailwind CSS).

## 🚀 Quick Start
1.  **Clone the repo**: `git clone <your-repo-link>`
2.  **Start Database**: Navigate to `/backend` and run `docker-compose up -d`.
3.  **Start Backend**: Run `./mvnw spring-boot:run` inside `/backend`.
4.  **Start Frontend**: Run `npm run dev` inside `/frontend`.

---

## 🔐 Key Features
* **Secure Auth**: JWT-based login and registration.
* **Data Isolation**: Users only see and manage their own task lists.
* **Responsive UI**: Dark-themed, mobile-first design.
