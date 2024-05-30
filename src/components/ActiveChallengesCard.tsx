import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import AnimatedPressable from './AnimatedPressable'
import * as Progress from 'react-native-progress';

const ActiveChallengesCard = () => {
  return (
    <AnimatedPressable
      style={styles.activeChallangesPressable}
      className='border border-slate-400 rounded-xl h-auto m-2 p-2'
      pressInValue={0.96}
    >
      <Image 
        style={styles.activeChallangesImage}
        className='h-28 w-52 mx-auto my-2 rounded-md shadow-xl' 
        source={require('@asset/images/CyberKongz.jpg')} 
      />
      <View className='mt-2 max-w-10'>
        <Text 
          numberOfLines={1}
          className='text-md font-bold'
        >This is a very long challenges that is active and cannot show</Text>
        <Progress.Bar
          width={190}
          height={8}
          className='m-1'
          progress={0.5}
          color='green'
          unfilledColor='red'
        />
      </View>
      
    </AnimatedPressable>
  )
}

export default ActiveChallengesCard

const styles = StyleSheet.create({
  activeChallangesPressable: {
    maxWidth: 220,
  },
  activeChallangesImage: {
    maxWidth: 200,
  }
})