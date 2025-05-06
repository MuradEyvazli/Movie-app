// app/movie/[id].tsx
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { bookmarkService } from '@/services/bookmarkService'

interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  runtime: number
  genres: Array<{ id: number; name: string }>
  production_countries: Array<{ name: string }>
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const {
    data: movie,
    loading,
    error
  } = useFetch<MovieDetails>(() => fetchMovieDetails(parseInt(id!)))

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (id) {
        const bookmarked = await bookmarkService.isBookmarked(parseInt(id))
        setIsBookmarked(bookmarked)
      }
    }
    checkBookmarkStatus()
  }, [id])

  const handleBookmark = async () => {
    if (!movie) return

    const bookmarkData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date
    }

    const wasAdded = await bookmarkService.toggleBookmark(bookmarkData)
    setIsBookmarked(wasAdded)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}min`
  }

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    )
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary p-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Image source={icons.backArrow} className="w-6 h-6" resizeMode="contain" tintColor="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-center">Failed to load movie details</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Backdrop Image */}
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
          className="h-64"
          resizeMode="cover"
        >
          <View className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary" />
          
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 mt-8">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="bg-black/50 p-2 rounded-full"
            >
              <Image source={icons.arrow} className="w-6 h-6" resizeMode="contain" tintColor="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleBookmark}
              className="bg-black/50 p-2 rounded-full"
            >
              <Image 
                source={icons.home} 
                className="w-6 h-6" 
                resizeMode="contain" 
                tintColor={isBookmarked ? "#FFD700" : "#fff"} 
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Content */}
        <View className="px-4 -mt-16">
          {/* Poster and Basic Info */}
          <View className="flex-row mb-6">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              className="w-32 h-48 rounded-lg shadow-lg"
              resizeMode="cover"
            />
            
            <View className="flex-1 ml-4 mt-auto">
              <Text className="text-white text-3xl font-bold mb-2">
                {movie.title}
              </Text>
              
              <View className="flex-row items-center mb-1">
                <Text className="text-yellow-400 text-xl font-bold">
                  ★ {movie.vote_average.toFixed(1)}
                </Text>
                <Text className="text-gray-400 ml-1">
                  ({movie.vote_count} votes)
                </Text>
              </View>
            </View>
          </View>

          {/* Movie Details Row */}
          <View className="flex-row items-center mb-6">
            <View className="bg-gray-800/60 px-3 py-1 rounded-full mr-2">
              <Text className="text-white text-sm">
                {new Date(movie.release_date).getFullYear()}
              </Text>
            </View>
            
            <View className="bg-gray-800/60 px-3 py-1 rounded-full mr-2">
              <Text className="text-white text-sm">
                {formatRuntime(movie.runtime)}
              </Text>
            </View>
            
            {movie.production_countries[0] && (
              <View className="bg-gray-800/60 px-3 py-1 rounded-full">
                <Text className="text-white text-sm">
                  {movie.production_countries[0].name}
                </Text>
              </View>
            )}
          </View>

          {/* Genres */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {movie.genres.map((genre, index) => (
              <View 
                key={genre.id}
                className="bg-dark-200 px-4 py-2 rounded-lg mr-2"
              >
                <Text className="text-gray-300">
                  {genre.name}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Overview */}
          <Text className="text-white text-2xl font-bold mb-3">
            Synopsis
          </Text>
          <Text className="text-gray-300 text-base leading-6 mb-8">
            {movie.overview}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row justify-between space-x-4 mb-8">
            <TouchableOpacity className="flex-1 bg-yellow-400 py-4 rounded-xl items-center">
              <Text className="text-black font-bold text-lg">Watch Trailer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleBookmark}
              className={`w-16 ${isBookmarked ? 'bg-yellow-400' : 'bg-gray-800'} py-4 rounded-xl items-center`}
            >
              <Image 
                source={icons.save} 
                className="w-6 h-6" 
                resizeMode="contain" 
                tintColor={isBookmarked ? "#000" : "#fff"} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity className="w-16 bg-gray-800 py-4 rounded-xl items-center">
              <Image source={icons.person} className="w-6 h-6" resizeMode="contain" tintColor="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails