import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config read from Vite environment variables (must be prefixed with VITE_)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

// Warn if required env vars are missing — does not throw so the app can still run in non-Firebase environments.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  // eslint-disable-next-line no-console
  console.warn(
    "Firebase is not fully configured. Please set VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_APP_ID in your environment."
  );
}

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig as Record<string, any>);

// Export Firestore database instance. Use in app as: import { db } from 'src/services/firebaseService'
export const db = getFirestore(firebaseApp);

export default firebaseApp;
