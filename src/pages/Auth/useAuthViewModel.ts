import type { AuthModel, AppUser } from "../../types/auth";
import { defaultAuthModel } from "./AuthModel";

// Minimal placeholder view-model factory for authentication.
// This is intentionally minimal and does not implement registration/login logic yet.
export function useAuthViewModel(): {
  model: AuthModel;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  subscribe: (callback: (user: AppUser | null) => void) => () => void;
} {
  const model: AuthModel = { ...defaultAuthModel };

  async function register(_email: string, _password: string): Promise<void> {
    // Placeholder: not implemented yet
    return Promise.reject(new Error("registerUser not implemented"));
  }

  async function login(_email: string, _password: string): Promise<void> {
    // Placeholder: not implemented yet
    return Promise.reject(new Error("loginUser not implemented"));
  }

  async function logout(): Promise<void> {
    // Placeholder: not implemented yet
    return Promise.reject(new Error("logoutUser not implemented"));
  }

  function subscribe(_callback: (user: AppUser | null) => void): () => void {
    // Placeholder: no-op unsubscribe
    return () => {
      /* no-op */
    };
  }

  return { model, register, login, logout, subscribe };
}
