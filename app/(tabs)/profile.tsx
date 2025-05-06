// app/profile.tsx
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { bookmarkService } from '@/services/bookmarkService'

const ProfileOption = ({ icon, title, subtitle, onPress, showChevron = true, bgColor = 'bg-gray-800' }: {
  icon: any
  title: string
  subtitle?: string
  onPress: () => void
  showChevron?: boolean
  bgColor?: string
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`${bgColor} rounded-xl p-4 mb-3 flex-row items-center`}
      activeOpacity={0.7}
    >
      <Image source={icon} className="w-6 h-6" resizeMode="contain" tintColor="#FFD700" />
      <View className="flex-1 ml-4">
        <Text className="text-white text-base font-semibold">{title}</Text>
        {subtitle && <Text className="text-gray-400 text-sm">{subtitle}</Text>}
      </View>
      {showChevron && (
        <Text className="text-gray-400 text-lg">›</Text>
      )}
    </TouchableOpacity>
  )
}

const Profile = () => {
  const router = useRouter()
  const [savedMoviesCount, setSavedMoviesCount] = useState(0)
  
  useEffect(() => {
    const loadStats = async () => {
      const movies = await bookmarkService.getBookmarkedMovies()
      setSavedMoviesCount(movies.length)
    }
    loadStats()
  }, [])

  const handleLogin = () => {
    Alert.alert(
      'Login',
      'This feature will be implemented soon.',
      [{ text: 'OK', style: 'default' }]
    )
  }

  const handleSettings = () => {
    Alert.alert(
      'Settings',
      'App settings coming soon.',
      [{ text: 'OK', style: 'default' }]
    )
  }

  const handlePrivacy = () => {
    Alert.alert(
      'Privacy Policy',
      'Privacy policy will be available here.',
      [{ text: 'OK', style: 'default' }]
    )
  }

  const handleTerms = () => {
    Alert.alert(
      'Terms & Conditions',
      'Terms and conditions will be available here.',
      [{ text: 'OK', style: 'default' }]
    )
  }

  const handleHelpCenter = () => {
    Alert.alert(
      'Help Center',
      'How can we help you?',
      [
        { text: 'Report a Problem', onPress: () => {} },
        { text: 'FAQ', onPress: () => {} },
        { text: 'Contact Us', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    )
  }

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Movie Browser App\nVersion 1.0.0\n\nBuilt with React Native + Expo',
      [{ text: 'OK', style: 'default' }]
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      
      <SafeAreaView className="flex-1">
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="px-6 pt-6 pb-8">
            <Text className="text-white text-4xl font-bold mb-2">
              Profile
            </Text>
            <Text className="text-gray-400 text-base">
              Manage your account and preferences
            </Text>
          </View>

          {/* User Info Section */}
          <View className="px-6 mb-6">
            <View className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl p-6 flex-row items-center">
              <View className="w-20 h-20 rounded-full bg-yellow-400 items-center justify-center mr-4">
                <Text className="text-black text-2xl font-bold">G</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-bold mb-1">
                  Guest User
                </Text>
                <TouchableOpacity 
                  onPress={handleLogin}
                  className="bg-yellow-400 px-4 py-2 rounded-lg self-start"
                >
                  <Text className="text-black font-semibold">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="px-6 mb-8">
            <View className="flex-row justify-between">
              <View className="bg-gray-800 flex-1 mr-2 p-6 rounded-xl items-center">
                <Text className="text-3xl font-bold text-white">{savedMoviesCount}</Text>
                <Text className="text-gray-400 mt-1">Saved Movies</Text>
              </View>
              <View className="bg-gray-800 flex-1 ml-2 p-6 rounded-xl items-center">
                <Text className="text-3xl font-bold text-white">0</Text>
                <Text className="text-gray-400 mt-1">Recently Watched</Text>
              </View>
            </View>
          </View>

          {/* Profile Options */}
          <View className="px-6">
            <Text className="text-gray-400 text-sm font-medium mb-3">ACCOUNT</Text>
            
            <ProfileOption
              icon={icons.person}
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => {}}
            />
            <ProfileOption
              icon={icons.arrow}
              title="Watch History"
              subtitle="Recently viewed movies"
              onPress={() => {}}
            />
            <ProfileOption
              icon={icons.arrow}
              title="My Library"
              subtitle={`${savedMoviesCount} saved movies`}
              onPress={() => router.push('/saved')}
            />

            <Text className="text-gray-400 text-sm font-medium mb-3 mt-8">PREFERENCES</Text>
            
            <ProfileOption
              icon={icons.arrow}
              title="Settings"
              subtitle="App preferences & notifications"
              onPress={handleSettings}
            />
            <ProfileOption
              icon={icons.arrow}
              title="Playback Settings"
              subtitle="Quality & autoplay preferences"
              onPress={() => {}}
            />

            <Text className="text-gray-400 text-sm font-medium mb-3 mt-8">SUPPORT</Text>
            
            <ProfileOption
              icon={icons.arrow}
              title="Help Center"
              subtitle="FAQs & support"
              onPress={handleHelpCenter}
            />
            <ProfileOption
              icon={icons.arrow}
              title="Privacy Policy"
              onPress={handlePrivacy}
            />
            <ProfileOption
              icon={icons.arrow}
              title="Terms & Conditions"
              onPress={handleTerms}
            />
            <ProfileOption
              icon={icons.person}
              title="About"
              onPress={handleAbout}
            />

            {/* Logout Button */}
            <TouchableOpacity 
              onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
              className="bg-red-500/20 rounded-xl p-4 mb-3 flex-row items-center mt-8"
              activeOpacity={0.7}
            >
              <Image source={icons.person} className="w-6 h-6" resizeMode="contain" tintColor="#EF4444" />
              <Text className="text-red-500 text-base font-semibold ml-4">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default Profile