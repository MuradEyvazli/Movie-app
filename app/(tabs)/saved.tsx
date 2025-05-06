// app/saved.tsx
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter, useFocusEffect } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { bookmarkService } from '@/services/bookmarkService'

interface BookmarkedMovie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

const SavedMovieCard = ({ movie, onPress, onRemove }: { movie: BookmarkedMovie, onPress: () => void, onRemove: () => void }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mb-4 rounded-xl overflow-hidden bg-gray-800"
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        className="h-48"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Remove button */}
        <TouchableOpacity 
          onPress={onRemove}
          className="absolute top-3 right-3 bg-red-500 p-2 rounded-full"
          style={{ elevation: 5, shadowOpacity: 0.3 }}
        >
          <Image source={icons.arrow} className="w-4 h-4" />
        </TouchableOpacity>
        
        {/* Movie Info */}
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-white text-2xl font-bold mb-1">
            {movie.title}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-yellow-400 text-base font-bold">★ {movie.vote_average.toFixed(1)}</Text>
            <Text className="text-gray-300 text-base ml-2">
              • {new Date(movie.release_date).getFullYear()}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const Saved = () => {
  const router = useRouter()
  const [savedMovies, setSavedMovies] = useState<BookmarkedMovie[]>([])
  const [loading, setLoading] = useState(true)
  
  const loadBookmarkedMovies = async () => {
    try {
      setLoading(true)
      const movies = await bookmarkService.getBookmarkedMovies()
      setSavedMovies(movies)
    } catch (error) {
      console.error('Error loading bookmarked movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadBookmarkedMovies()
    }, [])
  )
  
  const handleMoviePress = (id: number) => {
    router.push(`/movies/${id}`)
  }

  const handleRemoveBookmark = async (movieId: number) => {
    await bookmarkService.removeBookmark(movieId)
    loadBookmarkedMovies() // Refresh the list
  }

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      
      <SafeAreaView className="flex-1">
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="px-6 flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-white text-4xl font-bold">
                My Library
              </Text>
              <Text className="text-gray-400 text-lg mt-1">
                {savedMovies.length} {savedMovies.length === 1 ? 'movie' : 'movies'} saved
              </Text>
            </View>
            <Image source={icons.star} className="w-8 h-8" resizeMode="contain" tintColor="#FFD700" />
          </View>
          
          {/* Content */}
          <View className="px-6">
            {savedMovies.length === 0 ? (
              <View className="flex-1 items-center justify-center py-32">
                <View className="w-32 h-32 rounded-full bg-gray-800/50 items-center justify-center mb-8">
                  <Image 
                    source={icons.home} 
                    className="w-16 h-16" 
                    resizeMode="contain" 
                    tintColor="#4A4458"
                  />
                </View>
                <Text className="text-white text-3xl font-bold mb-3">
                  Your Library is Empty
                </Text>
                <Text className="text-gray-400 text-center text-base mb-8 max-w-[280px]">
                  Movies you bookmark will appear here for you to watch later
                </Text>
                <TouchableOpacity 
                  onPress={() => router.push('/(tabs)')}
                  className="bg-yellow-400 px-10 py-4 rounded-xl active:bg-yellow-500"
                >
                  <Text className="text-black font-bold text-lg">
                    Discover Movies
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={savedMovies}
                renderItem={({item}) => (
                  <SavedMovieCard
                    movie={item}
                    onPress={() => handleMoviePress(item.id)}
                    onRemove={() => handleRemoveBookmark(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Saved