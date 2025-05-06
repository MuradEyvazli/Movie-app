// MovieCard.tsx - Gradient yerine basit dark overlay kullanarak
import { View, Text,  TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'

interface MovieCardProps {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date?: string
  onPress?: () => void
}

const MovieCard = ({ id, title, poster_path, vote_average, release_date, onPress }: MovieCardProps) => {
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : undefined

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="w-[31%] mb-4"
      activeOpacity={0.7}
    >
      <View className="relative rounded-xl overflow-hidden shadow-lg bg-gray-800">
        {imageUrl ? (
          <ImageBackground 
            source={{ uri: imageUrl }}
            className="w-full aspect-[2/3]"
            resizeMode="cover"
          >
            {/* Dark overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-16 bg-black/60" />
          </ImageBackground>
        ) : (
          <View className="w-full aspect-[2/3] bg-gray-700 items-center justify-center">
            <Text className="text-gray-400 text-xs">No Image</Text>
          </View>
        )}
        
        <View className="absolute bottom-0 left-0 right-0 p-2">
          <Text 
            className="text-white text-xs font-bold" 
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row items-center">
              <Text className="text-yellow-400 text-[10px]">★</Text>
              <Text className="text-yellow-400 text-[10px] font-semibold ml-1">
                {vote_average.toFixed(1)}
              </Text>
            </View>
            {release_date && (
              <Text className="text-gray-400 text-[10px]">
                {new Date(release_date).getFullYear()}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MovieCard