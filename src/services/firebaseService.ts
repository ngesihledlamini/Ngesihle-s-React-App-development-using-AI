import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Movie } from "./omdbMovieService";

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
export const auth = getAuth(firebaseApp);

/**
 * Add a movie to the favourites collection. Uses imdbID as the document ID.
 * Throws a readable error when the operation fails.
 */
export async function addFavourite(userId: string, movie: Movie): Promise<void> {
  if (!userId) {
    throw new Error("Cannot add favourite: userId is required.");
  }

  if (!movie || !movie.imdbID) {
    throw new Error("Cannot add favourite: movie must have an imdbID.");
  }

  try {
    const favDoc = doc(db, "users", userId, "favourites", movie.imdbID);
    await setDoc(favDoc, movie);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to add favourite for user ${userId} (${movie.imdbID}): ${msg}`);
  }
}

/**
 * Remove a movie from the favourites collection by imdbID.
 * Throws a readable error when the operation fails.
 */
export async function removeFavourite(userId: string, imdbID: string): Promise<void> {
  if (!userId) {
    throw new Error("Cannot remove favourite: userId is required.");
  }

  if (!imdbID) {
    throw new Error("Cannot remove favourite: imdbID is required.");
  }

  try {
    const favDoc = doc(db, "users", userId, "favourites", imdbID);
    await deleteDoc(favDoc);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to remove favourite for user ${userId} (${imdbID}): ${msg}`);
  }
}

/**
 * Retrieve all favourite movies. Returns typed Movie[].
 * Throws a readable error when the operation fails.
 */
export async function getFavourites(userId: string): Promise<Movie[]> {
  if (!userId) {
    throw new Error("Cannot get favourites: userId is required.");
  }

  try {
    const favsCol = collection(db, "users", userId, "favourites");
    const snapshot = await getDocs(favsCol);
    const movies: Movie[] = [];

    snapshot.forEach((d) => {
      // Firestore returns plain objects; assert to Movie. Ensure imdbID is present.
      const data = d.data() as Movie;
      if (!data.imdbID) {
        // If the stored document omitted imdbID, fall back to the document id.
        data.imdbID = d.id as unknown as string;
      }
      movies.push(data);
    });

    return movies;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to retrieve favourites for user ${userId}: ${msg}`);
  }
}

export default firebaseApp;
