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