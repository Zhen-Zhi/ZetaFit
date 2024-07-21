import { ImageBackground, StyleSheet, Text, View, Image, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import ClanWarBattleLogScreen from './clanWarBattleLog'
import ClanWarActionScreenModal from './clanWarActions'
import ClanWarResultScreen from './clanWarResult'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClanDetails, useUpdateBattleStatus } from '@/src/api/clan'
import { useAuth } from '@/src/providers/AuthProvider'
import { useUserClanMemberData } from '@/src/api/users'

const ClanWarScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { clan_id, battle_status } = useLocalSearchParams()
  const clanId = parseInt(typeof clan_id == 'string' ? clan_id : clan_id?.[0] ?? '0')
  
  const [clanWar, setClanWar] = useState(battle_status)
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState('attack');
  const [warEnded, setWarEnded] = useState(true);

  const {
    data: userClanMemberData,
    isLoading: userClanMemberDataLoading,
    error: userClanMemberDataError,
  } = useUserClanMemberData(clanId, session?.user.id)

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

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground className='flex-1' source={require('@asset/images/background_image.png')}>
        <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pt-1 pb-2 px-4 border-b border-slate-300`}>
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

        <View style={{ borderColor: themeColors.primary }} className='mx-auto mt-0.5 bg-slate-200 px-10 rounded border'>
          <Text style={{ color: themeColors.primary }}>Time Remaning: 12:00:00</Text>
        </View>

        {/* absolute image */}
        <View className='flex-1'>
          <View className='flex-row'>
            <View className='ml-4'>
              <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_5.png')} />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>999990</Text>
              </View>
            </View>
            <View className='mx-6 my-10'>
              <Text className='text-xl font-bold mb-2'>Samsung Galaxy</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <View className='mt-1 flex-row'>
                <FontAwesome6 name="shield-heart" size={22} color='red' />
              <Progress.Bar className='my-1 ml-2'
                progress={0.9}
                height={14}
                width={115}
                color={themeColors.tetiary}
                unfilledColor={themeColors.secondary}
                borderWidth={1}
                borderRadius={0}
                borderColor={themeColors.primary}
              />
              </View>
              <Text>900/1000</Text>
              <AnimatedPressable 
                style={{ backgroundColor: themeColors.secondary }}
                className='rounded mt-auto p-2'
                onPress={() => setModalVisible(true)}
                pressInValue={0.96}
              >
                <Text style={{ color: themeColors.backgroundColor }} className='font-semibold text-md mx-auto'>Battle Log</Text>
              </AnimatedPressable>
            </View>
          </View>
          <View className='flex-1'>
            <Image className='z-10 w-44 h-44 mx-auto my-auto' source={require('@asset/images/vs_logo.png')} />
          </View>
          <View className='flex-row'>
            <View className='mx-6 my-10'>
              <Text style={{ color: themeColors.danger }} className='text-xl font-bold mb-2'>Samsung Galaxy</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <View className='mt-1 flex-row'>
                <FontAwesome6 name="shield-heart" size={22} color='red' />
                <Progress.Bar className='my-1 ml-2'
                  progress={0.9}
                  height={14}
                  width={115}
                  color={themeColors.tetiary}
                  unfilledColor={themeColors.secondary}
                  borderWidth={1}
                  borderRadius={0}
                  borderColor={themeColors.primary}
                />
              </View>
              <Text>900/1000</Text>
              <View className='flex-row mt-auto'>
                <AnimatedPressable 
                  style={{ backgroundColor: themeColors.danger }}
                  className='rounded flex-1 mx-0.5 p-2'
                  pressInValue={0.96}
                  onPress={() => {setActionModalVisible(true); setActionType('attack')}}
                  >
                  <Text style={{ color: themeColors.backgroundColor }} className='font-semibold text-md mx-auto'>Attack</Text>
                </AnimatedPressable>
                <AnimatedPressable 
                  style={{ backgroundColor: themeColors.secondary }}
                  className='rounded flex-1 p-2'
                  pressInValue={0.96}
                  onPress={() => {setActionModalVisible(true); setActionType('defense')}}
                  >
                  <Text style={{ color: themeColors.backgroundColor }} className='font-semibold text-md mx-auto'>Defense</Text>
                </AnimatedPressable>
              </View>
            </View>
            <View className='ml-auto mr-4 mb-2'>
              <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_2.png')} />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>999990</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <ClanWarBattleLogScreen onClose={() => setModalVisible(false)}/>
      </Modal>
      <Modal
        animationType='fade'
        visible={actionModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActionModalVisible(false)}
      >
        <ClanWarActionScreenModal actionType={actionType} onClose={() => setActionModalVisible(false)} />
      </Modal>
      <Modal
        animationType='fade'
        visible={warEnded}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setWarEnded(false)}
      >
        <ClanWarResultScreen modalVisible={warEnded} onClose={() => setWarEnded(false)} />
      </Modal>

    </View>
    </SafeAreaView>
  )
}

export default ClanWarScreen

const styles = StyleSheet.create({})