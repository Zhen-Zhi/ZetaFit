import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tables } from '@/src/database.types';
import dayjs from 'dayjs';

type ClanWarAttackDetialsScreenProps = {
  details: Tables<'clan_war_details'> & { users: Tables<'users'> };
}

const ClanWarDefenseDetialsScreen = ({ details }: ClanWarAttackDetialsScreenProps) => {
  return (
    <View className='border border-slate-400 p-2 mx-2 mb-1 rounded-lg flex-row bg-white/50 justify-between'>
      <View className='flex-row'>
        <Image className='w-8 h-9 my-auto mr-2' source={require('@asset/images/defense_icon.png')} />
        <Image
          className='aspect-square w-12 h-12 rounded'
          source={require('@asset/images/CyberKongz.jpg')}
          />
        <View>
          <Text className='font-bold text-lg mx-2'>{details.users.username}</Text>
          <Text className='font-medium text-slate-500 mx-2'>{dayjs(details.created_at).format('MM-DD HH:mm:ss')}</Text>
        </View>
      </View>
      <Text className='font-bold text-lg my-auto mx-2 w-12 text-right'>{details.contribute}</Text>
    </View>
  )
}

export default ClanWarDefenseDetialsScreen

const styles = StyleSheet.create({})