import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ClanWarAttackDetialsScreen = () => {
  return (
    <View className='border border-slate-400 p-2 mx-2 mb-1 rounded-lg flex-row bg-white/50 justify-between'>
      <View className='flex-row'>
        <Image className='w-6 h-8 my-auto mr-2' source={require('@asset/images/attack_icon.png')} />
        <Image
          className='aspect-square w-12 h-12 rounded'
          source={require('@asset/images/CyberKongz.jpg')}
          />
        <View>
          <Text className='font-bold text-lg mx-2'>Username</Text>
          <Text className='font-medium text-slate-500 mx-2'>12:00:00</Text>
        </View>
      </View>
      <Text className='font-bold text-lg my-auto mx-2 w-12 text-right'>9999</Text>
    </View>
  )
}

export default ClanWarAttackDetialsScreen

const styles = StyleSheet.create({})