import { StyleSheet, Text, View, Image, Pressable, ImageBackground, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import AnimatedPressable from '@/src/components/AnimatedPressable';

// to create a animated component
// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const HomeScreen = () => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView className='flex-1 bg-slate-100 pt-2'>
      {/* Top Part, Avatar, Level Bar, Username, Virtual Currency */}
      <View className='flex flex-row justify-between'>

        {/* Avartar Image, Level Bar, Username */}
        <View className='flex flex-row w-3/5'>

          {/* Avatar Image */}
          <View className='border rounded-lg m-2'>
            <Pressable className='bg-transparent' onPress={() => {}}> 
              <Image
                className='h-16 w-16 aspect-square border'
                source={require('@asset/images/CyberKongz - Collection _ OpenSea (1).jpg')}  
              />
            </Pressable>
          </View>
          
          {/* Level Bar and Username*/}
          <ImageBackground 
            source={require('@asset/images/star.png')}
            className='absolute z-10 w-10 aspect-square left-16 ml-3'
          >
            <Text className='absolute z-10 text-lg ml-4 mt-1.5 text-black font-extrabold'>5</Text>
          </ImageBackground>
          <View className='flex flex-col mt-2'>
            <Progress.Bar className='h-7 justify-center'
              progress={0.5}
              width={140}
              height={28}
              color='rgba(0,109,255,1)'
              unfilledColor='rgba(143,148,155,1)'
              borderWidth={2}
              borderRadius={10}
            >
              <Text className='absolute text-white font-extrabold self-center'>50000/1000</Text>
            </Progress.Bar>
            <Text className='text-lg font-bold'>Username</Text>
          </View>
        </View>

        {/* Virtual Currency */}
        <View className='flex flex-col w-2/5'>
          <View className='border border-slate-300 h-7 rounded-xl mt-2 mx-2 flex flex-row justify-between'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/react-logo.png')} 
            />
            <Text className='text-right mx-2 my-auto'>9999</Text>
          </View>
          <View className='border border-slate-300 mt-1 h-7 rounded-xl mx-2 flex flex-row justify-between'>
            <Image 
              className='w-5 mx-4 my-auto aspect-square'
              source={require('@asset/images/favicon.png')} 
            />
            <Text className='text-right mx-2 my-auto'>9999</Text>
          </View>
        </View>
      </View>

      {/* Clan Name and More setting */}
      <View className='flex flex-row mx-2 h-12'>
        <AnimatedPressable 
          style={styles.image} 
          className='bg-slate-300 flex-1 flex-row mr-2 rounded-lg'
          pressInValue={0.97}
          >
          <Image
            className='w-16 ml-2 mt-4 aspect-square border'
            source={require('@asset/images/CyberKongz - Collection _ OpenSea (1).jpg')} 
          />
          <Text className='text-center font-extrabold text-lg p-1'>Clan Name</Text>
        </AnimatedPressable>
        
        {/* More functions list */}
        <AnimatedPressable
          className='bg-slate-300 justify-center rounded-lg p-3'
          pressInValue={0.9}
        >
          <Ionicons name="list" size={26} color="black" />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    alignItems: 'center', // Centers horizontally
  }
})