import { Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import AnimatedModal from '@/src/components/AnimatedModal'

type EditRequireActiveScoreModalProps = {
  onClose?: () => void;
  increment: () => void;
  decrement: () => void;
  amount: number;
}

const EditRequireActiveScoreModal = ({ onClose, increment, decrement, amount }: EditRequireActiveScoreModalProps) => {
  return (
    <AnimatedModal onClose={onClose}>
      <View className='p-4'>
        <Text style={{ color: themeColors.primary }} className='font-bold text-lg'>Edit Required ActiveScore</Text>
        <View className='my-2 flex-col'>
          <View className='flex-row justify-center'>
            <AnimatedPressable pressInValue={0.8} onPress={decrement}>
            <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_left.png')} />
            </AnimatedPressable>
            <TextInput
              value={amount.toString()}
              className='p-3 w-2/4 text-center text-lg font-bold'
              style={{ color: themeColors.primary }}
              editable={false}
            />
            <AnimatedPressable pressInValue={0.8} onPress={increment}>
              <Image className='h-6 w-4 my-auto' source={require('@asset/images/arrow_right.png')} />
            </AnimatedPressable>
          </View>
        </View>
        <View className='flex-row justify-between'>
          <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='flex-1 rounded-lg h-10' pressInValue={0.95} onPress={onClose}>
            <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Save</Text>
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedModal>
  )
}

export default EditRequireActiveScoreModal

const styles = StyleSheet.create({})