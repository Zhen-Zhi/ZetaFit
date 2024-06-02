import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'

const SignInScreen = () => {
  return (
    <ImageBackground
      className='flex-1'
      source={require('@asset/images/background_image.png')}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
          className='flex-1 m-2 pt-2 justify-end'
        >
          {/* top image logo */}
          <Image
            className='w-72 h-56 rounded-xl mx-auto mt-16 mb-6'
            source={require('@asset/images/ZetaFit logo.png')} 
          />

          {/* username field */}
          <View className='bg-white/80 pt-2 pb-8 rounded-xl'>
            {/* username */}
            <View className='py-2'>
              <Text className='font-bold text-xl mx-8 mt-2'>Enter your username</Text>
              <TextInput 
                className='border-b border-slate-400 rounded-lg mx-8 p-3' 
                placeholder='John Doe' 
              />
              {/* validation ?? */}
              <Text className='mx-10 my-1 text-red-600'>This username is already taken!</Text>
            </View>

            {/* confirm button */}
            <AnimatedPressable
              className='rounded-full bg-sky-200 mx-auto p-2 w-56 mt-4 h-12'
              pressInValue={0.95}
              onPress={() => router.replace('/(user)/homepage')}
            >
              <Text className='font-semibold text-center my-auto text-lg'>Confirm</Text>
            </AnimatedPressable>
          </View>
        
          {/* Container to push content to the top as KeyboardAvoidingView need justify-end */}
          <View className='flex-1' />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})