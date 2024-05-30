import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'

const SignInScreen = () => {
  return (
    <View className='flex-1 bg-slate-100'>
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >
        <Stack.Screen options={{ title: 'Sign in' }} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
          className='flex-1 m-2 pt-2 justify-end'
        >
          <Image
            className='w-72 h-56 rounded-xl mx-auto mt-16 mb-6'
            source={require('@asset/images/ZetaFit logo.png')} 
          />

          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
          >
            <View className='bg-white/80 pt-2 pb-8 rounded-xl'>
            <View className='py-2'>
              <Text className='font-bold text-xl mx-8 mt-2'>Email</Text>
              <TextInput 
                className='border-b border-slate-400 rounded-lg mx-8 p-3' 
                placeholder='johndoe@mail.com' 
              />
            </View>
            
            <View className='py-1'>
              <Text className='font-bold text-xl mx-8'>Password</Text>
              <TextInput 
                secureTextEntry
                className='border-b border-slate-400 rounded-lg mx-8 p-3' 
                placeholder='johndoe@mail.com' 
              />
              <Link href={''} asChild>
                <Text className='text-right mx-8 mt-0.5'>Forgot Password?</Text>
              </Link>
            </View>

            <AnimatedPressable
              className='rounded-full bg-sky-200 mx-auto p-2 w-56 mt-4 h-12'
              pressInValue={0.95}
            >
              <Text className='font-semibold text-center my-auto text-lg'>Sign In</Text>
            </AnimatedPressable>
            <AnimatedPressable
              className='flex mx-auto p-2'
              pressInValue={0.95}
              onPress={() => router.replace('')}
            >
              <Text className='mx-auto text-lg font-semibold text-blue-700'>Create Account</Text>
            </AnimatedPressable>
            </View>
          </TouchableWithoutFeedback>
          
          {/* Container to push content to the top as KeyboardAvoidingView need justify-end */}
          <View className='flex-1' />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})