import type { Movie } from "../../services/omdbMovieService";
import { addFavourite, removeFavourite, getFavourites } from "../../services/firebaseService";

/**
 * Load all favourite movies.
 * Acts as a thin wrapper around the firebaseService.getFavourites function.
 */
export async function loadFavourites(): Promise<Movie[]> {
  return getFavourites();
}

/**
 * Save a movie to favourites.
 * Acts as a thin wrapper around the firebaseService.addFavourite function.
 */
export async function saveFavourite(movie: Movie): Promise<void> {
  return addFavourite(movie);
}

/**
 * Delete a favourite movie by imdbID.
 * Acts as a thin wrapper around the firebaseService.removeFavourite function.
 */
export async function deleteFavourite(imdbID: string): Promise<void> {
  return removeFavourite(imdbID);
}

