import { useEffect, useState } from "react";
import type { Movie } from "../../services/omdbMovieService";
import { loadFavourites, deleteFavourite } from "./FavouritesModel";
import { useAuth } from "../../context/AuthContext";

export function useFavouritesViewModel() {
const [favourites, setFavourites] = useState<Movie[]>([]);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

const { user } = useAuth();

// Load movies on demand
const loadMovies = async (): Promise<void> => {
  if (!user?.uid) {
    setError("User is not authenticated.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const movies = await loadFavourites(user.uid);
    setFavourites(movies);
  } catch (err) {
    setError(err instanceof Error ? err.message : String(err));
  } finally {
    setLoading(false);
  }
};

// Remove movie and update local state
const removeMovie = async (imdbID: string): Promise<void> => {
  if (!user?.uid) {
    setError("User is not authenticated.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    await deleteFavourite(user.uid, imdbID);
    setFavourites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  } catch (err) {
    setError(err instanceof Error ? err.message : String(err));
  } finally {
    setLoading(false);
  }
};

// Initial load when the screen opens
useEffect(() => {
  let mounted = true;

  (async () => {
    if (!user?.uid) {
      if (mounted) setError("User is not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const movies = await loadFavourites(user.uid);
      if (mounted) setFavourites(movies);
    } catch (err) {
      if (mounted) setError(err instanceof Error ? err.message : String(err));
    } finally {
      if (mounted) setLoading(false);
    }
  })();

  return () => {
    mounted = false;
  };
}, [user?.uid]);

return { favourites, loading, error, loadMovies, removeMovie } as const;
}
