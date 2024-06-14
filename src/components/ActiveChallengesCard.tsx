import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import * as Progress from 'react-native-progress';
import { themeColors } from '../constants/Colors';

const ActiveChallengesCard = () => {
  return (
    <AnimatedPressable
      style={styles.activeChallangesPressable}
      className='border-x border-t border-slate-200 rounded-md h-auto m-2 bg-white shadow shadow-slate-400'
      pressInValue={0.96}
    >
      <Image 
        className='h-28 w-full rounded-t-md shadow-xl' 
        source={require('@asset/images/challenges_banner.png')} 
      />
      <View className='mt-2'>
        <Text 
          numberOfLines={1}
          className='text-md font-bold my-2 mx-1'
          style={{ color: themeColors.primary }}
        >1000-minute run challenges</Text>
        <Progress.Bar
          width={190}
          height={2}
          className='mx-auto'
          progress={0.4}
          borderWidth={0}
          color={themeColors.tetiary}
          unfilledColor={themeColors.backgroundColor}
        />
      </View>
    </AnimatedPressable>
  )
}

export default ActiveChallengesCard

const styles = StyleSheet.create({
  activeChallangesPressable: {
    width: 200,
    elevation: 15,
  },
})