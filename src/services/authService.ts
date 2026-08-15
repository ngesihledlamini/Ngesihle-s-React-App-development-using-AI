import { auth } from "./firebaseService";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

/**
 * Convert Firebase Auth errors into readable messages for UI display.
 */
function readableFirebaseAuthError(err: unknown): string {
  // Firebase errors typically have a `code` property like "auth/xxx" and a message.
  const anyErr = err as { code?: string; message?: string } | undefined;
  const code = anyErr?.code;

  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already in use. Please use a different email or sign in.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/weak-password":
      return "The password is too weak. It should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found for that email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/too-many-requests":
      return "Too many unsuccessful attempts. Please try again later.";
    case "auth/operation-not-allowed":
      return "This authentication operation is not allowed. Contact support.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";
    default:
      return anyErr?.message ?? String(err);
  }
}

/**
 * Register a new user with email and password.
 * Returns the created Firebase User on success.
 */
export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (!credential.user) {
      throw new Error("Registration succeeded but no user information was returned by Firebase.");
    }
    return credential.user;
  } catch (err) {
    throw new Error(readableFirebaseAuthError(err));
  }
}

/**
 * Sign in existing user with email and password.
 * Returns the signed-in Firebase User on success.
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (!credential.user) {
      throw new Error("Login succeeded but no user information was returned by Firebase.");
    }
    return credential.user;
  } catch (err) {
    throw new Error(readableFirebaseAuthError(err));
  }
}

/**
 * Sign out the current user.
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(readableFirebaseAuthError(err));
  }
}

/**
 * Subscribe to auth state changes. The provided callback receives a Firebase User or null.
 * Returns an unsubscribe function to stop listening.
 */
export function subscribeToAuthChanges(
  callback: (user: User | null) => void
): () => void {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });

  return unsubscribe;
}
