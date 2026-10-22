/**
 * API Client & Backend Connection Configuration
 * 
 * Instructions for Backend Integration:
 * 1. Set VITE_USE_MOCK_API=false in your .env file.
 * 2. Set VITE_API_BASE_URL to your backend server (e.g., https://api.picknload.com/v1).
 * 3. The apiFetch helper automatically appends Authorization: Bearer <token> when available.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

// In-memory or localStorage token management
const TOKEN_KEY = "picknload_auth_token";
const USER_KEY = "picknload_user_session";

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY) || null;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Simulation helper for realistic async loading states when in Mock mode
export const simulateDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Universal API Fetch wrapper
 * Can be used directly or replaced with Axios
 */
export async function apiFetch(endpoint, options = {}) {
  if (USE_MOCK) {
    console.info(`[MOCK API] Request to: ${endpoint}`, options);
    // Handled by individual service modules in mock mode
    return null;
  }

  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      clearSession();
      window.dispatchEvent(new CustomEvent("picknload:unauthorized"));
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `API error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API ERROR] ${options.method || "GET"} ${url}:`, error);
    throw error;
  }
}
