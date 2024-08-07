import { ImageBackground, StyleSheet, Text, View, Image, Platform, Modal, ActivityIndicator } from 'react-native'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import ClanWarBattleLogScreen from './clanWarBattleLog'
import ClanWarActionScreenModal from './clanWarActions'
import ClanWarResultScreen from './clanWarResult'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useClanActiveScore, useClanDetails, useClanWar, useUpdateBattleStatus, useUpdateClanWar } from '@/src/api/clan'
import { useAuth } from '@/src/providers/AuthProvider'
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useClanWarSubscription } from '@/src/api/clan/subscription'
import RemoteImage from '@/src/components/RemoteImage'

dayjs.extend(relativeTime);
dayjs.extend(duration);

const ClanWarScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { clan_id } = useLocalSearchParams()
  const clanId = parseInt(typeof clan_id == 'string' ? clan_id : clan_id?.[0] ?? '0')
  
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState('attack');
  const [warEnded, setWarEnded] = useState(true);
  const [clanWarResult, setClanWarResult] = useState('victory')
  const [isSecondClan, setIsSecondClan] = useState(false)
  const [countdown, setCountdown] = useState('');
  const timerRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  const {
    data: clanWar,
    error: clanWarError,
    isLoading: clanWarIsLoading,
  } = useClanWar(clanId);

  const opponentClanId = isSecondClan ? clanWar?.clan_1 ?? 0 : clanWar?.clan_2 ?? 0

  const {
    data: clanActiveScore,
    error: clanActiveScoreError,
    isLoading: clanActiveScoreIsLoading,
  } = useClanActiveScore(clanId)
  
  const {
    data: opponentClanActiveScore,
    error: opponentClanActiveScoreError,
    isLoading: opponentClanActiveScoreIsLoading,
  } = useClanActiveScore(opponentClanId)

  const {
    data: clanDetails,
    error: clanDetailsError,
    isLoading: clanDetailsIsLoading,
  } = useClanDetails(clanId)
  
  const {
    data: opponentClanDetails,
    error: opponentClanDetailsError,
    isLoading: opponentClanDetailsIsLoading,
  } = useClanDetails(opponentClanId)

  useClanWarSubscription(clanId)

  const updateCountdown = () => {
    if(!clanWar) {
      return
    }

    const now = dayjs();
    const difference = dayjs(clanWar.end_time).diff(now);

    if (difference <= 0) {
      setCountdown('00:00:00');
      if(timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const countdown = dayjs.duration(difference);

    if (countdown.days() >= 1) {
      setCountdown(`${countdown.days()} day${countdown.days() > 1 ? "s" : ''} ${countdown.hours()} hours`);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      const formattedCountdown = countdown.format('HH:mm:ss');
      setCountdown(formattedCountdown);
    }
  }

  useEffect(() => {
    if(clanWar?.clan_2 == clanId) {
      setIsSecondClan(true)
    }

    if(clanWar?.end_time) {
      timerRef.current = setInterval(updateCountdown, 1000)
    }

    return () => {
      if(timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [clanWar])

  if(clanWarIsLoading || clanDetailsIsLoading || opponentClanDetailsIsLoading ) {
    return <ActivityIndicator />
  }
  
  if(!clanWar) {
    console.log("CLanwar not found. Debug in '/clan/clan_details/clan_war/clanWar' ")
    return <Redirect href={`/clan/clan_details/${clanId}`} />
  }
  if(!clanDetails) {
    console.log("Clan details not found. Debug in '/clan/clan_details/clan_war/clanWar' ")
    return <Redirect href={`/clan/clan_details/${clanId}`} />
  }
  if(!opponentClanDetails) {
    console.log("opponent not found. Debug in '/clan/clan_details/clan_war/clanWar' ")
    return <Redirect href={`/clan/clan_details/${clanId}`} />
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
          <Text style={{ color: themeColors.primary }}>Time Remaning: {countdown}</Text>
        </View>

        <View className='flex-1'>
          <View className='flex-row'>
            <View className='ml-4'>
              {/* <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_5.png')} /> */}
              <RemoteImage
                classNameAsProps='w-44 h-52 mt-2'
                path={clanDetails.clan_logo} 
                fallback={require('@asset/images/clan_logo/clan_logo_no_clan.png')}
                bucket='clan_logo'
              />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>{clanActiveScore}</Text>
              </View>
            </View>
            <View className='mx-6 my-10'>
              <Text className='text-xl font-bold mb-2'>{clanDetails?.clan_name}</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <View className='mt-1 flex-row'>
                <FontAwesome6 name="shield-heart" size={22} color='red' />
              <Progress.Bar className='my-1 ml-2'
                progress={(isSecondClan ? clanWar.clan_2_health : clanWar.clan_1_health) / clanDetails.clan_health}
                height={14}
                width={115}
                color={themeColors.tetiary}
                unfilledColor={themeColors.secondary}
                borderWidth={1}
                borderRadius={0}
                borderColor={themeColors.primary}
              />
              </View>
              <Text>{isSecondClan ? clanWar.clan_2_health : clanWar.clan_1_health}/{clanDetails?.clan_health}</Text>
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
              <Text style={{ color: themeColors.danger }} className='text-xl font-bold mb-2'>{opponentClanDetails.clan_name}</Text>
              <Text className='font-semibold text-md'>Clan Health</Text>
              <View className='mt-1 flex-row'>
                <FontAwesome6 name="shield-heart" size={22} color='red' />
                <Progress.Bar className='my-1 ml-2'
                  progress={(isSecondClan ? clanWar.clan_1_health : clanWar.clan_2_health) / opponentClanDetails.clan_health}
                  height={14}
                  width={115}
                  color={themeColors.tetiary}
                  unfilledColor={themeColors.secondary}
                  borderWidth={1}
                  borderRadius={0}
                  borderColor={themeColors.primary}
                />
              </View>
              <Text>{isSecondClan ? clanWar.clan_1_health : clanWar.clan_2_health}/{opponentClanDetails.clan_health}</Text>
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
              {/* <Image className='w-44 h-52 mt-2' source={require('@asset/images/clan_logo/clan_logo_2.png')} /> */}
              <RemoteImage
                classNameAsProps='w-44 h-52 mt-2'
                path={opponentClanDetails.clan_logo} 
                fallback={require('@asset/images/clan_logo/clan_logo_no_clan.png')}
                bucket='clan_logo'
              />
              <View className='flex-row justify-center'>
                <View className='my-auto mx-1'>
                  <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center bg-slate-200 px-2 rounded'>{opponentClanActiveScore}</Text>
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
        <ClanWarBattleLogScreen 
          clanWarId={clanWar.id}
          clanId={clanDetails.clan_id}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
      <Modal
        animationType='fade'
        visible={actionModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setActionModalVisible(false)}
      >
        <ClanWarActionScreenModal 
          clanId={clanDetails.clan_id} 
          clanWar={clanWar} 
          actionType={actionType} 
          onClose={() => setActionModalVisible(false)} 
          isSecondClan={isSecondClan}
          clanMaxHealth={clanDetails.clan_health}
        />
      </Modal>
      <Modal
        animationType='fade'
        visible={warEnded}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setWarEnded(false)}
      >
        <ClanWarResultScreen modalVisible={warEnded} clanWarResultParam={clanWarResult} onClose={() => setWarEnded(false)} />
      </Modal>

    </View>
    </SafeAreaView>
  )
}

export default ClanWarScreen

const styles = StyleSheet.create({})