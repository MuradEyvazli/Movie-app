import { View, Text, Image, ImageBackground } from 'react-native'
import { images } from "@/constants/images"
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0D23',
          borderRadius: 40,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 43,
          position: 'absolute',
          bottom: 20,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23'
        }
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Home",
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <View className="items-center">
              {focused ? (
                <ImageBackground 
                  source={images.highlight} 
                  className="flex flex-row w-28 h-[50px] justify-center items-center rounded-full overflow-hidden"
                >
                  <Image 
                    source={icons.home} 
                    className="w-5 h-5"
                    tintColor="#151312"
                  />
                  <Text className="text-[#151312] text-base font-semibold ml-2">
                    Home
                  </Text>
                </ImageBackground>
              ) : (
                <View className="flex flex-row items-center">
                  <Image 
                    source={icons.home} 
                    className="w-5 h-5"
                    tintColor="#9E9E9E"
                  />
                </View>
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="search" 
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View className="items-center">
              {focused ? (
                <ImageBackground 
                  source={images.highlight} 
                  className="flex flex-row w-28 h-[50px] justify-center items-center rounded-full overflow-hidden"
                >
                  <Image 
                    source={icons.search} 
                    className="w-5 h-5"
                    tintColor="#151312"
                  />
                  <Text className="text-[#151312] text-base font-semibold ml-2">
                    Search
                  </Text>
                </ImageBackground>
              ) : (
                <View className="flex flex-row items-center">
                  <Image 
                    source={icons.search} 
                    className="w-5 h-5"
                    tintColor="#9E9E9E"
                  />
                </View>
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="saved" 
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View className="items-center">
              {focused ? (
                <ImageBackground 
                  source={images.highlight} 
                  className="flex flex-row w-28 h-[50px] justify-center items-center rounded-full overflow-hidden"
                >
                  <Image 
                    source={icons.star} 
                    className="w-5 h-5"
                    tintColor="#151312"
                  />
                  <Text className="text-[#151312] text-base font-semibold ml-2">
                    Saved
                  </Text>
                </ImageBackground>
              ) : (
                <View className="flex flex-row items-center">
                  <Image 
                    source={icons.star} 
                    className="w-5 h-5"
                    tintColor="#9E9E9E"
                  />
                </View>
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View className="items-center">
              {focused ? (
                <ImageBackground 
                  source={images.highlight} 
                  className="flex flex-row w-28 h-[50px] justify-center items-center rounded-full overflow-hidden"
                >
                  <Image 
                    source={icons.person} 
                    className="w-5 h-5"
                    tintColor="#151312"
                  />
                  <Text className="text-[#151312] text-base font-semibold ml-2">
                    Profile
                  </Text>
                </ImageBackground>
              ) : (
                <View className="flex flex-row items-center">
                  <Image 
                    source={icons.person} 
                    className="w-5 h-5"
                    tintColor="#9E9E9E"
                  />
                </View>
              )}
            </View>
          )
        }}
      />
    </Tabs>
  )
}

export default _layout