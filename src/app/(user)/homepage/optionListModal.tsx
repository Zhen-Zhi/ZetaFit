import { ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { Redirect, router } from 'expo-router'
import { themeColors } from '@/src/constants/Colors';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from './profile/profileModal';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ActivityLogScreen from '../pets/activityLog';
import AnimatedModal from '@/src/components/AnimatedModal';
import { supabase } from '@/src/lib/supabase';

type MoreOptionsModalProps = {
  onClose: () => void;
};

type ListOptionsType = {
  name: string;
  iconName: keyof typeof FontAwesome.glyphMap
}

const ListOptions: ListOptionsType[] = [
  {name: 'Profile', iconName: 'user'},
  {name: 'Setting', iconName: 'gear'},
  {name: 'Activities', iconName: 'history'}
]

const MoreOptionsModal = ({ onClose }: MoreOptionsModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (optionName: string) => {
    switch(optionName) {
      case 'Profile':
        setModalVisible(true)
        break;
      case 'Setting':
        setModalVisible(true)
        break
      case 'Activities':
        router.push('/pets/activityLog')
    }
  }

  return (
    <Pressable onPress={onClose} className='bg-black/40 flex-1'>
      <View className='flex w-3/5 rounded-2xl bg-white self-end top-[146px] mr-2 p-1'>
        {ListOptions.map((option, index) => {
          return (
            <AnimatedPressable
              style={{ backgroundColor: 'white' }}
              key={index}
              onPress={() => handleOptionPress(option.name)}
              pressInValue={0.95}
              className='border border-slate-400 h-10 rounded-xl m-1'
            >
              <View className='flex-row flex-1 justify-center'>
                <View className='absolute left-5 top-1.5'>
                  <FontAwesome name={option.iconName} size={24} color={themeColors.primary} />
                </View>
                <Text style={{ color: themeColors.primary }} className='my-auto text-start text-[16px] font-bold'>{option.name}</Text>
              </View>
            </AnimatedPressable>
          )
        })}
        <AnimatedPressable 
          style={{ backgroundColor: themeColors.backgroundColor }}
          pressInValue={0.95} 
          className='border border-slate-400 h-10 rounded-xl mb-1 mt-4 mx-1'
          onPress={() => supabase.auth.signOut()}
        >
          <View className='flex-row flex-1 justify-center'>
            <View className='absolute left-5 top-1.5'>
              <FontAwesome name='sign-out' size={24} color='red' />
            </View>
            <Text className='my-auto text-center font-semibold text-red-600'>Sign Out</Text>
          </View>
        </AnimatedPressable>
      </View>

      <Modal
        animationType='fade'
        visible={modalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setModalVisible(false)}
      >
        <SafeAreaProvider>
          <SafeAreaView edges={['top']} className='flex-1'>
            <ProfileScreen onClose={() => setModalVisible(false)} />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </Pressable>
  )
}

export default MoreOptionsModal

const styles = StyleSheet.create({})