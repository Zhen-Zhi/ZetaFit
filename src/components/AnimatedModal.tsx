import { StyleSheet, Pressable, Animated, View, Modal } from 'react-native'
import React, { ReactNode, forwardRef, useEffect, useRef, useState } from 'react'
import { StyleProps } from 'react-native-reanimated';
import { themeColors } from '../constants/Colors';
import AnimatedPressable from './AnimatedPressable';
import { Ionicons } from '@expo/vector-icons';

// to create a animated component
const AnimatedModalView = Animated.createAnimatedComponent(Pressable);

type AnimatedModalProps = {
  onClose?: () => void | null;
  style?: StyleProps;
  classNameAsProps?: string; // className is reserved word
  modalVisible?: boolean;
  children?: ReactNode;
}

const AnimatedModal = forwardRef<typeof View, AnimatedModalProps>((props, ref) => {
  const scaleAnimation = useRef(new Animated.Value(0.6)).current;
  
  useEffect(() => {
    animatePopOut()
  }, [props.modalVisible])
  
  // Function to start the animation
  const animatePopOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      speed: 20,
      bounciness: 10,
      useNativeDriver: true
    }).start();
  };

  return (
    <Pressable className='bg-black/60 flex-1' onPress={props.onClose}>
      <AnimatedModalView onPress={(event) => event.stopPropagation()} className='m-auto w-[85%]' style={{ transform: [{ scale: scaleAnimation }]}}>
        <View style={{ backgroundColor: themeColors.primary }} className='p-2 border-t-4 border-x-2 border-slate-100 flex-row justify-end rounded-md'>
          <AnimatedPressable pressInValue={0.8} onPress={props.onClose}>
            <View className='my-auto'>
              <Ionicons name="close-sharp" size={24} color="white" />
            </View>
          </AnimatedPressable>
        </View>
        <View
          style={{ backgroundColor: themeColors.backgroundColor }}
          className={`w-[96%] mx-auto ${props.classNameAsProps}`}
        >
          {props.children}
        </View>
        <View style={{ backgroundColor: themeColors.primary }} className='w-full mx-auto h-4 border-x-2 border-b-4 border-white rounded-md' />
      </AnimatedModalView>
    </Pressable>
  )
})

export default AnimatedModal

const styles = StyleSheet.create({});