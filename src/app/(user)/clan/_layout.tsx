import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors'
import AnimatedPressable from '@/src/components/AnimatedPressable'

export default function ClanStack() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ 
        title: 'Clan',
        headerRight: () => 
          <AnimatedPressable 
            pressInValue={0.9}
            className='rounded'
          >
            <View className=''>
              <MaterialCommunityIcons name="shield-plus-outline" size={28} color="rgb(100 116 139)" />
            </View>
          </AnimatedPressable>
      }}/>
    </Stack>
  )
}