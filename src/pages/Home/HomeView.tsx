import MovieCard from '../../components/MovieCard/MovieCard'
import { useHomeViewModel } from './useHomeViewModel'
import { saveFavourite } from '../Favourites/FavouritesModel'

function HomeView() {
  const { movies, loading, error } = useHomeViewModel()

  return (
    <main>
      {loading && <p>Loading movies...</p>}
      {error && <p role="alert">{error}</p>}

      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <MovieCard movie={movie} onFavourite={() => void saveFavourite(movie)} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default HomeView
