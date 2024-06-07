import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { themeColors } from '../constants/Colors';

type Clan = {
  id: number;
  clanName: string;
  numberOfMember: number;
  maxMember: number;
  activeScore: number;
}

type ClanListProps = {
  clan: Clan; // Use Clan type
}

const ClanList = ({ clan }: ClanListProps) => {
  return (
    <Link href={`/clan/clan_details/${clan.id}`} asChild>
    <AnimatedPressable 
      className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      pressInValue={0.98}
      // onPress={() => router.push(`/clan/${clan.id}`)}
      onPress={() => console.log(`In ${clan.clanName}`)}
    >
      <View className='flex flex-row p-1'>
        <Image
          className='w-10 h-14 rounded-xl'
          source={require('@asset/images/logo_clan.png')}
        />
        <View className='flex-1 flex-col ml-3'>
          <Text style={{ color: themeColors.primary }} numberOfLines={1} className='font-bold text-xl mb-1'>{clan.clanName}</Text>
          <View className='flex-row justify-between w-9/12'>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="user-group" size={18} color="rgba(9, 65, 240, 0.8)" />
              </View>
              <Text style={{ color: themeColors.primary }} className=' bg-slate-200 rounded-lg px-2 text-lg font-semibold'>{clan.numberOfMember}/{clan.maxMember}</Text>
            </View>
            <View className='flex-row'>
              <View className='m-auto mr-1'>
                <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
              </View>
              <Text style={{ color: themeColors.primary }} className=' bg-slate-200 rounded-lg px-2 text-lg font-semibold'>{clan.activeScore}</Text>
            </View>
          </View>
        </View>
        
      </View>
      
    </AnimatedPressable>
    </Link>
  )
}

export default ClanList

const styles = StyleSheet.create({})