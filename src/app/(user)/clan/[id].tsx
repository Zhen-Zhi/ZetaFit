import { ImageBackground, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import ClanMember from '@/src/components/ClanMember'

const ClanDetailsScreen = () => {
  const { id } = useLocalSearchParams()

  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >

    {/* container */}
    <View className='mx-4 mt-4'> 
      <Stack.Screen options={{ title: id?.toString() }} />
      {/* Clan Details top part */}
      <View className='bg-white border p-4 rounded-xl shadow shadow-slate-400'>
        <View className='flex-row'>
          <Image 
            className='aspect-square w-32 h-32 rounded-xl'
            source={require('@asset/images/CyberKongz.jpg')}
          />
          <View className='flex-col flex-1 ml-4'>
            <Text className='font-bold text-lg'>Clan Name</Text>
            <View className='flex-row'>
              <Text className='font-semibold rounded-lg flex-1 py-2'>Clan Desc</Text>
            </View>
          </View>
        </View>
        <View className='flex-row mt-3 justify-between'>
          <View className='m-auto w-8'>
            <FontAwesome6 name="fire" size={32} color="rgba(240, 93, 9, 0.8)" />
          </View>
          <Text className='bg-slate-200 rounded flex-1 font-extrabold text-center text-xl ml-1 mr-5 py-1'>99999</Text>
          <View className='m-auto w-8'>
            <FontAwesome6 name="user-group" size={24} color="rgba(9, 65, 240, 0.8)" />
          </View>
          <Text className='bg-slate-200 rounded flex-1 font-extrabold text-center text-xl ml-1 py-1'>10/20</Text>
        </View>
      </View>

      <View className='border flex-row justify-between mt-6 px-3 py-2 rounded-t-xl bg-white'>
        <Text className='text-lg font-semibold my-auto'>Members</Text>
        <AnimatedPressable 
          className='bg-sky-500 my-2 p-2 rounded-lg px-4'
          pressInValue={0.9}
        >
          <Text className='font-semibold text-white text-[16px]'>Join Clan</Text>
        </AnimatedPressable>
      </View>

      

      <FlatList
        className='mt-1 mb-2 mx-0.5'
        data={[1,2,3,4,5,6,7,8,9,10]}
        renderItem={({ item }) => <ClanMember />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 3 }}
      />
    </View>
    </ImageBackground>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})