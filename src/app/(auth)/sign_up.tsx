import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conFirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorType, setErrorType] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function signUpWithEmail() {
    const emailError = ['user_already_exists', 'validation_failed', 'anonymous_provider_disabled', 'unexpected_failure'];
    const passwordError = ['weak_password'];

    setLoading(true);
    setErrorType('')
    if (password != conFirmPassword) {
      setErrorType('password');
      setErrorMessage('Password not same with confirm password')
      return
    }


    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error.code) {
        if (emailError.includes(error.code)) {
          setErrorType('email')
        }
        else if (passwordError.includes(error.code)) {
          setErrorType('password')
        }
      }
      setErrorMessage(error.message)
      console.log(error.code + ' : ' + error.message);
      setLoading(false);
      return
    };
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
            className='w-72 h-56 rounded-xl mx-auto mt-10 mb-3'
            source={require('@asset/images/ZetaFit.png')} 
          />

          {/* sign up field */}
          <View className='bg-[#f8f8f8]/80 pt-2 pb-8 rounded-xl'>
            {/* email */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8 mt-2'>Email</Text>
              <TextInput 
                className={
                  `rounded-lg mx-8 p-1.5 
                  ${ errorType == 'email' 
                    ? 'border-b border-red-600' 
                    : 'border-b border-slate-400'
                  }`
                }
                placeholder='johndoe@mail.com' 
                style={{ color: themeColors.primary }}
                onChangeText={setEmail}
              />
              { errorType == 'email' && <Text className='mx-10 my-1 text-red-600'>{errorMessage}</Text>}
            </View>
            
            {/* password */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8'>Password</Text>
              <TextInput 
                secureTextEntry
                className={
                  `rounded-lg mx-8 p-1.5
                  ${ errorType == 'password' 
                    ? 'border-b border-red-600' 
                    : 'border-b border-slate-400'
                  }`
                }
                placeholder='johndoe@mail.com' 
                style={{ color: themeColors.primary }}
                onChangeText={setPassword}
              />
              { errorType == 'password' && <Text className='mx-10 my-1 text-red-600'>{errorMessage}</Text>}
            </View>

            {/* confirm password */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-lg mx-8'>Confirm Password</Text>
              <TextInput 
                secureTextEntry
                className='border-b border-slate-400 rounded-lg mx-8 p-1.5' 
                placeholder='johndoe@mail.com'
                style={{ color: themeColors.primary }} 
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* create account button */}
            <AnimatedPressable
              style={{ backgroundColor: themeColors.primary }}
              className='rounded-full mx-auto p-2 w-56 mt-4 h-12'
              pressInValue={0.95}
              // onPress={() => router.replace('/username')}
              onPress={signUpWithEmail}
              disabled={loading}
            >
              {
                loading
                  ?
                <ActivityIndicator className='my-auto' size={28} color='white' />
                  :
                <Text className='font-semibold text-white text-center my-auto text-lg'>Create Account</Text>
              }
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