import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { subscribeToAuthChanges, logoutUser } from "../services/authService";
import type { AuthContextValue, AuthProviderProps } from "../types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to auth changes via authService which wraps Firebase Auth.
    const unsubscribe = subscribeToAuthChanges((u) => {
      setUser(u);
      setAuthLoading(false);
    });

    // Ensure we unsubscribe when the provider unmounts.
    return () => unsubscribe();
  }, []);

  async function logout(): Promise<void> {
    await logoutUser();
  }

  // While the auth state is being restored, show a minimal loading UI.
  if (authLoading) {
    return <div>Initializing authentication…</div>;
  }

  return (
    <AuthContext.Provider value={{ user, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export default AuthContext;
