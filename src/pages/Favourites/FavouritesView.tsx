import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import type { Movie } from "../../services/omdbMovieService";
import { useFavouritesViewModel } from "./useFavouritesViewModel";

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel();

  if (loading) {
    return <div>Loading favourites...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  if (!favourites || favourites.length === 0) {
    return <div>You have no favourite movies yet. Add some from the Home screen!</div>;
  }

  return (
    <section>
      <h1>Your Favourites</h1>
      <div className="favourites-list">
        {favourites.map((movie: Movie) => (
          <div key={movie.imdbID} className="favourites-list__item">
            <MovieCard movie={movie} />
            <div className="favourites-list__actions">
              <button
                type="button"
                onClick={() => void removeMovie(movie.imdbID)}
                aria-label={`Remove ${movie.Title} from favourites`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FavouritesView;
