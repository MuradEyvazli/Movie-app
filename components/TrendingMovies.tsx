// components/TrendingMovies.tsx
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

interface TrendingMovieCardProps {
  movie: Movie
  rank: number
  onPress: () => void
}

const TrendingMovieCard = ({ movie, rank, onPress }: TrendingMovieCardProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-40 mr-4"
      activeOpacity={0.7}
    >
      <View className="relative h-24 rounded-lg overflow-hidden">
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Rank Number */}
        <View className="absolute top-0 left-0 w-8 h-8 bg-yellow-400 rounded-br-lg items-center justify-center">
          <Text className="text-black font-bold text-lg">{rank}</Text>
        </View>
        
        {/* Movie Info */}
        <View className="absolute bottom-2 left-2 right-2">
          <Text className="text-white font-bold" numberOfLines={1}>
            {movie.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-400 text-xs">★ {movie.vote_average.toFixed(1)}</Text>
            <Text className="text-gray-300 text-xs ml-2">
              {new Date(movie.release_date).getFullYear()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

interface TrendingMoviesProps {
  movies?: Movie[]
  onMoviePress: (id: number) => void
}

const TrendingMovies = ({ movies, onMoviePress }: TrendingMoviesProps) => {
  if (!movies || movies.length === 0) return null

  return (
    <View className="mb-6">
      <Text className="text-lg text-white font-bold mb-4">
        Top 10 Movies This Week
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <TrendingMovieCard
            key={movie.id}
            movie={movie}
            rank={index + 1}
            onPress={() => onMoviePress(movie.id)}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default TrendingMovies