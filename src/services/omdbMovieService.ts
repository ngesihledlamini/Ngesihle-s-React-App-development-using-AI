const DEFAULT_API_URL = 'https://www.omdbapi.com/'

export type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type OmdbSearchResponse = {
  Search?: Movie[]
  Response: 'True' | 'False'
  Error?: string
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    throw new Error('Search query cannot be empty.')
  }

  const apiKey = import.meta.env.VITE_OMDB_API_KEY ?? import.meta.env.OMDB_API_KEY
  const apiUrl = import.meta.env.VITE_OMDB_API_URL ?? DEFAULT_API_URL

  if (!apiKey) {
    throw new Error('OMDb API key is missing. Set VITE_OMDB_API_KEY in your environment.')
  }

  const url = new URL(apiUrl)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('s', trimmedQuery)

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`OMDb request failed: ${response.status} ${response.statusText}`)
  }

  const data: OmdbSearchResponse = await response.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'OMDb returned an error for the requested search.')
  }

  return data.Search ?? []
}
