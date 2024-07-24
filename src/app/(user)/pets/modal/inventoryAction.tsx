import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { router } from 'expo-router'

type InventoryActionScreenModalProps = {
  onClose: () => void;
  currentRoute: string;
}

const InventoryActionScreenModal = ({ onClose, currentRoute }: InventoryActionScreenModalProps) => {
  const handlePress = (destination: string) => {
    if (currentRoute !== destination) {
      if (destination == 'pets') {
        router.navigate('/pets')
        onClose();
      }
      else {
        router.navigate('/pets/inventory/' + destination);
        onClose();
      }
    }
    else {
      onClose(); 
    }
  };

  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='p-4'
    >
      <Text className='text-xl font-bold pb-3 px-3 bg-white/50'>Choose Inventory</Text>

      <View className='bg-white/50'>
        <View className='flex-row justify-between'>
          <AnimatedPressable
            className='flex-1 items-center border-2 border-slate-400 rounded-lg p-2 bg-white m-1'
            pressInValue={0.98}
            onPress={() => handlePress('pets')}
          >
            <Image
              className='h-24 w-24'
              source={require('@asset/images/pets/turtle.png')}
            />
            <Text className='text-center font-bold text-lg'>Pets</Text>
          </AnimatedPressable>
          <AnimatedPressable
            className='flex-1 items-center rounded-lg p-2 bg-white m-1 border-2 border-slate-400'
            pressInValue={0.98}
            onPress={() => {
              handlePress('chest');
            }}
          >
            <Image
              className='h-24 w-24'
              source={require('@asset/images/chest.png')}
            />
            <Text className='text-center font-bold text-lg'>Chest</Text>
          </AnimatedPressable>
        </View>
        <View className='flex-row justify-between'>
          <AnimatedPressable
            className='flex-1 items-center border-2 border-slate-400 rounded-lg p-2 bg-white m-1'
            pressInValue={0.98}
            onPress={() => handlePress('items')}
          >
            <Image
              className='h-24 w-24'
              source={require('@asset/images/inventory.png')}
            />
            <Text className='text-center font-bold text-lg'>Items</Text>
          </AnimatedPressable>
          <AnimatedPressable
            className='flex-1 items-center border-2 border-slate-400 rounded-lg p-2 bg-white m-1'
            pressInValue={0.98}
            onPress={() => handlePress('resources')}
          >
            <Image
              className='h-24 w-24'
              source={require('@asset/images/energy_gems.png')}
            />
            <Text className='text-center font-bold text-lg'>Resources</Text>
          </AnimatedPressable>
        </View>
      </View>
    </ImageBackground>
  )
}

export default InventoryActionScreenModal

const styles = StyleSheet.create({})