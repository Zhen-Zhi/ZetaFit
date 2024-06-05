import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'

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
          {/* Top image logo */}
          <Image
            className='w-72 h-56 rounded-xl mx-auto mt-10 mb-3'
            source={require('@asset/images/ZetaFit logo.png')} 
          />

          {/* sign up field */}
          <View className='bg-[#f8f8f8]/80 pt-2 pb-8 rounded-xl'>
            {/* email */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8 mt-2'>Email</Text>
              <TextInput 
                className='border-b border-slate-400 rounded-lg mx-8 p-1.5' 
                placeholder='johndoe@mail.com' 
                style={{ color: themeColors.primary }}
              />
            </View>
            
            {/* password */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8'>Password</Text>
              <TextInput 
                secureTextEntry
                className='border-b border-slate-400 rounded-lg mx-8 p-1.5' 
                placeholder='johndoe@mail.com' 
                style={{ color: themeColors.primary }}
              />
            </View>

            {/* confirm password */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8'>Confirm Password</Text>
              <TextInput 
                secureTextEntry
                className='border-b border-slate-400 rounded-lg mx-8 p-1.5' 
                placeholder='johndoe@mail.com'
                style={{ color: themeColors.primary }} 
              />
            </View>

            {/* create account button */}
            <AnimatedPressable
              style={{ backgroundColor: themeColors.primary }}
              className='rounded-full mx-auto p-2 w-56 mt-4 h-12'
              pressInValue={0.95}
              onPress={() => router.replace('/username')}
            >
              <Text className='font-semibold text-white text-center my-auto text-lg'>Create Account</Text>
            </AnimatedPressable>

            {/* sign in button */}
            <AnimatedPressable
              className='mx-auto flex p-2'
              pressInValue={0.95}
              onPress={() => router.replace('/sign_in')}
            >
              <Text style={{ color: themeColors.primary }}className='mx-auto text-lg font-semibold'>Sign In</Text>
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