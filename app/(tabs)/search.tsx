// app/search.tsx
import { View, Text, Image, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import SearchBar from '@/components/SearchBar'
import MovieCard from '@/components/MovieCard'
import { fetchMovies } from '@/services/api'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

const Search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  // Load default popular movies when component mounts
  useEffect(() => {
    const loadDefaultMovies = async () => {
      try {
        setLoading(true)
        const results = await fetchMovies({ query: '' })
        setMovies(results)
      } catch (err) {
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }
    loadDefaultMovies()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      // If search is cleared, load default movies again
      try {
        setLoading(true)
        const results = await fetchMovies({ query: '' })
        setMovies(results)
        setSearched(false)
      } catch (err) {
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSearched(true)
      const results = await fetchMovies({ query })
      setMovies(results)
    } catch (err) {
      setError('Failed to search movies')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleMoviePress = (id: number) => {
    router.push(`/movies/${id}`)
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20 }}
      >
        {/* Header */}
        <View className="px-5 flex-row items-center mb-8 mt-10">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <Image source={icons.arrow} className="w-6 h-6" resizeMode="contain" tintColor="#fff" />
          </TouchableOpacity>
          <Image source={icons.logo} className="w-10 h-8"/>
          <Text className="text-white text-xl font-bold ml-3">Search</Text>
        </View>
        
        {/* Search Bar */}
        <View className="px-4">
          <SearchBar 
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search movies..."
            autoFocus={true}
          />
          
          {/* Results */}
          {loading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#FFD700" />
              <Text className="text-white mt-4">
                {searched ? 'Searching...' : 'Loading movies...'}
              </Text>
            </View>
          ) : error ? (
            <View className="bg-red-500/10 rounded-xl p-4 mt-10">
              <Text className="text-red-400 text-center font-medium">
                {error}
              </Text>
            </View>
          ) : searched && movies.length === 0 ? (
            <View className="py-20">
              <Text className="text-white text-center text-lg">
                No results found for <span className='font-bold text-red-500'>"{searchQuery}"</span>
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Try different keywords
              </Text>
            </View>
          ) : movies.length > 0 ? (
            <>
              <Text className="text-white text-lg font-bold mt-8 mb-5">
                {searched ? `Search Results (${movies.length})` : 'Popular Movies'}
              </Text>
              <FlatList
                data={movies}
                renderItem={({item}) => (
                  <MovieCard 
                    id={item.id}
                    title={item.title}
                    poster_path={item.poster_path}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                    onPress={() => handleMoviePress(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 8
                }}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 40
                }}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default Search