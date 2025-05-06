// app/index.tsx
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { 
  ActivityIndicator, 
  FlatList, 
  Image, 
  ScrollView, 
  Text, 
  View,
  ImageBackground 
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingMovies from "@/components/TrendingMovies";
import { SafeAreaView } from 'react-native-safe-area-context';

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

export default function Index() {
  const router = useRouter();
  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch<Movie[]>(() => fetchMovies({query: ''}))
  
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
        <View className="px-5 items-center">
          <Image source={icons.logo} className="w-16 h-14 mb-8 mt-14"/>
        </View>
        
        {/* Content */}
        <View className="px-4">
          {moviesLoading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#FFD700" />
              <Text className="text-white mt-4">Loading movies...</Text>
            </View>
          ) : moviesError ? (
            <View className="bg-red-500/10 rounded-xl p-4 mt-10">
              <Text className="text-red-400 text-center font-medium">
                Error: {moviesError.message}
              </Text>
            </View>
          ) : (
            <>
              <SearchBar 
                onPress={() => router.push('/search')}
                placeholder="Search movies, actors..."
                editable={false} // Tıklanabilir ama edit edilemez
              />
              
              {/* Trending Section */}
              <View className="mt-8">
                <TrendingMovies 
                  movies={movies}
                  onMoviePress={handleMoviePress}
                />
              </View>
              
              <Text className="text-2xl text-white font-bold mt-2 mb-5">
                Popular Now
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}