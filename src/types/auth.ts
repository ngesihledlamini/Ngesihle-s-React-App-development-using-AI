import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';

export interface AppUser {
  uid: string;
  email?: string | null;
}

export interface AuthModel {
  user: AppUser | null;
  loading: boolean;
  error?: string | null;
}

export interface AuthContextValue {
  user: User | null;
  authLoading: boolean;
  logout: () => Promise<void>;
}

export type AuthProviderProps = { children: ReactNode };
