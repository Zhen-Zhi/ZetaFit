import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { themeColors } from '../constants/Colors';
import { Tables } from '../database.types';
import { useClanActiveScore, useClanMemberNumber } from '../api/clan';

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
    return <ActivityIndicator />
  }

  return (
    // <Link href={`/clan/clan_details/${clan.clan_id}`} asChild>
    <AnimatedPressable 
      className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      pressInValue={0.98}
      onPress={() => router.push(`/clan/clan_details/${clan.clan_id}`)}
    >
      <View className='flex flex-row p-1'>
        <Image
          className='w-12 h-14 rounded-xl'
          source={require('@asset/images/clan_logo/clan_logo_8.png')}
        />
        <View className='flex-1 flex-col ml-3'>
          <Text style={{ color: themeColors.primary }} numberOfLines={1} className='font-bold text-xl mb-1'>{clan.clan_name}</Text>
          <View className='flex-row justify-between w-9/12'>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="user-group" size={18} color="rgba(9, 65, 240, 0.8)" />
              </View>
              <View className='bg-slate-200 px-2 rounded-lg'>
                {/* <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>{clanMembersData?.numberOfMember}/{clan.max_member}</Text> */}
                <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>{clanMembersNumber?.count}/{clan.max_member}</Text>
              </View>
            </View>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
              </View>
              <View className='bg-slate-200 px-2 rounded-lg'>
                {/* <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>9999</Text> */}
                <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>{clanActiveScore}</Text>
              </View>
            </View>
          </View>
        </View>
        
      </View>
      
    </AnimatedPressable>
    // </Link>
  )
}

export default ClanList

const styles = StyleSheet.create({})