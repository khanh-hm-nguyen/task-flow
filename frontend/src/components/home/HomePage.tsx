// app/page.tsx
"use client";

import Link from "next/link";
import Badge from "./Badge";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-zinc-700">
      {/* Hero Section */}
      <div className="max-w-3xl text-center space-y-8">
        {/* Welcoming Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Welcome to <br />
            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              TaskFlow 
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            A full-stack task management demonstration featuring a secure 
            <span className="text-zinc-200"> JWT authentication flow</span> and 
            a <span className="text-zinc-200">Spring Boot</span> backend.
          </p>
        </div>

        {/* Tech Stack Badge Grid */}
        <div className="flex flex-wrap justify-center gap-3">
          <Badge
            text="Spring Boot 3"
            color="bg-green-900/30 text-green-400 border-green-900"
          />
          <Badge
            text="Spring Security 6"
            color="bg-green-900/30 text-green-400 border-green-900"
          />
          <Badge
            text="JWT Tokens"
            color="bg-purple-900/30 text-purple-400 border-purple-900"
          />
          <Badge
            text="PostgreSQL"
            color="bg-blue-900/30 text-blue-400 border-blue-900"
          />
          <Badge
            text="Next.js 15"
            color="bg-zinc-800 text-white border-zinc-700"
          />
          <Badge
            text="Tailwind CSS"
            color="bg-sky-900/30 text-sky-400 border-sky-900"
          />
        </div>

        {/* Instructions Card */}
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 text-left shadow-2xl transition-all hover:border-zinc-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold">
              !
            </span>
            Ready to test the flow?
          </h3>
          <p className="text-zinc-500 text-sm mb-4">
            Follow these steps to experience the secure architecture:
          </p>
          <ol className="space-y-3 text-zinc-400 text-sm list-decimal list-inside">
            <li className="pl-2">
              <span className="text-zinc-200 font-medium">Register</span> an account to initialize your user data in PostgreSQL.
            </li>
            <li className="pl-2">
              <span className="text-zinc-200 font-medium">Login</span> to exchange credentials for a signed JWT token.
            </li>
            <li className="pl-2">
              The token is stored in 
              <code className="bg-zinc-950 px-1.5 py-0.5 rounded text-zinc-300 mx-1">
                LocalStorage
              </code>
              for authorized API requests.
            </li>
            <li className="pl-2">
              Access the <span className="text-zinc-200 font-medium">Dashboard</span> where Hibernate fetches your private task lists.
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            Login to Account
          </Link>
          <Link
            href="/register"
            className="px-10 py-3 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full hover:bg-zinc-800 transition-all active:scale-95"
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-zinc-600 text-xs text-center">
        <p>Built with Spring Boot & Next.js • TaskFlow Demo</p>
      </footer>
    </div>
  );
};

export default HomePage;