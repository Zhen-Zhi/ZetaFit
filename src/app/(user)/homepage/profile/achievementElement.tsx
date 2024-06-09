import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { themeColors } from '@/src/constants/Colors'

const AchievementElement = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  
  return (
      <View className='bg-white border border-slate-400 rounded-lg p-1 flex-row'>
        <Image className='w-20 h-20' source={require('@asset/images/badges.png')} />
        <Text numberOfLines={2} style={{ color: themeColors.primary }} className='text-xl font-bold my-auto ml-3 flex-1'>Achievement Name</Text>
        <Checkbox
          className='my-auto mx-4'
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
    )
}

export default AchievementElement

const styles = StyleSheet.create({})