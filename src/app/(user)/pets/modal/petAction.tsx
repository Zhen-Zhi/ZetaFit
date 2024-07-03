import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { router } from 'expo-router'

type PetActionScreenModalProps = {
  onClose: () => void;
}

const PetActionScreenModal = ({ onClose }: PetActionScreenModalProps) => {
  return (
    <ImageBackground
      className='p-4'
      source={require('@asset/images/background_image.png')}
    >
      <Image
        className='w-44 h-44 mx-auto'
        source={require('@asset/images/pets/turtle.png')}
      />
      <Text className='font-bold text-lg text-center mb-4'>Turtle</Text>

      <AnimatedPressable
        className='border border-slate-600 rounded-lg p-1 my-1 bg-white'
        pressInValue={0.95}
      >
        <View>
          <Image className='w-5 h-6 absolute left-[25%] top-0.5' source={require('@asset/images/attack_icon.png')} />
          <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>Go Battle</Text>
        </View>
      </AnimatedPressable>
      <AnimatedPressable
        className='border border-slate-600 rounded-lg p-1 my-1 bg-white'
        pressInValue={0.95}
      >
        <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>View Details</Text>
      </AnimatedPressable>
      <AnimatedPressable
        className='border border-slate-600 rounded-lg p-1 my-1 bg-white'
        pressInValue={0.95}
        onPress={() => {
          router.push('/pets/petsUpgrade');
          onClose();
        }}
      >
        <Text style={{ color: themeColors.secondary }} className='font-bold text-lg text-center'>Upgrade</Text>
      </AnimatedPressable>
    </ImageBackground>
  )
}

export default PetActionScreenModal

const styles = StyleSheet.create({})