import { ImageBackground, StyleSheet, Text, View, Image, FlatList, SafeAreaView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import ClanMember from '@/src/components/ClanMember'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MemberScreen from './clanMember'
import TabLayout from './clanDetailTabs'
import { clanColors, themeColors } from '@/src/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedModal from '@/src/components/AnimatedModal'

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
    }
  }

  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
    
    {/* Clan Details top part */}
    <View className='mt-4 mb-42 flex-1'>
      <Stack.Screen 
        options={{ title: 'Clan Name', 
        headerRight: () => 
          haveClan 
          ? 
            <AnimatedPressable 
              pressInValue={0.9}
              className='rounded'
              onPress={() => router.push('/clan/clan_war/clanWar')}
            >
              <View className='my-auto'>
                <MaterialCommunityIcons name="sword-cross" size={28} color={themeColors.primary} />
              </View>
            </AnimatedPressable>
          :
            null
      }} />
      <View className='flex-row mb-3'>
        <Image 
          className='w-32 h-40 mx-4'
          source={require('@asset/images/clan_logo/clan_logo_1.png')}
        />
        <View className='flex-1 pr-4'>
          <Text style={{ color: themeColors.primary }} className='text-[24px] text-left font-[800]'>Samsung galaxy</Text>
          <Text numberOfLines={4} style={{ color: themeColors.secondary }} className='font-semibold mt-1 text-justify'>The quick brown fox jumps over the lazy dog.The quick brown fox jumps</Text>
          <AnimatedPressable 
            style={{ backgroundColor: haveClan ? themeColors.danger : themeColors.secondary }}
            className='w-[75%] rounded-xl p-2 mt-auto'
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
        </AnimatedModal>
      </Modal>
    </View>
    </ImageBackground>
  )
}

export default ClanDetailsScreen

const styles = StyleSheet.create({})