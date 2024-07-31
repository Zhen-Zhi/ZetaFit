import { Pressable, StyleSheet, Text, TextInput, View, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import AnimatedModal from '@/src/components/AnimatedModal'
import { useUpdateRequiredActiveScore } from '@/src/api/clan'

type EditRequireActiveScoreModalProps = {
  onClose: () => void;
  increment: () => void;
  decrement: () => void;
  setConfirmedAmount: (newRequriedActiveScore: number) => void;
  amount: number;
  clanId: number;
}

const EditRequireActiveScoreModal = ({ onClose, increment, decrement, setConfirmedAmount, amount: requiredActiveScore, clanId }: EditRequireActiveScoreModalProps) => {
  const { mutate: updateRequiredActiveScore, error } = useUpdateRequiredActiveScore()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateRequiredActiveScore = async () => {
    setIsLoading(true)
    updateRequiredActiveScore(
      { clanId: clanId, 
        updatedFields: { 
          required_active_score: requiredActiveScore 
        }
      },
      {
        onSuccess() {
          console.log("Inside success")
          setConfirmedAmount(requiredActiveScore)
          onClose();
          setIsLoading(false)
        },
      },
    )
  }

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
              value={requiredActiveScore.toString()}
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
          <AnimatedPressable style={{ backgroundColor: themeColors.secondary }} className='flex-1 rounded-lg h-10' pressInValue={0.95} onPress={handleUpdateRequiredActiveScore}>
            { isLoading 
              ? <ActivityIndicator size={28} color='white' className='my-auto' />
              : <Text style={{ color: themeColors.backgroundColor }} className='text-lg font-semibold text-center my-auto'>Save</Text>
            }
          </AnimatedPressable>
        </View>
      </View>
    </AnimatedModal>
  )
}

export default EditRequireActiveScoreModal

const styles = StyleSheet.create({})