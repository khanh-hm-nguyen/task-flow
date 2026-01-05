# TaskFlow - Full Stack Task Management System

TaskFlow is a robust task management dashboard built with a modern **Next.js** frontend and a scalable **Spring Boot** backend. It allows users to manage multiple task lists, track priorities, set due dates, and monitor progress in real-time.


## 🚀 Tech Stack

### Frontend
* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **HTTP Client:** Fetch API (Custom Service)

### Backend
* **Framework:** Spring Boot 3
* **Language:** Java 17+
* **Database:** PostgreSQL
* **ORM:** Spring Data JPA / Hibernate
* **Build Tool:** Maven

---

## 📂 Project Structure

This project is organized as a monorepo:

```text
task-management-app/
├── backend/            # Spring Boot Server API
│   ├── src/main/resources/application.properties
│   └── pom.xml
├── frontend/           # Next.js Client
│   ├── src/services/api.ts
│   └── package.json
└── README.md
```

## 🏁 Getting Started
### 1. Database Setup
First, create a PostgreSQL database for the application. You can do this via pgAdmin or the command line

```text
CREATE DATABASE taskflow_db;
```

### 2. Backend Setup (Spring Boot)
1. Navigate to the backend directory:

```text
cd backend
```

2. Configure your database connection. Open src/main/resources/application.properties and update it with your credentials:

```text
spring.datasource.url=jdbc:postgresql://localhost:5432/taskflow_db
spring.datasource.username=postgres
spring.datasource.password=your_password_here
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
Run the application:
```

3. Run the application:

```text
./mvnw spring-boot:run
```
The backend will start at http://localhost:8080

### 3. Frontend Setup (Next.js)
1. Open a new terminal and navigate to the frontend directory:


```text
cd frontend
Install dependencies:

```

2. Install dependencies:

```text
npm install

```

2. Setup environment variables. Create a file named .env.local in the frontend root:


```text

# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

```

3. Run the development server:


```text

npm run dev

```
The application will be available at http://localhost:3000


## 🔌 API Reference
The backend exposes the following REST endpoints:

```text

Method      Endpoint                                   Description
GET         /task-lists                                Get all task lists
POST        /task-lists                                Create a new task list
DELETE      /task-lists/{id}                           Delete a task list
GET         /task-lists/{id}/tasks                     Get all tasks for a list
POST        /task-lists/{id}/tasks                     Create a new task
PUT         /task-lists/{listId}/tasks/{taskId}        Update a task (Status, Title, etc.)
DELETE      /task-lists/{listId}/tasks/{taskId}        Delete a task

```

