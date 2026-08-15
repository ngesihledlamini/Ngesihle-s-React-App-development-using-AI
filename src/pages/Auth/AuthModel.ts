import type { User } from "firebase/auth";
import { registerUser, loginUser, logoutUser } from "../../services/authService";

import type { AppUser, AuthModel } from "../../types/auth";

// Minimal typed Auth model used by the Auth view and view-model.
export const defaultAuthModel: AuthModel = {
  user: null,
  loading: false,
  error: null,
};

/**
 * Trim and normalize an email address for use with authentication.
 */
function normalizeEmail(raw: string): string {
  return (raw ?? "").trim().toLowerCase();
}

/**
 * Register a new user. Validates inputs, normalizes the email, then delegates
 * to the authService registerUser function. Returns the Firebase User on success.
 */
export async function register(email: string, password: string): Promise<User> {
  const normalized = normalizeEmail(email);

  if (!normalized) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  // Delegate to authService which is the single place that talks to Firebase Auth.
  return await registerUser(normalized, password);
}

/**
 * Sign in an existing user. Validates inputs, normalizes the email, then delegates
 * to the authService loginUser function. Returns the Firebase User on success.
 */
export async function login(email: string, password: string): Promise<User> {
  const normalized = normalizeEmail(email);

  if (!normalized) {
    throw new Error("Email is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  return await loginUser(normalized, password);
}

/**
 * Sign out the current user. Delegates to authService.logoutUser.
 */
export async function logout(): Promise<void> {
  await logoutUser();
}
