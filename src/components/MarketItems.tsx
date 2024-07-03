import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import AnimatedPressable from './AnimatedPressable'

type itemType = {
  id: number;
  name: string;
  itemType: string;
  image: any;
}

type MarketItemsComponentProps = {
  item: itemType;
}

const MarketItemsComponent = ({ item }: MarketItemsComponentProps) => {
  return (
    <View>
      <AnimatedPressable
        pressInValue={0.97}
        className='border-2 shadow shadow-slate-400 border-slate-400 rounded-lg p-2 bg-white'
      >
        <View className='flex-row'>
          <Image 
            source={item.image}
            className='aspect-square w-14 h-14 rounded-xl'
          />
          <View className='flex-1 flex-row justify-between'>
            <View className='flex-col ml-4 my-auto'>
              <Text className='text-lg font-bold'>{item.name}</Text>
              <Text className='font-semibold text-slate-600'>{item.itemType}</Text>
            </View>
            <View className='flex-row my-auto mr-2 bg-slate-200 rounded-lg p-2'>
              <FontAwesome6 name="fire" size={28} color="rgba(240, 93, 9, 0.8)" />
              <Text className='text-center text-lg rounded font-semibold ml-2'>9999</Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </View>
  )
}

export default MarketItemsComponent

const styles = StyleSheet.create({})