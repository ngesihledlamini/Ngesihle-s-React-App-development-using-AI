import type { Movie } from '../../services/omdbMovieService'

type MovieCardProps = {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450?text=No+Poster'

  return (
    <article className="movie-card">
      <img src={posterSrc} alt={movie.Title} className="movie-card__poster" />

      <div className="movie-card__content">
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__meta">Year: {movie.Year}</p>
        <p className="movie-card__meta">Type: {movie.Type}</p>

        <button type="button" className="movie-card__favourite" aria-label={`Favourite ${movie.Title}`}>
          Favourite
        </button>
      </div>
    </article>
  )
}

export default MovieCard
