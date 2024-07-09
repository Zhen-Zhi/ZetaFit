import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { themeColors } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const ClanLoadingScreenComponent = () => {
  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <ImageBackground
        source={require('@asset/images/background_image.png')} 
        className='flex-1'
      >
        <Stack.Screen options={{ headerShown: false }} />
        {/* top bar */}
        <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pb-2 px-4 border-b border-slate-300`}>
          <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>CLAN</Text>
        </View>
        <ActivityIndicator className='m-auto p-4 bg-white/50' size={100} color={themeColors.secondary} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default ClanLoadingScreenComponent

const styles = StyleSheet.create({})