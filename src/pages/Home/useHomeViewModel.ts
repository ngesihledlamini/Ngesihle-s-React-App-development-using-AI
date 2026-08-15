import { useEffect, useState } from 'react'

import { getMovies, initialMovies } from './HomeModel'

export function useHomeViewModel() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Awaited<ReturnType<typeof getMovies>>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
  }
}
