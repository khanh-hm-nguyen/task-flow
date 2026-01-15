import { AuthRequest, AuthResponse, RegisterRequest } from "@/types/auth";

import { handleResponse } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authService = {
  // create new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<AuthResponse>(response);

    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    return result;
  },

  // login
  async login(data: AuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await handleResponse<AuthResponse>(response);

    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    return result;
  },

//   async getSecureData(): Promise<string> {
//     const response = await fetchWithAuth("/demo-controller");
//     return response.text();
//   },

  // logout
  logout() {
    localStorage.removeItem("token");
  },

  // check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },

  getUserName(): string {
    return localStorage.getItem("firstname") || "Guest";
  }
};