import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Platform, ImageBackground, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, router } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { useUpdateUsername } from '@/src/api/users'
import { useAuth } from '@/src/providers/AuthProvider'

type EnterUsernameModalProps = {
  onClose : () => void;
}

const EnterUsernameModal = ({ onClose }: EnterUsernameModalProps) => {
  const { session  } = useAuth();
  const userId = session?.user.id;

  const [username, setUsername] = useState('');
  const errorHandler: {code?: string | null} = {};
  const [loading, setLoading] = useState(false)


  const { mutate: updateUsername, error } = useUpdateUsername();
  if (error && error.message) {
    errorHandler.code = error.message.split(":")[0];
  }

  const handleUpdateUsername = async () => {
    setLoading(true)
    Keyboard.dismiss();
    delete errorHandler.code;

    updateUsername(
      { userId , username },
      {
        onSuccess() {
          onClose();
        },
      },
    )
    setLoading(false)
  }

  return (
    <ImageBackground
      className='flex-1 pt-10'
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
            className='w-72 h-56 rounded-xl mx-auto mt-8 mb-6'
            source={require('@asset/images/ZetaFit logo.png')} 
          />

          {/* username field */}
          <View className='bg-[#f8f8f8]/70 pt-2 pb-8 rounded-xl'>
            {/* username */}
            <View className='py-2'>
              <Text style={{ color: themeColors.primary }} className='font-bold text-xl mx-8 mt-2'>Enter your username</Text>
              <TextInput 
                editable={!loading}
                className={
                  `rounded-lg mx-8 p-3 
                  ${ !loading && errorHandler.code != null
                    ? 'border-b border-red-600' 
                    : 'border-b border-slate-400'
                  }`
                }
                placeholder='John Doe'
                style={{ color: themeColors.primary }} 
                onChangeText={setUsername}
                maxLength={20}
              />
              {/* validation ?? */}
              { !loading && errorHandler.code == '23505' 
                // duplicate key value violates unique constraint "profiles_username_key"
                  ? <Text className='mx-10 my-1 text-red-600'>This username is already taken!</Text>
                  : 
                !loading && errorHandler.code == '23514'
                //new row for relation "profiles" violates check constraint "username_length"
                  ? <Text className='mx-10 my-1 text-red-600'>Username must more than 3 characters!</Text>
                  : 
                !loading && errorHandler.code != null
                  && <Text className='mx-10 my-1 text-red-600'>Unexpected error. Please try again.</Text>
              }
            </View>

            {/* confirm button */}
            <AnimatedPressable
              style={{ backgroundColor: themeColors.primary }}
              className='rounded-full bg-sky-200 mx-auto p-2 w-56 mt-10 h-12'
              pressInValue={0.95}
              onPress={handleUpdateUsername}
              disabled={loading}
            >
              { loading
                ? <ActivityIndicator size='large'  color='#ffffff' />
                : <Text className='font-semibold text-white text-center my-auto text-lg'>Confirm</Text>
              }
            </AnimatedPressable>
          </View>
        
          {/* Container to push content to the top as KeyboardAvoidingView need justify-end */}
          <View className='flex-1' />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default EnterUsernameModal

const styles = StyleSheet.create({})