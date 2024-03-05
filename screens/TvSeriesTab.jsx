import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../components/TopBar'

const TvSeriesTab = () => {
  return (
    
    <SafeAreaView className="bg-neutral-950 flex-1">
    <TopBar/>
  <View className="my-4 flex-row justify-around w-full items-center">
    <TouchableOpacity onPress={() => {}}>
      <Text className="text-white">Popular</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
      <Text className="text-white">Top Rated</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() =>{} }>
      <Text className="text-white">Latest</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>
  )
}

export default TvSeriesTab