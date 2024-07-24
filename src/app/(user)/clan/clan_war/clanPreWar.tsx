import { ImageBackground, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClanDetails, useUpdateBattleStatus } from '@/src/api/clan'
import { useAuth } from '@/src/providers/AuthProvider'
import { useUserClanMemberData } from '@/src/api/users'
import { useClanBattleStatusSubscription } from '@/src/api/clan/subscription'

const ClanPreWarScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { clan_id, battle_status } = useLocalSearchParams()
  const clanId = parseInt(typeof clan_id == 'string' ? clan_id : clan_id?.[0] ?? '0')
  const [clanWar, setClanWar] = useState(battle_status)

  const {
    data: clanData,
    error: clanDataError,
    isLoading: clanDataIsLoading,
  } = useClanDetails(clanId)

  const {
    data: userClanMemberData,
    isLoading: userClanMemberDataLoading,
    error: userClanMemberDataError,
  } = useUserClanMemberData(clanId, session?.user.id)

  useEffect(() => {
    if(clanData?.battle_status == "On Battle") {
      router.replace(`/clan/clan_war/clanWar?clan_id=${clan_id}`)
    }
  },[clanData?.battle_status])

  useClanBattleStatusSubscription(clanId);

  const { mutate: updateBattleStatus } = useUpdateBattleStatus()

  const searchingClanWar = () => {
    updateBattleStatus(
      { clanId, updateBattleStatus: { battle_status: "Searching" } }, 
      {
        onSuccess() {
          setClanWar("Searching")
        }
      }
    )
  }

  if (clanWar == 'Off Battle') {
    return (
      <SafeAreaView edges={['top']} className='flex-1'>
        <ImageBackground className='flex-1' source={require('@asset/images/background_image.png')}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pt-3 pb-2 px-4 border-b border-slate-300`}>
            <AnimatedPressable 
              pressInValue={0.9} 
              className='z-10 absolute left-3 bottom-2'
              onPress={() => router.back()}
            >
              <View className='p-1'>
                <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
            <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>BATTLEGROUND</Text>
          </View>

          <Image
            className='w-64 h-64 mx-auto mt-24'
            source={require('@asset/images/clan_war_logo.png')}
          />
          <Text className='text-xl font-bold text-center mt-2 text-slate-500'>No Active Clan War</Text>
          <AnimatedPressable
            style={{ backgroundColor: userClanMemberData?.role == "Member" ? themeColors.disabled : themeColors.secondary }}
            pressInValue={0.98}
            className='p-2 mx-auto rounded-lg mt-6 flex-row'
            onPress={searchingClanWar}
            disabled={userClanMemberData?.role == "Member"}
          >
            <View className='my-auto ml-3'>
              <FontAwesome6 name="magnifying-glass" size={24} color="white" />
            </View>
            <Text className='text-xl ml-3 mr-6 my-4 font-bold text-center text-white'>Search Battle</Text>
          </AnimatedPressable>
        </ImageBackground>
      </SafeAreaView>
    )
  } else if (clanWar == 'Searching') {
    return (
      <SafeAreaView edges={['top']} className='flex-1'>
        <ImageBackground className='flex-1' source={require('@asset/images/background_image.png')}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pt-3 pb-2 px-4 border-b border-slate-300`}>
            <AnimatedPressable 
              pressInValue={0.9} 
              className='z-10 absolute left-3 bottom-2'
              onPress={() => router.back()}
            >
              <View className='p-1'>
                <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
            <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>BATTLEGROUND</Text>
          </View>

          <Image
            className='w-64 h-64 mx-auto mt-24'
            source={require('@asset/images/magnifying_glass.png')}
          />
          <Text className='text-xl font-bold text-center mt-2 text-slate-500'>Searching For Clan War ......</Text>
          <ActivityIndicator size={64} className='mt-6' color={themeColors.tetiary} />
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

export default ClanPreWarScreen

const styles = StyleSheet.create({})