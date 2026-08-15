import type { Movie } from '../../services/omdbMovieService'

type MovieCardProps = {
  movie: Movie
  /** Optional handler called when the user favourites the movie */
  onFavourite?: (movie: Movie) => void | Promise<void>
}

function MovieCard({ movie, onFavourite }: MovieCardProps) {
  const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450?text=No+Poster'

  const handleFavouriteClick = () => {
    // call the optional handler and ignore the result here (parent may handle errors)
    if (onFavourite) {
      // avoid unhandled promise rejections
      const res = onFavourite(movie)
      if (res && typeof (res as Promise<void>).catch === 'function') {
        (res as Promise<void>).catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Failed to add favourite:', err)
        })
      }
    }
  }

  return (
    <article className="movie-card">
      <img src={posterSrc} alt={movie.Title} className="movie-card__poster" />

      <div className="movie-card__content">
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__meta">Year: {movie.Year}</p>
        <p className="movie-card__meta">Type: {movie.Type}</p>

        <button type="button" className="movie-card__favourite" aria-label={`Favourite ${movie.Title}`} onClick={handleFavouriteClick}>
          Favourite
        </button>
      </div>
    </article>
  )
}

export default MovieCard
