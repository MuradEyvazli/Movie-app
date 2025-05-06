// services/bookmarkService.ts
import AsyncStorage from '@react-native-async-storage/async-storage'

interface BookmarkedMovie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

const STORAGE_KEY = '@saved_movies'

export const bookmarkService = {
  // Get all bookmarked movies
  async getBookmarkedMovies(): Promise<BookmarkedMovie[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
      console.error('Error reading bookmarked movies:', e)
      return []
    }
  },

  // Check if movie is bookmarked
  async isBookmarked(movieId: number): Promise<boolean> {
    try {
      const movies = await this.getBookmarkedMovies()
      return movies.some(movie => movie.id === movieId)
    } catch (e) {
      console.error('Error checking bookmark status:', e)
      return false
    }
  },

  // Toggle bookmark for a movie
  async toggleBookmark(movie: BookmarkedMovie): Promise<boolean> {
    try {
      const movies = await this.getBookmarkedMovies()
      const index = movies.findIndex(m => m.id === movie.id)
      
      if (index > -1) {
        // Remove from bookmarks
        movies.splice(index, 1)
      } else {
        // Add to bookmarks
        movies.push(movie)
      }
      
      const jsonValue = JSON.stringify(movies)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      
      return index === -1 // Return true if added, false if removed
    } catch (e) {
      console.error('Error toggling bookmark:', e)
      return false
    }
  },

  // Remove bookmark
  async removeBookmark(movieId: number): Promise<void> {
    try {
      const movies = await this.getBookmarkedMovies()
      const filteredMovies = movies.filter(movie => movie.id !== movieId)
      const jsonValue = JSON.stringify(filteredMovies)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      console.error('Error removing bookmark:', e)
    }
  }
}