import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import RemoteImage from './RemoteImage'

type LeaderBoardMemberScreenProps = {
  isUser: boolean;
  ranking: number;
  username: string;
  clanName: string;
  damage: number;
  profile_image: string | null | undefined;
}

const LeaderboardMemberScreen = ({ ranking, isUser, username, clanName, damage, profile_image }: LeaderBoardMemberScreenProps) => {
  return (
    <View>
      <AnimatedPressable
        onLongPress={() => {}}
        pressInValue={0.97}
        className={`border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white my-0.5
          ${ isUser ? 'bg-green-200' : 'bg-white' }`}
      >
        <View className='flex-row'>
          <Text className='text-xl font-bold my-auto ml-0.5 mr-1.5'>{ranking}</Text>
          {/* <Image 
            source={require('@asset/images/CyberKongz.jpg')}
            className='aspect-square w-14 h-14 rounded-xl'
          /> */}
          <RemoteImage
            classNameAsProps='aspect-square w-14 h-14 rounded-xl'
            path={profile_image} 
            fallback={require('@asset/images/default_profile.png')}
            bucket='avatars'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>{username}</Text>
              <Text className='font-semibold text-slate-600'>{clanName}</Text>
            </View>
            <View className={`flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2 ${ isUser ? 'bg-white' : 'bg-slate-200' }`}>
            <Image className='w-6 h-8' source={require('@asset/images/attack_icon.png')}/>
              <Text className='text-center text-lg rounded font-semibold ml-2'>{damage}</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </View>
  )
}

export default LeaderboardMemberScreen

const styles = StyleSheet.create({})