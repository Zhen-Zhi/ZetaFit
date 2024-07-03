import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { FontAwesome6 } from '@expo/vector-icons';

export default function HomePageStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }}/>
      <Stack.Screen name='optionListModal' options={{ headerShown: false }}/>
      {/* <Stack.Screen name='profile' options={{
        headerShown: true,
        headerRight: () => 
          <AnimatedPressable 
            pressInValue={0.9}
            className='rounded'
          >
            <View className=''>
              <FontAwesome6 name="pencil" size={24} color="rgb(102, 102, 102)" />
            </View>
          </AnimatedPressable>
      }}/> */}
    </Stack>
  )
}