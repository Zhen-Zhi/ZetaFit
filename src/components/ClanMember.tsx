import { StyleSheet, Text, View, Image, Modal, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedModal from './AnimatedModal'
import { router, useLocalSearchParams } from 'expo-router'
import { themeColors } from '../constants/Colors'
import ProfileScreen from '../app/(user)/homepage/profile/profileModal'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Tables } from '../database.types'
import { useAuth } from '../providers/AuthProvider'

type ClanMemberProps = {
  member: { users: Tables<'users'> | null } &Tables<'clan_members'> | null;
}

const ClanMember = ({ member }: ClanMemberProps) => {
  const { session } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)

  return (
    <View>
      <AnimatedPressable
        onLongPress={() => setModalVisible(true)}
        pressInValue={0.97}
        className={
          `border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 
          ${ member?.user_id == session?.user.id ? 'bg-green-200' : 'bg-white' } `
        }
      >
        <View className='flex-row'>
          <Image 
          source={require('@asset/images/CyberKongz.jpg')}
          className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>{member?.users?.username}</Text>
              <Text className='font-semibold text-slate-600'>{member?.role}</Text>
            </View>
            <View className={
              `flex-row my-auto mr-2 rounded-lg p-2
              ${ member?.user_id == session?.user.id ? 'bg-white' : 'bg-slate-200' }`
            }>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>{member?.users?.active_score}</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
      <AnimatedModal onClose={() => setModalVisible(false)}>
        <ImageBackground 
          source={require('@asset/images/background_image.png')} 
          className='p-4'
        >
        <AnimatedPressable 
          pressInValue={0.97}
          className={
            `border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 
            ${ member?.user_id == session?.user.id ? 'bg-green-200' : 'bg-white' } `
          }
        >
          <View className='flex-row'>
            <Image 
            source={require('@asset/images/CyberKongz.jpg')}
            className='aspect-square w-14 h-14 rounded-xl'
            />
            <View className='flex-1 flex-row justify-between'>
              <View className='flex-col ml-4 my-auto'>
                <Text className='text-lg font-bold'>{member?.users?.username}</Text>
                <Text className='font-semibold text-slate-600'>{member?.role}</Text>
              </View>
            </View>
          </View>
        </AnimatedPressable>
          <View className='flex-col justify-between mt-6'>
            <AnimatedPressable
              className='p-1 rounded-lg border border-slate-500 bg-white'
              pressInValue={0.95}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>View Profile</Text>
            </AnimatedPressable>

            <View className='flex-row mt-1'>
              <AnimatedPressable
                className='p-1 rounded-lg border border-slate-500 my-1 flex-1 mr-1 bg-white'
                pressInValue={0.95}
                >
                <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>Promote</Text>
              </AnimatedPressable>
              <AnimatedPressable
                className='p-1 rounded-lg border border-slate-500 my-1 flex-1 ml-1 bg-white'
                pressInValue={0.95}
                >
                <Text style={{ color: themeColors.danger }} className='text-lg text-center font-bold text-white'>Demote</Text>
              </AnimatedPressable>
            </View>

            <AnimatedPressable
              style={{ backgroundColor: themeColors.danger }}
              className='p-1.5 rounded-lg mt-2'
              pressInValue={0.95}
            >
              <Text className='text-lg text-center font-bold text-white'>Kick</Text>
            </AnimatedPressable>
          </View>
        </ImageBackground>
      </AnimatedModal>
      </Modal>

      <Modal
        animationType='fade'
        visible={profileModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setProfileModalVisible(false)}
      >
        <SafeAreaProvider className='flex-1'>
          <SafeAreaView className='flex-1' edges={['top']}>
            <ProfileScreen onClose={() => setProfileModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  )
}

export default ClanMember

const styles = StyleSheet.create({})