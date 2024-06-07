import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import { themeColors } from '@/src/constants/Colors'
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';

const ClanTestingScreen = () => {
  return (
    <View className='flex-1 p-4'>
      <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center'>Clan ActiveScore</Text>
      <View style={{ backgroundColor: themeColors.backgroundColor }} className='rounded-xl flex-row justify-center p-2 mb-2'>
        <View className='my-auto mx-3'>
          <FontAwesome6 name="fire" size={48} color="rgba(240, 93, 9, 0.8)" />
        </View>
        <Text style={{ color: themeColors.primary }} className='text-[48px] font-bold text-center rounded-2xl'>9999</Text>
      </View>

      <Text style={{ color: themeColors.primary }} className='text-xl font-extrabold text-center'>Clan War History</Text>

      <View style={{ backgroundColor: themeColors.backgroundColor }} className='rounded-xl p-2 mb-2'>
        <View className='flex-row justify-center'>
          <Text style={{ color: themeColors.tetiary }} className='font-bold text-[22px] mx-3'>Win</Text>
          <Progress.Bar className='my-2'
            progress={0.65}
            height={14}
            width={260}
            color={themeColors.tetiary}
            unfilledColor='#dc2626'
            borderWidth={0}
            borderRadius={10}
          />
          <Text className='font-bold text-[22px] text-red-600 mx-3'>Lose</Text>
        </View>
        <View className='flex-row justify-center'>
          <Text style={{ color: themeColors.tetiary }} className='font-extrabold text-[32px] mx-4'>65</Text>
          <Text style={{ color: themeColors.primary }} className='font-extrabold text-[32px] mx-4'>:</Text>
          <Text className='font-extrabold text-[32px] text-red-600 mx-4'>35</Text>
        </View>
      </View>

      
      <View className='rounded-xl p-2 mb-2 flex-row justify-around'>
        <View className='w-3/5'>
          <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>Required ActiveScore</Text>
          <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row'>
            <View className='my-auto mx-3'>
              <FontAwesome6 name="fire" size={22} color="rgba(240, 93, 9, 0.8)" />
            </View>
            <Text style={{ color: themeColors.primary }} className='text-[22px] font-bold text-center rounded-2xl'>600</Text>
          </View>
        </View>
        <View className='w-2/5'>
          <Text style={{ color: themeColors.primary }} className='text-lg font-semibold'>Ranking</Text>
          <View style={{ backgroundColor: themeColors.backgroundColor }} className='flex-row'>
            <View className='my-auto mx-3'>
              <MaterialIcons name="leaderboard" size={22} color={themeColors.primary} />
            </View>
          <Text style={{ color: themeColors.primary }} className='text-[22px] font-bold rounded-2xl'>2</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ClanTestingScreen

const styles = StyleSheet.create({})