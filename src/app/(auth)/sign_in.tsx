import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { supabase } from '@/src/lib/supabase'
import { isLoaded } from 'expo-font'

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  async function signInWithEmail() {
    Keyboard.dismiss();
    setLoading(true);
    setIsError(false)

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log('Error')
      setIsError(true)
      setErrorMessage(error.message)
      setPassword('')
      setLoading(false)
      return
    }
    router.replace('/homepage');
    setLoading(false)
  }
  
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
            className='w-72 h-56 rounded-xl mx-auto mt-8 mb-6'
            source={require('@asset/images/ZetaFit.png')} 
          />

          {/* Sign In field */}
          <View className='bg-[#f8f8f8]/70 pt-2 pb-8 rounded-xl'>
            {/* email */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-xl mx-8 mt-2'>Email</Text>
              <TextInput
                value={email}
                style={{ color: themeColors.primary }}
                className={
                  `rounded-lg mx-8 p-1.5 
                  ${ isError 
                    ? 'border-b border-red-600' 
                    : 'border-b border-slate-400'
                  }`
                }
                placeholder='johndoe@mail.com' 
                onChangeText={setEmail}
              />
              { isError && <Text className='mx-10 my-1 text-red-600'>{errorMessage}</Text>}
            </View>
            
            {/* password */}
            <View className='py-1'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-xl mx-8'>Password</Text>
              <TextInput 
                value={password}
                secureTextEntry
                className={
                  `rounded-lg mx-8 p-1.5 
                  ${ isError 
                    ? 'border-b border-red-600' 
                    : 'border-b border-slate-400'
                  }`
                } 
                placeholder='johndoe@mail.com' 
                style={{ color: themeColors.primary }}
                onChangeText={setPassword}
              />
              { isError && <Text className='mx-10 my-1 text-red-600'>{errorMessage}</Text>}
              <Link href={'#'} asChild>
                <Text style={{ color: themeColors.primary }} className='text-right mx-8 mt-0.5 font-medium'>Forgot Password?</Text>
              </Link>
            </View>

            {/* Sign in button */}
            <AnimatedPressable
              style={{ backgroundColor: themeColors.primary }}
              className='rounded-full mx-auto p-2 w-56 mt-14 h-12'
              pressInValue={0.95}
              onPress={signInWithEmail}
              disabled={loading}
            >
              { loading 
                ? <ActivityIndicator size='large'  color='#ffffff' />
                : <Text className='font-semibold text-center text-white my-auto text-lg'>Sign In</Text>
              }
            </AnimatedPressable>

            {/* create account button */}
            <AnimatedPressable
              className='flex mx-auto p-2'
              pressInValue={0.95}
              onPress={() => router.replace('/sign_up')}
            >
              <Text style={{ color: themeColors.primary }} className='mx-auto text-lg font-semibold'>Create Account</Text>
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