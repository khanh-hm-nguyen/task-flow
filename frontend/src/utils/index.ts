const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Generic helper to handle fetch responses.
 * It parses JSON if present, handles 204 No Content, and throws on errors.
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }
  
  // Handle "204 No Content" (common for DELETE/PUT operations)
  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  // Parse JSON if content exists, otherwise return empty object cast as T
  return text ? JSON.parse(text) : ({} as T); 
}


// Helper for authorized requests
export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 403 || response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Auto-logout if token is invalid
    throw new Error("Session expired");
  }

  return response;
}