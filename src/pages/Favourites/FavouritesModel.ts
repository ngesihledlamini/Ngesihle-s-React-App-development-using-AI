import type { Movie } from "../../services/omdbMovieService";
import { addFavourite, removeFavourite, getFavourites } from "../../services/firebaseService";

/**
 * Load all favourite movies for a given userId.
 */
export async function loadFavourites(userId: string): Promise<Movie[]> {
  return getFavourites(userId);
}

/**
 * Save a movie to favourites for a given userId.
 */
export async function saveFavourite(userId: string, movie: Movie): Promise<void> {
  return addFavourite(userId, movie);
}

/**
 * Delete a favourite movie by imdbID for a given userId.
 */
export async function deleteFavourite(userId: string, imdbID: string): Promise<void> {
  return removeFavourite(userId, imdbID);
}

