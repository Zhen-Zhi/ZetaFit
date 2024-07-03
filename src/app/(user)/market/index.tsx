import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const MarketplaceScreen = () => {
  return (
    <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require('@asset/images/background_image.png')}
        className='flex-1'
      >
        <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-2 pb-1 px-4 border-b border-slate-300'>
          <Text style={{ color: themeColors.primary }} className='text-center my-auto text-3xl font-extrabold'>Store</Text>
          <AnimatedPressable 
            pressInValue={0.9}
            className='z-10 absolute right-3 top-2.5'
            onPress={() => router.push('/pets/activityLog')}
          >
            <View className='my-auto'>
              <FontAwesome name='history' size={27} color={themeColors.primary} />
            </View>
          </AnimatedPressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default MarketplaceScreen

const styles = StyleSheet.create({})