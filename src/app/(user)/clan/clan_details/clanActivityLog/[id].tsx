import { StyleSheet, Text, View, Image, ScrollView, TextInput, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback, Keyboard, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { themeColors } from '@/src/constants/Colors'
import { Redirect, Stack, router, useLocalSearchParams } from 'expo-router';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useClanActiveScore, useClanActivityLog, useClanDetails, useInsertClanLog } from '@/src/api/clan';
import { useUserData } from '@/src/api/users';
import { useAuth } from '@/src/providers/AuthProvider';
import { useClanActivityLogSubscription } from '@/src/api/clan/subscription';

const ClanActivityLogScreen = () => {
  const { session } = useAuth();

  if(!session) {
    return <Redirect href={'/sign_in'} />
  }

  const { id } = useLocalSearchParams()
  const clanId = parseInt(typeof id == 'string' ? id : id?.[0] ?? '0')
  const [message, setMessage] = useState('')
  const [isNearBottom, setIsNearBottom] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 60;
    setIsNearBottom(
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    );
  };

  useClanActivityLogSubscription(clanId); // real time chat

  const {
    data: activityLog,
    error: activityLogError,
    isLoading: activityLogLoading,
  } = useClanActivityLog(clanId)

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useUserData(session.user.id)

  const {
    data: clanActiveScore,
    isLoading: clanActiveScoreLoading,
    error: clanActiveScoreError,
  } = useClanActiveScore(clanId)

  const { 
    data: clanDetails, 
    isLoading: clanDetailsLoading, 
    error: clanDetailsError 
  } = useClanDetails(clanId)

  const { mutate: insertMessage } = useInsertClanLog()

  const handleSendMessage = () => {
    setMessage('')

    insertMessage(
      { 
        clan_id: clanId,
        user_id: userData?.id,
        message: message
      }, 
    )
  }

  useEffect(() => {
    if (isNearBottom && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [activityLog]);
  
  return (
    <KeyboardAvoidingView className='flex-1 justify-end'>
      <SafeAreaView edges={['top']} className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        className='flex-1'
        source={require('@asset/images/background_image.png')}
      >

      <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row justify-center pt-1 pb-2 px-4 border-b border-slate-300'>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10 absolute left-3 bottom-2'
          onPress={() => router.back()}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-2xl font-bold'>{clanDetails?.clan_name}</Text>
      </View>

      <AnimatedPressable 
        className='border border-slate-500 rounded-lg py-0.5 px-2 m-2 bg-white'
        pressInValue={0.98}
        onPress={() => router.replace(`/clan/clan_details/${clanId}`)}
      >
        <View className='flex flex-row p-1'>
          <Image
            className='w-14 h-16 rounded-xl'
            source={require('@asset/images/clan_logo/clan_logo_4.png')}
          />
          <View className='flex-1 flex-col ml-3'>
            <Text style={{ color: themeColors.primary }} numberOfLines={1} className='font-bold text-xl mb-1'>{clanDetails?.clan_name}</Text>
            <View className='flex-row justify-between w-9/12'>
              <View className='flex-row'>
                <View className='m-auto mr-1'>
                  <FontAwesome6 name="fire" size={24} color="rgba(240, 93, 9, 0.8)" />
                </View>
                <Text style={{ color: themeColors.primary }} className='bg-slate-200 rounded-lg px-2 text-lg font-semibold'>{clanActiveScore}</Text>
              </View>
            </View>
          </View>
          { clanDetails?.battle_status == "On Battle" 
            ? 
            <View className='flex-col'>
              <Image
                className='w-14 h-14 rounded-xl mx-auto'
                source={require('@asset/images/battle_active.png')}
              />
              <Text className='font-extrabold text-emerald-600'>On Battle</Text>
            </View>
            :
            clanDetails?.battle_status == "Off Battle" 
              ?
              <View>
                <Image
                  className='w-14 h-14 rounded-xl mx-auto'
                  source={require('@asset/images/battle_inactive.png')}
                />
                <Text className='font-extrabold text-red-600/60'>Off Battle</Text>
              </View>
              :
              <View className='flex-col'>
                <Image
                  className='w-14 h-14 rounded-xl mx-auto'
                  source={require('@asset/images/battle_active.png')}
                />
                <Text className='font-extrabold text-orange-500'>Searching</Text>
              </View>
          }
          
        </View>
      </AnimatedPressable>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView 
        ref={scrollViewRef} 
        className='p-1'
        onScroll={handleScroll}
        scrollEventThrottle={32}
      >
        {activityLog?.map(( activity, index ) => {
          if (activity.user_id == null) {
            return (
              <View key={activity.id} className='bg-slate-200 border border-slate-400 rounded-lg mx-auto my-1 p-1 w-[80%]'>
                <Text className='text-center font-bold'>{activity.message}</Text>
              </View>
            )
          } else if (activity.user_id == userData?.id ) {
            return (
              <View key={activity.id} className='bg-emerald-100 border border-slate-400 rounded-lg ml-auto mr-2 my-1 p-2 w-[75%] flex-row'>
                <View className='mx-2 justify-center flex-1'>
                  <Text className='font-bold'>{activity.users?.username}</Text>
                  <Text className='text-left'>{activity.message}</Text>
                </View>
              </View>
            )
          } else {
            return (
              <View key={activity.id} className='bg-white border border-slate-400 rounded-lg mx-2 my-1 p-2 flex-row w-[75%]'>
                <Image
                  className='w-12 h-12'
                  source={require('@asset/images/CyberKongz.jpg')}
                />
                <View className='mx-2 justify-center flex-1'>
                  <Text className='font-bold'>{activity.users?.username}</Text>
                  <Text className='text-left'>{activity.message}</Text>
                </View>
              </View>
            )
          }
        })}
      </ScrollView>
      </TouchableWithoutFeedback>

      <View className='flex-row p-3'>
        <TextInput 
          className='bg-white h-10 border border-slate-500 mx-1 rounded-lg p-2 flex-1'
          placeholder='Enter message'
          onChangeText={setMessage}
          value={message}
        />
        <AnimatedPressable
          className='bg-white border border-slate-500 px-2 mx-1 rounded-lg'
          pressInValue={0.95}
          onPress={handleSendMessage}
          disabled={message == ''}
        >
          <View className='m-auto'>
            <Ionicons name="chatbox-ellipses" size={24} color={message == '' ? themeColors.disabled : themeColors.secondary} />
          </View>
        </AnimatedPressable>
      </View>
      </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ClanActivityLogScreen

const styles = StyleSheet.create({})