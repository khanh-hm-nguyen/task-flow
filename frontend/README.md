# 🔵 TaskFlow Frontend

A sleek, modern interface built with **Next.js** and **Tailwind CSS**.

## 📁 Project Directory Structure

src/
├── app/                  # Next.js App Router (Pages & Routing)
│   ├── dashboard/        # Protected User Dashboard
│   ├── login/            # Authentication: Login Page
│   ├── register/         # Authentication: Registration Page
│   ├── globals.css       # Global Tailwind styles
│   ├── icon.tsx          # Dynamic Favicon (⚡ Thunder)
│   ├── layout.tsx        # Root Layout & Metadata
│   └── page.tsx          # Landing/Home Page
├── components/           # Reusable UI Components
│   ├── auth/             # Login/Register forms
│   ├── home/             # Landing page sections & Badges
│   └── task/             # Sidebar, TaskViews, and Modals
├── services/             # API Integration Layer
│   ├── auth.service.ts   # Login, Register, & Token logic
│   └── task.service.ts   # Task & List CRUD operations
├── types/                # TypeScript Interfaces & DTOs
│   ├── auth.ts           # Auth request/response types
│   └── task.ts           # Task and TaskList models
└── utils/                # Helper Functions
    └── index.ts          # Global fetch wrapper (fetchWithAuth)

## 🛠️ Tech Stack
* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS
* **Icons**: MUI Icons
* **State Management**: React Hooks (useState/useEffect)
* **HTTP Client:** Fetch API (Custom Service)

## ⚙️ Environment Setup
Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## 🚀 Development
### Install dependencies:

```Bash
npm install
```

### Run the development server:

```Bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🛡️ Route Protection
The application uses a fetchWithAuth utility and authService to monitor JWT validity. If a token expires or is missing, the user is automatically redirected to the /login page to ensure data security.


## Key Features & Implementation
### 1. Automatic Session Management (fetchWithAuth)
The application uses a custom high-order fetch wrapper located in utils/index.ts to manage security globally:

JWT Persistence: Automatically attaches the Authorization: Bearer <token> header to every outgoing request if a token exists in localStorage.

Auto-Logout Logic: If the Spring Boot backend returns a 401 Unauthorized or 403 Forbidden status (indicating an expired or invalid session), the utility automatically clears localStorage and redirects the user to /login.

### 2. User Data Isolation
The frontend is designed to work with a secure backend that filters data by the authenticated user:

Ownership Enforcement: Users can only view, create, or modify tasks within their own collection.

Dynamic Sidebar: Fetches only the TaskLists associated with the current user's account upon dashboard initialization.

### 3. Responsive UI & Performance
Optimistic Updates: Task status toggles and deletions happen instantly in the UI for a lightning-fast feel ⚡.

Next.js 16 Optimizations: Uses the App Router for efficient server-side rendering and faster page transitions.

Tailwind Aesthetic: A custom dark-mode theme utilizing the zinc and slate color palettes for a professional developer-tool look.

