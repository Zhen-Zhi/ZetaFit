import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'

const LeaderboardMemberScreen = () => {
  return (
    <View>
      <AnimatedPressable
        onLongPress={() => {}}
        pressInValue={0.97}
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white my-0.5'
      >
        <View className='flex-row'>
          <Text className='text-xl font-bold my-auto ml-0.5 mr-1.5'>1</Text>
          <Image 
          source={require('@asset/images/CyberKongz.jpg')}
          className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>userName</Text>
              <Text className='font-semibold text-slate-600'>Clan Name</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
            <Image className='w-6 h-8' source={require('@asset/images/attack_icon.png')}/>
              <Text className='text-center text-lg rounded font-semibold ml-2'>9999</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </View>
  )
}

export default LeaderboardMemberScreen

const styles = StyleSheet.create({})