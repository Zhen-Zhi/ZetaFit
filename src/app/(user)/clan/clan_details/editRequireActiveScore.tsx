import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

type EditRequireActiveScoreModalProps = {
  onClose?: () => void;
  increment: () => void;
  decrement: () => void;
  amount: number;
}

const EditRequireActiveScoreModal = ({ onClose, increment, decrement, amount }: EditRequireActiveScoreModalProps) => {
  return (
    <Pressable className='bg-black/60 flex-1' onPress={onClose}>
      <Pressable className='bg-white m-auto w-[75%] rounded-lg border-4 border-slate-200' onPress={(event) => event.stopPropagation()}>
        <View className='p-2 border-b-2 border-slate-300 flex-row justify-between'>
          <Text style={{ color: themeColors.primary }} className='font-extrabold text-lg'>Edit Required ActiveScore</Text>
          <AnimatedPressable pressInValue={0.8} onPress={onClose}>
          <View className='my-auto'>
            <Ionicons name="close-sharp" size={24} color="black" />
          </View>
        </AnimatedPressable>
        </View>
        <View className='my-2 flex-col'>
          <View className='flex-row justify-center'>
            <AnimatedPressable pressInValue={0.96} onPress={decrement}>
            <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_left.png')} />
            </AnimatedPressable>
            <TextInput
              value={amount.toString()}
              className='p-3 w-1/4 text-center text-lg font-bold'
              style={{ color: themeColors.primary }}
            />
            <AnimatedPressable pressInValue={0.96} onPress={increment}>
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_right.png')} />
            </AnimatedPressable>
          </View>
        </View>
        <View className='flex-row justify-between'>
          <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='flex-1 h-10' pressInValue={0.95} onPress={onClose}>
            <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Save</Text>
          </AnimatedPressable>
        </View>
      </Pressable>
    </Pressable>
  )
}

export default EditRequireActiveScoreModal

const styles = StyleSheet.create({})