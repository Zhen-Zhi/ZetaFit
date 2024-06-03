import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { Redirect, router } from 'expo-router'

type MoreOptionsModalProps = {
  onClose: () => void;
};

const ListOptions = [{name: 'Profile'},{name: 'Setting'},{name: 'Activities'}]

const MoreOptionsModal = ({ onClose }: MoreOptionsModalProps) => {
  return (
    <Pressable onPress={onClose} className='bg-black/40 flex-1'>
      <View className='flex w-3/5 rounded-2xl bg-white self-end top-[146px] mr-2 p-1'>
        {ListOptions.map((option, index) => {
          return (
            <AnimatedPressable
              key={index}
              onPress={() => {onClose; router.push('/homepage/profile')}}
              pressInValue={0.95}
              className='border border-slate-400 h-10 rounded-xl m-1'
            >
              <Text className='my-auto text-center font-semibold'>{option.name}</Text>
            </AnimatedPressable>
          )
        })}
        <AnimatedPressable 
          pressInValue={0.95} 
          className='border border-slate-400 h-10 rounded-xl mt-4 mb-1 mx-1'
          onPress={() => router.replace('/(auth)/sign_in')}
        >
          <Text className='my-auto text-center font-semibold text-red-600'>Sign Out</Text>
        </AnimatedPressable>
      </View>
    </Pressable>
  )
}

export default MoreOptionsModal

const styles = StyleSheet.create({})