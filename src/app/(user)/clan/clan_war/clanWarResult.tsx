import { ImageBackground, StyleSheet, Text, View, Image, Animated, Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedPressable from '@/src/components/AnimatedPressable'
import { themeColors } from '@/src/constants/Colors'
import RewardsScreen from '@/src/components/Rewards'

const AnimatedView = Animated.createAnimatedComponent(View);

type ClanWarResultScreenProps = {
  modalVisible : boolean;
  onClose : () => void;
}

const ClanWarResultScreen = ({ modalVisible, onClose }: ClanWarResultScreenProps) => {
  const [clanWarResult, setClanWarResult] = useState('defeat');
  const [rewardsModalVisible, setRewardsModalVisible] = useState(false)
  const [claimed , setClaimed] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(2)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      animatePopOut(1);
    }, 400)
  }, [])

  const animatePopOut = (animateValue: number) => {
    Animated.parallel([
      Animated.spring(scaleAnimation, {
        toValue: animateValue,
        speed: 100,
        bounciness: 0,
        useNativeDriver: true
      }),
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
      source={require('@asset/images/background_image.png')}
      className='flex-1'
    >
      <SafeAreaView edges={['top']} className={`flex-1 justify-center pb-16 ${ clanWarResult == 'defeat' && 'bg-slate-300/50' }`}>
        <Stack.Screen options={{ headerShown: false }} />
        <AnimatedView style={{ transform: [{ scale: scaleAnimation }],opacity: opacityAnimation }}>
          { clanWarResult == 'victory' 
            ? 
            <Image
              className='w-full h-52 mx-auto'
              source={require('@asset/images/victory_logo.png')}
            />
            :
            <Image
              className='w-[265px] h-60 mx-auto'
              source={require('@asset/images/defeat_logo.png')}
            />
          }  
        </AnimatedView>
          
        <View className={`pt-2 pb-6 m-8 rounded-lg ${ clanWarResult == 'victory' ? 'bg-white/50' : 'bg-slate-200/70' } `}>
          <Text className='font-bold text-2xl text-center my-2'>Rewards</Text>
          <View className='bg-slate-400 w-[85%] mx-auto h-[1.5px] mb-2' />
          <View className='flex-row justify-center my-1 h-10'>
            <Image 
              className='w-10 h-10 absolute left-12'
              source={require('@asset/images/coin_icon.png')}
            />
            <Text className='font-bold text-2xl my-auto mx-3'>999</Text>
          </View>
          <View className='flex-row justify-center my-1 h-10'>
            <Image 
              className='w-12 h-10 absolute left-11'
              source={require('@asset/images/diamond_icon.png')}
            />
            <Text className='font-bold text-2xl my-auto mx-3'>999</Text>
          </View>
          <View className='flex-row justify-center mt-8 h-10'>
            <Image 
              className='w-12 h-10 absolute left-11 top-[-4px]'
              source={require('@asset/images/crown.png')}
            />
            <Text className='font-bold text-2xl my-auto mx-3'>EXP 99</Text>
          </View>
        </View>
        <AnimatedPressable
          style={{ backgroundColor: claimed ? 'grey' : themeColors.secondary }}
          pressInValue={0.98}
          className='rounded-lg mx-auto w-auto p-2 border-4 border-white/70'
          onPress={() => setRewardsModalVisible(true)}
          disabled={claimed}
        >
          <Text className='font-bold text-lg text-white text-center mx-4'>Collect Rewards</Text>
        </AnimatedPressable>
        { claimed
          &&
          <AnimatedPressable
            style={{ backgroundColor: themeColors.secondary }}
            pressInValue={0.98}
            className='rounded-lg mx-auto w-48 p-2 border-4 border-white/70 mt-1'
            onPress={onClose}
          >
            <Text className='font-bold text-lg text-white text-center mx-4'>Continue</Text>
          </AnimatedPressable>
        }
      </SafeAreaView>

      <Modal
        animationType='fade'
        visible={rewardsModalVisible}
        presentationStyle='overFullScreen'
        transparent={true}
        onRequestClose={() =>setRewardsModalVisible(false)}
      >
        <RewardsScreen modalVisible={rewardsModalVisible} onClose={() => {setRewardsModalVisible(false); setClaimed(true)}} />
      </Modal>
    </ImageBackground>
  )
}

export default ClanWarResultScreen

const styles = StyleSheet.create({})