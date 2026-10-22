/**
 * API Client & Backend Connection Configuration
 * Configured for PickNLoad Express Backend (Tested on http://localhost:5000/api)
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

// Local storage session keys
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

// Simulation helper for mock mode
export const simulateDelay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Universal Fetch wrapper configured for tested Express backend endpoints
 */
export async function apiFetch(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

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

    const contentType = response.headers.get("content-type") || "";
    let data;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      const errMsg = data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errMsg);
    }

    return data;
  } catch (error) {
    console.error(`[API ERROR] ${options.method || "GET"} ${url}:`, error);
    throw error;
  }
}
