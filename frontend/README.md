# 🔵 TaskFlow Frontend

A sleek, modern interface built with **Next.js** and **Tailwind CSS**.

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

### 🛡️ Route Protection
The application uses a fetchWithAuth utility and authService to monitor JWT validity. If a token expires or is missing, the user is automatically redirected to the /login page to ensure data security.