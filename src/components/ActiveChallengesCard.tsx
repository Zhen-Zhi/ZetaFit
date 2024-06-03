import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import * as Progress from 'react-native-progress';

const ActiveChallengesCard = () => {
  return (
    <AnimatedPressable
      style={styles.activeChallangesPressable}
      className='border-2 border-slate-400 rounded-xl h-auto m-2 p-2 bg-white shadow shadow-slate-400'
      pressInValue={0.96}
    >
      <Image 
        style={styles.activeChallangesImage}
        className='h-28 w-52 mx-auto my-2 rounded-md shadow-xl' 
        source={require('@asset/images/1000-minute_run_challenges.png')} 
      />
      <View className='mt-2 max-w-10'>
        <Text 
          numberOfLines={1}
          className='text-md font-bold'
        >1000-minute run challenges</Text>
        <Progress.Bar
          width={190}
          height={10}
          className='m-1'
          progress={0.7}
          color='blue'
          unfilledColor= 'rgba(232, 232, 232, 0.8)'
        />
      </View>
      
    </AnimatedPressable>
  )
}

export default ActiveChallengesCard

const styles = StyleSheet.create({
  activeChallangesPressable: {
    maxWidth: 220,
    elevation: 15,
  },
  activeChallangesImage: {
    maxWidth: 200,
  }
})