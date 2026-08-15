import { useEffect, useState } from "react";
import type { Movie } from "../../services/omdbMovieService";
import { loadFavourites, deleteFavourite } from "./FavouritesModel";

export function useFavouritesViewModel() {
  const [favourites, setFavourites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

n  // Load movies on demand
  const loadMovies = async (): Promise<void> => {
    setLoading(true);
    setError(null);

n    try {
      const movies = await loadFavourites();
      setFavourites(movies);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

n  // Remove movie and update local state
  const removeMovie = async (imdbID: string): Promise<void> => {
    setLoading(true);
    setError(null);

n    try {
      await deleteFavourite(imdbID);
      setFavourites((prev) => prev.filter((m) => m.imdbID !== imdbID));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

n  // Initial load when the screen opens
  useEffect(() => {
    let mounted = true;

n    (async () => {
      setLoading(true);
      setError(null);

n      try {
        const movies = await loadFavourites();
        if (mounted) setFavourites(movies);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

n    return () => {
      mounted = false;
    };
  }, []);

n  return { favourites, loading, error, loadMovies, removeMovie } as const;
}
