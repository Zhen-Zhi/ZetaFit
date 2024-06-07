import { ImageBackground, StyleSheet, Text, View, Image, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import ClanMember from '@/src/components/ClanMember'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MemberScreen from './clanMember'
import TabLayout from './clanDetailTabs'
import { themeColors } from '@/src/constants/Colors'

const ClanDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const [haveClan, setHaveClan] = useState(false)

  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
    
    {/* Clan Details top part */}
    <View className='mt-4 mb-42 flex-1'>
      <Stack.Screen options={{ title: 'Clan Name' }} />
      <View className='flex-row mb-3'>
        <Image 
          className='w-32 h-40 ml-8 mr-4'
          source={require('@asset/images/clan_logo/clan_logo_1.png')}
        />
        <View className='flex-1 pr-4'>
          <Text style={{ color: themeColors.primary }} className='text-[24px] font-[800]'>Samsung galaxy</Text>
          <Text numberOfLines={4} style={{ color: themeColors.secondary }} className='font-semibold mt-1 text-left'>The quick brown fox jumps over the lazy dog.The quick brown fox jumps</Text>
          <AnimatedPressable 
            style={{ backgroundColor: haveClan ? themeColors.danger : themeColors.secondary }}
            className='w- rounded-xl p-3 mt-auto'
            pressInValue={0.95}
            onPress={() => setHaveClan(!haveClan)}
            >
            {haveClan 
              ? 
              <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-md text-center' >Leave Clan</Text>
              :
              <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-md text-center' >Join Clan</Text>
            }
          </AnimatedPressable>
        </View>
      </View>
      
      
      
      <TabLayout />
    </View>
    </ImageBackground>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})