import { ImageBackground, StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'

const AnimatedView = Animated.createAnimatedComponent(View);

type RewardsScreenProps = {
  onClose : () => void;
  modalVisible : boolean;
}

const badgesReward = (
  <View className='h-[90%] justify-center'>
    <Image
      className='w-64 h-64 mx-auto'
      source={require('@asset/images/badges.png')}
      />
    <Text className='font-extrabold text-2xl text-center mx-10 mt-4 rounded-lg'>Speed Demon</Text>
  </View>
)

const diamondReward = (
  <View className='h-[90%] justify-center'>
    <Image
      className='w-36 h-32 mx-auto'
      source={require('@asset/images/diamond_icon.png')}
      />
    <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>9999</Text>
  </View>
)

const coinReward = (
  <View className='h-[90%] justify-center'>
    <Image
      className='w-36 h-36 mx-auto'
      source={require('@asset/images/coin_icon.png')}
      />
    <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>9999</Text>
  </View>
)

const expReward = (
  <View className='h-[90%] justify-center'>
    <Image
      className='w-36 h-36 mx-auto'
      source={require('@asset/images/crown.png')}
      />
    <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>EXP 9999</Text>
  </View>
)

const chestReward = (
  <View className='h-[90%] justify-center'>
    <Image
      className='w-52 h-52 mx-auto'
      source={require('@asset/images/chest.png')}
      />
    <Text className='font-extrabold text-3xl text-center mx-10 mt-4 rounded-lg'>Legendary Chest</Text>
  </View>
)

const rewardsComponent = [
  badgesReward, diamondReward, coinReward, expReward, chestReward
]

const RewardsScreen = ({ onClose, modalVisible }: RewardsScreenProps) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [rewardsComponentIndex, setRewardsComponentIndex] = useState(0);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => animatePopOut(1), 500)
    }
  }, []);
  
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