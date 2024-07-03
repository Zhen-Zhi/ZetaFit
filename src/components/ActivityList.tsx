import { StyleSheet, Text, View, Image, Modal, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from './AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedModal from './AnimatedModal'
import { router, useLocalSearchParams } from 'expo-router'
import { themeColors } from '../constants/Colors'
import ProfileScreen from '../app/(user)/homepage/profile/profileModal'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type ClanMemberProps = {
  id: number;
}

const ActivityList = ({ id }: ClanMemberProps) => {
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
          source={require('@asset/images/swimming.png')}
          className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>Activity Title</Text>
              <Text className='font-semibold text-slate-600'>3 days ago</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>1000</Text>
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
        <ImageBackground source={require('@asset/images/background_image.png')} className='p-4'>
        <AnimatedPressable 
          pressInValue={0.97}
          className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
        >
          <View className='flex-row'>
            <Image 
            source={require('@asset/images/running.png')}
            className='aspect-square w-14 h-14 rounded-xl'
            />
            <View className='flex-1 flex-row justify-between'>
              <View className='flex-col ml-4 my-auto'>
                <Text className='text-lg font-bold'>Activity Title</Text>
                <Text className='font-semibold text-slate-600'>3 days ago</Text>
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
            <Text style={{ color: themeColors.secondary }} className='text-lg text-center font-bold text-white'>View Details</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={{ backgroundColor: themeColors.danger }}
            className='p-1.5 rounded-lg mt-2'
            pressInValue={0.95}
          >
            <Text className='text-lg text-center font-bold text-white'>Delete</Text>
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
        onRequestClose={() =>setModalVisible(false)}
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

export default ActivityList

const styles = StyleSheet.create({})