import { searchMovies, type Movie } from '../../services/omdbMovieService'

const INITIAL_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

export async function getMovies(query: string): Promise<Movie[]> {
  const cleanedQuery = query.trim()

  if (cleanedQuery.length < 2) {
    throw new Error('Search query must contain at least 2 characters.')
  }

  return searchMovies(cleanedQuery)
}

function shuffle<T>(items: T[]): T[] {
  const nextItems = [...items]

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]]
  }

  return nextItems
}

export async function initialMovies(): Promise<Movie[]> {
  const randomKeywords = shuffle(INITIAL_KEYWORDS)

  const movieResults = await Promise.all(
    randomKeywords.map(async (keyword) => {
      try {
        return await searchMovies(keyword)
      } catch {
        return []
      }
    }),
  )

  const mergedMovies = movieResults.flat()
  const uniqueMovies = mergedMovies.filter(
    (movie, index, list) => list.findIndex((item) => item.imdbID === movie.imdbID) === index,
  )

  const shuffledMovies = shuffle(uniqueMovies)

  return shuffledMovies.slice(0, 20)
}

export class HomeModel {
  static async getMovies(query: string): Promise<Movie[]> {
    return getMovies(query)
  }

  static async initialMovies(): Promise<Movie[]> {
    return initialMovies()
  }
}
