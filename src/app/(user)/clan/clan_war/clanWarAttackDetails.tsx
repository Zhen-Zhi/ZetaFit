import { ImageBackground, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Attack = () => (
  <Text className='flex-1'>Attack</Text>
);

const Defense = () => (
  <Text className='flex-1'>Defense</Text>
);

type ClanWarAttackDetailsScreenProps = {
  onClose: () => void
}

const ClanWarAttackDetailsScreen = ({ onClose }: ClanWarAttackDetailsScreenProps) => {
  return (
    <Pressable className='flex-1 bg-black/50'>
    <Stack.Screen />
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      imageStyle={{ borderRadius: 20 }}
      className='flex-1 my-16 mx-8'
    >
    <View>
      <Image
        source={require('@asset/images/battle_log_logo.png')} 
        className='h-36 w-36 mx-auto my-2'
      />
      <AnimatedPressable 
        pressInValue={0.9} 
        className='z-10 m-3 absolute'
        onPress={onClose}
      >
        <View className='p-1'>
          <FontAwesome5 name="arrow-left" size={24} color={themeColors.primary} />
        </View>
      </AnimatedPressable>
    </View>

    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent',}}
      screenOptions={{
        tabBarPressColor: 'transparent',
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: 'rgba(212, 212, 212, 0.8)',
        tabBarIndicatorStyle: { backgroundColor: themeColors.tetiary, borderRadius: 0 },
        tabBarLabelStyle: {
          fontWeight: 700,
          fontSize: 16
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: '#cbd5e1',
          height: 45,
          backgroundColor: themeColors.backgroundColor
        },
      }}
    >
      <Tab.Screen name='attack' component={Attack} options={{ tabBarLabel: 'Attack' }} />
      <Tab.Screen name='defense' component={Defense} options={{ tabBarLabel: 'Defense' }} />
    </Tab.Navigator>
    </ImageBackground>
    </Pressable>
  )
}

export default ClanWarAttackDetailsScreen

const styles = StyleSheet.create({})