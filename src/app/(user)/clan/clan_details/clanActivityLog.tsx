import { StyleSheet, Text, View, Image, ScrollView, TextInput, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '@/src/constants/Colors'
import { Stack, router } from 'expo-router';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const activityLog = [
  {
    id: 1,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Alice',
    message: 'Hello everyone!',
  },
  {
    id: 2,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Your name',
    message: 'Hey Alice, nice to meet you!',
  },
  {
    id: 3,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Bob',
    message: 'Welcome to the chat, Alice!',
  },
  {
    id: 4,
    profileImage: null,
    username: null,
    message: 'Bob joined the chat.',
  },
  {
    id: 5,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Your name',
    message: 'Looking forward to working with you all.',
  },
  {
    id: 6,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Charlie',
    message: 'Has anyone seen the latest update?',
  },
  {
    id: 7,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Alice',
    message: 'Yes, Charlie, it looks great!',
  },
  {
    id: 8,
    profileImage: null,
    username: null,
    message: 'System maintenance will occur at 00:00 UTCccc. what if this message is very long',
  },
  {
    id: 9,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Your name',
    message: 'Thanks for the update, system. what if this is long',
  },
  {
    id: 10,
    profileImage: require('@asset/images/CyberKongz.jpg'),
    username: 'Bob',
    message: 'Everyone, make sure to save your work.',
  },
  {
    id: 11,
    profileImage: null,
    username: null,
    message: 'Alice left the chat.',
  },
];

const ClanActivityLogScreen = () => {
  const [username, setUsername] = useState('')
  const [onBattle, setOnBattle] = useState(false)
  
  return (
    <KeyboardAvoidingView className='flex-1 justify-end'>
      <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >

      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-1 pb-2 px-4 border-b border-slate-300'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10 absolute left-3 bottom-2'
          onPress={() => router.back()}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-2xl font-bold'>Clan Name</Text>
      </View>

      <AnimatedPressable 
        className='border border-slate-500 rounded-lg py-0.5 px-2 m-2 bg-white'
        pressInValue={0.98}
        onPress={() => router.replace(`/clan/clan_details/${1}`)}
      >
        <View className='flex flex-row p-1'>
          <Image
            className='w-14 h-16 rounded-xl'
            source={require('@asset/images/clan_logo/clan_logo_4.png')}
          />
          <View className='flex-1 flex-col ml-3'>
            <Text style={{ color: themeColors.primary }} numberOfLines={1} className='font-bold text-xl mb-1'>Clan Name</Text>
            <View className='flex-row justify-between w-9/12'>
              <View className='flex-row'>
                <View className='m-auto mr-1'>
                  <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='bg-slate-200 rounded-lg px-2 text-lg font-semibold'>9999</Text>
              </View>
            </View>
          </View>
          {onBattle ? 
            <View className='flex-col'>
              <Image
                className='w-14 h-14 rounded-xl mx-auto'
                source={require('@asset/images/battle_active.png')}
              />
              <Text className='font-extrabold text-emerald-600'>On Battle</Text>
            </View>
            :
            <View>
              <Image
                className='w-14 h-14 rounded-xl mx-auto'
                source={require('@asset/images/battle_inactive.png')}
              />
              <Text className='font-extrabold text-red-600/60'>Off Battle</Text>
            </View>
          }
          
        </View>
      </AnimatedPressable>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView className='p-1'>
        {activityLog.map(( activity, index ) => {
          if (activity.username == null) {
            return (
              <View key={activity.id} className='bg-slate-200 border border-slate-400 rounded-lg mx-auto my-1 p-1 w-[80%]'>
                <Text className='text-center font-bold'>{activity.message}</Text>
              </View>
            )
          } else if (activity.username == 'Your name') {
            return (
              <View key={activity.id} className='bg-emerald-100 border border-slate-400 rounded-lg ml-auto mr-2 my-1 p-2 w-[75%] flex-row'>
                <View className='mx-2 justify-center flex-1'>
                  <Text className='font-bold'>{activity.username}</Text>
                  <Text className='text-left'>{activity.message}</Text>
                </View>
              </View>
            )
          } else {
            return (
              <View key={activity.id} className='bg-white border border-slate-400 rounded-lg mx-2 my-1 p-2 flex-row w-[75%]'>
                <Image
                  className='w-12 h-12'
                  source={require('@asset/images/CyberKongz.jpg')}
                />
                <View className='mx-2 justify-center flex-1'>
                  <Text className='font-bold'>{activity.username}</Text>
                  <Text className='text-left'>{activity.message}</Text>
                </View>
              </View>
            )
          }
        })}
      </ScrollView>
      </TouchableWithoutFeedback>

      <View className='flex-row p-3'>
        <TextInput 
          className='bg-white h-10 border border-slate-500 mx-1 rounded-lg p-2 flex-1'
          placeholder='Enter message'
          value={username}
          onChangeText={setUsername}
        />
        <AnimatedPressable
          className='bg-white border border-slate-500 px-2 mx-1 rounded-lg'
          pressInValue={0.95}
          onPress={() => setUsername('')}
        >
          <View className='m-auto'>
            <Ionicons name="chatbox-ellipses" size={24} color={themeColors.secondary} />
          </View>
        </AnimatedPressable>
      </View>
      </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ClanActivityLogScreen

const styles = StyleSheet.create({})