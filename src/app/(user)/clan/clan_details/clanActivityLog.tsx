import { StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { themeColors } from '@/src/constants/Colors'

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
  return (
    <View className=''>
      <ScrollView className='p-1 mb-16'>
        {activityLog.map(( activity, index ) => {
          if (activity.username == null) {
            return (
              <View className='bg-slate-200 border border-slate-400 rounded-lg mx-auto my-1 p-1 w-[80%]'>
                <Text className='text-center font-bold'>{activity.message}</Text>
              </View>
            )
          } else if (activity.username == 'Your name') {
            return (
              <View className='bg-emerald-100 border border-slate-400 rounded-lg ml-auto mr-2 my-1 p-2 w-[75%] flex-row'>
                <View className='mx-2 justify-center flex-1'>
                  <Text className='font-bold'>{activity.username}</Text>
                  <Text className='text-left'>{activity.message}</Text>
                </View>
              </View>
            )
          } else {
            return (
              <View className='bg-white border border-slate-400 rounded-lg mx-2 my-1 p-2 flex-row w-[75%]'>
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
        {/* <View className='h-10 border m-3'>
          <Text>This is the testing</Text>
        </View> */}
      </ScrollView>
      <View className='absolute h-10 border m-3 bottom-0'>
        <Text>This is the testing</Text>
      </View>
    </View>
  )
}

export default ClanActivityLogScreen

const styles = StyleSheet.create({})