import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { themeColors } from '../constants/Colors';
import { Tables } from '../database.types';
import { useClanActiveScore, useClanMemberNumber } from '../api/clan';
import RemoteImage from './RemoteImage';

type ClanListProps = {
  clan: Tables<'clans'>;
}

const ClanList = ({ clan }: ClanListProps) => {
  const { 
    data: clanMembersNumber,
    error: membersNumberError, 
    isLoading: membersNumberLoading
  } = useClanMemberNumber(clan.clan_id);

  const { 
    data: clanActiveScore, 
    error: clanActiveScoreError, 
    isLoading: clanActiveScoreLoading 
  } = useClanActiveScore(clan.clan_id);

  if (membersNumberLoading && clanActiveScoreLoading) {
    return (
      <View
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      >
        <ActivityIndicator className='my-4' size={30} color={themeColors.secondary} />
      </View>
    )
  }

  return (
    <AnimatedPressable 
      className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      pressInValue={0.98}
      onPress={() => router.push(`/clan/clan_details/${clan.clan_id}`)}
    >
      <View className='flex flex-row p-1'>
        {/* <Image
          className='w-12 h-14 rounded-xl'
          source={require('@asset/images/clan_logo/clan_logo_8.png')}
        /> */}
        <RemoteImage
          classNameAsProps='w-12 h-14 rounded-xl'
          path={clan.clan_logo} 
          fallback={require('@asset/images/clan_logo/clan_logo_1.png')}
          bucket='clan_logo'
        />
        <View className='flex-1 flex-col ml-3'>
          <Text style={{ color: themeColors.primary }} numberOfLines={1} className='font-bold text-xl mb-1'>{clan.clan_name}</Text>
          <View className='flex-row justify-around w-11/12'>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="user-group" size={18} color="rgba(9, 65, 240, 0.8)" />
              </View>
              <View className='bg-slate-200 px-2 rounded-lg w-[70]'>
                {/* <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>99/99</Text> */}
                <Text style={{ color: themeColors.primary }} className='text-center text-lg font-semibold'>{clanMembersNumber?.count ?? 0}/{clan.max_member}</Text>
              </View>
            </View>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
              </View>
              <View className='bg-slate-200 px-2 rounded-lg w-7/12'>
                {/* <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>9999</Text> */}
                <Text style={{ color: themeColors.primary }} className='text-lg text-center font-semibold'>{clanActiveScore ?? 0}</Text>
              </View>
            </View>
          </View>
        </View>
        
      </View>
      
    </AnimatedPressable>
  )
}

export default ClanList

const styles = StyleSheet.create({})