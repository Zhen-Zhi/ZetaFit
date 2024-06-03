import { StyleSheet, Text, View, Pressable, Animated, ViewStyle } from 'react-native'
import React, { CSSProperties, PropsWithChildren, useRef } from 'react'
import { StyleProps } from 'react-native-reanimated';

// to create a animated component
const AnimatedButton = Animated.createAnimatedComponent(Pressable);

type AnimatedPressableProps = {
  onPress?: () => void | null,
  style?: StyleProps,
  className?: string
  pressInValue: number
}

const AnimatedPressable = ({ children, onPress, style, className, pressInValue }: PropsWithChildren<AnimatedPressableProps>) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      speed: 100,
      toValue: pressInValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      speed: 100,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedButton
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[style, { transform: [{ scale: animatedValue}] }]}
      className={className}
    >
      {children}
    </AnimatedButton>
  )
}

export default AnimatedPressable

const styles = StyleSheet.create({})