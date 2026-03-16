import axios from 'axios'

const API_KEY = '7d91016867f3580c66797e9cf405bf03'
const BASE_URL = 'https://api.themoviedb.org/3'

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
})

// Genre mapping
const genreMap: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
}

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  overview: string
  backdrop_path: string | null
}

export const fetchMovies = async (category: string): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get(`/movie/${category}`, {
      params: {
        page: 1
      }
    })
    
    const movies = response.data.results.map((movie: any) => ({
      ...movie,
      genre_names: movie.genre_ids.map((id: number) => genreMap[id] || 'Unknown')
    }))
    
    return movies
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error)
    throw error
  }
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page: 1
      }
    })
    
    const movies = response.data.results.map((movie: any) => ({
      ...movie,
      genre_names: movie.genre_ids.map((id: number) => genreMap[id] || 'Unknown')
    }))
    
    return movies
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error)
    throw error
  }
}

export const getMovieGenres = async (): Promise<Record<number, string>> => {
  try {
    const response = await tmdbApi.get('/genre/movie/list')
    const genres: Record<number, string> = {}
    response.data.genres.forEach((genre: any) => {
      genres[genre.id] = genre.name
    })
    return genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw error
  }
}