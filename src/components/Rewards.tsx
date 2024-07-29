import { ImageBackground, StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import { useUserData } from '../api/users';
import { useAuth } from '../providers/AuthProvider';
import { Redirect } from 'expo-router';
import { Tables } from '../database.types';
import RemoteImage from './RemoteImage';

const AnimatedView = Animated.createAnimatedComponent(View);

type RewardsScreenProps = {
  onClose : () => void;
  modalVisible : boolean;
  challengeBadge: Tables<'badges'> | null
}

const RewardsScreen = ({ onClose, modalVisible, challengeBadge }: RewardsScreenProps) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [rewardsComponentIndex, setRewardsComponentIndex] = useState(0);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => animatePopOut(1), 500)
    }
  }, []);

  const badgesReward = (
    <View className='h-[90%] justify-center'>
      {/* <Image
        className='w-64 h-64 mx-auto'
        source={require('@asset/images/badges.png')}
      /> */}
      <RemoteImage
        classNameAsProps='w-64 h-64 mx-auto'
        path={challengeBadge?.image_name} 
        fallback={require('@asset/images/default.png')}
        bucket='badges'
      />
      <Text className='font-extrabold text-2xl text-center mx-10 mt-4 rounded-lg'>{challengeBadge?.name}</Text>
    </View>
  )
  
  const diamondReward = (
    <View className='h-[90%] justify-center'>
      <Image
        className='w-36 h-32 mx-auto'
        source={require('@asset/images/diamond_icon.png')}
        />
      <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>20</Text>
    </View>
  )
  
  const coinReward = (
    <View className='h-[90%] justify-center'>
      <Image
        className='w-36 h-36 mx-auto'
        source={require('@asset/images/coin_icon.png')}
        />
      <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>1500</Text>
    </View>
  )
  
  const expReward = (
    <View className='h-[90%] justify-center'>
      <Image
        className='w-36 h-36 mx-auto'
        source={require('@asset/images/crown.png')}
        />
      <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>EXP 40</Text>
    </View>
  )
  
  const chestReward = (
    <View className='h-[90%] justify-center'>
      {/* <Image
        className='w-52 h-52 mx-auto'
        source={require('@asset/images/chest.png')}
        /> */}
      <RemoteImage
        classNameAsProps='w-52 h-52 mx-auto'
        path='chest.png' 
        fallback={require('@asset/images/chest.png')}
        bucket='items'
      />
      <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>Precious Chest</Text>
    </View>
  )
  
  const rewardsComponent = [
    badgesReward, diamondReward, coinReward, expReward, chestReward
  ]
  
  // Function to start the animation
  const animatePopOut = (animateValue: number) => {
    Animated.spring(scaleAnimation, {
      toValue: animateValue,
      speed: 5,
      bounciness: 1,
      useNativeDriver: true
    }).start();
  };

  const handlePress = () => {
    if (rewardsComponentIndex >= rewardsComponent.length - 1) {
      onClose();
    }
    animatePopOut(0);
    setTimeout(() => {
      setRewardsComponentIndex(rewardsComponentIndex + 1)
      animatePopOut(1); // Rescale after 300 milliseconds
    }, 300);
  };

  return (
    <ImageBackground
      className='flex-1' 
      source={require('@asset/images/background_image.png')}
    >
      <Pressable 
        className='flex-1 z-10 bg-white/30'
        onPress={handlePress}
      >
        <AnimatedView style={{ transform: [{ scale: scaleAnimation }]}} className='justify-center'>
          {rewardsComponent[rewardsComponentIndex]}
        </AnimatedView>
        <Text style={{ color: themeColors.secondary }} className='font-bold text-xl text-center'>Tap To Collect</Text>
      </Pressable>
    </ImageBackground>
  )
}

export default RewardsScreen

const styles = StyleSheet.create({})