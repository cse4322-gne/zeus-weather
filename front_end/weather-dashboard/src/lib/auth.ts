export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface AuthResponse {
  email?: string;
  jwtToken: string;
}

/**
 * Register a new user with the backend API.
 */
export async function registerUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/Auth/RegisterUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Registration failed');
  }

  const data: AuthResponse = await res.json();
  localStorage.setItem('jwt_token', data.jwtToken);
  if (data.email) {
    localStorage.setItem('user_email', data.email);
  }
  return data;
}

/**
 * Log in an existing user with the backend API.
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/Auth/LoginUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Invalid credentials');
  }

  const data: AuthResponse = await res.json();
  localStorage.setItem('jwt_token', data.jwtToken);
  localStorage.setItem('user_email', email);
  return data;
}

/**
 * Log out the current user by clearing stored credentials.
 */
export function logout(): void {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_email');
}

/**
 * Check if a user is currently authenticated (has a non-expired JWT).
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // convert to ms
    return Date.now() < exp;
  } catch {
    return false;
  }
}

/**
 * Get the current user's email from localStorage.
 */
export function getUserEmail(): string | null {
  return localStorage.getItem('user_email');
}

/**
 * Get the stored JWT token.
 */
export function getToken(): string | null {
  return localStorage.getItem('jwt_token');
}
