import { StyleSheet, Text, View, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedModal from './AnimatedModal'
import { router, useLocalSearchParams } from 'expo-router'
import { themeColors } from '../constants/Colors'
import ProfileScreen from '../app/(user)/homepage/profile/profileModal'

type ClanMemberProps = {
  id: number;
}

const ClanMember = ({ id }: ClanMemberProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [profileModalVisible, setProfileModalVisible] = useState(false)

  return (
    <View>
      <AnimatedPressable
        onLongPress={() => setModalVisible(true)}
        pressInValue={0.97}
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      >
        <View className='flex-row'>
          <Image 
          source={require('@asset/images/CyberKongz.jpg')}
          className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>Member Name</Text>
              <Text className='font-semibold text-slate-600'>Founder</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>9999</Text>
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
        <AnimatedPressable 
          pressInValue={0.97}
          className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
        >
          <View className='flex-row'>
            <Image 
            source={require('@asset/images/CyberKongz.jpg')}
            className='aspect-square w-14 h-14 rounded-xl'
            />
            <View className='flex-1 flex-row justify-between'>
              <View className='flex-col ml-4 my-auto'>
                <Text className='text-lg font-bold'>Member Name + {id}</Text>
                <Text className='font-semibold text-slate-600'>Founder</Text>
              </View>
            </View>
          </View>
        </AnimatedPressable>
          <View className='flex-col justify-between mt-6'>
            <AnimatedPressable
              style={{ backgroundColor: themeColors.backgroundColor }}
              className='p-1 rounded-lg border border-slate-500'
              pressInValue={0.95}
              onPress={() => setProfileModalVisible(true)}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>View Profile</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={{ backgroundColor: themeColors.backgroundColor }}
              className='p-1 rounded-lg border border-slate-500 my-1'
              pressInValue={0.95}
            >
              <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>Promote</Text>
            </AnimatedPressable>
            <AnimatedPressable
              style={{ backgroundColor: themeColors.danger }}
              className='p-1.5 rounded-lg mt-2'
              pressInValue={0.95}
            >
              <Text className='text-lg text-center font-bold text-white'>Kick</Text>
            </AnimatedPressable>
          </View>
      </AnimatedModal>
      </Modal>
      <Modal
        animationType='fade'
        visible={profileModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <ProfileScreen onClose={() => setProfileModalVisible(false)} />
      </Modal>
    </View>
  )
}

export default ClanMember

const styles = StyleSheet.create({})