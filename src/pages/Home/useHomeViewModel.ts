import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getMovies, initialMovies } from './HomeModel'
import { saveFavourite } from '../Favourites/FavouritesModel'
import { useAuth } from '../../context/AuthContext'

export function useHomeViewModel() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Awaited<ReturnType<typeof getMovies>>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { user } = useAuth()

  const loadInitialMovies = async () => {
    setLoading(true)
    setError(null)

    try {
      const nextMovies = await initialMovies()
      setMovies(nextMovies)
      setQuery('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load movies.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadInitialMovies()
  }, [])

  // Listen for explicit "home:reload" events (dispatched by header Home link clicks)
  useEffect(() => {
    const handler = () => {
      void loadInitialMovies()
    }

    window.addEventListener('home:reload', handler)
    return () => window.removeEventListener('home:reload', handler)
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      const nextMovies = await getMovies(query)
      setMovies(nextMovies)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load movies.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle when the user favourites a movie from the Home screen.
   * - If the user is not authenticated, navigate to /favourites (the route will redirect to /auth).
   * - If authenticated, delegate to the existing saveFavourite function.
   */
  const handleFavourite = async (movie: Awaited<ReturnType<typeof getMovies>>[number]): Promise<void> => {
    if (!user) {
      // Redirect unauthenticated users to the favourites page (ProtectedRoute will forward them to /auth)
      navigate('/favourites')
      return
    }

    // For authenticated users, delegate to the existing favourites saving logic.
    try {
      await saveFavourite(user.uid, movie)
    } catch (err) {
      // Surface error to the local UI state if needed
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    handleFavourite,
  }
}
