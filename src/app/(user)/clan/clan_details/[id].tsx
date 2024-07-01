import { ImageBackground, StyleSheet, Text, View, Image, FlatList, Modal, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Entypo, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import ClanMember from '@/src/components/ClanMember'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MemberScreen from './clanMemberList'
import TabLayout from './clanDetailTabs'
import { themeColors } from '@/src/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedModal from '@/src/components/AnimatedModal'
import { SafeAreaView } from 'react-native-safe-area-context'

const ClanDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const [haveClan, setHaveClan] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const handleCLanInOut = () => {
    if(haveClan) {
      setModalVisible(true)
    }
    else {
      setHaveClan(true)
      router.push('/clan/clan_details/clanActivityLog');
    }
  }

  return (
    <SafeAreaView edges={['top']} className='flex-1'>
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
    
    {/* Clan Details top part */}
    <View className='flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ backgroundColor: themeColors.backgroundColor }} className={`pb-2 px-4 border-b border-slate-300`}>
        <AnimatedPressable 
          pressInValue={0.9} 
          className='z-10 absolute left-3 bottom-2'
          onPress={() => router.replace('/clan')}
        >
          <View className='p-1'>
            <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <AnimatedPressable 
          pressInValue={0.9} 
          className={`z-10 absolute right-3 bottom-3 ${ !haveClan && 'h-0' }`}
          onPress={() => router.push('clan/clan_war/clanWar')}
        >
          <View className='my-auto'>
            <MaterialCommunityIcons name="sword-cross" size={28} color={themeColors.primary} />
          </View>
        </AnimatedPressable>
        <Text style={{ color: themeColors.primary }} className='text-center mt-auto text-[28px] font-extrabold'>CLAN</Text>
      </View>
      
      {/* <Stack.Screen 
        options={{ title: 'Clan Name', 
        headerRight: () => 
          haveClan 
          ? 
            <AnimatedPressable 
              pressInValue={0.9}
              className='rounded'
              onPress={() => {
                router.push('clan/clan_war/clanWar')
              }}
            >
              <View className='my-auto'>
                <MaterialCommunityIcons name="sword-cross" size={28} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
          :
            null
      }} /> */}
      <View className='flex-row my-3'>
        <Image 
          className='w-32 h-40 mx-4'
          source={require('@asset/images/clan_logo/clan_logo_1.png')}
        />
        <View className='flex-1 pr-4'>
          <Text style={{ color: themeColors.primary }} className='text-[24px] text-left font-[800]'>Samsung galaxy</Text>
          <Text numberOfLines={4} style={{ color: themeColors.secondary }} className='font-semibold mt-1 text-justify'>The quick brown fox jumps over the lazy dog.The quick brown fox jumps</Text>
          <View className='flex-row mt-auto justify-between'>
            <AnimatedPressable 
              style={{ backgroundColor: haveClan ? themeColors.danger : themeColors.secondary }}
              className='w-[75%] rounded-xl p-2'
              pressInValue={0.95}
              onPress={() => handleCLanInOut()}
              >
              {haveClan 
                ? 
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Leave</Text>
                :
                <Text style={{ color: themeColors.backgroundColor }} className='font-bold text-lg text-center' >Join Clan</Text>
              }
            </AnimatedPressable>
            { haveClan && <AnimatedPressable 
              style={{ backgroundColor: themeColors.secondary }}
              className='w-[20%] rounded-xl p-2'
              pressInValue={0.95}
              onPress={() => router.push('/clan/clan_details/clanActivityLog')}
              >
                <View className='m-auto'>
                  <Entypo name="chat" size={24} color="white" />
                </View>
            </AnimatedPressable>}
          </View>
        </View>
      </View>
      <TabLayout haveClan={haveClan} />
      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <AnimatedModal modalVisible={modalVisible} onClose={() => setModalVisible(false)}>
          <View className='p-4'>
            <Text style={{ color: themeColors.danger }} className='font-extrabold text-2xl'>Leave Clan</Text>
            <Text style={{ color: themeColors.primary }} className='font-bold text-lg'>Are you sure you want to leave clan?</Text>
            <View className='flex-row justify-around mt-6'>
              <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='rounded-lg px-3 py-2 w-5/12' pressInValue={0.95} onPress={() => setModalVisible(false)}>
              <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Stay</Text>
              </AnimatedPressable>
              <AnimatedPressable style={{ backgroundColor: themeColors.danger }} className='rounded-lg px-3 py-2 w-5/12' pressInValue={0.95} onPress={() => {setModalVisible(false); setHaveClan(false)}}>
              <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Leave</Text>
              </AnimatedPressable>
            </View>
          </View>
        </AnimatedModal>
      </Modal>
    </View>
    </ImageBackground>
    </SafeAreaView>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})