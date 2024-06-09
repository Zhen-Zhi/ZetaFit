import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'

type AddClanHeatlhModalProps = {
  onClose?: () => void;
}

const AddClanHealthModal = ({ onClose }: AddClanHeatlhModalProps) => {
  return (
    <Pressable className='bg-black/60 flex-1' onPress={onClose}>
    <Pressable className='bg-white m-auto w-[75%] rounded-lg border-4 border-slate-200' onPress={(event) => event.stopPropagation()}>
      <View className='p-2 border-b-2 border-slate-300 flex-row justify-between'>
        <Text style={{ color: themeColors.primary }} className='font-extrabold text-lg'>Upgrade Clan Health</Text>
        <AnimatedPressable pressInValue={0.8} onPress={onClose}>
          <View className='my-auto'>
            <Ionicons name="close-sharp" size={24} color="black" />
          </View>
        </AnimatedPressable>
      </View>
      <View className='flex-row justify-center my-6'>
        <View className='my-auto'>
          <FontAwesome6 name="shield-heart" size={26} color='red' />
        </View>
        <Text style={{ color: themeColors.primary }} className='font-extrabold text-2xl mx-2'>2000</Text>
        <View className='my-auto'>
          <FontAwesome name="arrow-right" size={20} color="black" />
        </View>
        <Text className='font-extrabold text-2xl mx-2 text-emerald-500'>2500</Text>
      </View>
      <View className='flex-row justify-between'>
        <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='flex-1 p-2' pressInValue={0.95} onPress={onClose}>
          <View className='flex-row justify-center my-auto p-0.5'>
            <Image className='w-8 h-8 mr-2' source={require('@asset/images/coin_icon.png')} />
            <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>2000</Text>
          </View>
        </AnimatedPressable>
      </View>
    </Pressable>
  </Pressable>
  )
}

export default AddClanHealthModal

const styles = StyleSheet.create({})