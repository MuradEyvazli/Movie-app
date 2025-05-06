// components/SearchBar.tsx
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    onPress?: () => void
    placeholder?: string
    value?: string
    onChangeText?: (text: string) => void
    editable?: boolean
    autoFocus?: boolean
}

const SearchBar = ({
    onPress, 
    placeholder, 
    value, 
    onChangeText, 
    editable = true,
    autoFocus = false 
}: Props) => {
  if (onPress && !editable) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'
        activeOpacity={0.7}
      >
        <Image source={icons.search} className="size-5" resizeMode='contain' tintColor={'#baaddb'} />
        <Text className='flex-1 ml-2 text-[#baaddb]'>{placeholder}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className="size-5" resizeMode='contain' tintColor={'#baaddb'} />
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder} 
        placeholderTextColor={'#baaddb'} 
        className='flex-1 ml-2 text-white'
        autoFocus={autoFocus}
        selectionColor="#FFD700"
      />
    </View>
  )
}

export default SearchBar